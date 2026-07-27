import { useState } from 'react';
import { useStore, actions } from '../store';
import { Award, Wrench, Plus, Calendar, ExternalLink } from 'lucide-react';
import type { ExamInfo, SkillResource } from '../types';

type SubCategory = 'exams' | 'skills';

export default function GrowthView() {
  const [activeTab, setActiveTab] = useState<SubCategory>('exams');
  const [showExamForm, setShowExamForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);

  const exams = useStore((state) => state.exams);
  const skills = useStore((state) => state.skills);

  const tabs = [
    { id: 'exams', label: '考证规划', icon: Award },
    { id: 'skills', label: '技能提升', icon: Wrench },
  ] as const;

  // 添加考试表单
  const ExamForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      level: 'national' as 'national' | 'enterprise',
      registrationStart: '',
      registrationEnd: '',
      examDate: '',
      source: '',
      url: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newExam: ExamInfo = {
        id: `exam-${Date.now()}`,
        ...formData,
      };
      actions.addExam(newExam);
      setShowExamForm(false);
    };

    return (
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>考试名称 *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="例如: 全国计算机等级考试二级"
            required
          />
        </div>
        <div className="form-group">
          <label>认可级别 *</label>
          <select
            value={formData.level}
            onChange={(e) =>
              setFormData({
                ...formData,
                level: e.target.value as 'national' | 'enterprise',
              })
            }
          >
            <option value="national">国家认可</option>
            <option value="enterprise">企业认可</option>
          </select>
        </div>
        <div className="form-group">
          <label>报名开始时间</label>
          <input
            type="date"
            value={formData.registrationStart}
            onChange={(e) =>
              setFormData({ ...formData, registrationStart: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>报名截止时间</label>
          <input
            type="date"
            value={formData.registrationEnd}
            onChange={(e) =>
              setFormData({ ...formData, registrationEnd: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>考试时间</label>
          <input
            type="date"
            value={formData.examDate}
            onChange={(e) =>
              setFormData({ ...formData, examDate: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>信息来源</label>
          <input
            type="text"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            placeholder="例如: 教育部考试中心"
          />
        </div>
        <div className="form-group">
          <label>官方链接</label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://"
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button type="submit" className="btn btn-primary">
            保存
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowExamForm(false)}
          >
            取消
          </button>
        </div>
      </form>
    );
  };

  // 添加技能表单
  const SkillForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      platform: '',
      category: '',
      difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
      url: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newSkill: SkillResource = {
        id: `skill-${Date.now()}`,
        ...formData,
      };
      actions.addSkill(newSkill);
      setShowSkillForm(false);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>技能名称 *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="例如: Python编程"
            required
          />
        </div>
        <div className="form-group">
          <label>学习平台 *</label>
          <input
            type="text"
            value={formData.platform}
            onChange={(e) =>
              setFormData({ ...formData, platform: e.target.value })
            }
            placeholder="例如: B站、慕课网、Coursera"
            required
          />
        </div>
        <div className="form-group">
          <label>分类</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            placeholder="例如: 编程、设计、数据分析"
          />
        </div>
        <div className="form-group">
          <label>难度等级</label>
          <select
            value={formData.difficulty}
            onChange={(e) =>
              setFormData({
                ...formData,
                difficulty: e.target.value as any,
              })
            }
          >
            <option value="beginner">初级</option>
            <option value="intermediate">中级</option>
            <option value="advanced">高级</option>
          </select>
        </div>
        <div className="form-group">
          <label>课程链接</label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://"
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button type="submit" className="btn btn-primary">
            保存
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowSkillForm(false)}
          >
            取消
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="content-card">
      <h2>
        <Award size={28} />
        Growth - 持续成长
      </h2>

      <div className="sub-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} style={{ marginRight: 6 }} />
              {tab.label}
            </button>
          );
        })}
        <button
          className="btn btn-primary"
          onClick={() => {
            if (activeTab === 'exams') {
              setShowExamForm(!showExamForm);
              setShowSkillForm(false);
            } else {
              setShowSkillForm(!showSkillForm);
              setShowExamForm(false);
            }
          }}
          style={{ marginLeft: 'auto' }}
        >
          <Plus size={16} />
          添加
        </button>
      </div>

      {activeTab === 'exams' && showExamForm && (
        <div className="form-container" style={{ marginBottom: '24px' }}>
          <ExamForm />
        </div>
      )}

      {activeTab === 'skills' && showSkillForm && (
        <div className="form-container" style={{ marginBottom: '24px' }}>
          <SkillForm />
        </div>
      )}

      {activeTab === 'exams' && (
        <div className="item-grid">
          {exams.map((exam) => (
            <div key={exam.id} className="item-card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <h3>{exam.name}</h3>
                <span className={`badge badge-${exam.level}`}>
                  {exam.level === 'national' ? '国家认可' : '企业认可'}
                </span>
              </div>
              <div className="meta" style={{ marginTop: '8px' }}>
                {exam.registrationStart && (
                  <span>
                    <Calendar size={12} style={{ marginRight: 4 }} />
                    报名: {new Date(exam.registrationStart).toLocaleDateString('zh-CN')}
                  </span>
                )}
                {exam.examDate && (
                  <span>
                    考试: {new Date(exam.examDate).toLocaleDateString('zh-CN')}
                  </span>
                )}
              </div>
              {exam.source && (
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>
                  来源: {exam.source}
                  {exam.url && (
                    <a
                      href={exam.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: '8px', color: '#4f46e5' }}
                    >
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="item-grid">
          {skills.map((skill) => (
            <div key={skill.id} className="item-card">
              <h3>{skill.title}</h3>
              <div className="meta">
                <span>{skill.platform}</span>
                {skill.category && <span>{skill.category}</span>}
                {skill.difficulty && (
                  <span>
                    {skill.difficulty === 'beginner'
                      ? '初级'
                      : skill.difficulty === 'intermediate'
                      ? '中级'
                      : '高级'}
                  </span>
                )}
              </div>
              {skill.url && (
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '12px', color: '#4f46e5', marginTop: '8px', display: 'inline-block' }}
                >
                  前往学习 →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'exams' && exams.length === 0 && (
        <div className="empty-state">
          <Award size={64} />
          <p>暂无考证信息，点击"添加"按钮添加你的考证规划</p>
          <p style={{ fontSize: '12px', marginTop: '8px' }}>
            提示：我们仅支持国家认可或企业广泛认可的考试
          </p>
        </div>
      )}

      {activeTab === 'skills' && skills.length === 0 && (
        <div className="empty-state">
          <Wrench size={64} />
          <p>暂无技能学习计划，点击"添加"按钮添加你想要学习的技能</p>
        </div>
      )}
    </div>
  );
}