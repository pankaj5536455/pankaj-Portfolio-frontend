import { useEffect, useState } from 'react';
import type { Domain, GlobalContent } from '@/lib/domain-data';
import { domains as fallbackDomains, globalContent as fallbackGlobal } from '@/lib/domain-data';

export function useDomains() {
  const [domains, setDomains] = useState<Domain[]>(fallbackDomains);
  const [global, setGlobal] = useState<GlobalContent>(fallbackGlobal);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    fetch(`${apiUrl}/api/domains`)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Failed to fetch domains: ${r.status}`);
        }
        return r.json();
      })
      .then((d) => {
        if (!mounted) return;
        if (Array.isArray(d?.domains) && d.domains.length > 0) {
          setDomains(d.domains);
        }
        if (d?.global && typeof d.global === 'object') {
          setGlobal(d.global);
        }
      })
      .catch((e) => {
        if (mounted) setError(e instanceof Error ? e : new Error(String(e)));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { domains, global, loading, error };
}
