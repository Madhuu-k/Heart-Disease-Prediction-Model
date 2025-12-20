import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

# Load data
df = pd.read_csv("framingham.csv")

for col in df.columns:
    df[col] = df[col].fillna(df[col].median())

X = df.drop("TenYearCHD", axis=1)
y = df["TenYearCHD"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression(
        class_weight="balanced",
        max_iter=500
    ))
])

pipeline.fit(X_train, y_train)

joblib.dump(pipeline, "heart_model.pkl")

print("✅ Model pipeline saved as heart_model.pkl")
