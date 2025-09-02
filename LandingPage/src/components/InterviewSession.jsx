import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const InterviewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || [];

  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // 🔹 Utility to write strings into DataView
  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // 🔹 Encode PCM into WAV
  const encodeWAV = (audioBuffer) => {
    const buffer = new ArrayBuffer(44 + audioBuffer.length * 2);
    const view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, "RIFF");
    /* RIFF chunk length */
    view.setUint32(4, 36 + audioBuffer.length * 2, true);
    /* RIFF type */
    writeString(view, 8, "WAVE");
    /* format chunk identifier */
    writeString(view, 12, "fmt ");
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, 1, true);
    /* sample rate */
    view.setUint32(24, 16000, true); // 16kHz for Vosk
    /* byte rate (sample rate * block align) */
    view.setUint32(28, 16000 * 2, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, "data");
    /* data chunk length */
    view.setUint32(40, audioBuffer.length * 2, true);

    // PCM samples
    let offset = 44;
    for (let i = 0; i < audioBuffer.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, audioBuffer[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }

    return new Blob([view], { type: "audio/wav" });
  };

  // 🎤 Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        try {
          // Browser records as WebM/Opus
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          const arrayBuffer = await audioBlob.arrayBuffer();

          // Decode to PCM
          const audioCtx = new AudioContext({ sampleRate: 16000 });
          const decoded = await audioCtx.decodeAudioData(arrayBuffer);

          // Convert PCM → WAV (mono 16kHz)
          const wavBlob = encodeWAV(decoded.getChannelData(0));

          // Send to Flask
          const formData = new FormData();
          formData.append("file", wavBlob, "answer.wav");

          const res = await axios.post(
            "http://127.0.0.1:5001/transcribe",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          setTranscript(res.data.text || "");
        } catch (err) {
          console.error("Error sending audio:", err);
          alert("Failed to process speech. Try again.");
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Microphone access is required. Please allow it.");
    }
  };

  // ⏹ Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // 📤 Submit transcript to feedback API (Spring Boot)
  const handleSubmitAnswer = async () => {
    if (!transcript.trim()) {
      alert("Please record your answer first.");
      return;
    }

    setIsLoading(true);
    setFeedback("");

    try {
      const response = await axios.post("http://localhost:8080/feedback", {
        question: questions[currentIndex],
        userAnswer: transcript,
      });

      setFeedback(response.data || "No feedback received.");
    } catch (err) {
      console.error("Error submitting answer:", err);
      alert("Error evaluating your answer. Please try again.");
    }

    setIsLoading(false);
  };

  // ⏭ Next question
  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      navigate("/dashboard");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setTranscript("");
      setFeedback("");
    }
  };

  // 🛑 No questions found
  if (questions.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">No questions found</h2>
        <p className="mt-2">Please go back and start the mock interview.</p>
        <button
          onClick={() => navigate("/start-mock-interview")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl shadow-md ">
      <h2 className="text-3xl font-bold mb-4">🎤 Mock Interview</h2>
      <h3 className="text-lg font-medium mb-2">
        Question {currentIndex + 1} of {questions.length}
      </h3>
      <p className="mb-4">{questions[currentIndex]}</p>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
          >
            🎙 Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
          >
            ⏹ Stop Recording
          </button>
        )}

        {transcript && (
          <button
            onClick={handleSubmitAnswer}
            className="bg-purple-600 hover:bg-purple-700  px-4 py-2 rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? "⏳ Evaluating..." : "✅ Submit Answer"}
          </button>
        )}
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="mt-6 bg-gray-500 p-4 rounded-xl">
          <h4 className="font-semibold">📝 Your Answer:</h4>
          <p className="mt-2">{transcript}</p>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className="mt-6 bg-gray-500 p-4 rounded-xl">
          <h4 className="font-semibold">💡 Feedback:</h4>
          <p className="mt-2">{feedback}</p>
          <button
            onClick={handleNext}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            ⏭ Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewSession;
