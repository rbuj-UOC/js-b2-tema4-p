// jest-fetch-mock mocks automatically fetch calls
// learn more: https://www.npmjs.com/package/jest-fetch-mock
import fetchMock from 'jest-fetch-mock';

import { USERS } from '../__mocks__/users.js';
import { ReqRes } from '../u2/u2e1.js';

fetchMock.enableMocks();

describe('Fetch API GET and POST', () => {
  const api = new ReqRes();

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('Registration missing fields...', async () => {
    let response = await api.register();

    expect(fetchMock.mock.calls.length).toEqual(0);
    expect(response.error).toBeDefined();
    expect(response.error).toMatch('Missing email');

    response = await api.register('test@test.com');

    expect(fetchMock.mock.calls.length).toEqual(0);
    expect(response.error).toBeDefined();
    expect(response.error).toMatch('Missing password');
  });

  test('API Register failed...', async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        error: 'Note: Only defined users succeed registration'
      })
    );

    const response = await api.register('test@test.com', 'test');
    api.onRegister(response);

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.lastCall[0]).toContain(ReqRes.ENDPOINT_REGISTER);
    expect(fetchMock.mock.lastCall[1].method).toBe('POST');
    expect(response.error).toBeDefined();
    expect(response.error).toBe(
      'Note: Only defined users succeed registration'
    );
  });

  test('API Register ok...', async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        id: 4,
        token: 'XL5tke4Pnpja7X'
      })
    );

    const response = await api.register('test@test.com', 'test');
    api.onRegister(response);

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.lastCall[0]).toContain(ReqRes.ENDPOINT_REGISTER);
    expect(fetchMock.mock.lastCall[1].method).toBe('POST');
    expect(response.id).toBe(4);
    expect(response.token).toBe('XL5tke4Pnpja7X');
  });

  test('API Login failed...', async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        error: 'user not found'
      })
    );

    const response = await api.login('test@test.com', 'test');
    api.onLogin(response);

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.lastCall[0]).toContain(ReqRes.ENDPOINT_LOGIN);
    expect(fetchMock.mock.lastCall[1].method).toBe('POST');
    expect(response.error).toBe('user not found');
  });

  test('API Login OK...', async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        token: 'XL5tke4Pnpja7X'
      })
    );

    const response = await api.login('test@test.com', 'test');
    api.onLogin(response);

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.lastCall[0]).toContain(ReqRes.ENDPOINT_LOGIN);
    expect(fetchMock.mock.lastCall[1].method).toBe('POST');
    expect(response.id).not.toBeDefined();
    expect(response.token).toBe('XL5tke4Pnpja7X');
  });

  test('API Users list...', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(USERS[0]))
      .mockResponseOnce(JSON.stringify(USERS[1]));

    let response = await api.getUserList(null, 12);

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.lastCall[0]).toContain(ReqRes.ENDPOINT_USERS);
    expect(fetchMock.mock.lastCall[1].method).toBe('GET');
    expect(response.page).toBe(1);
    expect(response.total_pages).toBe(1);
    expect(response.per_page).toBe(12);

    response = await api.getUserList(2);

    expect(fetchMock.mock.calls.length).toEqual(2);
    expect(fetchMock.mock.lastCall[0]).toContain(ReqRes.ENDPOINT_USERS);
    expect(fetchMock.mock.lastCall[1].method).toBe('GET');
    expect(response.page).toBe(2);
    expect(response.total_pages).toBe(2);
    expect(response.per_page).toBe(6);
  });
});
