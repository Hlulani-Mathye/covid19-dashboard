from flask import Flask, render_template, jsonify
import requests
import pandas as pd
from datetime import datetime, timedelta

app = Flask(__name__)

def fetch_covid_data():
    # Use a fixed date in the past
    end_date = datetime(2020, 12, 1)  # May 1, 2020
    days = 30
    start_date = end_date - timedelta(days=days)

    url = f"https://disease.sh/v3/covid-19/historical/all?lastdays={days}"
    response = requests.get(url)
    data = response.json()

    processed_data = []
    for i in range(days):
        date = (start_date + timedelta(days=i)).strftime('%m/%d/%y')
        processed_data.append({
            'date': date,
            'cases': data['cases'].get(date, 0),
            'deaths': data['deaths'].get(date, 0),
            'recovered': data['recovered'].get(date, 0)
        })
    
    return processed_data

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/covid-data')
def get_covid_data():
    data = fetch_covid_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)