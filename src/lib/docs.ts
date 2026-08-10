import { marked } from 'marked';

import readme from '../../README.md?raw';
import characters from '../../01_등장인물_설정.md?raw';
import worldbuilding from '../../02_세계관_설정.md?raw';
import demoFlow from '../../데모/01_퀘스트_진행_트리.md?raw';
import demoDialogue from '../../데모/02_스토리_및_대화_대본.md?raw';
import demoCompactDialogue from '../../데모/03_간소_대화_모드.md?raw';
import mainStory from '../../정규/01_퀘스트_스토리_SSOT.md?raw';
import mainDialogue from '../../정규/02_퀘스트_대화집.md?raw';
import mainVideos from '../../정규/03_영상_모음.md?raw';
import mainCapsuleCandidates from '../../정규/04_스팀_캡슐_후보.md?raw';

export type StoryDoc = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  source: string;
  body: string;
};

export const docs: StoryDoc[] = [
  {
    slug: 'guide',
    title: '스토리 정리 작업본',
    eyebrow: 'Guide',
    description: '문서의 목적, 적용 원칙, 버전별 구조와 현재 남아 있는 검토 항목을 확인합니다.',
    source: 'README.md',
    body: readme,
  },
  {
    slug: 'characters',
    title: '등장인물 설정',
    eyebrow: 'Characters',
    description: '루나와 두더지의 외형, 생활, 역할, 관계 및 스토리 작성 기준입니다.',
    source: '01_등장인물_설정.md',
    body: characters,
  },
  {
    slug: 'worldbuilding',
    title: '세계관 설정',
    eyebrow: 'Worldbuilding · CATch Can Co.',
    description: '참치 통조림 회사 CATch Can Co.의 시대 원칙, 역대 사장, 로고와 제품 디자인 기준입니다.',
    source: '02_세계관_설정.md',
    body: worldbuilding,
  },
  {
    slug: 'demo/quest-flow',
    title: '데모 퀘스트 진행 트리',
    eyebrow: 'Demo · Quest Flow',
    description: '화장실 고장에서 시작해 취수 시설 복구와 마지막 참치캔으로 이어지는 데모 흐름입니다.',
    source: '데모/01_퀘스트_진행_트리.md',
    body: demoFlow,
  },
  {
    slug: 'demo/dialogue',
    title: '데모 스토리 및 대화 대본',
    eyebrow: 'Demo · Dialogue',
    description: '데모의 장면별 진행과 루나·두더지 대화를 정리한 전체 대본입니다.',
    source: '데모/02_스토리_및_대화_대본.md',
    body: demoDialogue,
  },
  {
    slug: 'demo/compact-dialogue',
    title: '데모 간소 대화 모드',
    eyebrow: 'Demo · Compact Dialogue',
    description: '각 장면을 루나 한 줄과 두더지 한 줄, 정확히 2대사로 압축한 데모 대본입니다.',
    source: '데모/03_간소_대화_모드.md',
    body: demoCompactDialogue,
  },
  {
    slug: 'main/quest-story',
    title: '정규 퀘스트 스토리 SSOT',
    eyebrow: 'Main · Story SSOT',
    description: '정규판의 맵 진행, 메인·선택 퀘스트, 아이템과 엔딩 조건을 담은 기준 문서입니다.',
    source: '정규/01_퀘스트_스토리_SSOT.md',
    body: mainStory,
  },
  {
    slug: 'main/dialogue',
    title: '정규 퀘스트 대화집',
    eyebrow: 'Main · Dialogue',
    description: 'M01~M20과 선택 퀘스트의 시작, 요구, 부족, 완료 대사를 모은 대화집입니다.',
    source: '정규/02_퀘스트_대화집.md',
    body: mainDialogue,
  },
  {
    slug: 'main/videos',
    title: '본편 영상 모음',
    eyebrow: 'Main · Video Archive',
    description: '프롤로그 첫 등장 등 본편 장면의 짧은 영상 컷을 A/B로 비교하는 아카이브입니다.',
    source: '정규/03_영상_모음.md',
    body: mainVideos,
  },
  {
    slug: 'main/capsule-candidates',
    title: '스팀 캡슐 후보',
    eyebrow: 'Main · Capsule Concepts',
    description: '세로형 채색 후보와 세로·가로 스팀 캡슐 구도 러프를 비교하는 작업 페이지입니다.',
    source: '정규/04_스팀_캡슐_후보.md',
    body: mainCapsuleCandidates,
  },
];

const wikiLinks: Record<string, string> = {
  '01_등장인물_설정': '/characters/',
  '02_세계관_설정': '/worldbuilding/',
  '데모/01_퀘스트_진행_트리': '/demo/quest-flow/',
  '데모/02_스토리_및_대화_대본': '/demo/dialogue/',
  '데모/03_간소_대화_모드': '/demo/compact-dialogue/',
  '정규/01_퀘스트_스토리_SSOT': '/main/quest-story/',
  '정규/02_퀘스트_대화집': '/main/dialogue/',
  '정규/03_영상_모음': '/main/videos/',
  '정규/04_스팀_캡슐_후보': '/main/capsule-candidates/',
};

marked.setOptions({ gfm: true, breaks: false });

export function renderMarkdown(markdown: string): string {
  const normalized = markdown
    .replace(/^> \[!(IMPORTANT|NOTE|WARNING|TIP)\]\s*(.*)$/gm, (_match, kind, label) => {
      const names: Record<string, string> = { IMPORTANT: '중요', NOTE: '참고', WARNING: '주의', TIP: '팁' };
      return `> **${label || names[kind]}**`;
    })
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, target, label) => {
      const href = wikiLinks[target] ?? '#';
      const text = label ?? target.split('/').pop()?.replace(/^\d+_/, '') ?? target;
      return `[${text}](${href})`;
    });

  return String(marked.parse(normalized)).replace(/<img /g, '<img loading="lazy" decoding="async" ');
}

export function getDoc(slug: string): StoryDoc | undefined {
  return docs.find((doc) => doc.slug === slug);
}

export const groups = [
  { label: '시작', docs: docs.filter((doc) => !doc.slug.includes('/')) },
  { label: '데모 버전', docs: docs.filter((doc) => doc.slug.startsWith('demo/')) },
  { label: '정규 버전', docs: docs.filter((doc) => doc.slug.startsWith('main/')) },
];
