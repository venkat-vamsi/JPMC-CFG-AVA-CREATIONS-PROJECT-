import requests
import time
from twilio.rest import Client
from datetime import datetime, timedelta

# ========== CONFIGURATION ==========
EXOTEL_SID = "voiceaiagent1"
EXOTEL_API_KEY = "755db22d56b6953e96e7346d74f1de494e881f177fbd1a5a"  
EXOTEL_API_TOKEN = "576ffdaeb3bc5ccc4ac7413409b5265dd0af73c817674414" 
EXOPHONE = "04045210864"

# Poll only last 5 minutes of logs
LOOKBACK_MINUTES = 1
POLL_INTERVAL_SECONDS = 5

# Twilio settings
TWILIO_SID = "ACf2dfeaba2cb9f97201e17959c5ab9e92"
TWILIO_AUTH_TOKEN = "01e559b16c9336aaf164e491c18fca0f"
TWILIO_FROM = "+16814333258"

TWIML_URL = "https://5432-167-103-2-95.ngrok-free.app/voice"

client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)

# ========== HELPER ==========
def get_recent_calls():
    url = f"https://api.exotel.com/v1/Accounts/{EXOTEL_SID}/Calls.json"
    time_from = (datetime.utcnow() - timedelta(minutes=LOOKBACK_MINUTES)).strftime("%Y-%m-%d %H:%M:%S")
    params = {
        "From": "",  # all numbers
        "Direction": "inbound",
        "StartTimeGreaterThan": time_from
    }
    response = requests.get(
        url,
        params=params,
        auth=(EXOTEL_API_KEY, EXOTEL_API_TOKEN)
    )
    if response.status_code == 200:
        return response.json().get("Calls", [])
    else:
        print("Error fetching Exotel logs:", response.status_code, response.text)
        return []

def make_call(to_number):
    print(f"📞 Calling {to_number} via Twilio...")
    call = client.calls.create(
        url=TWIML_URL,
        to=to_number,
        from_=TWILIO_FROM
    )
    print("✅ Call initiated:", call.sid)

# ========== MAIN LOOP ==========
seen_calls = set()

print("🔁 Watching for missed calls...")
while True:
    calls = get_recent_calls()
    for call in calls:
        from_number = call.get("From")
        sid = call.get("Sid")

        if sid and sid not in seen_calls:
            seen_calls.add(sid)
            print(f"📲 Missed call from {from_number}")
            formatted_number = from_number
            if formatted_number.startswith("0"):
                formatted_number = "+91" + formatted_number[1:]
            elif not formatted_number.startswith("+"):
                formatted_number = "+91" + formatted_number

            make_call(formatted_number)


    time.sleep(POLL_INTERVAL_SECONDS)
