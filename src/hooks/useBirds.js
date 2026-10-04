import { useCallback, useEffect, useRef, useState } from "react";
import { getBirdImage, getBirds } from "../api/birds";

/** Shown when a bird's photo cannot be fetched. Served from public/. */
export const FALLBACK_BIRD_IMAGE = "/assets/images/tempImage.jpg";

const revokeAll = (urls) => urls.forEach((url) => URL.revokeObjectURL(url));

/**
 * Loads every bird plus an object URL for each bird's photo.
 * Photos are fetched in parallel, and their object URLs are released when they are replaced or
 * when the component unmounts, so repeated visits do not leak memory.
 *
 * @returns {{ birds: object[], birdImages: Record<string, string>, loading: boolean, refresh: () => void }}
 */
export function useBirds() {
  const [state, setState] = useState({ birds: [], birdImages: {}, loading: true });
  const [version, setVersion] = useState(0);
  const liveUrls = useRef([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const birds = await getBirds();
      const entries = await Promise.all(birds.map(async (bird) => [bird.id, await getBirdImage(bird.id)]));
      const created = entries.map(([, url]) => url).filter(Boolean);

      if (cancelled) {
        revokeAll(created);
        return;
      }

      revokeAll(liveUrls.current);
      liveUrls.current = created;
      setState({
        birds,
        birdImages: Object.fromEntries(entries.map(([id, url]) => [id, url ?? FALLBACK_BIRD_IMAGE])),
        loading: false,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [version]);

  useEffect(() => () => revokeAll(liveUrls.current), []);

  const refresh = useCallback(() => {
    setState((current) => ({ ...current, loading: true }));
    setVersion((v) => v + 1);
  }, []);

  return { ...state, refresh };
}
