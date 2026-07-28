import { Award, Wrench, X } from 'lucide-react'
import { useStore } from '../store'
import { fetchExams, fetchSkills } from '../services/api'

const subTabs = [
  { id: 'certificate' as const, label: '考证', icon: Award },
  { id: 'skill' as const, label: '技能', icon: Wrench },
]

export default function GrowthView() {
  const growthSub = useStore((s) => s.growthSub)
  const setGrowthSub = useStore((s) => s.setGrowthSub)
  const hiddenExams = useStore((s) => s.hiddenExams)
  const toggleHideExam = useStore((s) => s.toggleHideExam)

  const exams = fetchExams().filter((e) => !hiddenExams.includes(e.id))
  const skills = fetchSkills()

  return (
    <div>
      <h2 className="section-title">Growth</h2>
      <div className="sub-tabs">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className={`sub-tab ${growthSub === tab.id ? 'active' : ''}`}
            onClick={() => setGrowthSub(tab.id)}
          >
            <tab.icon size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            {tab.label}
          </button>
        ))}
      </div>

      {growthSub === 'certificate' && (
        <div>
          {exams.map((exam) => (
            <div key={exam.id} className="exam-item">
              <div className="exam-info">
                <h3>{exam.name}</h3>
                <p>报名：{exam.registrationDate}</p>
                <p>考试：{exam.examDate}</p>
                <span className="exam-tag">{exam.org}</span>
                <span className="exam-tag" style={{ marginLeft: 6 }}>{exam.category}</span>
              </div>
              <button className="exam-hide" onClick={() => toggleHideExam(exam.id)} title="隐藏此考试">
                <X size={18} />
              </button>
            </div>
          ))}
          {exams.length === 0 && (
            <div className="empty-state">
              <p>所有考试已隐藏</p>
            </div>
          )}
        </div>
      )}

      {growthSub === 'skill' && (
        <div className="card-grid">
          {skills.map((skill) => (
            <div key={skill.id} className="card">
              <div className="card-title">{skill.title}</div>
              <div className="card-meta">
                <span>{skill.platform}</span>
                <span className="exam-tag">{skill.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
