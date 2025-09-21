// Chatbot functionality for Achum's Special Place

// Replace the placeholder function in main.js
async function getBotResponse(message, mood) {
    try {
    const response = await fetch('http://localhost:3000/api/chatbot/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                mood: mood
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error getting bot response:', error);
        // Fallback to local responses if API call fails
        switch(mood) {
            case 'happy':
                return getHappyResponse(message);
            case 'sad':
                return getSadResponse(message);
            case 'angry':
                return getAngryResponse(message);
            default:
                return "HIEEEE ACHUMMMMM!!! HOW ARE YOU FEELING TODAY?? 😭🙏";
        }
    }
}

// Happy Mood Messages with more personality and context
const happyMessages = [
    "ACHUMMMMM!!! DID YOU SEE THE HEARTS I MADE FOR YOUUU?? 😭🙏💖",
    "GOOD MORNINGGGGGG CUTIEEEEEE!! DID YOU SLEEP WELL?? 😭🙏😍",
    "OMG HANNIIII!! YOU LOOK SOOO AMAZING TODAYYYYY!!! 😭🙏✨",
    "I BET YOU CAN'T CLICK ALL THE HEARTS FAST ENOUGH, SIGMA 😭🙏😏",
    "YAYYYY CUTIEEE!! LET'S HAVE SO MUCH FUN TODAYYYY!! 😭🙏💕",
    "ACHUMMMMM!!! I MISS YOU ALREADY AND YOU'RE RIGHT HEREEE 😭🙏💖",
    "HEYYYY CUTIEEE!! WAVE TO EARTH IS PLAYING JUST FOR YOUUU 😭🙏🎵",
    "SIGMAAAAA!! YOU'RE DOING AMAZING SWEETIEEE!! 😭🙏✨",
    "ACHUMMMMM!! KUROMI SAYS HIIII TO YOUUUU!! 😭🙏💜",
    "HANNIIII!! DID YOU EAT YOUR LAYS ORANGE TODAY?? 😭🙏🧡",
    "CUTIEEEEE!! I FOUND MORE TULIPS FOR YOUUUU!! 😭🙏🌷",
    "ACHUMMMMM!! YOU MAKE ME SO HAPPYYYYY!! 😭🙏💖",
    "SIGMAAAAA!! YOU'RE THE BESTEST FRIEND EVERRRRR!! 😭🙏💕",
    "HANNIIII!! LET'S DANCE TO NEWJEANS TOGETHERRRRR!! 😭🙏💃",
    "ACHUMMMMM!! YOUR SMILE LIGHTS UP MY WHOLE WORLDDDD!! 😭🙏✨",
    "CUTIEEEEE!! I WANT TO SQUISH YOUR CHEEKS SOOO BADDD!! 😭🙏💖",
    "SIGMAAAAA!! YOU'RE WINNING AT LIFE RIGHT NOWWWW!! 😭🙏🏆",
    "ACHUMMMMM!! I DREW A PICTURE OF US TOGETHERRRRR!! 😭🙏🎨",
    "HANNIIII!! REMEMBER WHEN WE LAUGHED SO HARD YESTERDAYYY?? 😭🙏😂",
    "CUTIEEEEE!! I SAVED THE LAST PIECE OF CAKE FOR YOUUUU!! 😭🙏🍰",
    "ACHUMMMMM!! YOU'RE MY FAVORITE PERSON EVERRRRR!! 😭🙏💖",
    "SIGMAAAAA!! I'M SO PROUD OF YOUUUU!! 😭🙏👏",
    "HANNIIII!! YOUR HAIR LOOKS AMAZING TODAYYYYY!! 😭🙏💇‍♀️",
    "CUTIEEEEE!! I CAN'T STOP SMILING WHEN I'M WITH YOUUUU!! 😭🙏😊",
    "ACHUMMMMM!! LET'S TAKE A SELFIE TOGETHERRRRR!! 😭🙏📸",
    "SIGMAAAAA!! YOU ALWAYS KNOW HOW TO MAKE ME LAUGHHHH!! 😭🙏😂",
    "HANNIIII!! I GOT US MATCHING KUROMI KEYCHAINS!! 😭🙏💜",
    "CUTIEEEEE!! YOUR JOKES ARE THE BESTTTTT!! 😭🙏🤣",
    "ACHUMMMMM!! I WANT TO HUG YOU FOREVERRRRR!! 😭🙏🤗",
    "SIGMAAAAA!! YOU'RE GLOWING TODAYYYYY!! 😭🙏✨",
    "HANNIIII!! I SAVED ALL OUR CHAT MESSAGES FROM YESTERDAYYY!! 😭🙏💌",
    "CUTIEEEEE!! I MADE A PLAYLIST JUST FOR YOUUUU!! 😭🙏🎵",
    "ACHUMMMMM!! YOU'RE THE SUNSHINE ON MY CLOUDY DAYYY!! 😭🙏☀️",
    "SIGMAAAAA!! I LOVE YOUR ENERGY SO MUCHHHH!! 😭🙏⚡",
    "HANNIIII!! LET'S PLAN OUR NEXT ADVENTURE TOGETHERRRRR!! 😭🙏🗺️",
    "CUTIEEEEE!! I CAN'T WAIT TO SEE YOU AGAINNNN!! 😭🙏💖",
    "ACHUMMMMM!! YOU DESERVE ALL THE HAPPINESS IN THE WORLDDDD!! 😭🙏🌈",
    "SIGMAAAAA!! YOUR LAUGH IS MY FAVORITE SOUNDDDD!! 😭🙏🔊",
    "HANNIIII!! I BOUGHT US MATCHING BRACELETS!! 😭🙏💎",
    "CUTIEEEEE!! YOU MAKE EVERY DAY SPECIALLLL!! 😭🙏💫",
    "ACHUMMMMM!! I'M SENDING YOU VIRTUAL HUGS RIGHT NOWWWW!! 😭🙏🤗",
    "SIGMAAAAA!! YOU'RE MY FAVORITE PERSON TO TALK TOOO!! 😭🙏💬",
    "HANNIIII!! I SAVED THE LAST LAYS ORANGE CHIP FOR YOUUUU!! 😭🙏🧡",
    "CUTIEEEEE!! YOUR STYLE IS SO COOLLLLL!! 😭🙏👗",
    "ACHUMMMMM!! I WANT TO DANCE WITH YOU ALL NIGHTTTT!! 😭🙏💃",
    "SIGMAAAAA!! YOU'RE THE BEST THING THAT HAPPENED TO MEEE!! 😭🙏💖",
    "HANNIIII!! I WROTE A SONG ABOUT YOUUUU!! 😭🙏🎵",
    "CUTIEEEEE!! I MISS YOUR FACE SO MUCHHHH!! 😭🙏😍",
    "ACHUMMMMM!! YOU'RE MY FAVORITE HUMAN BEINGGGGG!! 😭🙏💕",
    "SIGMAAAAA!! I CAN'T IMAGINE LIFE WITHOUT YOUUUU!! 😭🙏💖",
    "HANNIIII!! LET'S STAY UP ALL NIGHT CHATTINGGGGG!! 😭🙏💬",
    "ACHUMMMMM!! I JUST FOUND THE CUTEST KUROMI MERCH FOR YOU!! 😭🙏💜",
    "SIGMAAAAA!! YOUR TASTE IN MUSIC IS ABSOLUTELY PERFECT!! 😭🙏🎧",
    "HANNIIII!! I'M LEARNING KOREAN JUST TO UNDERSTAND NEWJEANS BETTER!! 😭🙏🇰🇷",
    "CUTIEEEEE!! I BOUGHT TULIP SEEDS TO PLANT FOR YOU!! 😭🙏🌱",
    "ACHUMMMMM!! I'M MAKING A SCRAPBOOK OF ALL OUR MEMORIES!! 😭🙏📚",
    "SIGMAAAAA!! YOUR LAUGHTER IS CONTAGIOUS AND I LOVE IT!! 😭🙏😂",
    "HANNIIII!! I'M PLANNING A SURPRISE PARTY FOR YOUR BIRTHDAY!! 😭🙏🎉",
    "CUTIEEEEE!! I FOUND A NEW LAYS ORANGE FLAVOR VARIANT!! 😭🙏🍿",
    "ACHUMMMMM!! I'M LEARNING TO DRAW SO I CAN SKETCH YOU!! 😭🙏✏️",
    "SIGMAAAAA!! YOUR POSITIVE ENERGY IS INFECTIOUS!! 😭🙏⚡",
    "HANNIIII!! I'M MAKING A MIXTAPE OF ALL YOUR FAVORITE SONGS!! 😭🙏💿",
    "CUTIEEEEE!! I FOUND THE PERFECT SPOT FOR OUR TULIP GARDEN!! 😭🙏🌷",
    "ACHUMMMMM!! I'M SO GRATEFUL TO HAVE YOU IN MY LIFE!! 😭🙏🙏",
    "SIGMAAAAA!! YOUR CREATIVITY INSPIRES ME EVERY DAY!! 😭🙏🎨",
    "HANNIIII!! I'M PRACTICING NEWJEANS DANCES FOR YOU!! 😭🙏💃",
    "CUTIEEEEE!! I FOUND A KUROMI CAFE NEARBY FOR OUR DATE!! 😭🙏☕",
    "ACHUMMMMM!! I'M MAKING A BUCKET LIST OF THINGS TO DO TOGETHER!! 😭🙏📝",
    "SIGMAAAAA!! YOUR KINDNESS MAKES THE WORLD A BETTER PLACE!! 😭🙏💖",
    "HANNIIII!! I'M LEARNING TO COOK YOUR FAVORITE DISHES!! 😭🙏👩‍🍳",
    "CUTIEEEEE!! I FOUND THE PERFECT TULIP BOUQUET FOR YOU!! 😭🙏💐"
];

// Sad Mood Messages
const sadMessages = [
    "MAAF KAR DENAAAA… I AM SORRYYYY YOU FEEL SADDDD 😭🙏💙",
    "ACHUMMMMM… I'M RIGHT HERE!! TAKE MY VIRTUAL HUGGGG 😭🙏🤗",
    "ACCHHE SE KHAAOOO… DON'T WORRYYYYYYY 😭🙏💙💙",
    "SOWWWYYY CUTIEEE… I WISH I COULD HUG YOU RIGHT NOW 😭🙏🥹",
    "HANNIIII… EVERYTHING WILL BE OKAYYYY I PROMISEEE 😭🙏💙",
    "SIGMAAAAA… YOU'RE STRONGER THAN YOU THINKKKK 😭🙏💪",
    "ACHUMMMMM… I'LL ALWAYS BE HERE FOR YOUUUU 😭🙏💙",
    "CUTIEEEEE… LET ME COMFORT YOUUUU 😭🙏🫂",
    "HANNIIII… THIS FEELING WILL PASS I PROMISEEE 😭🙏🌈",
    "SIGMAAAAA… YOU DESERVE ALL THE LOVE IN THE WORLDDDD 😭🙏💖",
    "ACHUMMMMM… TAKE ALL THE TIME YOU NEEDDD 😭🙏💙",
    "CUTIEEEEE… I'M SENDING YOU WARM HUGS RIGHT NOWWW 😭🙏🤗",
    "HANNIIII… YOU'RE NEVER ALONE REMEMBER THATTTT 😭🙏💙",
    "SIGMAAAAA… I'M HERE TO LISTEN WHENEVEERRR 😭🙏👂",
    "ACHUMMMMM… YOUR FEELINGS ARE VALID AND IMPORTANTTT 😭🙏💙",
    "CUTIEEEEE… TOMORROW WILL BE BETTERRR I PROMISEEE 😭🙏🌅",
    "HANNIIII… I'LL WAIT HERE WITH YOU UNTIL YOU FEEL BETTERRR 😭🙏💙",
    "SIGMAAAAA… YOU'RE NEVER A BURDEN TO MEEE 😭🙏💖",
    "ACHUMMMMM… I CARE ABOUT YOU SO MUCHHHH 😭🙏💙",
    "CUTIEEEEE… TAKE DEEP BREATHS WITH MEEE 😭🙏🫁"
];

// Angry Mood Messages
const angryMessages = [
    "OMG ACHUMMMMM!!! HOW COULD YOU HIT MEEEE?? 😭🙏💖",
    "I PROMISE I WON'T DO IT AGAIN… MAYBE 😭🙏😏",
    "HAHAHA I DESERVED THATTTT CUTIEEEEEE!! 😭🙏😅",
    "SIGMAAAAA!! YOU'RE SO STRONG WHEN YOU'RE ANGRYYY!! 😭🙏💪",
    "HANNIIII!! YOUR ANGRY FACE IS STILL CUTEEEE!! 😭🙏😍",
    "ACHUMMMMM!! HIT ME AGAIN I DARE YOUUUU!! 😭🙏😝",
    "CUTIEEEEE!! YOUR AIM IS GETTING BETTERRR!! 😭🙏🎯",
    "SIGMAAAAA!! I'M SORRY FOR WHATEVER I DIDDD!! 😭🙏🙇‍♀️",
    "HANNIIII!! LET IT ALL OUT ON MEEE!! 😭🙏💥",
    "ACHUMMMMM!! I'LL BE YOUR PUNCHING BAG ANYDAYYY!! 😭🙏🥊",
    "CUTIEEEEE!! YOU LOOK CUTE EVEN WHEN YOU'RE MADD!! 😭🙏😍",
    "SIGMAAAAA!! I BET YOU CAN'T HIT ALL THE CLOUDS!! 😭🙏☁️",
    "HANNIIII!! YOUR ANGRY ENERGY IS POWERFULLL!! 😭🙏⚡",
    "ACHUMMMMM!! I'M RUNNING AWAY NOWWW!! 😭🙏🏃‍♀️",
    "CUTIEEEEE!! TRY TO CATCH ME IF YOU CANNN!! 😭🙏😜",
    "SIGMAAAAA!! YOUR WHACKING SKILLS ARE IMPRESSIVEEE!! 😭🙏👏",
    "HANNIIII!! I'LL MAKE IT UP TO YOUUU I PROMISEEE!! 😭🙏💝",
    "ACHUMMMMM!! YOU'RE SCARY BUT I STILL LOVE YOUUU!! 😭🙏💖",
    "CUTIEEEEE!! FEELING BETTER AFTER HITTING MEEE?? 😭🙏😊",
    "SIGMAAAAA!! I'LL ALWAYS BE YOUR STRESS RELIEVERRR!! 😭🙏🎭"
];

// Keywords for responses
const happyKeywords = [
    {words: ['hi', 'hello', 'hey'], responses: ["HIEEEE ACHUMMMMM!!! I'M SO HAPPY TO SEE YOUUU!! 😭🙏💖", "HELLOOOO CUTIEEEEE!!! HOW ARE YOUUUU?? 😭🙏😍"]},
    {words: ['kuromi'], responses: ["OMG KUROMI IS YOUR FAVORITE RIGHT?? SO CUTEEEE!! 😭🙏💜", "KUROMI LOVES YOU AS MUCH AS I DOOO!! 😭🙏💜"]},
    {words: ['hanni', 'newjeans'], responses: ["HANNIIII FROM NEWJEANS IS THE BESTTTTT!! 😭🙏✨", "OMG I LOVE HANNI TOOOOO!! NEWJEANS FOREVERRR!! 😭🙏💙"]},
    {words: ['wave', 'earth'], responses: ["WAVE TO EARTH HAS THE BEST MUSICCC!! 😭🙏🎵", "I'M LISTENING TO WAVE TO EARTH RIGHT NOWWW!! 😭🙏🎧"]},
    {words: ['lays', 'orange'], responses: ["LAYS ORANGE ARE YOUR FAVORITE SNACKKKK!! I REMEMBER!! 😭🙏🧡", "I BOUGHT YOU MORE LAYS ORANGE YESTERDAYYY!! 😭🙏🧡"]},
    {words: ['tulip', 'flower'], responses: ["TULIPS ARE SO PRETTY JUST LIKE YOUUUU!! 😭🙏🌷", "I PICKED SOME TULIPS FOR YOU THIS MORNINGGG!! 😭🙏🌷"]},
    {words: ['love', 'like'], responses: ["I LOVE YOU MORE ACHUMMMMM!! FOREVER AND EVERRR!! 😭🙏💖", "YOU'RE MY FAVORITE PERSON IN THE WHOLE WORLDDDD!! 😭🙏💕"]},
    {words: ['game', 'play'], responses: ["LET'S PLAY ALL THE GAMES TOGETHERRR!! 😭🙏🎮", "I LOVE PLAYING GAMES WITH YOUUUU!! 😭🙏🎯"]},
    {words: ['music', 'song'], responses: ["I MADE A PLAYLIST JUST FOR YOUUUU!! 😭🙏🎵", "LET'S DANCE TO OUR FAVORITE SONGS TOGETHERRR!! 😭🙏💃"]},
    {words: ['food', 'eat'], responses: ["I COOKED YOUR FAVORITE FOOD TODAYYY!! 😭🙏🍲", "LET'S EAT TOGETHER SOONNN!! I MISS OUR FOOD DATEESSS!! 😭🙏🍽️"]}
];

const sadKeywords = [
    {words: ['hi', 'hello', 'hey'], responses: ["HIIII ACHUMMMMM... ARE YOU FEELING OKAY?? 😭🙏💙", "HELLOOOO CUTIEEEEE... I'M HERE FOR YOU ALWAYSSS 😭🙏🫂"]},
    {words: ['bad', 'sad', 'upset'], responses: ["IT'S OKAY TO FEEL SAD SOMETIMES ACHUMMM... I'M RIGHT HERE 😭🙏💙", "TAKE YOUR TIME CUTIEEE... YOUR FEELINGS ARE VALID 😭🙏💙"]},
    {words: ['cry', 'tears'], responses: ["CRY IT OUT HANNIIII... I'LL BE YOUR SHOULDER 😭🙏💙", "YOUR TEARS ARE PRECIOUS ACHUMMM... LET THEM FLOW 😭🙏💧"]},
    {words: ['alone', 'lonely'], responses: ["YOU'RE NEVER ALONE SIGMAAAAA... I'M ALWAYS WITH YOU 😭🙏💙", "I'LL KEEP YOU COMPANY ACHUMMM... ALWAYS AND FOREVER 😭🙏🫂"]},
    {words: ['tired', 'exhausted'], responses: ["REST YOUR HEAD CUTIEEEEE... YOU DESERVE A BREAK 😭🙏💤", "TAKE ALL THE REST YOU NEED HANNIIII... I'LL WAIT FOR YOU 😭🙏💙"]},
    {words: ['help', 'need'], responses: ["I'M HERE TO HELP ACHUMMMMM... TELL ME WHAT YOU NEED 😭🙏💙", "LEAN ON ME CUTIEEEEE... THAT'S WHAT I'M HERE FOR 😭🙏🫂"]},
    {words: ['better', 'okay'], responses: ["YOU'LL FEEL BETTER SOON SIGMAAAAA... I PROMISE 😭🙏🌈", "EVERYTHING WILL BE OKAY ACHUMMM... TRUST ME 😭🙏💙"]},
    {words: ['hug', 'hold'], responses: ["I'M SENDING YOU THE BIGGEST HUG RIGHT NOW CUTIEEEEE... 😭🙏🤗", "I WISH I COULD HOLD YOU CLOSE HANNIIII... 😭🙏💙"]},
    {words: ['thanks', 'thank'], responses: ["YOU NEVER NEED TO THANK ME ACHUMMMMM... I'M HERE BECAUSE I CARE 😭🙏💙", "ALWAYS HERE FOR YOU CUTIEEEEE... NO MATTER WHAT 😭🙏💖"]},
    {words: ['love', 'care'], responses: ["I LOVE YOU SO MUCH SIGMAAAAA... NEVER FORGET THAT 😭🙏💙", "MY CARE FOR YOU IS ENDLESS ACHUMMM... LIKE THE OCEAN 😭🙏💙"]}
];

const angryKeywords = [
    {words: ['hi', 'hello', 'hey'], responses: ["HIIII ACHUMMMMM!!! ARE YOU HERE TO BEAT ME UP?? 😭🙏😝", "HELLOOOO CUTIEEEEE!!! READY TO RELEASE SOME ANGER?? 😭🙏💥"]},
    {words: ['mad', 'angry', 'upset'], responses: ["YOUR ANGRY FACE IS SO CUTE HANNIIII!! 😭🙏😍", "BE AS ANGRY AS YOU WANT ACHUMMM!! I CAN TAKE IT!! 😭🙏💪"]},
    {words: ['hate', 'dislike'], responses: ["YOU CAN HATE ME TODAY SIGMAAAAA!! I'LL STILL LOVE YOU TOMORROW!! 😭🙏💖", "HATE ME ALL YOU WANT CUTIEEEEE!! I'LL NEVER STOP CARING!! 😭🙏💕"]},
    {words: ['punch', 'hit', 'slap'], responses: ["HIT ME HARDER ACHUMMMMM!! IS THAT ALL YOU GOT?? 😭🙏😝", "YOUR PUNCHES TICKLE HANNIIII!! TRY AGAIN!! 😭🙏😂"]},
    {words: ['annoying', 'annoyed'], responses: ["AM I ANNOYING YOU CUTIEEEEE?? GOOD!! THAT'S MY JOB!! 😭🙏😜", "I LOVE ANNOYING YOU SIGMAAAAA!! YOUR REACTIONS ARE THE BEST!! 😭🙏🤣"]},
    {words: ['stop', 'enough'], responses: ["I'LL NEVER STOP ACHUMMMMM!! CATCH ME IF YOU CAN!! 😭🙏🏃‍♀️", "NOT ENOUGH?? I CAN GO ALL DAY HANNIIII!! 😭🙏⚡"]},
    {words: ['game', 'play'], responses: ["LET'S PLAY WHACK-A-RITU CUTIEEEEE!! I BET YOU CAN'T CATCH ME!! 😭🙏😏", "GAME ON SIGMAAAAA!! SHOW ME WHAT YOU'VE GOT!! 😭🙏🎮"]},
    {words: ['sorry', 'apologize'], responses: ["I'M SORRYYYY ACHUMMMMM!! (NOT REALLY HEHE) 😭🙏😝", "APOLOGY NOT ACCEPTED?? HIT ME AGAIN HANNIIII!! 😭🙏💥"]},
    {words: ['laugh', 'funny'], responses: ["YOUR LAUGH IS MY FAVORITE SOUND CUTIEEEEE!! EVEN WHEN YOU'RE ANGRY!! 😭🙏😍", "I LOVE MAKING YOU LAUGH WHEN YOU'RE MAD SIGMAAAAA!! 😭🙏😂"]},
    {words: ['better', 'calm'], responses: ["FEELING BETTER AFTER HITTING ME ACHUMMMMM?? 😭🙏😊", "CALMING DOWN NOW HANNIIII?? OR DO YOU NEED MORE THERAPY?? 😭🙏💆‍♀️"]}
];

// Context tracking for more personalized responses
let conversationContext = {
    lastMentioned: [],
    favoriteTopics: [],
    currentMood: 'happy',
    messageCount: 0
};

// Get response based on mood with enhanced context awareness
function getHappyResponse(message) {
    conversationContext.messageCount++;
    const lowerMessage = message.toLowerCase();
    
    // Track mentioned topics
    const mentionedTopics = [];
    if (lowerMessage.includes('kuromi')) mentionedTopics.push('kuromi');
    if (lowerMessage.includes('hanni') || lowerMessage.includes('newjeans')) mentionedTopics.push('hanni');
    if (lowerMessage.includes('wave') || lowerMessage.includes('earth')) mentionedTopics.push('wave');
    if (lowerMessage.includes('lays') || lowerMessage.includes('orange')) mentionedTopics.push('lays');
    if (lowerMessage.includes('tulip')) mentionedTopics.push('tulip');
    
    conversationContext.lastMentioned = mentionedTopics;
    
    // Check for keyword matches with enhanced responses
    for (const keyword of happyKeywords) {
        if (keyword.words.some(word => lowerMessage.includes(word))) {
            let response = keyword.responses[Math.floor(Math.random() * keyword.responses.length)];
            
            // Add context-aware follow-ups
            if (conversationContext.messageCount > 3) {
                response += getContextualFollowUp(mentionedTopics);
            }
            
            return response;
        }
    }
    
    // Enhanced random responses based on context
    if (conversationContext.lastMentioned.length > 0) {
        const topic = conversationContext.lastMentioned[0];
        const contextualResponses = getContextualResponses(topic);
        if (contextualResponses.length > 0) {
            return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
        }
    }
    
    // If no keyword matches, return random happy message
    return happyMessages[Math.floor(Math.random() * happyMessages.length)];
}

function getContextualFollowUp(topics) {
    if (topics.includes('kuromi')) {
        return " I'M ALWAYS THINKING ABOUT KUROMI TOO!! 😭🙏💜";
    } else if (topics.includes('hanni')) {
        return " HANNIIII IS SUCH AN INSPIRATION!! 😭🙏✨";
    } else if (topics.includes('wave')) {
        return " WAVE TO EARTH MAKES EVERYTHING BETTER!! 😭🙏🎵";
    } else if (topics.includes('lays')) {
        return " LAYS ORANGE IS THE BEST SNACK EVER!! 😭🙏🧡";
    } else if (topics.includes('tulip')) {
        return " TULIPS REMIND ME OF YOU!! 😭🙏🌷";
    }
    return "";
}

function getContextualResponses(topic) {
    const responses = {
        'kuromi': [
            "ACHUMMMMM!! KUROMI IS SO CUTE JUST LIKE YOU!! 😭🙏💜",
            "I LOVE KUROMI TOO!! WE HAVE THE BEST TASTE!! 😭🙏💜",
            "KUROMI WOULD LOVE TO MEET YOU ACHUMMMMM!! 😭🙏💜"
        ],
        'hanni': [
            "HANNIIII IS AMAZING!! NEWJEANS FOREVER!! 😭🙏✨",
            "I'M OBSESSED WITH HANNI TOO!! HER DANCE MOVES!! 😭🙏💃",
            "HANNIIII INSPIRES ME EVERY DAY!! JUST LIKE YOU!! 😭🙏✨"
        ],
        'wave': [
            "WAVE TO EARTH HAS THE BEST VIBES!! 😭🙏🎵",
            "I'M LISTENING TO WAVE TO EARTH RIGHT NOW!! 😭🙏🎧",
            "WAVE TO EARTH MAKES ME THINK OF YOU!! 😭🙏💙"
        ],
        'lays': [
            "LAYS ORANGE IS THE PERFECT SNACK!! 😭🙏🧡",
            "I BOUGHT EXTRA LAYS ORANGE FOR YOU!! 😭🙏🍿",
            "LAYS ORANGE AND YOU ARE MY FAVORITE THINGS!! 😭🙏🧡"
        ],
        'tulip': [
            "TULIPS ARE SO BEAUTIFUL LIKE YOU!! 😭🙏🌷",
            "I FOUND THE PERFECT TULIP FIELD FOR US!! 😭🙏🌷",
            "TULIPS MAKE ME SMILE JUST LIKE YOU DO!! 😭🙏🌷"
        ]
    };
    
    return responses[topic] || [];
}

function getSadResponse(message) {
    // Convert message to lowercase for easier matching
    const lowerMessage = message.toLowerCase();
    
    // Check for keyword matches
    for (const keyword of sadKeywords) {
        if (keyword.words.some(word => lowerMessage.includes(word))) {
            return keyword.responses[Math.floor(Math.random() * keyword.responses.length)];
        }
    }
    
    // If no keyword matches, return random sad message
    return sadMessages[Math.floor(Math.random() * sadMessages.length)];
}

function getAngryResponse(message) {
    // Convert message to lowercase for easier matching
    const lowerMessage = message.toLowerCase();
    
    // Check for keyword matches
    for (const keyword of angryKeywords) {
        if (keyword.words.some(word => lowerMessage.includes(word))) {
            return keyword.responses[Math.floor(Math.random() * keyword.responses.length)];
        }
    }
    
    // If no keyword matches, return random angry message
    return angryMessages[Math.floor(Math.random() * angryMessages.length)];
}

// Make functions available to main.js
window.getBotResponse = getBotResponse;