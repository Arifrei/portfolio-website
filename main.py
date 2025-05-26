from flask import Flask, render_template, request
from dotenv import load_dotenv
import json
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('FLASK_KEY')

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/projects")
def show_projects():
    with open("projects.json", "r") as file:
        data = json.load(file)
    return render_template('projects.html', data=data)

@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        data = request.form
    return render_template('contact.html')


if __name__ == "__main__":
    app.run(debug=True)