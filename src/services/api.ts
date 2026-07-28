export interface ContentItem {
  id: string
  title: string
  author?: string
  url?: string
  hot?: number
}

// 知乎热榜（通过 CORS 代理）
export async function fetchZhihuHot(): Promise<ContentItem[]> {
  try {
    const res = await fetch(
      'https://api.allorigins.win/get?url=' +
        encodeURIComponent('https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=10')
    )
    const data = await res.json()
    const parsed = JSON.parse(data.contents)
    return parsed.data.map((item: any) => ({
      id: String(item.target.id),
      title: item.target.title,
      author: item.target.author_name,
      url: `https://zhihu.com/question/${item.target.id}`,
      hot: item.detail_text,
    }))
  } catch {
    return []
  }
}

// 豆瓣电影热榜
export async function fetchDoubanMovies(): Promise<ContentItem[]> {
  try {
    const res = await fetch(
      'https://api.allorigins.win/get?url=' +
        encodeURIComponent('https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=10&page_start=0')
    )
    const data = await res.json()
    const parsed = JSON.parse(data.contents)
    return parsed.subjects.map((item: any) => ({
      id: String(item.id),
      title: item.title,
      url: item.url,
      hot: item.rate ? `${item.rate}分` : undefined,
    }))
  } catch {
    return []
  }
}

// 豆瓣音乐热榜
export async function fetchDoubanMusic(): Promise<ContentItem[]> {
  try {
    const res = await fetch(
      'https://api.allorigins.win/get?url=' +
        encodeURIComponent('https://music.douban.com/j/chart/top_list?type=11&interval_id=100%3A90&limit=10')
    )
    const data = await res.json()
    const parsed = JSON.parse(data.contents)
    return parsed.map((item: any) => ({
      id: String(item.song_id || item.id),
      title: item.title,
      author: item.artist_name || item.singers?.map((s: any) => s.name).join(', '),
      url: item.url,
    }))
  } catch {
    return []
  }
}

// 内置考试数据（国家认可 + 企业认同）
export interface ExamItem {
  id: string
  name: string
  registrationDate: string
  examDate: string
  org: string
  category: string
}

const EXAM_DATA: ExamItem[] = [
  { id: 'ncre', name: '全国计算机等级考试（NCRE）', registrationDate: '2025-01-04', examDate: '2025-03-29', org: '教育部考试中心', category: 'IT' },
  { id: 'cetc', name: '大学英语四六级（CET）', registrationDate: '2025-03-15', examDate: '2025-06-14', org: '教育部考试中心', category: '语言' },
  { id: 'cpa', name: '注册会计师（CPA）', registrationDate: '2025-04-01', examDate: '2025-08-23', org: '中国注册会计师协会', category: '财会' },
  { id: 'cfa1', name: 'CFA 一级', registrationDate: '2025-05-01', examDate: '2025-08-20', org: 'CFA Institute', category: '金融' },
  { id: 'pmp', name: 'PMP 项目管理', registrationDate: '全年', examDate: '每月', org: 'PMI', category: '管理' },
  { id: 'nca', name: '网络工程师（软考中级）', registrationDate: '2025-03-01', examDate: '2025-05-24', org: '工信部 + 人社部', category: 'IT' },
  { id: 'teacher', name: '教师资格证', registrationDate: '2025-01-12', examDate: '2025-03-08', org: '教育部考试中心', category: '教育' },
  { id: 'law', name: '法律职业资格考试', registrationDate: '2025-06-10', examDate: '2025-09-20', org: '司法部', category: '法律' },
  { id: 'acca', name: 'ACCA', registrationDate: '全年', examDate: '3/6/9/12月', org: 'ACCA', category: '财会' },
  { id: 'architect', name: '一级建造师', registrationDate: '2025-06-20', examDate: '2025-09-20', org: '住建部', category: '工程' },
]

export function fetchExams(): ExamItem[] {
  return EXAM_DATA
}

// 技能资源
export interface SkillItem {
  id: string
  title: string
  platform: string
  url: string
  category: string
}

export function fetchSkills(): SkillItem[] {
  return [
    { id: '1', title: 'React 从入门到精通', platform: 'B站 / 慕课网', url: 'https://www.bilibili.com', category: '前端开发' },
    { id: '2', title: 'Python 数据分析实战', platform: 'Coursera / DataCamp', url: 'https://www.coursera.org', category: '数据科学' },
    { id: '3', title: 'Figma UI 设计系统', platform: 'Figma Community', url: 'https://www.figma.com/community', category: '设计' },
    { id: '4', title: 'Kubernetes 容器编排', platform: 'CNCF / KodeKloud', url: 'https://www.cncf.io', category: '运维' },
    { id: '5', title: '机器学习专项课程', platform: 'Coursera / 吴恩达', url: 'https://www.coursera.org', category: 'AI' },
    { id: '6', title: 'Go 语言高并发编程', platform: '极客时间 / B站', url: 'https://www.bilibili.com', category: '后端开发' },
    { id: '7', title: '产品经理实战训练营', platform: '三节课 / 起点学院', url: 'https://www.sanjieke.cn', category: '产品' },
    { id: '8', title: '雅思口语 7 分攻略', platform: '小站教育 / 流利说', url: 'https://www.zhan.com', category: '语言' },
  ]
}
