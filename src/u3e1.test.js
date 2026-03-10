// jest-fetch-mock mocks automatically fetch calls
// learn more: https://www.npmjs.com/package/jest-fetch-mock
import fetchMock from 'jest-fetch-mock';

import { ReqRes } from '../u3/u3e1.js';

fetchMock.enableMocks();

describe('Fetch API PUT and PATCH', () => {
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
});
