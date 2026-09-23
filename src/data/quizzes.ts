import { llmQuizData } from "./llmQuizzes";
import { agenticQuizData } from "./agenticQuizzes";
import { projectQuizData } from "./projectQuizzes";
import { mlopsQuizData } from "./mlopsQuizzes";
import { careerInterviewQuizData } from "./careerInterviewQuizzes";
import { deepLearningQuizData } from "./deepLearningQuizzes";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  questionType?: "conceptual" | "interpretation" | "numerical/formula" | "practical selection" | "debugging/diagnostic" | "application/scenario";
}

const quizData: Record<string, QuizQuestion[]> = {

  "what-is-ml": [
    { id:1, question:"A spam filter learns to improve as it processes more emails. What makes it a machine learning system rather than a traditional program?", options:["It improves from data rather than following hand-coded rules","It runs on a server","It processes emails faster","It is written in Python"], correctAnswerIndex:0, explanation:"The defining characteristic of ML is learning from data. A traditional program has fixed rules written by a programmer. The spam filter updates its understanding of spam patterns automatically as it sees more examples." },
    { id:2, question:"Which problem is machine learning clearly NOT the right tool for?", options:["Predicting which customers will churn next month","Calculating the area of a rectangle given its width and height","Detecting fraudulent transactions in real time","Classifying medical images as cancerous or benign"], correctAnswerIndex:1, explanation:"Area = width × height is a known formula. Writing one line of code is faster, more reliable, and more accurate than training a model. ML is valuable when rules are too complex to specify or when patterns must be discovered from data." },
    { id:3, question:"A model trained to classify cats vs dogs is tested on horse vs zebra images without retraining. What will most likely happen?", options:["It works perfectly — animals share enough features","It will automatically adapt to the new classes","Performance will be poor — the model learned cat/dog-specific patterns that don't transfer to horses and zebras","It will refuse to make predictions"], correctAnswerIndex:2, explanation:"ML models only generalise within the distribution they were trained on. The features the model learned (cat ears, dog fur patterns) are not the right features for distinguishing horses from zebras." },
    { id:4, question:"What is the difference between a model's training error and its generalisation error?", options:["Training error is always higher than generalisation error","Generalisation error only applies to neural networks","They are identical for well-trained models","Training error measures performance on data the model has seen; generalisation error measures performance on unseen data — generalisation error is what actually matters in production"], correctAnswerIndex:3, explanation:"A model that memorises training examples can achieve near-zero training error while failing completely on new data. Generalisation error — performance on unseen data — is the only metric that predicts real-world usefulness." },
  ],

  "types-of-ml": [
    { id:1, question:"A retailer wants to group 5 million customers into segments based on purchase behaviour, with no predefined categories. Which approach is correct?", options:["Supervised classification — predict which of 5 groups each customer belongs to","Unsupervised clustering — discover natural groupings without predefined labels","Reinforcement learning — reward the model when it finds good segments","Semi-supervised learning — label 1% of customers manually first"], correctAnswerIndex:1, explanation:"There are no predefined labels — the retailer doesn't know in advance how many groups exist or what they look like. Unsupervised clustering (K-Means, DBSCAN) discovers these natural groupings from the data itself." },
    { id:2, question:"A robot receives +1 reward each time it takes a step forward without falling, and -1 when it falls. What type of learning is this?", options:["Supervised learning — the rewards are labels","Unsupervised learning — no human provides the data","Reinforcement learning — an agent learns by interacting with an environment and receiving feedback","Semi-supervised learning — only some steps are rewarded"], correctAnswerIndex:2, explanation:"RL is defined by an agent (robot) taking actions in an environment (the ground) and receiving reward signals (+1/-1). Unlike supervised learning, there is no dataset of correct actions — the agent discovers them through trial and error." },
    { id:3, question:"Which scenario is most suitable for supervised learning?", options:["Finding unusual patterns in network traffic with no known attack signatures","Teaching a drone to fly by letting it crash and recover thousands of times","Grouping news articles by topic without category labels","Predicting tomorrow's sales using 3 years of historical daily sales records"], correctAnswerIndex:3, explanation:"Historical sales with known values provide labelled (date features, sales amount) pairs — exactly what supervised learning needs. The others lack labels or require environment interaction." },
    { id:4, question:"You have 500 labelled examples and 50,000 unlabelled examples of the same task. Which learning paradigm is designed for this?", options:["Semi-supervised learning — uses both labelled and unlabelled data together","Unsupervised learning — ignore the labels entirely","Supervised learning — just use the 500 labelled examples","Reinforcement learning — convert labels into rewards"], correctAnswerIndex:0, explanation:"Semi-supervised learning is designed for exactly this scenario: a small amount of labelled data plus a large pool of unlabelled data. Methods like self-training and label propagation leverage the structure in unlabelled data." },
  ],

  "supervised-learning-intro": [
    { id:1, question:"In supervised learning, what is a 'label'?", options:["The name assigned to a feature column","The column header in a CSV file","The known correct output for a training example — what the model is trying to learn to predict","The model's predicted output before training is complete"], correctAnswerIndex:2, explanation:"A label is the ground truth for each training example. For a loan default predictor, the label is whether that historical borrower actually defaulted. The model learns the mapping from input features to these known labels." },
    { id:2, question:"Your training accuracy is 98% but test accuracy is 61%. What does this most likely indicate?", options:["The test set has data quality problems","Underfitting — the model is too simple to learn","Normal performance — a 37-point gap is expected","Overfitting — the model memorised training examples instead of learning generalisable patterns"], correctAnswerIndex:3, explanation:"A large gap between training and test accuracy is the defining symptom of overfitting. The model learned the specific quirks of the 98% training examples rather than patterns that hold for new data." },
    { id:3, question:"What is the primary risk of having very few training examples?", options:["Overfitting — with few examples the model can memorise them without learning general patterns","The model cannot be exported or deployed","The model trains too slowly","Labels become incorrect automatically when data is small"], correctAnswerIndex:0, explanation:"With very few examples, a model can memorise each one perfectly (near-zero training error) without learning any patterns that generalise. More data is the most reliable cure for overfitting." },
    { id:4, question:"A medical diagnosis model predicts the correct disease for 98% of training patients but only 54% of new patients. What should you investigate first?", options:["Whether the disease is actually common enough to model","Whether data leakage allowed the model to see labels during training","Whether the neural network has enough layers","Whether accuracy is the right metric here"], correctAnswerIndex:1, explanation:"A 98% to 54% drop is so dramatic that data leakage is the most likely cause — some feature in training contained information that wouldn't be available for new patients (e.g., a test result only ordered after diagnosis)." },
  ],

  "unsupervised-learning-intro": [
    { id:1, question:"Which task genuinely requires no labels?", options:["Predicting whether a customer will cancel their subscription","Forecasting quarterly revenue from historical data","Classifying emails as spam or not spam","Grouping 10 million songs into musical styles based on audio features"], correctAnswerIndex:3, explanation:"Grouping songs by musical style requires no predefined categories and no human to say which group each song belongs to — this is exactly unsupervised learning." },
    { id:2, question:"K-Means was given no category labels, yet it produces 3 clusters. Why?", options:["k=3 was specified as a hyperparameter before training began","It reads category names from the column headers","It automatically detects the right number by trying all values","It copies labels from the last column of the dataset"], correctAnswerIndex:0, explanation:"K-Means requires you to specify k before running. The algorithm finds the best 3 clusters it can, but it cannot discover whether 3 is the right number — that judgment stays with the user." },
    { id:3, question:"PCA reduces a dataset from 200 features to 10 components. What is the fundamental tradeoff?", options:["You lose all information — PCA is always destructive","You lose some variance (information) but gain a much lower-dimensional representation that speeds up downstream models and reduces overfitting","The 10 components are simply the 10 most important original features","PCA increases dimensionality, not reduces it"], correctAnswerIndex:1, explanation:"PCA retains the directions of greatest variance. Reducing from 200 to 10 components discards the least-varying dimensions — often noise — while preserving the most important structure." },
    { id:4, question:"Why can't you use accuracy to evaluate a clustering algorithm?", options:["Clustering only works on images where accuracy doesn't apply","Clusters always achieve 100% accuracy by construction","There are no ground-truth labels to compare predictions against — the whole point is that labels don't exist","Accuracy requires exactly two classes"], correctAnswerIndex:2, explanation:"Clustering is unsupervised — there are no labels to compare against. Use Silhouette Score (how tight and separated clusters are) or Inertia (within-cluster sum of squares) instead." },
  ],

  "reinforcement-learning-intro": [
    { id:1, question:"What are the three core components of any reinforcement learning problem?", options:["Agent, environment, and reward signal","Dataset, model, and loss function","Training set, validation set, and test set","Features, labels, and predictions"], correctAnswerIndex:0, explanation:"RL is defined by an agent that takes actions in an environment and receives reward signals. Unlike supervised learning, there is no pre-existing dataset — the agent generates experience through interaction." },
    { id:2, question:"An RL agent plays 10 moves in a chess game and then loses. How does it know which moves were mistakes?", options:["It cannot — this is why RL doesn't work for chess","This is the credit assignment problem — determining which of the 10 past actions caused the eventual loss. Techniques like temporal difference learning address this","It penalises all 10 moves equally","Only the last move before losing is penalised"], correctAnswerIndex:1, explanation:"The credit assignment problem is fundamental to RL. When a reward (or penalty) arrives after many steps, it's unclear which actions deserve blame. This is one of the central challenges that RL algorithms are designed to solve." },
    { id:3, question:"Why is reinforcement learning almost never used to predict house prices?", options:["Tabular data cannot be processed by RL algorithms","RL has no way to handle numerical outputs","There is no natural environment to interact with or reward signal to define — supervised regression with labelled historical data is far simpler and more reliable","RL only works on image and video data"], correctAnswerIndex:2, explanation:"RL is powerful when you need to learn through interaction with an environment. For predicting house prices, you already have labelled historical records — there's no reason to design an environment and reward signal when supervised learning is straightforward." },
    { id:4, question:"What is the exploration-exploitation dilemma?", options:["Choosing between supervised and unsupervised learning","Choosing the number of hidden layers in a neural network","Deciding whether to use a GPU or CPU for training","Balancing between trying new actions to discover better strategies (exploration) versus repeating actions already known to give good rewards (exploitation)"], correctAnswerIndex:3, explanation:"Too much exploitation: the agent settles for a suboptimal strategy and never discovers something better. Too much exploration: the agent never capitalises on what it has already learned. Balancing these is central to RL algorithm design." },
  ],

  "batch-vs-online": [
    { id:1, question:"A fraud detection model needs to adapt to new fraud patterns within hours of them emerging. Which approach is appropriate?", options:["Batch learning — retrain on all historical data every few hours","Online learning — update the model incrementally as each new transaction arrives","Semi-supervised learning — label new fraud patterns manually each day","No retraining is needed — fraud patterns are stable"], correctAnswerIndex:1, explanation:"Online learning updates the model incrementally with each new example, making it ideal for rapidly evolving patterns. Retraining from scratch every few hours on all historical data would be computationally prohibitive." },
    { id:2, question:"What is the primary disadvantage of batch learning for large and growing datasets?", options:["Batch learning cannot handle numerical features","Batch learning models cannot generalise to new data","Each retraining requires processing the entire dataset from scratch — this becomes increasingly expensive and slow as the dataset grows over time","Batch learning requires an internet connection during training"], correctAnswerIndex:2, explanation:"Batch learning retrains from scratch each time. For a dataset that grows by 1 million examples per day, retraining daily on all accumulated data quickly becomes impractical." },
    { id:3, question:"In online learning, what is the role of the learning rate?", options:["It controls how many examples are processed per second","It controls how many features are used per update","It sets the initial model weights before any examples arrive","It controls how much each new example influences the model — high rate means fast adaptation but risk of forgetting old patterns; low rate preserves past knowledge but adapts slowly to genuine change"], correctAnswerIndex:3, explanation:"This tradeoff is the core tuning challenge in online learning. A learning rate that is too high adapts to noise; one that is too low misses real distribution changes." },
    { id:4, question:"An image recognition model is trained once on a fixed dataset of 10 million labelled photos and then deployed unchanged. Which paradigm is this?", options:["Batch learning — the entire dataset is processed at once before deployment, and the model is then static","Online learning — the model sees many examples","Reinforcement learning — the model receives feedback from users","Semi-supervised learning — most images had no labels"], correctAnswerIndex:0, explanation:"A fixed dataset, trained once, produces a static model — classic batch learning. This is appropriate when the data distribution is stable and complete." },
  ],

  "ml-lifecycle": [
    { id:1, question:"During which phase of the ML lifecycle is data leakage most likely to be introduced accidentally?", options:["Business problem definition","Model deployment to production","Feature engineering and data preprocessing — especially when transformers are fit on the full dataset before splitting","Monitoring model performance post-launch"], correctAnswerIndex:2, explanation:"The most common leakage is fitting scalers, encoders, or imputers on the entire dataset before splitting. The transformer learns test set statistics, giving the model indirect access to test data during training." },
    { id:2, question:"A model performs well in offline testing but degrades rapidly after deployment. Which lifecycle phase was likely inadequate?", options:["Data collection","Model architecture selection","Business problem definition","Deployment and monitoring — the model was not validated under production conditions or monitored for drift after launch"], correctAnswerIndex:3, explanation:"Training-serving skew (production data differing from test data) and model drift (distribution changing after deployment) are the most common causes of this pattern. Proper validation on production-like data and monitoring catch these." },
    { id:3, question:"Why does 'define the business problem' come first in the ML lifecycle, before any data collection?", options:["Because the wrong metric or objective means a technically excellent model can be commercially useless — you need to know what you're optimising before collecting data or building models","Because you need to write a business proposal before spending money","Because business teams write the feature engineering code","Because data vendors require a problem statement before selling data"], correctAnswerIndex:0, explanation:"A fraud model that maximises F1-score might still miss the business goal of minimising financial loss. If you collect data and train a model for the wrong objective, you've wasted the entire effort. Defining success first prevents this." },
    { id:4, question:"A deployed model's precision gradually declines from 0.91 to 0.74 over 4 months. What is the most likely cause?", options:["The model's code has developed bugs over time","Model drift — the statistical relationship between features and the target has changed as the real world evolved, making the model's learned patterns less applicable","The training data was deleted, hurting the model","The evaluation metric is being computed incorrectly in production"], correctAnswerIndex:1, explanation:"Model drift is the most common cause of gradual performance degradation after deployment. Fraud patterns evolve, user behaviour changes, and economic conditions shift — all of which can invalidate learned patterns." },
  ],

  "python-for-ml": [
    { id:1, question:"Why has Python become the dominant language for machine learning, despite not being the fastest language at runtime?", options:["Python has better GPU drivers than C++","Python was specifically designed for numerical computation","Python automatically distributes computations across GPU clusters","Python's simple syntax, vast ML ecosystem (NumPy, pandas, scikit-learn, PyTorch), and interactive notebooks make rapid experimentation fast — heavy computation is offloaded to C extensions anyway"], correctAnswerIndex:3, explanation:"Python wins through iteration speed and ecosystem. Libraries like NumPy run C code under the hood, so Python's runtime slowness rarely matters for numerical ML work — the bottleneck is matrix operations, not Python loops." },
    { id:2, question:"What is a Python list comprehension and why is it preferred over a for-loop for data transformations?", options:["A concise syntax that is typically faster than an equivalent for-loop (runs optimised C internally) and makes the transformation intent immediately clear","A list comprehension is a way to import data from external files","A list comprehension creates a machine learning model from a list of parameters","They produce identical results — it is purely a style preference"], correctAnswerIndex:0, explanation:"[x**2 for x in data] vs. a for-loop that appends: the comprehension is more readable and faster because the looping happens in C rather than the Python interpreter." },
    { id:3, question:"What is the difference between a shallow copy and a deep copy of a Python list?", options:["No difference — both create fully independent copies","Shallow copy copies references to nested objects (modifying inner lists changes both copies); deep copy recursively copies everything, creating fully independent objects","Shallow copies are always faster but corrupt numerical data","Deep copies only work with dictionary objects, not lists"], correctAnswerIndex:1, explanation:"This matters in ML preprocessing: a shallow copy of a list of feature arrays means in-place modifications affect both the original and the copy. use copy.deepcopy() or NumPy's arr.copy() when true independence is needed." },
    { id:4, question:"Why should you use enumerate() rather than range(len(list)) when you need both index and value?", options:["enumerate() only works with dictionaries, not lists","range(len()) always raises an IndexError","enumerate() is more readable, less error-prone, and works on any iterable — you can't accidentally pass the wrong length","They are completely identical in every way"], correctAnswerIndex:2, explanation:"enumerate() avoids the manual index arithmetic that causes off-by-one errors, and it works on generators and other iterables that don't have a len(). It's the Pythonic standard for index-value iteration." },
  ],

  "numpy-essentials": [
    { id:1, question:"What is the fundamental performance difference between a Python list and a NumPy array?", options:["NumPy arrays store a single data type in contiguous memory, enabling vectorised operations in C that are 10-100x faster than Python loops on equivalent data","There is no performance difference — they store data identically","NumPy arrays can only store integers, while lists store any type","Python lists support mathematical operators but NumPy arrays do not"], correctAnswerIndex:0, explanation:"Python lists store Python objects (each with type metadata and reference overhead). NumPy arrays store raw C values in a contiguous block, enabling vectorised operations without Python interpreter overhead per element." },
    { id:2, question:"What does NumPy broadcasting allow you to do?", options:["Send array data over a network connection","Perform arithmetic between arrays of different but compatible shapes without writing explicit loops — NumPy automatically expands the smaller array to match the larger one","Convert any array to an image for display in a notebook","Synchronise array updates across multiple GPUs simultaneously"], correctAnswerIndex:1, explanation:"Adding a shape (1000,) bias vector to a shape (1000, 512) weight matrix without broadcasting would require a Python loop over 1000 elements. Broadcasting handles this in a single vectorised C operation." },
    { id:3, question:"You have an array of shape (1000, 10). What does arr.reshape(100, 100) produce?", options:["An error — you cannot change the shape of a NumPy array","A (100, 100) array filled with new random values","A new (100, 100) view of the same 10,000 elements rearranged according to the new shape","It deletes 9,000 elements and returns a (100,) array"], correctAnswerIndex:2, explanation:"reshape is valid as long as the total number of elements is preserved: 1000×10 = 100×100 = 10,000. No data is copied — reshape returns a view with a different interpretation of the same memory." },
    { id:4, question:"What is the difference between b = arr and b = arr.copy() in NumPy?", options:["They are completely equivalent — both create independent arrays","b = arr copies values but does not copy the shape metadata","arr.copy() is significantly slower and should be avoided in ML code","b = arr creates a view sharing the same memory (modifying b modifies arr); arr.copy() creates an independent copy with its own memory"], correctAnswerIndex:3, explanation:"This is one of the most common NumPy bugs. In-place modification of what looks like a 'copy' unintentionally corrupts the original. Use .copy() or np.copy() whenever you need true independence." },
  ],

  "pandas-essentials": [
    { id:1, question:"What is the difference between df.loc and df.iloc?", options:["They are completely interchangeable","loc selects by label (index name or column name); iloc selects by integer position (0-based row and column numbers)","loc is for row selection only; iloc is for column selection only","iloc was deprecated in pandas 2.0 — only loc should be used"], correctAnswerIndex:1, explanation:"df.loc['alice', 'salary'] selects the row labelled 'alice' and the column named 'salary'. df.iloc[0, 3] selects row 0 and column 3 by position. Mixing them up is one of the most common pandas bugs." },
    { id:2, question:"What does df.groupby('city')['sales'].mean() return?", options:["The mean sales value across the entire dataset, ignoring the city column","An error — groupby requires at least two columns to be specified","A Series with one entry per unique city, containing the mean sales for customers in that city","Total sales per city, sorted alphabetically"], correctAnswerIndex:2, explanation:"groupby splits the DataFrame into groups by the specified column, then applies the aggregation (mean) to each group independently. This is the standard pandas pattern for computing segment-level statistics." },
    { id:3, question:"What is the risk of using df.dropna() by default on a dataset with many features?", options:["dropna() fills missing values rather than dropping, so there is no risk","dropna() requires you to specify which columns to check before it runs","dropna() only removes columns, not rows, so row count is unaffected","If each of 50 features has a few missing values scattered independently, dropna() may remove most or all rows — dropping all rows with any missing value can silently destroy most of your dataset"], correctAnswerIndex:3, explanation:"dropna() removes any row containing at least one NaN by default. With 50 features each having 5% missing values (independent), roughly 92% of rows will have at least one NaN — dropna() would discard 92% of your data silently." },
    { id:4, question:"What is the dummy variable trap that pd.get_dummies() can create, and how do you avoid it?", options:["When one-hot encoding creates n binary columns that always sum to exactly 1, they are perfectly linearly dependent — this breaks linear regression's matrix inversion. Avoid by using drop_first=True to remove one reference category","get_dummies() creates duplicate rows rather than duplicate columns","get_dummies() creates floating-point values that linear models cannot process","The trap only affects tree-based models, not linear models"], correctAnswerIndex:0, explanation:"Perfect multicollinearity (X'X is singular) makes the normal equation unsolvable. With cities [Mumbai, Delhi, Bengaluru], you need only 2 indicator columns — the third is always derivable from the other two." },
  ],

  "scikit-learn-essentials": [
    { id:1, question:"What is the primary purpose of scikit-learn's Pipeline object?", options:["To run multiple models in parallel and pick the best one","To automatically tune all hyperparameters using Bayesian search","To chain preprocessing steps and a model into a single object — ensuring that transformers are fitted only on training data during cross-validation, preventing data leakage automatically","To convert trained models to ONNX format for faster production serving"], correctAnswerIndex:2, explanation:"Without Pipeline, it's very easy to accidentally call fit_transform() on the full dataset before splitting, or to apply different transforms to train and test. Pipeline prevents this by ensuring fit() only ever touches training data." },
    { id:2, question:"Why do you call fit_transform() on X_train but only transform() on X_test?", options:["fit_transform() is available only for training data in sklearn's API","The test set should never be preprocessed — only raw data should be passed to the model","transform() and fit_transform() always produce identical numerical results","fit() learns parameters (e.g., mean and std for StandardScaler) from the data it sees. If you fit on test data, those test statistics influence your preprocessing — a form of leakage. Fit once on train, then apply (transform) to both"], correctAnswerIndex:3, explanation:"Recomputing the scaler's mean and std from test data means your preprocessing parameters 'know' about the test set. The model has indirectly seen test data before evaluation — optimistically biasing your results." },
    { id:3, question:"cross_val_score(model, X, y, cv=5, scoring='accuracy') returns what?", options:["An array of 5 floats — one accuracy score per fold — showing how performance varies across different train/test splits of the data","A single float representing mean accuracy across all 5 folds","The best model weights found across the 5 folds","A learning curve plot showing accuracy vs training set size"], correctAnswerIndex:0, explanation:"Each of the 5 folds is a different train/test split. The returned array lets you compute mean and std, which is far more informative than a single split estimate." },
    { id:4, question:"What does setting random_state=42 do in a sklearn model or data split?", options:["It sets the learning rate to 42/100 = 0.42","It seeds the random number generator so that any randomness in the algorithm (shuffling, initialisation) produces the same result every run — making experiments reproducible","It allocates 42 CPU threads for parallel processing","It limits the model to a maximum of 42 training iterations"], correctAnswerIndex:1, explanation:"Without a fixed random_state, the same code run twice gives different results, making debugging and comparing experiments unreliable. Always set random_state in any code you share or publish." },
  ],

  "eda": [
    { id:1, question:"A histogram of transaction amounts shows a very long right tail with a few values in the billions. What should you do before building a fraud model?", options:["Delete all transactions above ₹1 crore — they are obviously errors","Do nothing — tree-based models handle skewed distributions without any transformation","Replace all amounts above the 99th percentile with the median","Investigate whether the extreme values are genuine (wire transfers, institutional trades) or data errors. If genuine, consider log-transforming the amount feature. If errors, correct or remove them"], correctAnswerIndex:3, explanation:"Blindly removing outliers can delete genuinely important data — a billion-rupee wire transfer might itself be the fraud signal. Investigate first, then decide on transformation or removal based on what you learn." },
    { id:2, question:"A correlation matrix shows that 'total_rooms' and 'total_bedrooms' correlate at 0.97 in a housing dataset. What does this imply?", options:["These features carry nearly identical information. For linear models, this creates multicollinearity — inflating coefficient standard errors and making individual feature interpretations unstable","Both features are essential and should definitely be kept","High correlation means both features are more predictive of the target","You must remove both features together if one is correlated above 0.9"], correctAnswerIndex:0, explanation:"You might keep one, combine them into a ratio (bedrooms per room), or use Ridge regression which handles multicollinearity. Simply noting the correlation during EDA prevents you from later being confused by unstable linear model coefficients." },
    { id:3, question:"During EDA, a feature called 'days_since_last_login' is missing for 68% of users. What is the most insightful first question to ask?", options:["Should I use mean or median imputation?","Is the missingness itself informative — do users who never logged in (infinite days) have different churn rates than users who logged in recently?","Should I drop this feature since 68% is too high to impute?","Should I use KNN imputation with k=5 for this feature?"], correctAnswerIndex:1, explanation:"68% missing 'days since last login' likely means 68% of users have never logged in — which is a powerful signal in itself. Creating a binary 'has_never_logged_in' feature captures this signal better than any imputation strategy." },
    { id:4, question:"What does a Q-Q (quantile-quantile) plot reveal about a feature's distribution?", options:["The correlation between that feature and the target variable","The quantile rank of each individual observation in the dataset","Whether the feature's distribution matches a theoretical distribution (usually normal) — points following the diagonal indicate normality; S-shaped deviations indicate heavy tails; bowed deviations indicate skewness","The relationship between the feature's mean and its variance"], correctAnswerIndex:2, explanation:"Many statistical tests and linear model diagnostics assume normality. A Q-Q plot quickly reveals whether this assumption holds. A feature that looks roughly normal in a histogram might reveal heavy tails in its Q-Q plot." },
  ],

  "handling-missing-data": [
    { id:1, question:"What is the practical difference between MCAR, MAR, and MNAR missing data?", options:["MCAR: the fact that a value is missing is completely random (safe to impute). MAR: missingness depends on other observed features (imputation conditioned on those features works). MNAR: missingness depends on the missing value itself — simple imputation introduces systematic bias","They are three names for the same type of missingness — all handled the same way","They describe what percentage of values are missing: MCAR < 5%, MAR 5-30%, MNAR > 30%","MCAR is the most dangerous; MNAR is the least problematic"], correctAnswerIndex:0, explanation:"MNAR is the most dangerous: if high-income individuals leave their income field blank, imputing the mean income for those cells introduces systematic bias — your model learns the wrong relationship between income and the target." },
    { id:2, question:"You fit a StandardScaler on your full dataset and then split into train/test. What went wrong?", options:["StandardScaler should be fit before splitting — this is the correct order","The scaler computed mean and std from both train and test data. Test statistics influenced the preprocessing — when you evaluate on the test set, the model has already 'seen' its distribution. This optimistically biases your evaluation","StandardScaler should not be used with train/test splits at all","Nothing — the order of splitting and scaling does not affect results"], correctAnswerIndex:1, explanation:"This is train-test contamination — the most common form of data leakage. Always: split first, fit scaler on X_train only, then transform both X_train and X_test using those training-derived parameters." },
    { id:3, question:"A loan application dataset has 'annual_income' missing for 22% of applicants. You discover that applicants who left income blank have a 3x higher default rate. What is the best approach?", options:["Impute with the median income and proceed as normal","Drop all rows with missing income — 22% is too high to impute","Create a binary 'income_not_disclosed' indicator feature AND impute the missing values — preserving both the signal in missingness and allowing the feature to contribute where it is known","Drop the annual_income column entirely since 22% missing is unacceptable"], correctAnswerIndex:2, explanation:"The missingness itself is a 3x default rate signal — too valuable to throw away. Adding a binary indicator preserves this signal. Imputing the actual values (with median or model-based imputation) allows the income feature to contribute for the 78% where it is known." },
    { id:4, question:"A feature has 1.5% missing values, and investigation shows the missingness appears completely random. What is the most pragmatic approach?", options:["Drop the entire feature — any missing data is risky in production","Rebuild the data collection pipeline before proceeding with any modelling","Apply MICE (Multiple Imputation by Chained Equations) — it is always the most accurate option","Either drop the affected rows or impute with mean/median — at 1.5% random missingness, the choice has negligible impact on model performance. Focus effort on higher-impact issues"], correctAnswerIndex:3, explanation:"Perfect is the enemy of good. At 1.5% random missingness, sophisticated imputation methods will not measurably improve results. Drop rows or use simple imputation and spend your time on features and models that actually matter." },
  ],

  "encoding-categorical": [
    { id:1, question:"Label encoding gives Mumbai=0, Delhi=1, Bengaluru=2 for a 'City' feature. What problem does this cause in a linear regression model?", options:["The model will refuse to train on integer-coded categories","The model treats the integers as meaningful quantities — implying Bengaluru (2) is twice Delhi (1), and Delhi is between Mumbai and Bengaluru on some scale. For nominal categories with no natural order, this is a false assumption that distorts the model","Label encoding automatically creates the same representation as one-hot encoding for linear models","The model performs better with integer codes than with one-hot vectors"], correctAnswerIndex:1, explanation:"Linear models assume numeric features have meaningful magnitude. Label encoding imposes a false ordinal relationship on nominal categories. One-hot encoding treats each city as an independent binary feature with no implied ordering." },
    { id:2, question:"A product category feature has 2,000 unique values. What is the problem with one-hot encoding it?", options:["sklearn's OneHotEncoder cannot handle more than 100 unique categories","One-hot encoding converts the values to floating-point numbers that tree models cannot process","You create 2,000 new binary columns — dramatically increasing dimensionality, slowing training, and risking overfitting. The sparse, wide representation is inefficient","The original category column is automatically duplicated, causing problems"], correctAnswerIndex:2, explanation:"High-cardinality one-hot encoding creates very sparse, wide datasets. Better alternatives for 2,000 categories: target encoding (mean target per category), hashing trick (fixed-size hash), or learned embeddings (for neural networks)." },
    { id:3, question:"What is the dummy variable trap and how does drop_first=True in pd.get_dummies() solve it?", options:["The trap is that dummy variables always contain errors — drop_first removes the error column","drop_first randomly removes one feature to reduce overfitting","The trap is that dummy encoding is slower than label encoding — drop_first speeds it up","When you one-hot encode n categories into n binary columns, those columns are linearly dependent (they always sum to 1). This creates perfect multicollinearity in linear models. drop_first removes one column, leaving n-1 independent indicators with the dropped category as the implicit reference"], correctAnswerIndex:3, explanation:"With [is_mumbai, is_delhi, is_bengaluru] summing to 1, you can always derive one from the others. This singular matrix breaks linear algebra. Removing one column (e.g., is_bengaluru) means Bengaluru is represented by is_mumbai=0 AND is_delhi=0." },
    { id:4, question:"Target encoding replaces each category with the mean target value for that category. What leakage risk must you manage?", options:["If you compute category means from the full dataset before splitting, each row's encoded value includes information from its own target label — the row literally contributes to its own encoding. Use out-of-fold target encoding or compute means only from training folds","Target encoding cannot be applied to regression problems — only binary classification","Target encoding always leaks — the only safe approach is one-hot encoding","Leakage only occurs if you use median rather than mean for target encoding"], correctAnswerIndex:0, explanation:"Encoding row i with the mean target of its category — computed from a dataset that includes row i — means the encoding partially reflects row i's own outcome. Always compute target encoding statistics exclusively from training data, using cross-fold computation for training rows." },
  ],

  "bias-variance": [
    { id:1, question:"A decision tree achieves 99.8% training accuracy and 61% test accuracy. What is the specific problem and what are two concrete fixes?", options:["High bias (underfitting) — fix by adding more features and training longer","Irreducible noise — no fix is possible","High variance (overfitting) — fix by limiting tree depth with max_depth and requiring a minimum number of samples per leaf with min_samples_leaf","Data leakage — fix by reordering the training examples"], correctAnswerIndex:2, explanation:"The 38-point training-test gap is classic overfitting. An unconstrained decision tree memorises training examples. max_depth limits how deep the tree can grow; min_samples_leaf prevents the model from fitting individual examples." },
    { id:2, question:"Training accuracy is 64% and validation accuracy is 62% on a 10-class classification problem. Both have been stable for many epochs. What is the diagnosis?", options:["High variance — the model is memorising training data","Irreducible error — the problem is inherently unlearnable","Correct performance — 64% is great for 10-class problems","High bias — the model is underfitting. Both train and validation are poor, meaning the model lacks the capacity to learn the patterns in this problem"], correctAnswerIndex:3, explanation:"When training and validation accuracy are both poor AND similar (small gap between them), the model is underfitting. There is no evidence of overfitting (which would show a large gap). Fix: increase model complexity, add features, reduce regularisation, or train longer." },
    { id:3, question:"You have high variance. Which intervention is most likely to help: collecting more training data or reducing regularisation?", options:["Collecting more training data — more examples make it harder for the model to memorise quirks, forcing it to learn general patterns. Reducing regularisation would increase variance, making the problem worse","Reducing regularisation — less regularisation always reduces variance","Both interventions help variance equally","Neither — high variance can only be fixed by changing the model architecture"], correctAnswerIndex:0, explanation:"High variance means the model is overfitting — too sensitive to the specific training examples. More data dilutes the influence of individual noisy examples. Reducing regularisation loosens the constraints that prevent overfitting, which would worsen variance." },
    { id:4, question:"What does 'irreducible error' mean in the bias-variance decomposition, and what can you do about it?", options:["Error from an incorrect learning algorithm — fix by trying different algorithms","Error inherent in the data itself — measurement noise, missing causal variables, genuine randomness. No model, no matter how complex, can eliminate it. You can minimise bias + variance but irreducible error is a floor","Error that appears only in the test set and goes away with more training data","Error caused by using the wrong performance metric during training"], correctAnswerIndex:1, explanation:"If you could perfectly predict whether someone will default on a loan, there would still be some people who genuinely could go either way depending on unforeseen life events. That inherent unpredictability is irreducible error." },
  ],

  "feature-scaling": [
    { id:1, question:"A housing dataset has 'size_sq_ft' (range: 500-5000) and 'num_bathrooms' (range: 1-5). Without scaling, how does this affect a KNN model?", options:["No effect — KNN treats all features as equally important by design","KNN internally normalises all features, so external scaling is redundant","Feature scaling makes KNN significantly slower so it is avoided in practice","The Euclidean distance calculation is completely dominated by size_sq_ft — a difference of 500 sq ft dwarfs a difference of 4 bathrooms. KNN's 'nearest neighbours' are essentially determined by size alone, ignoring bathrooms"], correctAnswerIndex:3, explanation:"KNN's core operation is distance computation. A 500 sq ft difference contributes 250,000 to squared Euclidean distance; a 4-bathroom difference contributes 16. StandardScaler makes both contribute equally." },
    { id:2, question:"Why does a Random Forest NOT need feature scaling before training?", options:["Random Forests split features at threshold values (e.g., size > 2500 sq ft). Whether size is scaled to mean=0 std=1 or left as raw square footage, the relative ordering of values is unchanged — the same split is found either way","Random Forests use a special internal normalisation step","Random Forests are too fast to bother with preprocessing steps","Scaling would change the tree structure and reduce accuracy for Random Forests"], correctAnswerIndex:0, explanation:"Tree-based models (Decision Tree, Random Forest, XGBoost, LightGBM) find splits by sorting feature values and trying thresholds. Monotonic transformations like standardisation don't change which threshold minimises impurity — the trees are identical." },
    { id:3, question:"Your income feature ranges from ₹15,000/month to ₹50,000,000/month due to 3 billionaires in the dataset. Which scaler is most appropriate and why?", options:["StandardScaler — it is always the default and works best","RobustScaler — it uses median and IQR instead of mean and std, making the scaling parameters resistant to the extreme values of the 3 billionaires","MinMaxScaler — it maps all values to exactly [0, 1] which handles outliers best","No scaling — income outliers are important signals and should not be modified"], correctAnswerIndex:1, explanation:"StandardScaler's mean and std are pulled dramatically by 3 billionaires, compressing all other values into a tiny range. RobustScaler's median and IQR are unaffected by extreme values, preserving the relative differences among the 99.9% of normal-income observations." },
    { id:4, question:"You computed mean=₹42,000 and std=₹18,000 from your training data and used them to scale X_train. What values do you use to scale X_test?", options:["Recompute fresh mean and std from X_test for the most accurate normalisation","Average the training and test means: (₹42,000 + test_mean) / 2","The same mean=₹42,000 and std=₹18,000 from training — recomputing from test data would leak test information into the preprocessing pipeline","Use mean=0 and std=1 for the test set since it represents the standardised reference"], correctAnswerIndex:2, explanation:"The scaler's parameters must be fixed from training data. If you recompute from test data, the test set's distribution influences how both sets are scaled — the model indirectly 'knows' the test set's characteristics before evaluation." },
  ],

  "feature-engineering": [
    { id:1, question:"An e-commerce dataset has a raw 'order_timestamp' column. What feature transformations might help predict order returns?", options:["Extract: hour of day (late-night purchases have higher return rates), day of week, days until month-end (financial stress), time since last purchase, and whether it's a sale period — each captures a different behavioural pattern","Nothing — raw timestamps cannot be decomposed into useful numeric features","Only convert the timestamp to Unix epoch seconds — all other decompositions lose information","Timestamps should always be dropped because they cause temporal data leakage"], correctAnswerIndex:0, explanation:"Raw timestamps are not directly predictive — but the patterns within them are. Late-night impulse purchases have higher return rates. End-of-month purchases correlate with financial stress. These patterns are invisible in the raw timestamp but become features that a model can learn from." },
    { id:2, question:"For churn prediction, 'account_age_days' and 'total_support_tickets' are each weakly predictive alone. What engineered feature might be more powerful?", options:["Multiply them together: account_age × support_tickets","Divide them: support_tickets / account_age_days = support intensity rate. A customer with 10 tickets in 30 days is very different from one with 10 tickets over 3 years — intensity is the meaningful signal","Square account_age — polynomial features always improve predictions","Bin account_age into 5 equal groups using pd.cut()"], correctAnswerIndex:1, explanation:"This is a rate feature — how often something happens per unit time. Support intensity captures the concept that matters (frustration frequency) rather than the raw counts that bury the signal under account age variation." },
    { id:3, question:"What is an interaction feature and when should you be cautious about creating them?", options:["An interaction feature is a feature that interacts with the model's hyperparameters","Interaction features are only valid in logistic regression, not other models","A new feature created by multiplying or combining two existing features, capturing their joint effect. Caution: with 50 original features, all pairwise interactions create 1,225 new features — dramatically increasing dimensionality and overfitting risk. Use domain knowledge or regularisation to select meaningful interactions","An interaction feature connects predictions from multiple models into an ensemble"], correctAnswerIndex:2, explanation:"The interaction between 'promotion_active' and 'customer_loyalty_tier' might predict conversion better than either alone. But blindly creating all 1,225 pairs from 50 features with only 500 training rows is guaranteed to overfit." },
    { id:4, question:"What makes a feature 'leaky' in the context of feature engineering, and why is it dangerous?", options:["A leaky feature has too many missing values — it 'leaks' nulls into the model","A feature is leaky if it was engineered from the test set rather than the training set","Leaky features are those that correlate too strongly with other features","A feature uses information that would not be available at prediction time — for example, using the doctor's final diagnosis as a feature when predicting whether a patient needs urgent care, when diagnosis only exists after the decision is made. The model appears extremely accurate in testing and fails completely in production"], correctAnswerIndex:3, explanation:"Target leakage is the most insidious ML mistake because it's invisible in offline evaluation. A model using a leaky feature achieves near-perfect test accuracy — and then fails immediately when deployed, because the 'future information' feature doesn't exist yet in production." },
  ],

  "feature-selection": [
    { id:1, question:"You have 300 features and 400 training examples. Why is feature selection particularly critical here?", options:["Feature selection only matters when you have more than 10,000 features","With more features than training examples, any model with enough capacity can find a hyperplane that perfectly separates training examples even when labels are random. Feature selection forces the model to find signals that are robust across different data samples","Feature selection only helps linear models — tree models handle any number of features","More features always improve predictions regardless of dataset size"], correctAnswerIndex:1, explanation:"This is the p >> n (more features than samples) regime where models will overfit to noise. With 300 features and 400 examples, a model has more parameters than data points and can easily fit random patterns." },
    { id:2, question:"What is the difference between filter methods and wrapper methods for feature selection?", options:["Filter methods use the model's output; wrapper methods use input statistics","Both methods train a model — they differ only in which metrics they use to evaluate features","Filter methods assess feature relevance using statistics independent of any model (e.g., correlation, mutual information) — fast but ignores feature interactions. Wrapper methods iteratively train the actual model on different feature subsets — more accurate but orders of magnitude slower","Filter methods work for regression; wrapper methods only for classification"], correctAnswerIndex:2, explanation:"Mutual information filter (fast, model-agnostic) vs. Recursive Feature Elimination (trains the model multiple times to find the most impactful subset). For an initial baseline, filter is practical; for a production pipeline, wrapper methods give better results if you can afford the compute." },
    { id:3, question:"Why is Lasso regularisation described as 'embedded' feature selection?", options:["Lasso uses a built-in visualisation tool to display selected features","Lasso manually removes features with low correlation before training begins","Lasso stores selected features in a separate database structure","Feature selection is embedded into the training process itself — Lasso's L1 penalty directly drives some coefficients to exactly zero during training. There is no separate preprocessing step; the model selects and fits simultaneously"], correctAnswerIndex:3, explanation:"Filter and wrapper methods are separate preprocessing steps. Lasso integrates selection into the loss function — the penalty for nonzero weights naturally eliminates uninformative features as part of finding the minimum loss." },
    { id:4, question:"Permutation importance reports that feature X has an importance of 0.002. What does this mean practically?", options:["When feature X's values are randomly shuffled (destroying its relationship with the target), model accuracy drops by only 0.002 — meaning X contributes almost nothing to the model's predictive power","Feature X explains 0.2% of the total variance in the target","Feature X was selected in 0.2% of bootstrap samples","Feature X has a correlation of 0.002 with the target variable"], correctAnswerIndex:0, explanation:"Permutation importance answers: 'How much worse does the model perform when it can no longer use this feature?' Near-zero importance means the model performs just as well without this feature — a strong case for removing it and simplifying the model." },
  ],

  "data-visualization": [
    { id:1, question:"When would you choose a violin plot over a boxplot to visualise a distribution?", options:["Violin plots should always replace boxplots — they contain more information","Violin plots are only appropriate for datasets with more than 10,000 observations","When you suspect the distribution might be bimodal or have an unusual shape — a boxplot compresses all shape information into 5 summary statistics and will look similar for a bimodal and a unimodal distribution, while a violin plot shows the full KDE shape","When comparing fewer than 3 groups — violin plots are too visually complex for multiple comparisons"], correctAnswerIndex:2, explanation:"A distribution with two peaks (e.g., customer purchase amounts split between ₹200 budget items and ₹5,000 premium items) will show a normal-looking boxplot. The violin's KDE reveals both peaks immediately." },
    { id:2, question:"You want to visualise the correlation structure among 80 features. What is the most effective approach?", options:["Create 3,160 scatter plots of every feature pair — one for each combination","A single correlation value averaged across all pairs — a lower number is better","A bar chart showing each feature's average correlation with all other features","A heatmap with a diverging colour scale (blue = strong negative, white = zero, red = strong positive) — at a glance you can see clusters of correlated features, isolated features, and potential multicollinearity problems"], correctAnswerIndex:3, explanation:"80×80 = 6,400 correlation values. Reading a table is impossible; reading 3,160 scatter plots takes a week. A heatmap maps the full correlation matrix to colour in a single image, making patterns immediately visible." },
    { id:3, question:"A scatter plot of 'house_age' vs 'price_per_sqft' shows a U-shaped relationship — prices are high for new houses, then drop, then rise again for old historic houses. What does this mean for a linear model?", options:["A linear model cannot capture this relationship — it would fit a flat line through the middle. Consider adding age² as a polynomial feature or using a non-linear model like XGBoost","A linear model is appropriate — the U-shape is just noise around a linear trend","The U-shape means these two variables are uncorrelated and both should be dropped","Remove old houses from the dataset to make the relationship linear"], correctAnswerIndex:0, explanation:"Visualising feature-target relationships before choosing a model is exactly the point of EDA. A U-shaped relationship in a scatter plot is a direct signal that you need at minimum a quadratic term if using a linear model." },
    { id:4, question:"What does a Q-Q (quantile-quantile) plot tell you that a histogram alone does not reliably reveal?", options:["The correlation between a feature and the target variable","Whether a distribution matches a theoretical distribution (usually normal) with precision in the tails — the tails of a histogram look similar for heavy-tailed and normal distributions at typical bin widths, but Q-Q plots separate them clearly","The exact number of outliers in the feature","The relationship between the feature's mean and the median"], correctAnswerIndex:1, explanation:"Histograms compress tail information into a few sparse bins that are hard to interpret. Q-Q plots directly compare your data's quantiles to theoretical quantiles — deviations from the diagonal reveal exactly how and where the distribution differs from normal." },
  ],
};

// Append part 2 marker
const _part1Done = true;


// PART 2 — Supervised Learning through Evaluation
Object.assign(quizData, {

  "regression-intro": [
    { id:1, question:"What distinguishes regression from classification?", options:["Regression uses trees; classification uses linear models","Regression is always more accurate","Regression is unsupervised; classification is supervised","Regression predicts continuous numerical values; classification predicts discrete category labels"], correctAnswerIndex:3, explanation:"Predicting house price (₹47 lakh) is regression. Predicting whether a house sells in under 30 days (yes/no) is classification — one of a finite set of categories." },
    { id:2, question:"A colleague reports 92% accuracy for a model predicting delivery time in minutes. Why is this suspicious?", options:["Accuracy is a classification metric. For continuous numerical predictions like delivery time, you need RMSE, MAE, or R². 'Accuracy' for a regression output is undefined unless someone secretly bucketed the output","92% is too high for any real problem","92% is an excellent result — no concern","The metric is only suspicious for imbalanced datasets"], correctAnswerIndex:0, explanation:"When someone reports accuracy for a regression problem, they have either made a conceptual error or converted the continuous output to buckets — which loses precision. Always ask which regression metric was actually computed." },
    { id:3, question:"Your regression model achieves RMSE=5 on training data and RMSE=23 on test data. What does this tell you?", options:["The test set must have harder examples","The model is severely overfitting — it has learned training noise rather than general patterns. A 4.6x worse RMSE on test is a clear signal to apply regularisation or reduce model complexity","RMSE values cannot be compared across datasets","The model is underfitting — both RMSEs should be higher"], correctAnswerIndex:1, explanation:"A 4.6x worse RMSE on test versus train is the signature of overfitting. The model memorised training-specific noise. Regularisation, simpler model, or more training data are the appropriate responses." },
    { id:4, question:"R²=0.81 for a house price model. A stakeholder asks what this means. What do you say?", options:["The model is 81% accurate","81% of predictions are exactly correct","81% of the variation in house prices across the dataset is captured by our model's features. The remaining 19% is due to factors not in the model","The model makes 81% fewer errors than always predicting the mean"], correctAnswerIndex:2, explanation:"R² measures the proportion of variance explained. It is one of the most non-technical ways to convey model quality: 'Our model explains 81% of why prices differ between houses.'" },
  ],

  "linear-regression": [
    { id:1, question:"A residual plot shows a funnel shape — residuals are small for low fitted values and large for high ones. What problem does this indicate?", options:["Heteroscedasticity — error variance is not constant. Linear regression assumes homoscedasticity. Try log-transforming the target variable to stabilise variance","This is the ideal residual plot","Multicollinearity between features","Overfitting — the model is too confident at high values"], correctAnswerIndex:0, explanation:"Homoscedasticity (constant error variance) is a key assumption. A funnel-shaped residual plot violates it. Log-transforming the target (predicting log price instead of price) often fixes this for monetary quantities." },
    { id:2, question:"A coefficient of 4.2 for years_experience in a salary model means precisely:", options:["4.2% of salary is explained by experience","Holding all other features constant, each additional year of experience is associated with a predicted salary increase of 4.2 (in salary units)","Experience is 4.2 times more important than other features","4.2 is the correlation between experience and salary"], correctAnswerIndex:1, explanation:"The 'holding all other features constant' part is critical and often forgotten. Linear regression coefficients have this specific ceteris paribus interpretation." },
    { id:3, question:"Two features correlate at 0.96. Training gives total_sq_ft coefficient=-127 and living_area=+219. How do you interpret this?", options:["These coefficients are reliable — high values mean important features","The negative coefficient means total size is harmful to house value","Multicollinearity has made individual coefficients unreliable and uninterpretable. A negative coefficient for total size makes no physical sense. The model may still predict well, but coefficients cannot be used for interpretation","Remove the feature with the larger coefficient"], correctAnswerIndex:2, explanation:"When features are highly collinear, the model can achieve the same prediction with many different coefficient combinations. The specific values become highly sensitive to noise and lose interpretability." },
    { id:4, question:"Your linear regression produces negative predictions for very old houses. What is most likely happening?", options:["Old houses are actually worth negative amounts — the model is correct","You need more features to fix negative predictions","The model has a bug in the prediction code","Linear regression extrapolates beyond the training distribution. If old houses were rare in training, the model extends its learned trend beyond reasonable limits. Tree-based models are less susceptible because they cannot extrapolate beyond training ranges"], correctAnswerIndex:3, explanation:"Linear regression is an extrapolating model — it has no built-in constraints on output range. Tree-based models return the mean of the nearest training leaf, so they cannot extrapolate beyond training data ranges." },
  ],

  "gradient-descent": [
    { id:1, question:"What does the learning rate control, and what happens if it is too large?", options:["It controls the number of training examples per batch","It controls step size at each update. Too large: updates overshoot the minimum — loss bounces without converging or diverges to infinity","It controls how many features are updated per step","Learning rate is the same as regularisation strength"], correctAnswerIndex:1, explanation:"Learning rate is the most important hyperparameter to tune first. Oscillating or diverging loss is the signature of too-high learning rate. Loss that barely moves after many epochs suggests too-low learning rate." },
    { id:2, question:"Training loss suddenly spikes to NaN after decreasing smoothly. What is most likely happening?", options:["The model has converged — NaN indicates zero gradient","NaN loss is normal for complex datasets","Numerical overflow from exploding gradients or a very high learning rate. Apply gradient clipping and reduce the learning rate","The training data contains NaN values"], correctAnswerIndex:2, explanation:"NaN loss is the signature of numerical overflow — gradients or weights have grown so large that floating-point arithmetic breaks down. Gradient clipping places an upper bound on gradient magnitude before each update." },
    { id:3, question:"What is the fundamental difference between batch gradient descent and SGD?", options:["Batch works for regression; SGD only for classification","Batch requires feature scaling; SGD does not","SGD uses a different loss function","Batch computes gradient using all training examples before each update (accurate but expensive). SGD updates after each single example (fast but noisy). Mini-batch (the practical default) updates after 32-256 examples"], correctAnswerIndex:3, explanation:"Mini-batch GD exploits GPU parallelism while taking frequent updates — the practical sweet spot. The noise in SGD is both a weakness (erratic path) and strength (can escape local minima)." },
    { id:4, question:"What is a saddle point and why does it cause problems in gradient descent?", options:["A point where the gradient is zero but it is neither a minimum nor maximum — a minimum in some directions and maximum in others. Gradient descent stalls because the gradient is zero, giving no update signal. Momentum-based optimisers (Adam) escape saddle points more reliably","A saddle point is where the loss equals zero","A saddle point is where learning rate becomes too small","Saddle points only exist in convex loss functions"], correctAnswerIndex:0, explanation:"In high-dimensional spaces (neural networks with millions of parameters), saddle points are far more common than local minima. Adam's adaptive learning rates and momentum help escape these flat regions." },
  ],

  "polynomial-regression": [
    { id:1, question:"A scatter plot of engine_temperature vs efficiency shows an inverted-U shape. What does this suggest?", options:["Use logistic regression since the relationship is non-monotonic","Delete data points on either side and fit a line to the middle","This is a degree-2 polynomial relationship. Adding temperature² as a feature lets a linear model capture this curvature — without it, linear regression would fit a flat line through the peak","Tree-based models cannot capture this relationship"], correctAnswerIndex:2, explanation:"The inverted-U is a quadratic relationship. A linear model cannot produce this shape. Adding the squared term gives the mathematical flexibility to capture the optimum." },
    { id:2, question:"You fit polynomial regression with degrees 1, 2, 3, 5, 10, 20 and plot training vs validation MSE. Describe what you expect.", options:["Both MSE values decrease as degree increases","MSE increases for all degrees above 1","Training and validation MSE are always equal","Training MSE decreases consistently. Validation MSE decreases initially (capturing real curvature), then increases at high degrees (fitting noise). The optimal degree is where validation MSE is minimised"], correctAnswerIndex:3, explanation:"This is the bias-variance tradeoff made concrete. Degree 1 has high bias. Degree 20 has high variance. The validation curve reveals the best tradeoff." },
    { id:3, question:"With degree-2 polynomial and 30 original features, how many total features does PolynomialFeatures produce?", options:["496 features: 30 originals + 30 squared terms + 435 pairwise interactions + 1 bias","60 features","900 features","61 features"], correctAnswerIndex:0, explanation:"Degree-2: 1 bias + 30 original + 30 squared + (30×29/2)=435 interactions = 496 total. This dimensionality explosion requires feature selection or regularisation." },
    { id:4, question:"Ridge regression is applied to a degree-15 polynomial that wildly oscillates between training points. What does Ridge do?", options:["Ridge removes all polynomial terms above degree 5","Ridge penalises large coefficient magnitudes — the wild oscillations come from very large positive and negative coefficients. Ridge shrinks them toward zero, creating a smoother curve without removing polynomial terms","Ridge converts degree-15 to degree-3 automatically","Ridge only helps with multicollinearity, not oscillation"], correctAnswerIndex:1, explanation:"High-degree polynomial oscillation (Runge's phenomenon) is caused by extremely large coefficients of alternating sign. Ridge's L2 penalty prevents them from growing large, damping oscillation while retaining flexibility." },
  ],

  "ridge-regression": [
    { id:1, question:"What penalty does Ridge Regression add to the MSE loss?", options:["λ × sum of absolute weights (L1)","λ × number of nonzero weights","λ × maximum weight value","λ × sum of squared weights (L2): Loss = MSE + λΣwᵢ²"], correctAnswerIndex:3, explanation:"The L2 penalty squares weights before summing. Large weights are penalised disproportionately more than small weights, creating strong pressure to keep all weights small and stable." },
    { id:2, question:"Why does Ridge specifically help when features are highly correlated?", options:["Standard OLS becomes numerically unstable when features are collinear (X'X is nearly singular). Ridge adds λI to X'X before inverting, making the matrix well-conditioned and producing stable coefficient estimates under multicollinearity","Ridge automatically removes correlated features","Ridge converts correlated features into uncorrelated ones","Ridge only helps when you have more features than examples"], correctAnswerIndex:0, explanation:"OLS solves (X'X)⁻¹X'y. With multicollinearity, X'X is nearly singular — small data changes cause huge coefficient changes. Ridge solves (X'X + λI)⁻¹X'y, which is always invertible and stable." },
    { id:3, question:"You try λ values [0.001, 0.01, 0.1, 1, 10, 100] using 5-fold CV. Best validation RMSE is at λ=10, but training RMSE is higher there than at λ=0.001. Is this a problem?", options:["Yes — training RMSE must always be lower than validation RMSE","No — this is correct behaviour. Higher λ means more regularisation, which intentionally increases training error slightly (adds bias) to reduce overfitting (reduce variance). Best validation RMSE at λ=10 means this tradeoff favours generalisation","Yes — always pick the λ with lowest training RMSE","No — Ridge minimises both training and validation RMSE simultaneously"], correctAnswerIndex:1, explanation:"Regularisation deliberately accepts higher training error to achieve better generalisation. The validation RMSE is the only metric you should use to select λ." },
    { id:4, question:"Ridge shrinks coefficients toward zero but never to exactly zero. When is this a disadvantage?", options:["Ridge should never be used when exact zeros are needed — use logistic regression","Ridge always gives worse predictions than Lasso","If the true model is sparse (only 10 of 500 features are relevant), Ridge keeps all 500 with small nonzero weights — hard to interpret and requiring computation of all 500 features at prediction time. Lasso (L1) drives irrelevant coefficients to exactly zero, giving a cleaner sparse model","Ridge should be combined with one-hot encoding to eliminate the problem"], correctAnswerIndex:2, explanation:"Ridge produces dense models — all features get weights. For interpretability or when you want to eliminate irrelevant features entirely, Lasso's sparsity property is more appropriate." },
  ],

  "lasso-regression": [
    { id:1, question:"What makes Lasso's L1 penalty produce exactly zero coefficients while Ridge's L2 only shrinks them close to zero?", options:["The L1 constraint region is diamond-shaped with corners on the axes. Optimal solutions typically land at corners where one or more coordinates are exactly zero. The L2 ball has no corners — the intersection always occurs at a point with all coordinates nonzero","Lasso has a stronger penalty by convention","Lasso applies a rounding step that zeros small coefficients","Lasso adds a post-training check that zeros coefficients below a threshold"], correctAnswerIndex:0, explanation:"This geometric intuition explains why L1 and L2 have such different behaviour. The diamond's corners create attractors where coefficients land at zero; the circle has no such attractors." },
    { id:2, question:"A dataset has 800 features and domain experts believe only 15-20 are genuinely predictive. Which regularisation is most appropriate?", options:["Ridge — it handles large numbers of features better","Lasso — it will drive the ~780 irrelevant features to exactly zero during training, producing a sparse, interpretable model that domain experts can validate against their prior knowledge","Always use Elastic Net instead of either","No regularisation needed — the model will ignore irrelevant features automatically"], correctAnswerIndex:1, explanation:"This is Lasso's primary use case: high-dimensional data where sparsity is expected. After training, you can show domain experts a list of 15 features with nonzero weights." },
    { id:3, question:"Lasso is applied to a genomics dataset where 50 genes are highly co-expressed. What will Lasso likely do?", options:["Lasso assigns equal weight to all 50 co-expressed genes","Lasso averages the 50 genes into a single representative","Lasso arbitrarily selects one gene from the co-expressed group and zeros out the other 49 — even though they are all equally informative. Ridge retains all 50 with small weights; Elastic Net selects a subset of the group","Lasso reports an error when features are perfectly correlated"], correctAnswerIndex:2, explanation:"Lasso's arbitrary selection among correlated features is a known weakness. Elastic Net (or Group Lasso) is preferred when correlated features should be handled as a group." },
    { id:4, question:"At λ→0 and λ→∞, what does a Lasso model predict?", options:["Set λ=1 as the universal default","At λ→∞, Lasso removes only the weakest feature and keeps all others","At λ→∞, Lasso selects the single most important feature","At λ→0, Lasso approaches standard OLS with all features nonzero. At λ→∞, all coefficients are forced to zero and the model predicts the training mean for every input. Use cross-validation (LassoCV) to find the optimal λ between these extremes"], correctAnswerIndex:3, explanation:"LassoCV efficiently searches over a path of λ values using warm starting. The two extremes illustrate the full regularisation spectrum: from pure OLS to 'ignore all features.'" },
  ],

  "classification-intro": [
    { id:1, question:"A model predicts not-fraud for every transaction, achieving 99.8% accuracy on a fraud dataset. Why is this model useless?", options:["99.8% is too high — the model is overfitting","With only 0.2% fraud, predicting not-fraud always achieves 99.8% accuracy while catching exactly zero fraud. Accuracy completely conceals this failure. Switch to recall, F1-score, or PR-AUC to expose it","The model is good — it only misses 2 in 1000 transactions","This only matters if fraud rates exceed 10%"], correctAnswerIndex:1, explanation:"The accuracy paradox: a trivial model that ignores all features appears excellent when classes are imbalanced. Recall of the fraud class is 0% — the model is completely useless for the actual business problem." },
    { id:2, question:"In medical screening, which type of error is more dangerous and what threshold strategy follows?", options:["False Positive — incorrectly diagnosing a healthy person","Both are equally dangerous — use default threshold 0.5","False Negative — missing a patient who has the disease. Set the threshold low (e.g., 0.2-0.3) to ensure high recall, even at the cost of lower precision. Missing a true case can be fatal; a false alarm leads to more tests, not death","Use the threshold that maximises F1-score since it balances both equally"], correctAnswerIndex:2, explanation:"In medical screening, the cost asymmetry strongly favours recall. A missed cancer is potentially fatal; an unnecessary follow-up test is an inconvenience. Set the threshold low and accept more false alarms." },
    { id:3, question:"What is a multi-label classification problem and how does it differ from multi-class?", options:["They are the same thing — just different terminology","Multi-label is only possible with neural networks","Multi-label uses regression outputs, not classification","In multi-class, each example belongs to exactly one class. In multi-label, each example can simultaneously belong to multiple classes. Example: a news article tagged as both technology and business simultaneously. This requires specialised algorithms — standard multi-class classifiers assume mutually exclusive outputs"], correctAnswerIndex:3, explanation:"Multi-label is common: image tagging (one photo can have both a dog and a cat), document classification (one document can cover multiple topics). Standard multi-class classifiers cannot be used without modification." },
    { id:4, question:"What is the decision boundary in a classification model?", options:["The line, curve, or hyperplane in feature space separating predicted classes. Linear classifiers produce straight line boundaries; SVMs with RBF kernel produce curved ones; tree models produce rectangular axis-aligned boundaries","The accuracy threshold at which a model is acceptable","The boundary between training and test data","The maximum number of features the model can handle"], correctAnswerIndex:0, explanation:"Decision boundary visualisation is one of the most powerful tools for understanding classifier behaviour. The shape of the boundary reveals what type of model is appropriate for a given dataset." },
  ],

  "logistic-regression": [
    { id:1, question:"Why does logistic regression use the sigmoid function rather than a linear output?", options:["Sigmoid speeds up gradient descent convergence","Sigmoid adds non-linearity allowing logistic regression to model complex boundaries","A linear combination of features can produce any real number, but probabilities must be in (0,1). The sigmoid maps any real input to (0,1), making the output interpretable as a class probability. Without it, the model could predict probabilities of -3.7 or 12.4","Sigmoid is computationally cheaper than alternatives"], correctAnswerIndex:2, explanation:"This is the fundamental motivation for the sigmoid. The log-odds (logit) is linear: log(p/(1-p)) = Xw. Taking the inverse logit gives the sigmoid. The model is linear in log-odds space but produces probabilities through the sigmoid transformation." },
    { id:2, question:"Logistic regression predicts default probability 0.92 for a loan applicant. At what threshold would you NOT flag this applicant?", options:["There is no threshold — 0.92 is always high-risk","The threshold only affects cases near 0.5","The threshold must be fixed at 0.5 by regulation","Only a threshold above 0.92 would not flag this applicant. At any threshold ≤0.92 (including the standard 0.5), they are predicted as positive. Moving the threshold above 0.92 changes the prediction — but this would miss almost all defaults"], correctAnswerIndex:3, explanation:"The threshold determines which probabilities become positive predictions. With p=0.92: threshold 0.5→positive, threshold 0.8→positive, threshold 0.95→negative. Raising threshold above 0.92 changes this specific prediction but at the cost of missing other likely defaults." },
    { id:3, question:"Logistic regression performs poorly and residual analysis confirms the log-odds relationship is non-linear. What is the appropriate fix?", options:["Add polynomial features or interaction terms to capture non-linearity within the framework, or switch to a non-linear model (Random Forest, XGBoost) that learns complex boundaries without manual feature engineering","Increase regularisation — this always improves logistic regression","Add more training data — logistic regression becomes non-linear with enough data","Apply PCA — it always improves logistic regression on non-linear data"], correctAnswerIndex:0, explanation:"Logistic regression is a linear classifier — its decision boundary is always a hyperplane. Non-linear boundaries require either feature engineering (explicit non-linear features) or switching to inherently non-linear models." },
    { id:4, question:"Your classifier achieves precision=0.41, recall=0.87 for fraud. A risk manager says precision is unacceptably low. What options do you have?", options:["Nothing — precision and recall cannot be changed after training","Raise the classification threshold above 0.5 — predict fraud only when the model is more confident. This reduces false positives (higher precision) but also reduces true positives (lower recall). The business must decide which error is more costly","Retrain with higher regularisation — this always improves precision","Switch to a different algorithm — some inherently produce fewer false positives"], correctAnswerIndex:1, explanation:"Precision and recall are properties of the model at a specific threshold, not fixed model properties. Raising the threshold increases precision at the cost of recall. The business must decide the acceptable operating point." },
  ],

  "decision-trees": [
    { id:1, question:"At a node with 60 class-A and 40 class-B examples, what is the Gini Impurity?", options:["(60-40)/100 = 0.20","60/40 = 1.50","0.6 × 0.4 = 0.24","1 - (0.6² + 0.4²) = 1 - (0.36 + 0.16) = 0.48"], correctAnswerIndex:3, explanation:"Gini = 1 - Σpᵢ² = 1 - (0.36+0.16) = 0.48. A perfectly pure node (all one class) has Gini=0. This 60/40 split is relatively impure — the tree looks for a feature split that reduces this in both child nodes." },
    { id:2, question:"What does setting min_samples_leaf=20 do, and how does it affect bias-variance?", options:["Each leaf node must contain at least 20 training examples. This prevents the tree from creating leaves for individual examples — increasing bias slightly but substantially reducing variance by preventing memorisation of small groups","The tree can only be trained if at least 20 examples exist total","The tree must make exactly 20 splits","min_samples_leaf controls features considered at each split"], correctAnswerIndex:0, explanation:"Without min_samples_leaf, a tree can create leaves for single examples (perfect training accuracy, terrible generalisation). min_samples_leaf forces the tree to generalise — each split must be supported by at least 20 examples." },
    { id:3, question:"Decision trees are described as 'high variance' models. What does this mean concretely?", options:["Decision trees always produce very large prediction values","Train a tree on 80% of your data, then on a slightly different 80% sample — the two trees will have different structures, different split features, different thresholds. Small changes in training data produce large changes in the model. This is high variance","High variance means the tree model is more accurate","High variance refers to Gini impurity values at each split"], correctAnswerIndex:1, explanation:"This is the precise definition of variance in the bias-variance sense. Random Forest reduces this by averaging many such trees — each trained on different bootstrap samples with different feature subsets." },
    { id:4, question:"A shallow tree (max_depth=3) consistently misclassifies the same 15% of examples regardless of training sample. What is the likely problem?", options:["Overfitting — the tree is too complex","Data leakage — the 15% have information from the future","High bias (underfitting) — the tree is too shallow to capture patterns for those 15% of examples. Consistent misclassification that doesn't depend on which training sample is used is the signature of systematic failure, not noise sensitivity","Class imbalance — the 15% are probably all minority class"], correctAnswerIndex:2, explanation:"Systematic, consistent errors that don't depend on training sample are the signature of high bias. The model is missing something fundamental. Fix: increase max_depth, add features, or try a non-linear model." },
  ],

  "naive-bayes": [
    { id:1, question:"What does naive mean in Naive Bayes, and why is this assumption made despite being wrong?", options:["Naive Bayes assumes all features are conditionally independent given the class — almost always violated in real data. The assumption is made because it allows O(n×d) training instead of exponential training needed for a full joint distribution over all features","The model is naive because it was designed for beginners","Naive means the model has no regularisation","The model ignores feature ordering in text"], correctAnswerIndex:0, explanation:"Without the independence assumption, learning P(all features|class) requires exponentially many parameters. The naive assumption makes the problem tractable: P(features|class) = ΠP(featureᵢ|class), one parameter per feature per class." },
    { id:2, question:"Despite the independence assumption being violated, Naive Bayes works well for spam classification. Why?", options:["Spam emails actually have independent words","Even if probabilities are wrong in absolute terms, the relative ranking of class probabilities is often preserved. Classification only requires identifying the highest-probability class, not accurate probability values","Naive Bayes uses a correction factor automatically","The violation doesn't matter because spam uses only word counts"], correctAnswerIndex:1, explanation:"Classification accuracy requires only P(spam|email) > P(not-spam|email), not calibrated probabilities. The independence assumption degrades calibration but often preserves the ordering, keeping accuracy high." },
    { id:3, question:"During training, the word cryptocurrency never appeared in spam. Without smoothing, what happens when the model sees a spam email containing it?", options:["The word is ignored and the rest is scored normally","The most similar word's probability is substituted","P(cryptocurrency|spam)=0, which makes P(email|spam)=0 no matter what other spam signals are present. The email can never be classified as spam regardless of containing 100 other spam words. Laplace smoothing adds 1 to every word count, ensuring no probability is ever exactly zero","It is treated as a missing feature and imputed with the mean spam word probability"], correctAnswerIndex:2, explanation:"This is the zero-frequency problem. One unseen word multiplies the entire class probability by zero. Laplace smoothing: add 1 to every word count so every word always has a nonzero probability." },
    { id:4, question:"You have 50,000 training examples, 200,000 vocabulary features, and need a model in 2 hours. Why is Naive Bayes an excellent starting point?", options:["Naive Bayes is always the best text classification model","Naive Bayes is the only algorithm handling 200,000 features","Naive Bayes requires no preprocessing and works on raw text","Naive Bayes trains in O(n×d) time — scanning training examples once to count word frequencies per class. For 50,000 documents and 200,000 vocabulary terms, training is nearly instant. It provides a strong baseline in minutes, benchmarked against which you can justify spending time on more expensive models"], correctAnswerIndex:3, explanation:"Naive Bayes is the standard first baseline for text classification. It trains in seconds on datasets that would take hours for gradient boosting or BERT fine-tuning." },
  ],

  "knn": [
    { id:1, question:"You train KNN with k=1 and achieve 100% training accuracy. Why is this expected and not impressive?", options:["100% accuracy means KNN has perfectly learned the pattern","With k=1, each training point's nearest neighbour is itself — the model simply returns the known label for every training example. This is memorisation, not learning. Training accuracy is irrelevant; only test accuracy matters","KNN with k=1 is perfectly regularised","KNN always achieves 100% training accuracy regardless of k"], correctAnswerIndex:1, explanation:"k=1 KNN is the most extreme overfitter possible — it memorises every training label. Always evaluate KNN on held-out test data." },
    { id:2, question:"Feature A has values [0,1] and Feature B has values [0,100000]. Without scaling, how does KNN compute distances?", options:["KNN normalises features internally before computing distance","KNN uses cosine similarity by default, which is scale-invariant","Euclidean distance is dominated almost entirely by Feature B — a difference of 1 in B contributes 1,000,000× more to squared distance than a difference of 1 in A. Feature A is effectively invisible","KNN uses ordinal rankings, making it scale-invariant"], correctAnswerIndex:2, explanation:"This is why StandardScaler is mandatory before KNN. Without it, high-magnitude features monopolise distance calculations regardless of their actual predictive importance." },
    { id:3, question:"KNN with k=7 achieves 89% test accuracy. You increase k to 500. What do you expect?", options:["Test accuracy improves — more votes means more accuracy","Increasing k makes KNN equivalent to a neural network","Test accuracy is guaranteed to stay the same","Test accuracy will likely decrease. With k=500, each prediction is a majority vote from half the training set — the boundary flattens toward the dominant class everywhere. The model becomes oversmoothed, essentially predicting the global prior"], correctAnswerIndex:3, explanation:"k acts as a smoothness parameter. Small k → complex boundary (low bias, high variance). Large k → smooth boundary approaching the majority class baseline (high bias, low variance)." },
    { id:4, question:"Why is KNN rarely used as a primary model in production despite its simplicity?", options:["Prediction latency scales as O(n×d) — for each new example, you compute distances to all n training examples. With 10 million training examples and 100 features, each prediction requires 1 billion distance calculations. All computation happens at prediction time, not training time","KNN is too inaccurate for production","KNN cannot be serialised and saved to disk","KNN requires retraining from scratch for each new prediction"], correctAnswerIndex:0, explanation:"KNN's lazy learning is its production Achilles heel. Approximate nearest-neighbour algorithms (FAISS, Annoy, ScaNN) make KNN-like retrieval practical by trading exact accuracy for speed." },
  ],

  "svm": [
    { id:1, question:"What is the maximum margin that SVM optimises and why does it improve generalisation?", options:["SVM maximises the number of support vectors","SVM maximises the probability of correct classification on training set","SVM finds the hyperplane maximising the distance between the nearest examples of each class and the boundary. Larger margin means more tolerance of perturbations in new data — a new point must be further wrong before it crosses the boundary","SVM maximises the gap between training and test accuracy"], correctAnswerIndex:2, explanation:"The maximum margin hyperplane has the most buffer room between classes. Intuitively: it is least likely to misclassify a new point that is slightly different from training examples." },
    { id:2, question:"SVM with C=0.001 produces wide margin with 15% training error. C=1000 produces narrow margin with 0.5% training error. Which generalises better?", options:["C=1000 — lower training error always means better generalisation","C=1000 is guaranteed to generalise better by SVM theory","They will generalise equally","Likely C=0.001 — the wide margin is more regularised and achieves a safer, more generalisable boundary. C=1000's near-zero training error suggests overfitting to specific training points. Cross-validate to confirm"], correctAnswerIndex:3, explanation:"Small C = wide margin = high regularisation = accept more training mistakes. Large C = narrow margin = enforce training accuracy at the risk of overfitting." },
    { id:3, question:"You apply SVM to a dataset with 500,000 training examples. What computational challenge should you anticipate?", options:["SVM training is O(n²) to O(n³) — the kernel matrix K where Kᵢⱼ=kernel(xᵢ,xⱼ) requires storing n² values (250 billion entries for n=500,000). Standard SVM is impractical for very large datasets; use LinearSVC (SGD-based) which scales to millions","SVM training is O(n) and handles this trivially","SVM has no scalability limitations","SVM uses special algorithms at exactly 500,000 examples that are O(n log n)"], correctAnswerIndex:0, explanation:"This is SVM's key practical limitation. sklearn's SVC with RBF kernel becomes untrainable above ~100,000 examples. LinearSVC scales to millions. For large datasets with non-linear patterns, XGBoost or neural networks are more practical." },
    { id:4, question:"What does the kernel trick actually compute, and why is it a trick?", options:["The kernel trick proves SVMs converge to the global optimum","SVM only needs dot products between examples to find the margin. The kernel trick substitutes K(xᵢ,xⱼ) — a function that computes the dot product in a high-dimensional transformed space without explicitly computing that transformation. You get the power of infinite dimensions at the cost of original space computation","The kernel trick converts non-linear problems to linear by removing difficult examples","A kernel is a similarity measure replacing distance calculations"], correctAnswerIndex:1, explanation:"The trick: K(x,z) = φ(x)·φ(z) where φ maps to higher-dimensional space. You never compute φ(x) explicitly — K gives you the dot product directly. For RBF kernel, φ maps to infinite dimensions, yet K(x,z) = exp(-γ||x-z||²) is trivial to compute." },
  ],

  "train-test-split": [
    { id:1, question:"Why is it important to shuffle your dataset before splitting?", options:["Without shuffling, any ordering (sorted by class, date, customer ID) makes the split systematically unrepresentative. All class-B examples might end up in test, or all recent data in test while old data is training. Shuffling ensures both sets are random samples from the full distribution","Shuffling improves model accuracy by randomising the learning order","Shuffling is optional and has negligible effect","Shuffling is only required for neural networks"], correctAnswerIndex:0, explanation:"Real datasets are almost never randomly ordered. Medical records are often sorted by admission date. Without shuffling, you may inadvertently create a systematically biased test set." },
    { id:2, question:"You are building a model to predict tomorrow's stock price from today's market data. Why is random shuffling harmful?", options:["Random shuffling is always correct regardless of data type","Stock prices are time series — shuffling destroys the temporal ordering. If you randomly split, training examples from 2024 could predict test examples from 2023 — you're training on the future to predict the past. Always use time-based splits: train on data before a cutoff date, test on data after it","Shuffling is only harmful with fewer than 1,000 examples","Shuffle but add a time feature to compensate"], correctAnswerIndex:1, explanation:"Temporal data requires temporal splits. Any random mixing allows the model to learn from future patterns when predicting past observations — leakage that makes test performance look good but deployment performance poor." },
    { id:3, question:"You use 80/20 split and report 91.3% test accuracy. Your colleague points out the test set has only 150 examples. Should you trust this estimate?", options:["Yes — test set accuracy is always reliable","Completely reliable — test set size doesn't matter","With 150 examples, the 95% confidence interval around 91.3% accuracy is approximately ±4.5%. True accuracy is likely between 86.8% and 95.8% — a 9-point wide interval. You cannot confidently distinguish a model with 87% from one with 95% accuracy. Use cross-validation for reliable estimation","Only neural network accuracy estimates require large test sets"], correctAnswerIndex:2, explanation:"The binomial CI for accuracy p on n examples is approximately p ± 1.96√(p(1-p)/n). At n=150, p=0.913: CI ≈ 0.913 ± 0.046. Too wide to make confident model comparisons." },
    { id:4, question:"Is it ever acceptable to retrain your model on the test set after initial evaluation?", options:["Yes — using more data always improves the model","Yes, as long as you do cross-validation afterward","Yes, but only if the model achieved above 85% accuracy","No — the test set's value comes from being genuinely held-out data simulating deployment. Retraining on it contaminates your model with test information and makes future evaluation impossible. If you want to use all data after final evaluation, retrain on train+test combined but understand you have no way to estimate generalisation performance"], correctAnswerIndex:3, explanation:"The test set is sacred. Once you touch it, you have no clean held-out data left. Reserve it for one final evaluation, after all development decisions are made." },
  ],

  "cross-validation": [
    { id:1, question:"Why can a single 80/20 split give misleading model comparisons?", options:["80/20 splits are always reliable","Performance depends significantly on which specific 80% ended up in training. By luck, the test set might contain unusually easy or hard examples. Two algorithms might show different rankings on different random splits. Cross-validation averages over multiple splits, giving a mean and standard deviation far more stable for comparison","80/20 splits are misleading only when class balance differs","Two algorithms can only be fairly compared using the same test set"], correctAnswerIndex:1, explanation:"A single split is one roll of the dice. Algorithm A beats B on one split; B might beat A on a different split from the same data. Cross-validation reduces this variance by averaging multiple rolls." },
    { id:2, question:"What is the difference between k-fold and stratified k-fold, and when is the latter critical?", options:["Stratified trains on more data — always better","Stratified k-fold is only needed for more than 5 classes","Standard k-fold randomly assigns examples to folds without regard to class. With imbalanced classes (2% fraud), one fold might by chance have 0 fraud examples — producing undefined class-specific metrics. Stratified k-fold maintains class distribution within each fold, ensuring every fold has approximately 2% fraud examples. Critical whenever class imbalance is present","Stratified k-fold trains on stratified samples but evaluates on random test folds"], correctAnswerIndex:2, explanation:"With severe imbalance and 5 folds, standard k-fold might create one fold with 0 positive examples. Recall and F1 are undefined for a fold with no positives. Stratified k-fold guarantees proportional class representation." },
    { id:3, question:"Model A: mean=0.87, std=0.03 on 5-fold CV. Model B: mean=0.86, std=0.08. Which do you prefer for production?", options:["Model B — 0.86 is close enough and std doesn't matter for deployment","Neither — you need at least 10-fold CV before deciding","Model B — higher variance means potential for higher peak performance","Model A — not only higher mean, but lower std (0.03 vs 0.08) indicates far more consistent behaviour. Model B's high variance means its performance could be 0.78 or 0.94 depending on what data it encounters. Stability is a critical production requirement"], correctAnswerIndex:3, explanation:"High variance in CV scores means the model is sensitive to which data it trains on. In production you cannot control what data the model encounters. Consistent moderate performance beats occasionally high but often low performance." },
    { id:4, question:"What is nested cross-validation and why is it needed for unbiased model selection?", options:["Nested CV uses two loops: the outer loop estimates generalisation performance, the inner loop selects hyperparameters. For outer fold k: use k as test, train on remaining. Within training data, run inner CV to pick optimal hyperparameters. Evaluate the model with those hyperparameters on outer fold k. This separates selection from evaluation — reporting inner CV score conflates both and produces optimistic estimates","Nested CV uses two different algorithms — one inside and one outside","Nested CV trains on nested overlapping folds to use more data","Nested CV is only needed when comparing more than 10 model types"], correctAnswerIndex:0, explanation:"Without nested CV: you tune hyperparameters using CV then report that same CV score — selection bias. Nested CV provides an unbiased estimate of the expected performance of the entire model selection procedure." },
  ],

  "overfitting-underfitting": [
    { id:1, question:"A model trained on 2019-2021 loan data achieves 93% test accuracy but only 61% when deployed in 2024. What is most likely happening?", options:["The model is overfitting — it memorised 2019-2021 training data","The model is underfitting — add more features from 2024","Distribution shift — the relationship between applicant features and default risk changed between 2019-2021 and 2024 (pre vs post-pandemic economic conditions). The model learned valid 2019-2021 patterns that no longer hold. This is concept drift, not overfitting — it generalised well within its training distribution but the distribution itself changed","The test accuracy must have been wrong — investigate leakage"], correctAnswerIndex:2, explanation:"Overfitting fails immediately on test data from the same distribution. Distribution shift produces good in-distribution generalisation but poor out-of-distribution performance. Fix: retrain with recent data, use domain adaptation, or implement monitoring and retraining triggers." },
    { id:2, question:"How do learning curves (training and validation error vs training set size) help diagnose bias vs variance?", options:["Learning curves only diagnose overfitting","Learning curves are only valid for neural networks","Learning curves show which features are most important","High bias: both training and validation error plateau high — more data doesn't help, the model lacks capacity. High variance: training error is low but validation error is high with a large gap — both converge as you add more data. If validation error is still declining at current data size, more data will help"], correctAnswerIndex:3, explanation:"Learning curves answer: what is limiting my model right now? Both plateau high = get a better model. Large gap that closes with more data = collect more examples. This guides your next action." },
    { id:3, question:"What is weight decay in neural network training and why is it equivalent to L2 regularisation?", options:["At each update step, weight decay multiplies all weights by (1-ε) before adding the gradient update, shrinking them toward zero. Mathematically equivalent to adding λΣwᵢ² to the loss function — both produce the same weight update formula. Weight decay prevents any single weight from growing too large","Weight decay is a training schedule that reduces the learning rate over time","Weight decay randomly drops weights to zero — equivalent to dropout","Weight decay and L2 regularisation produce different results in practice"], correctAnswerIndex:0, explanation:"In standard gradient descent, L2 regularisation and weight decay are exactly equivalent. They differ under adaptive optimisers (like Adam) — AdamW applies weight decay correctly without scaling it with adaptive learning rates, which is why AdamW outperforms Adam+L2 for transformers." },
    { id:4, question:"Your model has 0.3% training error and 31% test error. List possible causes in order of likelihood:", options:["Underfitting, wrong architecture, insufficient epochs","Data leakage (most likely — explains extreme training performance that disappears at test time), then severe overfitting with too few training examples, then a bug in the train/test split causing overlap between train and test sets","Wrong optimiser, too many layers, insufficient dropout","Class imbalance, wrong loss function, missing feature normalisation"], correctAnswerIndex:1, explanation:"A 0.3% training error paired with 31% test error is so extreme that leakage is the first explanation to investigate. After ruling that out: perhaps very few training examples were memorised. The severity of the gap drives the investigation order." },
  ],

  "cost-functions": [
    { id:1, question:"MSE loss is 9 for a 3-unit error and 81 for a 9-unit error. Why does this disproportionate scaling matter?", options:["It doesn't — all loss functions treat errors proportionally","Disproportionate scaling is desirable — it ensures focus on the worst mistakes","MSE's quadratic scaling makes gradient computation faster","The quadratic growth means large errors dominate the loss during training. If your dataset has a few genuine outliers, MSE will cause the model to heavily optimise for them at the expense of typical examples. MAE (linear scaling) treats the outlier error as 9 rather than 81 — more proportional to typical errors"], correctAnswerIndex:3, explanation:"The choice between MSE and MAE is a business decision about outlier treatment. Financial prediction: genuine outliers matter disproportionately → MSE appropriate. Medical measurement with noisy errors → MAE or Huber appropriate." },
    { id:2, question:"Cross-entropy for a true positive (y=1) with predicted probability p=0.01 gives loss = -(1×log(0.01)) ≈ 4.6. Why is this high loss appropriate?", options:["It is too high — the loss should be proportional to how wrong the prediction was","The model was 99% confident the positive example was negative. Loss=4.6 is appropriately large because the model was extremely wrong and confident. The logarithm creates large penalties for confident wrong predictions — exactly the behaviour needed to push the model toward calibrated probabilities","Loss=0.01 because the prediction is close to 0","Loss=1.0 because any wrong binary prediction loses exactly 1 point"], correctAnswerIndex:0, explanation:"log(0.01) = -4.6, so loss = 4.6. This large penalty appropriately reflects the model's extreme overconfidence in the wrong direction. MSE would give (0.99-1)² = 0.0001 — a negligible signal that fails to correct the model." },
    { id:3, question:"When should you use Huber loss instead of MSE or MAE?", options:["Always — Huber is strictly better than both","When your data has genuine outliers you cannot remove but you still want gradient stability near zero (which MAE's non-differentiable point causes). Huber behaves like MSE for small errors (smooth gradients) and like MAE for large errors (resistant to outliers). The threshold δ separates these regimes and must be tuned","When you have more than 10,000 examples","When your target is bounded between 0 and 1"], correctAnswerIndex:1, explanation:"MAE has zero gradient at zero error — gradient descent struggles near the minimum. MSE's quadratic growth makes outliers dominate. Huber gets gradient stability from MSE (near zero) and outlier robustness from MAE (far from zero)." },
    { id:4, question:"You are building a model outputting a probability distribution over 5 product categories. Which loss function is correct?", options:["MSE between predicted probabilities and one-hot labels","Binary cross-entropy applied 5 times independently","Categorical cross-entropy: Loss = -Σᵢ yᵢ log(pᵢ) where yᵢ=1 for the true class. This is the maximum likelihood estimate under a categorical distribution, creates proper gradients, and penalises confident wrong predictions through the log function","Mean Absolute Error between one-hot vector and softmax output"], correctAnswerIndex:2, explanation:"Categorical cross-entropy is standard for multi-class classification. It derives from maximum likelihood under a categorical distribution and has correct gradient direction (increases probabilities for the true class)." },
  ],

  "hyperparameter-tuning": [
    { id:1, question:"What is the difference between a model parameter and a hyperparameter?", options:["Parameters are learned from training data (weights, biases, tree split thresholds). Hyperparameters are set before training and cannot be learned by the optimisation algorithm (learning rate, n_estimators, max_depth, dropout rate)","Parameters are discrete; hyperparameters are continuous","Parameters change during training; hyperparameters are fixed at creation","There is no meaningful difference — both are adjusted during training"], correctAnswerIndex:0, explanation:"Model.fit() optimises parameters. The outer loop — trying different learning rates, depths, etc. — is hyperparameter tuning. Hyperparameters cannot be included in the loss function for gradient descent to tune along with weights." },
    { id:2, question:"You tune 5 hyperparameters using 5-fold CV and pick the best combination. Why might the best CV accuracy be optimistic?", options:["5-fold CV is too small — you need at least 10-fold","You searched many combinations and selected the one that happened to perform best on these specific validation folds. Some of that performance reflects random variation in fold composition favouring that configuration. Use a held-out test set (never used during tuning) for the final reported performance","Cross-validation is always unbiased by mathematical construction","The bias only appears when using grid search"], correctAnswerIndex:1, explanation:"If you search 1,000 combinations, even random configurations will occasionally get lucky with a good fold assignment. The selected best configuration includes this luck. A separate test set gives an unbiased final estimate." },
    { id:3, question:"What is Bayesian Optimisation and why does it outperform random search for expensive models?", options:["Bayesian Optimisation uses Bayes theorem to directly compute optimal hyperparameters","Bayesian Optimisation is faster because it parallelises all trials simultaneously","Bayesian Optimisation maintains a probabilistic surrogate model of hyperparameter-to-performance relationship (usually a Gaussian Process). After each trial it updates the surrogate and selects the next configuration most likely to improve over the current best. For expensive models (1 GPU-hour per trial), 50 intelligent evaluations outperform 50 random samples","Bayesian Optimisation always finds the global optimum; random search only finds local optima"], correctAnswerIndex:2, explanation:"The key is the surrogate model. Random search knows nothing from trial 1 when choosing trial 2. Bayesian Optimisation builds a model of which regions have produced good results and directs search toward unexplored promising regions." },
    { id:4, question:"You tune learning rate, batch size, dropout rate, num_layers, and hidden_dim with 200 iterations of random search and 5-fold CV. How many total model trainings?", options:["200 total — one per random search iteration","25 trainings — random search subsamples from the 5 folds automatically","200 trainings — CV is run once at the end to validate the best configuration","1,000 total: 200 configurations × 5 folds. Each configuration must be evaluated on all 5 folds. For a neural network training in 4 hours per fold, this is 4,000 hours — illustrating why efficient tuning methods matter enormously for expensive models"], correctAnswerIndex:3, explanation:"This arithmetic makes the cost of hyperparameter tuning concrete. 200 configurations × 5 folds = 1,000 trainings. For deep learning this can be prohibitive. Bayesian optimisation with 30-50 configurations × 3-fold CV = 90-150 trainings, often finding similar or better results." },
  ],

  "grid-random-search": [
    { id:1, question:"Grid search with 4 hyperparameters each having 5 values and 5-fold CV requires how many model trainings?", options:["100 trainings","3,125 trainings: 5⁴=625 configurations × 5 folds","500 trainings","20 trainings"], correctAnswerIndex:1, explanation:"Grid search is exhaustive: 5⁴=625 combinations × 5 folds = 3,125 total trainings. Adding a 5th hyperparameter makes this 5⁵×5=15,625. This combinatorial explosion is why grid search is practical for at most 2-3 hyperparameters with few values." },
    { id:2, question:"Bergstra & Bengio (2012) showed random search outperforms grid search when only 2 of 6 hyperparameters actually matter. Why?", options:["Grid search wastes evaluations on non-influential hyperparameters","Random search uses a more powerful search algorithm","Grid search tries a fixed grid — if only 2 parameters matter, grid search wastes 4/6 of its budget varying unimportant parameters while keeping important ones fixed across groups. Random search samples all 6 parameters independently each trial, giving every trial a unique value for the 2 important parameters — far more efficient for finding the good region in the important dimensions","Grid search cannot search continuous hyperparameter spaces"], correctAnswerIndex:2, explanation:"If learning_rate and max_depth matter but num_trees, subsample, colsample, and reg_lambda don't, grid search wastes 4/6 of its diversity budget on irrelevant parameters. Random search automatically uses all budget more effectively on the important dimensions." },
    { id:3, question:"When does grid search have a genuine advantage over random search?", options:["Grid search is never better — always use random search","Grid search is better for neural networks; random search for tree models","Grid search is better when training is very slow","Grid search guarantees complete coverage of a small, discrete search space. For example: kernel=['linear','rbf','poly'] × C=[0.1, 1, 10] — 9 combinations, each meaningful, all equally worth evaluating. For small discrete spaces where all combinations are plausible, grid search's exhaustiveness is valuable. For large or continuous spaces, random search wins"], correctAnswerIndex:3, explanation:"The crossover point: if the search space has fewer than ~20-30 total meaningful combinations, grid search's exhaustiveness provides value. Above that, random search's efficiency dominates." },
    { id:4, question:"What is Halving Search (HalvingGridSearchCV in sklearn) and why is it more efficient?", options:["Halving search starts with many configurations evaluated on a small budget (small training set or few CV folds). The worst half are eliminated. Survivors are evaluated with double the budget. This continues until one configuration remains. Poor configurations are identified cheaply and eliminated early; compute is concentrated on promising configurations. Often achieves similar results to standard search with 5-10x less total compute","Halving search evaluates each configuration on half the dataset","Halving search halves the hyperparameter search space at each step","Halving search terminates after half the normal iterations"], correctAnswerIndex:0, explanation:"Successive halving is a bandit-style algorithm: spend a little to identify and eliminate bad options, then spend more on the remaining promising ones. sklearn implements HalvingGridSearchCV and HalvingRandomSearchCV." },
  ],

  "confusion-matrix": [
    { id:1, question:"TP=45, FP=15, FN=5, TN=935. Calculate precision and recall and explain both for a medical context.", options:["Precision=45%, Recall=5%","Precision=93.5%, Recall=90%","Precision=75%: of 60 flagged patients, 75% truly have the disease. Recall=90%: of 50 true cases, 90% were detected. For medical screening, recall (catching 90% of true cases) is the priority — the 10% missed cases are the most dangerous outcome","Precision=90%, Recall=75%"], correctAnswerIndex:2, explanation:"Precision=45/(45+15)=75%. Recall=45/(45+5)=90%. In disease screening: FN (missing a sick patient) is catastrophic; FP (unnecessary follow-up) is manageable. High recall is the right priority." },
    { id:2, question:"A model predicts not-fraud for every transaction on a dataset with 0.3% fraud rate. What does its confusion matrix look like?", options:["TP=0, FP=100, FN=0, TN=900","TP=3000, FP=0, FN=997000, TN=0","TP=997, FP=3, FN=0, TN=0","TP=0, FP=0, FN=3000, TN=997000 (assuming 1M transactions). Accuracy=99.7% — looks excellent while the model is completely useless. Recall=0/3000=0%"], correctAnswerIndex:3, explanation:"This confusion matrix exposes what accuracy hides: Recall=0% and F1≈0. A model achieving 99.7% accuracy is completely worthless for its stated purpose — catching fraud." },
    { id:3, question:"Users are complaining that legitimate emails go to spam (false positives). What change do you make and what is the consequence?", options:["Raise the classification threshold above 0.5 — predict spam only when the model is more confident. This reduces FP (fewer legitimate emails flagged) but increases FN (more actual spam gets through). The confusion matrix shifts: FP↓, FN↑, TP↓, TN↑. Precision increases; recall decreases","Add more training data — FP reduction always requires more data","Apply SMOTE to the legitimate class","Switch to a different algorithm"], correctAnswerIndex:0, explanation:"Threshold adjustment is the most direct lever for controlling the FP-FN tradeoff without retraining. Raising the threshold requires higher model confidence to classify as positive — fewer false positives, but some real spam also escapes." },
    { id:4, question:"What is the Matthews Correlation Coefficient (MCC) and why might it be more informative than F1 for highly imbalanced datasets?", options:["MCC is equivalent to F1 — they always produce the same model rankings","MCC = (TP×TN - FP×FN) / √((TP+FP)(TP+FN)(TN+FP)(TN+FN)) incorporates all four confusion matrix cells. F1 ignores TN entirely. For severely imbalanced datasets, a model can achieve high F1 by predicting nearly all positives while making many false predictions — MCC penalises this because it includes TN. MCC ranges from -1 to +1, with 0 indicating random performance","MCC is a variant of F1 adding a correction factor for dataset size","MCC is only used in genomics"], correctAnswerIndex:1, explanation:"F1=2TP/(2TP+FP+FN) — ignores TN and can be gamed on imbalanced data. MCC balances all four confusion matrix cells and produces high values only when all four are proportionally large — considered the most informative single metric for binary classification." },
  ],

  "roc-auc": [
    { id:1, question:"What happens as you move the classification threshold from 1.0 to 0.0, and how does this create the ROC curve?", options:["The ROC curve plots training vs test accuracy as threshold changes","At threshold=0.5 the ROC curve reaches its optimal point","The ROC curve shows how accuracy changes with different learning rates","At threshold=1.0: nobody predicted positive → TPR=0, FPR=0. As threshold decreases: more examples predicted positive. True positives are captured (TPR increases — up y-axis). Some negatives are also incorrectly captured (FPR increases — right along x-axis). A perfect model captures all positives before any negatives. A random model captures both at equal rates (diagonal line). AUC summarises the model's ability to rank positives above negatives across all thresholds"], correctAnswerIndex:3, explanation:"Understanding the ROC curve as a threshold sweep is crucial. The curve encodes the model's ranking ability. AUC=0.9 means: if you pick a random positive and random negative, the model ranks the positive higher 90% of the time." },
    { id:2, question:"Model A AUC=0.91, Model B AUC=0.89. What additional analysis is needed before concluding A is better?", options:["Bootstrap confidence intervals on both AUC estimates. With 500 test examples, the 95% CI for AUC is approximately ±0.04. If CIs overlap substantially, the difference is not statistically significant. Also consider: whether AUC is the right metric for this application, computational cost, and performance at the specific threshold you will use in production","No analysis — higher AUC always indicates a better model","The models must be evaluated on separate test sets","Always prefer the model with higher AUC — statistical testing is only for academic papers"], correctAnswerIndex:0, explanation:"The difference of 0.02 in AUC is meaningful only if it exceeds estimation uncertainty. With small test sets, this difference is not statistically significant and might reverse on a different test sample." },
    { id:3, question:"A credit scoring model achieves AUC=0.94 on a dataset with 2% default rate. What should you additionally check?", options:["AUC=0.94 is excellent — the model is production-ready","Also check: (1) PR-AUC, more informative for the 2% positive class. (2) Model calibration — does p=0.15 actually mean 15% of applicants with that score default? Poor calibration hurts loan pricing. (3) Performance at the specific operating threshold used in production. (4) Performance across demographic groups — high overall AUC can mask disparate sub-group performance","AUC=0.94 on any dataset means deployment-ready","The model is likely overfitting — AUC above 0.9 almost always indicates leakage"], correctAnswerIndex:1, explanation:"AUC is a ranking metric, not a calibration metric. For credit decisions, you need calibrated probabilities to make sound financial decisions. AUC=0.94 with poor calibration means you can rank applicants but cannot accurately price the risk." },
    { id:4, question:"What does AUC=0.5 mean and how do you verify this is not a bug?", options:["AUC=0.5 means the model is 50% accurate — acceptable for hard problems","AUC=0.5 is impossible — AUC is always between 0.6 and 1.0","AUC=0.5 means predictions are no better than random at ranking positives above negatives. Verification: (1) Check for label inversion — if AUC=0.5 with normal labels gives AUC=0.95 with inverted labels, your labels are reversed. (2) Check if predictions have zero variance (model always predicts the same value). (3) Verify feature-label correspondence was maintained during preprocessing","AUC=0.5 means the model has converged to a saddle point — adjust the learning rate"], correctAnswerIndex:2, explanation:"AUC=0.5 is the most suspicious result. The most common cause: accidentally inverted labels (0 and 1 swapped during encoding). Second: all predictions are identical (zero variance). Third: features and labels got misaligned during data processing." },
  ],
});


// PART 3 — Time Series through Deep Learning + closing exports
Object.assign(quizData, {

  "arima": [
    { id:1, question:"What do p, d, q in ARIMA(p,d,q) control?", options:["p=past values used; d=differencing order for stationarity; q=past forecast errors used","p=seasonal period; d=trend; q=forecast horizon","p=precision; d=degrees of freedom; q=quality threshold","p=polynomial degree; d=data points; q=quantile"], correctAnswerIndex:0, explanation:"AR(p) uses p lagged observations. I(d) differences d times to remove trends and achieve stationarity. MA(q) uses q past forecast errors to correct predictions." },
    { id:2, question:"What is stationarity and why does ARIMA require it?", options:["Stationarity means no missing values","A stationary series has constant mean, variance, and autocorrelation over time. ARIMA assumes these properties — trends and seasonality violate them, making model parameters unstable and forecasts unreliable","Stationarity means the series is perfectly smooth","Stationarity requires exactly zero autocorrelation"], correctAnswerIndex:1, explanation:"ARIMA's coefficients are estimated assuming the process doesn't change over time. A trending series makes the model learn different parameters in different time windows — unreliable forecasts." },
    { id:3, question:"ACF cuts off sharply after lag 2, while PACF decays gradually. What ARIMA order does this suggest?", options:["ARIMA(p,d,0) — pure AR","ARIMA(2,d,2)","ARIMA(0,d,2) — pure MA(2). Sharp ACF cutoff and gradual PACF decay is the MA signature","No ARIMA fits this pattern"], correctAnswerIndex:2, explanation:"ACF cuts off at lag q → MA(q). PACF cuts off at lag p → AR(p). Gradual PACF and ACF cutting off at lag 2 → MA(2) process." },
    { id:4, question:"How do you check if ARIMA residuals indicate a good fit?", options:["Check if residuals match the original series pattern","Residuals should have the same variance as the original series","Residuals should perfectly predict the original values","Good residuals should be white noise: ACF of residuals shows no significant autocorrelation at any lag, and Ljung-Box test p-value > 0.05"], correctAnswerIndex:3, explanation:"If residuals contain autocorrelation, the model hasn't fully captured the time series structure. White noise residuals confirm the model explains all systematic variation." },
  ],

  "moving-average": [
    { id:1, question:"What is the difference between SMA and EMA?", options:["SMA uses more data points by definition","SMA assigns equal weight to all past n observations; EMA assigns exponentially decreasing weights — recent observations get more weight. EMA reacts faster to changes; SMA is smoother but lags more","EMA averages past errors; SMA averages past values","They produce identical output"], correctAnswerIndex:1, explanation:"For a trending or volatile series, EMA is often preferable — it reacts faster to real changes. For smoothing out noise without caring about recency, SMA is simpler." },
    { id:2, question:"SMA-7 is applied to daily sales data. What is the main limitation?", options:["SMA-7 cannot handle daily data","SMA-7 requires stationarity","SMA-7 produces no forecast — it only smooths historical data. Additionally, it lags real changes by approximately 3 days (half the window)","SMA-7 is computationally too expensive for 7 points"], correctAnswerIndex:2, explanation:"Moving averages are smoothing tools, not forecasting models. The lag is inherent — averaging the last 7 points means the SMA always lags the true series by roughly window/2 days." },
    { id:3, question:"What is a golden cross in the context of moving averages?", options:["A mathematical artifact indicating data corruption","When the moving average equals the original data","The point where SMA and EMA values converge","When a short-period MA (e.g., 50-day) crosses above a long-period MA (e.g., 200-day) — used as a bullish signal in technical analysis suggesting upward momentum"], correctAnswerIndex:3, explanation:"The golden cross signals that short-term average has risen above long-term average, suggesting a recent upward trend strong enough to reverse the longer-term direction." },
    { id:4, question:"Why should you NOT use future data points when computing a moving average for a real-time forecasting system?", options:["Using future values creates look-ahead bias — the system appears to know future values it would not have in production. This inflates metrics but the system fails immediately when deployed","Future data doesn't affect the average mathematically","Future data improves accuracy","Moving averages don't use future data by definition"], correctAnswerIndex:0, explanation:"A centered moving average uses future data that doesn't exist in real-time. Always use trailing-only (causal) moving averages for live forecasting systems." },
  ],

  "exponential-smoothing": [
    { id:1, question:"What does the smoothing parameter alpha control in Simple Exponential Smoothing?", options:["The window size — higher alpha uses more historical data","The number of exponential components","The weight given to the most recent observation vs smoothed history. Alpha close to 1: high reactivity (noisy). Alpha close to 0: slow adaptation (stable)","The forecast horizon"], correctAnswerIndex:2, explanation:"F_t = alpha x Y_{t-1} + (1-alpha) x F_{t-1}. Alpha=0.9 means recent data dominates; alpha=0.1 means historical average dominates. Choose based on how quickly the series actually changes." },
    { id:2, question:"Simple Exponential Smoothing produces constant forecasts for all future periods. Why is this a problem?", options:["SES cannot produce future forecasts","SES produces a different forecast for each future period","SES forecasts decline exponentially","The SES forecast for all future periods equals the last smoothed value — it projects a flat line. This fails for series with trend or seasonality. Holt's method adds trend; Holt-Winters adds both trend and seasonality"], correctAnswerIndex:3, explanation:"SES has no trend component. A growing business would be forecast to stay constant forever. Choose the variant matching your series structure." },
    { id:3, question:"When would Holt-Winters multiplicative seasonality be chosen over additive?", options:["When seasonal fluctuations grow proportionally with the level — e.g., December sales always 20% above trend (not a fixed amount). Additive assumes a fixed seasonal amount regardless of level","When the series has no seasonality","Multiplicative is always more accurate","When the seasonal period exceeds 12 months"], correctAnswerIndex:0, explanation:"Additive: seasonal effect = fixed amount. Multiplicative: seasonal effect = fixed proportion. If seasonal patterns grow with the series level, multiplicative produces more accurate forecasts." },
    { id:4, question:"How do you optimise the smoothing parameters (alpha, beta, gamma) in Holt-Winters?", options:["Set all to 0.5 as a universal default","Minimise in-sample Sum of Squared Errors using numerical optimisation (L-BFGS-B). statsmodels does this automatically when you call fit()","Use cross-validation across the full parameter grid from 0 to 1","Parameters cannot be optimised — set manually from domain knowledge"], correctAnswerIndex:1, explanation:"The relationship between smoothing parameters and forecast quality is non-linear and series-specific. Numerical optimisation of in-sample fit is the standard approach." },
  ],

  "forecasting-basics": [
    { id:1, question:"What is the difference between in-sample fit and out-of-sample forecast accuracy?", options:["They are the same — good in-sample fit always means good forecasts","In-sample fit is more important for operational systems","Out-of-sample is always better","In-sample measures how well the model fits historical training data; out-of-sample measures performance on future data never seen. A model can have excellent in-sample fit (memorising noise) and terrible out-of-sample performance"], correctAnswerIndex:3, explanation:"A complex ARIMA might fit every historical wiggle perfectly but produce poor forecasts. Always evaluate on a held-out future period the model never saw." },
    { id:2, question:"What is the naive forecast and why is it a critical baseline?", options:["The naive forecast predicts the next value equals the last observed value (stationary) or the same period last year (seasonal). If your complex model doesn't beat this, it has learned nothing useful from the data structure","Predicting the series mean for all future periods","A forecast without any data","A forecast using only the last 3 observations"], correctAnswerIndex:0, explanation:"The seasonal naive model is surprisingly hard to beat for many business series. If your model beats seasonal naive, it is demonstrably adding value." },
    { id:3, question:"Why is RMSE more commonly reported than MAE in business forecasting?", options:["RMSE is easier to compute","RMSE penalises large errors more heavily — in business, being very wrong once (stockout, overproduction) is disproportionately more costly than being slightly wrong many times. RMSE's penalty structure matches this cost","MAE cannot be computed for time series","RMSE is directly interpretable in the same units as the forecast"], correctAnswerIndex:1, explanation:"A supply chain off by 100 units 100 times vs off by 10,000 units once — the second situation is far more costly. RMSE makes the single large error much more visible." },
    { id:4, question:"What is a prediction interval and how does it differ from a confidence interval?", options:["They are identical — just different terminology","Prediction intervals only apply to point forecasts","A prediction interval gives a range for an individual future observation (accounting for model uncertainty AND inherent series variability). A confidence interval gives a range for the mean forecast (model uncertainty only). For operational planning, prediction intervals are what you need","Confidence intervals are always wider"], correctAnswerIndex:2, explanation:"For inventory planning, you need the range of likely demand for a specific future day — that is a prediction interval. The wider prediction interval includes both model uncertainty and irreducible variability." },
  ],

  "semi-supervised": [
    { id:1, question:"What problem does semi-supervised learning solve?", options:["The high cost of labelling — when you have abundant unlabelled data but few labelled examples, semi-supervised learning leverages unlabelled data structure to improve beyond what labelled data alone achieves","Difficulty of training without any data","Inability of supervised models to handle continuous features","Overfitting in neural networks"], correctAnswerIndex:0, explanation:"Labels are expensive — expert annotation takes time and money. Unlabelled data is cheap. Methods like self-training, label propagation, and pseudo-labelling bridge this gap." },
    { id:2, question:"What is the self-training approach to semi-supervised learning?", options:["The model trains using only architecture without data","Train on labelled data, predict on unlabelled data, add high-confidence predictions as new labelled examples, retrain. Repeat. Each round expands the labelled set with examples the model is confident about","Self-training is unsupervised clustering","A model that automatically tunes its own hyperparameters"], correctAnswerIndex:1, explanation:"Self-training risks error propagation — wrong confident predictions become training labels. Use high confidence thresholds (p > 0.95) and monitor carefully." },
    { id:3, question:"What is the cluster assumption in semi-supervised learning?", options:["All clusters contain the same number of examples","Clusters must be spherical","Points in the same cluster are likely to share the same label — decision boundaries should pass through low-density regions. This allows unlabelled data cluster structure to improve classification boundaries","Number of clusters equals number of classes"], correctAnswerIndex:2, explanation:"If this assumption holds, the unlabelled data cluster structure tells you where to draw class boundaries. If it doesn't hold, semi-supervised learning can actually hurt performance." },
    { id:4, question:"In NLP, BERT uses self-supervised pretraining. How does this relate to semi-supervised learning?", options:["BERT is standard supervised — uses billions of labelled examples","BERT requires labelled data during pretraining","BERT is entirely unsupervised","BERT's pretraining (predicting masked words in unlabelled text) is self-supervised — labels are derived from the data itself. A form of semi-supervised learning where labelling is automatic. The representations are then fine-tuned with a small amount of task-specific labelled data"], correctAnswerIndex:3, explanation:"Pretraining on massive unlabelled corpora (self-supervised) + fine-tuning on small labelled datasets achieves what previously required millions of labelled examples — the core semi-supervised paradigm at massive scale." },
  ],

  "online-learning": [
    { id:1, question:"What is the key difference between batch and online learning?", options:["Batch uses neural networks; online uses linear models","Batch trains on the entire dataset producing a static model. Online updates incrementally as each new example arrives — the model is always evolving and never needs full retraining","Online learning requires internet connectivity","Batch learning is always more accurate"], correctAnswerIndex:1, explanation:"A batch-trained fraud model from January may miss March fraud patterns. An online model updates daily with new transaction data, continuously adapting." },
    { id:2, question:"What is out-of-core learning and why does online learning solve it?", options:["Learning outside normal business hours","Learning from data stored outside the main database","When the dataset is too large for RAM. Online learning processes data in small chunks from disk, updating the model with each chunk without ever loading the full dataset into memory","Cloud-based learning"], correctAnswerIndex:2, explanation:"A 10TB dataset of click events cannot fit in RAM. Online learning processes it in small chunks. River (formerly scikit-multiflow) and sklearn's partial_fit() enable this." },
    { id:3, question:"What is catastrophic forgetting in online learning?", options:["The model crashes when processing a large batch","When learning rate becomes too small","A memory overflow error","Online updates on new data cause the model to forget previously learned patterns — adapts too quickly, losing knowledge of older patterns still relevant"], correctAnswerIndex:3, explanation:"High learning rate adapts quickly but forgets. Low learning rate retains old knowledge but adapts slowly. Elastic Weight Consolidation and memory replay mitigate this." },
    { id:4, question:"How do you evaluate an online learning model when new labelled examples arrive continuously?", options:["Use prequential evaluation (test-then-train): for each new example, predict first, then update with the true label. This gives a running evaluation that accurately reflects performance at each point in time without a separate held-out set","Evaluate once on a fixed test set at the end","Freeze the model periodically and evaluate on a batch","Online models cannot be evaluated"], correctAnswerIndex:0, explanation:"Prequential evaluation avoids look-ahead bias and gives a realistic picture of performance over time, including adaptation periods after concept drift." },
  ],

  "reinforcement-learning-adv": [
    { id:1, question:"What is the Q-function and what does Q(s,a) represent?", options:["Q is the quality of training data","Q is the probability of a state occurring","Q(s,a) is the expected total future reward from taking action a in state s and then following the optimal policy. Q-Learning updates Q values using the Bellman equation, converging to true Q-star given enough exploration","Q(s,a) is the immediate reward for action a in state s"], correctAnswerIndex:2, explanation:"The distinction between immediate reward and expected cumulative reward is critical. An action with small immediate reward but high-reward future state has a high Q value." },
    { id:2, question:"What is epsilon-greedy and how does it address exploration-exploitation?", options:["A tradeoff between training speed and accuracy","A learning rate decay schedule","A method for selecting hyperparameters","Randomly explores with probability epsilon and exploits (takes the known best action) with probability 1-epsilon. Typically epsilon decays over training — high exploration early, more exploitation later as Q values stabilise"], correctAnswerIndex:3, explanation:"Early in training epsilon is high — the agent doesn't know enough to exploit. As Q values stabilise, epsilon decreases — more exploitation. The decay schedule itself is an important hyperparameter." },
    { id:3, question:"What problem does a replay buffer solve in Deep Q-Networks (DQN)?", options:["Neural networks assume IID training examples. In RL, consecutive experiences are highly correlated. A replay buffer stores past experiences and samples random mini-batches — breaking temporal correlation and stabilising training","It prevents the network from memorising individual experiences","A replay buffer increases the number of training episodes","It stores the best policy found so far"], correctAnswerIndex:0, explanation:"Without replay buffer: training on correlated states causes catastrophic overfitting to the current trajectory. With it: random sampling breaks correlation, making training stable." },
    { id:4, question:"What is the policy gradient approach and how does it differ from Q-Learning?", options:["They are identical — different names for the same algorithm","Q-Learning learns a value function Q(s,a) and derives actions by maximising. Policy gradients directly parameterise and optimise the policy pi(a|s) — the probability distribution over actions. Policy gradients work in continuous action spaces where maximising over actions is intractable","Policy gradient only works for discrete actions","Policy gradient requires less training data"], correctAnswerIndex:1, explanation:"Q-Learning cannot handle 'turn the wheel 37.4 degrees' — you cannot maximise over a continuous action. Policy gradient directly learns P(action|state), enabling continuous control in robotics and autonomous vehicles." },
  ],

  "multi-armed-bandits": [
    { id:1, question:"What is the exploration-exploitation tradeoff in the multi-armed bandit problem?", options:["Choosing between multiple computers","Tradeoff between accuracy and speed","Choosing between different ML algorithms","Each arm (option) has an unknown reward distribution. Exploitation: pull the arm with highest estimated reward. Exploration: try less-known arms for better estimates. Too much exploitation: miss a better arm. Too much exploration: waste pulls on poor arms"], correctAnswerIndex:3, explanation:"The classic real-world bandit problem is A/B testing: exploit the currently best website version or explore new variants? Bandit algorithms adaptively shift traffic toward better-performing variants during the test." },
    { id:2, question:"What is UCB (Upper Confidence Bound) and how does it balance exploration-exploitation?", options:["UCB selects the arm with the highest upper confidence bound: estimated mean + confidence bonus. The bonus is larger for less-tried arms — naturally directing exploration toward uncertain arms. The bonus shrinks as each arm is tried more","UCB always picks the arm with highest observed average reward","UCB randomly selects arms proportional to observed rewards","UCB is epsilon-greedy with decreasing epsilon"], correctAnswerIndex:0, explanation:"UCB has optimism in the face of uncertainty — it tries uncertain arms because they might be better than they appear. As an arm is explored more, its confidence interval shrinks and it competes on mean alone." },
    { id:3, question:"How is the multi-armed bandit framework applied to recommendation systems?", options:["Bandit algorithms replace collaborative filtering entirely","Each item (video, product, article) is an arm. The system pulls an arm (shows an item), observes a reward (click, purchase), and updates estimates. Contextual bandits choose the best item given user context. Enables continuous learning from real user interactions","Bandit algorithms are used only for offline batch training","Bandit frameworks only apply when there are exactly K items"], correctAnswerIndex:1, explanation:"Traditional A/B testing wastes traffic on poor recommendations during the test period. Bandit algorithms continuously shift traffic toward better options while learning. LinkedIn, Netflix, and Spotify use contextual bandit algorithms in production." },
    { id:4, question:"What is Thompson Sampling and what is its key advantage over epsilon-greedy?", options:["Thompson Sampling uses gradient descent to select arms","Thompson Sampling explores equally across all arms","Thompson Sampling maintains a probability distribution over expected reward per arm. It selects an arm by sampling from each distribution and picking the highest sample — naturally exploring uncertain arms (wide distributions) while exploiting consistent performers","Thompson Sampling requires knowing the optimal arm in advance"], correctAnswerIndex:2, explanation:"Epsilon-greedy explores uninformedly — it occasionally tries random arms. Thompson Sampling explores informedly — arms with uncertain distributions are more likely to produce high samples, directing exploration where most valuable." },
  ],

  "neural-networks": [
    { id:1, question:"A neuron receives x₁=2 and x₂=3 with weights w₁=0.5 and w₂=1, plus bias b=−1. What is its weighted sum z?", options:["1","3","4","5"], correctAnswerIndex:1, explanation:"z = x₁w₁ + x₂w₂ + b = (2×0.5) + (3×1) − 1 = 3. An activation function may then transform this value." },
    { id:2, question:"What job does a bias perform in a neuron?", options:["It stores the target label","It replaces every input weight","It adds an adjustable offset to the weighted sum before activation","It calculates the final accuracy"], correctAnswerIndex:2, explanation:"A neuron commonly computes z = Σwx + b. The bias b lets the activation shift instead of being forced through the origin." },
    { id:3, question:"After a forward pass produces a prediction, why is a loss function used?", options:["To add more hidden layers","To save the model","To shuffle the training examples","To measure how the prediction differs from the target with one training objective"], correctAnswerIndex:3, explanation:"The loss converts the prediction-versus-target error into a number that training tries to reduce." },
    { id:4, question:"Which statement correctly separates backpropagation from the optimizer?", options:["Backpropagation computes gradients; the optimizer uses them to update weights and biases","Both only make predictions","The optimizer computes labels; backpropagation loads data","Backpropagation saves the model; the optimizer evaluates it"], correctAnswerIndex:0, explanation:"Backpropagation tells us how the loss changes with each parameter. The optimizer turns those gradients into parameter updates." },
  ],

  "deep-learning-intro": [
    { id:1, question:"Which combination helped modern deep learning accelerate around 2012?", options:["Larger labelled datasets, faster parallel hardware such as GPUs, and improved architectures and training methods working together","Better algorithms, more researchers, and government funding","Faster internet, cloud storage, and Python","Better theory, interpretability research, and academic publishing"], correctAnswerIndex:0, explanation:"AlexNet's 2012 ImageNet result is one prominent example: it combined a large labelled dataset, GPU computation, and an effective convolutional architecture. The relative contribution of each factor varies by problem, and neural-network research began decades earlier." },
    { id:2, question:"When should you compare deep learning with a tree-based baseline?", options:["Deep learning always outperforms on every task","For structured tabular data, tree ensembles are often strong baselines; for images, audio, and text, pretrained deep models are often strong candidates. Compare them using the real dataset and evaluation objective","Gradient boosting always wins for tabular data, while deep learning is only for images","Deep learning always requires much more data"], correctAnswerIndex:1, explanation:"There is no universal winner. Data type, dataset size, available pretraining, compute budget, latency, interpretability needs, and the chosen metric can all change the result. A simple, strong baseline makes the comparison evidence-based." },
    { id:3, question:"What is transfer learning in deep learning and why can it help?", options:["Moving a trained model from one computer to another","Transferring hyperparameters from one model to another","Using a model pretrained on a large dataset as a starting point. Its learned features can be adapted to a related task, which may reduce labelled-data and compute needs","Loading weights from a different task always improves performance"], correctAnswerIndex:2, explanation:"A model pretrained on a large image collection may contain reusable visual features. Fine-tuning can be effective when the source and target tasks are sufficiently related, but the benefit depends on domain match, data quality, and the fine-tuning procedure." },
    { id:4, question:"What is the dying ReLU problem and how can Leaky ReLU help?", options:["ReLU neurons die from numerical overflow","Leaky ReLU prevents gradients from becoming too large","Dying ReLU means the network converges too quickly","A ReLU unit can keep receiving negative pre-activations, so its local derivative is zero and its incoming weights may stop changing. Leaky ReLU uses a small chosen slope on the negative side, which can preserve a gradient there"], correctAnswerIndex:3, explanation:"For ReLU, f(x)=max(0,x), so the derivative is zero when x<0. Leaky ReLU instead uses f(x)=x for x>0 and f(x)=alpha*x otherwise, where alpha is a small hyperparameter such as 0.01. This reduces, but does not guarantee elimination of, inactive units." },
  ],

  "ml-interview-questions": [
    { id:1, question:"An interviewer asks you to explain the bias-variance tradeoff. What is the weakest type of answer?", options:["Giving the mathematical decomposition formula","Connecting each to concrete diagnostic actions and fixes","Saying high bias means underfitting and high variance means overfitting without explaining causes, diagnosis, or how to fix them","Giving a real-world example from a past project"], correctAnswerIndex:2, explanation:"Memorised one-liners without depth signal surface preparation. Strong answers explain the mechanism, show how to diagnose with learning curves, and give concrete fixes." },
    { id:2, question:"You are asked to build a model with no prior context. What is the most important clarifying question to ask first?", options:["What programming language should I use?","What is the evaluation metric and what business outcome does it proxy? A technically perfect model optimising the wrong metric is commercially useless","How much data is available?","What is the deadline?"], correctAnswerIndex:1, explanation:"Metric alignment between model objective and business objective is where most ML projects fail. Clarifying the metric first prevents months of work in the wrong direction." },
    { id:3, question:"Your model achieves 98% AUC in development but 65% AUC in production one month later. What are the 3 most likely causes?", options:["Wrong architecture, changed random seed, test set too small","Data leakage in training (most likely), distribution shift between training and production data, or a feature engineering pipeline bug producing different features in production than in training","Overfitting, high learning rate, wrong number of layers","Server memory issues, GPU driver updates, wrong batch size in production"], correctAnswerIndex:1, explanation:"This 33-point drop is dramatic. Leakage explains perfect development plus terrible production most directly. Distribution shift is equally common. Feature pipeline bugs are the third most common cause." },
    { id:4, question:"An interviewer says your precision is 0.3 and recall is 0.9 — this model is bad. How do you respond?", options:["Agree and suggest retraining from scratch","Challenge the framing: precision and recall reflect a threshold choice, not an inherent model property. For cancer screening, recall=0.9 is excellent. Ask about the business cost of false negatives vs false positives, then discuss moving the threshold appropriately","Agree that precision should always be above 0.5","Say the dataset must be imbalanced and propose SMOTE"], correctAnswerIndex:1, explanation:"This response demonstrates maturity. You are not accepting the premise without context. The right question: what costs more — missing a true positive or incorrectly flagging a negative? The threshold choice follows from that answer." },
  ],

});

// Remove the temporary part markers
const _allPartsComplete = true;

Object.assign(quizData, {

  "random-forest": [
    { id:1, question:"Why does a Random Forest typically outperform a single Decision Tree?", options:["It trains on more data","It limits depth to 3 levels","It uses a better loss function","100 trees trained on different bootstrap samples with random feature subsets — errors are partially independent, so averaging substantially reduces variance"], correctAnswerIndex:3, explanation:"Bootstrap sampling creates different errors per tree. Feature randomness prevents all trees relying on the same dominant feature. Independent errors cancel when averaged." },
    { id:2, question:"What is the Out-of-Bag (OOB) error?", options:["Validation error estimated using examples not in each tree's bootstrap sample (~37% per tree) — a free cross-validation estimate without a separate split","Error on examples the model refused to classify","Error rate on the test set","Error from random feature subsets"], correctAnswerIndex:0, explanation:"Bootstrap selects ~63% unique examples per tree. The remaining ~37% are OOB — they serve as free validation. Averaging OOB errors across all trees gives a reliable performance estimate." },
    { id:3, question:"How does Random Forest calculate feature importance?", options:["By counting how many times each feature appears","By measuring how much each feature reduces impurity across all trees and splits — features used at high-level splits affecting many examples have higher importance","By correlation of each feature with the target","By coefficient magnitude"], correctAnswerIndex:1, explanation:"Feature importance = average impurity decrease weighted by samples affected, across all trees. Note: can overestimate importance of high-cardinality features — use permutation importance for a more reliable estimate." },
    { id:4, question:"How does increasing n_estimators affect bias and variance in Random Forest?", options:["High bias — adding more trees reduces bias","Both — ensemble methods suffer from both","High variance per individual tree — ensemble averaging reduces variance. More trees further reduces variance with diminishing returns; does not increase bias","n_estimators has no effect — only max_depth matters"], correctAnswerIndex:2, explanation:"Individual trees are high-variance. Random Forest reduces variance through averaging. More trees → less variance with diminishing returns after ~100-200 trees. Beyond ~500 trees, improvements are negligible." },
  ],

  "bagging": [
    { id:1, question:"What does bootstrap mean in Bootstrap Aggregating (Bagging)?", options:["Sampling the training set with replacement — each bootstrap sample contains the same number of examples but with duplicates, missing roughly 37% of unique examples","Using a pre-trained model as a starting point","Loading model weights from a saved file","Initialising weights randomly"], correctAnswerIndex:0, explanation:"Sampling with replacement creates diverse training sets for each base learner, making their errors partially independent — the key to why averaging works." },
    { id:2, question:"Bagging primarily reduces which component of model error?", options:["Irreducible noise","Variance — averaging multiple models trained on different data samples makes their random errors cancel out","Bias","Both bias and variance equally"], correctAnswerIndex:1, explanation:"Bagging works because each model's variance errors differ (due to different bootstrap samples) while systematic errors (bias) are similar. Averaging uncorrelated errors reduces variance; systematic errors remain." },
    { id:3, question:"Why does Bagging work less effectively when base models are highly correlated?", options:["Correlated models take longer to train","Correlation causes numerical instability","If models are highly correlated, their errors are the same — averaging identical errors doesn't reduce them. Decorrelation (feature randomness in Random Forest) is needed for averaging to be effective","Correlated models always overfit"], correctAnswerIndex:2, explanation:"The mathematical benefit of averaging comes from error independence. If model A and B make the same errors, averaging gives the same answer with no variance reduction." },
    { id:4, question:"Can Bagging be applied to reduce variance of logistic regression?", options:["No — Bagging only works with decision trees","No — logistic regression already has zero variance","Yes — but only with datasets over 10,000 examples","Yes — training multiple logistic regression models on bootstrap samples and averaging probability outputs reduces variance, though the gain is smaller than with high-variance learners like trees"], correctAnswerIndex:3, explanation:"Bagging is model-agnostic. However, logistic regression is relatively low-variance (simple linear boundary), so the variance reduction from bagging is smaller than for trees." },
  ],

  "boosting": [
    { id:1, question:"What is the fundamental difference between Boosting and Bagging's training approach?", options:["Bagging uses trees; Boosting uses linear models","Bagging trains models in parallel independently; Boosting trains sequentially where each model focuses on the errors of the previous — they are order-dependent","Boosting uses more models","Bagging requires more compute"], correctAnswerIndex:1, explanation:"This sequential dependency is critical. In Boosting, model 2 sees a reweighted dataset emphasising model 1's mistakes. Each model corrects its predecessors." },
    { id:2, question:"Boosting primarily reduces which component of error compared to Bagging?", options:["Boosting reduces variance; Bagging reduces bias","They reduce the same error type","Boosting reduces bias — each iteration corrects systematic errors. Bagging reduces variance. This is why Boosting can turn weak learners into powerful models","Boosting reduces both by more than Bagging"], correctAnswerIndex:2, explanation:"A weak learner has high bias. Boosting chains them — each model reduces remaining bias. Bagging of the same weak learner reduces variance but cannot overcome fundamental high-bias." },
    { id:3, question:"Why is Boosting more prone to overfitting than Bagging?", options:["Boosting uses higher-depth trees by default","Boosting uses gradient descent which inherently overfits","Bagging has built-in regularisation that Boosting lacks","Relentlessly focusing on hard examples means eventually memorising genuine noise — mislabelled data gets continuously up-weighted. Use early stopping, shrinkage, and subsampling to mitigate"], correctAnswerIndex:3, explanation:"Boosting's strength is its weakness: relentlessly focusing on hard examples eventually memorises noise. Early stopping when validation loss starts increasing is essential." },
    { id:4, question:"The learning rate in Gradient Boosting is called shrinkage. What does it shrink?", options:["The contribution of each new tree — learning rate 0.01 means each tree contributes only 1% of its full prediction, requiring more trees but better generalisation","The size of the trees","The number of features per split","The training dataset size per iteration"], correctAnswerIndex:0, explanation:"Low learning rate + more trees (with early stopping) is generally the best configuration. Small steps create smoother, more stable corrections." },
  ],

  "adaboost": [
    { id:1, question:"How does AdaBoost adjust training data between iterations?", options:["It removes correctly classified examples","It randomly shuffles training data","It increases the weight of misclassified examples and decreases correctly classified ones — forcing the next classifier to focus on current mistakes","It adds noise to misclassified examples"], correctAnswerIndex:2, explanation:"After each weak learner, examples it got wrong get higher weights — emphasised in the next iteration. The final prediction is a weighted vote where better classifiers get more say." },
    { id:2, question:"What determines each classifier's vote weight in AdaBoost?", options:["All classifiers get equal weight","Vote weight is determined by classifier size","Vote weight is determined by training order","Classifiers with lower error rates get higher vote weights — alpha = 0.5 x ln((1-error)/error). A near-perfect classifier gets large weight; one barely better than random gets near-zero weight"], correctAnswerIndex:3, explanation:"At error=0.01, alpha is approximately 2.3 (high weight). At error=0.49, alpha is approximately 0.025 (near zero). Only meaningful classifiers substantially influence the final prediction." },
    { id:3, question:"What is a weak learner in AdaBoost and why are decision stumps most common?", options:["Any model performing slightly better than random (error < 50%). Decision stumps (single split) are popular: fast, diverse, and predictably weak — AdaBoost converts many simple rules into a strong combined classifier","A model with accuracy below 50%","A weak learner must be a linear model","Randomly initialised untrained models"], correctAnswerIndex:0, explanation:"AdaBoost only requires each weak learner to do better than chance. Decision stumps satisfy this cheaply. Using complex base learners makes AdaBoost slower without benefit." },
    { id:4, question:"Why is AdaBoost sensitive to outliers and mislabelled data?", options:["Outliers confuse the weight update algorithm","Outliers consistently misclassified have their weights continuously increased — eventually the algorithm focuses almost entirely on these anomalies, degrading overall performance","AdaBoost has no mechanism to detect outliers","Outliers are automatically removed"], correctAnswerIndex:1, explanation:"If an example is mislabelled, every classifier gets it wrong, and its weight grows exponentially. Gradient Boosting with shrinkage is more robust to this problem." },
  ],

  "gradient-boosting": [
    { id:1, question:"What does each new tree in Gradient Boosting actually learn to predict?", options:["The original target from scratch","The probability each example was classified correctly","A random subset of training examples","The residual errors of the current ensemble — how far off the current prediction is. Each tree is a model of the previous model's mistakes"], correctAnswerIndex:3, explanation:"Tree T+1 predicts the correction needed to the current prediction. After 100 trees, the final prediction is the baseline plus 100 small corrections." },
    { id:2, question:"How does learning rate interact with n_estimators in Gradient Boosting?", options:["Smaller rate means each tree contributes less, requiring more trees (higher n_estimators) but usually better generalisation. High learning rate with few trees often overfits","Learning rate determines tree depth","They are independent","Learning rate should always equal 1/n_estimators"], correctAnswerIndex:0, explanation:"Classic strategy: learning_rate=0.01 (small) with early stopping to find optimal n_estimators. This learn-slowly approach is consistently strong." },
    { id:3, question:"How does Gradient Boosting generalise the AdaBoost approach?", options:["It uses neural networks instead of trees","AdaBoost uses specific exponential loss. Gradient Boosting frames boosting as gradient descent in function space — any differentiable loss function can be used (MSE, log-loss, Huber, custom business losses)","Gradient Boosting is identical to AdaBoost with different hyperparameters","Gradient Boosting can use unsupervised learning"], correctAnswerIndex:1, explanation:"This generalisation is why Gradient Boosting dominated competitive ML. Any differentiable loss becomes viable — enabling robust regression, custom losses, and more." },
    { id:4, question:"Training loss keeps decreasing but validation loss starts increasing after 200 trees. What should you do?", options:["Continue training — the model has not converged","Increase the learning rate","Apply early stopping — halt at the number of trees where validation loss was minimum. The model is overfitting after that point","Reduce the number of features"], correctAnswerIndex:2, explanation:"This is textbook overfitting in Gradient Boosting. Each additional tree memorises training noise. Early stopping is the standard solution." },
  ],

  "xgboost": [
    { id:1, question:"What makes XGBoost significantly faster than sklearn's Gradient Boosting?", options:["A column block data structure that sorts feature values once and reuses them across splits — enabling parallelised split finding, cache-aware computation, and out-of-core processing for large datasets","XGBoost uses a different language","XGBoost trains fewer trees by default","XGBoost uses 32-bit arithmetic"], correctAnswerIndex:0, explanation:"sklearn's GradientBoostingClassifier builds trees sequentially with no parallelisation. XGBoost parallelises feature split evaluation within each tree level." },
    { id:2, question:"XGBoost natively handles missing values. How?", options:["It imputes with the mean before training","During training, it tries both directions for missing values at each split and learns which direction minimises loss better — a default direction is stored for each split","It removes examples with missing values","It treats missing as zero"], correctAnswerIndex:1, explanation:"You can feed XGBoost a matrix with NaN values directly. For each split, it learns whether missing values belong with the left or right child — capturing any pattern in missingness." },
    { id:3, question:"When do you use scale_pos_weight in XGBoost?", options:["To scale all positive prediction values","It controls the learning rate for positive examples","For imbalanced classification — set to the ratio of negative to positive examples (e.g., 99 for 1% positive rate) — XGBoost penalises missing positive examples proportionally more","It scales weight initialisation"], correctAnswerIndex:2, explanation:"Setting scale_pos_weight=99 tells XGBoost to treat each positive example as 99 times more important — equivalent to oversampling positives without duplicating data." },
    { id:4, question:"What does the subsample parameter do in XGBoost?", options:["Reduces training set size before training begins","Controls gradient descent steps per tree","It determines how many features to sample per split","For each tree, randomly samples a fraction of training examples — introducing randomness similar to Random Forest bagging, reducing overfitting"], correctAnswerIndex:3, explanation:"subsample=0.8 means each tree trains on random 80% of examples. This adds diversity between trees — additional regularisation on top of XGBoost's sequential correction." },
  ],

  "kmeans": [
    { id:1, question:"K-Means produces one very large cluster and two tiny ones. Most likely cause?", options:["k=3 is always wrong","Poor initialisation — centroids happened to start in one region. Use K-Means++ initialisation and multiple restarts, keeping the best result by inertia","K-Means only produces equal-sized clusters","Too many features for K-Means"], correctAnswerIndex:1, explanation:"K-Means is sensitive to initialisation. K-Means++ probabilistically selects centroids far apart, dramatically reducing this problem." },
    { id:2, question:"What does inertia measure, and what is wrong with minimising it alone?", options:["Inertia measures cluster separation — higher is better","Inertia measures convergence speed","Sum of squared distances from each point to its nearest centroid. Problem: inertia always decreases as k increases — k=N gives inertia=0. Use the elbow method or Silhouette score to choose k meaningfully","Inertia should be maximised"], correctAnswerIndex:2, explanation:"k=N (each point is its own cluster) perfectly minimises inertia but is useless. The elbow method finds k where improvement plateaus meaningfully." },
    { id:3, question:"K-Means fails to detect two interlocking crescent shapes. Why?", options:["K-Means cannot process more than 1000 examples","K-Means assigns each point to exactly one cluster","K-Means requires binary features","K-Means defines clusters by proximity to a single centroid — it can only create convex Voronoi regions. Crescent shapes cannot be represented as nearest to a central point. DBSCAN handles non-convex shapes"], correctAnswerIndex:3, explanation:"The Voronoi diagram created by K-Means centroids always produces convex regions. Non-convex cluster shapes (rings, crescents, spirals) violate this geometric constraint." },
    { id:4, question:"How does the Silhouette Score evaluate clustering quality?", options:["For each point: a=average distance to same-cluster points, b=average distance to nearest other-cluster points, Silhouette=(b-a)/max(a,b). Values near +1 mean well-clustered; near -1 mean possibly in wrong cluster","It counts correctly assigned cluster labels","It measures how fast K-Means converged","Ratio of inertia to number of clusters"], correctAnswerIndex:0, explanation:"Silhouette score captures both cohesion (how tight clusters are) and separation (how far clusters are from each other). Average above 0.5 generally indicates meaningful cluster structure." },
  ],

  "hierarchical": [
    { id:1, question:"What is the key advantage of hierarchical clustering over K-Means?", options:["It is always faster","It works with non-Euclidean distances only","You do not need to specify k in advance — the dendrogram shows the full hierarchy and you choose the cut level after seeing the structure","It guarantees globally optimal clusters"], correctAnswerIndex:2, explanation:"The dendrogram reveals hierarchical structure. You might find k=3 and k=7 both make sense depending on the business question. Cutting at different heights gives different cluster counts from a single run." },
    { id:2, question:"What does Ward linkage minimise when merging clusters?", options:["Maximum distance between any two points","Computational cost of the merge","Number of points in the smaller cluster","Increase in total within-cluster variance from the merge — Ward tends to create compact, similarly-sized clusters"], correctAnswerIndex:3, explanation:"Ward linkage is analogous to K-Means' objective — minimise within-cluster sum of squares. It tends to produce compact, interpretable clusters." },
    { id:3, question:"Hierarchical clustering has O(N^2) space and O(N^3) time. What does this mean practically?", options:["For N=100,000 examples, the distance matrix requires billions of entries — hierarchical clustering is impractical for large datasets without approximations","It is the fastest algorithm for large datasets","Time complexity only matters for quality, not result","It scales linearly with the square root of samples"], correctAnswerIndex:0, explanation:"In practice, hierarchical clustering works well for N < ~10,000. For larger datasets, use K-Means with multiple restarts, DBSCAN, or approximate hierarchical methods." },
    { id:4, question:"What does a tall merging step in a dendrogram indicate?", options:["The algorithm made an error","A large jump in distance between merged clusters — indicates a natural cluster boundary. Cut just before these tall steps to find the natural number of clusters","Unusually fast convergence","Redundant features in the dataset"], correctAnswerIndex:1, explanation:"Height in a dendrogram represents dissimilarity at merge. A large jump means you are merging very different clusters. Cutting just below this jump gives the most natural partition." },
  ],

  "dbscan": [
    { id:1, question:"What are the three types of points in DBSCAN?", options:["Cluster points, border points, and noise — but all belong to clusters","Dense, sparse, and outlier points","Input, output, and unclassified points","Core points (min_samples neighbours within epsilon), border points (within epsilon of a core point but fewer neighbours), and noise points (isolated — belong to no cluster)"], correctAnswerIndex:3, explanation:"Core points form the dense backbone. Border points are on the edge. Noise points are anomalies not assigned to any cluster — DBSCAN performs outlier detection automatically." },
    { id:2, question:"How do you choose epsilon and min_samples for DBSCAN?", options:["Plot K-nearest neighbour distances sorted ascending (K-distance graph) — look for the elbow where distance increases sharply. This elbow value is a good epsilon estimate. min_samples is typically 2 times dimension or 5","Always use epsilon=0.5 and min_samples=5","Epsilon should equal the mean feature value","These are set automatically"], correctAnswerIndex:0, explanation:"The K-distance graph is the standard diagnostic for epsilon selection. The elbow separates dense cluster points from noise points." },
    { id:3, question:"DBSCAN identifies 5 commercial districts but leaves 8% of customers unclassified. What does the 8% represent?", options:["8% of customers DBSCAN failed to classify — algorithm error","Noise points — customers too isolated to belong to any dense cluster. In this context, they may represent rural customers who do not fit main commercial areas. For anomaly detection, these noise points are exactly what you are looking for","Random algorithm errors","Customers who visited the city only once"], correctAnswerIndex:1, explanation:"DBSCAN's noise classification is a feature — those 8% are genuinely different. For anomaly detection (fraud, fault detection), these noise points are the target." },
    { id:4, question:"DBSCAN cannot handle clusters of vastly different densities. Why?", options:["DBSCAN requires all clusters to have the same number of points","DBSCAN assigns all points to the most dense cluster","A single epsilon is used globally. Dense clusters need small epsilon; sparse clusters need large epsilon. No single epsilon can correctly identify both. HDBSCAN adapts epsilon locally and solves this","DBSCAN has a maximum density limit"], correctAnswerIndex:2, explanation:"With one dense and one sparse cluster, epsilon tuned for the dense one makes the sparse one appear as all noise. HDBSCAN solves this with hierarchical density estimation." },
  ],

  "pca": [
    { id:1, question:"What do the principal components in PCA represent?", options:["New orthogonal axes (linear combinations of original features) ordered by variance explained — PC1 explains the most, PC2 explains the next most while perpendicular to PC1","Original features sorted by importance","Clusters in the data","Features with lowest correlation to target"], correctAnswerIndex:0, explanation:"PC1 is the direction in feature space with most variance. By projecting onto the first few PCs, you retain the most important variance while discarding dimensions that mostly contain noise." },
    { id:2, question:"You apply PCA before training a classifier and test accuracy drops from 88% to 82%. What might explain this?", options:["PCA always improves accuracy — this is a bug","The variance discarded contained information relevant to class boundaries. PCA is unsupervised (ignores labels), so it may discard directions important for classification even though they have low global variance","PCA is incompatible with the classifier","You need to scale before PCA"], correctAnswerIndex:1, explanation:"PCA maximises variance but ignores class labels. A direction with small variance might perfectly separate two classes. LDA maximises class separability — better when the goal is classification." },
    { id:3, question:"Why must you standardise features before applying PCA?", options:["PCA raises an error on unstandardised features","Standardisation improves PCA speed by 10x","PCA finds directions of maximum variance. A feature in thousands automatically dominates the first PC due to scale alone, not actual importance. Standardisation puts all features on equal footing","PCA requires binary features"], correctAnswerIndex:2, explanation:"Without StandardScaler, PCA's maximum variance direction is essentially just the direction of the feature with the largest scale — an artifact of units, not true data structure." },
    { id:4, question:"How do you decide how many principal components to keep?", options:["Always keep exactly half","Always use exactly 2 for visualisation","Keep all components — removing any always hurts","Plot cumulative explained variance and choose components explaining 90-95% of total variance — the knee of the scree plot. For downstream models, cross-validate with different numbers and choose based on validation performance"], correctAnswerIndex:3, explanation:"95% retained variance is a common heuristic. For visualisation, 2-3 components. For downstream models, cross-validate with different numbers of components." },
  ],

  "tsne": [
    { id:1, question:"What is t-SNE's primary purpose and why cannot you use it for model training?", options:["t-SNE is a supervised model for classification","t-SNE maps high-dimensional data to 2D or 3D preserving local structure. It has no parametric transform — new points cannot be projected without rerunning the entire algorithm on the full dataset","t-SNE is identical to PCA with different optimisation","t-SNE reduces dimensionality for prediction"], correctAnswerIndex:1, explanation:"t-SNE is purely exploratory. For model preprocessing, use PCA (has a transform formula) or UMAP (parametric). Use t-SNE only to understand cluster structure visually." },
    { id:2, question:"What does the perplexity parameter control in t-SNE?", options:["The number of output dimensions","The learning rate of t-SNE optimisation","The effective number of nearest neighbours for each point's local structure — low perplexity emphasises local structure; high perplexity considers broader neighbourhood. Try multiple perplexity values before drawing conclusions","The number of iterations"], correctAnswerIndex:2, explanation:"Low perplexity creates tight isolated clusters. High perplexity shows broader global structure but small clusters may disappear. Always try multiple perplexity values." },
    { id:3, question:"A t-SNE plot shows 5 clearly separated clusters. Can you conclude the data has exactly 5 natural clusters?", options:["Yes — t-SNE faithfully represents cluster structure","Only if each cluster has the same number of points","Yes, if perplexity was correctly chosen","Not necessarily — t-SNE is stochastic and distorts global distances. Different random seeds produce different layouts. Treat as hypothesis generator, validate with quantitative clustering metrics"], correctAnswerIndex:3, explanation:"Clusters that appear far apart in 2D may not be far apart in the original space. t-SNE suggests structure but does not confirm it definitively." },
    { id:4, question:"Why does t-SNE use a t-distribution in the low-dimensional space rather than a Gaussian?", options:["The t-distribution has heavier tails — it allows moderate-distance neighbours in high dimensions to be placed far apart in 2D without penalty (the crowding problem). Gaussian in 2D would force too many points to cluster centrally","The t-distribution is easier to compute","The t-distribution handles missing values better","A historical choice with no technical reason"], correctAnswerIndex:0, explanation:"The crowding problem: in 2D there is not enough space to faithfully represent all moderate-distance neighbours from high dimensions. The t-distribution's heavy tails allow t-SNE to place these points far apart, revealing cluster structure more clearly." },
  ],

  "association-rules": [
    { id:1, question:"What do Support, Confidence, and Lift measure in association rule mining?", options:["Three names for the same measure","Support = transactions; Confidence = profit; Lift = cost","Support: how frequently items appear together. Confidence: given item A, how often does B also appear. Lift: whether A and B appear together more than if independent — Lift > 1 means genuine association beyond chance","These metrics only apply to Apriori"], correctAnswerIndex:2, explanation:"All three are needed together. High confidence can be misleading — bread and milk appear frequently independently. Lift corrects for this: Lift=1 means independence, no genuine association." },
    { id:2, question:"Support(bread)=0.6, Support(milk)=0.7, Support(bread AND milk)=0.42. What is the Lift of bread to milk?", options:["0.42 / 0.6 = 0.7","0.42 minus 0.6 = -0.18","0.6 x 0.7 = 0.42","Lift = 0.42 / (0.6 x 0.7) = 1.0 — no association beyond independence"], correctAnswerIndex:3, explanation:"Lift = Support(A AND B) / (Support(A) x Support(B)) = 0.42/0.42 = 1.0. These items appear together exactly as often as independent items would — no meaningful association." },
    { id:3, question:"How do you filter hundreds of rules for genuinely useful ones?", options:["Set minimum thresholds for Support (eliminates rare combinations), Confidence (eliminates unreliable rules), and Lift (eliminates spurious associations from item popularity). Then rank remaining rules by Lift","Keep all rules — more is better","Remove all rules where either item has Support > 0.5","Use only the first 10 alphabetically"], correctAnswerIndex:0, explanation:"Without minimum support: unreliable rules from rare combinations. Without minimum confidence: rules with many exceptions. Without minimum lift: rules driven purely by item popularity." },
    { id:4, question:"A rule shows customers who buy diapers also buy beer with Confidence=0.68, Lift=2.3. Is this a useful rule?", options:["No — Confidence below 0.7 makes this unreliable","Yes — Lift=2.3 means diaper buyers are 2.3x more likely to also buy beer than the average customer. The famous retail finding that drove beer-diaper co-placement strategies in stores","Only if found in more than 10,000 transactions","No — food and beverage rules are always spurious"], correctAnswerIndex:1, explanation:"Lift=2.3 is strong — not a coincidence. New fathers buying diapers also buy beer (reward purchase, limited shopping trips). Co-location and targeted promotions became real business decisions from this rule." },
  ],

  "apriori": [
    { id:1, question:"What is the Apriori principle and why does it make the algorithm efficient?", options:["All rules with confidence above 0.5 are automatically frequent","Items must appear alphabetically to be considered frequent","Frequent itemsets always contain fewer than 5 items","If an itemset is infrequent (below minimum support), all its supersets must also be infrequent — this anti-monotone property allows pruning entire branches of the search space without evaluating them"], correctAnswerIndex:3, explanation:"Without this principle you would evaluate 2^N itemsets (exponential). With it: if milk-bread is infrequent, milk-bread-eggs can be immediately discarded. This converts an exponential search into a tractable computation." },
    { id:2, question:"Apriori generates 3-itemsets from 2-itemsets. What is the joining step?", options:["Combine two k-1-itemsets that share their first k-2 items — only matching-prefix itemsets are joined, generating each candidate exactly once","Randomly combine pairs of 2-itemsets","All 2-itemsets are combined with all others","Add the least frequent item to each 2-itemset"], correctAnswerIndex:0, explanation:"{A,B} joined with {A,C} produces {A,B,C} only if they share the same first k-2 items. This canonical join prevents generating the same candidate twice." },
    { id:3, question:"What main limitation of Apriori does FP-Growth address?", options:["Apriori cannot find rules with confidence","Apriori requires multiple database scans (one per itemset size) and generates huge candidate sets. FP-Growth compresses into an FP-Tree and mines with only 2 scans and no candidate generation — 10-100x faster for large datasets","Apriori only works with binary transaction data","Apriori cannot handle support above 0.1"], correctAnswerIndex:1, explanation:"For large datasets, FP-Growth can be 10-100x faster than Apriori by using a compact tree structure that avoids candidate generation entirely." },
    { id:4, question:"Minimum support 0.01% gives 50,000 rules; 5% gives 3 rules. How do you find a middle ground?", options:["Always use minimum support that gives exactly 100 rules","Use only the rule with highest Lift","Try values between 0.01% and 5% iteratively, additionally filtering by minimum confidence and minimum Lift — all three thresholds together control rule set size and quality simultaneously","Set minimum support equal to average item frequency"], correctAnswerIndex:2, explanation:"Business context matters: 5% support in a supermarket with 10M transactions means 500,000 transactions — a very strong signal. The combination of all three thresholds gives you control over quality and quantity." },
  ],

});

Object.assign(quizData, {
  "generative-ai-intro": [
    {
      id: 1,
      question: "Which operation makes a system generative rather than a retrieval or predictive system?",
      options: [
        "Returning an existing policy paragraph from storage",
        "Assigning a fraud probability to a payment",
        "Constructing a new candidate response from learned patterns and supplied guidance",
        "Sorting stored documents by date",
      ],
      correctAnswerIndex: 2,
      explanation: "Generation constructs a new candidate output. Retrieval returns an existing item, while predictive ML maps an input to a label, score, or number.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "A user changes a prompt and receives a different answer from a pretrained model. What normally changed?",
      options: [
        "The use-time condition changed while the saved model parameters stayed fixed",
        "The model was retrained and all parameters were updated",
        "The training dataset was permanently edited",
        "The model became a retrieval engine",
      ],
      correctAnswerIndex: 0,
      explanation: "Prompting supplies use-time guidance. Training changes parameters with examples and an objective; ordinary inference reuses fixed pretrained parameters.",
      questionType: "interpretation",
    },
    {
      id: 3,
      question: "A customer must see the exact current refund-policy paragraph. Which starting approach best preserves that requirement?",
      options: [
        "Begin from random image noise",
        "Ask a generator to invent a concise policy",
        "Use a GAN to score the paragraph",
        "Retrieve the approved stored paragraph",
      ],
      correctAnswerIndex: 3,
      explanation: "Retrieval is the appropriate starting point when the product must return exact stored evidence. A generated paraphrase could introduce unsupported policy details.",
      questionType: "practical selection",
    },
    {
      id: 4,
      question: "A writing assistant drafts a product description from verified facts. What should happen before publication?",
      options: [
        "Publish automatically because fluent text is evidence",
        "Verify facts and policy, then send acceptable output for the intended human review",
        "Delete the supplied facts so the result is more original",
        "Assume the condition guarantees every requested detail",
      ],
      correctAnswerIndex: 1,
      explanation: "Generated content is a candidate, not automatic truth. The lesson's application flow verifies facts and policy before an acceptable draft reaches human review.",
      questionType: "application/scenario",
    },
    {
      id: 5,
      question: "Generated support replies sound convincing but sometimes contain policies that were never supplied. What is the most direct diagnosis?",
      options: [
        "The outputs contain unsupported claims and need evidence-based verification",
        "The random seed is functioning as a factual database",
        "The system is retrieving too accurately",
        "The model must always be trained from scratch",
      ],
      correctAnswerIndex: 0,
      explanation: "Plausible language can still be unsupported. The appropriate diagnostic is to compare important claims with trusted evidence and reject or escalate failures.",
      questionType: "debugging/diagnostic",
    },
  ],
  "generative-vs-discriminative": [
    {
      id: 1,
      question: "Which probability direction is the usual discriminative goal?",
      options: [
        "p(x)",
        "p(y | x)",
        "p(x, y)",
        "p(x | y)",
      ],
      correctAnswerIndex: 1,
      explanation: "A discriminative model directly estimates the target y after observing input x, written p(y | x).",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "In the lesson's email table, 30 of the 36 messages containing ‘offer’ are spam. What is p(spam | offer)?",
      options: [
        "30 / 100 = 0.30",
        "36 / 100 = 0.36",
        "30 / 40 = 0.75",
        "30 / 36 ≈ 0.833",
      ],
      correctAnswerIndex: 3,
      explanation: "Conditioning on ‘offer’ restricts the denominator to the 36 messages containing that word. Of those, 30 are spam, giving about 83.3%.",
      questionType: "numerical/formula",
    },
    {
      id: 3,
      question: "Which statement correctly interprets the overlap between generative and discriminative models?",
      options: [
        "Either family can support classification, but they learn or calculate the result in different ways",
        "Only generative models can output numbers",
        "Only discriminative models can classify",
        "A model becomes generative whenever its input is complex",
      ],
      correctAnswerIndex: 0,
      explanation: "A discriminative classifier can learn p(y | x) directly, while a generative classifier can model data and class quantities and then derive p(y | x).",
      questionType: "interpretation",
    },
    {
      id: 4,
      question: "A product only needs an accurate house-price estimate from observed features. Which model family is the simpler starting point?",
      options: [
        "A diffusion image model",
        "A generator that must model every possible house description",
        "A discriminative regression model",
        "A retrieval system with no prediction rule",
      ],
      correctAnswerIndex: 2,
      explanation: "When the real job is a direct numeric prediction, discriminative modelling targets that mapping without requiring a model of how all possible inputs occur.",
      questionType: "practical selection",
    },
    {
      id: 5,
      question: "Which requirement most strongly justifies a generative approach?",
      options: [
        "Create varied samples and model missing-data patterns for several downstream uses",
        "Predict a single risk score as directly as possible",
        "Return one fixed policy sentence exactly",
        "Sort database rows by an existing timestamp",
      ],
      correctAnswerIndex: 0,
      explanation: "Creation, simulation, missing-data modelling, representation learning, and multiple downstream uses are reasons to model or sample the data-producing process.",
      questionType: "application/scenario",
    },
  ],
  "vae": [
    {
      id: 1,
      question: "In VAE reparameterization, which value is random rather than learned by the encoder?",
      options: [
        "ε sampled from N(0, I)",
        "log σ²",
        "μ",
        "The decoder weights",
      ],
      correctAnswerIndex: 0,
      explanation: "The encoder calculates μ and log-variance. The framework samples ε from a standard normal distribution, and z is then calculated from all three values.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "Using μ = [0.5, -1.0], σ = [0.5, 2.0], and ε = [0.4, -0.3], what latent sample z is produced?",
      options: [
        "[0.9, -1.3]",
        "[0.2, -0.6]",
        "[0.7, -1.6]",
        "[0.5, 2.0]",
      ],
      correctAnswerIndex: 2,
      explanation: "Apply z = μ + σ ⊙ ε: [0.5 + 0.5×0.4, -1.0 + 2.0×(-0.3)] = [0.7, -1.6].",
      questionType: "numerical/formula",
    },
    {
      id: 3,
      question: "Which path describes generation rather than reconstruction in a VAE?",
      options: [
        "Encode an existing input, then decode a sample near its μ",
        "Sample z from the prior N(0, I), then decode it without first encoding an input",
        "Use only reconstruction loss and never sample",
        "Feed ε directly to the output without a decoder",
      ],
      correctAnswerIndex: 1,
      explanation: "VAE generation begins with a latent sampled from the prior. Reconstruction instead begins with an existing input that the encoder maps into a distribution.",
      questionType: "interpretation",
    },
    {
      id: 4,
      question: "A VAE's KL term falls near zero and changing z barely changes the decoder output. What failure does this indicate?",
      options: [
        "Mode collapse",
        "Perfect latent disentanglement",
        "A missing random seed",
        "Posterior collapse",
      ],
      correctAnswerIndex: 3,
      explanation: "Posterior collapse occurs when the decoder ignores z. A near-zero KL term plus output insensitivity to z is the lesson's diagnostic pattern.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 5,
      question: "What trade-off should be expected when β is increased above 1 in a β-VAE?",
      options: [
        "Latent regularization becomes stronger, but reconstruction quality may decrease",
        "Randomness is removed and the model becomes deterministic",
        "The decoder no longer needs a latent input",
        "The KL term is permanently disabled",
      ],
      correctAnswerIndex: 0,
      explanation: "A larger β gives KL regularization more influence. This can organize or separate latent factors more strongly, but the extra pressure can cost reconstruction detail.",
      questionType: "practical selection",
    },
  ],
  "gans": [
    {
      id: 1,
      question: "Why is G(z) detached during the discriminator update?",
      options: [
        "To replace the fake sample with a real one",
        "To remove randomness from z",
        "To force the discriminator output to 0.5",
        "To prevent discriminator gradients from updating the generator in that phase",
      ],
      correctAnswerIndex: 3,
      explanation: "Detaching keeps the fake values but removes their gradient connection to G, so the discriminator phase changes only discriminator parameters.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "For D(x) = 0.90 and D(G(z)) = 0.20, what discriminator loss does the lesson calculate?",
      options: [
        "-ln(0.90) - ln(0.80) ≈ 0.328",
        "-ln(0.20) ≈ 1.609",
        "0.90 + 0.20 = 1.10",
        "1 - 0.90 = 0.10",
      ],
      correctAnswerIndex: 0,
      explanation: "The BCE terms are approximately 0.105 for the real sample and 0.223 for correctly rejecting the fake, giving 0.328 in total.",
      questionType: "numerical/formula",
    },
    {
      id: 3,
      question: "Many different noise vectors produce almost identical samples. Which GAN failure is most likely?",
      options: [
        "Posterior collapse",
        "Timestep mismatch",
        "Mode collapse",
        "Excessive retrieval",
      ],
      correctAnswerIndex: 2,
      explanation: "Mode collapse means the generator covers too little of the data distribution, producing nearly the same output from many different z values.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 4,
      question: "At idealized GAN equilibrium, why may the discriminator output about 0.5?",
      options: [
        "It has stopped receiving inputs",
        "Generated and real distributions match closely enough that it cannot reliably distinguish them",
        "Real labels have been deleted",
        "The generator loss must be exactly zero",
      ],
      correctAnswerIndex: 1,
      explanation: "An output near 0.5 at equilibrium means the learned discriminator cannot tell matched real and generated distributions apart; it does not by itself mean both networks failed.",
      questionType: "interpretation",
    },
    {
      id: 5,
      question: "A team wants a GAN to generate a requested digit class. What change matches the lesson?",
      options: [
        "Supply the class label as extra information to both G and D",
        "Detach every generator output in both update phases",
        "Train only the discriminator",
        "Replace the random input z with a fixed database row",
      ],
      correctAnswerIndex: 0,
      explanation: "A conditional GAN provides information such as a class label to both networks, allowing the generator to create samples for the requested class.",
      questionType: "application/scenario",
    },
  ],
  "diffusion-models": [
    {
      id: 1,
      question: "During diffusion training, what is the difference between ε and ε̂?",
      options: [
        "Both are developer-chosen learning rates",
        "ε is the clean sample; ε̂ is the timestep",
        "ε is sampled target noise; ε̂ is the model's prediction of that noise",
        "Both are identical model parameters",
      ],
      correctAnswerIndex: 2,
      explanation: "Training knows ε because it deliberately added that sampled noise. The denoiser produces ε̂ after seeing xₜ and t, and the loss compares the two.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "For x₀ = 0.80, ᾱₜ = 0.64, and ε = -0.50, what noisy value xₜ is calculated?",
      options: [
        "0.94",
        "0.34",
        "0.64",
        "-0.30",
      ],
      correctAnswerIndex: 1,
      explanation: "The signal and noise scales are 0.80 and 0.60, so xₜ = 0.80×0.80 + 0.60×(-0.50) = 0.64 - 0.30 = 0.34.",
      questionType: "numerical/formula",
    },
    {
      id: 3,
      question: "Which statement correctly contrasts diffusion training and generation?",
      options: [
        "Both begin from a clean training sample and update weights",
        "Training always requires a text prompt",
        "Generation knows the true ε at every step",
        "Training adds known noise to real samples and updates parameters; generation starts from random noise and keeps trained parameters fixed",
      ],
      correctAnswerIndex: 3,
      explanation: "Training creates noisy examples with known ε and learns from prediction error. Generation uses the trained denoiser and scheduler repeatedly from a random starting sample.",
      questionType: "interpretation",
    },
    {
      id: 4,
      question: "A training loop compares the predicted noise ε̂ with the clean sample x₀ instead of the sampled noise ε. What is wrong?",
      options: [
        "The loss uses the wrong target for the noise-prediction objective",
        "Nothing; those targets are interchangeable",
        "The scheduler has too many inference steps",
        "The model should remove timestep conditioning",
      ],
      correctAnswerIndex: 0,
      explanation: "For the lesson's common DDPM objective, ε is the supervised target. Comparing ε̂ with x₀ teaches a different and mismatched objective.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 5,
      question: "During generation, which component converts a model noise prediction into the next, usually less noisy sample?",
      options: [
        "The training dataset",
        "The scheduler",
        "The optimizer",
        "The text prompt alone",
      ],
      correctAnswerIndex: 1,
      explanation: "The denoiser predicts noise, while the scheduler stores the timestep sequence and numerical reverse-update rule used to calculate the next sample.",
      questionType: "application/scenario",
    },
  ],
  "stable-latent-diffusion": [
    {
      id: 1,
      question: "In the lesson's example, how many times fewer scalar values does [1, 4, 64, 64] contain than [1, 3, 512, 512]?",
      options: [
        "8 times fewer",
        "48 times fewer",
        "16 times fewer",
        "64 times fewer",
      ],
      correctAnswerIndex: 1,
      explanation: "The pixel tensor has 786,432 values and the latent has 16,384. Dividing 786,432 by 16,384 gives 48; the 64-times figure refers only to spatial locations.",
      questionType: "numerical/formula",
    },
    {
      id: 2,
      question: "What normally starts pure text-to-image latent-diffusion inference?",
      options: [
        "Randomly sampled latent noise",
        "A real image passed through the VAE encoder",
        "A completed RGB image",
        "Updated U-Net parameters",
      ],
      correctAnswerIndex: 0,
      explanation: "Pure text-to-image inference has no starting image to encode. It begins from random latent noise and progressively denoises it under text guidance.",
      questionType: "conceptual",
    },
    {
      id: 3,
      question: "Which component pairing is correctly interpreted?",
      options: [
        "Tokenizer → creates the final RGB pixels",
        "Text encoder → calculates the scheduler's next latent",
        "Cross-attention → lets image-latent locations use relevant prompt-token information",
        "VAE decoder → updates the U-Net weights during inference",
      ],
      correctAnswerIndex: 2,
      explanation: "Cross-attention connects image-latent features with contextual text representations. The other components have different, separately defined roles.",
      questionType: "interpretation",
    },
    {
      id: 4,
      question: "Fine text and tiny details look softer after generation. Which lesson-specific limitation should be inspected first?",
      options: [
        "The scheduler performed a one-pass update",
        "The tokenizer must contain more RGB channels",
        "The seed has become a learned parameter",
        "The VAE compression may not preserve every pixel perfectly",
      ],
      correctAnswerIndex: 3,
      explanation: "Latent diffusion gains efficiency through VAE compression, but that compact representation can lose fine pixel detail and make small text or features softer.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 5,
      question: "A workflow begins from an uploaded image and edits it. Which component must re-enter the path before latent denoising?",
      options: [
        "Only the VAE decoder",
        "The VAE encoder",
        "The optimizer",
        "The training labels",
      ],
      correctAnswerIndex: 1,
      explanation: "Image-to-image and inpainting begin with pixels, so the VAE encoder must map the supplied image into the latent space before noise and denoising steps are applied.",
      questionType: "application/scenario",
    },
  ],
  "controlling-diffusion-models": [
    {
      id: 1,
      question: "For ε̂uncond = 0.2, ε̂cond = 0.5, and guidance scale s = 3, what guided prediction is calculated?",
      options: [
        "0.3",
        "0.7",
        "1.5",
        "1.1",
      ],
      correctAnswerIndex: 3,
      explanation: "CFG gives 0.2 + 3×(0.5 - 0.2) = 0.2 + 0.9 = 1.1. The result is a guided denoising component, not a pixel brightness.",
      questionType: "numerical/formula",
    },
    {
      id: 2,
      question: "What does a random seed control in a diffusion pipeline?",
      options: [
        "The visual style stored in the model weights",
        "Initialization of the random-number generator and therefore the starting latent",
        "The number of training examples",
        "Which pixels the inpainting mask marks as editable",
      ],
      correctAnswerIndex: 1,
      explanation: "A seed is a chosen integer used to initialize randomness. Under matching model, settings, hardware path, and software versions, it helps reproduce the same starting latent.",
      questionType: "conceptual",
    },
    {
      id: 3,
      question: "A generated cyclist must follow an exact supplied pose while appearance may change. Which control is the best starting point?",
      options: [
        "A pose-based ControlNet-style condition",
        "A higher random seed",
        "Textual Inversion",
        "More unrelated negative prompts",
      ],
      correctAnswerIndex: 0,
      explanation: "A pose map explicitly represents joint locations, so ControlNet-style conditioning can preserve the required geometry while allowing new appearance.",
      questionType: "practical selection",
    },
    {
      id: 4,
      question: "An inpainting pipeline edits the opposite region from the one intended. What should be checked first?",
      options: [
        "Whether the base model was fully retrained",
        "Whether the seed is a visual style number",
        "Whether the library treats white or black mask values as ‘edit’",
        "Whether the prompt contains a class label",
      ],
      correctAnswerIndex: 2,
      explanation: "Mask conventions differ across libraries. Confirming which colour means ‘edit’ is the direct diagnostic before changing unrelated model settings.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 5,
      question: "A team wants to restyle a photograph while preserving most of its composition. What should it try first?",
      options: [
        "Pure text-to-image from unrelated random noise",
        "Image-to-image with modest strength",
        "The maximum possible guidance scale",
        "A new full-model training run",
      ],
      correctAnswerIndex: 1,
      explanation: "Image-to-image anchors the result to the supplied image, and modest strength tends to preserve more of the original composition while allowing revision.",
      questionType: "application/scenario",
    },
  ],
  "finetuning-image-models": [
    {
      id: 1,
      question: "What distinguishes image-model fine-tuning from prompts, seeds, masks, and guidance?",
      options: [
        "Fine-tuning changes learned embeddings or parameter updates during training",
        "Fine-tuning only changes the random starting latent",
        "Fine-tuning never requires example data",
        "Fine-tuning is another name for inpainting",
      ],
      correctAnswerIndex: 0,
      explanation: "Inference-time controls keep the pretrained model fixed. Fine-tuning is training-time adaptation that learns new embeddings or parameter updates.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "For a 4 × 4 weight matrix and rank-1 LoRA, how many adapter parameters are learned?",
      options: [
        "4",
        "32",
        "16",
        "8",
      ],
      correctAnswerIndex: 3,
      explanation: "A has shape 1 × 4 and B has shape 4 × 1, so the adapter learns 4 + 4 = 8 parameters. The original 16-parameter W stays frozen.",
      questionType: "numerical/formula",
    },
    {
      id: 3,
      question: "Which method is the most compact starting point when one placeholder token only needs to represent a small visual concept?",
      options: [
        "Full-model retraining",
        "DreamBooth",
        "Textual Inversion",
        "ControlNet pose conditioning",
      ],
      correctAnswerIndex: 2,
      explanation: "Textual Inversion learns one or a few token embeddings while leaving the base model frozen, making it the lightest artifact among the adaptation methods taught.",
      questionType: "practical selection",
    },
    {
      id: 4,
      question: "A personalized product appears correctly only on the same white table shown in every training image. What is the likely problem?",
      options: [
        "The rank is automatically too small in every layer",
        "The model learned an accidental background correlation with the product",
        "The validation prompts updated the base weights",
        "The seed is preventing all generalization",
      ],
      correctAnswerIndex: 1,
      explanation: "If training examples never vary the background, the adaptation may bind the white table to the concept. Varied lawful data and held-out settings test this leakage.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 5,
      question: "Why must validation prompts stay outside the adapter update loop?",
      options: [
        "So the model never sees text during generation",
        "So they can reveal whether the learned concept works in unseen settings rather than memorizing training compositions",
        "So every checkpoint receives a different test",
        "So validation can replace permission checks",
      ],
      correctAnswerIndex: 1,
      explanation: "Held-out prompts provide independent evidence of generalization. If updates use them, they become training feedback and stop testing unseen combinations.",
      questionType: "application/scenario",
    },
  ],
  "multimodal-ai": [
    {
      id: 1,
      question: "Which system is multimodal but not generative according to the lesson?",
      options: [
        "Text → a newly generated image",
        "Image → a newly written caption",
        "Image + question → a selected class from fixed labels",
        "Audio + text → a newly generated spoken response",
      ],
      correctAnswerIndex: 2,
      explanation: "The system connects image and text modalities but only selects a fixed label. Generation requires constructing an open-ended output such as text, pixels, or audio.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "What is the dot-product similarity between text [0.8, 0.6] and image B [-0.6, 0.8]?",
      options: [
        "0.00",
        "-1.00",
        "0.48",
        "1.00",
      ],
      correctAnswerIndex: 0,
      explanation: "The calculation is 0.8×(-0.6) + 0.6×0.8 = -0.48 + 0.48 = 0.00, so the toy normalized vectors provide no positive alignment signal.",
      questionType: "numerical/formula",
    },
    {
      id: 3,
      question: "Why does a multimodal system need an output-specific decoder?",
      options: [
        "Because encoders can only process one example",
        "Because every modality uses identical raw values",
        "Because alignment alone always produces a human-readable answer",
        "Because the destination format determines whether it must produce text tokens, image latents, or audio",
      ],
      correctAnswerIndex: 3,
      explanation: "Aligned or fused representations carry information, but the final generation mechanism must match the output modality, such as a language, image, or audio decoder.",
      questionType: "practical selection",
    },
    {
      id: 4,
      question: "A visual question-answering system repeats the question's suggestion even when the image contradicts it. Which test best diagnoses the problem?",
      options: [
        "Increase every embedding value",
        "Keep the text fixed and change only the image",
        "Remove the image encoder permanently",
        "Measure only sentence fluency",
      ],
      correctAnswerIndex: 1,
      explanation: "Changing only the image tests whether visual evidence actually influences the answer. Unchanged responses suggest that the system is ignoring that modality.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 5,
      question: "An accessibility-description model writes that a ramp is present, but no ramp is visible. How should this be assessed?",
      options: [
        "Accept it because the sentence is fluent",
        "Assume high embedding similarity proves the ramp exists",
        "Treat it as an unsupported hallucination and compare the claim with localized visual evidence",
        "Classify the task as non-generative",
      ],
      correctAnswerIndex: 2,
      explanation: "Generated descriptions must remain grounded in the source image. Fluent wording and broad similarity do not prove that a specific object is visible.",
      questionType: "application/scenario",
    },
  ],
  "audio-music-video-generation": [
    {
      id: 1,
      question: "How many waveform values are stored for a two-second mono clip sampled at 16,000 samples per second?",
      options: [
        "8,000",
        "32,000",
        "16,000",
        "160,000",
      ],
      correctAnswerIndex: 1,
      explanation: "Sample count equals sample rate × duration: 16,000 × 2 = 32,000 values.",
      questionType: "numerical/formula",
    },
    {
      id: 2,
      question: "What information does a spectrogram organize?",
      options: [
        "A list of model parameters sorted by size",
        "Only speaker names and transcript words",
        "Independent video frames with no timing",
        "Time horizontally, frequency vertically, and energy by cell intensity",
      ],
      correctAnswerIndex: 3,
      explanation: "A spectrogram turns sound into a time-by-frequency representation, with intensity showing how much energy occurs at each time and frequency.",
      questionType: "conceptual",
    },
    {
      id: 3,
      question: "A video has attractive individual frames but the subject's identity flickers between them. What does this show?",
      options: [
        "The model needs fewer consistency checks",
        "The video is actually a static image",
        "High local frame quality does not guarantee temporal consistency",
        "Temporal order has no effect on meaning",
      ],
      correctAnswerIndex: 2,
      explanation: "Temporal media must preserve identity, objects, motion, and scene state across adjacent and later moments; strong single frames are not sufficient.",
      questionType: "interpretation",
    },
    {
      id: 4,
      question: "A composer needs explicit control over notes, durations, instruments, and tempo before rendering audio. Which representation fits best?",
      options: [
        "Symbolic musical events",
        "A final waveform only",
        "Independent image pixels",
        "A class-probability table",
      ],
      correctAnswerIndex: 0,
      explanation: "Symbolic music represents musical events directly, making those controls explicit. It still requires a renderer or performer to become sound.",
      questionType: "practical selection",
    },
    {
      id: 5,
      question: "What extra requirement distinguishes image-to-video from text-to-video in the lesson?",
      options: [
        "It must discard the supplied image immediately",
        "It never needs temporal features",
        "It must preserve the reference frame's identity and composition while inventing plausible motion",
        "It can generate each frame independently without flicker",
      ],
      correctAnswerIndex: 2,
      explanation: "Image-to-video receives a reference frame, so the system must carry its visual identity and composition forward while adding temporally coherent change.",
      questionType: "application/scenario",
    },
  ],
  "synthetic-data": [
    {
      id: 1,
      question: "What distinguishes data augmentation from fully synthetic generation?",
      options: [
        "There is no difference once a model is trained",
        "Augmentation always creates an unrelated sample from random noise",
        "Fully synthetic generation must copy one selected real row",
        "Augmentation starts from a real example and applies a validity-preserving change",
      ],
      correctAnswerIndex: 3,
      explanation: "An augmented item remains tied to a source example. Fully synthetic generation constructs a sample from rules, simulation, a fitted distribution, or a generative model.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "Class B rises from 20 of 100 real cases to 40 of 100 synthetic cases. How did its coverage change?",
      options: [
        "It halved and fell 20 percentage points",
        "It doubled and rose 100 percentage points",
        "It doubled and rose 20 percentage points",
        "It stayed statistically identical",
      ],
      correctAnswerIndex: 2,
      explanation: "The count multiplier is 40 ÷ 20 = 2×, while the share changes from 20% to 40%, an increase of 20 percentage points.",
      questionType: "numerical/formula",
    },
    {
      id: 3,
      question: "How should the changed 60/40 synthetic class balance be interpreted?",
      options: [
        "It improves class-B coverage but no longer reproduces the real 80/20 frequency",
        "It proves the real population is actually balanced",
        "It guarantees better performance on every downstream task",
        "It proves the records are private",
      ],
      correctAnswerIndex: 0,
      explanation: "Intentional oversampling can help a classifier see more minority cases, but it trades distribution fidelity for coverage and must be evaluated for the intended use.",
      questionType: "interpretation",
    },
    {
      id: 4,
      question: "Synthetic records look realistic. Why is that not enough to claim privacy?",
      options: [
        "Privacy depends only on removing column names",
        "Realistic generators may still reproduce or closely resemble source records",
        "All synthetic generation has formal privacy guarantees",
        "A visual inspection detects every membership risk",
      ],
      correctAnswerIndex: 1,
      explanation: "Realism and privacy are separate dimensions. Duplicate, nearest-neighbour, disclosure, and membership tests investigate risks that appearance alone cannot reveal.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 5,
      question: "Which evaluation most directly tests whether synthetic training data helps the real task?",
      options: [
        "Check only whether the synthetic rows look plausible",
        "Train and test on the same synthetic rows",
        "Train on synthetic data and test on untouched real data",
        "Replace all real-world evaluation with simulator results",
      ],
      correctAnswerIndex: 2,
      explanation: "TSTR measures a downstream model on real outcomes after fitting on synthetic examples, preserving the real test set as the evidence for usefulness.",
      questionType: "application/scenario",
    },
  ],
  "evaluating-generative-models": [
    {
      id: 1,
      question: "What does FID primarily compare?",
      options: [
        "The centres and spreads of real and generated image-feature collections",
        "One generated image with one exact correct image",
        "Only the latency of an image generator",
        "Whether every generated claim is factually true",
      ],
      correctAnswerIndex: 0,
      explanation: "FID is a set-level feature-distribution distance. It compares feature means and covariances, so it is not a complete score for one image or for every quality dimension.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "A release requires artifact rate ≤ 5% and p95 latency ≤ 3 seconds. Which worked-example generator passes both gates?",
      options: [
        "Generator A: 8% artifacts and 4.2 seconds",
        "Generator B: 3% artifacts and 2.1 seconds",
        "Both generators",
        "Neither generator",
      ],
      correctAnswerIndex: 1,
      explanation: "B stays below both chosen limits. A wins preference and adherence, but its 8% artifact rate and 4.2-second p95 exceed the release gates.",
      questionType: "numerical/formula",
    },
    {
      id: 3,
      question: "Generator A wins human preference, while Generator B wins artifact rate, latency, and cost. What is the sound conclusion?",
      options: [
        "A is universally better because preference is the only real metric",
        "B is universally better for every future application",
        "Average all columns without preserving their meaning",
        "The result is a documented trade-off, and chosen hard requirements determine release eligibility",
      ],
      correctAnswerIndex: 3,
      explanation: "Different dimensions answer different questions. The team must preserve the trade-off and apply requirements set for the user job rather than declare a universal winner.",
      questionType: "interpretation",
    },
    {
      id: 4,
      question: "Two models were evaluated with different prompts and preprocessing. Why is the comparison unreliable?",
      options: [
        "Human review can correct every unfair comparison afterward",
        "Generative models must always receive different prompts",
        "It mixes model differences with test-pipeline differences",
        "Preprocessing never affects feature-based scores",
      ],
      correctAnswerIndex: 2,
      explanation: "Candidates must face the same cases, settings, preprocessing, and scoring logic. Otherwise the observed difference cannot be attributed to the model alone.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 5,
      question: "A random generator looks excellent on one output. What should the evaluation do next?",
      options: [
        "Release immediately because the sample proves the distribution",
        "Discard the held-out set and tune on it",
        "Repeat important cases with recorded settings and report variation or pass rates",
        "Measure only one embedding similarity",
      ],
      correctAnswerIndex: 2,
      explanation: "One lucky output does not describe the range of possible generations. Repeated runs reveal reliability and variation under the same test conditions.",
      questionType: "application/scenario",
    },
  ],
  "responsible-generative-ai": [
    {
      id: 1,
      question: "Why can an acceptable model still produce an unsafe application?",
      options: [
        "Only training speed determines safety",
        "Model safety automatically covers every possible workflow",
        "Application code cannot affect impact",
        "Application risk also depends on users, context, permissions, actions, and human review",
      ],
      correctAnswerIndex: 3,
      explanation: "Risk emerges from the whole system. The same model can be acceptable for reviewed brainstorming and unacceptable when output automatically changes a medical, financial, or legal record.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "A team assigns likelihood 3 and impact 4 on its 1–5 planning scales. What priority score does it calculate?",
      options: [
        "12",
        "7",
        "0.75",
        "34",
      ],
      correctAnswerIndex: 0,
      explanation: "The lesson's planning rule is likelihood × impact, so 3 × 4 = 12. This ranks risks within the team's rubric; it is not a measured probability.",
      questionType: "numerical/formula",
    },
    {
      id: 3,
      question: "A generated answer could change a person's eligibility record. What safeguard best matches the lesson?",
      options: [
        "Allow the answer to act automatically because it sounds confident",
        "Use only a general disclaimer below the result",
        "Require appropriate human approval and provide correction and escalation paths",
        "Log every raw private prompt forever",
      ],
      correctAnswerIndex: 2,
      explanation: "High-impact actions need stronger containment and meaningful human review. Users also need a way to correct or escalate failures.",
      questionType: "application/scenario",
    },
    {
      id: 4,
      question: "Why is adding ‘AI can make mistakes’ insufficient after a private-data leak?",
      options: [
        "Disclosures automatically revoke exposed credentials",
        "A disclosure sets expectations but does not prevent, detect, contain, or recover from the leak",
        "Private-data leaks are only user-interface problems",
        "The disclaimer proves permission existed",
      ],
      correctAnswerIndex: 1,
      explanation: "A disclaimer communicates uncertainty; engineering controls restrict access, detect failure, block output, and support incident response. They do different jobs.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 5,
      question: "Which intended-use statement is specific enough to guide evaluation?",
      options: [
        "Help with writing",
        "Use AI responsibly",
        "Generate anything users request",
        "Draft internal product descriptions from approved data for trained staff to edit",
      ],
      correctAnswerIndex: 3,
      explanation: "A useful intended-use statement names the user, task, evidence or environment, and review level so normal and prohibited behavior can be tested.",
      questionType: "practical selection",
    },
  ],
  "choosing-generative-model": [
    {
      id: 1,
      question: "When should a team question whether it needs a generative model at all?",
      options: [
        "Only when the model is small",
        "When exact retrieval, deterministic rules, prediction, or templates can complete the job",
        "Whenever the input includes text",
        "Never; generation is always the best first choice",
      ],
      correctAnswerIndex: 1,
      explanation: "Model selection starts by testing whether creation or transformation is actually required. Simpler approaches can be easier to verify and operate when open-ended generation adds no value.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "Why is candidate B the only eligible model in the controlled-editing example?",
      options: [
        "It is the cheapest candidate",
        "Its cost was ignored before any hard requirement was applied",
        "It has the newest model name",
        "It alone supports mask editing, permits the intended use, and stays at or below 4.0-second p95 latency",
      ],
      correctAnswerIndex: 3,
      explanation: "A lacks required mask editing and C exceeds the latency limit. B passes every developer-chosen hard constraint, so only then can its softer trade-offs matter.",
      questionType: "interpretation",
    },
    {
      id: 3,
      question: "Which family is the most natural shortlist for high-fidelity image generation with editing and guided controls?",
      options: [
        "A diffusion model",
        "A VAE used only for anomaly scoring",
        "A fixed email template",
        "A discriminative regressor",
      ],
      correctAnswerIndex: 0,
      explanation: "The lesson identifies diffusion as a useful family-level starting point for high-fidelity image generation, editing, and conditioning tools, subject to latency and compute tests.",
      questionType: "practical selection",
    },
    {
      id: 4,
      question: "Two eligible checkpoints were benchmarked on different hardware and different case sets. What should the team do?",
      options: [
        "Pick the larger checkpoint immediately",
        "Average the undocumented results",
        "Repeat the comparison on the same held-out workload and intended serving setup",
        "Ignore latency because family names determine it",
      ],
      correctAnswerIndex: 2,
      explanation: "Selection evidence is comparable only when candidates face the same work and realistic operating setup. Otherwise test-set and infrastructure differences confound the result.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 5,
      question: "A hospital requires data to remain in an approved environment. Where should that requirement enter model selection?",
      options: [
        "It can be inferred from leaderboard rank",
        "Only after the winning model is deployed",
        "As an optional aesthetic preference",
        "As a documented privacy and data-location constraint before benchmarking",
      ],
      correctAnswerIndex: 3,
      explanation: "Data location is a hard operating constraint to document early. It can eliminate unsuitable providers or deployment paths before softer quality and cost trade-offs are compared.",
      questionType: "application/scenario",
    },
  ],
  "building-genai-apps": [
    {
      id: 1,
      question: "What is the key difference between a generative model and a generative application?",
      options: [
        "A model always validates its own claims",
        "An application is only a larger model",
        "A model returns content; an application also manages allowed inputs, evidence, validation, user flow, and failures",
        "There is no meaningful difference",
      ],
      correctAnswerIndex: 2,
      explanation: "The application wraps a model in deterministic workflow logic and controls needed to complete a user job reliably; the model response alone is only a draft.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "A meeting-summary output passes its JSON schema. What has that result proved?",
      options: [
        "Every action item is true",
        "Required fields and types are present, but evidence and business rules still need separate checks",
        "The model used only authorized context",
        "No human review can ever be needed",
      ],
      correctAnswerIndex: 1,
      explanation: "Schema validation checks structure, not meaning. A correctly shaped owner or task can still be unsupported by the transcript or prohibited by business rules.",
      questionType: "interpretation",
    },
    {
      id: 3,
      question: "The generated ‘decisions’ field is a string instead of a list. Which failure class applies?",
      options: [
        "Invalid input",
        "Model-selection failure",
        "Unsupported hardware",
        "Invalid structure",
      ],
      correctAnswerIndex: 3,
      explanation: "The value violates the expected output schema. The lesson recommends one bounded repair attempt or a safe failure, with the schema failure recorded.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 4,
      question: "A contractual action item names an owner, but the transcript is ambiguous. What should the application do?",
      options: [
        "Require participant confirmation or route the case for human review",
        "Execute the action because the schema passed",
        "Silently rewrite the evidence",
        "Remove all validation from the workflow",
      ],
      correctAnswerIndex: 0,
      explanation: "Ambiguous high-impact cases should not be converted into confident automated actions. The safe response is explicit confirmation or human escalation.",
      questionType: "application/scenario",
    },
    {
      id: 5,
      question: "A workflow must find an approved project glossary but must not take external action. Which component fits the first need?",
      options: [
        "A new output schema",
        "An autonomous tool call",
        "A random seed",
        "Retrieval",
      ],
      correctAnswerIndex: 3,
      explanation: "Retrieval finds external evidence needed for the request. Tools perform calculations or authorized actions, which is a different responsibility.",
      questionType: "practical selection",
    },
  ],
  "genai-deployment": [
    {
      id: 1,
      question: "Which statement about hosted and self-hosted inference is correct?",
      options: [
        "The choice depends on measured workload, privacy, control, cost, latency, and operating capability",
        "Self-hosting removes all maintenance and security responsibility",
        "Hosted inference is always cheaper and more private",
        "Both approaches have identical data flow and scaling responsibility",
      ],
      correctAnswerIndex: 0,
      explanation: "Neither path is universally best. The actual provider, infrastructure, region, workload, contract, and team capability determine the trade-off.",
      questionType: "conceptual",
    },
    {
      id: 2,
      question: "Traffic averages 2 requests per second and processing averages 3 seconds. What is the planning estimate for average in-flight concurrency?",
      options: [
        "0.67",
        "5",
        "6",
        "9",
      ],
      correctAnswerIndex: 2,
      explanation: "Arrival rate × average processing time gives 2 × 3 = 6 requests in flight on average. Bursts and long-tail latency still require measurement and headroom.",
      questionType: "numerical/formula",
    },
    {
      id: 3,
      question: "Where should a hosted-model provider key be stored?",
      options: [
        "In JavaScript delivered to every browser",
        "In a protected server-side secret manager or environment",
        "In ordinary request logs",
        "Inside the public model prompt",
      ],
      correctAnswerIndex: 1,
      explanation: "Provider secrets belong behind the server boundary with scoped access and a rotation and revocation path, never in client code or ordinary logs.",
      questionType: "practical selection",
    },
    {
      id: 4,
      question: "A transient timeout causes the same billed generation task to run twice. Which missing safeguard is most relevant?",
      options: [
        "An unlimited retry loop",
        "Removal of all timeouts",
        "A larger browser bundle",
        "A bounded retry policy plus an idempotency key where supported",
      ],
      correctAnswerIndex: 3,
      explanation: "Retries can duplicate a non-deterministic or billed operation. Classifying transient errors, limiting attempts, and using idempotency protects one logical request from duplicate processing.",
      questionType: "debugging/diagnostic",
    },
    {
      id: 5,
      question: "How should a new model version first receive real production traffic with controlled exposure?",
      options: [
        "Replace the current version for every user immediately",
        "Disable quality and safety monitoring during launch",
        "Delete the previous evaluation results",
        "Use a canary rollout with stop conditions and a tested rollback",
      ],
      correctAnswerIndex: 3,
      explanation: "A canary limits exposure while the team compares reliability, cost, quality, and safety against the current version. Stop conditions and rollback must be defined before expansion.",
      questionType: "application/scenario",
    },
  ],
  "how-generative-models-learn": [
    {
      id: 1,
      question: "What does it mean for a generative model to learn a data distribution?",
      options: [
        "It stores every training file in a searchable folder",
        "It guarantees that every generated result is factually correct",
        "It learns only the names of the classes",
        "It learns which features and combinations are more or less plausible in the training data",
      ],
      correctAnswerIndex: 3,
      explanation: "A learned distribution represents patterns and relative likelihoods. It can guide a new sample, but it is neither a file store nor a guarantee of truth.",
    },
    {
      id: 2,
      question: "A model assigns probabilities forest = 0.50, coast = 0.30, and city = 0.20. Which category is selected by random value r = 0.72?",
      options: [
        "Forest",
        "City",
        "Coast",
        "No category",
      ],
      correctAnswerIndex: 2,
      explanation: "The cumulative intervals are forest [0.00, 0.50), coast [0.50, 0.80), and city [0.80, 1.00). Since 0.72 lies in the coast interval, coast is selected.",
    },
    {
      id: 3,
      question: "What is the main purpose of conditioning during generation?",
      options: [
        "To update every model parameter for each request",
        "To guide the likely outputs using information such as a prompt, class, image, or mask",
        "To remove all randomness from every model",
        "To prove that the output appeared in the training data",
      ],
      correctAnswerIndex: 1,
      explanation: "Conditioning changes which outputs are likely. It guides generation while still allowing variation, and it does not normally update the trained parameters.",
    },
    {
      id: 4,
      question: "Which statement correctly distinguishes training from generation?",
      options: [
        "Training updates parameters using examples and an objective; generation uses trained parameters to create a sample",
        "Training and generation both update model weights after every output",
        "Training uses prompts while generation uses only labels",
        "Generation must repeat the complete training dataset",
      ],
      correctAnswerIndex: 0,
      explanation: "Training is the learning phase in which parameters change. Generation, also called inference, normally keeps those parameters fixed and uses a starting signal to produce an output.",
    },
    {
      id: 5,
      question: "A system must create text one token at a time, using each chosen token to help choose the next. Which high-level mechanism fits best?",
      options: [
        "Autoregressive generation",
        "Adversarial generation",
        "Latent-variable reconstruction",
        "Diffusion denoising",
      ],
      correctAnswerIndex: 0,
      explanation: "Autoregressive generation builds a sequence step by step, conditioning each new part on the parts already produced. Later LLM lessons explain the method in detail.",
    },
  ],
});

Object.assign(quizData, llmQuizData);
Object.assign(quizData, agenticQuizData);
Object.assign(quizData, projectQuizData);
Object.assign(quizData, mlopsQuizData);
Object.assign(quizData, careerInterviewQuizData);
Object.assign(quizData, deepLearningQuizData);


export function getQuizzesForTopic(_topicTitle: string): QuizQuestion[] {
  return [];
}

export function getQuizzesForTopicId(topicId: string): QuizQuestion[] {
  return quizData[topicId] || [];
}
