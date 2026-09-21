import { useLayoutEffect, type RefObject } from "react";
import {
  legacyLessonSummaries,
  legacySummaryReplacementIds,
} from "../data/legacyLessonSummaries";
import { SummaryCard } from "./lesson/SummaryCard";

const normalize = (value: string | null) =>
  (value || "").replace(/\s+/g, " ").trim();

const summaryHeading = /^(?:Final Summary|Summary(?::.*)?|What to remember)$/i;

function hideHeadingBlock(
  article: HTMLElement,
  label: HTMLElement,
  touched: HTMLElement[],
) {
  const mark = (element: HTMLElement) => {
    if (element.dataset.legacyEndingHidden === "true") return;
    element.dataset.legacyEndingHidden = "true";
    element.hidden = true;
    element.setAttribute("aria-hidden", "true");
    touched.push(element);
  };

  const section = label.closest("section");
  if (section && article.contains(section)) {
    mark(section);
    return;
  }

  if (!/^H[23]$/.test(label.tagName)) {
    let container: HTMLElement | null = label;
    while (
      container.parentElement &&
      container.parentElement !== article &&
      !container.querySelector('a[href^="/learn/"]')
    ) {
      container = container.parentElement;
    }
    mark(container);
    return;
  }

  mark(label);
  let sibling = label.nextElementSibling as HTMLElement | null;
  while (sibling && !/^H[23]$/.test(sibling.tagName)) {
    const next = sibling.nextElementSibling as HTMLElement | null;
    mark(sibling);
    sibling = next;
  }
}

export function LegacyInlineEndingCleanup({
  articleRef,
  topicId,
}: {
  articleRef: RefObject<HTMLElement | null>;
  topicId: string;
}) {
  useLayoutEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const touched: HTMLElement[] = [];
    const labels = Array.from(
      article.querySelectorAll("h2, h3, p, div"),
    ) as HTMLElement[];

    for (const label of labels) {
      const text = normalize(label.textContent);
      const replaceSummary =
        legacySummaryReplacementIds.has(topicId) &&
        summaryHeading.test(text);
      const obsoleteContinue = /^Continue Learning$/i.test(text);
      const duplicateQuiz =
        (topicId === "reinforcement-learning-adv" ||
          topicId === "multi-armed-bandits") &&
        text === "Quick Knowledge Check";
      const advancedRelated =
        (topicId === "state-space-models" ||
          topicId === "deep-learning-nlp" ||
          topicId === "pinn-kan-topological-networks") &&
        text === "Related Learning";

      if (
        replaceSummary ||
        obsoleteContinue ||
        duplicateQuiz ||
        advancedRelated
      ) {
        hideHeadingBlock(article, label, touched);
      }
    }

    return () => {
      for (const element of touched) {
        element.hidden = false;
        element.removeAttribute("aria-hidden");
        delete element.dataset.legacyEndingHidden;
      }
    };
  }, [articleRef, topicId]);

  return null;
}

export function LegacyLessonSummary({ topicId }: { topicId: string }) {
  const items = legacyLessonSummaries[topicId];
  if (!items) return null;

  return (
    <div data-legacy-standard-summary>
      <SummaryCard items={items} headingId={`summary-${topicId}`} />
    </div>
  );
}
