import { curriculum, type Category, type SubTopic } from "./curriculum";
import { projectPortfolio } from "./projectPortfolio";

export type LearningNavigationGroup = {
  id: string;
  title: string;
  shortTitle?: string;
  categories: Category[];
};

export type SearchItemKind = "lesson" | "project";

export type UnifiedSearchItem = {
  id: string;
  title: string;
  shortTitle?: string;
  kind: SearchItemKind;
  categoryId?: string;
  categoryTitle: string;
  destination: string;
  module?: string;
  description?: string;
  keywords?: string[];
};

export type SearchableLesson = UnifiedSearchItem;

export const learningNavigationGroups: LearningNavigationGroup[] = [
  { id: "machine-learning", title: "Machine Learning", categories: curriculum.slice(0, 9) },
  { id: "deep-learning", title: "Deep Learning", categories: curriculum.filter(category => category.id === "deep-learning") },
  { id: "advanced-deep-learning", title: "Advanced Deep Learning", shortTitle: "Advanced DL", categories: curriculum.filter(category => category.id === "advanced-deep-learning") },
  { id: "generative-ai", title: "Generative AI", categories: curriculum.filter(category => category.id === "generative-ai") },
  { id: "large-language-models", title: "Large Language Models", shortTitle: "LLMs & RAG", categories: curriculum.filter(category => category.id === "large-language-models") },
  { id: "agentic-ai", title: "Agentic AI", categories: curriculum.filter(category => category.id === "agentic-ai") },
  { id: "ai-engineering-mlops", title: "AI Engineering & MLOps", categories: curriculum.filter(category => category.id === "ai-engineering-mlops") },
  { id: "interview-preparation", title: "Career & Interview Preparation", shortTitle: "Career & Interviews", categories: curriculum.filter(category => category.id === "interview-preparation") },
];

const lessonSearchItems: UnifiedSearchItem[] = curriculum.flatMap(category =>
  category.subtopics.map(topic => ({
    id: topic.id,
    title: topic.title,
    kind: "lesson" as const,
    categoryId: category.id,
    categoryTitle: category.title.replace(/^\d+\.\s*/, ""),
    destination: `/learn/${topic.id}`,
    module: topic.module,
  }))
);

const projectSearchItems: UnifiedSearchItem[] = projectPortfolio.map(project => ({
  id: project.id,
  title: project.shortTitle || project.title,
  shortTitle: project.shortTitle,
  kind: "project" as const,
  categoryTitle: "Project Handbook",
  destination: `/projects/${project.id}`,
  module: project.level ? `${project.level} Project` : "Project",
  description: project.description,
  keywords: [
    project.title,
    project.id.replace(/-/g, " "),
    ...(project.tools || []),
    ...(project.topics || []),
    ...(project.chapters || []),
  ],
}));

export const searchableItems: UnifiedSearchItem[] = [
  ...lessonSearchItems,
  ...projectSearchItems,
];

export const searchableLessons: UnifiedSearchItem[] = searchableItems;

export function getActiveNavigationGroup(topicId?: string) {
  if (!topicId) return undefined;
  return learningNavigationGroups.find(group =>
    group.categories.some(category =>
      category.subtopics.some(topic => topic.id === topicId),
    ),
  );
}

export function getGroupLessonCount(group: LearningNavigationGroup) {
  return group.categories.reduce(
    (total, category) => total + category.subtopics.length,
    0,
  );
}

export function getLessonNumber(
  group: LearningNavigationGroup,
  topic: SubTopic,
) {
  return group.categories
    .flatMap(category => category.subtopics)
    .findIndex(item => item.id === topic.id) + 1;
}
