import fetch from "isomorphic-fetch";
// import { API } from "../config";

export const signup = user => {
	return fetch(`api/users/signup`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const signin = (user, setCookie) => {
	return fetch(`${API}/signin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user),
		cookie: setCookie()
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

// Setting the cookie
export const setCookie = (key, value) => {
	if (process.browser) {
		cookie.set(key, value, {
			expires: 1
		});
	}
};

// removing cookie
export const removeCookie = key => {
	if (process.browser) {
		cookie.remove(key, {
			expires: 1
		});
	}
};
// getting the cookie
export const getCookie = key => {
	if (process.browser) {
		cookie.get(key);
	}
};
// saving token to localstorage
export const setLocalStorage = (key, value) => {
	if (process.browser) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

// remove token from localstorage
export const removeLocalStorage = key => {
	if (process.browser) {
		localStorage.removeItem(key);
	}
};
// autheticate user by passing data to cookie and localstorage
export const authenticate = (data, next) => {
	setCookie("token", data.token);
	setLocalStorage("user", data.user);
	next();
};

// authorizing user
export const isAuth = () => {
	if (process.browser) {
		const cookieChecked = getCookie("token");
		if (cookieChecked) {
			if (localStorage.getItem("user")) {
				return JSON.parse(localStorage.getItem("user"));
			} else {
				return false;
			}
		}
	}
};
