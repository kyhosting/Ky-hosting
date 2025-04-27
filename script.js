
window.onload = function() {
  if (localStorage.getItem('role') !== 'admin') {
    alert("Kamu tidak punya akses ke Dashboard!");
    window.location.href = "index.html";
    return;
  }
  const username = localStorage.getItem('username');
  const profilePic = localStorage.getItem('profilePic');
  if (username) document.getElementById('profileName').textContent = username;
  if (profilePic) document.getElementById('profileImage').src = profilePic;

  document.getElementById('uploadImage').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('profileImage').src = e.target.result;
        localStorage.setItem('profilePic', e.target.result);
      }
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('toggleDarkMode').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    document.querySelector('.sidebar').classList.toggle('dark');
    document.querySelector('.main-content').classList.toggle('dark');
    document.querySelectorAll('table, th, td').forEach(el => el.classList.toggle('dark'));
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    document.querySelector('.sidebar').classList.add('dark');
    document.querySelector('.main-content').classList.add('dark');
    document.querySelectorAll('table, th, td').forEach(el => el.classList.add('dark'));
  }

  let users = [{ nama: "Andi", email: "andi@gmail.com", status: "Active" }, { nama: "Budi", email: "budi@yahoo.com", status: "Inactive" }];
  function renderUserTable() {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';
    users.forEach((user, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = \`
        <td>\${index + 1}</td>
        <td>\${user.nama}</td>
        <td>\${user.email}</td>
        <td>\${user.status}</td>
        <td>
          <button onclick="editUser(\${index})">Edit</button>
          <button onclick="deleteUser(\${index})">Hapus</button>
        </td>\`;
      tbody.appendChild(tr);
    });
  }
  renderUserTable();

  document.getElementById('addUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    users.push({
      nama: document.getElementById('newName').value,
      email: document.getElementById('newEmail').value,
      status: document.getElementById('newStatus').value
    });
    renderUserTable();
    this.reset();
  });

  window.editUser = function(index) {
    const user = users[index];
    const nama = prompt('Edit Nama:', user.nama);
    const email = prompt('Edit Email:', user.email);
    const status = prompt('Edit Status (Active/Inactive):', user.status);
    if (nama && email && status) {
      users[index] = { nama, email, status };
      renderUserTable();
    }
  }

  window.deleteUser = function(index) {
    if (confirm('Yakin mau hapus user ini?')) {
      users.splice(index, 1);
      renderUserTable();
    }
  }

  const ctx = document.getElementById('userChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: users.map(u => u.nama),
      datasets: [{
        label: 'Aktivitas User',
        data: [12, 19],
        backgroundColor: ['#667eea', '#63b3ed'],
        borderRadius: 10
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
};

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
