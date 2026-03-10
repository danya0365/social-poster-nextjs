'use client';

import { Post } from '@/src/application/repositories/IPostRepository';
import { PostStatus } from '@/src/domain/types/social';
import { useEffect, useMemo, useState } from 'react';
import { PostsPresenter, PostsViewModel } from './PostsPresenter';
import { createClientPostsPresenter } from './PostsPresenterClientFactory';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  statusFilter: PostStatus | 'all';
  viewMode: 'grid' | 'list';
  searchQuery: string;
}

export interface PostsActions {
  setStatusFilter: (filter: PostStatus | 'all') => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSearchQuery: (query: string) => void;
  deletePost: (id: string) => Promise<void>;
  refreshPosts: () => Promise<void>;
}

export function usePostsPresenter(
  initialViewModel?: PostsViewModel,
  presenterOverride?: PostsPresenter
): [PostsState, PostsActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientPostsPresenter(),
    [presenterOverride]
  );

  const [posts, setPosts] = useState<Post[]>(initialViewModel?.posts ?? []);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  
  const [statusFilter, setStatusFilter] = useState<PostStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshPosts = async () => {
    setLoading(true);
    try {
      const data = await presenter.getPostsByStatus(statusFilter);
      setPosts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshPosts();
    }
  }, [statusFilter]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const actions: PostsActions = {
    setStatusFilter,
    setViewMode,
    setSearchQuery,
    refreshPosts,
    deletePost: async (id: string) => {
      const success = await presenter.deletePost(id);
      if (success) {
        setPosts(prev => prev.filter(p => p.id !== id));
      } else {
        setError('Failed to delete post');
      }
    }
  };

  return [
    { posts: filteredPosts, loading, error, statusFilter, viewMode, searchQuery },
    actions
  ];
}
