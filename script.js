window.addEventListener('load', () => {
    // 8-Second Delay Logic
    setTimeout(() => {
        const popup = document.getElementById('statusPopup');
        if (popup) {
            popup.style.display = 'flex';
        }
    }, 8000); // Wait 8 seconds
});

function closePopup() {
    document.getElementById('statusPopup').style.display = 'none';
}

document.getElementById('claimForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Vibe Checked! Your status is reserved.");
    closePopup();
});
