import axios from "axios";

const STORAGE_KEY = "@linktree";
const TOKEN_KEY = "@linktree:token";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function loginWithEmailAndPassword(email, password) {
	const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
		email,
		password,
	});

	await persistSessionFromResponse(response.data);
	return response.data;
}

export async function registerWithEmailAndPassword({ name, email, password, confirmPassword }) {
	const response = await axios.post(`${API_BASE_URL}/api/users/register`, {
		name,
		email,
		password,
		confirmPassword,
	});

	await persistSessionFromResponse(response.data);
	return response.data;
}

async function persistSessionFromResponse(data) {
	const token = data?.token;
	if (!token) {
		throw new Error("Token não retornado pelo backend");
	}

	localStorage.setItem(TOKEN_KEY, token);

	const currentUser = await fetchCurrentUser();
	if (currentUser) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
	}
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

export async function updateCurrentUserProfile({ id, name, email, bio, avatarFile, avatar }) {
	const token = getStoredToken();
	if (!token) {
		throw new Error("Usuário não autenticado");
	}

	const formData = new FormData();
	if (name !== undefined) formData.append("name", name);
	if (email !== undefined) formData.append("email", email);
	if (bio !== undefined) formData.append("bio", bio);
	if (avatar !== undefined) formData.append("avatar", avatar);
	if (avatarFile) formData.append("image", avatarFile);

	const response = await axios.patch(`${API_BASE_URL}/api/users/edit/${id}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const updatedUser = response?.data?.user;
	if (updatedUser) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
	}

	return response.data;
}
