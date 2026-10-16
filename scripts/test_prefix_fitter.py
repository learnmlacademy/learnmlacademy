def fit_description(prefix, suffix):
    # Target prefix length is between 62 and 80 characters
    # If too long, truncate words
    if len(prefix) > 80:
        words = prefix.split()
        res = []
        for w in words:
            if len(" ".join(res + [w])) <= 78:
                res.append(w)
            else:
                break
        prefix = " ".join(res)
    # If too short, pad naturally
    while len(prefix) < 62:
        if "step by step" not in prefix:
            prefix += " step by step"
        elif "in depth" not in prefix:
            prefix += " in depth"
        elif "core" not in prefix:
            prefix += " core"
        else:
            prefix += " concepts"
    
    desc = prefix + suffix
    return desc

suffix = ", with Python code, architecture diagrams, worked examples, and interview quiz."
test_prefixes = [
    "Master compare generative versus discriminative models with joint and conditional math",
    "Build an autonomous AI agent from scratch with step-by-step reasoning",
    "Master linear regression",
    "Understand gradient descent"
]

for p in test_prefixes:
    d = fit_description(p, suffix)
    print(len(d), d)
    assert 140 <= len(d) <= 160
print("Fitter passed!")
