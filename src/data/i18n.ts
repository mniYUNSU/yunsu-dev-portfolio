export type Locale = "ko" | "ja" | "en";

type SectionTranslation = {
  title: string;
};

type Translations = {
  navbar: {
    links: Record<
      "home" | "about" | "projects" | "skills" | "experience" | "contact",
      string
    >;
    cta: string;
  };
  hero: {
    primaryCta: string;
    secondaryCta: string;
  };
  sections: {
    about: SectionTranslation;
    projects: SectionTranslation;
    skills: SectionTranslation;
    experience: SectionTranslation;
    contact: SectionTranslation;
  };
  projects: {
    viewProject: string;
  };
  contact: {
    submitCta: string;
    submitting: string;
  };
};

export const defaultLocale: Locale = "ko";

export const messages: Record<Locale, Translations> = {
  ko: {
    navbar: {
      links: {
        home: "홈",
        about: "소개",
        projects: "프로젝트",
        skills: "기술",
        experience: "경력",
        contact: "문의",
      },
      cta: "연락하기",
    },
    hero: {
      primaryCta: "프로젝트 살펴보기",
      secondaryCta: "문의하기",
    },
    sections: {
      about: { title: "소개" },
      projects: { title: "프로젝트" },
      skills: { title: "기술 스택" },
      experience: { title: "경력" },
      contact: { title: "문의하기" },
    },
    projects: {
      viewProject: "프로젝트 보기",
    },
    contact: {
      submitCta: "메시지 보내기",
      submitting: "전송 중...",
    },
  },
  ja: {
    navbar: {
      links: {
        home: "ホーム",
        about: "紹介",
        projects: "プロジェクト",
        skills: "スキル",
        experience: "経験",
        contact: "連絡",
      },
      cta: "連絡する",
    },
    hero: {
      primaryCta: "実績を見る",
      secondaryCta: "連絡する",
    },
    sections: {
      about: { title: "紹介" },
      projects: { title: "プロジェクト" },
      skills: { title: "スキル" },
      experience: { title: "経験" },
      contact: { title: "お問い合わせ" },
    },
    projects: {
      viewProject: "プロジェクトを見る",
    },
    contact: {
      submitCta: "メッセージを送信",
      submitting: "送信中...",
    },
  },
  en: {
    navbar: {
      links: {
        home: "Home",
        about: "About",
        projects: "Projects",
        skills: "Skills",
        experience: "Experience",
        contact: "Contact",
      },
      cta: "Let’s Talk",
    },
    hero: {
      primaryCta: "View My Work",
      secondaryCta: "Contact Me",
    },
    sections: {
      about: { title: "About" },
      projects: { title: "Projects" },
      skills: { title: "Toolkit" },
      experience: { title: "Experience" },
      contact: { title: "Contact" },
    },
    projects: {
      viewProject: "View project",
    },
    contact: {
      submitCta: "Send message",
      submitting: "Sending...",
    },
  },
};
