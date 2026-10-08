"""Command-line demonstration. No account, API key or internet required."""
from src.research import run_research

QUESTION = "Do urban trees cool cities, and what limits their benefits?"

if __name__ == "__main__":
    outcome = run_research(QUESTION, mode="offline")
    print(outcome.report)
    print("\nAGENT TRACE")
    print("\n".join(outcome.audit))
