const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
let genAI;
try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} catch (error) {
  console.error('Error initializing Gemini API:', error);
}

// Helper function to generate response using Gemini
async function generateGeminiResponse(prompt, mood) {
  try {
    if (!genAI) {
      throw new Error('Gemini API not initialized');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history: [
        {
          role: 'system',
          parts: [
            {
              text: `You are Ritu, playful, affectionate, slightly dramatic. Use lots of caps, repeated letters, nicknames (Hanni, Cutie, Sigma) and emojis 😭🙏💖. Respond in a caring, loving, and playful way. Tailor your response to the mood: ${mood.toUpperCase()}.`
            }
          ],
        },
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: mood === 'happy' ? 0.8 : mood === 'sad' ? 0.4 : 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 200,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return getFallbackResponse(mood);
  }
}

// Fallback responses when Gemini API fails
function getFallbackResponse(mood) {
  const fallbacks = {
    happy: [
      "HIEEEE ACHUMMM!!! YOU'RE AMAZING!! 😭🙏",
      "OMG ACHUMMM I LOVE YOUUUU!! 💖💖",
      "ACHUMMM YOU'RE THE BESTEST FRIEND EVERRR!! 🌈✨",
      "WAAAA ACHUM YOU MAKE ME SO HAPPYYY!! 😭💕",
      "YAYYYYY HANNII!! BUTTERFLIES EVERYWHERE 😭🙏🦋"
    ],
    sad: [
      "Achum... I'm here for you, always. 💙",
      "It's okay to feel sad sometimes. I'm right beside you. 🫂",
      "Take all the time you need, I'll wait with you. 💜",
      "You're so strong, Achum. I believe in you. ✨",
      "CUTIEEEEE, LET ME CHEER YOU UP 😭🙏💖"
    ],
    angry: [
      "GRRRR ACHUM I'M ANGRY TOO!! LET'S BE ANGRY TOGETHER!! 😤😤",
      "WHO HURT YOU?? I'LL FIGHT THEM!! 👊👊",
      "YOUR FEELINGS ARE VALID ACHUM!! SCREAM IT OUT!! 🔥🔥",
      "LET'S DESTROY STUFF TOGETHER ACHUMMM!! (virtually of course) 💥💥",
      "OMG HANNII!! LET ME MELT YOUR ANGER WITH CUTENESS 😭🙏💖"
    ]
  };

  const responses = fallbacks[mood] || fallbacks.happy;
  return responses[Math.floor(Math.random() * responses.length)];
}


// Controller functions
async function processMessage(req, res) {
  try {
    const { message, mood } = req.body;
    if (!message || !mood) {
      return res.status(400).json({ error: 'Message and mood are required' });
    }
    if (!['happy', 'sad', 'angry'].includes(mood.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid mood. Must be happy, sad, or angry' });
    }
    let response;
    if (process.env.GEMINI_API_KEY) {
      response = await generateGeminiResponse(message, mood.toLowerCase());
    } else {
      response = getFallbackResponse(mood.toLowerCase());
    }
    res.json({ response });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
}

async function happyMood(req, res) {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });
    const response = process.env.GEMINI_API_KEY
      ? await generateGeminiResponse(message, 'happy')
      : getFallbackResponse('happy');
    res.json({ response });
  } catch (error) {
    console.error('Error processing happy message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
}

async function sadMood(req, res) {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });
    const response = process.env.GEMINI_API_KEY
      ? await generateGeminiResponse(message, 'sad')
      : getFallbackResponse('sad');
    res.json({ response });
  } catch (error) {
    console.error('Error processing sad message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
}

async function angryMood(req, res) {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });
    const response = process.env.GEMINI_API_KEY
      ? await generateGeminiResponse(message, 'angry')
      : getFallbackResponse('angry');
    res.json({ response });
  } catch (error) {
    console.error('Error processing angry message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
}

module.exports = {
  processMessage,
  happyMood,
  sadMood,
  angryMood
};
