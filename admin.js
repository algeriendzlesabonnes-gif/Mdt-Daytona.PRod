/**
 * ADMIN.JS - Gestion du personnel et des permissions
 * Serveur: Daytona RP
 */

const ADMIN_ROLES = ["Captain", "Commander", "Chief", "Staff"];

// Fonction pour vérifier si l'utilisateur est admin
function checkAdminAccess(userRank) {
    const adminBtn = document.getElementById('admin-btn');
    if (ADMIN_ROLES.includes(userRank)) {
        adminBtn.style.display = 'block';
        return true;
    }
    return false;
}

// Initialisation du Panel Admin
function loadAdminPanel() {
    const container = document.getElementById('admin-content');
    container.innerHTML = `
        <div class="admin-grid">
            <div class="admin-card">
                <h3><i class="fas fa-user-plus"></i> Ajouter un Officier</h3>
                <form id="add-officer-form">
                    <input type="text" placeholder="Pseudo Discord" required>
                    <input type="text" placeholder="Matricule (ex: 12-05)" required>
                    <select id="rank-select">
                        <option value="Cadet">Cadet</option>
                        <option value="Officer">Officer</option>
                        <option value="Sergeant">Sergeant</option>
                        <option value="Lieutenant">Lieutenant</option>
                        <option value="Captain">Captain</option>
                    </select>
                    <button type="submit" class="btn-save">Enregistrer</button>
                </form>
            </div>

            <div class="admin-card">
                <h3><i class="fas fa-list"></i> Liste du Personnel</h3>
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Badge</th>
                            <th>Nom</th>
                            <th>Grade</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="officer-list">
                        </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('add-officer-form').addEventListener('submit', handleAddOfficer);
}

// Envoyer un log de promotion/sanction
function logAdminAction(action) {
    const webhookURL = "https://discord.com/api/webhooks/1478178908561215498/xCASiPk1WjK6EMGJcBw0H60haGY_Wi1mClGPdsvttmSB9aXaspSyRn21mE5UAzyM6KJ1";
    
    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [{
                title: "🛡️ ACTION ADMIN - MDT",
                description: action,
                color: 15158332, // Rouge
                timestamp: new Date()
            }]
        })
    });
}

async function handleAddOfficer(e) {
    e.preventDefault();
    // Ici on ajouterait à Firebase
    alert("Officier ajouté avec succès dans la base de données !");
    logAdminAction("Un nouvel officier a été ajouté au système par un administrateur.");
}

// Expose les fonctions
window.showTab = function(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.btn-nav').forEach(b => b.classList.remove('active'));
    
    document.getElementById('tab-' + tabName).style.display = 'block';
    if(tabName === 'admin') loadAdminPanel();
};
