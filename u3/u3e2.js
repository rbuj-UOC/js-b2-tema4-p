// T4. Trabajo con API
// U3. Peticiones DELETE con Fetch
// Enunciado disponible en u3e2.md / Enunciat disponible a u3e2.md

// Escribe aquí tu solución / escriviu aquí la vostra solució:
export class ReqRes {
  static API_URL = 'https://reqres.in/api';
  static ENDPOINT_REGISTER = '/register';
  static ENDPOINT_LOGIN = '/login';
  static ENDPOINT_USERS = '/users';
  static ENDPOINT_USER = '/users/{id}';

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

  updateFullUser(id, email, firstName, lastName, avatarUrl) {
    if (!(id && email && firstName && lastName && avatarUrl)) {
      return Promise.resolve({ error: 'Some user fields are missing' });
    }
    const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USER.replace('{id}', String(id))}`;
    return fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        avatarUrl
      })
    });
  }

  updateUserName(id, firstName, lastName) {
    if (!(id && firstName && lastName)) {
      return Promise.resolve({ error: 'Some user fields are missing' });
    }
    const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USER.replace('{id}', String(id))}`;
    return fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName
      })
    });
  }

  deleteUser(id) {
    if (!id) {
      return Promise.resolve({ error: 'User id is missing or is not valid' });
    }
    const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USER.replace('{id}', String(id))}`;
    return fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
