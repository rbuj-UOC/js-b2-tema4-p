// T4. Trabajo con API
// U2. Peticiones GET y POST con Fetch
// Enunciado disponible en u2e1.md / Enunciat disponible a u2e1.md

// Escribe aquí tu solución / escriviu aquí la vostra solució:
export class ReqRes {
  static API_URL = 'https://reqres.in/api';
  static ENDPOINT_REGISTER = '/register';
  static ENDPOINT_LOGIN = '/login';
  static ENDPOINT_USERS = '/users';

  #session = {
    token: null,
    email: null,
    userId: null
  };

  async register(email, pwd) {
    if (!email) {
      return Promise.resolve({ error: 'Missing email or username' });
    }
    if (!pwd) {
      return Promise.resolve({ error: 'Missing password' });
    }
    this.#session.email = email;
    const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_REGISTER}`;
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pwd })
    }).then((res) => res.json());
  }

  onRegister(data) {
    if (!data || data.error) {
      return `ERROR_REGISTER. ${data?.error ?? ''}`;
    }
    this.#session.userId = data.id;
    this.#session.token = data.token;
  }

  async login(email, pwd) {
    if (!email) {
      return Promise.resolve({ error: 'Missing email or username' });
    }
    if (!pwd) {
      return Promise.resolve({ error: 'Missing password' });
    }
    this.#session.email = email;
    const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_LOGIN}`;
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pwd })
    }).then((res) => res.json());
  }

  onLogin(data) {
    if (!data || data.error) {
      return `ERROR_LOGIN. ${data?.error ?? ''}`;
    }
    this.#session.token = data.token;
  }

  async getUserList(page = 1, perPage = 6) {
    const finalPage = page ?? 1;
    const finalPerPage = perPage ?? 6;
    const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USERS}?page=${finalPage}&per_page=${finalPerPage}`;
    return fetch(url, { method: 'GET' }).then((res) => res.json());
  }
}
