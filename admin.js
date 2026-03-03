function addStaff() {
    let list = JSON.parse(localStorage.getItem('dt_staff')) || [{ badge: '75-01', pass: 'daytona2026', name: 'Admin', rank: 'Staff' }];
    
    const name = document.querySelector('[x-model="newStaff.name"]').value;
    const badge = document.querySelector('[x-model="newStaff.badge"]').value;
    const pass = document.querySelector('[x-model="newStaff.pass"]').value;

    if(name && badge && pass) {
        list.push({ name, badge, pass, rank: 'Officier' });
        localStorage.setItem('dt_staff', JSON.stringify(list));
        alert("Agent ajouté !");
        location.reload();
    }
}
