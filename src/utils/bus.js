const listeners = new Map();

function on(event, callback) {
	if (!listeners.has(event)) {
		listeners.set(event, new Set());
	}

	listeners.get(event).add(callback);
}

function off(event, callback) {
	const eventListeners = listeners.get(event);
	if (!eventListeners) {
		return;
	}

	eventListeners.delete(callback);

	if (eventListeners.size === 0) {
		listeners.delete(event);
	}
}

function emit(event, payload) {
	const eventListeners = listeners.get(event);
	if (!eventListeners) {
		return;
	}

	eventListeners.forEach((callback) => callback(payload));
}

const bus = {
	on,
	off,
	emit,
	addEventListener: on,
	removeEventListener: off,
};

export default bus;