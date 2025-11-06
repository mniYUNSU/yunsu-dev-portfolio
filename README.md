# 🧑‍💻 Developer Portfolio (One Page)

## 📌 개요

이 프로젝트는 **Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui** 기반의  
**원페이지 개발자 포트폴리오 사이트**입니다.

목표는 "심플하고 깔끔한" 디자인 속에서  
**나의 경력, 기술, 프로젝트를 한눈에 보여주는 구조**를 구현하는 것입니다.

---

## 🧭 전체 구조 (One Page 기본 섹션)

1. **Hero 섹션 (인트로)**

   - 본인 이름 / 직무 (예: “Frontend Developer - Bae Yunsu”)
   - 간단한 소개 문구 (“I build intuitive and delightful user interfaces.”)
   - 프로필 이미지 or 일러스트
   - CTA 버튼 (예: “View My Work”, “Contact Me”)

2. **About 섹션 (소개)**

   - 간단한 자기소개 문장
   - 주요 기술 스택 아이콘 (React, Next.js, Swift, TypeScript 등)
   - 경력 요약 (3년 Frontend 경험, UI/UX 중심 프로젝트 등)
   - 다운로드 버튼 (Resume / PDF)

3. **Projects 섹션 (프로젝트 목록)**

   - 썸네일 이미지 + 간단 설명
   - 기술 태그 (React, Tailwind, Swift 등)
   - 역할/성과 요약
   - “View Live / GitHub” 버튼
   - Hover 시 상세 내용 또는 Demo 링크 표시
   - 프로젝트별로 슬라이드 or grid 구성

4. **Skills 섹션 (기술 스택)**

   - 언어 / 프레임워크 / 도구 / 디자인 툴 등 카테고리별 구분
   - 각 기술 아이콘 + 숙련도 바(Progress bar) 또는 level indicator
   - “Frontend / Mobile / Backend / Tools” 등으로 그룹화

5. **Experience 섹션 (경력 요약, 선택사항)**

   - 회사명, 직무, 기간, 주요 성과
   - “InBody Chatbot 개발”, “Texture 백오피스 구축” 등 핵심 프로젝트 중심
   - 타임라인 형태로 구성 가능

6. **Contact 섹션**

   - Email, GitHub, LinkedIn, SNS 링크
   - 간단한 Contact Form (Name, Email, Message)
   - “Thank you” 알림 모달 또는 toast 메시지

7. **Footer**

   - 간단한 카피라이트 (© 2025 Bae Yunsu)
   - 소셜 아이콘 (GitHub / LinkedIn / Instagram)
   - “Back to top” 버튼

---

## 🎨 주요 UI 컴포넌트 리스트

| 컴포넌트                           | 설명                                        |
| ---------------------------------- | ------------------------------------------- |
| **Navbar**                         | 페이지 내 스크롤 네비게이션 (anchor scroll) |
| **Scroll Progress Bar**            | 상단에 스크롤 진행 표시 (심플한 UX 포인트)  |
| **Card**                           | 프로젝트 카드, 기술 스택 카드 등에 활용     |
| **Tag / Chip**                     | 기술명, 카테고리 표시용                     |
| **Modal**                          | 프로젝트 상세보기, Contact 성공 메시지      |
| **Tooltip**                        | 아이콘 위에 기술명 표시                     |
| **Button (CTA)**                   | Primary/Secondary 스타일 구분               |
| **Section Divider**                | 섹션 간 시각적 구분 (line or gradient)      |
| **Theme Toggle**                   | 다크모드/라이트모드 전환                    |
| **Smooth Scroll / Fade Animation** | IntersectionObserver 기반 등장 효과         |

---

## ⚙️ 기능적 요소

- **Smooth Scroll Navigation**
- **Responsive Design (모바일/태블릿/데스크탑)**
- **Scroll-based Animation (Framer Motion / AOS 등)**
- **Dark Mode / Light Mode**
- **Contact Form (EmailJS / Formspree 연동 가능)**
- **SEO / OG Tag / Favicon 설정**
- **Google Analytics or Plausible Tracking**
- **Lazy Loading / 이미지 최적화**
- **GitHub / LinkedIn API 연동 (optional)**

---

## 🧩 기술적 구현 포인트

- **Stack 예시:**

  - Next.js 14 + TypeScript + Tailwind CSS
  - Framer Motion (애니메이션)
  - React Hook Form (Contact Form)
  - next-seo (SEO 최적화)
  - EmailJS or Formspree (메일 전송)

- **파일 구조 예시:**

  ```
  /components
    ├── Hero.tsx
    ├── About.tsx
    ├── Projects.tsx
    ├── Skills.tsx
    ├── Contact.tsx
    ├── Footer.tsx
  /data
    ├── projects.ts
    ├── skills.ts
  /styles
    ├── globals.css
  ```

---

## 💡 추가 아이디어

- **언어 전환 (ko/en/jp)** 기능
- **프로젝트 상세 모달** (스크린샷, 역할, 기술, 링크)
- **Scroll Snap** 기반 세로 페이지 (Apple 스타일)
- **Loading Transition** (첫 진입 시 fade-in 효과)
- **파비콘 / 로고** (개인 심볼 형태)

---
