import { useState, useEffect } from 'react';
import { fetchJson } from './fetchJson';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson('/data/projects.json')
      .then(data => setProjects(Array.isArray(data) ? data : data.projects || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
}
