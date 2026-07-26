import { useState, useEffect } from 'react';

export function useCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/certificates.json')
      .then(r => r.json())
      .then(data => {
        setCertificates(Array.isArray(data) ? data : data.certificates || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { certificates, loading };
}
