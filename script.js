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
                <p class="step-label" style="color:var(--coral)">STEP 2 / 4</p>
                <h2 class="quiz-question" style="font-family:Syne; color:white; font-size:2rem;">Cleanliness Level?</h2>
                <div class="quiz-options">
                    <button class="quiz-btn-sheer" onclick="nextQuizStep(3)">Minimalist ✨</button>
                    <button class="quiz-btn-sheer" onclick="nextQuizStep(3)">Organized Chaos 📚</button>
                </div>`;
        } else if (step === 3) {
            content.innerHTML = `<h2 class="quiz-question" style="color:white;">Analyzing your vibe...</h2>`;
        }
        content.style.opacity = '1';
    }, 400);
}
