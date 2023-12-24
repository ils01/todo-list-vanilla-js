export default class LocalStorageManager {
	static get() {
		return localStorage;
	}

	static getObject(name, defaultValue) {
		if (!localStorage[name]) {
			localStorage.setItem(name, defaultValue);
		}
		return JSON.parse(localStorage.getItem(name));
	}

	static updateObject(name, object) {
		localStorage.removeItem(name);
		localStorage.setItem(name, JSON.stringify(object));
	}

	static clear() {
		localStorage.clear();
	}
}
