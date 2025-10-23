// Ajustá esta URL al host/puerto donde esté tu backend
const API_BASE = "http://127.0.0.1:8000/api";
const USERS_ENDPOINT = `${API_BASE}/users/`;

const form = document.getElementById("userForm");
const usersList = document.getElementById("usersList");
const listStatus = document.getElementById("listStatus");
const alerts = document.getElementById("alerts");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

function showAlert(message, type = "success", timeout = 4000) {
  const el = document.createElement("div");
  el.className = `alert ${type === "success" ? "success" : "error"}`;
  el.textContent = message;
  alerts.appendChild(el);
  if (timeout) setTimeout(() => el.remove(), timeout);
}

function clearAlerts() {
  alerts.innerHTML = "";
}

async function loadUsers() {
  usersList.innerHTML = "";
  listStatus.textContent = "Cargando...";
  try {
    const res = await fetch(USERS_ENDPOINT);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    listStatus.textContent = "";
    if (!Array.isArray(data) || data.length === 0) {
      usersList.innerHTML = "<li>No hay usuarios registrados.</li>";
      return;
    }
    usersList.innerHTML = "";
    data.forEach(u => {
      const li = document.createElement("li");
      li.textContent = `${u.name} — ${u.email}${u.phone ? " — " + u.phone : ""}`;
      usersList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    listStatus.textContent = "Error cargando usuarios. Ver consola.";
  }
}

function validateForm(formData) {
  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  if (!name || name.length < 2) return "El nombre es obligatorio (mínimo 2 caracteres)";
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return "Email inválido";
  return null;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearAlerts();

  const fd = new FormData(form);
  const err = validateForm(fd);
  if (err) {
    showAlert(err, "error");
    return;
  }

  const payload = {
    name: fd.get("name").trim(),
    email: fd.get("email").trim(),
    phone: (fd.get("phone") || "").trim()
  };

  // UX: bloquear botón
  submitBtn.disabled = true;
  formStatus.textContent = "Enviando...";

  try {
    const res = await fetch(USERS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.status === 201 || res.status === 200) {
      const created = await res.json();
      showAlert("Usuario creado correctamente. Se envió la notificación si está configurada.", "success");
      form.reset();
      await loadUsers(); // refrescar la lista
    } else {
      // intentar leer mensaje del backend
      let body = null;
      try { body = await res.json(); } catch (e) {}
      const msg = body?.detail || body?.error || JSON.stringify(body) || `HTTP ${res.status}`;
      showAlert(`Error creando usuario: ${msg}`, "error", 6000);
    }
  } catch (err) {
    console.error(err);
    showAlert("No se pudo conectar con el backend. Revisa la consola y CORS.", "error", 6000);
  } finally {
    submitBtn.disabled = false;
    formStatus.textContent = "";
  }
});

// cargar la lista al iniciar
document.addEventListener("DOMContentLoaded", loadUsers);