from src.digits import fit

if __name__ == "__main__":
    results = fit()
    print(f"Test accuracy on held-out sklearn digits: {results['test_accuracy']:.2%}")
    print("Saved artifacts/digits-cnn.pt and artifacts/metrics.json")
