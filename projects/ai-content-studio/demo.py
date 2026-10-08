"""No-credit, deterministic sample. Shows the real Pydantic schema and checks."""
from src.studio import ContentRequest, export_record, template_preview, review_content

def main():
    request = ContentRequest(
        brand="Sunrise Books", audience="Local university students",
        brief="A small independent bookshop is launching a campus reading club. "
              "Students can discover books and attend discussion sessions with other readers.",
        kind="Social post", operation="Create", tone="Friendly",
        call_to_action="Ask in store how to join the reading club.",
        must_include="reading club", max_words=100,
    )
    result = template_preview(request)
    print("SOURCE MODE:", result.source_mode)
    print("HEADLINE:", result.headline)
    print("BODY:", result.body)
    print("AUTOMATIC CHECKS:", [(check.name, check.passed) for check in review_content(request, result)])
    print("SAMPLE JSON:", export_record(request, result))


if __name__ == "__main__":
    main()
