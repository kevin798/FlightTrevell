const API_BASE_URL = 'http://localhost:8000/api'; 

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login gagal');
  }

  return data;
}

export async function register(formData) {
  const response = await fetch(`${API_BASE_URL}/auth/registrasi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registrasi gagal');
  }

  return data;
}
