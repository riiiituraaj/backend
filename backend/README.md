# Achum's Chatbot Backend

This is a Node.js backend server that integrates with Google's Gemini AI to provide mood-based chatbot responses for Achum's website.

## Features

- Express.js server with API endpoints for chatbot functionality
- Integration with Google's Gemini AI for intelligent responses
- Mood-specific chatbot handlers (HAPPY, SAD, ANGRY)
- Fallback responses when API is unavailable

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

3. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey) and add it to your `.env` file.

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### General Message Endpoint

```
POST /api/chatbot/message
```

Request body:
```json
{
  "message": "Hello, how are you?",
  "mood": "happy" // or "sad" or "angry"
}
```

Response:
```json
{
  "response": "HIEEEE ACHUMMM!!! I'M DOING AMAZING!! HOW ARE YOUUU?? 😭🙏"
}
```

### Mood-Specific Endpoints

```
POST /api/chatbot/happy
POST /api/chatbot/sad
POST /api/chatbot/angry
```

Request body:
```json
{
  "message": "Hello, how are you?"
}
```

Response format is the same as the general endpoint.

## Error Handling

The API includes error handling for:
- Missing API key
- Invalid requests
- API failures

When the Gemini API is unavailable, the system falls back to pre-defined responses that match the requested mood.