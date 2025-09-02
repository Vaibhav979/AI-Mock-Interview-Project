package com.project.MockInterview.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.project.MockInterview.Service.GeminiService;
import com.project.MockInterview.Service.HumeService;
import com.project.MockInterview.model.FeedbackRequest;
import com.project.MockInterview.model.QuestionRequest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@CrossOrigin("http://localhost:5173/")
public class MockInterviewController {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private HumeService humeService;

    @PostMapping("/generate-questions")
    public ResponseEntity<Map<String, List<String>>> generateQuestion(@RequestBody QuestionRequest req) {
        String prompt = String.format(
                "Act as a technical interviewer. Generate 5 concise mock interview questions for the role of '%s' with skills: %s. "
                        +
                        "Respond ONLY with a raw JSON array like this: [\"Q1\", \"Q2\", \"Q3\"]. No explanation, no markdown, no extra text.",
                req.role, req.skills);

        String geminiResponse = geminiService.callGemini(prompt);
        List<String> extractedQuestions = extractQuestions(geminiResponse);

        Map<String, List<String>> response = new HashMap<>();
        response.put("questions", extractedQuestions);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/feedback")
    public String giveFeedback(@RequestBody FeedbackRequest req) {

        String promptTemplate = "You're a mock interview evaluator. Analyze the following:\n\n" +
                "Question: %s\n" +
                "Answer: %s\n\n" +
                "Give a clear and concise evaluation of the answer in plain English in 500 characters. Talk directly to the user using 'you'. No headings, no formatting, no markdown, no quotes. Just write as if you're giving honest helpful feedback.";

        String finalPrompt = String.format(promptTemplate, req.question, req.userAnswer);

        String rawResponse = geminiService.callGemini(finalPrompt);
        String cleanedResponse = rawResponse
                .replaceAll("\\*\\*", "") // remove all asterisks
                .replaceAll("\"", "") // remove double quotes
                .replaceAll("’", "'") // normalize apostrophes
                .replaceAll("\\s*\\n\\s*", " ") // collapse newlines into spaces
                .replaceAll("\\s{2,}", " ") // remove extra spaces
                .trim();
        return cleanedResponse;
    }

    @PostMapping(value = "/speak", produces = "audio/mpeg")
    public ResponseEntity<byte[]> speak(@RequestBody Map<String, String> request) {
        String text = request.get("text");
        String cleanedText = sanitizeTextForTTS(text);
        byte[] audioBytes = humeService.callHumeTTS(cleanedText);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf("audio/mpeg"));
        headers.setContentDispositionFormData("inline", "speech.mp3");

        return new ResponseEntity<>(audioBytes, headers, HttpStatus.OK);

    }

    private String sanitizeTextForTTS(String input) {
        return input.replaceAll("[`*~_]", "").replaceAll("\"", "");
    }

    public List<String> extractBulletPoints(String text, String sectionTitle) {
        List<String> results = new ArrayList<>();
        Pattern pattern = Pattern.compile("\\*\\*" + sectionTitle + ":\\*\\*\\s*(.*?)\\n\\n", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            String sectionText = matcher.group(1).trim();
            Matcher bulletMatcher = Pattern.compile("\\*\\s+(.*?)\\n").matcher(sectionText + "\n");
            while (bulletMatcher.find()) {
                results.add(bulletMatcher.group(1).trim());
            }
        }
        return results;
    }

    private List<String> extractQuestions(String response) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Remove Markdown block formatting if present (```)
            response = response.replaceAll("```json", "").replaceAll("```", "").trim();

            return mapper.readValue(response, new TypeReference<List<String>>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
            return List.of("Failed to extract questions from response.");
        }
    }
}
