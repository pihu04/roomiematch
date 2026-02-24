// Example of moving to next page after clicking an option
const options = document.querySelectorAll('.quiz-option');

options.forEach(option => {
    option.addEventListener('click', () => {
        // Add a slight delay for the "bougie" feel
        option.style.borderColor = "#FF7F50";
        option.style.backgroundColor = "rgba(255, 127, 80, 0.05)";
        
        setTimeout(() => {
            // Logic to load the next question or redirect
            window.location.href = "quiz-step-2.html"; 
        }, 400).
    });
});
