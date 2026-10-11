import { useState, useEffect } from 'react';
import { fetchJson } from './fetchJson';

export function usePublications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson('/data/publications.json')
      .then(data => setPublications(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { publications, loading };
}
