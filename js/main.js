// Main JavaScript for Achum's Special Place

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const landingPage = document.getElementById('landing-page');
    const happyPortal = document.getElementById('happy-portal');
    const sadPortal = document.getElementById('sad-portal');
    const angryPortal = document.getElementById('angry-portal');
    
    const happyButton = document.getElementById('happy-button');
    const sadButton = document.getElementById('sad-button');
    const angryButton = document.getElementById('angry-button');
    
    const happyBack = document.getElementById('happy-back');
    const sadBack = document.getElementById('sad-back');
    const angryBack = document.getElementById('angry-back');
    
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    
    // Easter Eggs
    const easterEggs = document.querySelectorAll('.hidden-kuromi, .hidden-tulip, .hidden-hanni, .hidden-wave, .hidden-lays');

    // Wave happy audio elements (declare once)
    const waveHappyHope = document.getElementById('wave-happy-hope');
    const waveHappyHappy = document.getElementById('wave-happy-happy');
    
    // Initialize music state
    let isMusicPlaying = false;
    
    // Portal Navigation
    if (happyButton) happyButton.addEventListener('click', function() {
        showPortal(happyPortal);
        playHappyMusic();
    });
    if (sadButton) sadButton.addEventListener('click', function() {
        showPortal(sadPortal);
        playSadMusic();
    });
    if (angryButton) angryButton.addEventListener('click', function() {
        showPortal(angryPortal);
        playAngryMusic();
    });
    
    if (happyBack) happyBack.addEventListener('click', function() {
        hidePortal(happyPortal);
        playLandingMusic();
    });
    if (sadBack) sadBack.addEventListener('click', function() {
        hidePortal(sadPortal);
        playLandingMusic();
    });
    if (angryBack) angryBack.addEventListener('click', function() {
        hidePortal(angryPortal);
        playLandingMusic();
    });
    
    // Music Controls
    if (musicToggle) musicToggle.addEventListener('click', function() {
        toggleMusic();
    });
    
    // Easter Egg Interactions
    easterEggs.forEach(egg => {
        if (!egg) return;
        egg.addEventListener('click', function() {
            revealEasterEgg(egg.id);
        });
    });
    
    // Add secret key combinations
    let secretSequence = [];
    const secretKeys = ['k', 'u', 'r', 'o', 'm', 'i'];
    
    document.addEventListener('keydown', function(e) {
        secretSequence.push(e.key.toLowerCase());
        if (secretSequence.length > secretKeys.length) {
            secretSequence.shift();
        }
        
        if (secretSequence.join('') === secretKeys.join('')) {
            triggerSecretKuromiMode();
            secretSequence = [];
        }
    });
    
    // Add click counter for special interactions
    let clickCounter = 0;
    document.addEventListener('click', function() {
        clickCounter++;
        if (clickCounter === 100) {
            triggerCenturyClick();
        }
    });
    
    // Initialize the page
    initializePage();
    
    // Functions
    function initializePage() {
        // Show landing page
        landingPage.style.display = 'flex';
        
        // Hide all portals
        happyPortal.style.display = 'none';
        sadPortal.style.display = 'none';
        angryPortal.style.display = 'none';
        
        // Set up background music
        playLandingMusic();
        
        // Initialize chatbots
        initializeChatbots();
        
        // Add animation classes
        document.querySelector('.greeting-container').classList.add('animate__animated', 'animate__bounceIn');
    }
    
    function showPortal(portal) {
        // Create portal entrance effect
        createPortalEffect(portal);
        
        // Hide landing page with enhanced animation
        landingPage.classList.add('animate__animated', 'animate__zoomOut');
        setTimeout(() => {
            landingPage.style.display = 'none';
            landingPage.classList.remove('animate__animated', 'animate__zoomOut');
            
            // Show portal with enhanced animation
            portal.style.display = 'block';
            portal.classList.add('animate__animated', 'animate__zoomIn');
            setTimeout(() => {
                portal.classList.remove('animate__animated', 'animate__zoomIn');
            }, 1000);
        }, 600);
    }
    
    function hidePortal(portal) {
        // Create portal exit effect
        createPortalExitEffect(portal);
        
        // Hide portal with enhanced animation
        portal.classList.add('animate__animated', 'animate__zoomOut');
        setTimeout(() => {
            portal.style.display = 'none';
            portal.classList.remove('animate__animated', 'animate__zoomOut');
            
            // Show landing page with enhanced animation
                // Wave Happy Audio Elements
                const waveHappyHope = document.getElementById('wave-happy-hope');
                const waveHappyHappy = document.getElementById('wave-happy-happy');
            landingPage.style.display = 'flex';
            landingPage.classList.add('animate__animated', 'animate__zoomIn');
            setTimeout(() => {
                landingPage.classList.remove('animate__animated', 'animate__zoomIn');
            }, 1000);
        }, 600);
    }
    
    function createPortalEffect(portal) {
        // Create magical portal entrance effect
        const effect = document.createElement('div');
        effect.className = 'portal-effect';
        effect.style.position = 'fixed';
        effect.style.top = '50%';
        effect.style.left = '50%';
        effect.style.width = '0';
        effect.style.height = '0';
        effect.style.borderRadius = '50%';
                    // Set up background music and wave-happy
                    playLandingMusic();
                    if (waveHappyHope) {
                        waveHappyHope.currentTime = 0;
                        waveHappyHope.play().catch(()=>{});
                    }
        effect.style.transform = 'translate(-50%, -50%)';
        effect.style.zIndex = '9998';
        effect.style.pointerEvents = 'none';
        
        document.body.appendChild(effect);
        
        // Animate portal effect
        setTimeout(() => {
            effect.style.transition = 'all 0.8s ease-out';
            effect.style.width = '200vw';
            effect.style.height = '200vh';
            effect.style.opacity = '0';
        }, 10);
        
        // Remove effect after animation
        setTimeout(() => {
            if (document.body.contains(effect)) {
                document.body.removeChild(effect);
            }
        }, 1000);
    }
    
    function createPortalExitEffect(portal) {
        // Create magical portal exit effect
        const effect = document.createElement('div');
        effect.className = 'portal-exit-effect';
        effect.style.position = 'fixed';
        effect.style.top = '50%';
        effect.style.left = '50%';
        effect.style.width = '200vw';
        effect.style.height = '200vh';
        effect.style.borderRadius = '50%';
        effect.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8), transparent)';
        effect.style.transform = 'translate(-50%, -50%)';
        effect.style.zIndex = '9998';
        effect.style.pointerEvents = 'none';
        effect.style.opacity = '0';
        
                    // Pause hope page wave-happy if playing
                    if (waveHappyHope) waveHappyHope.pause();
                    // Play happy portal wave-happy
                    if (waveHappyHappy) {
                        waveHappyHappy.currentTime = 0;
                        waveHappyHappy.play().catch(()=>{});
                    }
        document.body.appendChild(effect);
        
        // Animate portal exit effect
        setTimeout(() => {
            effect.style.transition = 'all 0.8s ease-in';
            effect.style.width = '0';
            effect.style.height = '0';
            effect.style.opacity = '1';
        }, 10);
        
        // Remove effect after animation
        setTimeout(() => {
            if (document.body.contains(effect)) {
                document.body.removeChild(effect);
            }
        }, 1000);
    }
    
    function toggleMusic() {
                    // Pause happy portal wave-happy if playing
                    if (waveHappyHappy) waveHappyHappy.pause();
                    // Play hope page wave-happy
                    if (waveHappyHope) {
                        waveHappyHope.currentTime = 0;
                        waveHappyHope.play().catch(()=>{});
                    }
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<span class="music-icon">🔇</span>';
        } else {
            backgroundMusic.play();
            musicToggle.innerHTML = '<span class="music-icon">🎵</span>';
        }
        isMusicPlaying = !isMusicPlaying;
    }
    
    function playLandingMusic() {
        backgroundMusic.src = 'audio/wave-to-earth.mp3';
        if (isMusicPlaying) {
            backgroundMusic.play();
        }
    }
    
    function playHappyMusic() {
        backgroundMusic.src = 'audio/happy-wave.mp3';
        if (isMusicPlaying) {
            backgroundMusic.play();
        }
    }
    
    function playSadMusic() {
        backgroundMusic.src = 'audio/sad-wave.mp3';
        if (isMusicPlaying) {
            backgroundMusic.play();
        }
    }
    
    function playAngryMusic() {
        backgroundMusic.src = 'audio/angry-wave.mp3';
        if (isMusicPlaying) {
            backgroundMusic.play();
        }
    }
    
    function revealEasterEgg(eggId) {
        let message = '';
        let animation = '';
        
        switch(eggId) {
            case 'hidden-kuromi-1':
            case 'hidden-kuromi-2':
                message = 'YAYYYY YOU FOUND KUROMI!!! YOUR FAVORITE!!! 😭🙏💖';
                animation = 'animate__wobble';
                break;
            case 'hidden-tulip-1':
                message = 'AWWWW YOU FOUND A TULIP!!! JUST FOR YOUUUU!!! 😭🙏🌷';
                animation = 'animate__swing';
                break;
            case 'hidden-hanni-1':
                message = 'OMG HANNIIII FROM NEWJEANS!!! YOUR FAVORITE!!! 😭🙏✨';
                animation = 'animate__heartBeat';
                break;
            case 'hidden-wave-1':
                message = 'WAVE TO EARTH LYRICS: "HOW CAN MY DAY BE BAD WHEN I AM WITH YOU!!!" 😭🙏💙';
                animation = 'animate__pulse';
                break;
            case 'hidden-lays-1':
                message = 'LAYS ORANGE!!! YOUR FAVORITE SNACK!!! 😭🙏🧡';
                animation = 'animate__tada';
                break;
        }
        
        // Create floating message
        const eggMessage = document.createElement('div');
        eggMessage.className = 'easter-egg-message animate__animated ' + animation;
        eggMessage.textContent = message;
        eggMessage.style.position = 'fixed';
        eggMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        eggMessage.style.padding = '1rem';
        eggMessage.style.borderRadius = '10px';
        eggMessage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        eggMessage.style.zIndex = '1000';
        eggMessage.style.maxWidth = '300px';
        eggMessage.style.textAlign = 'center';
        
        // Position near the egg
        const egg = document.getElementById(eggId);
        const rect = egg.getBoundingClientRect();
        eggMessage.style.top = rect.top + 'px';
        eggMessage.style.left = (rect.left + 40) + 'px';
        
        // Add to body and remove after animation
        document.body.appendChild(eggMessage);
        setTimeout(() => {
            eggMessage.classList.add('animate__fadeOut');
            setTimeout(() => {
                document.body.removeChild(eggMessage);
            }, 1000);
        }, 3000);
    }
    
    function initializeChatbots() {
        // Initialize Happy Chatbot
        const happySendButton = document.getElementById('happy-send-button');
        const happyChatInput = document.getElementById('happy-chat-input');
        const happyMessages = document.getElementById('happy-messages');
        
        happySendButton.addEventListener('click', function() {
            sendMessage(happyChatInput, happyMessages, 'happy');
        });
        
        happyChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(happyChatInput, happyMessages, 'happy');
            }
        });
        
        // Initialize Sad Chatbot
        const sadSendButton = document.getElementById('sad-send-button');
        const sadChatInput = document.getElementById('sad-chat-input');
        const sadMessages = document.getElementById('sad-messages');
        
        sadSendButton.addEventListener('click', function() {
            sendMessage(sadChatInput, sadMessages, 'sad');
        });
        
        sadChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(sadChatInput, sadMessages, 'sad');
            }
        });
        
        // Initialize Angry Chatbot
        const angrySendButton = document.getElementById('angry-send-button');
        const angryChatInput = document.getElementById('angry-chat-input');
        const angryMessages = document.getElementById('angry-messages');
        
        angrySendButton.addEventListener('click', function() {
            sendMessage(angryChatInput, angryMessages, 'angry');
        });
        
        angryChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(angryChatInput, angryMessages, 'angry');
            }
        });
    }
    
    function sendMessage(inputElement, messagesContainer, mood) {
        const message = inputElement.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(messagesContainer, message, 'user');
        
        // Clear input
        inputElement.value = '';
        
        // Get bot response based on mood
        setTimeout(() => {
            const response = getBotResponse(message, mood);
            addMessage(messagesContainer, response, 'ritu');
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 500);
    }
    
    function addMessage(container, text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message animate__animated animate__fadeIn`;
        messageDiv.textContent = text;
        container.appendChild(messageDiv);
        
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }
    
    function getBotResponse(message, mood) {
        // Use the real chatbot logic from chatbot.js if available
        if (typeof window.getBotResponse === 'function') {
            // Call the async function and return a placeholder while waiting
            let placeholder = "Ritu is thinking...";
            window.getBotResponse(message, mood).then(response => {
                // Find the last message from Ritu and update it
                const messages = document.querySelectorAll('.ritu-message');
                if (messages.length > 0) {
                    messages[messages.length - 1].textContent = response;
                }
            });
            return placeholder;
        } else {
            return "Sorry, chatbot is not available.";
        }
    }
    
    function triggerSecretKuromiMode() {
        // Create a special Kuromi mode with extra animations
        const kuromiMode = document.createElement('div');
        kuromiMode.className = 'kuromi-mode';
        kuromiMode.style.position = 'fixed';
        kuromiMode.style.top = '0';
        kuromiMode.style.left = '0';
        kuromiMode.style.width = '100vw';
        kuromiMode.style.height = '100vh';
        kuromiMode.style.background = 'linear-gradient(45deg, #9c27b0, #e91e63, #ff9800)';
        kuromiMode.style.zIndex = '10000';
        kuromiMode.style.display = 'flex';
        kuromiMode.style.justifyContent = 'center';
        kuromiMode.style.alignItems = 'center';
        kuromiMode.style.flexDirection = 'column';
        kuromiMode.style.color = 'white';
        kuromiMode.style.fontSize = '3rem';
        kuromiMode.style.fontWeight = 'bold';
        kuromiMode.style.textAlign = 'center';
        kuromiMode.style.animation = 'kuromiModeEntrance 2s ease-out';
        
        kuromiMode.innerHTML = `
            <div style="font-size: 5rem; margin-bottom: 2rem;">💜</div>
            <div>SECRET KUROMI MODE ACTIVATED!!!</div>
            <div style="font-size: 1.5rem; margin-top: 1rem;">ACHUMMMMM YOU FOUND THE SECRET!!! 😭🙏💜</div>
            <div style="font-size: 1rem; margin-top: 1rem; opacity: 0.8;">Press any key to continue...</div>
        `;
        
        document.body.appendChild(kuromiMode);
        
        // Add special effects
        createKuromiRain();
        
        // Remove after 5 seconds or on keypress
        const removeKuromiMode = () => {
            kuromiMode.style.animation = 'kuromiModeExit 1s ease-in forwards';
            setTimeout(() => {
                if (document.body.contains(kuromiMode)) {
                    document.body.removeChild(kuromiMode);
                }
            }, 1000);
        };
        
        setTimeout(removeKuromiMode, 5000);
        document.addEventListener('keydown', removeKuromiMode, { once: true });
    }
    
    function createKuromiRain() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const kuromi = document.createElement('div');
                kuromi.textContent = '💜';
                kuromi.style.position = 'fixed';
                kuromi.style.left = Math.random() * window.innerWidth + 'px';
                kuromi.style.top = '-50px';
                kuromi.style.fontSize = '2rem';
                kuromi.style.zIndex = '10001';
                kuromi.style.animation = 'kuromiFall 3s linear forwards';
                kuromi.style.pointerEvents = 'none';
                
                document.body.appendChild(kuromi);
                
                setTimeout(() => {
                    if (document.body.contains(kuromi)) {
                        document.body.removeChild(kuromi);
                    }
                }, 3000);
            }, i * 100);
        }
    }
    
    function triggerCenturyClick() {
        // Special celebration for 100 clicks
        const celebration = document.createElement('div');
        celebration.className = 'century-celebration';
        celebration.style.position = 'fixed';
        celebration.style.top = '50%';
        celebration.style.left = '50%';
        celebration.style.transform = 'translate(-50%, -50%)';
        celebration.style.background = 'linear-gradient(135deg, #ff6b9d, #c44569, #f8b500)';
        celebration.style.padding = '2rem';
        celebration.style.borderRadius = '20px';
        celebration.style.color = 'white';
        celebration.style.fontSize = '2rem';
        celebration.style.fontWeight = 'bold';
        celebration.style.textAlign = 'center';
        celebration.style.zIndex = '10000';
        celebration.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        celebration.style.animation = 'centuryCelebration 2s ease-out';
        
        celebration.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
            <div>100 CLICKS ACHIEVED!!!</div>
            <div style="font-size: 1.2rem; margin-top: 1rem;">YOU'RE SO ACTIVE ACHUMMMMM!!! 😭🙏💖</div>
        `;
        
        document.body.appendChild(celebration);
        
        // Create confetti explosion
        createConfettiExplosion();
        
        setTimeout(() => {
            if (document.body.contains(celebration)) {
                document.body.removeChild(celebration);
            }
        }, 3000);
    }
    
    function createConfettiExplosion() {
        const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = '50%';
                confetti.style.top = '50%';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.zIndex = '10001';
                confetti.style.pointerEvents = 'none';
                
                const angle = (Math.PI * 2 * i) / 100;
                const velocity = 200 + Math.random() * 100;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                confetti.style.transform = `translate(${vx}px, ${vy}px)`;
                confetti.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.style.opacity = '0';
                    setTimeout(() => {
                        if (document.body.contains(confetti)) {
                            document.body.removeChild(confetti);
                        }
                    }, 2000);
                }, 100);
            }, i * 10);
        }
    }
});