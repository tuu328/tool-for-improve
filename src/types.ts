// 数据类型定义

export type NavCategory = 'relax' | 'growth' | 'breakthrough';

export interface ContentItem {
  id: string;
  title: string;
  source: string;
  url?: string;
  cover?: string;
  heat?: number; // 热度值
  fetchedAt: string; // 抓取时间
}

export interface ExamInfo {
  id: string;
  name: string;
  level: 'national' | 'enterprise'; // 国家认可或企业认可
  registrationStart?: string;
  registrationEnd?: string;
  examDate?: string;
  source: string;
  url?: string;
}

export interface SkillResource {
  id: string;
  title: string;
  platform: string; // 学习平台
  category: string;
  url?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'developing' | 'realized';
  createdAt: string;
}

export interface AppState {
  currentCategory: NavCategory;
  relaxContent: {
    reading: ContentItem[];
    movies: ContentItem[];
    music: ContentItem[];
  };
  exams: ExamInfo[];
  skills: SkillResource[];
  challenges: Challenge[];
  knowledge: KnowledgeItem[];
  ideas: Idea[];
  lastFetchDate: string | null;
}