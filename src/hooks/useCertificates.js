import { useState, useEffect } from 'react';
import { fetchJson } from './fetchJson';

export function useCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson('/data/certificates.json')
      .then(data => setCertificates(Array.isArray(data) ? data : data.certificates || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { certificates, loading };
}
