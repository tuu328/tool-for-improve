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
  challenge: string
  setChallenge: (v: string) => void
  knowledge: string
  setKnowledge: (v: string) => void
  ideas: string
  setIdeas: (v: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      activeTab: 'relax',
      setActiveTab: (tab) => set({ activeTab: tab }),
      relaxSub: 'reading',
      setRelaxSub: (sub) => set({ relaxSub: sub }),
      growthSub: 'certificate',
      setGrowthSub: (sub) => set({ growthSub: sub }),
      hiddenExams: [],
      toggleHideExam: (id) => {
        const { hiddenExams } = get()
        if (hiddenExams.includes(id)) {
          set({ hiddenExams: hiddenExams.filter((e) => e !== id) })
        } else {
          set({ hiddenExams: [...hiddenExams, id] })
        }
      },
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
      challenge: '',
      setChallenge: (v) => set({ challenge: v }),
      knowledge: '',
      setKnowledge: (v) => set({ knowledge: v }),
      ideas: '',
      setIdeas: (v) => set({ ideas: v }),
    }),
    { name: 'workbench-storage' }
  )
)
