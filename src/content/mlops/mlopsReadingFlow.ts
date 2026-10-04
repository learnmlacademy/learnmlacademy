type ReadingBlock = `paragraph:${number}` | `visual:${number}` | `table:${number}` | "worked" | "decision-bridge";
type ReadingFlow = {
  introduction: string;
  vocabulary: string;
  implementation: string;
  decisions: string;
  blocks: ReadingBlock[];
  headings?: Partial<Record<ReadingBlock, string>>;
};

// Explicit local reading order keeps each explanation, calculation and figure
// together without moving, shortening or replacing the underlying lesson data.
export const mlopsReadingFlow: Record<string, ReadingFlow> = {
  "ai-engineering-mlops": {
    introduction: "From a notebook prediction to an operating service",
    vocabulary: "The vocabulary of a production ML system",
    implementation: "Record the model, features and decision policy in code",
    decisions: "Decide who owns each part of the production loop",
    blocks: ["paragraph:0", "paragraph:1", "paragraph:2", "visual:1", "paragraph:3", "visual:0", "table:0", "table:1", "worked"],
  },
  "ml-data-feature-pipelines": {
    introduction: "Make training and serving use the same feature meaning",
    vocabulary: "Features, event time and pipeline contracts",
    implementation: "Express feature contracts and time cutoffs in code",
    decisions: "Choose freshness, recovery and feature ownership policies",
    blocks: ["paragraph:0", "paragraph:1", "paragraph:3", "visual:0", "table:1", "paragraph:2", "visual:1", "table:0", "worked", "decision-bridge", "visual:2", "visual:3"],
    headings: { "paragraph:2": "Serve historical features and live features for different needs" },
  },
  "experiment-tracking-model-registry": {
    introduction: "Know which experiment produced the model you serve",
    vocabulary: "Runs, artifacts, lineage and registry states",
    implementation: "Record a reproducible run and enforce promotion gates",
    decisions: "Choose the evidence needed to approve a model version",
    blocks: ["paragraph:0", "paragraph:1", "paragraph:2", "visual:0", "paragraph:3", "table:1", "table:0", "worked", "visual:1", "decision-bridge", "visual:2"],
    headings: { "paragraph:3": "Separate artifact storage from permission to serve" },
  },
  "batch-online-inference": {
    introduction: "Choose when and how predictions must arrive",
    vocabulary: "Latency, throughput and serving modes",
    implementation: "Calculate serving capacity and describe the inference contract",
    decisions: "Choose a serving mode from the response deadline",
    blocks: ["paragraph:0", "paragraph:1", "paragraph:3", "visual:0", "table:0", "paragraph:2", "table:1", "paragraph:4", "visual:1", "worked"],
    headings: { "paragraph:2": "Package the model with the code it depends on", "paragraph:4": "Account for waiting time as well as model compute" },
  },
  "ml-cicd-continuous-training": {
    introduction: "Automate releases without automating unsafe promotion",
    vocabulary: "What CI, CD, CT and release gates each mean",
    implementation: "Encode the metric and regression checks that block a release",
    decisions: "Choose triggers, approvals and rollback conditions",
    blocks: ["paragraph:0", "paragraph:1", "visual:0", "table:0", "paragraph:2", "visual:1", "table:1", "paragraph:3", "worked", "decision-bridge", "visual:2"],
    headings: { "paragraph:2": "Follow the release path from a change to production", "paragraph:3": "A training trigger is not permission to deploy" },
  },
  "ml-monitoring-drift": {
    introduction: "Find out whether a running model is still useful",
    vocabulary: "Distinguish operational health, drift and prediction quality",
    implementation: "Calculate PSI and record the evidence behind an alert",
    decisions: "Choose when to investigate, retrain or roll back",
    blocks: ["paragraph:0", "paragraph:1", "paragraph:2", "paragraph:3", "paragraph:4", "visual:0", "table:1", "table:0", "worked", "visual:1", "decision-bridge", "visual:2"],
    headings: { "paragraph:2": "Connect prediction behaviour to delayed outcomes", "table:0": "Distinguish a distribution change from a loss of accuracy" },
  },
  "production-ai-reliability": {
    introduction: "Keep useful service available when dependencies fail",
    vocabulary: "Reliability, security and cost in measurable terms",
    implementation: "Calculate unit cost and specify bounded failure handling",
    decisions: "Choose safe fallbacks, access boundaries and cost limits",
    blocks: ["paragraph:0", "paragraph:1", "paragraph:2", "visual:0", "table:0", "table:1", "paragraph:3", "paragraph:4", "visual:1", "worked", "decision-bridge", "visual:2"],
    headings: { "paragraph:3": "Protect the model, its inputs and the authority to release it" },
  },
  "ml-system-design": {
    introduction: "Design a fraud decision service around its deadline",
    vocabulary: "The contracts in an end-to-end ML architecture",
    implementation: "Translate capacity and fallback decisions into an implementation",
    decisions: "Make the fraud service's trade-offs explicit",
    blocks: ["paragraph:0", "paragraph:1", "visual:0", "visual:1", "paragraph:2", "paragraph:3", "paragraph:4", "table:0", "worked", "decision-bridge", "visual:2", "table:1"],
    headings: { "paragraph:2": "Design the failure path before it is needed" },
  },
};
