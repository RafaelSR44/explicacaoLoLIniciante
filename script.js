// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing League of Legends guide...');
    
    // Get navigation elements
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    
    console.log(`Found ${navButtons.length} nav buttons and ${contentSections.length} sections`);
    
    // Navigation functionality
    function showSection(sectionId) {
        console.log(`Showing section: ${sectionId}`);
        
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
    navButtons.forEach((button, index) => {
        console.log(`Adding listener to button ${index}:`, button);
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = button.getAttribute('data-section');
            console.log(`Button clicked, section: ${sectionId}`);
            showSection(sectionId);
        });
        
        // Also add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const sectionId = button.getAttribute('data-section');
                showSection(sectionId);
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
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
    
    // Progress tracker
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #C8A964, #463714);
        transition: width 0.3s ease;
        z-index: 1000;
        width: 0%;
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
    
    // Enhanced rune interactions
    const runeItems = document.querySelectorAll('.rune-item');
    runeItems.forEach(item => {
        item.addEventListener('click', function() {
            const runeName = item.querySelector('strong').textContent;
            const runeDesc = item.querySelector('p').textContent;
            
            // Create detailed popup
            const popup = document.createElement('div');
            popup.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #1e2d50;
                color: #CDBE91;
                padding: 2rem;
                border-radius: 15px;
                border: 2px solid #C8A964;
                max-width: 400px;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            `;
            
            popup.innerHTML = `
                <h3 style="color: #C8A964; margin-bottom: 1rem;">${runeName}</h3>
                <p style="margin-bottom: 1rem;">${runeDesc}</p>
                <div style="text-align: center;">
                    <button onclick="${popup.remove()}" style="
                        background: #C8A964;
                        color: #0F1B3C;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Fechar</button>
                </div>
            `;
            
            document.body.appendChild(popup);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 5000);
        });
    });
    
    // Interactive rune tree selector
    function createRuneSelector() {
        const selectorButton = document.createElement('button');
        selectorButton.textContent = '🎯 Construir Página de Runas';
        selectorButton.style.cssText = `
            position: fixed;
            bottom: 150px;
            right: 20px;
            background: #f1c40f;
            color: #0F1B3C;
            border: none;
            padding: 1rem 1.5rem;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        selectorButton.addEventListener('click', showRuneBuilder);
        document.body.appendChild(selectorButton);
    }
    
    function showRuneBuilder() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
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
        
        const builder = document.createElement('div');
        builder.style.cssText = `
            background: #1e2d50;
            color: #CDBE91;
            padding: 2rem;
            border-radius: 15px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            border: 2px solid #C8A964;
        `;
        
        builder.innerHTML = `
            <h3 style="color: #C8A964; text-align: center; margin-bottom: 2rem;">Construtor de Runas</h3>
            <div class="rune-build-step">
                <h4>Passo 1: Escolha sua Árvore Primária</h4>
                <div class="tree-options">
                    <button class="tree-btn" data-tree="precisao">🎯 Precisão</button>
                    <button class="tree-btn" data-tree="dominacao">⚔️ Dominação</button>
                    <button class="tree-btn" data-tree="feiticaria">✨ Feitiçaria</button>
                    <button class="tree-btn" data-tree="determinacao">🛡️ Determinação</button>
                    <button class="tree-btn" data-tree="inspiracao">💡 Inspiração</button>
                </div>
            </div>
            
            <div class="rune-build-result" style="margin-top: 2rem; padding: 1rem; background: rgba(200, 169, 100, 0.1); border-radius: 5px; display: none;">
                <h4>Sua Página de Runas:</h4>
                <div id="selected-runes"></div>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <button onclick="${overlay.remove()}" style="background: #C8A964; color: #0F1B3C; border: none; padding: 0.7rem 1.5rem; border-radius: 5px; cursor: pointer; font-weight: bold;">
                    Fechar
                </button>
            </div>
        `;
        
        // Add tree selection logic
        const treeButtons = builder.querySelectorAll('.tree-btn');
        treeButtons.forEach(btn => {
            btn.style.cssText = `
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
            
            btn.addEventListener('click', function() {
                const tree = btn.getAttribute('data-tree');
                const result = builder.querySelector('.rune-build-result');
                const selectedDiv = builder.querySelector('#selected-runes');
                
                result.style.display = 'block';
                selectedDiv.innerHTML = `<p>Árvore Primária: <strong>${btn.textContent}</strong></p>`;
                
                // Highlight selected button
                treeButtons.forEach(b => b.style.background = '#463714');
                btn.style.background = '#C8A964';
                btn.style.color = '#0F1B3C';
            });
        });
        
        overlay.appendChild(builder);
        document.body.appendChild(overlay);
    }
    
    // Add rune selector button
    createRuneSelector();
    
    // Spell cooldown animation
    const spellCards = document.querySelectorAll('.spell-card');
    spellCards.forEach(card => {
        card.addEventListener('click', function() {
            const cooldownElement = card.querySelector('.cooldown');
            const originalText = cooldownElement.textContent;
            
            cooldownElement.textContent = 'Ativado!';
            cooldownElement.style.background = '#C8A964';
            
            setTimeout(() => {
                cooldownElement.textContent = originalText;
                cooldownElement.style.background = '#463714';
            }, 1500);
        });
    });
    
    // Damage calculator
    const damageCards = document.querySelectorAll('.damage-card');
    damageCards.forEach(card => {
        card.addEventListener('click', function() {
            const damageType = card.classList[1];
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
                
                setTimeout(() => {
                    if (demo.parentNode) {
                        demo.parentNode.removeChild(demo);
                    }
                }, 3000);
            }
        });
    });
    
    // Champion rotation
    const championClasses = document.querySelectorAll('.champion-class');
    championClasses.forEach(championClass => {
        championClass.addEventListener('click', function() {
            championClass.style.transform = 'rotateY(360deg)';
            championClass.style.transition = 'transform 0.6s ease';
            
            setTimeout(() => {
                championClass.style.transform = 'rotateY(0deg)';
            }, 600);
        });
    });
    
    // Gold counter animation
    const minionCards = document.querySelectorAll('#minions .card');
    minionCards.forEach(card => {
        const goldElements = card.querySelectorAll('li');
        
        goldElements.forEach(element => {
            element.addEventListener('click', function() {
                const goldMatch = element.textContent.match(/(\d+)/);
                if (goldMatch) {
                    const goldValue = goldMatch[1];
                    
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
    
    // Lane map interaction
    const lanes = document.querySelectorAll('.lane');
    const colors = {
        'top-lane': '#ff6b35',
        'jungle': '#4ecdc4',
        'mid-lane': '#45b7d1',
        'bot-lane': '#96ceb4'
    };
    
    lanes.forEach(lane => {
        const laneClass = lane.classList[1];
        const originalColor = colors[laneClass] || '#463714';
        
        lane.addEventListener('mouseenter', function() {
            lane.style.borderColor = originalColor;
            lane.style.boxShadow = `0 0 15px ${originalColor}40`;
        });
        
        lane.addEventListener('mouseleave', function() {
            lane.style.borderColor = '#463714';
            lane.style.boxShadow = 'none';
        });
    });
    
    // Tooltip system
    const tooltips = {
        'AD': 'Attack Damage - Atributo que aumenta o dano dos ataques básicos e algumas habilidades',
        'AP': 'Ability Power - Atributo que aumenta o dano das habilidades mágicas',
        'Flash': 'O feitiço mais importante! Sempre tenha Flash disponível para escapar ou iniciar',
        'Last Hit': 'Dar o golpe final no minion para receber ouro. Pratique muito!'
    };
    
    const tooltip = document.createElement('div');
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
    
    // Add tooltips to text
    Object.keys(tooltips).forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'g');
        document.querySelectorAll('p, li').forEach(element => {
            if (element.textContent.includes(term) && !element.querySelector('.tooltip-trigger')) {
                element.innerHTML = element.innerHTML.replace(regex, `<span class="tooltip-trigger" data-tooltip="${tooltips[term]}">${term}</span>`);
            }
        });
    });
    
    // Tooltip event listeners
    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('tooltip-trigger')) {
            const tooltipText = e.target.getAttribute('data-tooltip');
            tooltip.textContent = tooltipText;
            tooltip.style.opacity = '1';
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.classList.contains('tooltip-trigger')) {
            tooltip.style.opacity = '0';
        }
    });
    
    // Quiz functionality
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
    
    // Create quiz button
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
            
            button.addEventListener('click', function() {
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
        
        resultBox.querySelector('button').addEventListener('click', function() {
            document.body.removeChild(resultOverlay);
        });
        
        resultOverlay.appendChild(resultBox);
        document.body.appendChild(resultOverlay);
    }
    
    // Konami code easter egg
    let konamiCode = [];
    const requiredCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-8);
        
        if (JSON.stringify(konamiCode) === JSON.stringify(requiredCode)) {
            document.body.style.filter = 'hue-rotate(180deg)';
            
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
    
    // Music toggle
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
    musicToggle.addEventListener('click', function() {
        isMuted = !isMuted;
        musicToggle.innerHTML = isMuted ? '🎵' : '🔇';
        musicToggle.title = isMuted ? 'Ativar som ambiente' : 'Desativar som ambiente';
    });
    
    document.body.appendChild(musicToggle);
    
    // Auto-advance functionality
    let autoAdvance = false;
    let autoAdvanceInterval;
    
    function toggleAutoAdvance() {
        autoAdvance = !autoAdvance;
        
        if (autoAdvance) {
            let currentIndex = Array.from(navButtons).findIndex(btn => btn.classList.contains('active'));
            autoAdvanceInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % navButtons.length;
                const targetSection = navButtons[currentIndex].getAttribute('data-section');
                showSection(targetSection);
                smoothScrollToSection(targetSection);
            }, 5000);
        } else {
            clearInterval(autoAdvanceInterval);
        }
    }
    
    function smoothScrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Auto-advance button
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
    
    autoButton.addEventListener('click', function() {
        toggleAutoAdvance();
        autoButton.style.background = autoAdvance ? '#C8A964' : '#463714';
        autoButton.style.color = autoAdvance ? '#0F1B3C' : '#CDBE91';
    });
    
    document.body.appendChild(autoButton);
    
    // Initialize cards animations
    const cards = document.querySelectorAll('.card, .spell-card, .damage-card, .champion-class, .lane');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    console.log('All features initialized successfully!');
});