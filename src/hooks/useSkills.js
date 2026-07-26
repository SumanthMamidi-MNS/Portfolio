import { useState, useEffect } from 'react';

export function useSkills() {
  const [skills, setSkills] = useState({ categories: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/skills.json')
      .then(r => r.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { skills, loading };
}
