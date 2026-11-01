import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

/**
 * StorageProvider
 * Abstract interface for protected asset storage providers.
 * Decouples document identity from storage location, enabling
 * future migration to private object storage with signed URLs.
 */
export class StorageProvider {
  /**
   * Resolves a buffer for a protected asset.
   * @param {Object} asset - Asset record from manifest (id, filename, sha256, size)
   * @returns {Promise<Buffer>}
   */
  async getAssetBuffer(asset) {
    throw new Error('getAssetBuffer must be implemented by storage provider');
  }

  /**
   * Returns a display/audit location for the asset.
   * @param {Object} asset
   * @returns {string}
   */
  getAssetLocation(asset) {
    throw new Error('getAssetLocation must be implemented by storage provider');
  }

  /**
   * Validates the cryptographic SHA-256 fingerprint of an asset.
   * @param {Object} asset
   * @returns {Promise<{ valid: boolean, actualSha256: string, actualSize: number, error?: string }>}
   */
  async verifyAssetIntegrity(asset) {
    try {
      const buf = await this.getAssetBuffer(asset);
      const actualSha256 = crypto.createHash('sha256').update(buf).digest('hex');
      const actualSize = buf.length;
      const valid = actualSha256 === asset.sha256 && actualSize === asset.size;
      return { valid, actualSha256, actualSize };
    } catch (err) {
      return { valid: false, actualSha256: '', actualSize: 0, error: err.message };
    }
  }
}

/**
 * LocalStorageProvider
 * Local file system storage provider (used in development and current repository).
 */
export class LocalStorageProvider extends StorageProvider {
  constructor(baseDir = process.cwd()) {
    super();
    this.baseDir = baseDir;
  }

  getAssetLocation(asset) {
    if (asset.currentLocalPath) {
      return path.resolve(this.baseDir, asset.currentLocalPath);
    }
    if (asset.filename && asset.filename.endsWith('.pdf')) {
      return path.resolve(this.baseDir, 'private', asset.filename);
    }
    if (asset.filename && asset.filename.endsWith('.zip')) {
      return path.resolve(this.baseDir, 'public/project-starters', asset.filename);
    }
    return path.resolve(this.baseDir, asset.path || asset.filename);
  }

  async getAssetBuffer(asset) {
    const filePath = this.getAssetLocation(asset);
    return await fs.readFile(filePath);
  }
}

/**
 * PrivateObjectStorageProvider
 * Documented specification for Release 1 private object storage (e.g. AWS S3 / Cloudflare R2).
 * Enables fetching protected assets via server-side private credentials or time-limited signed URLs
 * without checking documents into public git history or exposing credentials in client code.
 */
export class PrivateObjectStorageProvider extends StorageProvider {
  constructor(config = {}) {
    super();
    this.bucket = config.bucket || process.env.PROTECTED_STORAGE_BUCKET;
    this.prefix = config.prefix || 'handbooks/';
    this.endpoint = config.endpoint || process.env.PROTECTED_STORAGE_ENDPOINT;
    this.fetchClient = config.fetchClient || globalThis.fetch;
    this.signedUrlResolver = config.signedUrlResolver || null;
  }

  getAssetLocation(asset) {
    return `s3://${this.bucket || 'protected-assets'}/${this.prefix}${asset.filename}`;
  }

  async getAssetBuffer(asset) {
    if (this.signedUrlResolver) {
      const signedUrl = await this.signedUrlResolver(asset);
      const res = await this.fetchClient(signedUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch protected asset from object storage: ${res.statusText}`);
      }
      const arrayBuf = await res.arrayBuffer();
      return Buffer.from(arrayBuf);
    }
    throw new Error(
      `PrivateObjectStorageProvider not configured for local offline execution. Configure signedUrlResolver or use LocalStorageProvider.`
    );
  }
}

/**
 * Creates the active storage provider. Defaults to LocalStorageProvider.
 */
export function createStorageProvider(providerType = process.env.STORAGE_PROVIDER || 'local', options = {}) {
  if (providerType === 'remote' || providerType === 's3' || providerType === 'r2') {
    return new PrivateObjectStorageProvider(options);
  }
  return new LocalStorageProvider(options.baseDir || process.cwd());
}
