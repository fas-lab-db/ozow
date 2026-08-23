

        (function() {
            const startTime = Date.now();
            const duration = 5000; 
            
            function updateTimer() {
                const timerElement = document.getElementById('splash-timer-text');
                if (timerElement) {
                    const elapsed = Date.now() - startTime;
                    const remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
                    timerElement.textContent = remaining + 's';
                }
            }
            
            const timerInterval = setInterval(updateTimer, 100);
            
            setTimeout(function() {
                clearInterval(timerInterval);
                const overlay = document.getElementById('orange-splash-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                    setTimeout(function() {
                        overlay.remove();
                    }, 500);
                }
            }, duration);
        })();
    