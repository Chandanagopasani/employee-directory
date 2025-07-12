let employees = [...mockEmployees];
let currentPage = 1;
let itemsPerPage = 5;

function renderEmployees(filteredList) {
  const list = filteredList || employees;
  const container = document.getElementById('employee-list-container');
  container.innerHTML = '';
  const paginated = getPaginatedEmployees(list, currentPage, itemsPerPage);

  paginated.forEach(emp => {
    const div = document.createElement('div');
    div.className = 'employee-card';
    div.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(div);
  });

  renderPagination(list.length, list);
}

function getPaginatedEmployees(list, page, perPage) {
  const start = (page - 1) * perPage;
  return list.slice(start, start + perPage);
}

function renderPagination(total, list) {
  const controls = document.getElementById('pagination-controls');
  controls.innerHTML = '';
  const totalPages = Math.ceil(total / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderEmployees(list);
    };
    controls.appendChild(btn);
  }
}

function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
  renderEmployees();
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;
  document.getElementById('form-container').classList.remove('hidden');
  document.getElementById('form-container').innerHTML = document.querySelector('template#form-template').innerHTML;
  fillForm(emp);
}

function toggleForm() {
  document.getElementById('form-container').classList.remove('hidden');
  document.getElementById('form-container').innerHTML = document.querySelector('template#form-template').innerHTML;
}

function cancelForm() {
  document.getElementById('form-container').classList.add('hidden');
  document.getElementById('form-container').innerHTML = '';
}

function fillForm(emp) {
  document.getElementById('employee-id').value = emp.id;
  document.getElementById('first-name').value = emp.firstName;
  document.getElementById('last-name').value = emp.lastName;
  document.getElementById('email').value = emp.email;
  document.getElementById('department').value = emp.department;
  document.getElementById('role').value = emp.role;
}

document.getElementById('search-input').addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const filtered = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(term) ||
    emp.lastName.toLowerCase().includes(term) ||
    emp.email.toLowerCase().includes(term)
  );
  currentPage = 1;
  renderEmployees(filtered);
});

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

    if (id) {
      const index = employees.findIndex(e => e.id == id);
      if (index !== -1) {
        employees[index] = { id: +id, firstName, lastName, email, department, role };
      }
    } else {
      const newEmp = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        department,
        role
      };
      employees.push(newEmp);
    }

    cancelForm();
    renderEmployees();
  }
});

document.addEventListener('DOMContentLoaded', renderEmployees);