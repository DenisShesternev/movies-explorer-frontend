class Token {
    constructor() {
        this.jwt = 'jwt';
    }

    getToken() {
        return localStorage.getItem(this.jwt);
    }

    saveToken(token) {
        localStorage.setItem(this.jwt, token);
    }

    removeToken() {
        localStorage.removeItem(this.jwt);
    }
}

const token = new Token();

export default token;