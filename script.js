// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
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
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const sectionId = button.getAttribute('data-section');
      console.log(`Button clicked, section: ${sectionId}`);
      showSection(sectionId);
    });

    // Also add keyboard support
    button.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const sectionId = button.getAttribute('data-section');
        showSection(sectionId);
      }
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.altKey) {
      const currentActive = document.querySelector('.nav-btn.active');
      const currentIndex = Array.from(navButtons).indexOf(currentActive);
      let nextIndex = currentIndex;

      switch (e.key) {
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

  // Função para runas colapsáveis
  function initializeCollapsibleRunes() {
    const runeHeaders = document.querySelectorAll('.rune-header');

    runeHeaders.forEach(header => {
      header.addEventListener('click', function () {
        const runeTree = header.parentElement;
        const isExpanded = runeTree.classList.contains('expanded');

        // Colapsar todas as outras runas primeiro
        document.querySelectorAll('.rune-tree').forEach(tree => {
          if (tree !== runeTree) {
            tree.classList.remove('expanded');
          }
        });

        // Toggle da runa clicada
        if (isExpanded) {
          runeTree.classList.remove('expanded');
        } else {
          runeTree.classList.add('expanded');
        }
      });
    });
  }

  // Adicionar animação de entrada para as runas
  function animateRuneEntrance() {
    const runeHeaders = document.querySelectorAll('.rune-header');

    runeHeaders.forEach((header, index) => {
      header.style.opacity = '0';
      header.style.transform = 'translateY(20px)';
      header.style.animation = `slideInUp 0.6s ease forwards`;
      header.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Função para criar popup de runas
  function createRunePopup(runeName, runeDesc) {
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 27, 60, 0.8);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    // Criar popup
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: #1e2d50;
        color: #CDBE91;
        padding: 2rem;
        border-radius: 15px;
        border: 2px solid #C8A964;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        position: relative;
    `;

    popup.innerHTML = `
        <h3 style="color: #C8A964; margin-bottom: 1rem;">${runeName}</h3>
        <p style="margin-bottom: 1rem;">${runeDesc}</p>
        <div style="text-align: center;">
            <button class="close-popup-btn" style="
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

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Função para fechar
    function closePopup() {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }

    // Fechar com botão
    const closeBtn = popup.querySelector('.close-popup-btn');
    closeBtn.addEventListener('click', closePopup);

    // Fechar clicando fora
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closePopup();
      }
    });

    // Fechar com ESC
    function handleKeydown(e) {
      if (e.key === 'Escape') {
        closePopup();
        document.removeEventListener('keydown', handleKeydown);
      }
    }
    document.addEventListener('keydown', handleKeydown);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 5000);
  }

  // Enhanced rune interactions
  const runeItems = document.querySelectorAll('.rune-item');
  runeItems.forEach(item => {
    item.addEventListener('click', function () {
      const runeName = item.querySelector('strong').textContent;
      const runeDesc = item.querySelector('p').textContent;
      createRunePopup(runeName, runeDesc);
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

      btn.addEventListener('click', function () {
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
  // Initialize collapsible runes
  initializeCollapsibleRunes();
  animateRuneEntrance();
  // Initialize spell animations
  initializeSpellAnimations();


  // Spell cooldown animation
  const spellCards = document.querySelectorAll('.spell-card');
  spellCards.forEach(card => {
    card.addEventListener('click', function () {
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

  // Substituir a seção de spell animations no JavaScript

// Mapa de efeitos sonoros dos feitiços
const spellSounds = {
    flash: 'assets/sounds/flash.mp3',
    ignite: 'assets/sounds/ignite.mp3',
    heal: 'assets/sounds/heal.mp3',
    teleport: 'assets/sounds/teleport.mp3',
    barrier: 'assets/sounds/barrier.mp3',
    exhaust: 'assets/sounds/exhaust.mp3',
    cleanse: 'assets/sounds/cleanse.mp3',
    ghost: 'assets/sounds/ghost.mp3',
    smite: 'assets/sounds/smite.mp3'
};

// Função para criar efeito de ondulação
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Função para tocar efeito sonoro
function playSpellSound(spellName) {
    const audio = new Audio(spellSounds[spellName]);
    audio.volume = 0.5; // Volume 50%
    audio.play().catch(e => {
        console.log('Não foi possível reproduzir o som:', e);
    });
}

// Spell cooldown animation - versão aprimorada
function initializeSpellAnimations() {
    const spellCards = document.querySelectorAll('.spell-card');
    const activeSpells = new Set(); // Para rastrear feitiços em cooldown
    
    spellCards.forEach(card => {
        card.addEventListener('click', function(event) {
            const spellName = card.getAttribute('data-spell');
            const spellColor = card.getAttribute('data-color');
            const cooldownElement = card.querySelector('.cooldown');
            const originalText = cooldownElement.textContent;
            
            // Evitar clicks múltiplos enquanto em cooldown
            if (activeSpells.has(spellName)) {
                return;
            }
            
            // Adicionar feitiço ao conjunto de ativos
            activeSpells.add(spellName);
            
            // Criar efeito de ondulação
            createRippleEffect(event, card);
            
            // Tocar efeito sonoro
            playSpellSound(spellName);
            
            // Aplicar efeitos visuais
            card.style.setProperty('--glow-color', spellColor);
            card.classList.add('glowing', 'pulsing', 'active');
            
            // Efeito de pulso na imagem
            const spellIcon = card.querySelector('.spell-icon');
            spellIcon.style.boxShadow = `0 0 30px ${spellColor}`;
            
            // Mudar texto para "Ativado!"
            cooldownElement.textContent = 'Ativado!';
            
            // Extrair número do cooldown do texto original
            const cooldownMatch = originalText.match(/(\d+)s/);
            let cooldownSeconds = cooldownMatch ? parseInt(cooldownMatch[1]) : 5;
            
            // Animação de countdown
            let countdown = cooldownSeconds;
            
            const countdownInterval = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    cooldownElement.textContent = `${countdown}s`;
                } else {
                    // Limpar efeitos após término do cooldown
                    clearInterval(countdownInterval);
                    
                    // Remover classes de efeito
                    card.classList.remove('glowing', 'pulsing', 'active');
                    spellIcon.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
                    cooldownElement.textContent = originalText;
                    
                    // Remover feitiço do conjunto de ativos
                    activeSpells.delete(spellName);
                    
                    // Efeito visual de "pronto para usar"
                    card.style.animation = 'spell-ready 0.5s ease';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 500);
                }
            }, 1000);
        });
        
        // Hover effect adicional
        card.addEventListener('mouseenter', function() {
            if (!activeSpells.has(card.getAttribute('data-spell'))) {
                const spellColor = card.getAttribute('data-color');
                const spellIcon = card.querySelector('.spell-icon');
                spellIcon.style.boxShadow = `0 0 15px ${spellColor}`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!activeSpells.has(card.getAttribute('data-spell'))) {
                const spellIcon = card.querySelector('.spell-icon');
                spellIcon.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
            }
        });
    });
}

// Animação CSS adicional para quando o feitiço fica pronto
const spellReadyStyle = document.createElement('style');
spellReadyStyle.textContent = `
    @keyframes spell-ready {
        0% { border-color: #463714; }
        50% { 
            border-color: #C8A964; 
            box-shadow: 0 0 20px rgba(200, 169, 100, 0.5);
        }
        100% { border-color: #463714; }
    }
`;
document.head.appendChild(spellReadyStyle);


  // Damage calculator
  const damageCards = document.querySelectorAll('.damage-card');
  damageCards.forEach(card => {
    card.addEventListener('click', function () {
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

        switch (damageType) {
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

  // Enhanced Champion Class Interactions
  const championClasses = document.querySelectorAll('.champion-class');
  championClasses.forEach(championClass => {
    championClass.addEventListener('click', function () {
      const className = championClass.getAttribute('data-class');
      const classInfo = getClassInfo(className);
      
      // Efeito de rotação
      championClass.style.transform = 'rotateY(360deg)';
      championClass.style.transition = 'transform 0.6s ease';

      setTimeout(() => {
        championClass.style.transform = 'rotateY(0deg)';
        showClassPopup(classInfo);
      }, 600);
    });
  });

  function getClassInfo(className) {
    const classData = {
      tank: {
        name: 'Tanks',
        description: 'Tanks são campeões corpo a corpo resistentes que sacrificam dano por controle de multidão poderoso.',
        playstyle: 'Iniciação, proteção de aliados, absorção de dano',
        subclasses: ['Vanguard', 'Warden'],
        examples: 'Malphite, Ornn, Sejuani, Maokai, Braum',
        tips: 'Construa itens de resistência, foque em proteção de equipe, inicie team fights'
      },
      fighter: {
        name: 'Fighters',
        description: 'Fighters são um grupo diverso de combatentes de curta distância que excel tanto em causar quanto em sobreviver a dano.',
        playstyle: 'Duelos 1v1, dano sustentado, combates prolongados',
        subclasses: ['Juggernaut', 'Diver'],
        examples: 'Darius, Camille, Jax, Garen, Fiora',
        tips: 'Balance entre dano e resistência, domine o side lane, force duelos'
      },
      slayer: {
        name: 'Slayers',
        description: 'Slayers são campeões altamente móveis especializados em dano em rajada contra alvos únicos.',
        playstyle: 'Burst damage, mobilidade, eliminação de alvos prioritários',
        subclasses: ['Assassin', 'Skirmisher'],
        examples: 'Zed, Yasuo, Katarina, Fizz, Qiyana',
        tips: 'Aguarde oportunidades, elimine ADC/Mid, use mobilidade para escapar'
      },
      marksman: {
        name: 'Marksmen',
        description: 'Marksmen são campeões à distância cujo poder gira quase exclusivamente em torno de seus ataques básicos.',
        playstyle: 'DPS à distância, ataques básicos, dano sustentado',
        subclasses: ['Artillery', 'Crit ADC'],
        examples: 'Jinx, Ashe, Kai\'Sa, Caitlyn, Ezreal',
        tips: 'Mantenha distância, faça farm no early game, posicione-se atrás da equipe'
      },
      mage: {
        name: 'Mages',
        description: 'Mages são campeões que possuem grande alcance, dano em área baseado em habilidades e controle de multidão.',
        playstyle: 'Burst damage, controle, combos de habilidades',
        subclasses: ['Burst', 'Battle', 'Artillery'],
        examples: 'Azir, Ahri, Syndra, Orianna, Xerath',
        tips: 'Gerencie mana e cooldowns, posicione-se bem, faça combos'
      },
      controller: {
        name: 'Controllers',
        description: 'Controllers auxiliam aliados com utilidade poderosa e mantêm inimigos afastados com controle de multidão.',
        playstyle: 'Suporte, utilidade, proteção da equipe',
        subclasses: ['Enchanter', 'Catcher'],
        examples: 'Lulu, Thresh, Janna, Blitzcrank, Braum',
        tips: 'Proteja aliados, controle objetivos, garanta visão de mapa'
      }
    };
    
    return classData[className] || null;
  }

  function showClassPopup(classInfo) {
    if (!classInfo) return;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 27, 60, 0.9);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    const popup = document.createElement('div');
    popup.style.cssText = `
      background: #1e2d50;
      color: #CDBE91;
      padding: 2rem;
      border-radius: 15px;
      border: 2px solid #C8A964;
      max-width: 600px;
      width: 90%;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      position: relative;
    `;

    popup.innerHTML = `
      <h3 style="color: #C8A964; margin-bottom: 1rem; text-align: center;">${classInfo.name}</h3>
      <p style="margin-bottom: 1rem; line-height: 1.5;">${classInfo.description}</p>
      
      <div style="background: rgba(200, 169, 100, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
        <strong style="color: #C8A964;">Estilo de Jogo:</strong> ${classInfo.playstyle}
      </div>
      
      <div style="margin-bottom: 1rem;">
        <strong style="color: #C8A964;">Subclasses:</strong> ${classInfo.subclasses.join(', ')}
      </div>
      
      <div style="margin-bottom: 1rem;">
        <strong style="color: #C8A964;">Exemplos:</strong> ${classInfo.examples}
      </div>
      
      <div style="background: rgba(70, 55, 20, 0.3); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
        <strong style="color: #C8A964;">💡 Dicas:</strong> ${classInfo.tips}
      </div>
      
      <div style="text-align: center;">
        <button class="close-class-popup" style="
          background: #C8A964;
          color: #0F1B3C;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        ">Fechar</button>
      </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Fechar popup
    const closeBtn = popup.querySelector('.close-class-popup');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
      }
    });
  }

  // Gold counter animation
  const minionCards = document.querySelectorAll('#minions .card');
  minionCards.forEach(card => {
    const goldElements = card.querySelectorAll('li');

    goldElements.forEach(element => {
      element.addEventListener('click', function () {
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

    lane.addEventListener('mouseenter', function () {
      lane.style.borderColor = originalColor;
      lane.style.boxShadow = `0 0 15px ${originalColor}40`;
    });

    lane.addEventListener('mouseleave', function () {
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
  document.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('tooltip-trigger')) {
      const tooltipText = e.target.getAttribute('data-tooltip');
      tooltip.textContent = tooltipText;
      tooltip.style.opacity = '1';

      const rect = e.target.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    }
  });

  document.addEventListener('mouseout', function (e) {
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

      button.addEventListener('click', function () {
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

    resultBox.querySelector('button').addEventListener('click', function () {
      document.body.removeChild(resultOverlay);
    });

    resultOverlay.appendChild(resultBox);
    document.body.appendChild(resultOverlay);
  }

  // Versão alternativa mais robusta
  // Adicionar depois da inicialização do DOM

  function initializeKonamiCode() {
    let konamiCode = [];
    const requiredCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'
    ];

    document.addEventListener('keydown', function (e) {
      konamiCode.push(e.code);
      konamiCode = konamiCode.slice(-8);

      if (JSON.stringify(konamiCode) === JSON.stringify(requiredCode)) {
        showEasterEgg();
      }
    });
  }

  function showEasterEgg() {
    // Aplicar filtro
    document.body.style.filter = 'hue-rotate(180deg)';

    // Criar overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 27, 60, 0.9);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    // Criar popup
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        background: linear-gradient(45deg, #C8A964, #463714);
        color: #CDBE91;
        padding: 3rem;
        border-radius: 20px;
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        border: 3px solid #CDBE91;
        box-shadow: 0 0 30px rgba(200, 169, 100, 0.5);
        animation: bounce 0.5s ease infinite alternate;
    `;
    celebration.innerHTML = '🎉 EASTER EGG ENCONTRADO! 🎉<br><br>Você é um verdadeiro invocador!';

    overlay.appendChild(celebration);
    document.body.appendChild(overlay);

    // Adicionar CSS da animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);

    // Limpar após 3 segundos
    setTimeout(() => {
      document.body.style.filter = 'none';
      document.body.removeChild(overlay);
      document.head.removeChild(style);
    }, 3000);
  }

  // Chamar dentro do DOMContentLoaded
  initializeKonamiCode();

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
  musicToggle.addEventListener('click', function () {
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

  autoButton.addEventListener('click', function () {
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