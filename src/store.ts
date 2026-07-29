import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Tab = 'relax' | 'growth' | 'breakthrough'
type RelaxSub = 'reading' | 'movie' | 'music'
type GrowthSub = 'certificate' | 'skill'

interface Todo {
  id: string
  text: string
  done: boolean
  date: string
}

interface Note {
  id: string
  text: string
  createdAt: string
}

interface StoreState {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  relaxSub: RelaxSub
  setRelaxSub: (sub: RelaxSub) => void
  growthSub: GrowthSub
  setGrowthSub: (sub: GrowthSub) => void
  hiddenExams: string[]
  toggleHideExam: (id: string) => void
  todos: Todo[]
  addTodo: (text: string, date: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  challenges: Note[]
  addChallenge: (text: string) => void
  deleteChallenge: (id: string) => void
  knowledges: Note[]
  addKnowledge: (text: string) => void
  deleteKnowledge: (id: string) => void
  ideaList: Note[]
  addIdea: (text: string) => void
  deleteIdea: (id: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      activeTab: 'relax',
      setActiveTab: (tab) => set({ activeTab: tab }),
      relaxSub: 'reading',
      setRelaxSub: (sub) => set({ relaxSub: sub }),
      growthSub: 'certificate',
      setGrowthSub: (sub) => set({ growthSub: sub }),
      hiddenExams: [],
      toggleHideExam: (id) =>
        set((state) => ({
          hiddenExams: state.hiddenExams.includes(id)
            ? state.hiddenExams.filter((e) => e !== id)
            : [...state.hiddenExams, id],
        })),
      todos: [],
      addTodo: (text, date) =>
        set((state) => ({
          todos: [...state.todos, { id: Date.now().toString(), text, done: false, date }],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),
      challenges: [],
      addChallenge: (text) =>
        set((state) => ({
          challenges: [{ id: Date.now().toString(), text, createdAt: new Date().toISOString() }, ...state.challenges],
        })),
      deleteChallenge: (id) =>
        set((state) => ({
          challenges: state.challenges.filter((n) => n.id !== id),
        })),
      knowledges: [],
      addKnowledge: (text) =>
        set((state) => ({
          knowledges: [{ id: Date.now().toString(), text, createdAt: new Date().toISOString() }, ...state.knowledges],
        })),
      deleteKnowledge: (id) =>
        set((state) => ({
          knowledges: state.knowledges.filter((n) => n.id !== id),
        })),
      ideaList: [],
      addIdea: (text) =>
        set((state) => ({
          ideaList: [{ id: Date.now().toString(), text, createdAt: new Date().toISOString() }, ...state.ideaList],
        })),
      deleteIdea: (id) =>
        set((state) => ({
          ideaList: state.ideaList.filter((n) => n.id !== id),
        })),
    }),
    { name: 'workbench-storage' }
  )
)
