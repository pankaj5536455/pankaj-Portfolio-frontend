import { useEffect, useState } from 'react';
import { API_RETRY_INTERVAL_MS, buildApiUrl } from '@/lib/api';
import type { Domain, GlobalContent } from '@/lib/domain-data';
import { domains as fallbackDomains, globalContent as fallbackGlobal } from '@/lib/domain-data';

export function useDomains() {
  const [domains, setDomains] = useState<Domain[]>(fallbackDomains);
  const [global, setGlobal] = useState<GlobalContent>(fallbackGlobal);
  const [settings, setSettings] = useState({
    theme: 'default',
    showProjects: true,
    showDomains: true,
    showContact: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const fetchDomains = async () => {
      try {
        const r = await fetch(buildApiUrl('/domains'), {
          cache: 'no-store',
        });

        if (!r.ok) {
          throw new Error(`Failed to fetch domains: ${r.status}`);
        }

        const d = await r.json();
        if (!mounted) return;

        setDomains(Array.isArray(d?.domains) ? d.domains : []);
        if (d?.global && typeof d.global === 'object') {
          setGlobal({ ...fallbackGlobal, ...d.global });
        }
        if (d?.settings && typeof d.settings === 'object') {
          setSettings({
            theme: d.settings.theme ?? 'default',
            showProjects: d.settings.showProjects ?? true,
            showDomains: d.settings.showDomains ?? true,
            showContact: d.settings.showContact ?? true,
          });
        }
        setError(null);
      } catch (e) {
        if (mounted) {
          setError(e instanceof Error ? e : new Error(String(e)));
          retryTimer = setTimeout(() => {
            void fetchDomains();
          }, API_RETRY_INTERVAL_MS);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void fetchDomains();

    return () => {
      mounted = false;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, []);

  return { domains, global, settings, loading, error };
}
