document.addEventListener('submit', function (e) {
  if (e.target && e.target.id === 'employee-form') {
    e.preventDefault();
    const id = document.getElementById('employee-id').value;
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const department = document.getElementById('department').value.trim();
    const role = document.getElementById('role').value.trim();

    if (!firstName || !lastName || !email || !department || !role) {
      alert('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return;
    }

    if (id) {
      const index = employees.findIndex(e => e.id == id);
      if (index !== -1) {
        employees[index] = { id: +id, firstName, lastName, email, department, role };
      }
    } else {
      employees.push({ id: Date.now(), firstName, lastName, email, department, role });
    }

    document.getElementById('form-container').classList.add('hidden');
    renderEmployees();
  }
});

function cancelForm() {
  document.getElementById('form-container').classList.add('hidden');
}