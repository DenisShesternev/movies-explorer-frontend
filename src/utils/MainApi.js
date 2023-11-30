class MainApi {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    registerUser({ name, email, password }) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        }).then(this._checkResponse);
    }

    loginUser({ email, password }) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
    }

    getToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    updateUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                email: data.email,
            }),
        }).then(this._checkResponse);
    }

    getMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    addMovies(movie) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(movie),
        }).then(this._checkResponse);
    }

    deleteMovies(movieId) {
        return fetch(`${this._url}/movies/${movieId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    updateToken() {
        this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    }
}

const mainApi = new MainApi({
    url: 'https://api.shesternev.movies.nomoredomainsrocks.ru',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
    },
});

export default mainApi;