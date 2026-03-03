// Configuration
const CLIENT_ID = "1472338134766321856";
const REDIRECT_URI = "https://algeriendzlesabonnes-gif.github.io/Mdt-Daytona.PRod/";

// 1. Vérifier si on revient de Discord
window.onload = () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = fragment.get('access_token');

    if (accessToken) {
        fetchUserInfo(accessToken);
    } else {
        console.log("Utilisateur non connecté");
    }
};

// 2. Récupérer les infos de l'utilisateur
async function fetchUserInfo(token) {
    const response = await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const user = await response.json();
    
    // Affichage sur le MDT
    document.getElementById('user-name').innerText = user.username;
    document.getElementById('user-avatar').src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    
    // Log Webhook
    sendLogDiscord(`L'agent ${user.username} s'est connecté au MDT.`);
}

// 3. Système de Logs Webhook
function sendLogDiscord(message) {
    const webhookURL = "https://discord.com/api/webhooks/1478178908561215498/xCASiPk1WjK6EMGJcBw0H60haGY_Wi1mClGPdsvttmSB9aXaspSyRn21mE5UAzyM6KJ1";
    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message })
    });
}
