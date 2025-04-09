import { RefObject, useEffect, useRef, useState } from 'react';
import { IPost } from '../HomeScreen/Home.types';

const reverseString = (value: string): string => {
  let reversed = '';
  for (let i = value.length - 1; i >= 0; i--) {
    reversed += value[i];
  }
  return reversed;
};

export const reverseWithIterations = (
  originalText: string,
  iterations: number,
  isMountedRef: RefObject<boolean>,
  onComplete: (result: string) => void,
) => {
  let i = 0;
  let current = originalText;

  const BATCH_SIZE = 10000;

  function processBatch() {
    if (!isMountedRef.current) return;

    const end = Math.min(i + BATCH_SIZE, iterations);
    while (i < end) {
      current = reverseString(current);
      i++;
    }

    if (i < iterations) {
      requestAnimationFrame(processBatch);
    } else {
      onComplete(current);
    }
  }

  requestAnimationFrame(processBatch);
};

export const useDetailsData = (postId?: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [post, setPost] = useState<IPost | null>(null);

  let isMountedRef = useRef(true);

  const getPost = async () => {
    if (isError) {
      setIsError(false);
    }
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
      );
      const data: IPost = await res.json();

      reverseWithIterations(
        data.body || '',
        5000000,
        isMountedRef,
        reversedText => {
          setPost({ ...post, body: reversedText });
          setIsLoading(false);
        },
      );
    } catch (e) {
      setIsError(true);
      console.error('Error fetching post:', e);
    }
  };

  useEffect(() => {
    getPost();

    return () => {
      isMountedRef.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, isError, post, getPost, setIsLoading };
};
