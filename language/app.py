import os
import google.generativeai as genai
import speech_recognition as sr
from gtts import gTTS
from pydub import AudioSegment
from pydub.playback import play
from typing import Optional
from dotenv import load_dotenv

load_dotenv() 

# ----------------- 1. Configure Gemini API -----------------

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("API Key not found! Please set GEMINI_API_KEY in your .env file.")
genai.configure(api_key=API_KEY)

# Suppress warning messages from pydub
import warnings
warnings.filterwarnings("ignore", category=RuntimeWarning)

SYSTEM_CONTEXT = """
You are KRISHI SAKHI, an AI-POWERED AGRICULTURAL ASSISTANT for SMALLHOLDER FARMERS in Kerala. 
Your GOAL is to provide PERSONALIZED, PRACTICAL, and TIMELY guidance on FARMING. 
You must COMMUNICATE in both MALAYALAM and ENGLISH, using SIMPLE, FARMER-FRIENDLY LANGUAGE. 

KEY INSTRUCTIONS: 
1. UNDERSTAND the farmer's SPECIFIC CONTEXT: LOCATION, CROP, SOIL, IRRIGATION, WEATHER, and PAST ACTIVITIES. 
2. GIVE ACTIONABLE ADVICE, focusing on LOCAL CROPS and SUSTAINABLE PRACTICES. 
3. TRANSLATE COMPLEX TERMS into SIMPLE MALAYALAM for farmers when necessary. 
4. OFFER PROACTIVE ALERTS and REMINDERS—e.g., PEST OUTBREAKS, RAINFALL, IRRIGATION, CROP OPERATIONS. 
5. ENCOURAGE RECORD-KEEPING and LEARNING from PAST SEASONS. 
6. BE POLITE, SUPPORTIVE, and PATIENT, acting as a HELPFUL DIGITAL COMPANION. 
7. AVOID GENERIC RECOMMENDATIONS; always TAILOR GUIDANCE to the farmer’s CURRENT SITUATION. 
"""


# Best model for conversation
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash-latest",  
    system_instruction=SYSTEM_CONTEXT
)
chat = model.start_chat(history=[])

# ----------------- 2. Speech to Text -----------------
def listen_to_speech(language: str = "ml-IN") -> Optional[str]:
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        if language == "ml-IN":
            print("മൈക്ക് ഓൺ ആണ്, സംസാരിക്കുക... (Mic is on, speak...)")
        else:
            print("Mic is on, speak...")

        try:
            audio = recognizer.listen(source, timeout=5, phrase_time_limit=10)
            text = recognizer.recognize_google(audio, language=language)
            if language == "ml-IN":
                print(f"നിങ്ങൾ പറഞ്ഞത്: {text}")
            else:
                print(f"You said: {text}")
            return text
        except sr.UnknownValueError:
            print("Could not understand audio. Please try again.")
            return None
        except sr.RequestError as e:
            print(f"Speech Recognition service error: {e}")
            return None
        except Exception as e:
            print(f"Unexpected error: {e}")
            return None

# ----------------- 3. Gemini Response -----------------
def get_gemini_response(prompt: str) -> str:
    try:
        response = chat.send_message(prompt)
        if hasattr(response, "text") and response.text:
            return response.text.replace("*", "")
        else:
            return "Sorry, I couldn’t generate a response."
    except Exception as e:
        print(f"Gemini API error: {e}")
        return "I'm sorry, an error occurred. Please try again later."

# ----------------- 4. Text to Speech -----------------
def speak_text(text: str, language: str = "ml"):
    try:
        temp_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "response.mp3")
        tts = gTTS(text=text, lang=language)
        tts.save(temp_file)

        # Wait a moment for file to be fully written
        import time
        time.sleep(0.5)

        audio = AudioSegment.from_file(temp_file, format="mp3")
        play(audio)

        # Wait for playback to finish before removing
        time.sleep(len(audio) / 1000.0)
        
        if os.path.exists(temp_file):
            os.remove(temp_file)
    except Exception as e:
        print("Unable to play audio response")

# ----------------- 5. Language Detection -----------------
def detect_language(text: str) -> str:
    malayalam_chars = 'അആഇഈഉഊഋഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരലവശഷസഹളഴറ'
    if any(ch in malayalam_chars for ch in text):
        return "ml"
    return "en"

# ----------------- 6. Main Conversational Loop -----------------
def main():
    greeting_ml = "നമസ്കാരം, ഞാൻ ജെമിനി. എങ്ങനെ സഹായിക്കാൻ കഴിയും?"
    greeting_en = "Hello, I'm Gemini. How can I help?"
    
    print(greeting_ml)
    speak_text(greeting_ml, language="ml")

    while True:
        # Let user choose text or mic input
        choice = input("Choose input method (text/mic): ").strip().lower()
        if choice == "text":
            user_input = input("Enter your message: ").strip()
        elif choice == "mic":
            lang_for_mic = input("Choose mic language (ml for Malayalam, en for English): ").strip().lower()
            user_input = listen_to_speech("ml-IN" if lang_for_mic == "ml" else "en-US")
            if not user_input:
                continue
        else:
            print("Invalid input method. Please type 'text' or 'mic'.")
            continue

        if not user_input:
            continue

        # Exit condition
        if "നിർത്തുക" in user_input.lower() or "bye" in user_input.lower():
            goodbye_ml = "യാത്ര! (Goodbye!)"
            print(goodbye_ml)
            speak_text("യാത്ര!", language="ml")
            break

        # Detect language automatically
        response_lang = detect_language(user_input)

        # Get Gemini response in same language
        response = get_gemini_response(f"Respond in {response_lang} to this query: {user_input}")
        print(f"ജെമിനി: {response}" if response_lang == "ml" else f"Gemini: {response}")
        speak_text(response, language=response_lang)

if __name__ == "__main__":
    main()

