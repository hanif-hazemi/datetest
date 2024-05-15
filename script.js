function verifyCaptcha() {
    const captchaInput = document.getElementById('captcha-input').value;
    if (captchaInput === '1234') {
        document.getElementById('captcha-container').style.display = 'none';
        document.getElementById('date-input-container').style.display = 'block';
    } else {
        alert('Captcha incorrect. Please try again.');
    }
}

function verifyDate() {
    const dateInput = document.getElementById('date-input').value;
    const currentDate = new Date();
    const currentDateString = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

    const feedbackElement = document.getElementById('feedback');
    if (dateInput === currentDateString) {
        feedbackElement.textContent = 'Success! Reloading in 10 seconds...';
        setTimeout(() => {
            location.reload();
        }, 10000);
    } else {
        feedbackElement.textContent = 'Try again.';
        document.getElementById('date-input').value = '';
    }
}
