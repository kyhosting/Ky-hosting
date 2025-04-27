
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const adminUsername = "admin";
  const adminPassword = "admin123";
  if (username === adminUsername && password === adminPassword) {
    localStorage.setItem('role', 'admin');
    localStorage.setItem('username', username);
    window.location.href = "dashboard.html";
  } else {
    localStorage.setItem('role', 'user');
    localStorage.setItem('username', username);
    window.location.href = "user.html";
  }
});
