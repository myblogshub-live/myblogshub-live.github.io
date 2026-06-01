(function() {
  var DB = 'hxh_users';
  var NL = 'hxh_newsletter';

  function getUsers() { try { return JSON.parse(localStorage.getItem(DB)) || []; } catch(e) { return []; } }
  function saveUsers(u) { localStorage.setItem(DB, JSON.stringify(u)); }
  function getNL() { try { return JSON.parse(localStorage.getItem(NL)) || []; } catch(e) { return []; } }
  function saveNL(e) { var list = getNL(); if (list.indexOf(e) === -1) { list.push(e); localStorage.setItem(NL, JSON.stringify(list)); } }

  window.HXH = {
    signup: function(name, email, pass) {
      if (!name || !email || !pass) return { ok: false, msg: 'All fields are required.' };
      if (pass.length < 6) return { ok: false, msg: 'Password must be at least 6 characters.' };
      var users = getUsers();
      if (users.find(function(u){ return u.email === email; })) return { ok: false, msg: 'Email already registered. Sign in instead.' };
      users.push({ name: name, email: email, pass: pass, joined: new Date().toISOString() });
      saveUsers(users);
      localStorage.setItem('hxh_session', email);
      return { ok: true, msg: 'Welcome, ' + name + '!' };
    },
    signin: function(email, pass) {
      if (!email || !pass) return { ok: false, msg: 'Email and password are required.' };
      var users = getUsers();
      var user = users.find(function(u){ return u.email === email && u.pass === pass; });
      if (!user) return { ok: false, msg: 'Invalid email or password.' };
      localStorage.setItem('hxh_session', email);
      return { ok: true, msg: 'Welcome back, ' + user.name + '!' };
    },
    newsletter: function(email) {
      if (!email) return { ok: false, msg: 'Email is required.' };
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) return { ok: false, msg: 'Invalid email format.' };
      var list = getNL();
      if (list.indexOf(email) !== -1) return { ok: true, msg: 'Already subscribed!' };
      saveNL(email);
      return { ok: true, msg: 'Subscribed successfully!' };
    },
    logout: function() { localStorage.removeItem('hxh_session'); },
    getSession: function() { return localStorage.getItem('hxh_session'); },
    getCurrentUser: function() {
      var email = localStorage.getItem('hxh_session');
      if (!email) return null;
      return getUsers().find(function(u){ return u.email === email; }) || null;
    }
  };
})();
function hxhNewsletter(form) {
  var input = form.querySelector('input');
  var btn = form.querySelector('button');
  var email = input.value.trim();
  var result = HXH.newsletter(email);
  if (result.ok) {
    input.value = '';
    btn.textContent = 'Subscribed!';
    setTimeout(function(){ btn.textContent = 'Subscribe'; }, 2500);
  } else {
    alert(result.msg);
  }
}
function hxhSignin(form) {
  var email = document.getElementById('siEmail').value.trim();
  var pass = document.getElementById('siPass').value;
  var btn = form.querySelector('button[type=submit]');
  var result = HXH.signin(email, pass);
  if (result.ok) {
    btn.innerHTML = 'Welcome! <i class="fas fa-check"></i>';
    btn.style.opacity = '0.8';
    setTimeout(function(){ window.location.href = 'profile.html'; }, 800);
  } else {
    alert(result.msg);
  }
  return false;
}
function hxhSignup(form) {
  var name = document.getElementById('suName').value.trim();
  var email = document.getElementById('suEmail').value.trim();
  var pass = document.getElementById('suPass').value;
  var btn = form.querySelector('button[type=submit]');
  var result = HXH.signup(name, email, pass);
  if (result.ok) {
    btn.innerHTML = 'Welcome! <i class="fas fa-check"></i>';
    btn.style.opacity = '0.8';
    setTimeout(function(){ window.location.href = 'profile.html'; }, 800);
  } else {
    alert(result.msg);
  }
  return false;
}
function hxhSocial(provider) {
  alert('Social sign-in with ' + provider + ' coming soon! Using demo mode for now.\n\nAccount created: ' + provider + '@demo.hxh');
  var email = provider + '@demo.hxh';
  var users = JSON.parse(localStorage.getItem('hxh_users')) || [];
  if (!users.find(function(u){ return u.email === email; })) {
    users.push({ name: provider.charAt(0).toUpperCase() + provider.slice(1) + ' User', email: email, pass: '', joined: new Date().toISOString() });
    localStorage.setItem('hxh_users', JSON.stringify(users));
  }
  localStorage.setItem('hxh_session', email);
  window.location.href = 'profile.html';
}

function hxhNewsletter(form) {
  var input = form.querySelector('input');
  var btn = form.querySelector('button');
  var email = input.value.trim();
  var result = HXH.newsletter(email);
  if (result.ok) {
    input.value = '';
    btn.textContent = 'Subscribed!';
    setTimeout(function(){ btn.textContent = 'Subscribe'; }, 2500);
  } else {
    alert(result.msg);
  }
}
