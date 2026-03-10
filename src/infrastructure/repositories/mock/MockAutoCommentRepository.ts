/**
 * MockAutoCommentRepository
 */

import {
    AutoCommentSettings,
    AutoCommentStats,
    CommentTemplate,
    IAutoCommentRepository,
} from '../../../application/repositories/IAutoCommentRepository';

export class MockAutoCommentRepository implements IAutoCommentRepository {
  private templates: CommentTemplate[] = [
    {
      id: 'tpl-1',
      name: 'ตอบลูกค้าใหม่',
      messages: [
        'ขอบคุณที่สนใจค่ะ ทักแชทมาได้เลยนะคะ 💕',
        'สนใจสินค้าไหนคะ ทักมาสอบถามได้เลยค่ะ ✨',
        'รายละเอียดสินค้าทักแชทมาได้เลยค่ะ 🛒',
      ],
      delay: 2,
      isActive: true,
      usageCount: 1245,
    },
    {
      id: 'tpl-2',
      name: 'ตอบเรื่องราคา',
      messages: [
        'ราคาตามโพสต์เลยค่ะ หรือทักแชทมาถามราคาพิเศษได้นะคะ 💰',
        'มีส่วนลดพิเศษสำหรับลูกค้าใหม่ค่ะ ทักมาเลยนะคะ 🎁',
      ],
      delay: 1,
      isActive: true,
      usageCount: 890,
    },
    {
      id: 'tpl-3',
      name: 'ตอบเรื่องจัดส่ง',
      messages: [
        'จัดส่งทุกวันค่ะ ได้รับภายใน 1-3 วันเลยนะคะ 📦',
        'ส่งฟรีทั่วไทยค่ะ สั่งวันนี้ ส่งพรุ่งนี้เลย 🚚',
      ],
      delay: 1,
      isActive: false,
      usageCount: 567,
    },
  ];

  private settings: AutoCommentSettings = {
    isEnabled: true,
    initialDelay: 2,
    skipKeywords: ['ราคา', 'สั่งแล้ว', 'ขอบคุณ'],
    maxRepliesPerPost: 50,
    workHoursStart: '08:00',
    workHoursEnd: '22:00',
  };

  async getTemplates(): Promise<CommentTemplate[]> {
    return [...this.templates];
  }

  async getTemplateById(id: string): Promise<CommentTemplate | null> {
    return this.templates.find((t) => t.id === id) || null;
  }

  async createTemplate(data: Omit<CommentTemplate, 'id' | 'usageCount'>): Promise<CommentTemplate> {
    const newTemplate: CommentTemplate = {
      ...data,
      id: `tpl-${Date.now()}`,
      usageCount: 0,
    };
    this.templates.unshift(newTemplate);
    return newTemplate;
  }

  async updateTemplate(id: string, data: Partial<CommentTemplate>): Promise<CommentTemplate> {
    const index = this.templates.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Template not found');
    this.templates[index] = { ...this.templates[index], ...data };
    return this.templates[index];
  }

  async deleteTemplate(id: string): Promise<boolean> {
    const initialLength = this.templates.length;
    this.templates = this.templates.filter((t) => t.id !== id);
    return this.templates.length < initialLength;
  }

  async getSettings(): Promise<AutoCommentSettings> {
    return { ...this.settings };
  }

  async updateSettings(data: Partial<AutoCommentSettings>): Promise<AutoCommentSettings> {
    this.settings = { ...this.settings, ...data };
    return this.settings;
  }

  async getStats(): Promise<AutoCommentStats> {
    return {
      todayReplies: 2702,
      successRate: 98.5,
      avgResponseTime: 1.2,
    };
  }
}
