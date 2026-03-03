function daytonaOS() {
    return {
        page: 'dash',
        currentTime: '',
        session: { authenticated: false },
        user: { name: '', badge: '', rank: '', isAdmin: false },
        loginForm: { badge: '', pass: '' },
        search: { citizen: '' },
        modals: { addCitizen: false },
        
        citizens: [],
        stats: { warrants: 0 },
        newCitizen: { firstname: '', lastname: '', birth: '', phone: '', wanted: false },
        newStaff: { name: '', badge: '', pass: '', rank: 'Officier' },

        initOS() {
            setInterval(() => {
                this.currentTime = new Date().toLocaleTimeString('fr-FR');
            }, 1000);
            
            // Chargement sécurisé
            const data = localStorage.getItem('dt_data_v5');
            this.citizens = data ? JSON.parse(data) : [];
            this.updateStats();
        },

        attemptLogin() {
            const staffs = JSON.parse(localStorage.getItem('dt_staff')) || [
                { badge: '75-01', pass: 'daytona2026', name: 'Admin', rank: 'Staff' }
            ];

            const found = staffs.find(s => s.badge === this.loginForm.badge && s.pass === this.loginForm.pass);
            if (found) {
                this.user = { ...found, isAdmin: found.rank === 'Staff' };
                this.session.authenticated = true;
            } else {
                alert("ACCÈS REFUSÉ : Badge ou mot de passe incorrect.");
            }
        },

        saveCitizen() {
            if(!this.newCitizen.firstname) return;
            this.citizens.push({ ...this.newCitizen, id: Date.now() });
            this.saveData();
            this.modals.addCitizen = false;
            this.newCitizen = { firstname: '', lastname: '', birth: '', phone: '', wanted: false };
        },

        deleteCitizen(id) {
            if(confirm("Supprimer définitivement ce dossier ?")) {
                this.citizens = this.citizens.filter(c => c.id !== id);
                this.saveData();
            }
        },

        toggleWarrant(id) {
            const idx = this.citizens.findIndex(c => c.id === id);
            this.citizens[idx].wanted = !this.citizens[idx].wanted;
            this.saveData();
        },

        saveData() {
            localStorage.setItem('dt_data_v5', JSON.stringify(this.citizens));
            this.updateStats();
        },

        updateStats() {
            this.stats.warrants = this.citizens.filter(c => c.wanted).length;
        },

        get filteredCitizens() {
            return this.citizens.filter(c => 
                c.lastname.toLowerCase().includes(this.search.citizen.toLowerCase()) ||
                c.phone.includes(this.search.citizen)
            );
        },

        logout() {
            this.session.authenticated = false;
        }
    }
}
