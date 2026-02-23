// Wait for the page to load, then start the 8-second timer
window.addEventListener('load', () => {
    console.log("Timer started...");
    setTimeout(() => {
        const popup = document.getElementById('statusPopup');
        if (popup) {
            popup.style.display = 'flex'; // Show the popup
            console.log("Popup triggered after 8 seconds");
        }
    }, 8000); // 8000 milliseconds = 8 seconds
});

// Function to close the popup
function closePopup() {
    document.getElementById('statusPopup').style.display = 'none';
}

// Handle Form Submission
document.getElementById('claimForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Vibe Checked! Your elite status is reserved. Check your uni inbox soon!");
    closePopup();
});
