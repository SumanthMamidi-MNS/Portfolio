// One shared request per JSON file: every hook/component that asks for the
// same URL gets the same promise instead of triggering a new network call.
const cache = new Map();

export function fetchJson(url) {
  if (!cache.has(url)) {
    const request = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        cache.delete(url);
        throw err;
      });
    cache.set(url, request);
  }
  return cache.get(url);
}
