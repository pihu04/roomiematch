window.addEventListener('load', () => {
    // 8-Second Delay Logic
    setTimeout(() => {
        const popup = document.getElementById('statusPopup');
        if (popup) {
            popup.style.display = 'flex';
        }
    }, 8000); // Wait 8 seconds
});
function toggleQuiz() {
    const modal = document.getElementById('quizModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function nextQuizStep(step) {
    const content = document.getElementById('quiz-content');
    content.style.opacity = '0';
    
    setTimeout(() => {
        if (step === 2) {
            content.innerHTML = `
                <div class="quiz-progress-dots">
                    <div class="dot"></div><div class="dot active"></div><div class="dot"></div><div class="dot"></div>
                </div>
                <p class="step-label">STEP 2 / 4</p>
                <h2 class="quiz-question">How clean do you keep your room?</h2>
                <div class="quiz-options">
                    <button class="quiz-btn-sheer" onclick="nextQuizStep(3)">Minimalist & Tidy ✨</button>
                    <button class="quiz-btn-sheer" onclick="nextQuizStep(3)">Organized Chaos 📚</button>
                    <button class="quiz-btn-sheer" onclick="nextQuizStep(3)">Total Mess 🌪️</button>
                </div>`;
        } else if (step === 3) {
            content.innerHTML = `<h2 class="quiz-question">Analyzing your vibe...</h2><p>Finding matches in your university...</p>`;
            // Trigger result screen here
        }
        content.style.opacity = '1';
    }, 400);
}
function closePopup() {
    document.getElementById('statusPopup').style.display = 'none';
}

document.getElementById('claimForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Vibe Checked! Your status is reserved.");
    closePopup();
});
