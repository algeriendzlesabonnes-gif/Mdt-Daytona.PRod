// Fonctions supplémentaires pour le panel admin
function addStaff() {
    let staffList = JSON.parse(localStorage.getItem('dt_staff')) || [];
    const newMember = {
        name: document.querySelector('[x-model="newStaff.name"]').value,
        badge: document.querySelector('[x-model="newStaff.badge"]').value,
        pass: document.querySelector('[x-model="newStaff.pass"]').value,
        rank: document.querySelector('[x-model="newStaff.rank"]').value
    };

    if(newMember.name && newMember.badge) {
        staffList.push(newMember);
        localStorage.setItem('dt_staff', JSON.stringify(staffList));
        alert("Officier enregistré avec succès !");
        location.reload(); // Rafraichir pour mettre à jour la liste
    }
}

// Nettoyage système
function clearLogs() {
    if(confirm("Voulez-vous purger les logs système ?")) {
        console.log("Purge effectuée.");
    }
}
