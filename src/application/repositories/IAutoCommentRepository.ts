/**
 * IAutoCommentRepository
 * Repository interface for Auto-Comment data access
 */

export interface CommentTemplate {
  id: string;
  name: string;
  messages: string[];
  delay: number; // minutes
  isActive: boolean;
  usageCount: number;
}

export interface AutoCommentSettings {
  isEnabled: boolean;
  initialDelay: number;
  skipKeywords: string[];
  maxRepliesPerPost: number;
  workHoursStart: string;
  workHoursEnd: string;
}

export interface AutoCommentStats {
  todayReplies: number;
  successRate: number;
  avgResponseTime: number;
}

export interface IAutoCommentRepository {
  getTemplates(): Promise<CommentTemplate[]>;
  getTemplateById(id: string): Promise<CommentTemplate | null>;
  createTemplate(data: Omit<CommentTemplate, 'id' | 'usageCount'>): Promise<CommentTemplate>;
  updateTemplate(id: string, data: Partial<CommentTemplate>): Promise<CommentTemplate>;
  deleteTemplate(id: string): Promise<boolean>;
  
  getSettings(): Promise<AutoCommentSettings>;
  updateSettings(data: Partial<AutoCommentSettings>): Promise<AutoCommentSettings>;
  
  getStats(): Promise<AutoCommentStats>;
}
