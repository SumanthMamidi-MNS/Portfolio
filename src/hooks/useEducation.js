import { useState, useEffect } from 'react';
import { fetchJson } from './fetchJson';

export function useEducation() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson('/data/education.json')
      .then(data => setEducation(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { education, loading };
}
