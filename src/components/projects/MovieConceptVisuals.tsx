import React from 'react';

/** Small illustrative examples, not rows copied from the training dataset. */
export function SparseMovieMatrixVisual() {
  const cells: Array<Array<number | null>> = [
    [5, null, 4, null, null],
    [4, 3, null, null, null],
    [null, null, 5, 4, null],
    [null, 2, null, null, 5],
  ];
  return (
    <figure className="my-5 rounded-2xl border border-sky-200 bg-sky-50 p-4 sm:p-6">
      <figcaption className="mb-4">
        <h4 className="font-bold text-slate-900">A movie-by-user matrix: most ratings are missing</h4>
        <p className="mt-2 text-sm leading-6 text-slate-700">Rows are movies; columns are users. A filled square is an observed rating. An empty square means that user has not rated that movie — it is <strong>not a zero-star rating</strong>.</p>
      </figcaption>
      <div className="overflow-x-auto">
        <table className="mx-auto border-separate border-spacing-1 text-center text-sm" aria-label="Illustrative sparse movie ratings matrix">
          <thead><tr><th scope="col" className="p-2">Movie / User</th>{['U1','U2','U3','U4','U5'].map(u=><th scope="col" key={u} className="min-w-12 p-2">{u}</th>)}</tr></thead>
          <tbody>{cells.map((row,i)=><tr key={i}><th scope="row" className="pr-3 text-left font-semibold">Movie {String.fromCharCode(65+i)}</th>{row.map((value,j)=><td key={j} className={`rounded-lg border p-3 font-bold ${value === null ? 'border-slate-200 bg-white text-slate-400' : 'border-sky-300 bg-sky-200 text-sky-950'}`}>{value === null ? '—' : value}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-700"><strong>Illustrative calculation:</strong> 9 filled cells out of 20 possible = 45% density, or 55% missing. The real project is much sparser: 8,291 observed cells out of 286,000 (about 2.90% density). CSR stores observed entries efficiently.</p>
    </figure>
  );
}

export function CosineSimilarityVisual() {
  return (
    <figure className="my-5 rounded-2xl border border-violet-200 bg-violet-50 p-4 sm:p-6">
      <figcaption>
        <h4 className="font-bold text-slate-900">Cosine similarity: compare direction, not just magnitude</h4>
        <p className="mt-2 text-sm leading-6 text-slate-700">Imagine two simplified movie-feature vectors, A = [1, 1] and B = [1, 0]. They point 45° apart. This is a teaching example, not a measured result from the dataset.</p>
      </figcaption>
      <svg viewBox="0 0 500 275" className="mx-auto my-4 h-auto w-full max-w-xl" role="img" aria-label="Two vectors from the origin, vector A at 45 degrees and vector B horizontal; cosine similarity about 0.707">
        <line x1="55" y1="235" x2="465" y2="235" stroke="#64748b" strokeWidth="2" />
        <line x1="55" y1="250" x2="55" y2="20" stroke="#64748b" strokeWidth="2" />
        <path d="M55 235 L380 235" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
        <polygon points="380,235 365,227 365,243" fill="#0284c7"/>
        <path d="M55 235 L265 45" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
        <polygon points="265,45 248,51 260,64" fill="#7c3aed"/>
        <path d="M112 235 A57 57 0 0 0 97 197" fill="none" stroke="#ea580c" strokeWidth="3" />
        <text x="115" y="207" fontSize="16" fill="#9a3412">45°</text>
        <text x="385" y="229" fontSize="16" fill="#075985" fontWeight="bold">B = [1, 0]</text>
        <text x="275" y="43" fontSize="16" fill="#6d28d9" fontWeight="bold">A = [1, 1]</text>
        <text x="43" y="255" fontSize="14" fill="#334155">0</text>
      </svg>
      <div className="rounded-xl border border-violet-200 bg-white p-4 text-sm leading-7 text-slate-800">
        <p><strong>Dot product:</strong> (1 × 1) + (1 × 0) = 1</p>
        <p><strong>Vector lengths:</strong> ||A|| = √(1² + 1²) = √2; ||B|| = 1</p>
        <p><strong>Cosine similarity:</strong> 1 / (√2 × 1) ≈ <strong>0.707</strong></p>
        <p><strong>Cosine distance:</strong> 1 − 0.707 ≈ <strong>0.293</strong></p>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-600">In this project, scikit-learn returns cosine distance and the ranking function converts it to similarity = 1 − distance. Content features and audience rating vectors are two different inputs to the same distance concept.</p>
    </figure>
  );
}
