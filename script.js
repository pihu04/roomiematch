// Function to close the bougie pop-up
function closePopup() {
    document.getElementById('statusPopup').style.display = 'none';
}

// Form logic for Early Access
document.getElementById('claimForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Vibe Checked! You're on the list.");
    closePopup();
});
