import axios from "axios";

const STORAGE_KEY = "@linktree";
const TOKEN_KEY = "@linktree:token";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function loginWithEmailAndPassword(email, password) {
	const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
		email,
		password,
	});

	const token = response?.data?.token;
	if (!token) {
		throw new Error("Token não retornado pelo backend");
	}

	localStorage.setItem(TOKEN_KEY, token);

	const currentUser = await fetchCurrentUser();
	if (currentUser) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
	}

	return response.data;
}

export function getStoredToken() {
	return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(STORAGE_KEY);
}

export async function fetchCurrentUser() {
	const token = getStoredToken();
	if (!token) return null;

	try {
		const response = await axios.get(`${API_BASE_URL}/api/users/checkuser`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data ?? null;
	} catch {
		logout();
		return null;
	}
}
