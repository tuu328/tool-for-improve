import { useState } from 'react'
import { Check, Trash2, Plus, Lightbulb, Target, BookMarked } from 'lucide-react'
import { useStore } from '../store'

const today = new Date().toISOString().split('T')[0]

export default function BreakthroughView() {
  const todos = useStore((s) => s.todos)
  const addTodo = useStore((s) => s.addTodo)
  const toggleTodo = useStore((s) => s.toggleTodo)
  const deleteTodo = useStore((s) => s.deleteTodo)
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

      <div style={{ display: 'grid', gap: 24, marginBottom: 32 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: '#64b5f6' }}>
            <Target size={20} />
            <span style={{ fontWeight: 600 }}>个人挑战</span>
          </div>
          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
            设定 30 天小目标，每天进步 1%。可以是早起、阅读、运动或学习新技能。记录每一步突破。
          </p>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: '#81c784' }}>
            <BookMarked size={20} />
            <span style={{ fontWeight: 600 }}>知识体系</span>
          </div>
          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
            建立自己的知识库，把学到的东西结构化整理。用思维导图或笔记工具记录核心概念和关联。
          </p>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: '#ffb74d' }}>
            <Lightbulb size={20} />
            <span style={{ fontWeight: 600 }}>创意孵化</span>
          </div>
          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
            随时记录灵感，不评判、不删除。每周回顾一次，把有价值的想法转化为行动计划。
          </p>
        </div>
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
