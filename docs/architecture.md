# 📐 Architecture — AI-Powered Mock Interview Platform

## 1. System Overview

The AI-Powered Mock Interview Platform is a backend-driven application that simulates technical interviews by integrating multiple external AI services into a single workflow.

The system is responsible for:

- User authentication
- Request orchestration
- Prompt construction and sanitization
- Managing interactions with AI services (LLM, TTS, STT)
- Returning normalized responses to the frontend

The backend is built using Spring Boot and acts as the central coordinator, while AI capabilities are provided by external services.

## 2. High-Level Architecture

[ React Frontend ]
|
| HTTP / JSON
v
[ Spring Boot Backend ]
|
| Controllers
v
[ Application Layer ]
(Auth, Interview APIs)
|
| Service Layer
v
[ AI Orchestration Services ]
|
+--> Gemini API (Question Generation, Feedback)
|
+--> Hume AI (Text-to-Speech)
|
+--> Speech Service (Vosk, Flask)
|
v
[ MySQL Database ]
(User Data)

## 3. Architectural Style

The system follows a layered backend architecture with external AI services treated as dependencies, similar to third-party APIs (e.g., payment or email services).

Key characteristics:

- Backend-centric orchestration
- Clear separation of responsibilities
- AI logic isolated from core application logic
- Minimal persistent state

This design keeps the backend in control of data flow and system behavior.

## 4. Core Components

### 4.1 Frontend (Client)

- Built with React
- Handles UI, audio recording, and user interaction
- Communicates only with the Spring Boot backend
- Does not call AI services directly

### 4.2 Backend API Layer

#### Spring Boot REST Controllers

Responsibilities:

- Expose REST endpoints for authentication and interview actions
- Validate incoming requests
- Coordinate service calls
- Return normalized responses

Examples:

- Authentication endpoints
- Question generation
- Feedback generation
- Text-to-speech requests

Controllers contain no AI logic.

### 4.3 Service Layer (AI Orchestration)

The service layer is the core of the system.

Responsibilities:

- Construct prompts dynamically based on user input
- Call external AI services
- Handle latency and failures
- Sanitize and normalize AI responses before returning them

Key services:

- GeminiService – calls Gemini API for question generation and feedback
- HumeService – converts text responses into speech
- Speech Service Client – delegates speech recognition to a separate service

AI output is treated as untrusted input and post-processed before use.

### 4.4 External AI Services

#### Gemini API

- Used for:
  - Interview question generation
  - Feedback analysis
- Receives structured prompts
- Returns generated text

#### Hume AI

- Used for text-to-speech
- Converts feedback or questions into audio

#### Speech Recognition Service (Vosk)

- Runs as a separate Flask application
- Handles CPU-intensive speech-to-text processing
- Keeps audio processing decoupled from the main backend

### 4.5 Persistence Layer

#### MySQL Database

Stores:

- User identity data (email, name, profile image)

The system does not persist interview sessions or AI responses.
Interview interactions are ephemeral.

## 5. Authentication & State Management

- Authentication is handled using Google OAuth2
- ID tokens are verified on the backend
- Auth state is maintained using HttpSession

State characteristics:

- Backend services are stateless
- Authentication introduces limited server-side state
- AI interactions are fully stateless

This design prioritizes simplicity and clarity.

## 6. Request Flow Summary

### Generate Interview Questions

Frontend
→ Backend Controller
→ Prompt Construction
→ Gemini API
→ Response Sanitization
→ Frontend

### Generate Feedback

Frontend
→ Backend Controller
→ Prompt Construction
→ Gemini API
→ Output Normalization
→ Frontend

### Text-to-Speech

Frontend
→ Backend Controller
→ Hume AI API
→ Audio Stream
→ Frontend

### Speech-to-Text

Frontend
→ Speech Service (Vosk)
→ Transcription
→ Backend / Frontend

## 7. Scalability & Limitations

Current limitations:

- External AI APIs introduce latency and rate limits
- Synchronous calls block request threads
- Speech recognition is CPU-bound
- No caching or async processing

## 8. Summary

This system demonstrates how a backend application can:

- Integrate multiple AI services responsibly
- Control AI behavior through prompt construction and sanitization
- Manage authentication, state, and request flow
- Treat AI as a dependency rather than core logic

The focus is on backend orchestration and system reasoning, not AI model development.
