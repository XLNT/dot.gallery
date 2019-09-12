import {
  CreateLocalTracksOptions,
  LocalTrack,
  createLocalTracks,
} from "twilio-video";
import { useCallback, useState } from "react";

export default function useLocalTrack(): [
  (options: CreateLocalTracksOptions) => Promise<void>,
  { tracks: LocalTrack[]; loading: boolean; error: Error },
] {
  const [tracks, setTracks] = useState<LocalTrack[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const getUserMedia = useCallback(
    async (options: CreateLocalTracksOptions) => {
      setLoading(true);
      try {
        const tracks = await createLocalTracks(options);
        setTracks(tracks);
      } catch (error) {
        setTracks([]);
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return [getUserMedia, { tracks, loading, error }];
}
