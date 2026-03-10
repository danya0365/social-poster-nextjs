/**
 * AutoCommentPresenter
 */

import {
    AutoCommentSettings,
    AutoCommentStats,
    CommentTemplate,
    IAutoCommentRepository,
} from '@/src/application/repositories/IAutoCommentRepository';

export interface AutoCommentViewModel {
  templates: CommentTemplate[];
  settings: AutoCommentSettings;
  stats: AutoCommentStats;
}

export class AutoCommentPresenter {
  constructor(private readonly repository: IAutoCommentRepository) {}

  async getViewModel(): Promise<AutoCommentViewModel> {
    try {
      const [templates, settings, stats] = await Promise.all([
        this.repository.getTemplates(),
        this.repository.getSettings(),
        this.repository.getStats(),
      ]);
      return { templates, settings, stats };
    } catch (error) {
      console.error('Error getting auto-comment view model:', error);
      throw error;
    }
  }

  async toggleTemplate(id: string, currentStatus: boolean): Promise<CommentTemplate> {
    return await this.repository.updateTemplate(id, { isActive: !currentStatus });
  }

  async saveTemplate(data: Omit<CommentTemplate, 'id' | 'usageCount'>): Promise<CommentTemplate> {
    return await this.repository.createTemplate(data);
  }

  async deleteTemplate(id: string): Promise<boolean> {
    return await this.repository.deleteTemplate(id);
  }

  async updateSettings(data: Partial<AutoCommentSettings>): Promise<AutoCommentSettings> {
    return await this.repository.updateSettings(data);
  }
}
