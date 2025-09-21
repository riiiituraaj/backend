// Angry Portal Functionality for Achum's Special Place

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const whackRituButton = document.getElementById('whack-ritu');
    const beatRituButton = document.getElementById('beat-ritu');
    const popCloudsButton = document.getElementById('pop-clouds');

    const whackGameContainer = document.getElementById('whack-game-container');
    const beatGameContainer = document.getElementById('beat-game-container');
    const cloudGameContainer = document.getElementById('cloud-game-container');

    // Guard event listeners to prevent runtime errors if elements are missing
    if (whackRituButton) whackRituButton.addEventListener('click', startWhackGame);
    if (beatRituButton) beatRituButton.addEventListener('click', startBeatGame);
    if (popCloudsButton) popCloudsButton.addEventListener('click', startCloudGame);
    
    // Event Listeners
    whackRituButton.addEventListener('click', startWhackGame);
    beatRituButton.addEventListener('click', startBeatGame);
    popCloudsButton.addEventListener('click', startCloudGame);
    
    // Game Variables
    let whackGameActive = false;
    let whackScore = 0;
    let whackTimer = null;
    
    let beatGameActive = false;
    let currentChallenge = 0;
    
    let cloudGameActive = false;
    let cloudsPopped = 0;
    
    // Whack-A-Ritu Messages
    const whackMessages = [
        "OMG ACHUMMMMM!!! HOW COULD YOU HIT MEEEE?? 😭🙏💖",
        "OWWWWW THAT HURT CUTIEEEEE!!! 😭🙏😅",
        "HAHAHA I DESERVED THATTTT!!! 😭🙏😂",
        "HEY HANNIIII!! THAT'S MY HEAD!! 😭🙏😝",
        "OUCH SIGMAAAAA!! YOU'RE STRONG!! 😭🙏💪",
        "HEHEHE YOU MISSED ME!! TRY AGAIN!! 😭🙏😏",
        "ACHUMMMMM IS GETTING BETTER AT THIS!! 😭🙏👏",
        "I'M SORRY I MADE YOU ANGRY!! 😭🙏🥺",
        "FEEL BETTER YET?? HIT ME AGAIN!! 😭🙏😆",
        "YOUR AIM IS GETTING BETTER CUTIEEEEE!! 😭🙏🎯"
    ];
    
    // Beat Ritu Challenges
    const beatChallenges = [
        {
            challenge: "CLICK THE BUTTON 10 TIMES AS FAST AS YOU CAN!!",
            target: 10,
            timeLimit: 5,
            successMessage: "WOW ACHUMMMMM!!! YOU'RE SO FAST!!! 😭🙏💖",
            failMessage: "AWWW YOU WERE CLOSE!! TRY AGAIN CUTIEEEEE!! 😭🙏💕"
        },
        {
            challenge: "HOLD THE BUTTON FOR 5 SECONDS WITHOUT RELEASING!!",
            target: 5,
            timeLimit: 5,
            successMessage: "YOU HAVE SUCH PATIENCE HANNIIII!!! 😭🙏✨",
            failMessage: "ALMOST THERE SIGMAAAAA!! ONE MORE TRY!! 😭🙏💪"
        },
        {
            challenge: "CLICK THE MOVING BUTTON 5 TIMES!!",
            target: 5,
            timeLimit: 10,
            successMessage: "YOUR REFLEXES ARE AMAZING ACHUMMMMM!!! 😭🙏👏",
            failMessage: "THOSE BUTTONS ARE TRICKY!! TRY AGAIN!! 😭🙏😅"
        }
    ];
    
    // Cloud Messages
    const cloudMessages = [
        "I'M SORRY I MADE YOU ANGRY!! 😭🙏💖",
        "I PROMISE I'LL DO BETTER NEXT TIME!! 😭🙏🥺",
        "YOUR FEELINGS ARE VALID ACHUMMMMM!! 😭🙏💕",
        "I'M ALWAYS HERE FOR YOU CUTIEEEEE!! 😭🙏🫂",
        "LET'S TALK ABOUT IT HANNIIII!! 😭🙏💬",
        "I CARE ABOUT YOU SO MUCH SIGMAAAAA!! 😭🙏❤️",
        "THANK YOU FOR SHARING YOUR FEELINGS!! 😭🙏🙏",
        "YOU DESERVE TO BE HEARD AND UNDERSTOOD!! 😭🙏👂",
        "I'M LISTENING TO YOU ACHUMMMMM!! 😭🙏💖",
        "YOUR ANGER IS IMPORTANT AND VALID!! 😭🙏💯"
    ];
    
    // Whack-A-Ritu Game
    function startWhackGame() {
        if (whackGameActive) return;
        
        whackGameActive = true;
        whackScore = 0;
        whackGameContainer.innerHTML = '';
        
        // Create game board
        const gameBoard = document.createElement('div');
        gameBoard.className = 'whack-board';
        gameBoard.style.display = 'grid';
        gameBoard.style.gridTemplateColumns = 'repeat(3, 1fr)';
        gameBoard.style.gridTemplateRows = 'repeat(3, 1fr)';
        gameBoard.style.gap = '10px';
        gameBoard.style.width = '100%';
        gameBoard.style.height = '300px';
        gameBoard.style.position = 'relative';
        
        // Create holes
        for (let i = 0; i < 9; i++) {
            const hole = document.createElement('div');
            hole.className = 'hole';
            hole.style.backgroundColor = '#e0e0e0';
            hole.style.borderRadius = '50%';
            hole.style.position = 'relative';
            hole.style.overflow = 'hidden';
            hole.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.3)';
            
            gameBoard.appendChild(hole);
        }
        
        // Create score display
        const scoreDisplay = document.createElement('div');
        scoreDisplay.className = 'score-display';
        scoreDisplay.textContent = `Score: ${whackScore}`;
        scoreDisplay.style.position = 'absolute';
        scoreDisplay.style.top = '10px';
        scoreDisplay.style.left = '10px';
        scoreDisplay.style.padding = '5px 10px';
        scoreDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        scoreDisplay.style.borderRadius = '10px';
        scoreDisplay.style.fontWeight = 'bold';
        
        // Create timer display
        const timerDisplay = document.createElement('div');
        timerDisplay.className = 'timer-display';
        timerDisplay.textContent = 'Time: 30s';
        timerDisplay.style.position = 'absolute';
        timerDisplay.style.top = '10px';
        timerDisplay.style.right = '10px';
        timerDisplay.style.padding = '5px 10px';
        timerDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        timerDisplay.style.borderRadius = '10px';
        timerDisplay.style.fontWeight = 'bold';
        
        // Create message display
        const messageDisplay = document.createElement('div');
        messageDisplay.className = 'message-display';
        messageDisplay.style.position = 'absolute';
        messageDisplay.style.bottom = '10px';
        messageDisplay.style.left = '0';
        messageDisplay.style.width = '100%';
        messageDisplay.style.textAlign = 'center';
        messageDisplay.style.padding = '5px';
        messageDisplay.style.fontWeight = 'bold';
        messageDisplay.style.color = '#e91e63';
        
        // Append elements
        whackGameContainer.appendChild(gameBoard);
        whackGameContainer.appendChild(scoreDisplay);
        whackGameContainer.appendChild(timerDisplay);
        whackGameContainer.appendChild(messageDisplay);
        
        // Start game
        let timeLeft = 30;
        whackTimer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft}s`;
            
            if (timeLeft <= 0) {
                endWhackGame();
            }
        }, 1000);
        
        // Start spawning Ritu
        spawnRitu();
        
        // Change button text
        whackRituButton.textContent = 'GAME IN PROGRESS!';
    }
    
    function spawnRitu() {
        if (!whackGameActive) return;
        
        const holes = whackGameContainer.querySelectorAll('.hole');
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        
        // Create Ritu with enhanced animation
        const ritu = document.createElement('div');
        ritu.className = 'ritu animate__animated animate__bounceInUp';
        ritu.style.width = '80%';
        ritu.style.height = '80%';
        ritu.style.position = 'absolute';
        ritu.style.bottom = '-100%';
        ritu.style.left = '10%';
        ritu.style.display = 'flex';
        ritu.style.alignItems = 'center';
        ritu.style.justifyContent = 'center';
        ritu.style.cursor = 'pointer';
        ritu.style.transition = 'all 0.3s ease';
        ritu.style.transform = 'scale(1)';
        
        // Add hover effect
        ritu.addEventListener('mouseenter', () => {
            ritu.style.transform = 'scale(1.1)';
        });
        ritu.addEventListener('mouseleave', () => {
            ritu.style.transform = 'scale(1)';
        });
        
        // Create Ritu image with enhanced style
        const rituImg = document.createElement('img');
        rituImg.src = '../images/IMG_0757 - Ritu Raj Bora.jpeg';
        rituImg.alt = 'Ritu';
        rituImg.style.width = '100%';
        rituImg.style.borderRadius = '50%';
        rituImg.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
        rituImg.style.border = '2px solid #ff85a2';
        rituImg.style.height = '100%';
        rituImg.style.objectFit = 'contain';
        rituImg.style.pointerEvents = 'none';

        ritu.appendChild(rituImg);
        randomHole.appendChild(ritu);

        // Animate Ritu coming up
        setTimeout(() => {
            ritu.style.bottom = '0';
        }, 10);
        
        // Whack event with enhanced animation and effects
        ritu.addEventListener('click', function() {
            whackScore++;
            const scoreDisplay = whackGameContainer.querySelector('.score-display');
            scoreDisplay.textContent = `Score: ${whackScore}`;
            
            // Show message with animation
            const messageDisplay = whackGameContainer.querySelector('.message-display');
            messageDisplay.textContent = whackMessages[Math.floor(Math.random() * whackMessages.length)];
            messageDisplay.className = 'message-display animate__animated animate__bounceIn';
            
            // Animate score with pulse
            scoreDisplay.className = 'score-display animate__animated animate__pulse';
            setTimeout(() => {
                scoreDisplay.className = 'score-display';
            }, 500);
            
            // Enhanced hit animation
            ritu.className = 'ritu animate__animated animate__wobble';
            ritu.style.transform = 'scale(0.8) rotate(10deg)';
            ritu.style.opacity = '0.7';
            
            // Play hit sound with additional squeak
            const hitSound = new Audio('../audio/hit-sound.mp3');
            hitSound.volume = 0.3;
            hitSound.play().catch(error => console.log('Audio play failed:', error));
            
            const squeakSound = new Audio('../audio/squeak-sound.mp3');
            squeakSound.volume = 0.2;
            setTimeout(() => {
                squeakSound.play().catch(error => console.log('Audio play failed:', error));
            }, 100);
            
            // Remove Ritu with fade out animation
            setTimeout(() => {
                ritu.className = 'ritu animate__animated animate__fadeOutDown';
                setTimeout(() => {
                    if (randomHole.contains(ritu)) {
                        randomHole.removeChild(ritu);
                    }
                }, 500);
            }, 300);
        });
        
        // Auto-remove after some time
        const stayTime = Math.random() * 1000 + 800;
        setTimeout(() => {
            if (whackGameActive && randomHole.contains(ritu)) {
                ritu.style.bottom = '-100%';
                setTimeout(() => {
                    if (randomHole.contains(ritu)) {
                        randomHole.removeChild(ritu);
                    }
                }, 300);
            }
        }, stayTime);
        
        // Spawn next Ritu
        setTimeout(spawnRitu, Math.random() * 1000 + 500);
    }
    
    function endWhackGame() {
        whackGameActive = false;
        clearInterval(whackTimer);
        
        // Clear container
        whackGameContainer.innerHTML = '';
        
        // Show results
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'game-results animate__animated animate__bounceIn';
        resultsDiv.style.textAlign = 'center';
        resultsDiv.style.padding = '20px';
        
        let message = '';
        if (whackScore >= 20) {
            message = `WOW ACHUMMMMM!!! YOU HIT ME ${whackScore} TIMES!! YOU MUST BE FEELING BETTER NOW!!! 😭🙏💖`;
        } else if (whackScore >= 10) {
            message = `GREAT JOB CUTIEEEEE!!! YOU HIT ME ${whackScore} TIMES!! FEELING LESS ANGRY?? 😭🙏💕`;
        } else if (whackScore >= 5) {
            message = `NICE WORK HANNIIII!!! YOU HIT ME ${whackScore} TIMES!! 😭🙏✨`;
        } else {
            message = `YOU HIT ME ${whackScore} TIMES SIGMAAAAA!! WANT TO TRY AGAIN?? 😭🙏💪`;
        }
        
        resultsDiv.innerHTML = `
            <h3>${message}</h3>
            <button class="play-again-button">PLAY AGAIN!</button>
        `;
        
        whackGameContainer.appendChild(resultsDiv);
        
        // Play again button
        const playAgainButton = whackGameContainer.querySelector('.play-again-button');
        playAgainButton.addEventListener('click', startWhackGame);
        playAgainButton.style.padding = '0.75rem 1.5rem';
        playAgainButton.style.backgroundColor = '#ff85a2';
        playAgainButton.style.color = 'white';
        playAgainButton.style.border = 'none';
        playAgainButton.style.borderRadius = '50px';
        playAgainButton.style.cursor = 'pointer';
        playAgainButton.style.fontWeight = 'bold';
        playAgainButton.style.marginTop = '15px';
        
        // Reset button text
        whackRituButton.textContent = 'START GAME!';
    }
    
    // Beat Ritu Game
    function startBeatGame() {
        if (beatGameActive) return;
        
        beatGameActive = true;
        currentChallenge = Math.floor(Math.random() * beatChallenges.length);
        beatGameContainer.innerHTML = '';
        
        // Get current challenge
        const challenge = beatChallenges[currentChallenge];
        
        // Create challenge container with enhanced animation
        const challengeDiv = document.createElement('div');
        challengeDiv.className = 'challenge-container animate__animated animate__bounceIn';
        challengeDiv.style.textAlign = 'center';
        challengeDiv.style.padding = '20px';
        challengeDiv.style.backgroundColor = 'rgba(255, 133, 162, 0.1)';
        challengeDiv.style.borderRadius = '20px';
        challengeDiv.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        
        // Challenge text with animation
        const challengeText = document.createElement('h3');
        challengeText.className = 'animate__animated animate__rubberBand';
        challengeText.textContent = challenge.challenge;
        challengeText.style.marginBottom = '20px';
        challengeText.style.color = '#9c27b0';
        challengeText.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.1)';
        
        // Timer display with enhanced style
        const timerDisplay = document.createElement('div');
        timerDisplay.className = 'challenge-timer animate__animated animate__fadeIn';
        timerDisplay.textContent = `Time: ${challenge.timeLimit}s`;
        timerDisplay.style.marginBottom = '20px';
        timerDisplay.style.fontWeight = 'bold';
        timerDisplay.style.fontSize = '1.2rem';
        timerDisplay.style.color = '#e91e63';
        
        // Progress display with enhanced style
        const progressDisplay = document.createElement('div');
        progressDisplay.className = 'challenge-progress animate__animated animate__fadeIn';
        progressDisplay.textContent = `Progress: 0/${challenge.target}`;
        progressDisplay.style.marginBottom = '20px';
        progressDisplay.style.fontWeight = 'bold';
        progressDisplay.style.fontSize = '1.2rem';
        progressDisplay.style.color = '#2196f3';
        
        // Challenge button with enhanced style and hover effect
        const challengeButton = document.createElement('button');
        challengeButton.className = 'challenge-button animate__animated animate__pulse animate__infinite';
        challengeButton.textContent = 'CLICK ME!';
        challengeButton.style.padding = '1rem 2rem';
        challengeButton.style.backgroundColor = '#ff85a2';
        challengeButton.style.color = 'white';
        challengeButton.style.border = 'none';
        challengeButton.style.borderRadius = '50px';
        challengeButton.style.cursor = 'pointer';
        challengeButton.style.fontWeight = 'bold';
        challengeButton.style.fontSize = '1.2rem';
        challengeButton.style.transition = 'all 0.3s ease';
        challengeButton.style.boxShadow = '0 4px 15px rgba(255, 133, 162, 0.4)';
        
        challengeButton.addEventListener('mouseenter', () => {
            challengeButton.style.transform = 'scale(1.05)';
            challengeButton.style.boxShadow = '0 6px 20px rgba(255, 133, 162, 0.6)';
        });
        
        challengeButton.addEventListener('mouseleave', () => {
            challengeButton.style.transform = 'scale(1)';
            challengeButton.style.boxShadow = '0 4px 15px rgba(255, 133, 162, 0.4)';
        });
        
        // Append elements
        challengeDiv.appendChild(challengeText);
        challengeDiv.appendChild(timerDisplay);
        challengeDiv.appendChild(progressDisplay);
        challengeDiv.appendChild(challengeButton);
        beatGameContainer.appendChild(challengeDiv);
        
        // Challenge specific setup
        let progress = 0;
        let timeLeft = challenge.timeLimit;
        let challengeTimer;
        let buttonHoldStart = 0;
        let buttonHoldTimer;
        
        switch (currentChallenge) {
            case 0: // Click fast challenge
                challengeButton.addEventListener('click', function() {
                    progress++;
                    progressDisplay.textContent = `Progress: ${progress}/${challenge.target}`;
                    
                    // Play click sound
                    const clickSound = new Audio('../audio/click-sound.mp3');
                    clickSound.volume = 0.3;
                    clickSound.play().catch(error => console.log('Audio play failed:', error));
                    
                    if (progress >= challenge.target) {
                        clearInterval(challengeTimer);
                        challengeComplete(true);
                    }
                });
                break;
                
            case 1: // Hold button challenge
                challengeButton.addEventListener('mousedown', function() {
                    buttonHoldStart = Date.now();
                    buttonHoldTimer = setInterval(() => {
                        const holdTime = (Date.now() - buttonHoldStart) / 1000;
                        progress = Math.min(holdTime, challenge.target);
                        progressDisplay.textContent = `Progress: ${progress.toFixed(1)}/${challenge.target}`;
                        
                        if (progress >= challenge.target) {
                            clearInterval(buttonHoldTimer);
                            clearInterval(challengeTimer);
                            challengeComplete(true);
                        }
                    }, 100);
                });
                
                challengeButton.addEventListener('mouseup', function() {
                    clearInterval(buttonHoldTimer);
                    if (progress < challenge.target) {
                        progress = 0;
                        progressDisplay.textContent = `Progress: ${progress}/${challenge.target}`;
                    }
                });
                
                challengeButton.addEventListener('mouseleave', function() {
                    clearInterval(buttonHoldTimer);
                    if (progress < challenge.target) {
                        progress = 0;
                        progressDisplay.textContent = `Progress: ${progress}/${challenge.target}`;
                    }
                });
                break;
                
            case 2: // Moving button challenge
                moveButton(challengeButton);
                
                challengeButton.addEventListener('click', function() {
                    progress++;
                    progressDisplay.textContent = `Progress: ${progress}/${challenge.target}`;
                    
                    // Play click sound
                    const clickSound = new Audio('../audio/click-sound.mp3');
                    clickSound.volume = 0.3;
                    clickSound.play().catch(error => console.log('Audio play failed:', error));
                    
                    if (progress < challenge.target) {
                        moveButton(challengeButton);
                    } else {
                        clearInterval(challengeTimer);
                        challengeComplete(true);
                    }
                });
                break;
        }
        
        // Start timer
        challengeTimer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft}s`;
            
            if (timeLeft <= 0) {
                clearInterval(challengeTimer);
                if (currentChallenge === 1) clearInterval(buttonHoldTimer);
                challengeComplete(false);
            }
        }, 1000);
        
        // Change button text
        beatRituButton.textContent = 'CHALLENGE IN PROGRESS!';
    }
    
    function moveButton(button) {
        const container = beatGameContainer;
        const maxX = container.clientWidth - button.clientWidth - 40;
        const maxY = container.clientHeight - button.clientHeight - 40;
        
        const randomX = Math.max(0, Math.floor(Math.random() * maxX));
        const randomY = Math.max(0, Math.floor(Math.random() * maxY));
        
        button.style.position = 'absolute';
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
    }
    
    function challengeComplete(success) {
        beatGameActive = false;
        
        // Get challenge
        const challenge = beatChallenges[currentChallenge];
        
        // Clear container
        beatGameContainer.innerHTML = '';
        
        // Show results
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'challenge-results animate__animated animate__bounceIn';
        resultsDiv.style.textAlign = 'center';
        resultsDiv.style.padding = '20px';
        
        if (success) {
            resultsDiv.innerHTML = `
                <h3>${challenge.successMessage}</h3>
                <button class="next-challenge-button">TRY ANOTHER CHALLENGE!</button>
            `;
        } else {
            resultsDiv.innerHTML = `
                <h3>${challenge.failMessage}</h3>
                <button class="try-again-button">TRY AGAIN!</button>
                <button class="next-challenge-button">TRY ANOTHER CHALLENGE!</button>
            `;
            
            // Try again button
            const tryAgainButton = resultsDiv.querySelector('.try-again-button');
            tryAgainButton.addEventListener('click', function() {
                startBeatGame();
                currentChallenge = currentChallenge; // Keep same challenge
            });
            tryAgainButton.style.padding = '0.75rem 1.5rem';
            tryAgainButton.style.backgroundColor = '#ff85a2';
            tryAgainButton.style.color = 'white';
            tryAgainButton.style.border = 'none';
            tryAgainButton.style.borderRadius = '50px';
            tryAgainButton.style.cursor = 'pointer';
            tryAgainButton.style.fontWeight = 'bold';
            tryAgainButton.style.marginRight = '10px';
        }
        
        beatGameContainer.appendChild(resultsDiv);
        
        // Next challenge button
        const nextChallengeButton = resultsDiv.querySelector('.next-challenge-button');
        nextChallengeButton.addEventListener('click', startBeatGame);
        nextChallengeButton.style.padding = '0.75rem 1.5rem';
        nextChallengeButton.style.backgroundColor = '#ff85a2';
        nextChallengeButton.style.color = 'white';
        nextChallengeButton.style.border = 'none';
        nextChallengeButton.style.borderRadius = '50px';
        nextChallengeButton.style.cursor = 'pointer';
        nextChallengeButton.style.fontWeight = 'bold';
        nextChallengeButton.style.marginTop = '15px';
        
        // Reset button text
        beatRituButton.textContent = 'START CHALLENGE!';
    }
    
    // Cloud Game
    function startCloudGame() {
        if (cloudGameActive) return;
        
        cloudGameActive = true;
        cloudsPopped = 0;
        cloudGameContainer.innerHTML = '';
        
        // Create clouds container
        const cloudsContainer = document.createElement('div');
        cloudsContainer.className = 'clouds-container';
        cloudsContainer.style.position = 'relative';
        cloudsContainer.style.width = '100%';
        cloudsContainer.style.height = '300px';
        cloudsContainer.style.overflow = 'hidden';
        
        // Create counter display
        const counterDisplay = document.createElement('div');
        counterDisplay.className = 'counter-display';
        counterDisplay.textContent = `Clouds Popped: ${cloudsPopped}/10`;
        counterDisplay.style.position = 'absolute';
        counterDisplay.style.top = '10px';
        counterDisplay.style.left = '10px';
        counterDisplay.style.padding = '5px 10px';
        counterDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        counterDisplay.style.borderRadius = '10px';
        counterDisplay.style.fontWeight = 'bold';
        counterDisplay.style.zIndex = '10';
        
        // Append elements
        cloudGameContainer.appendChild(cloudsContainer);
        cloudGameContainer.appendChild(counterDisplay);
        
        // Create clouds
        for (let i = 0; i < 10; i++) {
            createCloud(cloudsContainer, counterDisplay);
        }
        
        // Change button text
        popCloudsButton.textContent = 'GAME IN PROGRESS!';
    }
    
    function createCloud(container, counter) {
        // Create cloud with enhanced style
        const cloud = document.createElement('div');
        cloud.className = 'angry-cloud animate__animated animate__fadeIn';
        cloud.style.position = 'absolute';
        cloud.style.width = '80px';
        cloud.style.height = '50px';
        cloud.style.backgroundColor = '#8c8c8c';
        cloud.style.borderRadius = '25px';
        cloud.style.cursor = 'pointer';
        cloud.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        cloud.style.transition = 'all 0.3s ease';
        
        // Add hover effect
        cloud.addEventListener('mouseenter', () => {
            cloud.style.transform = 'scale(1.1)';
            cloud.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
            cloud.style.backgroundColor = '#7c7c7c';
        });
        
        cloud.addEventListener('mouseleave', () => {
            cloud.style.transform = 'scale(1)';
            cloud.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
            cloud.style.backgroundColor = '#8c8c8c';
        });
        
        // Add enhanced cloud details with gradient
        const cloudDetails = document.createElement('div');
        cloudDetails.style.position = 'absolute';
        cloudDetails.style.bottom = '-10px';
        cloudDetails.style.left = '10px';
        cloudDetails.style.width = '30px';
        cloudDetails.style.height = '30px';
        cloudDetails.style.backgroundColor = '#8c8c8c';
        cloudDetails.style.borderRadius = '50%';
        cloudDetails.style.boxShadow = 'inset -2px -2px 4px rgba(0, 0, 0, 0.2)';
        cloud.appendChild(cloudDetails);
        
        const cloudDetails2 = document.createElement('div');
        cloudDetails2.style.position = 'absolute';
        cloudDetails2.style.bottom = '-5px';
        cloudDetails2.style.left = '30px';
        cloudDetails2.style.width = '25px';
        cloudDetails2.style.height = '25px';
        cloudDetails2.style.backgroundColor = '#8c8c8c';
        cloudDetails2.style.borderRadius = '50%';
        cloudDetails2.style.boxShadow = 'inset -2px -2px 4px rgba(0, 0, 0, 0.2)';
        cloud.appendChild(cloudDetails2);
        
        // Add enhanced angry face with animations
        const angryFace = document.createElement('div');
        angryFace.className = 'angry-face animate__animated animate__headShake animate__infinite';
        angryFace.style.position = 'relative';
        angryFace.style.width = '100%';
        angryFace.style.height = '100%';
        
        // Enhanced eyes with glow effect
        const leftEye = document.createElement('div');
        leftEye.style.position = 'absolute';
        leftEye.style.top = '15px';
        leftEye.style.left = '20px';
        leftEye.style.width = '10px';
        leftEye.style.height = '10px';
        leftEye.style.backgroundColor = 'white';
        leftEye.style.borderRadius = '50%';
        leftEye.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
        angryFace.appendChild(leftEye);
        
        const rightEye = document.createElement('div');
        rightEye.style.position = 'absolute';
        rightEye.style.top = '15px';
        rightEye.style.right = '20px';
        rightEye.style.width = '10px';
        rightEye.style.height = '10px';
        rightEye.style.backgroundColor = 'white';
        rightEye.style.borderRadius = '50%';
        rightEye.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
        angryFace.appendChild(rightEye);
        
        // Enhanced eyebrows with thicker style
        const leftEyebrow = document.createElement('div');
        leftEyebrow.style.position = 'absolute';
        leftEyebrow.style.top = '10px';
        leftEyebrow.style.left = '15px';
        leftEyebrow.style.width = '15px';
        leftEyebrow.style.height = '4px';
        leftEyebrow.style.backgroundColor = 'white';
        leftEyebrow.style.transform = 'rotate(-30deg)';
        leftEyebrow.style.borderRadius = '2px';
        leftEyebrow.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.5)';
        angryFace.appendChild(leftEyebrow);
        
        const rightEyebrow = document.createElement('div');
        rightEyebrow.style.position = 'absolute';
        rightEyebrow.style.top = '10px';
        rightEyebrow.style.right = '15px';
        rightEyebrow.style.width = '15px';
        rightEyebrow.style.height = '4px';
        rightEyebrow.style.backgroundColor = 'white';
        rightEyebrow.style.transform = 'rotate(30deg)';
        rightEyebrow.style.borderRadius = '2px';
        rightEyebrow.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.5)';
        angryFace.appendChild(rightEyebrow);
        
        // Enhanced mouth with gradient
        const mouth = document.createElement('div');
        mouth.style.position = 'absolute';
        mouth.style.bottom = '10px';
        mouth.style.left = '30px';
        mouth.style.width = '20px';
        mouth.style.height = '4px';
        mouth.style.backgroundColor = 'white';
        mouth.style.borderRadius = '2px';
        mouth.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.5)';
        angryFace.appendChild(mouth);
        
        cloud.appendChild(angryFace);
        
        // Random position
        const left = Math.random() * (container.offsetWidth - 80);
        const top = Math.random() * (container.offsetHeight - 50);
        cloud.style.left = `${left}px`;
        cloud.style.top = `${top}px`;
        
        // Random movement
        let directionX = Math.random() > 0.5 ? 1 : -1;
        let directionY = Math.random() > 0.5 ? 1 : -1;
        let speed = Math.random() * 1 + 0.5;
        
        function moveCloud() {
            if (!cloudGameActive) return;
            
            let currentLeft = parseFloat(cloud.style.left);
            let currentTop = parseFloat(cloud.style.top);
            
            // Bounce off edges
            if (currentLeft <= 0 || currentLeft >= container.offsetWidth - 80) {
                directionX *= -1;
            }
            
            if (currentTop <= 0 || currentTop >= container.offsetHeight - 50) {
                directionY *= -1;
            }
            
            // Move cloud
            cloud.style.left = `${currentLeft + directionX * speed}px`;
            cloud.style.top = `${currentTop + directionY * speed}px`;
            
            // Continue movement
            requestAnimationFrame(moveCloud);
        }
        
        // Start movement
        moveCloud();
        
        // Click event
        cloud.addEventListener('click', function() {
            // Stop movement
            cloudGameActive = false;
            
            // Enhanced pop animation with multiple effects
            cloud.style.transform = 'scale(1.2)';
            cloud.style.filter = 'brightness(1.5)';
            setTimeout(() => {
                cloud.classList.add('animate__animated', 'animate__bounceOut');
            }, 100);
            
            // Play enhanced sound effects
            const popSound = new Audio('../audio/pop-sound.mp3');
            popSound.volume = 0.3;
            popSound.play().catch(error => console.log('Audio play failed:', error));
            
            const wooshSound = new Audio('../audio/woosh-sound.mp3');
            wooshSound.volume = 0.2;
            setTimeout(() => {
                wooshSound.play().catch(error => console.log('Audio play failed:', error));
            }, 100);
            
            // Remove cloud after animation
            setTimeout(() => {
                if (container.contains(cloud)) {
                    container.removeChild(cloud);
                    
                    // Show heart or message
                    showHeartOrMessage(left, top, container);
                    
                    // Update counter
                    cloudsPopped++;
                    counter.textContent = `Clouds Popped: ${cloudsPopped}/10`;
                    
                    // Check if game is complete
                    if (cloudsPopped >= 10) {
                        endCloudGame();
                    } else {
                        // Resume game
                        cloudGameActive = true;
                    }
                }
            }, 500);
        });
        
        container.appendChild(cloud);
    }
    
    function showHeartOrMessage(left, top, container) {
        // 50% chance for heart, 50% for message
        if (Math.random() > 0.5) {
            // Show heart with enhanced animation
            const heart = document.createElement('div');
            heart.className = 'cloud-heart animate__animated animate__bounceIn';
            heart.innerHTML = '💖';
            heart.style.position = 'absolute';
            heart.style.left = `${left + 30}px`;
            heart.style.top = `${top + 15}px`;
            heart.style.fontSize = '24px';
            heart.style.filter = 'drop-shadow(0 0 5px rgba(255, 133, 162, 0.5))';
            heart.style.transform = 'scale(0)';
            
            // Add floating animation
            setTimeout(() => {
                heart.style.transform = 'scale(1)';
                heart.style.transition = 'all 0.5s ease';
                let floatUp = true;
                
                const floatAnimation = setInterval(() => {
                    if (floatUp) {
                        heart.style.transform = 'scale(1) translateY(-10px)';
                    } else {
                        heart.style.transform = 'scale(1) translateY(0px)';
                    }
                    floatUp = !floatUp;
                }, 1000);
                
                // Clear animation and remove heart after some time
                setTimeout(() => {
                    clearInterval(floatAnimation);
                    heart.className = 'cloud-heart animate__animated animate__fadeOutUp';
                    setTimeout(() => container.removeChild(heart), 1000);
                }, 3000);
            }, 100);
            heart.style.fontSize = '30px';
            heart.style.zIndex = '5';
            
            container.appendChild(heart);
            
            // Enhanced floating animation with sparkles
            setTimeout(() => {
                heart.style.transition = 'all 1s ease';
                let floatUp = true;
                const floatAnimation = setInterval(() => {
                    if (floatUp) {
                        heart.style.transform = 'translateY(-20px) scale(1.1)';
                    } else {
                        heart.style.transform = 'translateY(0px) scale(1)';
                    }
                    floatUp = !floatUp;
                }, 1000);
                
                // Fade out with enhanced animation
                setTimeout(() => {
                    clearInterval(floatAnimation);
                    heart.className = 'cloud-heart animate__animated animate__fadeOutUp';
                    setTimeout(() => container.removeChild(heart), 1000);
                }, 3000);
            }, 100);
        } else {
            // Show message with enhanced styling and animation
            const message = document.createElement('div');
            message.className = 'cloud-message animate__animated animate__bounceIn';
            message.textContent = cloudMessages[Math.floor(Math.random() * cloudMessages.length)];
            message.style.position = 'absolute';
            message.style.left = `${left - 50}px`;
            message.style.top = `${top - 30}px`;
            message.style.backgroundColor = 'rgba(255, 133, 162, 0.9)';
            message.style.padding = '10px 20px';
            message.style.borderRadius = '20px';
            message.style.fontSize = '14px';
            message.style.whiteSpace = 'nowrap';
            message.style.zIndex = '10';
            message.style.boxShadow = '0 4px 15px rgba(255, 133, 162, 0.3)';
            message.style.color = 'white';
            message.style.transform = 'scale(0)';
            
            container.appendChild(message);
            
            // Enhanced pop-in and float animation
            setTimeout(() => {
                message.style.transform = 'scale(1)';
                message.style.transition = 'all 0.3s ease';
                
                let floatUp = true;
                const floatAnimation = setInterval(() => {
                    if (floatUp) {
                        message.style.transform = 'translateY(-5px)';
                    } else {
                        message.style.transform = 'translateY(0px)';
                    }
                    floatUp = !floatUp;
                }, 1000);
                
                // Enhanced fade out
                setTimeout(() => {
                    clearInterval(floatAnimation);
                    message.className = 'cloud-message animate__animated animate__fadeOutUp';
                    setTimeout(() => container.removeChild(message), 1000);
                }, 3000);
            }, 100);
        }
    }
    
    function endCloudGame() {
        cloudGameActive = false;
        
        // Clear container
        cloudGameContainer.innerHTML = '';
        
        // Show results
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'game-results animate__animated animate__bounceIn';
        resultsDiv.style.textAlign = 'center';
        resultsDiv.style.padding = '20px';
        
        resultsDiv.innerHTML = `
            <h3>YAYYYY ACHUMMMMM!!! YOU POPPED ALL THE ANGRY CLOUDS!!! 😭🙏💖</h3>
            <p>I HOPE YOU FEEL BETTER NOW!!! 😭🙏✨</p>
            <button class="play-again-button">PLAY AGAIN!</button>
        `;
        
        cloudGameContainer.appendChild(resultsDiv);
        
        // Play again button
        const playAgainButton = cloudGameContainer.querySelector('.play-again-button');
        playAgainButton.addEventListener('click', startCloudGame);
        playAgainButton.style.padding = '0.75rem 1.5rem';
        playAgainButton.style.backgroundColor = '#ff85a2';
        playAgainButton.style.color = 'white';
        playAgainButton.style.border = 'none';
        playAgainButton.style.borderRadius = '50px';
        playAgainButton.style.cursor = 'pointer';
        playAgainButton.style.fontWeight = 'bold';
        playAgainButton.style.marginTop = '15px';
        
        // Reset button text
        popCloudsButton.textContent = 'START GAME!';
    }
});