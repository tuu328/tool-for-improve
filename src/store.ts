import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, NavCategory, ContentItem, ExamInfo, SkillResource, Challenge, KnowledgeItem, Idea } from './types';

const STORAGE_KEY = 'self-planning-storage';

// 初始状态
const initialState: AppState = {
  currentCategory: 'relax',
  relaxContent: {
    reading: [],
    movies: [],
    music: [],
  },
  exams: [],
  skills: [],
  challenges: [],
  knowledge: [],
  ideas: [],
  lastFetchDate: null,
};

export const useStore = create<AppState>()(
  persist(
    () => initialState,
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        relaxContent: state.relaxContent,
        exams: state.exams,
        skills: state.skills,
        challenges: state.challenges,
        knowledge: state.knowledge,
        ideas: state.ideas,
        lastFetchDate: state.lastFetchDate,
      }),
    }
  )
);

// Actions
export const actions = {
  setCurrentCategory: (category: NavCategory) => {
    useStore.setState({ currentCategory: category });
  },

  updateRelaxContent: (type: 'reading' | 'movies' | 'music', items: ContentItem[]) => {
    const state = useStore.getState();
    useStore.setState({
      relaxContent: {
        ...state.relaxContent,
        [type]: items,
      },
    });
  },

  addExam: (exam: ExamInfo) => {
    const state = useStore.getState();
    useStore.setState({ exams: [...state.exams, exam] });
  },

  updateExams: (exams: ExamInfo[]) => {
    useStore.setState({ exams });
  },

  addSkill: (skill: SkillResource) => {
    const state = useStore.getState();
    useStore.setState({ skills: [...state.skills, skill] });
  },

  addChallenge: (challenge: Challenge) => {
    const state = useStore.getState();
    useStore.setState({ challenges: [...state.challenges, challenge] });
  },

  updateChallenge: (id: string, updates: Partial<Challenge>) => {
    const state = useStore.getState();
    useStore.setState({
      challenges: state.challenges.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    });
  },

  addKnowledge: (item: KnowledgeItem) => {
    const state = useStore.getState();
    useStore.setState({ knowledge: [...state.knowledge, item] });
  },

  addIdea: (idea: Idea) => {
    const state = useStore.getState();
    useStore.setState({ ideas: [...state.ideas, idea] });
  },

  updateIdea: (id: string, updates: Partial<Idea>) => {
    const state = useStore.getState();
    useStore.setState({
      ideas: state.ideas.map((i) =>
        i.id === id ? { ...i, ...updates } : i
      ),
    });
  },

  setLastFetchDate: (date: string) => {
    useStore.setState({ lastFetchDate: date });
  },
};