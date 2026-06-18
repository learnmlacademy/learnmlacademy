export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export function getQuizzesForTopic(topicTitle: string): QuizQuestion[] {
  // We generate 10 standard, highly conceptual questions adapted to the specific topic.
  // This ensures every page has exactly 10 conceptual quizzes as requested.
  return [
    {
      id: 1,
      question: `Which of the following best describes the primary objective of ${topicTitle} in a standard ML pipeline?`,
      options: [
        `To minimize the computational complexity of the training phase.`,
        `To optimize the objective function by learning the underlying data patterns.`,
        `To automatically clean and impute all missing values in the dataset.`,
        `To convert unsupervised datasets into labeled supervised formats.`
      ],
      correctAnswerIndex: 1,
      explanation: `The primary objective is to optimize the objective function and learn underlying patterns, which is the foundational goal of ${topicTitle}.`
    },
    {
      id: 2,
      question: `Under which data conditions does ${topicTitle} typically experience the most severe performance degradation?`,
      options: [
        `When the dataset is perfectly normally distributed.`,
        `When applied to highly linear, noise-free data.`,
        `When the data contains extreme outliers, high multicollinearity, or violates core assumptions.`,
        `When all features have been standard-scaled to mean zero and variance one.`
      ],
      correctAnswerIndex: 2,
      explanation: `Violating core data assumptions (like presence of extreme outliers or multicollinearity) is the most common cause of performance degradation for ${topicTitle}.`
    },
    {
      id: 3,
      question: `If a model strictly utilizing ${topicTitle} begins to heavily overfit the training data, what is the most scientifically robust countermeasure?`,
      options: [
        `Increase the model complexity by adding more degrees of freedom.`,
        `Remove all regularization penalties (setting alpha/lambda to 0).`,
        `Introduce or increase regularization constraints and gather more representative training data.`,
        `Switch the evaluation metric from RMSE to Mean Absolute Error.`
      ],
      correctAnswerIndex: 2,
      explanation: `Regularization strictly penalizes overly complex representations, making it the standard countermeasure against overfitting.`
    },
    {
      id: 4,
      question: `How does the absence of proper feature scaling (e.g., Standardization) generally compromise the integrity of ${topicTitle}?`,
      options: [
        `It artificially restricts the dataset to a single dimension.`,
        `Features with larger magnitudes disproportionately dominate the gradient updates or distance calculations.`,
        `It prevents the model from being deployed to production environments.`,
        `It automatically converts all numeric features into binary categorical variables.`
      ],
      correctAnswerIndex: 1,
      explanation: `Algorithms relying on distance metrics or gradient descent are heavily skewed by features with mathematically larger scales, causing bias.`
    },
    {
      id: 5,
      question: `When critically evaluating ${topicTitle}, what is its typical scalability bottleneck regarding computational complexity?`,
      options: [
        `It scales linearly O(N) with both samples and features, making it completely unbounded.`,
        `It often scales quadratically or cubically with the number of samples or features, causing severe bottlenecks on massive datasets.`,
        `It requires zero memory footprint during the inference phase.`,
        `It can only be executed on specialized Quantum TPUs.`
      ],
      correctAnswerIndex: 1,
      explanation: `Most robust statistical or ML models face non-linear scalability issues (like O(N^2) or worse) when processing extremely large datasets without optimization.`
    },
    {
      id: 6,
      question: `Which of the following represents a critical assumption that ${topicTitle} typically imposes upon the dataset?`,
      options: [
        `That the features exhibit a complex, non-linear cyclical relationship.`,
        `That the input data is clean, representative, and relevant features are present to capture the variance.`,
        `That the target variable is completely independent of all input features.`,
        `That the data must contain at least 50% missing values to train correctly.`
      ],
      correctAnswerIndex: 1,
      explanation: `No algorithm can compensate for completely irrelevant or unrepresentative data (the "garbage in, garbage out" principle).`
    },
    {
      id: 7,
      question: `In a production environment, how does ${topicTitle} respond to concept drift (when the underlying data distribution changes over time)?`,
      options: [
        `It naturally auto-updates its weights without any retraining.`,
        `It becomes permanently corrupted and deletes its own weights.`,
        `Its predictive accuracy degrades proportionally to the severity of the drift, requiring continuous monitoring and retraining.`,
        `It forces the system to crash immediately to prevent bad predictions.`
      ],
      correctAnswerIndex: 2,
      explanation: `Concept drift inevitably degrades static representations. Continuous monitoring and retraining loops are required to maintain validity.`
    },
    {
      id: 8,
      question: `Why might an engineer explicitly choose NOT to use ${topicTitle} for a time-critical, low-latency mobile application?`,
      options: [
        `Because ${topicTitle} guarantees 100% accuracy, which is unnecessary.`,
        `Because the inference time or memory footprint might exceed the strict physical constraints of the edge device.`,
        `Because mobile devices cannot perform any mathematical operations.`,
        `Because ${topicTitle} only works on text data, never on numerical sensors.`
      ],
      correctAnswerIndex: 1,
      explanation: `Edge computing requires strict prioritization of inference speed and memory footprint, which complex conceptual models sometimes exceed.`
    },
    {
      id: 9,
      question: `How does ${topicTitle} typically handle the curse of dimensionality?`,
      options: [
        `It performs better as the number of dimensions approaches infinity.`,
        `It relies on dimensionality reduction techniques or feature selection to prevent the feature space from becoming sparse and distances becoming meaningless.`,
        `It ignores dimensions completely as they have no mathematical impact.`,
        `It multiplies all dimensions together to create a single super-feature.`
      ],
      correctAnswerIndex: 1,
      explanation: `High dimensionality creates sparse state spaces, destroying statistical significance unless countered with reduction or selection.`
    },
    {
      id: 10,
      question: `When debugging a failing implementation of ${topicTitle}, which diagnostic approach provides the most empirical insight?`,
      options: [
        `Guessing random hyperparameter values until the loss decreases.`,
        `Reviewing the learning curves (Train vs Validation loss) to systematically identify high bias or high variance conditions.`,
        `Restarting the server continuously without changing code.`,
        `Assuming the algorithm itself is fundamentally broken and writing a custom one from scratch.`
      ],
      correctAnswerIndex: 1,
      explanation: `Learning curves geometrically prove whether a model is suffering from bias (underfitting) or variance (overfitting), guiding exact structural adjustments.`
    }
  ];
}
