Training generates immutable version folders containing model.joblib and
metadata.json. Generated artifacts are ignored; CI recreates them from pinned
data/dependencies. Never load a joblib supplied by an untrusted party.
