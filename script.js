// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const contentSections = document.querySelectorAll('.content-section');

// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update nav buttons
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Set active nav button
    const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Add click listeners to navigation buttons
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sectionId = button.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        const currentActive = document.querySelector('.nav-btn.active');
        const currentIndex = Array.from(navButtons).indexOf(currentActive);
        let nextIndex = currentIndex;
        
        switch(e.key) {
            case 'ArrowLeft':
                nextIndex = currentIndex > 0 ? currentIndex - 1 : navButtons.length - 1;
                break;
            case 'ArrowRight':
                nextIndex = currentIndex < navButtons.length - 1 ? currentIndex + 1 : 0;
                break;
        }
        
        if (nextIndex !== currentIndex) {
            const targetSection = navButtons[nextIndex].getAttribute('data-section');
            showSection(targetSection);
        }
    }
});

// Smooth scroll to sections when using keyboard
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add smooth scroll to all navigation
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sectionId = button.getAttribute('data-section');
        smoothScrollToSection(sectionId);
    });
});

// Dynamic content animations
function animateCards() {
    const cards = document.querySelectorAll('.card, .spell-card, .damage-card, .champion-class, .lane');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Call animation function when page loads
document.addEventListener('DOMContentLoaded', animateCards);

// Interactive rune tree
function createRuneInteraction() {
    const runeCards = document.querySelectorAll('#runes .card');
    
    runeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.background = 'linear-gradient(135deg, #1e2d50, #463714)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = '#1e2d50';
        });
    });
}

// Spell cooldown animation
function animateSpellCooldowns() {
    const spellCards = document.querySelectorAll('.spell-card');
    
    spellCards.forEach(card => {
        card.addEventListener('click', () => {
            const cooldownElement = card.querySelector('.cooldown');
            const originalText = cooldownElement.textContent;
            
            // Extract cooldown time
            const cooldownMatch = originalText.match(/(\d+)s/);
            if (cooldownMatch) {
                const cooldownTime = parseInt(cooldownMatch[1]);
                
                // Start countdown
                cooldownElement.textContent = 'Ativado!';
                cooldownElement.style.background = '#C8A964';
                
                // Reset after a short delay
                setTimeout(() => {
                    cooldownElement.textContent = originalText;
                    cooldownElement.style.background = '#463714';
                }, 1500);
            }
        });
    });
}

// Damage calculator simulation
function createDamageCalculator() {
    const damageCards = document.querySelectorAll('.damage-card');
    
    damageCards.forEach(card => {
        card.addEventListener('click', () => {
            const damageType = card.classList[1]; // physical, magical, or true
            const existingDemo = card.querySelector('.damage-demo');
            
            if (!existingDemo) {
                const demo = document.createElement('div');
                demo.className = 'damage-demo';
                demo.style.cssText = `
                    margin-top: 1rem;
                    padding: 1rem;
                    background: rgba(200, 169, 100, 0.1);
                    border-radius: 5px;
                    font-size: 0.9rem;
                `;
                
                switch(damageType) {
                    case 'physical':
                        demo.textContent = '💪 Exemplo: 100 AD - 50 Armadura = ~67 dano';
                        break;
                    case 'magical':
                        demo.textContent = '✨ Exemplo: 100 AP - 40 RM = ~71 dano';
                        break;
                    case 'true':
                        demo.textContent = '⚡ Exemplo: 100 dano verdadeiro = 100 dano';
                        break;
                }
                
                card.appendChild(demo);
                
                // Remove after 3 seconds
                setTimeout(() => {
                    card.removeChild(demo);
                }, 3000);
            }
        });
    });
}

// Champion rotation effect
function createChampionRotation() {
    const championClasses = document.querySelectorAll('.champion-class');
    
    championClasses.forEach(championClass => {
        championClass.addEventListener('click', () => {
            championClass.style.transform = 'rotateY(360deg)';
            championClass.style.transition = 'transform 0.6s ease';
            
            setTimeout(() => {
                championClass.style.transform = 'rotateY(0deg)';
            }, 600);
        });
    });
}

// Gold counter animation
function createGoldCounter() {
    const minionCards = document.querySelectorAll('#minions .card');
    
    minionCards.forEach(card => {
        const goldElements = card.querySelectorAll('li');
        
        goldElements.forEach(element => {
            element.addEventListener('click', () => {
                const goldMatch = element.textContent.match(/(\d+)/);
                if (goldMatch) {
                    const goldValue = goldMatch[1];
                    
                    // Create floating gold animation
                    const floatingGold = document.createElement('span');
                    floatingGold.textContent = `+${goldValue}g`;
                    floatingGold.style.cssText = `
                        position: absolute;
                        color: #ffed4a;
                        font-weight: bold;
                        font-size: 1.2rem;
                        pointer-events: none;
                        animation: floatUp 2s ease forwards;
                    `;
                    
                    // Add CSS for the animation
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes floatUp {
                            0% {
                                opacity: 1;
                                transform: translateY(0px);
                            }
                            100% {
                                opacity: 0;
                                transform: translateY(-30px);
                            }
                        }
                    `;
                    
                    if (!document.head.querySelector('#floating-gold-style')) {
                        style.id = 'floating-gold-style';
                        document.head.appendChild(style);
                    }
                    
                    card.style.position = 'relative';
                    card.appendChild(floatingGold);
                    
                    setTimeout(() => {
                        if (floatingGold.parentNode) {
                            floatingGold.parentNode.removeChild(floatingGold);
                        }
                    }, 2000);
                }
            });
        });
    });
}

// Lane map interaction
function createLaneMapInteraction() {
    const lanes = document.querySelectorAll('.lane');
    const colors = {
        'top-lane': '#ff6b35',
        'jungle': '#4ecdc4',
        'mid-lane': '#45b7d1',
        'bot-lane': '#96ceb4'
    };
    
    lanes.forEach(lane => {
        const laneClass = lane.classList[1]; // Get the specific lane class
        const originalColor = colors[laneClass] || '#463714';
        
        lane.addEventListener('mouseenter', () => {
            lane.style.borderColor = originalColor;
            lane.style.boxShadow = `0 0 15px ${originalColor}40`;
        });
        
        lane.addEventListener('mouseleave', () => {
            lane.style.borderColor = '#463714';
            lane.style.boxShadow = 'none';
        });
    });
}

// Progress tracker for presentation
function createProgressTracker() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #C8A964, #463714);
        transition: width 0.3s ease;
        z-index: 1000;
    `;
    document.body.appendChild(progressBar);
    
    function updateProgress() {
        const activeIndex = Array.from(navButtons).findIndex(btn => btn.classList.contains('active'));
        const progress = ((activeIndex + 1) / navButtons.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Update progress when navigation changes
    navButtons.forEach(button => {
        button.addEventListener('click', updateProgress);
    });
    
    // Initial progress update
    updateProgress();
}

// Tooltip system for advanced explanations
function createTooltipSystem() {
    const tooltips = {
        'AD': 'Attack Damage - Atributo que aumenta o dano dos ataques básicos e algumas habilidades',
        'AP': 'Ability Power - Atributo que aumenta o dano das habilidades mágicas',
        'Cooldown': 'Tempo de recarga - Tempo que você deve esperar para usar novamente',
        'Flash': 'O feitiço mais importante! Sempre tenha Flash disponível para escapar ou iniciar',
        'Last Hit': 'Dar o golpe final no minion para receber ouro. Pratique muito!',
        'Gankar': 'Surpreender inimigos com ajuda do jungler ou outros aliados'
    };
    
    Object.keys(tooltips).forEach(term => {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            if (element.textContent.includes(term) && !element.querySelector('.tooltip')) {
                element.innerHTML = element.innerHTML.replace(
                    new RegExp(`\\b${term}\\b`, 'g'),
                    `<span class="tooltip-trigger" data-tooltip="${tooltips[term]}">${term}</span>`
                );
            }
        });
    });
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.style.cssText = `
        position: absolute;
        background: #1e2d50;
        color: #CDBE91;
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #C8A964;
        font-size: 0.8rem;
        max-width: 200px;
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
    `;
    document.body.appendChild(tooltip);
    
    // Add event listeners for tooltips
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('tooltip-trigger')) {
            const tooltipText = e.target.getAttribute('data-tooltip');
            tooltip.textContent = tooltipText;
            tooltip.style.opacity = '1';
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('tooltip-trigger')) {
            tooltip.style.opacity = '0';
        }
    });
}

// Fun Easter egg - Konami code
function addKonamiCode() {
    let konamiCode = [];
    const requiredCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-8); // Keep only last 8 keys
        
        if (JSON.stringify(konamiCode) === JSON.stringify(requiredCode)) {
            // Activate special effect
            document.body.style.filter = 'hue-rotate(180deg)';
            
            // Create celebration message
            const celebration = document.createElement('div');
            celebration.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #C8A964, #463714);
                color: #CDBE91;
                padding: 2rem;
                border-radius: 15px;
                font-size: 1.5rem;
                font-weight: bold;
                z-index: 10000;
                text-align: center;
                animation: bounce 0.5s ease infinite alternate;
            `;
            celebration.innerHTML = '🎉 EASTER EGG ENCONTRADO! 🎉<br>Você é um verdadeiro invocador!';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes bounce {
                    0% { transform: translate(-50%, -50%) scale(1); }
                    100% { transform: translate(-50%, -50%) scale(1.1); }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(celebration);
            
            setTimeout(() => {
                document.body.style.filter = 'none';
                document.body.removeChild(celebration);
                document.head.removeChild(style);
            }, 3000);
        }
    });
}

// Quiz functionality
function createQuizMode() {
    const quizQuestions = [
        {
            question: "Qual feitiço tem o menor cooldown?",
            options: ["Flash", "Ignite", "Heal", "Teleport"],
            correct: 1
        },
        {
            question: "Quantos tipos de dano existem no LoL?",
            options: ["2", "3", "4", "5"],
            correct: 1
        },
        {
            question: "Qual lane fica no meio do mapa?",
            options: ["Top", "Mid", "Bot", "Jungle"],
            correct: 1
        }
    ];
    
    let currentQuiz = 0;
    let score = 0;
    
    function createQuizButton() {
        const quizBtn = document.createElement('button');
        quizBtn.textContent = '🧠 Teste seus conhecimentos!';
        quizBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #C8A964;
            color: #0F1B3C;
            border: none;
            padding: 1rem 1.5rem;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        quizBtn.addEventListener('click', startQuiz);
        document.body.appendChild(quizBtn);
    }
    
    function startQuiz() {
        currentQuiz = 0;
        score = 0;
        showQuestion();
    }
    
    function showQuestion() {
        if (currentQuiz >= quizQuestions.length) {
            showResults();
            return;
        }
        
        const question = quizQuestions[currentQuiz];
        const quizOverlay = document.createElement('div');
        quizOverlay.className = 'quiz-overlay';
        quizOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 27, 60, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        const quizBox = document.createElement('div');
        quizBox.style.cssText = `
            background: #1e2d50;
            color: #CDBE91;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            border: 2px solid #C8A964;
        `;
        
        quizBox.innerHTML = `
            <h3 style="color: #C8A964; margin-bottom: 1rem;">Pergunta ${currentQuiz + 1}/${quizQuestions.length}</h3>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">${question.question}</p>
            <div class="quiz-options"></div>
        `;
        
        const optionsContainer = quizBox.querySelector('.quiz-options');
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.style.cssText = `
                display: block;
                width: 100%;
                padding: 1rem;
                margin: 0.5rem 0;
                background: #463714;
                color: #CDBE91;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
            `;
            
            button.addEventListener('mouseover', () => {
                button.style.background = '#C8A964';
                button.style.color = '#0F1B3C';
            });
            
            button.addEventListener('mouseout', () => {
                button.style.background = '#463714';
                button.style.color = '#CDBE91';
            });
            
            button.addEventListener('click', () => {
                if (index === question.correct) {
                    score++;
                    button.style.background = '#28a745';
                } else {
                    button.style.background = '#dc3545';
                    optionsContainer.children[question.correct].style.background = '#28a745';
                }
                
                setTimeout(() => {
                    document.body.removeChild(quizOverlay);
                    currentQuiz++;
                    showQuestion();
                }, 1500);
            });
            
            optionsContainer.appendChild(button);
        });
        
        quizOverlay.appendChild(quizBox);
        document.body.appendChild(quizOverlay);
    }
    
    function showResults() {
        const percentage = (score / quizQuestions.length) * 100;
        let message = '';
        
        if (percentage >= 80) {
            message = 'Excelente! Você está pronto para o Rift! 🏆';
        } else if (percentage >= 60) {
            message = 'Bem! Continue estudando e você chegará lá! 📚';
        } else {
            message = 'Precisa estudar mais! Revise o guia novamente! 🤔';
        }
        
        const resultOverlay = document.createElement('div');
        resultOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 27, 60, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        const resultBox = document.createElement('div');
        resultBox.style.cssText = `
            background: #1e2d50;
            color: #CDBE91;
            padding: 2rem;
            border-radius: 15px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            border: 2px solid #C8A964;
        `;
        
        resultBox.innerHTML = `
            <h3 style="color: #C8A964; margin-bottom: 1rem;">Resultado Final</h3>
            <p style="font-size: 2rem; margin: 1rem 0;">${score}/${quizQuestions.length}</p>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">${percentage.toFixed(0)}%</p>
            <p style="margin-bottom: 2rem;">${message}</p>
            <button style="background: #C8A964; color: #0F1B3C; border: none; padding: 1rem 2rem; border-radius: 8px; cursor: pointer; font-weight: bold;">
                Tentar Novamente
            </button>
        `;
        
        resultBox.querySelector('button').addEventListener('click', () => {
            document.body.removeChild(resultOverlay);
        });
        
        resultOverlay.appendChild(resultBox);
        document.body.appendChild(resultOverlay);
    }
    
    createQuizButton();
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createRuneInteraction();
    animateSpellCooldowns();
    createDamageCalculator();
    createChampionRotation();
    createGoldCounter();
    createLaneMapInteraction();
    createProgressTracker();
    createTooltipSystem();
    addKonamiCode();
    createQuizMode();
    
    // Add subtle background music toggle (optional)
    const musicToggle = document.createElement('button');
    musicToggle.innerHTML = '🎵';
    musicToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: transparent;
        color: #C8A964;
        border: 2px solid #C8A964;
        padding: 0.5rem;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    let isMuted = true;
    musicToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        musicToggle.innerHTML = isMuted ? '🎵' : '🔇';
        musicToggle.title = isMuted ? 'Ativar som ambiente' : 'Desativar som ambiente';
    });
    
    document.body.appendChild(musicToggle);
});

// Auto-advance presentation mode
let autoAdvance = false;
let autoAdvanceInterval;

function toggleAutoAdvance() {
    autoAdvance = !autoAdvance;
    
    if (autoAdvance) {
        let currentIndex = 0;
        autoAdvanceInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % navButtons.length;
            const targetSection = navButtons[nextIndex].getAttribute('data-section');
            showSection(targetSection);
            currentIndex = nextIndex;
        }, 5000); // Change section every 5 seconds
    } else {
        clearInterval(autoAdvanceInterval);
    }
}

// Add auto-advance button
document.addEventListener('DOMContentLoaded', () => {
    const autoButton = document.createElement('button');
    autoButton.innerHTML = '⏯️ Auto';
    autoButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: #463714;
        color: #CDBE91;
        border: none;
        padding: 0.7rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-weight: bold;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    autoButton.addEventListener('click', toggleAutoAdvance);
    document.body.appendChild(autoButton);
});

// Export for potential use
window.LoLGuide = {
    showSection,
    toggleAutoAdvance
};