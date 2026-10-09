import pytest
from scripts.create_test_pdfs import FIXTURES, make_pdf
from src.embedder import get_embedder
from src.service import build_collection


@pytest.fixture(scope="session")
def files():
    return [(name, make_pdf(pages)) for name, pages in FIXTURES.items()]


@pytest.fixture(scope="session")
def collection(files):
    return build_collection(files)


@pytest.fixture(scope="session")
def embedder():
    return get_embedder()
