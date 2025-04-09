import { useEffect, useState } from 'react';
import { IPost } from './Home.types';
import { PAGE_SIZE } from './Home.constants';

export const useHomeData = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [processedPosts, setProcessedPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [isProcessingPosts, setIsProcessingPosts] = useState(false);

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosts = async () => {
    if (isError) {
      setIsError(false);
    }
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const data: IPost[] = await response.json();

      setPosts(data);
      loadNextPage(data, 0);
    } catch (err) {
      setIsError(true);
      console.error(err);
    }
  };

  const loadNextPage = (all: IPost[], page: number) => {
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const nextData = all.slice(start, end);

    setIsProcessingPosts(true);
    processPosts(nextData, () => {
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
      setIsProcessingPosts(false);
    });
  };

  const processPosts = (arr: IPost[], onDone: () => void) => {
    const newProcessed: IPost[] = [];
    let index = 0;
    const BATCH_SIZE = 20000;
    const processNext = () => {
      const end = Math.min(index + BATCH_SIZE, arr.length);

      while (index < end) {
        const post = arr[index];
        const transformedTitle = transformTitle(post.title || '');
        newProcessed.push({
          ...post,
          title: transformedTitle,
        });
        index++;
      }

      if (index < arr.length) {
        requestAnimationFrame(processNext);
      } else {
        setProcessedPosts(prev => [...prev, ...newProcessed]);
        onDone();
      }
    };

    processNext();
  };

  const transformTitle = (title: string): string => {
    let result = title;
    for (let i = 0; i < 10_000_000; i++) {
      result = result.toUpperCase();
    }
    return result;
  };

  return {
    posts,
    currentPage,
    processedPosts,
    isLoading,
    isError,
    isProcessingPosts,
    getPosts,
    loadNextPage,
  };
};
