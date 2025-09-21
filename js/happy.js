// Happy Portal Functionality for Achum's Special Place

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startHeartsButton = document.getElementById('start-hearts');
    const startBalloonButton = document.getElementById('start-balloon');
    const startQuizButton = document.getElementById('start-quiz');

    const heartsGameContainer = document.getElementById('hearts-game-container');
    const balloonGameContainer = document.getElementById('balloon-game-container');
    const quizGameContainer = document.getElementById('quiz-game-container');

    // Guard event listeners to prevent runtime errors if elements are missing
    if (startHeartsButton) startHeartsButton.addEventListener('click', startHeartsGame);
    if (startBalloonButton) startBalloonButton.addEventListener('click', startBalloonGame);
    if (startQuizButton) startQuizButton.addEventListener('click', startQuizGame);
    
    // Event Listeners
    startHeartsButton.addEventListener('click', startHeartsGame);
    startBalloonButton.addEventListener('click', startBalloonGame);
    startQuizButton.addEventListener('click', startQuizGame);
    
    // Game Variables
    let heartsGameActive = false;
    let heartsScore = 0;
    let heartsTimer = null;
    
    let balloonGameActive = false;
    let balloonPairs = [];
    let flippedCards = [];
    let matchedPairs = 0;
    
    let quizGameActive = false;
    let currentQuestionIndex = 0;
    
    // Heart Messages
    const heartMessages = [
        "ACHUMMMMM!!! YOU'RE AMAZING!! 😭🙏💖",
        "I LOVE YOUR SMILE SO MUCH!! 😭🙏😊",
        "YOU MAKE MY HEART FLUTTER!! 😭🙏💓",
        "CUTIEEEEE!! YOU'RE THE BEST!! 😭🙏✨",
        "HANNIIII!! YOU LIGHT UP MY DAY!! 😭🙏☀️",
        "SIGMAAAAA!! YOU'RE MY FAVORITE!! 😭🙏💕",
        "YOUR LAUGH IS MY FAVORITE SOUND!! 😭🙏🎵",
        "I THINK ABOUT YOU ALL THE TIME!! 😭🙏💭",
        "YOU'RE THE SWEETEST PERSON EVER!! 😭🙏🍯",
        "I CHERISH OUR FRIENDSHIP SO MUCH!! 😭🙏🫂"
    ];
    
    // Balloon Messages
    const balloonMessages = [
        {text: "Remember when we stayed up all night talking? 😭🙏", type: "memory"},
        {text: "Your eyes sparkle when you talk about Kuromi! 😭🙏💜", type: "compliment"},
        {text: "You prefer sweet over savory snacks! 😭🙏🍬", type: "fact"},
        {text: "That time we got lost but had the best adventure! 😭🙏🗺️", type: "memory"},
        {text: "Your creativity inspires me every day! 😭🙏🎨", type: "compliment"},
        {text: "Your favorite color is lavender! 😭🙏💜", type: "fact"},
        {text: "Remember our inside joke about the penguin? 😭🙏🐧", type: "memory"},
        {text: "You have the most contagious laugh ever! 😭🙏😂", type: "compliment"},
        {text: "You always put others before yourself! 😭🙏💖", type: "fact"},
        {text: "That time we danced in the rain together! 😭🙏🌧️", type: "memory"},
        {text: "Your kindness makes the world better! 😭🙏✨", type: "compliment"},
        {text: "You can't sleep without your favorite plushie! 😭🙏🧸", type: "fact"}
    ];
    
    // Quiz Questions
    const quizQuestions = [
        {
            question: "What's Achum's favorite Kuromi accessory?",
            options: ["Keychain", "Plushie", "Hairpin", "Notebook"],
            answer: 1
        },
        {
            question: "Which Wave to Earth song is Achum's favorite?",
            options: ["Seasons", "Light", "Homesick", "Secret"],
            answer: 0
        },
        {
            question: "What's Achum's go-to Lays flavor?",
            options: ["Classic", "Orange", "Sour Cream", "Barbecue"],
            answer: 1
        },
        {
            question: "Which NewJeans member does Achum love the most?",
            options: ["Minji", "Hanni", "Danielle", "Haerin"],
            answer: 1
        },
        {
            question: "What flower makes Achum smile the most?",
            options: ["Rose", "Sunflower", "Tulip", "Lily"],
            answer: 2
        }
    ];
    
    // Game Functions
    function startHeartsGame() {
        if (heartsGameActive) return;
        
        heartsGameActive = true;
        heartsScore = 0;
        heartsGameContainer.innerHTML = '';
        
        // Create score display
        const scoreDisplay = document.createElement('div');
        scoreDisplay.className = 'score-display';
        scoreDisplay.textContent = `Hearts Caught: ${heartsScore}`;
        scoreDisplay.style.position = 'absolute';
        scoreDisplay.style.top = '10px';
        scoreDisplay.style.left = '10px';
        scoreDisplay.style.padding = '5px 10px';
        scoreDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        scoreDisplay.style.borderRadius = '10px';
        scoreDisplay.style.fontWeight = 'bold';
        heartsGameContainer.appendChild(scoreDisplay);
        
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
        heartsGameContainer.appendChild(timerDisplay);
        
        // Set container style
        heartsGameContainer.style.position = 'relative';
        heartsGameContainer.style.height = '300px';
        heartsGameContainer.style.overflow = 'hidden';
        
        // Start spawning hearts
        spawnHeart();
        
        // Start timer
        let timeLeft = 30;
        heartsTimer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft}s`;
            
            if (timeLeft <= 0) {
                endHeartsGame(scoreDisplay);
            }
        }, 1000);
        
        // Change button text
        startHeartsButton.textContent = 'GAME IN PROGRESS!';
    }
    
    function spawnHeart() {
        if (!heartsGameActive) return;
        
        const heart = document.createElement('div');
        heart.className = 'game-heart animate__animated animate__fadeIn';
        heart.style.position = 'absolute';
        heart.style.width = '40px';
        heart.style.height = '40px';
        heart.style.backgroundImage = 'url("../images/kuromi-heart.webp")';
        heart.style.backgroundSize = 'contain';
        heart.style.backgroundRepeat = 'no-repeat';
        heart.style.cursor = 'pointer';
        heart.style.zIndex = '100';
        
        // Random position with padding
        const padding = 40;
        const left = padding + Math.random() * (heartsGameContainer.offsetWidth - 2 * padding);
        const top = padding + Math.random() * (heartsGameContainer.offsetHeight - 2 * padding);
        heart.style.left = `${left}px`;
        heart.style.top = `${top}px`;
        
        // Click event
        heart.addEventListener('click', function() {
            // Play pop sound
            const popSound = new Audio('../audio/pop-sound.mp3');
            popSound.volume = 0.3;
            popSound.play().catch(error => console.log('Audio play failed:', error));
            
            heartsScore++;
            const scoreDisplay = heartsGameContainer.querySelector('.score-display');
            scoreDisplay.textContent = `Hearts Caught: ${heartsScore}`;
            
            // Show message
            showHeartMessage(left, top);
            
            // Remove heart with bounce animation
            heart.classList.remove('animate__fadeIn');
            heart.classList.add('animate__bounceOut');
            setTimeout(() => {
                if (heartsGameContainer.contains(heart)) {
                    heartsGameContainer.removeChild(heart);
                }
            }, 500);
        });
        
        heartsGameContainer.appendChild(heart);
        
        // Auto-remove after some time
        setTimeout(() => {
            if (heartsGameActive && heartsGameContainer.contains(heart)) {
                heart.classList.add('animate__fadeOut');
                setTimeout(() => {
                    if (heartsGameContainer.contains(heart)) {
                        heartsGameContainer.removeChild(heart);
                    }
                }, 500);
            }
        }, 2000);
        
        // Spawn next heart
        setTimeout(spawnHeart, Math.random() * 500 + 300);
    }
    
    function showHeartMessage(left, top) {
        const message = document.createElement('div');
        message.className = 'heart-message animate__animated animate__fadeIn';
        message.textContent = heartMessages[Math.floor(Math.random() * heartMessages.length)];
        message.style.position = 'absolute';
        message.style.left = `${left}px`;
        message.style.top = `${top - 30}px`;
        message.style.backgroundColor = 'rgba(255, 192, 203, 0.8)';
        message.style.padding = '5px 10px';
        message.style.borderRadius = '10px';
        message.style.fontSize = '12px';
        message.style.whiteSpace = 'nowrap';
        message.style.zIndex = '10';
        
        heartsGameContainer.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('animate__fadeOut');
            setTimeout(() => {
                if (heartsGameContainer.contains(message)) {
                    heartsGameContainer.removeChild(message);
                }
            }, 500);
        }, 1500);
    }
    
    function endHeartsGame(scoreDisplay) {
        heartsGameActive = false;
        clearInterval(heartsTimer);
        
        // Clear container
        heartsGameContainer.innerHTML = '';
        
        // Show results
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'game-results animate__animated animate__bounceIn';
        resultsDiv.style.textAlign = 'center';
        resultsDiv.style.padding = '20px';
        
        let message = '';
        if (heartsScore >= 15) {
            message = `WOW ACHUMMMMM!!! YOU CAUGHT ${heartsScore} HEARTS!! YOU'RE AMAZING!!! 😭🙏💖`;
        } else if (heartsScore >= 10) {
            message = `GREAT JOB CUTIEEEEE!!! YOU CAUGHT ${heartsScore} HEARTS!! 😭🙏💕`;
        } else if (heartsScore >= 5) {
            message = `NICE WORK HANNIIII!!! YOU CAUGHT ${heartsScore} HEARTS!! 😭🙏✨`;
        } else {
            message = `YOU CAUGHT ${heartsScore} HEARTS SIGMAAAAA!! TRY AGAIN FOR MORE!! 😭🙏💪`;
        }
        
        resultsDiv.innerHTML = `
            <h3>${message}</h3>
            <button class="play-again-button">PLAY AGAIN!</button>
        `;
        
        heartsGameContainer.appendChild(resultsDiv);
        
        // Play again button
        const playAgainButton = heartsGameContainer.querySelector('.play-again-button');
        playAgainButton.addEventListener('click', startHeartsGame);
        playAgainButton.style.padding = '0.75rem 1.5rem';
        playAgainButton.style.backgroundColor = '#ff85a2';
        playAgainButton.style.color = 'white';
        playAgainButton.style.border = 'none';
        playAgainButton.style.borderRadius = '50px';
        playAgainButton.style.cursor = 'pointer';
        playAgainButton.style.fontWeight = 'bold';
        playAgainButton.style.marginTop = '15px';
        
        // Reset button text
        startHeartsButton.textContent = 'START GAME!';
    }
    
    function startBalloonGame() {
        if (balloonGameActive) return;
        
        balloonGameActive = true;
        balloonGameContainer.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        
        // Create a shuffled array of pairs
        balloonPairs = [];
        for (let i = 0; i < 6; i++) {
            const message = balloonMessages[i];
            balloonPairs.push({ id: i, message: message });
            balloonPairs.push({ id: i, message: message });
        }
        
        // Shuffle the array
        balloonPairs.sort(() => Math.random() - 0.5);
        
        // Create the game grid
        const gameGrid = document.createElement('div');
        gameGrid.className = 'balloon-grid';
        gameGrid.style.display = 'grid';
        gameGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
        gameGrid.style.gap = '10px';
        gameGrid.style.width = '100%';
        gameGrid.style.height = '100%';
        
        balloonPairs.forEach((pair, index) => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.dataset.id = pair.id;
            balloon.dataset.index = index;
            balloon.style.backgroundColor = '#ff85a2';
            balloon.style.borderRadius = '10px';
            balloon.style.height = '80px';
            balloon.style.display = 'flex';
            balloon.style.justifyContent = 'center';
            balloon.style.alignItems = 'center';
            balloon.style.cursor = 'pointer';
            balloon.style.transition = 'transform 0.3s ease';
            balloon.style.transform = 'rotateY(0deg)';
            balloon.style.position = 'relative';
            
            // Front face (balloon)
            const front = document.createElement('div');
            front.className = 'balloon-front';
            front.innerHTML = '🎈';
            front.style.fontSize = '2rem';
            front.style.position = 'absolute';
            front.style.backfaceVisibility = 'hidden';
            balloon.appendChild(front);
            
            // Back face (message)
            const back = document.createElement('div');
            back.className = 'balloon-back';
            back.textContent = pair.message.text;
            back.style.fontSize = '0.7rem';
            back.style.padding = '5px';
            back.style.textAlign = 'center';
            back.style.position = 'absolute';
            back.style.backfaceVisibility = 'hidden';
            back.style.transform = 'rotateY(180deg)';
            back.style.width = '100%';
            balloon.appendChild(back);
            
            // Add type indicator
            const typeIndicator = document.createElement('div');
            typeIndicator.className = 'type-indicator';
            typeIndicator.style.position = 'absolute';
            typeIndicator.style.bottom = '5px';
            typeIndicator.style.right = '5px';
            typeIndicator.style.fontSize = '0.6rem';
            typeIndicator.style.fontWeight = 'bold';
            
            switch(pair.message.type) {
                case 'memory':
                    typeIndicator.textContent = 'Memory';
                    typeIndicator.style.color = '#9c27b0';
                    break;
                case 'compliment':
                    typeIndicator.textContent = 'Compliment';
                    typeIndicator.style.color = '#e91e63';
                    break;
                case 'fact':
                    typeIndicator.textContent = 'Fact';
                    typeIndicator.style.color = '#2196f3';
                    break;
            }
            
            back.appendChild(typeIndicator);
            
            // Click event
            balloon.addEventListener('click', function() {
                if (flippedCards.length < 2 && !flippedCards.includes(balloon) && !balloon.classList.contains('matched')) {
                    flipBalloon(balloon);
                    flippedCards.push(balloon);
                    
                    if (flippedCards.length === 2) {
                        checkForMatch();
                    }
                }
            });
            
            gameGrid.appendChild(balloon);
        });
        
        balloonGameContainer.appendChild(gameGrid);
        
        // Change button text
        startBalloonButton.textContent = 'GAME IN PROGRESS!';
    }
    
    function flipBalloon(balloon) {
    // Play flip sound
    const flipSound = new Audio('../audio/flip-sound.mp3');
    flipSound.volume = 0.3;
    flipSound.play().catch(error => console.log('Audio play failed:', error));
    
    // Add flip animation
    balloon.classList.add('animate__animated', 'animate__flipInY');
    balloon.style.transform = 'rotateY(180deg)';
}
    
    function unflipBalloons() {
        flippedCards.forEach(balloon => {
            setTimeout(() => {
                balloon.style.transform = 'rotateY(0deg)';
            }, 1000);
        });
        
        setTimeout(() => {
            flippedCards = [];
        }, 1000);
    }
    
    function checkForMatch() {
    const firstId = flippedCards[0].dataset.id;
    const secondId = flippedCards[1].dataset.id;
    
    if (firstId === secondId) {
        // Match found
        // Play match sound
        const matchSound = new Audio('../audio/match-sound.mp3');
        matchSound.volume = 0.3;
        matchSound.play().catch(error => console.log('Audio play failed:', error));
        
        flippedCards.forEach(balloon => {
            balloon.classList.add('matched', 'animate__animated', 'animate__pulse');
            balloon.style.backgroundColor = '#a5d6a7';
            balloon.style.cursor = 'default';
        });
        
        matchedPairs++;
        flippedCards = [];
        
        // Check if game is complete
        if (matchedPairs === 6) {
            setTimeout(endBalloonGame, 1000);
        }
    } else {
        // No match
        // Play no-match sound
        const noMatchSound = new Audio('../audio/no-match-sound.mp3');
        noMatchSound.volume = 0.3;
        noMatchSound.play().catch(error => console.log('Audio play failed:', error));
        
        unflipBalloons();
    }
    }
    
    function endBalloonGame() {
        balloonGameActive = false;
        
        // Clear container
        balloonGameContainer.innerHTML = '';
        
        // Show results
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'game-results animate__animated animate__bounceIn';
        resultsDiv.style.textAlign = 'center';
        resultsDiv.style.padding = '20px';
        
        resultsDiv.innerHTML = `
            <h3>YAYYYY ACHUMMMMM!!! YOU MATCHED ALL THE BALLOONS!!! 😭🙏💖</h3>
            <p>YOU HAVE SUCH A GOOD MEMORY!!! 😭🙏✨</p>
            <button class="play-again-button">PLAY AGAIN!</button>
        `;
        
        balloonGameContainer.appendChild(resultsDiv);
        
        // Play again button
        const playAgainButton = balloonGameContainer.querySelector('.play-again-button');
        playAgainButton.addEventListener('click', startBalloonGame);
        playAgainButton.style.padding = '0.75rem 1.5rem';
        playAgainButton.style.backgroundColor = '#ff85a2';
        playAgainButton.style.color = 'white';
        playAgainButton.style.border = 'none';
        playAgainButton.style.borderRadius = '50px';
        playAgainButton.style.cursor = 'pointer';
        playAgainButton.style.fontWeight = 'bold';
        playAgainButton.style.marginTop = '15px';
        
        // Reset button text
        startBalloonButton.textContent = 'START GAME!';
    }
    
    function startQuizGame() {
        if (quizGameActive) return;
        
        quizGameActive = true;
        quizGameContainer.innerHTML = '';
        currentQuestionIndex = 0;
        
        // Show first question
        showQuestion(currentQuestionIndex);
        
        // Change button text
        startQuizButton.textContent = 'QUIZ IN PROGRESS!';
    }
    
    function showQuestion(index) {
        const question = quizQuestions[index];
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question animate__animated animate__fadeIn';
        questionDiv.style.textAlign = 'center';
        questionDiv.style.padding = '20px';
        
        questionDiv.innerHTML = `
            <h3>${question.question}</h3>
            <div class="options-container"></div>
        `;
        
        quizGameContainer.innerHTML = '';
        quizGameContainer.appendChild(questionDiv);
        
        const optionsContainer = questionDiv.querySelector('.options-container');
        optionsContainer.style.display = 'grid';
        optionsContainer.style.gridTemplateColumns = '1fr 1fr';
        optionsContainer.style.gap = '10px';
        optionsContainer.style.marginTop = '20px';
        
        question.options.forEach((option, optionIndex) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'option-button';
            optionButton.textContent = option;
            optionButton.style.padding = '10px';
            optionButton.style.backgroundColor = '#ff85a2';
            optionButton.style.color = 'white';
            optionButton.style.border = 'none';
            optionButton.style.borderRadius = '10px';
            optionButton.style.cursor = 'pointer';
            optionButton.style.fontWeight = 'bold';
            
            optionButton.addEventListener('click', function() {
                checkAnswer(optionIndex, question.answer);
            });
            
            optionsContainer.appendChild(optionButton);
        });
    }
    
    function checkAnswer(selectedIndex, correctIndex) {
        const optionButtons = quizGameContainer.querySelectorAll('.option-button');
        
        // Disable all buttons
        optionButtons.forEach(button => {
            button.disabled = true;
            button.style.cursor = 'default';
        });
        
        // Play sound based on answer
        const sound = new Audio(selectedIndex === correctIndex ? '../audio/correct-answer.mp3' : '../audio/wrong-answer.mp3');
        sound.volume = 0.3;
        sound.play().catch(error => console.log('Audio play failed:', error));
        
        // Highlight correct and incorrect answers with animation
        optionButtons[correctIndex].classList.add('animate__animated', 'animate__pulse');
        optionButtons[correctIndex].style.backgroundColor = '#a5d6a7';
        
        if (selectedIndex !== correctIndex) {
            optionButtons[selectedIndex].classList.add('animate__animated', 'animate__shakeX');
            optionButtons[selectedIndex].style.backgroundColor = '#ef9a9a';
        }
        
        // Show feedback with enhanced animation
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback animate__animated animate__bounceIn';
        feedbackDiv.style.marginTop = '20px';
        feedbackDiv.style.textAlign = 'center';
        feedbackDiv.style.fontWeight = 'bold';
        
        if (selectedIndex === correctIndex) {
            feedbackDiv.innerHTML = '✨ YAYYYY CORRECT!!! YOU KNOW ME SO WELL!!! 😭🙏💖';
            feedbackDiv.style.color = '#4caf50';
        } else {
            feedbackDiv.innerHTML = '💭 AWWW THAT\'S OKAY!!! YOU\'LL GET IT NEXT TIME!!! 😭🙏💕';
            feedbackDiv.style.color = '#f44336';
        }
        
        quizGameContainer.querySelector('.quiz-question').appendChild(feedbackDiv);
        
        // Move to next question after delay with transition
        setTimeout(() => {
            const currentQuestion = quizGameContainer.querySelector('.quiz-question');
            currentQuestion.classList.remove('animate__fadeIn');
            currentQuestion.classList.add('animate__fadeOutLeft');
            
            setTimeout(() => {
                currentQuestionIndex++;
                
                if (currentQuestionIndex < quizQuestions.length) {
                    showQuestion(currentQuestionIndex);
                } else {
                    endQuizGame();
                }
            }, 500);
        }, 2000);
    }
    
    function endQuizGame() {
        quizGameActive = false;
        
        // Clear container
        quizGameContainer.innerHTML = '';
        
        // Show results
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'game-results animate__animated animate__bounceIn';
        resultsDiv.style.textAlign = 'center';
        resultsDiv.style.padding = '20px';
        
        resultsDiv.innerHTML = `
            <h3>QUIZ COMPLETE!!! YOU KNOW SO MUCH ABOUT ME!!! 😭🙏💖</h3>
            <p>I LOVE THAT YOU REMEMBER ALL THESE THINGS!!! 😭🙏✨</p>
            <button class="play-again-button">PLAY AGAIN!</button>
        `;
        
        quizGameContainer.appendChild(resultsDiv);
        
        // Play again button
        const playAgainButton = quizGameContainer.querySelector('.play-again-button');
        playAgainButton.addEventListener('click', startQuizGame);
        playAgainButton.style.padding = '0.75rem 1.5rem';
        playAgainButton.style.backgroundColor = '#ff85a2';
        playAgainButton.style.color = 'white';
        playAgainButton.style.border = 'none';
        playAgainButton.style.borderRadius = '50px';
        playAgainButton.style.cursor = 'pointer';
        playAgainButton.style.fontWeight = 'bold';
        playAgainButton.style.marginTop = '15px';
        
        // Reset button text
        startQuizButton.textContent = 'START QUIZ!';
    }
});