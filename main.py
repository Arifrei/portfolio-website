from flask import Flask, render_template, request, flash, redirect, url_for
import smtplib
from email.message import EmailMessage
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
        sender_email = os.getenv("EMAIL_ADDRESS")
        recipient_email = os.getenv("RECIPIENT_EMAIL")
        app_password = os.getenv("EMAIL_PASSWORD")

        msg = EmailMessage()
        msg["Subject"] = "Portfolio Website Contact"
        msg["From"] = sender_email
        msg["To"] = recipient_email
        msg.set_content(f"""
        Name: {data['name']}
        Email: {data['email']}
        
        Message: {data['message']}
        """)
        flash("Your message has been sent!")
        return redirect(url_for('contact'))
    return render_template('contact.html')


if __name__ == "__main__":
    app.run(debug=True)