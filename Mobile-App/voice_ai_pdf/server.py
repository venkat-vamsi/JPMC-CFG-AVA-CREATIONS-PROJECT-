from flask import Flask, request, Response
from twilio.twiml.voice_response import VoiceResponse, Gather
import google.generativeai as genai
import requests
from datetime import datetime, timedelta
import os
import urllib.parse
import logging

# Set up Flask app and logging
app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

# Gemini API key
GEMINI_API_KEY = "AIzaSyB4TNhWHSNVdPqrURh92E_tWGXx3HDp_dE"
genai.configure(api_key=GEMINI_API_KEY)

# Open-Meteo API (free, no API key required)
WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast"

# Data endpoints
BANK_BALANCE_URL = "http://ec2-18-136-196-238.ap-southeast-1.compute.amazonaws.com:8080/api/users/balance/9908342934"
GOV_SCHEMES_URL = "http://ec2-18-136-196-238.ap-southeast-1.compute.amazonaws.com:8080/api/schemes/public"

# Initialize GenerativeModel
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Helper function to get bank balance
def get_bank_balance(phone_number):
    try:
        response = requests.get(f"{BANK_BALANCE_URL}")
        if response.status_code == 200:
            data = response.json()
            #urn f"Your bank balance is {data.get('balance', 'unknown')} rupees."
            return data.get('message', 'Your bank balance is 10,000 rupees.')
        else:
            logger.error(f"Bank balance API error: {response.status_code}, {response.text}")
            return "Your bank balance is 10,000 rupees."  # Static data
    except Exception as e:
        logger.error(f"Error fetching bank balance: {e}")
        return "Your bank balance is 10,000 rupees."  # Static data

# Helper function to get government schemes
def get_government_schemes():
    try:
        response = requests.get(GOV_SCHEMES_URL)
        if response.status_code == 200:
            data = response.json()
            logger.info(f"Government schemes response: {data}")
            # Handle array of objects with name and description
            if isinstance(data, list):
                if not data:
                    schemes = ['No schemes available']
                else:
                    schemes = [f"{scheme.get('name', 'Unknown scheme')}, {scheme.get('description', 'No description available')}" for scheme in data]
            else:
                logger.warning(f"Unexpected response type: {type(data)}")
                schemes = ['No schemes available']
            return "Available government schemes: " + "; ".join(schemes)
        else:
            logger.error(f"Government schemes API error: {response.status_code}, {response.text}")
            return "Available government schemes: Orunodoi, Assam Tea Garden Workers’ Scheme."  # Static data
    except Exception as e:
        logger.error(f"Error fetching government schemes: {e}")
        return "Available government schemes: Orunodoi, Assam Tea Garden Workers’ Scheme."
# Helper function to get weather for next day using Open-Meteo for Karbi Anglong
def get_weather_forecast():
    try:
        tomorrow = (datetime.utcnow() + timedelta(days=1)).strftime("%Y-%m-%d")
        params = {
            "latitude": 26.0,  # Karbi Anglong (Diphu) coordinates
            "longitude": 93.5,
            "daily": "temperature_2m_max,temperature_2m_min,weathercode",
            "timezone": "Asia/Kolkata"
        }
        response = requests.get(WEATHER_API_URL, params=params)
        if response.status_code == 200:
            data = response.json()
            daily = data.get('daily', {})
            if daily and 'time' in daily:
                for i, date in enumerate(daily['time']):
                    if tomorrow in date:
                        temp_max = daily['temperature_2m_max'][i]
                        temp_min = daily['temperature_2m_min'][i]
                        weather_code = daily['weathercode'][i]
                        weather_desc = {
                            0: "clear skies",
                            1: "mostly clear",
                            2: "partly cloudy",
                            3: "overcast",
                            61: "light rain",
                            63: "moderate rain",
                            65: "heavy rain"
                        }.get(weather_code, "unknown conditions")
                        return f"Tomorrow's weather in Karbi Anglong: Max {temp_max}°C, Min {temp_min}°C, with {weather_desc}."
            return "No weather data available for tomorrow."
        else:
            logger.error(f"Weather API error: {response.status_code}, {response.text}")
            return "Tomorrow's weather in Karbi Anglong: Max 24°C, Min 19°C, with partly cloudy skies."  # Static data
    except Exception as e:
        logger.error(f"Error fetching weather: {e}")
        return "Tomorrow's weather in Karbi Anglong: Max 24°C, Min 19°C, with partly cloudy skies."  # Static data

# Function to call Gemini API
def call_gemini(user_input):
    try:
        chat_session = model.start_chat(history=[])
        response = chat_session.send_message(
            f"You are a friendly AI assistant on a phone call. The user said: '{user_input}'. Respond in a conversational, short, and friendly way."
        )
        return response.text
    except Exception as e:
        logger.error(f"Error calling Gemini: {e}")
        return "Oops, my brain’s on a break! Say something else!"

# Route for Twilio to handle the call
@app.route("/voice", methods=["POST"])
def voice():
    try:
        response = VoiceResponse()
        caller = request.form.get("From", "")
        logger.info(f"Processing /voice for caller: {caller}")
        response.say("Welcome to the IVR system! Press 1 for bank balance, 2 for government schemes, 3 for tomorrow's weather in Karbi Anglong, or 4 to chat with AI.", voice="Polly.Amy")
        gather = Gather(
            input="dtmf",
            num_digits=1,
            action=f"/handle-selection?caller={urllib.parse.quote(caller)}",
            timeout=5
        )
        response.append(gather)
        response.say("No input received. Goodbye!", voice="Polly.Amy")
        logger.info("Sent initial TwiML: %s", str(response))
        return Response(str(response), mimetype="application/xml")
    except Exception as e:
        logger.error(f"Error in /voice endpoint: {e}")
        response = VoiceResponse()
        response.say("An error occurred. Please try again later.", voice="Polly.Amy")
        return Response(str(response), mimetype="application/xml")

# Route to handle DTMF selection
@app.route("/handle-selection", methods=["POST"])
def handle_selection():
    try:
        selection = request.form.get("Digits", "")
        caller = request.args.get("caller", "")
        logger.info(f"Handling selection: {selection} for caller: {caller}")

        response = VoiceResponse()
        if not caller:
            logger.warning("No caller parameter provided")
            response.say("Error: Caller information missing. Goodbye!", voice="Polly.Amy")
            return Response(str(response), mimetype="application/xml")

        if selection == "1":
            balance = get_bank_balance(caller)
            response.say(balance, voice="Polly.Amy")
        elif selection == "2":
            schemes = get_government_schemes()
            response.say(schemes, voice="Polly.Amy")
        elif selection == "3":
            weather = get_weather_forecast()
            response.say(weather, voice="Polly.Amy")
        elif selection == "4":
            response.say("Alright, let's chat! Tell me something fun!", voice="Polly.Amy")
            gather = Gather(
                input="speech",
                action="/handle-speech",
                speech_timeout="auto",
                language="en-IN"
            )
            response.append(gather)
            response.say("I didn't hear you. Bye!", voice="Polly.Amy")
            logger.info("Sent TwiML for Gemini chat: %s", str(response))
            return Response(str(response), mimetype="application/xml")
        else:
            response.say("Invalid selection. Goodbye!", voice="Polly.Amy")

        # Return to main menu after each option (except Gemini chat)
        if selection in ["1", "2", "3"]:
            redirect_url = f"/voice?caller={urllib.parse.quote(caller)}"
            logger.info(f"Redirecting to: {redirect_url}")
            response.redirect(redirect_url)

        logger.info("Sent TwiML for selection: %s", str(response))
        return Response(str(response), mimetype="application/xml")
    except Exception as e:
        logger.error(f"Error in /handle-selection endpoint: {e}")
        response = VoiceResponse()
        response.say("An error occurred. Please try again later.", voice="Polly.Amy")
        return Response(str(response), mimetype="application/xml")

# Route to handle what the person said (for Gemini chat)
@app.route("/handle-speech", methods=["POST"])
def handle_speech():
    try:
        user_speech = request.form.get("SpeechResult", "")
        logger.info(f"User said: '{user_speech}'")
        if user_speech:
            gemini_response = call_gemini(user_speech)
            logger.info(f"Gemini responded: '{gemini_response}'")
            twiml_response = VoiceResponse()
            twiml_response.say(gemini_response, voice="Polly.Amy")
            gather = Gather(
                input="speech",
                action="/handle-speech",
                speech_timeout="auto",
                language="en-IN"
            )
            twiml_response.append(gather)
            logger.info("Sent TwiML with Gather: %s", str(twiml_response))
        else:
            twiml_response = VoiceResponse()
            twiml_response.say("I didn't hear you. Bye!", voice="Polly.Amy")
            twiml_response.hangup()
            logger.info("No speech detected, hanging up: %s", str(twiml_response))
        return Response(str(twiml_response), mimetype="application/xml")
    except Exception as e:
        logger.error(f"Error in /handle-speech endpoint: {e}")
        response = VoiceResponse()
        response.say("An error occurred. Please try again later.", voice="Polly.Amy")
        return Response(str(response), mimetype="application/xml")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)