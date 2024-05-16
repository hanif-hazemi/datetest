let generatedCaptcha;
let player;

function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    generatedCaptcha = captcha;
    document.getElementById('captcha').textContent = captcha;
}

function verifyCaptcha() {
    const captchaInput = document.getElementById('captcha-input').value;
    if (captchaInput === generatedCaptcha) {
        document.getElementById('captcha-container').style.display = 'none';
        document.getElementById('date-input-container').style.display = 'block';
        player.playVideo(); // Play music when captcha is correct
    } else {
        alert('Captcha incorrect. Please try again.');
        generateCaptcha(); // Regenerate captcha on incorrect attempt
    }
}

function verifyDate() {
    const dateInput = document.getElementById('date-input').value;
    const currentDate = new Date();
    const currentDateString = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

    const feedbackElement = document.getElementById('feedback');
    if (dateInput === currentDateString) {
        feedbackElement.textContent = 'Success! Reloading in 10 seconds...';
        document.getElementById('countdown').style.display = 'block';
        startCountdown();
    } else {
        feedbackElement.textContent = 'Try again.';
        document.getElementById('date-input').value = '';
    }
}

function startCountdown() {
    let countdownTimer = 10;
    const countdownElement = document.getElementById('countdown-timer');
    const interval = setInterval(() => {
        countdownElement.textContent = countdownTimer;
        countdownTimer--;
        if (countdownTimer < 0) {
            clearInterval(interval);
            location.reload();
        }
    }, 1000);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'ssZoq1eUK-s', // Your YouTube video ID
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Player is ready
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo(); // Loop the video
    }
}

// Generate initial captcha on page load
window.onload = generateCaptcha;
