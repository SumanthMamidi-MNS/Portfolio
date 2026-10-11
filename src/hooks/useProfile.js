import { useState, useEffect } from 'react';
import { fetchJson } from './fetchJson';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson('/data/profile.json')
      .then(data => setProfile(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading };
}
