// NIGHT FURY ENGINEERING LABORATORY // CONTROL SCRIPT
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SYSTEM INITIALIZATION & PRELOADER LOGS
    // ==========================================
    const preloader = document.getElementById('preloader');
    const progress = document.querySelector('.loader-progress');
    const loadStatus = document.getElementById('load-status');
    const speedNumber = document.querySelector('.speed-number');
    const engineStartSound = document.getElementById('engine-start-sound');
    
    const sysLogs = [
        { limit: 20, text: "INIT SYSTEM_BUS..." },
        { limit: 40, text: "LOADING CHASSIS_FRAME.CAD..." },
        { limit: 60, text: "COMPILING TELEMETRY_MATRIX..." },
        { limit: 80, text: "OPTIMIZING SHOCK_SPRING_LOAD..." },
        { limit: 99, text: "ALIGNING STEERING_GEOMETRY..." },
        { limit: 100, text: "SYSTEM_READY // IGNITION" }
    ];

    let count = 0;
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 6) + 2;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            
            if (speedNumber) speedNumber.textContent = "100";
            if (progress) progress.style.width = "100%";
            if (loadStatus) loadStatus.textContent = "SYSTEM_READY // IGNITION";
            
            // Try to trigger audio on ignition
            if (engineStartSound) {
                engineStartSound.volume = 0.4;
                engineStartSound.play().catch(() => {/* Autoplay safeguard */});
            }
            
            setTimeout(() => {
                if (preloader) preloader.classList.add('loaded');
                // Trigger stats count up after preloader hides
                startStatsCounter();
            }, 600);
        } else {
            if (speedNumber) speedNumber.textContent = count.toString().padStart(2, '0');
            if (progress) progress.style.width = count + '%';
            
            // Cycle through monospace log steps based on progress
            const logItem = sysLogs.find(log => count <= log.limit);
            if (logItem && loadStatus) {
                loadStatus.textContent = logItem.text;
            }
        }
    }, 40);


    // ==========================================
    // 2. INTERACTIVE COORDINATE CURSOR CROSSHAIR
    // ==========================================
    const precisionCursor = document.getElementById('precision-cursor');
    const cursorCoords = precisionCursor ? precisionCursor.querySelector('.cursor-coords') : null;
    
    if (precisionCursor) {
        document.addEventListener('mousemove', (e) => {
            // Reposition crosshair reticle smoothly
            precisionCursor.style.left = e.clientX + 'px';
            precisionCursor.style.top = e.clientY + 'px';
            
            // Update active coordinate tags in real-time
            if (cursorCoords) {
                const posX = e.clientX.toString().padStart(4, '0');
                const posY = e.clientY.toString().padStart(4, '0');
                cursorCoords.textContent = `X:${posX} // Y:${posY}`;
            }
        });
    }


    // ==========================================
    // 3. LABORATORY AUDIO AMBIENCE
    // ==========================================
    const soundToggle = document.getElementById('sound-toggle');
    const engineRevSound = document.getElementById('engine-rev-sound');
    
    if (soundToggle && engineRevSound) {
        soundToggle.addEventListener('click', () => {
            soundToggle.classList.toggle('active');
            
            if (soundToggle.classList.contains('active')) {
                engineRevSound.volume = 0.25;
                engineRevSound.loop = true;
                engineRevSound.play().catch(() => {
                    alert("Click anywhere on the lab interface first to enable laboratory audio!");
                    soundToggle.classList.remove('active');
                });
            } else {
                engineRevSound.pause();
            }
        });
    }


    // ==========================================
    // 4. RESPONSIVE NAVIGATION & HAMBURGER
    // ==========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Hamburger animation
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu drawer when navigation items are clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }


    // ==========================================
    // 5. HEADER BACKGROUND SCROLL
    // ==========================================
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // ==========================================
    // 6. INTERACTIVE BLUEPRINT TABS SWITCHER & LEADER UPDATES
    // ==========================================
    const kartTabBtns = document.querySelectorAll('.kart-tab-btn');
    const kartDisplayImg = document.getElementById('kart-display-img');
    const annoEngineText = document.getElementById('anno-engine-text');
    
    kartTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            kartTabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.kart-spec-details').forEach(spec => spec.classList.remove('active'));
            
            // Active state trigger
            btn.classList.add('active');
            const kartType = btn.getAttribute('data-kart');
            const targetSpec = document.getElementById(`spec-${kartType}`);
            targetSpec.classList.add('active');
            
            // Adjust the structural drawing filter based on powerplant type
            if (kartType === 'volt') {
                // Electro Blue Blueprint Filter
                kartDisplayImg.style.filter = 'invert(1) sepia(1) saturate(5) hue-rotate(180deg) drop-shadow(0 0 10px rgba(0, 102, 255, 0.4))';
                
                // Update blueprint annotation leader text to electric powerplant details
                if (annoEngineText) {
                    annoEngineText.textContent = "[ ANNO_03: 4.2kWh_EV_UNIT // 70Nm ]";
                }
            } else {
                // Classic Carbon Gray / White
                kartDisplayImg.style.filter = 'none';
                
                // Restore gasoline engine details
                if (annoEngineText) {
                    annoEngineText.textContent = "[ ANNO_03: 125cc_2_STROKE_ICE ]";
                }
            }
        });
    });


    // ==========================================
    // 7. DYNAMIC HUD TELEMETRY TRACK VARIANCES
    // ==========================================
    const hudTrackTemp = document.getElementById('hud-track-temp');
    if (hudTrackTemp) {
        setInterval(() => {
            // Gently drift temperatures between 32.1 and 32.9 to simulate live track sensor feeds
            const variance = (32.0 + Math.random() * 0.9).toFixed(1);
            hudTrackTemp.textContent = `${variance}°C`;
        }, 3000);
    }


    // ==========================================
    // 8. REAL-TIME CANVAS OSCILLOSCOPE TELEMETRY
    // ==========================================
    const canvas = document.getElementById('telemetry-graph');
    const telemetryRpmText = document.getElementById('telemetry-rpm');
    const telemetrySpeedText = document.getElementById('telemetry-speed');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let points = Array(50).fill(50);
        let time = 0;
        
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const renderGraph = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 1. Draw grids
            ctx.strokeStyle = document.body.classList.contains('light-theme') ? 'rgba(0, 102, 255, 0.05)' : 'rgba(255, 91, 0, 0.05)';
            ctx.lineWidth = 1;
            
            const gridSize = 20;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            // 2. Generate new fluctuating telemetry value
            time += 0.15;
            // Complex wave summation simulating active motor rev variations
            const nextVal = 55 + (Math.sin(time) * 20) + (Math.cos(time * 2.3) * 10) + (Math.random() * 5);
            points.push(nextVal);
            points.shift();
            
            // Update metric texts
            if (telemetryRpmText) {
                // Scale values to realistic RPMs (4800 to 7200)
                const currentRpm = Math.floor(4500 + (nextVal * 32));
                telemetryRpmText.textContent = currentRpm.toString().padStart(4, '0');
            }
            if (telemetrySpeedText) {
                // Scale values to realistic speeds (92.4 to 109.8 km/h)
                const currentSpeed = (88.0 + (nextVal * 0.22)).toFixed(1);
                telemetrySpeedText.textContent = currentSpeed;
            }
            
            // 3. Draw active speed curves
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = document.body.classList.contains('light-theme') ? '#0066ff' : '#ff5b00';
            
            for (let i = 0; i < points.length; i++) {
                const x = (canvas.width / (points.length - 1)) * i;
                // Invert graph coordinates
                const y = canvas.height - points[i];
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
            
            // 4. Fill subtle area below line
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.fillStyle = document.body.classList.contains('light-theme') ? 'rgba(0, 102, 255, 0.05)' : 'rgba(255, 91, 0, 0.03)';
            ctx.fill();
            
            requestAnimationFrame(renderGraph);
        };
        
        renderGraph();
    }


    // ==========================================
    // 9. LAB DECIMAL STATS COUNTER-UP
    // ==========================================
    function startStatsCounter() {
        const statsData = [
            { id: 'stat-wins', target: 1, decimals: 0, suffix: '' },
            { id: 'stat-members', target: 25, decimals: 0, suffix: '+' },
            { id: 'stat-experience', target: 1.5, decimals: 1, suffix: '' },
            { id: 'stat-tests', target: 100, decimals: 0, suffix: '%' }
        ];
        
        statsData.forEach(item => {
            const el = document.getElementById(item.id);
            if (!el) return;
            
            let current = 0;
            const steps = 40;
            const stepVal = item.target / steps;
            let currentStep = 0;
            
            const timer = setInterval(() => {
                currentStep++;
                current += stepVal;
                
                if (currentStep >= steps) {
                    clearInterval(timer);
                    el.textContent = item.target.toFixed(item.decimals) + item.suffix;
                } else {
                    el.textContent = current.toFixed(item.decimals) + item.suffix;
                }
            }, 25);
        });
    }


    // ==========================================
    // 10. REAL-TIME COMPETITION TIMER
    // ==========================================
    const countdowns = document.querySelectorAll('.competition-countdown');
    
    countdowns.forEach(timer => {
        const dateStr = timer.getAttribute('data-date');
        if (!dateStr) return;
        
        const targetTime = new Date(dateStr).getTime();
        
        const updateTimer = () => {
            const now = new Date().getTime();
            const diff = targetTime - now;
            
            if (diff <= 0) {
                timer.innerHTML = "🏁 SCHED_ACTIVE // COMMENCING";
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            timer.innerHTML = `T-MINUS: <strong>${days}d ${hours}h ${minutes}m ${seconds}s</strong>`;
        };
        
        updateTimer();
        setInterval(updateTimer, 1000);
    });


    // ==========================================
    // 11. BENTO PHOTO LIGHTBOX MODAL
    // ==========================================
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.getElementById('close-lightbox');
    
    if (lightbox && lightboxImg && lightboxCaption) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('h4').textContent;
                const desc = item.querySelector('p').textContent;
                
                lightboxImg.src = img.src;
                lightboxCaption.innerHTML = `<strong>${title}</strong> // ${desc}`;
                lightbox.classList.add('visible');
            });
        });
    }
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('visible');
        });
    }


    // ==========================================
    // 12. IMPERSIVE POV VIDEO MODAL
    // ==========================================
    const videoModal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('modal-iframe');
    const playVideoBtn = document.getElementById('play-video-btn');
    const allVideosBtn = document.getElementById('all-videos-btn');
    const closeVideo = document.getElementById('close-video');
    
    function openRacingPOV(e) {
        e.preventDefault();
        if (videoModal && modalIframe) {
            // High speed POV go kart telemetry track run
            modalIframe.src = "https://www.youtube.com/embed/z4sT-YpEExY?autoplay=1";
            videoModal.classList.add('visible');
        }
    }
    
    if (playVideoBtn) playVideoBtn.addEventListener('click', openRacingPOV);
    if (allVideosBtn) allVideosBtn.addEventListener('click', openRacingPOV);
    
    if (closeVideo && videoModal && modalIframe) {
        closeVideo.addEventListener('click', () => {
            videoModal.classList.remove('visible');
            modalIframe.src = ""; // Clear source to stop playback
        });
    }


    // ==========================================
    // 13. TELEMETRY PACKET FORM SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            contactForm.classList.add('hidden');
            formSuccess.classList.add('visible');
            
            setTimeout(() => {
                contactForm.reset();
            }, 600);
        });
    }


    // ==========================================
    // 14. NEWSLETTER LOGS
    // ==========================================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("SUCCESS // TELEMETRY LOG CHANNEL ALIGNED!");
            newsletterForm.reset();
        });
    }


    // ==========================================
    // 15. ACTIVE NAV SPY
    // ==========================================
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // ==========================================
    // 16. LABORATORY SCHEMA (LIGHT SCHEMA) MODE
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            let theme = 'dark';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light';
            }
            localStorage.setItem('theme', theme);
        });
    }


    // ==========================================
    // 17. MODAL DISMISS ACTIONS
    // ==========================================
    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('visible');
        }
        if (e.target === videoModal) {
            videoModal.classList.remove('visible');
            if (modalIframe) modalIframe.src = "";
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox) lightbox.classList.remove('visible');
            if (videoModal) {
                videoModal.classList.remove('visible');
                if (modalIframe) modalIframe.src = "";
            }
        }
    });
});
