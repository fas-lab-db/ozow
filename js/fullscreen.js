
(function() {
    let hideTimeout = null;
    
    function requestFullscreen() {
        const elem = document.documentElement;
        const method = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen;
        if (method) method.call(elem);
    }
    
    function exitFullscreen() {
        const method = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
        if (method) method.call(document);
    }
    
    function updateButton(btn) {
        const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement);
        btn.innerHTML = isFull ? '<i class="fas fa-compress"></i>' : '<i class="fas fa-expand"></i>';
        btn.onclick = isFull ? exitFullscreen : requestFullscreen;
    }
    
    function hideButton(btn) {
        if (!btn) return;
        btn.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (btn && btn.parentNode) {
                btn.style.display = 'none';
            }
        }, 500);
    }
    
    function showButton(btn) {
        if (!btn) return;
        btn.style.display = 'flex';
        btn.style.opacity = '1';
        btn.style.transform = 'scale(1)';
        
        // Clear existing timeout
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
        
        // Hide after 10 seconds
        hideTimeout = setTimeout(() => {
            hideButton(btn);
        }, 10000);
    }
    
    function addButton() {
        // Don't add if already exists
        if (document.getElementById('fs-btn')) return;
        
        const btn = document.createElement('button');
        btn.id = 'fs-btn';
        btn.innerHTML = '<i class="fas fa-expand"></i>';
        btn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            color: white;
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            opacity: 1;
        `;
        
        // Hover effects
        btn.onmouseenter = () => {
            if (btn.style.display !== 'none') {
                btn.style.background = '#FF7B31';
                btn.style.transform = 'scale(1.05)';
            }
        };
        btn.onmouseleave = () => {
            if (btn.style.display !== 'none') {
                btn.style.background = 'rgba(0, 0, 0, 0.6)';
                btn.style.transform = 'scale(1)';
            }
        };
        
        // Fullscreen change listener
        document.addEventListener('fullscreenchange', () => updateButton(btn));
        document.addEventListener('webkitfullscreenchange', () => updateButton(btn));
        
        btn.onclick = requestFullscreen;
        document.body.appendChild(btn);
        
        // Start the 10 second timer
        showButton(btn);
    }
    
    // Add button when page loads
    document.addEventListener('DOMContentLoaded', addButton);
    
    // Also add when navigating between pages (for SPAs)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            // Re-show button on page navigation
            const btn = document.getElementById('fs-btn');
            if (btn) {
                showButton(btn);
            } else {
                addButton();
            }
        }
    }).observe(document, { subtree: true, childList: true });
    
})();
