**AI-Powered Mock Interview Assistant**

📌 **Objective**

The AI-Powered Mock Interview Assistant is designed to help candidates prepare for interviews by simulating realistic interview scenarios. It evaluates not only the correctness of the answers but also communication style, delivery, and confidence through advanced AI features.

The platform provides real-time transcription, analysis, and feedback using a combination of Spring Boot backend, AI/ML models, and voice processing services.

**⚙️ Working Pipeline**
**1. User Interaction**

User selects a role (e.g., Java Developer, DevOps Engineer) and the skills they want to be tested on.

The system generates AI-driven interview questions via Gemini API.

User answers the question via voice + camera feed.

**2. Speech Processing Layer**

The speech-service (Flask + Vosk) listens on http://127.0.0.1:5001.

It accepts audio via /transcribe endpoint.

Converts audio → text transcription.

Returns transcription to Spring Boot backend.

**3. Backend Processing (Spring Boot)**

The transcription and question are sent to the Gemini API.

AI generates feedback (~500 characters) evaluating:

Technical accuracy

Clarity of communication

Confidence in explanation

**4. Feedback Delivery**

Spring Boot returns the structured feedback to the frontend.

Feedback includes:

Correctness of answer

Suggestions for improvement

Optional rating/score

**🔒 Security Implemented**

Spring Boot Security (JWT-based auth planned for future).

CORS restrictions applied so only trusted frontend URLs can connect.

Rate-limiting (to be added) to prevent API abuse.

Data isolation → Each user session is stored separately.

Secure API keys (Gemini, future AI APIs) stored in environment variables, not hardcoded.

**🚀 Current Implementation**

✅ Spring Boot backend with REST APIs.

✅ Flask + Vosk-based speech transcription service running locally.

✅ Integration with Gemini API for question generation + answer feedback.

✅ Feedback endpoint (/feedback) generating structured evaluation.

✅ Local-only testing (safe for MVP).

**🔮 Future Enhancements
🎤 Voice & Tone Analysis**

Detect confidence, nervousness, hesitation from user voice.

Identify speech speed, clarity, filler words (“um”, “uh”, etc.).

**🙂 Facial Expression Analysis**

Real-time camera feed analysis to detect:

Eye contact

Confidence levels

Nervous tics

Smiling / frowning patterns

**❤️ Sentiment Analysis**

Evaluate positivity/negativity of communication.

Detect if the candidate sounds enthusiastic, neutral, or disinterested.

**📊 Scoring & Reporting**

Overall interview performance score.

Strength vs Weakness summary.

Export results as PDF/Excel.
**
☁️ Deployment & Scalability**

Containerized using Docker + Kubernetes.

CI/CD pipelines with DevSecOps security checks.

Scalable architecture with microservices:

interview-service (Spring Boot backend)

speech-service (Flask + Vosk)

ai-service (Gemini, ML models, future tone/facial analyzers)

**📦 Tech Stack**

Backend → Spring Boot (Java)

Security -> Spring Security(OAuth2)

Speech Service → Flask + Vosk

AI Integration → Gemini API

Database → MySQL (planned for storing sessions/results)

Frontend → React + Tailwind

Deployment → Docker + Kubernetes (planned)

**🛠️ How to Run**

**Start Speech Service**

cd speech-service
python vosk_server.py


**Run Spring Boot Backend**

cd backend
mvn spring-boot:run


**Test Endpoints**

**POST /feedback → Input: { question, userAnswer } → Output: AI-generated feedback.

POST /transcribe (Flask) → Input: audio file → Output: transcription.**

**🌟 Vision**

This project aims to become a personal AI Interview Coach – providing technical + behavioral feedback like a real interviewer, but available anytime, anywhere.
