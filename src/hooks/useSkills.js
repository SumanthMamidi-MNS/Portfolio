import { useState, useEffect } from 'react';
import { fetchJson } from './fetchJson';

export function useSkills() {
  const [skills, setSkills] = useState({ categories: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson('/data/skills.json')
      .then(data => setSkills(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { skills, loading };
}
