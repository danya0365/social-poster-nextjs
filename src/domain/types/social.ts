/**
 * Social Domain Types
 * Shared types for social media platforms, groups, accounts, and posts.
 * This is the Single Source of Truth for domain-related types.
 */

export type SocialPlatform = 'facebook' | 'instagram' | 'twitter';

export type GroupType = 'group' | 'page' | 'profile' | 'community';

export type GroupStatus = 'active' | 'pending' | 'error';

export type AccountStatus = 'connected' | 'expired' | 'disconnected' | 'error';

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export type StatusType = 'info' | 'warning' | 'error' | 'success';

export type LoopStatus = 'active' | 'paused' | 'completed';

export type IntervalUnit = 'hours' | 'days';
