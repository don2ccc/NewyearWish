import { Wish } from './types';

// Used when Supabase keys are not present or for initial rendering
export const MOCK_WISHES: Wish[] = [
  {
    id: 'm1',
    content: "祝大家新年快乐，万事如意，财源滚滚！ 🧧",
    name: "快乐熊猫",
    created_at: new Date().toISOString(),
    is_mock: true
  },
  {
    id: 'm2',
    content: "希望2026年代码一次过，Bug少一点！ 💻✨",
    name: "编程巫师",
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    is_mock: true
  },
  {
    id: 'm3',
    content: "家人身体健康，平平安安。恭喜发财！ 🏮",
    name: "李伟",
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    is_mock: true
  },
  {
    id: 'm4',
    content: "今年一定要多出去旅游！去看看世界！ 🌏✈️",
    name: "旅行达人",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    is_mock: true
  },
  {
    id: 'm5',
    content: "逢考必过，门门满分！ 📚",
    name: "学霸A",
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    is_mock: true
  },
  {
    id: 'm6',
    content: "希望世界和平，充满爱。 ❤️",
    name: "和平使者",
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    is_mock: true
  },
  {
    id: 'm7',
    content: "升职加薪，走向人生巅峰！ 🚀",
    name: "事业心",
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    is_mock: true
  }
];

export const TABLE_NAME = 'wishes';