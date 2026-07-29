import { useState } from 'react'
import { Check, Trash2, Plus, Lightbulb, Target, BookMarked, ChevronDown, ChevronUp } from 'lucide-react'
import { useStore } from '../store'

const today = new Date().toISOString().split('T')[0]

interface BreakthroughCardProps {
  title: string
  icon: React.ReactNode
  color: string
  desc: string
  value: string
  onChange: (v: string) => void
}

function BreakthroughCard({ title, icon, color, desc, value, onChange }: BreakthroughCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="card" style={{ padding: 20, cursor: 'pointer' }} onClick={() => setOpen(!open)}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color }}>
          {icon}
          <span style={{ fontWeight: 600 }}>{title}</span>
        </div>
        {open ? <ChevronUp size={18} color="#888" /> : <ChevronDown size={18} color="#888" />}
      </div>
      <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6, marginTop: 8 }}>
        {desc}
      </p>
      {value && !open && (
        <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 8, fontSize: 13, color: '#aaa' }}>
          {value.length > 60 ? value.slice(0, 60) + '...' : value}
        </div>
      )}
      {open && (
        <div style={{ marginTop: 12 }} onClick={(e) => e.stopPropagation()}>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`点击输入你的${title}记录...`}
            style={{
              width: '100%',
              minHeight: 100,
              padding: 12,
              borderRadius: 8,
              border: '1px solid #2a2a4a',
              background: '#1a1a2e',
              color: '#e0e0e0',
              fontSize: 14,
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
            }}
          />
        </div>
      )}
    </div>
  )
}

export default function BreakthroughView() {
  const todos = useStore((s) => s.todos)
  const addTodo = useStore((s) => s.addTodo)
  const toggleTodo = useStore((s) => s.toggleTodo)
  const deleteTodo = useStore((s) => s.deleteTodo)
  const challenge = useStore((s) => s.challenge)
  const setChallenge = useStore((s) => s.setChallenge)
  const knowledge = useStore((s) => s.knowledge)
  const setKnowledge = useStore((s) => s.setKnowledge)
  const ideas = useStore((s) => s.ideas)
  const setIdeas = useStore((s) => s.setIdeas)

  const [text, setText] = useState('')
  const [date, setDate] = useState(today)

  const handleAdd = () => {
    if (!text.trim()) return
    addTodo(text.trim(), date)
    setText('')
  }

  const filtered = todos.filter((t) => t.date === date)
  const todayTodos = todos.filter((t) => t.date === today)

  return (
    <div>
      <h2 className="section-title">Breakthrough</h2>

      <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
        <BreakthroughCard
          title="个人挑战"
          icon={<Target size={20} />}
          color="#64b5f6"
          desc="设定 30 天小目标，每天进步 1%。可以是早起、阅读、运动或学习新技能。记录每一步突破。"
          value={challenge}
          onChange={setChallenge}
        />
        <BreakthroughCard
          title="知识体系"
          icon={<BookMarked size={20} />}
          color="#81c784"
          desc="建立自己的知识库，把学到的东西结构化整理。用思维导图或笔记工具记录核心概念和关联。"
          value={knowledge}
          onChange={setKnowledge}
        />
        <BreakthroughCard
          title="创意孵化"
          icon={<Lightbulb size={20} />}
          color="#ffb74d"
          desc="随时记录灵感，不评判、不删除。每周回顾一次，把有价值的想法转化为行动计划。"
          value={ideas}
          onChange={setIdeas}
        />
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
        每日待办 {todayTodos.filter((t) => t.done).length}/{todayTodos.length}
      </h3>

      <div className="todo-input-area">
        <input
          type="date"
          className="date-picker"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className="todo-input"
          placeholder="添加待办事项..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button className="todo-btn" onClick={handleAdd}>
          <Plus size={18} />
        </button>
      </div>

      <div className="todo-list">
        {filtered.length === 0 && (
          <div className="empty-state" style={{ padding: 24 }}>
            <p>{date === today ? '今天还没有待办，添加一个吧' : '该日期没有待办事项'}</p>
          </div>
        )}
        {filtered.map((todo) => (
          <div key={todo.id} className="todo-item">
            <button className={`todo-check ${todo.done ? 'done' : ''}`} onClick={() => toggleTodo(todo.id)}>
              {todo.done && <Check size={14} color="#1a1a2e" />}
            </button>
            <span className={`todo-text ${todo.done ? 'done' : ''}`}>{todo.text}</span>
            <button className="todo-delete" onClick={() => deleteTodo(todo.id)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
