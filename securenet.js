document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    generateCaptcha();
    setupLoginForm();
    setupTargetConnections();
    setupGoBackButton();
    setupScanningPage();
    setupReportPage();
    initVantaBackgrounds();
    
    // Refresh captcha button
    document.getElementById('refreshCaptcha').addEventListener('click', generateCaptcha);
});

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboardPage = document.getElementById('dashboardPage');
const verificationPage = document.getElementById('verificationPage');
const connectedPage = document.getElementById('connectedPage');
const scanningPage = document.getElementById('scanningPage');
const reportPage = document.getElementById('reportPage');
const loginForm = document.querySelector('.login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const captchaInput = document.getElementById('captcha');
const progressBar = document.getElementById('progressBar');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');
const terminalText = document.getElementById('terminalText');
const targetName = document.getElementById('targetName');
const targetIP = document.getElementById('targetIP');
const sessionId = document.getElementById('sessionId');
const goBackBtn = document.getElementById('goBackBtn');
const startScanBtn = document.getElementById('startScanBtn');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const connectBtns = document.querySelectorAll('.connect-btn');
const scanTargetName = document.getElementById('scanTargetName');
const scanTargetIP = document.getElementById('scanTargetIP');
const scanSessionId = document.getElementById('scanSessionId');
const elapsedTime = document.getElementById('elapsedTime');
const terminalOutput = document.getElementById('terminalOutput');
const terminalProgress = document.getElementById('terminalProgress');
const terminalProgressBar = document.getElementById('terminalProgressBar');
const dashboardProgress = document.getElementById('dashboardProgress');
const dashboardProgressBar = document.getElementById('dashboardProgressBar');
const dashboardLogs = document.getElementById('dashboardLogs');
const portsScanned = document.getElementById('portsScanned');
const vulnerabilitiesFound = document.getElementById('vulnerabilitiesFound');
const timeRemaining = document.getElementById('timeRemaining');
const reportTargetName = document.getElementById('reportTargetName');
const reportTargetIP = document.getElementById('reportTargetIP');
const scanDate = document.getElementById('scanDate');
const scanDuration = document.getElementById('scanDuration');
const criticalCount = document.getElementById('criticalCount');
const highCount = document.getElementById('highCount');
const mediumCount = document.getElementById('mediumCount');
const lowCount = document.getElementById('lowCount');
const infoCount = document.getElementById('infoCount');
const vulnerabilityList = document.getElementById('vulnerabilityList');
const vulnerabilityCards = document.getElementById('vulnerabilityCards');
const backToDashboardBtn = document.getElementById('backToDashboardBtn');

// Sound system
const sounds = {
    login: new Audio(),
    connect: new Audio(),
    alert: new Audio(),
    button: new Audio(),
    ambient: new Audio(),
    scan: new Audio(),
    warning: new Audio(),
    critical: new Audio()
};

// Cybersecurity quotes for rotation
const quotes = [
    {
        text: "The best way to defend is to know how to attack.",
        author: "Cybersecurity Principle"
    },
    {
        text: "Security is a process, not a product.",
        author: "Bruce Schneier"
    },
    {
        text: "Prevention is ideal, but detection is a must.",
        author: "Richard Clarke"
    },
    {
        text: "The only system which is truly secure is one which is switched off and unplugged.",
        author: "Gene Spafford"
    },
    {
        text: "In a world where everything is connected, security is everything.",
        author: "SecureNet Principle"
    },
    {
        text: "Cybersecurity is a shared responsibility.",
        author: "NIST Framework"
    },
    {
        text: "The weakest link in the security chain is the human element.",
        author: "Kevin Mitnick"
    }
];

// Target systems data (updated with URLs)
const targets = {
    server1: {
        name: "AWS Production Server",
        ip: "172.31.18.42",
        url: "http://demo.testfire.net" // Example vulnerable site
    },
    server2: {
        name: "SQL Database Cluster",
        ip: "10.0.14.88",
        url: "http://zero.webappsecurity.com" // Example vulnerable site
    },
    server3: {
        name: "Network Gateway",
        ip: "192.168.1.1",
        url: "http://testphp.vulnweb.com" // Example vulnerable site
    },
    server4: {
        name: "Web Application",
        ip: "app.target.com",
        url: "https://www.ducati.com/in/en/home" // Example vulnerable site
    },
    server5: {
        name: "Security Appliance",
        ip: "10.10.10.254",
        url: "http://zero.webappsecurity.com" // Example vulnerable site
    }
};

// Current target URL variable
let currentTargetUrl = '';

// Vulnerability data
const vulnerabilities = [
    {
        id: "VULN-001",
        name: "Outdated OpenSSL Version",
        description: "The system is running OpenSSL 1.1.1 which has known vulnerabilities. Upgrade to OpenSSL 3.0 or later.",
        severity: "Critical",
        location: "Server: Port 443",
        solution: "Upgrade OpenSSL to the latest version and restart services.",
        cve: "CVE-2022-3602, CVE-2022-3786"
    },
    {
        id: "VULN-002",
        name: "Weak SSH Configuration",
        description: "SSH server allows weak cryptographic algorithms (CBC mode ciphers).",
        severity: "High",
        location: "Server: Port 22",
        solution: "Disable weak ciphers in sshd_config and restart SSH service.",
        cve: "CVE-2008-5161"
    },
    {
        id: "VULN-003",
        name: "SQL Injection Vulnerability",
        description: "Web application is vulnerable to SQL injection attacks via the 'id' parameter.",
        severity: "High",
        location: "Web App: /products.php?id=",
        solution: "Implement parameterized queries and input validation.",
        cve: "CVE-2021-1234"
    },
    {
        id: "VULN-004",
        name: "Exposed Admin Interface",
        description: "Administration interface is accessible without authentication.",
        severity: "High",
        location: "Web App: /admin/",
        solution: "Implement authentication and IP restriction for admin interface.",
        cve: null
    },
    {
        id: "VULN-005",
        name: "Missing Security Headers",
        description: "Web application is missing critical security headers like X-XSS-Protection and Content-Security-Policy.",
        severity: "Medium",
        location: "Web App: All pages",
        solution: "Configure web server to include security headers.",
        cve: null
    },
    {
        id: "VULN-006",
        name: "Default Credentials",
        description: "System is using default credentials for admin access.",
        severity: "Critical",
        location: "Server: Admin console",
        solution: "Change default credentials immediately.",
        cve: null
    },
    {
        id: "VULN-007",
        name: "Directory Listing Enabled",
        description: "Web server has directory listing enabled, exposing sensitive files.",
        severity: "Medium",
        location: "Web App: /uploads/",
        solution: "Disable directory listing in web server configuration.",
        cve: null
    },
    {
        id: "VULN-008",
        name: "Outdated WordPress Version",
        description: "WordPress installation is outdated (version 5.6) with known vulnerabilities.",
        severity: "High",
        location: "Web App: /wp-admin/",
        solution: "Update WordPress to the latest version.",
        cve: "CVE-2021-44223"
    },
    {
        id: "VULN-009",
        name: "Unrestricted File Upload",
        description: "Web application allows upload of any file type without proper validation.",
        severity: "High",
        location: "Web App: /upload.php",
        solution: "Implement file type validation and virus scanning.",
        cve: null
    },
    {
        id: "VULN-010",
        name: "Verbose Error Messages",
        description: "Application displays detailed error messages that reveal system information.",
        severity: "Low",
        location: "Web App: Error pages",
        solution: "Configure custom error pages and disable debug mode.",
        cve: null
    }
];

// Generate random CAPTCHA
function generateCaptcha() {
    const captchaDisplay = document.getElementById('captchaDisplay');
    const captchaText = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    sessionStorage.setItem('captchaText', captchaText);
    
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
    
    for (let i = 0; i < 10; i++) {
        ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }
    
    ctx.font = 'bold 30px monospace';
    ctx.fillStyle = '#00F3B8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < captchaText.length; i++) {
        ctx.save();
        ctx.translate(35 + i * 30, 40);
        ctx.rotate((Math.random() - 0.5) * 0.4);
        ctx.fillText(captchaText[i], 0, 0);
        ctx.restore();
    }
    
    captchaDisplay.innerHTML = '';
    captchaDisplay.appendChild(canvas);
}

// Initialize sounds
function initSounds() {
    sounds.login.src = 'https://assets.mixkit.co/active_storage/sfx/2307/2307.wav';
    sounds.connect.src = 'https://assets.mixkit.co/active_storage/sfx/209/209.wav';
    sounds.alert.src = 'https://assets.mixkit.co/active_storage/sfx/1432/1432.wav';
    sounds.button.src = 'https://assets.mixkit.co/active_storage/sfx/2571/2571.wav';
    sounds.ambient.src = 'https://assets.mixkit.co/active_storage/sfx/2619/2619.wav';
    sounds.scan.src = 'https://assets.mixkit.co/active_storage/sfx/2198/2198.wav';
    sounds.warning.src = 'https://assets.mixkit.co/active_storage/sfx/2404/2404.wav';
    sounds.critical.src = 'https://assets.mixkit.co/active_storage/sfx/2353/2353.wav';
    
    sounds.ambient.loop = true;
    sounds.ambient.volume = 0.3;
    sounds.scan.loop = true;
    sounds.scan.volume = 0.2;
    
    document.getElementById('soundToggle').addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (sounds.ambient.paused) {
            sounds.ambient.play();
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
        } else {
            sounds.ambient.pause();
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
        }
    });
}

function playSound(type) {
    if (sounds[type]) {
        const sound = sounds[type].cloneNode();
        sound.play();
    }
}

// Setup login form
function setupLoginForm() {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const captcha = captchaInput.value.trim();
        const storedCaptcha = sessionStorage.getItem('captchaText');
        
        if (username === '' || password === '' || captcha === '') {
            alert('Please fill in all fields');
            return;
        }
        
        if (captcha.toUpperCase() !== storedCaptcha) {
            alert('Invalid CAPTCHA. Please try again.');
            generateCaptcha();
            captchaInput.value = '';
            return;
        }
        
        if (username === 'admin' && password === 'admin123') {
            playSound('login');
            loginPage.style.display = 'none';
            dashboardPage.style.display = 'block';
            initDashboard();
        } else {
            alert('Invalid credentials. Please try again.');
            generateCaptcha();
        }
    });
}

// Initialize dashboard
function initDashboard() {
    initMatrix();
    initSounds();
    sounds.ambient.play();
    rotateQuotes();
    initAdminPanel();
    enhanceTargetCards();
}

// Initialize Matrix canvas
function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'\#&_(),.;:?!\\|{}<>[]^~';
    const columns = Math.floor(canvas.width / 20);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00F3B8';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
}

// Rotate quotes in dashboard
function rotateQuotes() {
    let currentQuote = 0;
    
    function showNextQuote() {
        const quote = quotes[currentQuote];
        
        quoteText.style.opacity = 0;
        quoteAuthor.style.opacity = 0;
        
        setTimeout(() => {
            quoteText.textContent = quote.text;
            quoteAuthor.textContent = `- ${quote.author}`;
            
            quoteText.style.opacity = 1;
            quoteAuthor.style.opacity = 1;
            
            currentQuote = (currentQuote + 1) % quotes.length;
        }, 500);
    }
    
    showNextQuote();
    setInterval(showNextQuote, 8000);
}

// Admin panel functionality
function initAdminPanel() {
    const userAvatar = document.querySelector('.user-avatar');
    const adminPanel = document.getElementById('adminPanel');
    const closeAdminPanel = document.getElementById('closeAdminPanel');
    const authModal = document.getElementById('authModal');
    const adminButtons = document.querySelectorAll('.admin-btn');
    const cancelAuth = document.getElementById('cancelAuth');
    const submitAuth = document.getElementById('submitAuth');
    const authPassword = document.getElementById('authPassword');
    
    let currentAction = null;
    
    userAvatar.addEventListener('click', function() {
        adminPanel.classList.add('show-panel');
        playSound('button');
    });
    
    closeAdminPanel.addEventListener('click', function() {
        adminPanel.classList.remove('show-panel');
        playSound('button');
    });
    
    adminButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            playSound('button');
            const action = this.getAttribute('data-action');
            const requiresAuth = this.getAttribute('data-requires-auth') === 'true';
            
            if (action === 'logout') {
                if (confirm('Are you sure you want to log out?')) {
                    dashboardPage.style.display = 'none';
                    loginPage.style.display = 'flex';
                    adminPanel.classList.remove('show-panel');
                    sounds.ambient.pause();
                    playSound('login');
                }
                return;
            }
            
            if (requiresAuth) {
                currentAction = action;
                authModal.classList.add('show-modal');
                authPassword.focus();
            } else {
                executeAction(action);
            }
        });
    });
    
    cancelAuth.addEventListener('click', function() {
        authModal.classList.remove('show-modal');
        authPassword.value = '';
        playSound('button');
    });
    
    submitAuth.addEventListener('click', function() {
        const password = authPassword.value;
        
        if (password === 'admin123') {
            authModal.classList.remove('show-modal');
            authPassword.value = '';
            executeAction(currentAction);
        } else {
            alert('Invalid password. Authentication failed.');
            authPassword.value = '';
            authPassword.focus();
        }
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.classList.remove('show-modal');
            authPassword.value = '';
        }
    });
    
    function executeAction(action) {
        switch(action) {
            case 'viewLogs':
                alert('Security logs accessed. Feature coming soon.');
                break;
            case 'configSystem':
                alert('System configuration panel accessed. Feature coming soon.');
                break;
            case 'manageUsers':
                alert('User management console accessed. Feature coming soon.');
                break;
            case 'help':
                alert('Help documentation. Feature coming soon.');
                break;
        }
    }
}

// Enhance target cards with animations
function enhanceTargetCards() {
    const cards = document.querySelectorAll('.target-card');
    
    cards.forEach(card => {
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'status-indicator pulse-animation';
        
        const status = card.querySelector('.target-status').className;
        if (status.includes('online')) {
            statusIndicator.style.backgroundColor = 'var(--success)';
        } else if (status.includes('vulnerable')) {
            statusIndicator.style.backgroundColor = 'var(--warning)';
        } else {
            statusIndicator.style.backgroundColor = 'var(--danger)';
        }
        
        card.appendChild(statusIndicator);
        
        const iconElement = card.querySelector('.target-icon');
        iconElement.classList.add('float-animation');
        
        card.addEventListener('mouseenter', function() {
            playSound('button');
        });
    });
}

// Setup target connections
function setupTargetConnections() {
    connectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetCard = this.closest('.target-card');
            const targetId = targetCard.getAttribute('data-target');
            connectToTarget(targetId);
        });
    });
}

// Connect to target function
function connectToTarget(targetId) {
    const target = targets[targetId];
    currentTargetUrl = target.url; // Store the target URL
    
    dashboardPage.style.display = 'none';
    verificationPage.style.display = 'flex';
    
    progressBar.style.width = '0%';
    step1.classList.remove('step-active', 'step-complete');
    step2.classList.remove('step-active', 'step-complete');
    step3.classList.remove('step-active', 'step-complete');
    step4.classList.remove('step-active', 'step-complete');
    
    terminalText.textContent = '';
    
    setTimeout(() => {
        step1.classList.add('step-active');
        progressBar.style.width = '25%';
        typeText('> Initializing connection...', () => {
            typeText('> Connection initialized.', () => {
                step1.classList.remove('step-active');
                step1.classList.add('step-complete');
                
                setTimeout(() => {
                    step2.classList.add('step-active');
                    progressBar.style.width = '50%';
                    typeText('> Verifying identity...', () => {
                        typeText('> Identity verified.', () => {
                            step2.classList.remove('step-active');
                            step2.classList.add('step-complete');
                            
                            setTimeout(() => {
                                step3.classList.add('step-active');
                                progressBar.style.width = '75%';
                                typeText('> Establishing secure tunnel...', () => {
                                    typeText('> Secure tunnel established.', () => {
                                        step3.classList.remove('step-active');
                                        step3.classList.add('step-complete');
                                        
                                        setTimeout(() => {
                                            step4.classList.add('step-active');
                                            progressBar.style.width = '100%';
                                            typeText(`> Connecting to ${target.name}...`, () => {
                                                typeText(`> Connection successful!`, () => {
                                                    step4.classList.remove('step-active');
                                                    step4.classList.add('step-complete');
                                                    
                                                    setTimeout(() => {
                                                        verificationPage.style.display = 'none';
                                                        connectedPage.style.display = 'flex';
                                                        
                                                        targetName.textContent = target.name;
                                                        targetIP.textContent = target.ip;
                                                        sessionId.textContent = generateSessionId();
                                                    }, 1000);
                                                });
                                            });
                                        }, 500);
                                    });
                                });
                            }, 500);
                        });
                    });
                }, 500);
            });
        });
    }, 500);
}

// Type text animation
function typeText(text, callback) {
    let i = 0;
    terminalText.textContent = '';
    
    function type() {
        if (i < text.length) {
            terminalText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30);
        } else {
            setTimeout(() => {
                terminalText.textContent = '';
                if (callback) callback();
            }, 500);
        }
    }
    
    type();
}

// Generate random session ID
function generateSessionId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Setup go back button
function setupGoBackButton() {
    goBackBtn.addEventListener('click', function() {
        connectedPage.style.display = 'none';
        dashboardPage.style.display = 'block';
    });
}

// Setup scanning page
function setupScanningPage() {
    startScanBtn.addEventListener('click', function() {
        // Show connecting message
        const terminalOutput = document.getElementById('terminalOutput');
        terminalOutput.innerHTML = '';
        addTerminalLog(`> Establishing secure tunnel to virtual site...`);
        addTerminalLog(`> Opening ${currentTargetUrl} in new tab...`);
        
        // Open the real virtual site in a new tab
        setTimeout(() => {
            window.open(currentTargetUrl, '_blank');
            
            // After opening the site, show scanning UI
            setTimeout(() => {
                connectedPage.style.display = 'none';
                scanningPage.style.display = 'block';
                
                // Set target info
                scanTargetName.textContent = targetName.textContent;
                scanTargetIP.textContent = targetIP.textContent;
                scanSessionId.textContent = sessionId.textContent;
                
                // Start scanning simulation
                simulateScanning();
            }, 1000);
        }, 1500);
    });
    
    // Setup view selector
    const viewBtns = document.querySelectorAll('.scanning-view-selector .view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            document.getElementById('terminalView').style.display = view === 'terminal' ? 'block' : 'none';
            document.getElementById('dashboardView').style.display = view === 'dashboard' ? 'block' : 'none';
            
            if (view === 'dashboard') {
                initCharts();
            }
        });
    });
}

// Simulate scanning process
function simulateScanning() {
    let progress = 0;
    let elapsedSeconds = 0;
    let ports = 0;
    let vulns = 0;
    
    sounds.scan.play();
    
    // Update elapsed time
    const timeInterval = setInterval(() => {
        elapsedSeconds++;
        const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
        const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
        elapsedTime.textContent = `${minutes}:${seconds}`;
        
        // Update time remaining (countdown from 1 minute)
        const remaining = 60 - elapsedSeconds;
        if (remaining >= 0) {
            const remMinutes = Math.floor(remaining / 60).toString().padStart(2, '0');
            const remSeconds = (remaining % 60).toString().padStart(2, '0');
            timeRemaining.textContent = `${remMinutes}:${remSeconds}`;
        }
    }, 1000);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
        progress += Math.random() * 2;
        if (progress > 100) progress = 100;
        
        terminalProgress.textContent = Math.floor(progress);
        terminalProgressBar.style.width = `${progress}%`;
        dashboardProgress.textContent = Math.floor(progress);
        dashboardProgressBar.style.width = `${progress}%`;
        
        // Simulate finding ports and vulnerabilities
        if (progress < 30) {
            ports = Math.floor(progress * 2);
            portsScanned.textContent = ports;
        } else if (progress < 70) {
            vulns = Math.floor((progress - 30) * 1.5);
            vulnerabilitiesFound.textContent = vulns;
        }
        
        // Add terminal logs
        if (progress < 20) {
            addTerminalLog(`Scanning ports... Found ${ports} open ports`);
        } else if (progress < 40) {
            addTerminalLog(`Checking service versions on port ${Math.floor(Math.random() * 65535)}`);
        } else if (progress < 60) {
            addTerminalLog(`Analyzing web application structure...`);
        } else if (progress < 80) {
            addTerminalLog(`Testing for common vulnerabilities... Found ${vulns} issues`);
        } else {
            addTerminalLog(`Finalizing scan results...`);
        }
        
        // Add dashboard logs
        if (Math.random() > 0.7) {
            const logTypes = [
                `Port scan completed for ${Math.floor(Math.random() * 10) + 1} ports`,
                `Detected Apache/2.4.29 on port 80`,
                `Found potential XSS vulnerability in contact form`,
                `SSL certificate expires in ${Math.floor(Math.random() * 365)} days`,
                `Detected WordPress version 5.6 (outdated)`,
                `Found admin interface at /admin/`
            ];
            
            addDashboardLog(logTypes[Math.floor(Math.random() * logTypes.length)]);
        }
        
        // Complete scan
        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(timeInterval);
            setTimeout(() => {
                sounds.scan.pause();
                scanningPage.style.display = 'none';
                reportPage.style.display = 'block';
                generateReport();
            }, 1500);
        }
    }, 200);
}

// Add terminal log
function addTerminalLog(message) {
    const logElement = document.createElement('div');
    logElement.className = 'terminal-log';
    logElement.textContent = `> ${message}`;
    terminalOutput.appendChild(logElement);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Add dashboard log
function addDashboardLog(message) {
    const logElement = document.createElement('div');
    logElement.className = 'dashboard-log';
    logElement.innerHTML = `<i class="fas fa-circle"></i> ${message}`;
    dashboardLogs.appendChild(logElement);
    dashboardLogs.scrollTop = dashboardLogs.scrollHeight;
}

// Initialize charts for dashboard view
function initCharts() {
    // Network activity chart
    const networkCtx = document.getElementById('networkGraph').getContext('2d');
    const networkChart = new Chart(networkCtx, {
        type: 'line',
        data: {
            labels: Array(20).fill(''),
            datasets: [{
                label: 'Network Traffic',
                data: Array(20).fill().map(() => Math.random() * 100),
                borderColor: 'rgba(0, 243, 184, 1)',
                backgroundColor: 'rgba(0, 243, 184, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // CPU usage chart
    const cpuCtx = document.getElementById('cpuGraph').getContext('2d');
    const cpuChart = new Chart(cpuCtx, {
        type: 'line',
        data: {
            labels: Array(20).fill(''),
            datasets: [{
                label: 'CPU Usage',
                data: Array(20).fill().map(() => Math.random() * 100),
                borderColor: 'rgba(8, 202, 255, 1)',
                backgroundColor: 'rgba(8, 202, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    
    // Update charts periodically
    setInterval(() => {
        networkChart.data.datasets[0].data.shift();
        networkChart.data.datasets[0].data.push(Math.random() * 100);
        networkChart.update();
        
        cpuChart.data.datasets[0].data.shift();
        cpuChart.data.datasets[0].data.push(Math.random() * 100);
        cpuChart.update();
    }, 1000);
}

// Setup report page
function setupReportPage() {
    // Setup view selector
    const viewBtns = document.querySelectorAll('.report-view-selector .view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            document.getElementById('listView').style.display = view === 'list' ? 'block' : 'none';
            document.getElementById('cardsView').style.display = view === 'cards' ? 'block' : 'none';
        });
    });
    
    // Back to dashboard button
    backToDashboardBtn.addEventListener('click', function() {
        reportPage.style.display = 'none';
        dashboardPage.style.display = 'block';
    });
}

// Generate security report
function generateReport() {
    // Set report info
    reportTargetName.textContent = scanTargetName.textContent;
    reportTargetIP.textContent = scanTargetIP.textContent;
    
    const now = new Date();
    scanDate.textContent = now.toISOString().split('T')[0];
    scanDuration.textContent = elapsedTime.textContent;
    
    // Count vulnerabilities by severity
    let critical = 0, high = 0, medium = 0, low = 0, info = 0;
    
    vulnerabilities.forEach(vuln => {
        if (Math.random() > 0.3) { // 70% chance to include each vulnerability
            switch(vuln.severity) {
                case 'Critical': critical++; break;
                case 'High': high++; break;
                case 'Medium': medium++; break;
                case 'Low': low++; break;
                default: info++;
            }
        }
    });
    
    // Update counts with animation
    animateValue(criticalCount, 0, critical, 1000);
    animateValue(highCount, 0, high, 1000);
    animateValue(mediumCount, 0, medium, 1000);
    animateValue(lowCount, 0, low, 1000);
    animateValue(infoCount, 0, info, 1000);
    
    // Generate vulnerability list
    vulnerabilityList.innerHTML = '';
    vulnerabilityCards.innerHTML = '';
    
    vulnerabilities.forEach(vuln => {
        if (Math.random() > 0.3) { // 70% chance to include each vulnerability
            // List view item
            const listItem = document.createElement('div');
            listItem.className = 'table-row';
            listItem.innerHTML = `
                <div class="row-item severity ${vuln.severity.toLowerCase()}">${vuln.severity}</div>
                <div class="row-item">${vuln.name}</div>
                <div class="row-item">${vuln.location}</div>
                <div class="row-item">${vuln.description.substring(0, 50)}...</div>
            `;
            vulnerabilityList.appendChild(listItem);
            
            // Card view item
            const cardItem = document.createElement('div');
            cardItem.className = `vulnerability-card ${vuln.severity.toLowerCase()}`;
            cardItem.innerHTML = `
                <div class="card-header">
                    <h3>${vuln.name}</h3>
                    <span class="severity-badge">${vuln.severity}</span>
                </div>
                <div class="card-body">
                    <p><strong>Location:</strong> ${vuln.location}</p>
                    <p><strong>Description:</strong> ${vuln.description}</p>
                    ${vuln.cve ? `<p><strong>CVE:</strong> ${vuln.cve}</p>` : ''}
                </div>
                <div class="card-footer">
                    <p><strong>Solution:</strong> ${vuln.solution}</p>
                </div>
            `;
            vulnerabilityCards.appendChild(cardItem);
        }
    });
}

// Animate value counter
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Handle window resize for Matrix canvas
window.addEventListener('resize', function() {
    if (dashboardPage.style.display === 'block') {
        const canvas = document.getElementById('matrixCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Initialize Vanta backgrounds
function initVantaBackgrounds() {
    VANTA.NET({
        el: "#particlesCanvasLogin",
        color: 0x00f3b8,
        backgroundColor: 0x121212,
        points: 20.00,
        maxDistance: 25.00,
        spacing: 15.00,
        showDots: true
    });

    VANTA.NET({
        el: "#particlesCanvasDashboard",
        color: 0x00f3b8,
        backgroundColor: 0x121212,
        points: 20.00,
        maxDistance: 25.00,
        spacing: 15.00,
        showDots: true
    });
}