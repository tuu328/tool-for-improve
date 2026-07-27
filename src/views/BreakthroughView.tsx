import { useState } from 'react';
import { useStore, actions } from '../store';
import { Rocket, Target, Brain, Lightbulb, Plus, CheckCircle, Clock } from 'lucide-react';
import type { Challenge, KnowledgeItem, Idea } from '../types';

type SubCategory = 'challenges' | 'knowledge' | 'ideas';

export default function BreakthroughView() {
  const [activeTab, setActiveTab] = useState<SubCategory>('challenges');
  const [showForm, setShowForm] = useState(false);

  const challenges = useStore((state) => state.challenges);
  const knowledge = useStore((state) => state.knowledge);
  const ideas = useStore((state) => state.ideas);

  const tabs = [
    { id: 'challenges', label: '个人挑战', icon: Target },
    { id: 'knowledge', label: '知识体系', icon: Brain },
    { id: 'ideas', label: '创意孵化', icon: Lightbulb },
  ] as const;

  // 挑战表单
  const ChallengeForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      deadline: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newChallenge: Challenge = {
        id: `challenge-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        deadline: formData.deadline,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      actions.addChallenge(newChallenge);
      setShowForm(false);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>挑战标题 *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="例如: 21天早起计划"
            required
          />
        </div>
        <div className="form-group">
          <label>详细描述</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="描述你的挑战目标和执行计划"
            rows={3}
          />
        </div>
        <div className="form-group">
          <label>截止日期</label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button type="submit" className="btn btn-primary">
            开始挑战
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowForm(false)}
          >
            取消
          </button>
        </div>
      </form>
    );
  };

  // 知识条目表单
  const KnowledgeForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      content: '',
      category: '',
      tags: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newItem: KnowledgeItem = {
        id: `knowledge-${Date.now()}`,
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        createdAt: new Date().toISOString(),
      };
      actions.addKnowledge(newItem);
      setShowForm(false);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>知识标题 *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="例如: React Hooks最佳实践"
            required
          />
        </div>
        <div className="form-group">
          <label>内容摘要 *</label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="记录关键知识点、学习心得"
            rows={4}
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
            placeholder="例如: 前端开发"
          />
        </div>
        <div className="form-group">
          <label>标签（逗号分隔）</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="例如: React, Hooks, 性能优化"
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button type="submit" className="btn btn-primary">
            保存
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowForm(false)}
          >
            取消
          </button>
        </div>
      </form>
    );
  };

  // 创意表单
  const IdeaForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newIdea: Idea = {
        id: `idea-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        status: 'draft',
        createdAt: new Date().toISOString(),
      };
      actions.addIdea(newIdea);
      setShowForm(false);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>创意标题 *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="例如: 开发一个时间管理应用"
            required
          />
        </div>
        <div className="form-group">
          <label>详细描述</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="描述你的创意想法、可行性分析等"
            rows={4}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button type="submit" className="btn btn-primary">
            记录灵感
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowForm(false)}
          >
            取消
          </button>
        </div>
      </form>
    );
  };

  const handleChallengeStatusUpdate = (id: string, newStatus: Challenge['status']) => {
    actions.updateChallenge(id, { status: newStatus });
  };

  const handleIdeaStatusUpdate = (id: string, newStatus: Idea['status']) => {
    actions.updateIdea(id, { status: newStatus });
  };

  return (
    <div className="content-card">
      <h2>
        <Rocket size={28} />
        Breakthrough - 自我突破
      </h2>

      <div className="sub-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setShowForm(false);
              }}
            >
              <Icon size={16} style={{ marginRight: 6 }} />
              {tab.label}
            </button>
          );
        })}
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
          style={{ marginLeft: 'auto' }}
        >
          <Plus size={16} />
          添加
        </button>
      </div>

      {showForm && (
        <div className="form-container" style={{ marginBottom: '24px' }}>
          {activeTab === 'challenges' && <ChallengeForm />}
          {activeTab === 'knowledge' && <KnowledgeForm />}
          {activeTab === 'ideas' && <IdeaForm />}
        </div>
      )}

      {/* 挑战列表 */}
      {activeTab === 'challenges' && (
        <div className="item-grid">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="item-card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <h3>{challenge.title}</h3>
                <span className={`status-badge status-${challenge.status}`}>
                  {challenge.status === 'pending'
                    ? '待开始'
                    : challenge.status === 'in_progress'
                    ? '进行中'
                    : '已完成'}
                </span>
              </div>
              {challenge.description && (
                <p style={{ marginTop: '8px', fontSize: '13px', color: '#64748b' }}>
                  {challenge.description}
                </p>
              )}
              <div className="meta" style={{ marginTop: '12px' }}>
                {challenge.deadline && (
                  <span>
                    <Clock size={12} style={{ marginRight: 4 }} />
                    截止: {new Date(challenge.deadline).toLocaleDateString('zh-CN')}
                  </span>
                )}
              </div>
              <div
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                {challenge.status !== 'in_progress' && (
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                    onClick={() =>
                      handleChallengeStatusUpdate(challenge.id, 'in_progress')
                    }
                  >
                    开始
                  </button>
                )}
                {challenge.status !== 'completed' && (
                  <button
                    className="btn btn-primary"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                    onClick={() =>
                      handleChallengeStatusUpdate(challenge.id, 'completed')
                    }
                  >
                    <CheckCircle size={12} />
                    完成
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 知识库列表 */}
      {activeTab === 'knowledge' && (
        <div className="item-grid">
          {knowledge.map((item) => (
            <div key={item.id} className="item-card">
              <h3>{item.title}</h3>
              <p
                style={{
                  marginTop: '8px',
                  fontSize: '13px',
                  color: '#64748b',
                  lineHeight: 1.6,
                }}
              >
                {item.content}
              </p>
              <div className="meta" style={{ marginTop: '12px' }}>
                {item.category && <span>{item.category}</span>}
              </div>
              {item.tags.length > 0 && (
                <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '2px 8px',
                        background: '#f1f5f9',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: '#475569',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 创意列表 */}
      {activeTab === 'ideas' && (
        <div className="item-grid">
          {ideas.map((idea) => (
            <div key={idea.id} className="item-card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <h3>{idea.title}</h3>
                <span
                  className={`status-badge status-${idea.status.replace('_', '-')}`}
                >
                  {idea.status === 'draft'
                    ? '草稿'
                    : idea.status === 'developing'
                    ? '孵化中'
                    : '已实现'}
                </span>
              </div>
              {idea.description && (
                <p style={{ marginTop: '8px', fontSize: '13px', color: '#64748b' }}>
                  {idea.description}
                </p>
              )}
              <div
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <select
                  value={idea.status}
                  onChange={(e) =>
                    handleIdeaStatusUpdate(
                      idea.id,
                      e.target.value as Idea['status']
                    )
                  }
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                  }}
                >
                  <option value="draft">草稿</option>
                  <option value="developing">孵化中</option>
                  <option value="realized">已实现</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 空状态 */}
      {activeTab === 'challenges' && challenges.length === 0 && (
        <div className="empty-state">
          <Target size={64} />
          <p>暂无挑战，点击"添加"开始你的第一个个人挑战</p>
        </div>
      )}

      {activeTab === 'knowledge' && knowledge.length === 0 && (
        <div className="empty-state">
          <Brain size={64} />
          <p>知识库为空，点击"添加"记录你的学习成果</p>
        </div>
      )}

      {activeTab === 'ideas' && ideas.length === 0 && (
        <div className="empty-state">
          <Lightbulb size={64} />
          <p>暂无创意，点击"添加"记录你的灵感火花</p>
        </div>
      )}
    </div>
  );
}