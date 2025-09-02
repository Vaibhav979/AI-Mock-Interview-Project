from flask import Flask, request, jsonify
from flask_cors import CORS
from vosk import Model, KaldiRecognizer
import wave
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


# Load the Vosk model (make sure path is correct)
model_path = "vosk-model-small-en-us-0.15"
if not os.path.exists(model_path):
    raise FileNotFoundError("Please download the Vosk model and put it in the speech-service folder.")

model = Model(model_path)

@app.route("/transcribe", methods=["POST"])
def speech_to_text():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    wf = wave.open(file, "rb")

    if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getcomptype() != "NONE":
        return jsonify({"error": "Audio file must be WAV format, mono PCM."}), 400

    rec = KaldiRecognizer(model, wf.getframerate())
    text_result = ""

    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            result = json.loads(rec.Result())
            text_result += result.get("text", "") + " "

    final_result = json.loads(rec.FinalResult())
    text_result += final_result.get("text", "")
    print({"Transcribed: ",text_result})

    return jsonify({"text": text_result.strip()})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
