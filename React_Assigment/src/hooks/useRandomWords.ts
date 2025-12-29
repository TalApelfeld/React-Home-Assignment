// hooks/useRandomWords.ts
import { useEffect, useState } from "react";

export function useRandomWords(count: number = 3) {
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // TODO: dispaly an error Toast If THERE is no Internet
    const fetchWords = async () => {
      setLoading(true);
      setError(null);

      try {
        const requests = Array.from({ length: count }, () =>
          fetch("https://random-word-api.herokuapp.com/word")
        );

        const responses = await Promise.all(requests);
        const wordArrays = await Promise.all(
          responses.map((res) => res.json())
        );
        const fetchedWords = wordArrays.map((arr) => arr[0]);

        setWords(fetchedWords);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch words")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [count]);

  return { words, loading, error };
}
