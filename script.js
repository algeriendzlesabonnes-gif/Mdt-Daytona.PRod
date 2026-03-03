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

        initOS() {
            this.updateTime();
            setInterval(() => this.updateTime(), 1000);
            
            // Load Local Data
            this.citizens = JSON.parse(localStorage.getItem('dt_citizens')) || [];
            this.updateStats();
        },

        updateTime() {
            const now = new Date();
            this.currentTime = now.toLocaleTimeString('fr-FR');
        },

        attemptLogin() {
            const staff = JSON.parse(localStorage.getItem('dt_staff')) || [
                { badge: '75-01', pass: 'daytona2026', name: 'Admin', rank: 'Staff' }
            ];
            const user = staff.find(s => s.badge === this.loginForm.badge && s.pass === this.loginForm.pass);
            
            if (user) {
                this.user = { ...user, isAdmin: (user.rank === 'Staff' || user.rank === 'Capitaine') };
                this.session.authenticated = true;
            } else {
                alert("Identifiants invalides");
            }
        },

        saveCitizen() {
            this.citizens.push({...this.newCitizen, id: Date.now()});
            localStorage.setItem('dt_citizens', JSON.stringify(this.citizens));
            this.modals.addCitizen = false;
            this.newCitizen = { firstname: '', lastname: '', birth: '', phone: '', wanted: false };
        },

        get filteredCitizens() {
            return this.citizens.filter(c => 
                c.lastname.toLowerCase().includes(this.search.citizen.toLowerCase())
            );
        },

        updateStats() {
            this.stats.warrants = this.citizens.filter(c => c.wanted).length;
        },

        logout() {
            this.session.authenticated = false;
        },

        openModal(m) { this.modals[m] = true; }
    }
}
