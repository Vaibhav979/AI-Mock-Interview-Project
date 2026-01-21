# ⚖️ tradeoffs.md — AI-Powered Mock Interview Platform

## 1. What “Trade-offs” Mean in This System

Every architectural decision in this system intentionally favors simplicity, clarity, and correctness over scale or performance.

The goal of this project is not to build a highly optimized AI platform, but to demonstrate how a backend system responsibly integrates AI services into real application workflows.

## 2. Using External AI Services Instead of Custom Models

### Decision

Use managed AI services (Gemini, Hume AI, Vosk) rather than training or hosting models.

### Benefits

- Faster development
- No model training or infrastructure overhead
- Access to state-of-the-art AI capabilities
- Backend remains focused on orchestration and control

### Costs

- Dependency on third-party availability
- API rate limits
- Network latency
- Less control over model internals

### Trade-off

Development speed and simplicity vs control and availability

## 3. Treating AI as a Dependency, Not Core Logic

### Decision

AI services are called from the service layer and treated like external APIs.

### Benefits

- Clear separation of responsibilities
- Backend controls prompt structure and output format
- Easier to replace or upgrade AI providers

### Costs

- AI behavior must be carefully constrained
- Output requires sanitization and normalization

### Trade-off

Backend control vs reliance on external behavior

## 4. Synchronous AI Calls

### Decision

All AI API calls are synchronous.

### Benefits

- Simpler request flow
- Easier debugging and reasoning
- No concurrency or async complexity

### Costs

- Increased request latency
- Thread blocking under load
- Reduced throughput

### Trade-off

Implementation simplicity vs performance and scalability

## 5. Ephemeral Interview State

### Decision

Interview questions, answers, and feedback are not persisted.

### Benefits

- Minimal database usage
- Reduced complexity
- No long-term storage concerns for AI output

### Costs

- No interview history
- No analytics or progress tracking

### Trade-off

Simplicity vs long-term user insights

## 6. Session-Based Authentication

### Decision

Use OAuth2 with server-side session management.

### Benefits

- Simple authentication flow
- No token lifecycle management in the client
- Easy integration with Spring Security

### Costs

- Stateful backend
- Harder horizontal scaling
- Session affinity may be required

### Trade-off

Ease of implementation vs scalability

## 7. Separate Speech Recognition Service

### Decision

Run speech-to-text as a separate Flask service using Vosk.

### Benefits

- CPU-intensive processing isolated from main backend
- Keeps Spring Boot app lightweight
- Clear separation of concerns

### Costs

- Additional service to manage
- Network overhead
- Deployment complexity

### Trade-off

Modularity and isolation vs operational complexity

## 8. Minimal Resilience Mechanisms

### Decision

No retries, circuit breakers, or fallback logic.

### Benefits

- Clear failure behavior
- Easier debugging
- Less infrastructure overhead

### Costs

- External API failures directly impact users
- No graceful degradation

### Trade-off

Clarity and simplicity vs fault tolerance

## 9. Limited Validation and Rate Control

### Decision

Basic request validation, no rate limiting.

### Benefits

- Faster development
- Simpler APIs

### Costs

- Risk of abuse
- Potential memory or CPU exhaustion
- No protection against burst traffic

### Trade-off

Speed of development vs robustness

## 10. Summary

This system intentionally prioritizes:

- Backend clarity
- Explicit request orchestration
- Responsible AI integration
- Understandable failure modes

At the cost of:

- Performance under high load
- Resilience to external failures
- Long-term scalability
