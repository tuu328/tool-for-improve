import { useState } from 'react'
import { Check, Trash2, Plus, Lightbulb, Target, BookMarked } from 'lucide-react'
import { useStore } from '../store'

const today = new Date().toISOString().split('T')[0]

interface BreakthroughCardProps {
  title: string
  icon: React.ReactNode
  color: string
  desc: string
  items: { id: string; text: string; createdAt: string }[]
  onAdd: (text: string) => void
  onDelete: (id: string) => void
  placeholder: string
}

function BreakthroughCard({ title, icon, color, desc, items, onAdd, onDelete, placeholder }: BreakthroughCardProps) {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)

  const handleAdd = () => {
    if (!text.trim()) return
    onAdd(text.trim())
    setText('')
  }

  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setOpen(!open)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color }}>
          {icon}
          <span style={{ fontWeight: 600 }}>{title}</span>
          <span style={{ fontSize: 12, color: '#888', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 10 }}>
            {items.length}条
          </span>
        </div>
        <span style={{ fontSize: 13, color: '#888' }}>{open ? '收起' : '展开'}</span>
      </div>
      <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6, marginTop: 8 }}>
        {desc}
      </p>

      {open && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder={placeholder}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #2a2a4a',
                background: '#1a1a2e',
                color: '#fff',
                fontSize: 14,
                outline: 'none',
              }}
            />
            <button
              onClick={handleAdd}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: 'none',
                background: color,
                color: '#1a1a2e',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Plus size={16} />
              添加
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.length === 0 && (
              <div style={{ textAlign: 'center', padding: 20, color: '#666', fontSize: 14 }}>
                还没有记录，添加第一条吧
              </div>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  background: '#1a1a2e',
                  borderRadius: 8,
                  border: '1px solid #2a2a4a',
                }}
              >
                <span style={{ flex: 1, fontSize: 14, color: '#e0e0e0', lineHeight: 1.5 }}>{item.text}</span>
                <span style={{ fontSize: 11, color: '#666', flexShrink: 0 }}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onDelete(item.id)}
                  style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 4, borderRadius: 4 }}
                  title="删除"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
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

  const challenges = useStore((s) => s.challenges)
  const addChallenge = useStore((s) => s.addChallenge)
  const deleteChallenge = useStore((s) => s.deleteChallenge)

  const knowledges = useStore((s) => s.knowledges)
  const addKnowledge = useStore((s) => s.addKnowledge)
  const deleteKnowledge = useStore((s) => s.deleteKnowledge)

  const ideaList = useStore((s) => s.ideaList)
  const addIdea = useStore((s) => s.addIdea)
  const deleteIdea = useStore((s) => s.deleteIdea)

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
          items={challenges}
          onAdd={addChallenge}
          onDelete={deleteChallenge}
          placeholder="添加一条挑战记录..."
        />
        <BreakthroughCard
          title="知识体系"
          icon={<BookMarked size={20} />}
          color="#81c784"
          desc="建立自己的知识库，把学到的东西结构化整理。用思维导图或笔记工具记录核心概念和关联。"
          items={knowledges}
          onAdd={addKnowledge}
          onDelete={deleteKnowledge}
          placeholder="添加一条知识记录..."
        />
        <BreakthroughCard
          title="创意孵化"
          icon={<Lightbulb size={20} />}
          color="#ffb74d"
          desc="随时记录灵感，不评判、不删除。每周回顾一次，把有价值的想法转化为行动计划。"
          items={ideaList}
          onAdd={addIdea}
          onDelete={deleteIdea}
          placeholder="添加一条灵感记录..."
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
