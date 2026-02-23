// Function to close the pop-up manually
function closeInstantPopup() {
    document.getElementById('instantPopup').style.display = 'none';
}

// Handle the "Claim My Access" action
document.getElementById('popupClaimForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    
    // Immediate feedback for the student
    alert("Elite Status Claimed! " + email + " has been reserved for Lifetime Premium Access.");
    
    // Close the pop-up
    closeInstantPopup();
});
// Trigger pop-up after 3 seconds
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('popupOverlay').style.display = 'flex';
    }, 3000);
});

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}

document.getElementById('popupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Elite Access Reserved! We've sent a confirmation to your university email.");
    closePopup();
});// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Cursor aura follow
const aura = document.querySelector(".cursorAura");
window.addEventListener("mousemove", (e) => {
  aura.style.left = e.clientX + "px";
  aura.style.top = e.clientY + "px";
});

// Micro “Generate a vibe” prompts
const quickPrompts = [
  "You match someone who laughs like neon in a quiet room. DM them a color.",
  "Your next match speaks in textures. Ask: ‘what does Sunday feel like?’",
  "You collide with a stranger who carries your same song — but in reverse.",
  "A soft-glitch aura approaches. Trade 3 words. No context. Just truth.",
  "Match found: the person you needed, not the one you expected. Say hello like a poem.",
  "You share a mood-season. Build a tiny ritual together: coffee, sky, one secret."
];

const promptText = document.getElementById("promptText");
document.getElementById("spawnPrompt").addEventListener("click", () => {
  const pick = quickPrompts[Math.floor(Math.random() * quickPrompts.length)];
  promptText.textContent = pick;
});

// Oracle generator
const oracleOut = document.getElementById("oracleOut");

function clean(s){ return (s || "").trim(); }

function oracleSentence(mood, aesthetic, energy){
  const openers = [
    "A match appears through the static:",
    "The feed bends and reveals:",
    "A signal breaks the surface:",
    "Your aura syncs with:"
  ];
  const tasks = [
    "Send them a message that starts with a metaphor.",
    "Ask them to describe their day as a color palette.",
    "Trade a small truth, then disappear for an hour.",
    "Share a photo of something ordinary that feels unreal.",
    "Give them a nickname based on their vibe."
  ];
  const twists = [
    "If they reply in under 3 minutes, you’re in the same timeline.",
    "If they reply late, they’re from the parallel dusk.",
    "If they use an emoji you didn’t expect, the match is real.",
    "If they mirror your wording, you’ve met before — somewhere else."
  ];

  const o = openers[Math.floor(Math.random()*openers.length)];
  const t = tasks[Math.floor(Math.random()*tasks.length)];
  const w = twists[Math.floor(Math.random()*twists.length)];

  return `${o} someone with ${mood} mood, ${aesthetic} aesthetic, and ${energy} energy. ${t} ${w}`;
}

document.getElementById("oracleBtn").addEventListener("click", () => {
  const mood = clean(document.getElementById("mood").value) || "velvet static";
  const aesthetic = clean(document.getElementById("aesthetic").value) || "liquid chrome";
  const energy = clean(document.getElementById("energy").value) || "slow burn";

  oracleOut.textContent = oracleSentence(mood, aesthetic, energy);
});

// Function to close the pop-up
function closeInstantPopup() {
    document.getElementById('instantPopup').style.display = 'none';
}

// Handle the "Claim My Access" form submission
document.getElementById('popupClaimForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    
    // Nudge the user with a success message
    alert("Vibe Checked! " + email + " has been reserved for Lifetime Premium Access.");
    
    // Close the pop-up after claiming
    closeInstantPopup();
});
