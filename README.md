#  Heart Disease Prediction Web App

A machine learning powered web application that predicts the **risk of heart disease** based on clinical parameters.

The project uses a **Logistic Regression model trained on the UCI Heart Disease dataset** and provides predictions through a **Flask backend API** with an interactive **HTML/CSS/JS frontend**.

---

#  Project Overview

Heart disease is one of the leading causes of death worldwide. Early risk assessment using machine learning can assist healthcare professionals in identifying high-risk patients.

This application allows users to input medical attributes such as:

* Age
* Sex
* Chest pain type
* Blood pressure
* Cholesterol level
* Maximum heart rate
* ECG results
* Exercise-induced angina

The model analyzes these parameters and returns:

* **Heart disease probability**
* **Risk classification**

---

#  Tech Stack

**Machine Learning**

* Python
* NumPy
* Pandas
* Scikit-Learn
* Logistic Regression

**Backend**

* Flask API

**Frontend**

* HTML
* CSS
* JavaScript

**Model Serialization**

* Pickle (.pkl)

---

#  Dataset

The model is trained using the:

UCI Cleveland Heart Disease Dataset

It contains **303 patient records** and **13 clinical features** used for prediction.

Features used by the model:

```
age
sex
cp
trestbps
chol
fbs
restecg
thalach
exang
oldpeak
slope
ca
thal
```

Target:

```
0 → No Heart Disease
1 → Heart Disease
```

---

#  Project Structure

```
Heart-Disease-Prediction/
│
├── backend/
│   └── app.py              # Flask API
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── model/
│   ├── heart_model.pkl
│   └── scaler.pkl
│
├── train_model.py          # Model training script
├── heart_disease_data.csv
└── HeartDiseasePrediction.ipynb
```

---

#  How to Run the Project

###  Clone the repository

```
git clone https://github.com/AryanPatil01/Heart-Disease-Prediction-
```

###  Install dependencies

```
pip install -r requirements.txt
```

###  Train the model

```
python train_model.py
```

This generates:

```
model/heart_model.pkl
model/scaler.pkl
```

###  Start the backend server

```
python backend/app.py
```

### Run the frontend

Open:

```
frontend/index.html
```

or run with Live Server.

---

# Model Performance

Algorithm used:

**Logistic Regression**

Evaluation method:

* Train/Test Split

Model accuracy:

```
~82%
```

---

#  Example Output

The application provides:

* Risk classification
* Probability score

Example:

```
Heart Disease Probability: 36.4%
Risk Level: LOW
```

---

#  Disclaimer

This project is for **educational and research purposes only**.

The predictions should **not be considered medical advice** and must not replace professional medical diagnosis.

---

#  Author

Aryan Patil

GitHub:
https://github.com/AryanPatil01
