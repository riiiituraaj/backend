// Sad Portal Functionality for Achum's Special Place

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hugButton = document.getElementById('virtual-hug');
    const petAnimalsButton = document.getElementById('pet-animals');
    const breatheButton = document.getElementById('breathe-exercise');
    
    const hugContainer = document.getElementById('hug-container');
    const petAnimalsContainer = document.getElementById('pet-animals-container');
    const breatheContainer = document.getElementById('breathe-container');
    
    // Event Listeners
    hugButton.addEventListener('click', startVirtualHug);
    petAnimalsButton.addEventListener('click', startPetAnimals);
    breatheButton.addEventListener('click', startBreatheExercise);
    
    // Comfort Messages
    const comfortMessages = [
        "ACHUMMMMM... I'M RIGHT HERE FOR YOU!! 😭🙏💙",
        "MAAF KAR DENAAAA... I WISH I COULD HUG YOU RIGHT NOW 😭🙏🤗",
        "IT'S OKAY TO FEEL SAD SOMETIMES... I'M HERE WITH YOU 😭🙏💜",
        "ACCHHE SE KHAAOOO... TAKE CARE OF YOURSELF CUTIEEE 😭🙏💙",
        "SOWWWYYY HANNIIII... THINGS WILL GET BETTER 😭🙏🥹",
        "YOU'RE NEVER ALONE SIGMAAAAA... I'M ALWAYS HERE 😭🙏💖",
        "SENDING YOU THE BIGGEST VIRTUAL HUG RIGHT NOW 😭🙏🫂",
        "YOUR FEELINGS ARE VALID... TAKE YOUR TIME 😭🙏💙",
        "I CARE ABOUT YOU SO MUCH ACHUMMMMM 😭🙏💕",
        "BREATHE SLOWLY... I'M RIGHT BESIDE YOU 😭🙏✨"
    ];
    
    // Pet Animal Types
    const animalTypes = [
        {
            name: "Hello Kitty",
            image: "../images/fluffy-kitty.svg",
            sound: "../audio/cat-purr.mp3",
            messages: [
                "THE KITTY LOVES YOUR GENTLE PETS!! 😭🙏🐱",
                "PURRRR... THE KITTY IS SO HAPPY TO SEE YOU!! 😭🙏💕",
                "ACHUMMMMM!! THE KITTY WANTS TO CUDDLE WITH YOU!! 😭🙏🐱"
            ]
        },
        {
            name: "Puppy Friend",
            image: "../images/puppy-friend.svg",
            sound: "../audio/dog-happy.mp3",
            messages: [
                "THE PUPPY IS WAGGING ITS TAIL FOR YOU!! 😭🙏🐶",
                "LOOK HOW HAPPY THE PUPPY IS TO SEE YOU!! 😭🙏💖",
                "THE PUPPY WANTS TO PLAY WITH YOU ACHUMMMMM!! 😭🙏🐶"
            ]
        },
        {
            name: "Bunny",
            image: "../images/bunny.gif",
            sound: "../audio/bunny-sound.mp3",
            messages: [
                "THE BUNNY IS HOPPING WITH JOY!! 😭🙏🐰",
                "LOOK AT THOSE FLUFFY EARS!! SO CUTE!! 😭🙏💕",
                "THE BUNNY LOVES YOUR GENTLE TOUCH ACHUMMMMM!! 😭🙏🐰"
            ]
        }
    ];
    
    // Virtual Hug Function
    function startVirtualHug() {
        hugContainer.innerHTML = '';
        
        // Create hug animation container
        const hugAnimation = document.createElement('div');
        hugAnimation.className = 'hug-animation animate__animated animate__bounceIn';
        hugAnimation.style.textAlign = 'center';
        hugAnimation.style.padding = '20px';
        
        // Add hug.jpg image with enhanced animation
        const hugImg = document.createElement('img');
        hugImg.src = '../images/hug.jpg';
        hugImg.alt = 'Virtual Hug';
        hugImg.className = 'animate__animated animate__pulse animate__infinite';
        hugImg.style.width = '150px';
        hugImg.style.height = '150px';
        hugImg.style.objectFit = 'cover';
        hugImg.style.borderRadius = '20px';
        hugImg.style.margin = '0 auto 10px auto';
        hugImg.style.boxShadow = '0 0 15px rgba(255, 133, 162, 0.5)';
        
        // Create Kuromi image with enhanced animation
        const kuromiImg = document.createElement('div');
        kuromiImg.className = 'kuromi-hug animate__animated animate__heartBeat animate__infinite';
        kuromiImg.style.width = '150px';
        kuromiImg.style.height = '150px';
        kuromiImg.style.margin = '0 auto';
        kuromiImg.style.backgroundImage = 'url("../images/kuromi-heart.webp")';
        kuromiImg.style.backgroundSize = 'contain';
        kuromiImg.style.backgroundRepeat = 'no-repeat';
        kuromiImg.style.backgroundPosition = 'center';
        
        // Create message with enhanced animation
        const message = document.createElement('div');
        message.className = 'hug-message animate__animated animate__bounceIn';
        message.innerHTML = `✨ ${comfortMessages[Math.floor(Math.random() * comfortMessages.length)]} ✨`;
        message.style.marginTop = '20px';
        message.style.fontSize = '1.2rem';
        message.style.fontWeight = 'bold';
        message.style.color = '#9c27b0';
        message.style.textShadow = '0 0 5px rgba(156, 39, 176, 0.3)';
        
        // Append elements
        hugAnimation.appendChild(hugImg);
        hugAnimation.appendChild(kuromiImg);
        hugAnimation.appendChild(message);
        hugContainer.appendChild(hugAnimation);
        
        // Add heart particles
        createHeartParticles(hugContainer);
        
        // Play hug sound
        const hugSound = new Audio('../audio/hug-sound.mp3');
        hugSound.volume = 0.3;
        hugSound.play().catch(error => console.log('Audio play failed:', error));
    }
    
    // Create heart particles for the virtual hug
    function createHeartParticles(container) {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart-particle';
                heart.innerHTML = '💖';
                heart.style.position = 'absolute';
                heart.style.fontSize = `${Math.random() * 10 + 10}px`;
                heart.style.opacity = '0';
                heart.style.left = `${Math.random() * 80 + 10}%`;
                heart.style.top = `${Math.random() * 80 + 10}%`;
                heart.style.animation = `floatHeart ${Math.random() * 2 + 2}s ease-out forwards`;
                container.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    if (container.contains(heart)) {
                        container.removeChild(heart);
                    }
                }, 3000);
            }, i * 200);
        }
    }
    
    // Pet Animals Function
    function startPetAnimals() {
        petAnimalsContainer.innerHTML = '';
        
        // Create container for animals with enhanced animation
        const animalsGrid = document.createElement('div');
        animalsGrid.className = 'animals-grid animate__animated animate__fadeIn';
        animalsGrid.style.display = 'flex';
        animalsGrid.style.justifyContent = 'space-around';
        animalsGrid.style.flexWrap = 'wrap';
        animalsGrid.style.gap = '20px';
        animalsGrid.style.padding = '20px';
        
        // Add each animal with staggered animation
        animalTypes.forEach((animal, index) => {
            const animalCard = document.createElement('div');
            animalCard.className = 'animal-card animate__animated animate__bounceIn';
            animalCard.style.width = '200px';
            animalCard.style.padding = '15px';
            animalCard.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            animalCard.style.borderRadius = '15px';
            animalCard.style.boxShadow = '0 4px 15px rgba(156, 39, 176, 0.2)';
            animalCard.style.textAlign = 'center';
            animalCard.style.cursor = 'pointer';
            animalCard.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            animalCard.style.animationDelay = `${index * 0.2}s`;
            
            // Hover effect
            animalCard.addEventListener('mouseenter', () => {
                animalCard.style.transform = 'translateY(-5px)';
                animalCard.style.boxShadow = '0 6px 20px rgba(156, 39, 176, 0.3)';
            });
            animalCard.addEventListener('mouseleave', () => {
                animalCard.style.transform = 'translateY(0)';
                animalCard.style.boxShadow = '0 4px 15px rgba(156, 39, 176, 0.2)';
            });
            
            // Animal image with animation
            const animalImg = document.createElement('div');
            animalImg.className = 'animal-image animate__animated';
            animalImg.style.width = '150px';
            animalImg.style.height = '150px';
            animalImg.style.margin = '0 auto';
            animalImg.style.backgroundImage = `url("${animal.image}")`;
            animalImg.style.backgroundSize = 'contain';
            animalImg.style.backgroundRepeat = 'no-repeat';
            animalImg.style.backgroundPosition = 'center';
            animalImg.style.transition = 'transform 0.3s ease';
            
            // Animal name with glow effect
            const animalName = document.createElement('h3');
            animalName.textContent = animal.name;
            animalName.style.marginTop = '10px';
            animalName.style.color = '#9c27b0';
            animalName.style.textShadow = '0 0 5px rgba(156, 39, 176, 0.3)';
            
            // Pet button with enhanced style and animation
            const petButton = document.createElement('button');
            petButton.textContent = 'Pet Me!';
            petButton.className = 'animate__animated';
            petButton.style.marginTop = '10px';
            petButton.style.padding = '8px 20px';
            petButton.style.backgroundColor = '#ff85a2';
            petButton.style.color = 'white';
            petButton.style.border = 'none';
            petButton.style.borderRadius = '20px';
            petButton.style.cursor = 'pointer';
            petButton.style.fontWeight = 'bold';
            petButton.style.boxShadow = '0 2px 8px rgba(255, 133, 162, 0.4)';
            petButton.style.transition = 'all 0.3s ease';
            
            // Button hover effect
            petButton.addEventListener('mouseenter', () => {
                petButton.style.transform = 'scale(1.05)';
                petButton.style.boxShadow = '0 4px 12px rgba(255, 133, 162, 0.6)';
            });
            petButton.addEventListener('mouseleave', () => {
                petButton.style.transform = 'scale(1)';
                petButton.style.boxShadow = '0 2px 8px rgba(255, 133, 162, 0.4)';
            });
            
            // Message container
            const messageContainer = document.createElement('div');
            messageContainer.className = 'animal-message';
            messageContainer.style.marginTop = '10px';
            messageContainer.style.minHeight = '60px';
            messageContainer.style.display = 'flex';
            messageContainer.style.alignItems = 'center';
            messageContainer.style.justifyContent = 'center';
            
            // Pet event
            petButton.addEventListener('click', function() {
                // Play animal sound
                const sound = new Audio(animal.sound);
                sound.volume = 0.3;
                sound.play().catch(error => console.log('Audio play failed:', error));
                
                // Show random message
                const message = animal.messages[Math.floor(Math.random() * animal.messages.length)];
                messageContainer.textContent = message;
                messageContainer.style.color = '#e91e63';
                messageContainer.style.fontWeight = 'bold';
                
                // Animate animal
                animalImg.classList.add('animate__animated', 'animate__pulse');
                setTimeout(() => {
                    animalImg.classList.remove('animate__animated', 'animate__pulse');
                }, 1000);
            });
            
            // Append elements
            animalCard.appendChild(animalImg);
            animalCard.appendChild(animalName);
            animalCard.appendChild(petButton);
            animalCard.appendChild(messageContainer);
            animalsGrid.appendChild(animalCard);
        });
        
        petAnimalsContainer.appendChild(animalsGrid);
    }
    
    // Breathe Exercise Function
    function startBreatheExercise() {
        breatheContainer.innerHTML = '';
        
        // Create breathe animation container
        const breatheAnimation = document.createElement('div');
        breatheAnimation.className = 'breathe-animation';
        breatheAnimation.style.textAlign = 'center';
        breatheAnimation.style.padding = '20px';
        
        // Create breathe circle
        const breatheCircle = document.createElement('div');
        breatheCircle.className = 'breathe-circle';
        breatheCircle.style.width = '200px';
        breatheCircle.style.height = '200px';
        breatheCircle.style.borderRadius = '50%';
        breatheCircle.style.margin = '0 auto';
        breatheCircle.style.backgroundColor = '#b39ddb';
        breatheCircle.style.boxShadow = '0 0 20px rgba(179, 157, 219, 0.5)';
        breatheCircle.style.display = 'flex';
        breatheCircle.style.justifyContent = 'center';
        breatheCircle.style.alignItems = 'center';
        breatheCircle.style.color = 'white';
        breatheCircle.style.fontSize = '1.5rem';
        breatheCircle.style.fontWeight = 'bold';
        breatheCircle.style.transition = 'transform 4s ease, background-color 4s ease';
        breatheCircle.textContent = 'Breathe In...';
        
        // Create instruction text
        const instructionText = document.createElement('div');
        instructionText.className = 'instruction-text';
        instructionText.style.marginTop = '20px';
        instructionText.style.fontSize = '1.2rem';
        instructionText.style.color = '#9c27b0';
        instructionText.textContent = 'Follow the circle and breathe with it';
        
        // Create comfort message
        const comfortText = document.createElement('div');
        comfortText.className = 'comfort-text';
        comfortText.style.marginTop = '20px';
        comfortText.style.fontSize = '1rem';
        comfortText.style.fontWeight = 'bold';
        comfortText.style.color = '#e91e63';
        comfortText.textContent = comfortMessages[Math.floor(Math.random() * comfortMessages.length)];
        
        // Append elements
        breatheAnimation.appendChild(breatheCircle);
        breatheAnimation.appendChild(instructionText);
        breatheAnimation.appendChild(comfortText);
        breatheContainer.appendChild(breatheAnimation);
        
        // Start breathe animation
        let isBreathingIn = true;
        
        function animateBreathing() {
            if (isBreathingIn) {
                // Breathe in
                breatheCircle.style.transform = 'scale(1.3)';
                breatheCircle.style.backgroundColor = '#ce93d8';
                breatheCircle.textContent = 'Breathe In...';
                setTimeout(() => {
                    // Hold breath
                    breatheCircle.textContent = 'Hold...';
                    setTimeout(() => {
                        isBreathingIn = false;
                        animateBreathing();
                    }, 2000);
                }, 4000);
            } else {
                // Breathe out
                breatheCircle.style.transform = 'scale(1)';
                breatheCircle.style.backgroundColor = '#b39ddb';
                breatheCircle.textContent = 'Breathe Out...';
                setTimeout(() => {
                    isBreathingIn = true;
                    animateBreathing();
                }, 4000);
            }
        }
        
        // Start the animation
        animateBreathing();
        
        // Play calming sound
        const calmSound = new Audio('../audio/calm-sound.mp3');
        calmSound.volume = 0.2;
        calmSound.loop = true;
        calmSound.play().catch(error => console.log('Audio play failed:', error));
        
        // Create stop button
        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop Exercise';
        stopButton.style.marginTop = '20px';
        stopButton.style.padding = '10px 20px';
        stopButton.style.backgroundColor = '#ff85a2';
        stopButton.style.color = 'white';
        stopButton.style.border = 'none';
        stopButton.style.borderRadius = '20px';
        stopButton.style.cursor = 'pointer';
        
        stopButton.addEventListener('click', function() {
            calmSound.pause();
            calmSound.currentTime = 0;
            breatheContainer.innerHTML = '';
            
            // Show completion message
            const completionMessage = document.createElement('div');
            completionMessage.className = 'completion-message animate__animated animate__fadeIn';
            completionMessage.style.textAlign = 'center';
            completionMessage.style.padding = '20px';
            
            completionMessage.innerHTML = `
                <h3>GREAT JOB ACHUMMMMM!!! 😭🙏💙</h3>
                <p>I HOPE YOU FEEL A LITTLE BETTER NOW!!! 😭🙏✨</p>
                <button class="restart-button">Do Another Breathing Exercise</button>
            `;
            
            breatheContainer.appendChild(completionMessage);
            
            // Restart button
            const restartButton = breatheContainer.querySelector('.restart-button');
            restartButton.style.marginTop = '15px';
            restartButton.style.padding = '10px 20px';
            restartButton.style.backgroundColor = '#ff85a2';
            restartButton.style.color = 'white';
            restartButton.style.border = 'none';
            restartButton.style.borderRadius = '20px';
            restartButton.style.cursor = 'pointer';
            
            restartButton.addEventListener('click', startBreatheExercise);
        });
        
        breatheAnimation.appendChild(stopButton);
    }
});