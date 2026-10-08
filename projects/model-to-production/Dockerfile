FROM python:3.13.16-slim-bookworm@sha256:a1165e272e578941b84abc79e4ab38a0305cd12803a5c4247979ac7655f4d641

ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_DISABLE_PIP_VERSION_CHECK=1
WORKDIR /app
COPY requirements.txt .
RUN python -m pip install --no-cache-dir --no-compile -r requirements.txt \
    && python -m pip check \
    && useradd --create-home --uid 10001 appuser

# No raw data, training scripts, test suite, credentials, or caches in the image.
COPY api/ ./api/
COPY src/__init__.py src/contract.py src/model_loader.py src/predict.py src/logging_utils.py ./src/
COPY --chown=10001:10001 config/ ./config/
# Training publishes a private temporary directory; give the runtime user access.
COPY --chown=10001:10001 models/ ./models/
USER 10001:10001
EXPOSE 8000
HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=3 \
    CMD python -c "import json,urllib.request; r=json.load(urllib.request.urlopen('http://127.0.0.1:8000/health',timeout=2)); assert r['status']=='ok' and r['model_loaded'] is True" || exit 1
CMD ["python", "-m", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000", "--no-access-log"]
