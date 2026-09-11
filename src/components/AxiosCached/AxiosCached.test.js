import { axiosCached } from './AxiosCached';

test('caches repeated GET and POST requests without mixing request bodies', async () => {
  const adapter = jest.fn(async config => ({ data: { value: config.data || config.url }, status: 200, statusText: 'OK', headers: {}, config, request: {} }));
  const url = 'https://fixture.invalid/cache-test';
  const first = await axiosCached.get(url, { adapter });
  const cached = await axiosCached.get(url, { adapter });
  expect(cached.data).toEqual(first.data);
  expect(cached.cached).toBe(true);
  expect(adapter).toHaveBeenCalledTimes(1);
  await axiosCached.post(url, { query: 'one' }, { adapter });
  const cachedPost = await axiosCached.post(url, { query: 'one' }, { adapter });
  expect(cachedPost.cached).toBe(true);
  await axiosCached.post(url, { query: 'two' }, { adapter });
  expect(adapter).toHaveBeenCalledTimes(3);
});
