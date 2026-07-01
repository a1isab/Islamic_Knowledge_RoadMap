import type { Roadmap, RoadmapNode } from "@/types/roadmap"

const ARABIC_ROADMAP_ID = "arabic-roadmap"

const nodes: RoadmapNode[] = [
  {
    id: "arabic-alphabet",
    roadmapId: ARABIC_ROADMAP_ID,
    title: "Arabic Alphabet",
    description:
      "Learn the 28 letters of the Arabic alphabet, their shapes, and pronunciation (makharij). Master reading from right to left.",
    difficulty: "beginner",
    estimatedHours: 2,
    prerequisites: [],
    position: { x: 250, y: 25 },
    sortOrder: 1,
    stage: 1,
    resources: [
      {
        id: "res-alphabet-1",
        nodeId: "arabic-alphabet",
        title: "Noorani Qaida",
        type: "book",
        author: "Various",
        description:
          "Traditional primer for Arabic reading, used worldwide for centuries.",
        isVerified: true,
      },
      {
        id: "res-alphabet-2",
        nodeId: "arabic-alphabet",
        title: "Noorani Qaida Full Course (Arabic Alphabet)",
        type: "video",
        url: "https://www.youtube.com/embed/videoseries?list=PLN153pF22YWbfFjQT4IWbWCHF-c7V7Abg",
        description:
          "Complete step-by-step course covering all 28 letters, pronunciation (makharij), and writing from Alif to Yaa.",
        isVerified: true,
      },
    ],
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "How many letters does the Arabic alphabet have?",
          options: ["26", "28", "32", "24"],
          correctIndex: 1,
        },
        {
          question: "Arabic is read from which direction?",
          options: ["Left to right", "Right to left", "Top to bottom", "Bottom to top"],
          correctIndex: 1,
        },
        {
          question: "What is the term for the points of articulation of Arabic letters?",
          options: ["Tajweed", "Makharij", "Qira'at", "Rasm"],
          correctIndex: 1,
        },
        {
          question: "How many basic shapes does each Arabic letter have depending on its position?",
          options: ["2", "3", "4", "5"],
          correctIndex: 2,
        },
      ],
    },
  },
  {
    id: "basic-reading",
    roadmapId: ARABIC_ROADMAP_ID,
    title: "Basic Reading",
    description:
      "Practice reading Arabic words and short sentences. Understand sukoon, shaddah, and madd rules.",
    difficulty: "beginner",
    estimatedHours: 5,
    prerequisites: [{ nodeId: "arabic-alphabet" }],
    position: { x: 250, y: 125 },
    sortOrder: 2,
    stage: 1,
    resources: [
      {
        id: "res-reading-1",
        nodeId: "basic-reading",
        title: "Qaidah Nooraniyyah",
        type: "book",
        author: "Shaykh Noor Muhammad Haqqani",
        description:
          "Complete guide to reading Arabic with proper tajweed principles.",
        isVerified: true,
      },
      {
        id: "res-reading-2",
        nodeId: "basic-reading",
        title: "Learn to Read the Qur'aan (al-Qaaidah an-Nooraaniyyah)",
        type: "video",
        url: "https://www.youtube.com/embed/videoseries?list=PLMkznvaDGY6_FuUQBmUWBmRs-pnykHtm5",
        description:
          "Complete 25-lesson video course teaching Arabic reading with tajweed using the renowned Qaaidah Nooraniyyah method.",
        isVerified: true,
      },
    ],
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "What does 'sukoon' indicate in Arabic reading?",
          options: ["A long vowel", "A doubled letter", "The absence of a vowel", "A nasal sound"],
          correctIndex: 2,
        },
        {
          question: "What is 'shaddah' in Arabic?",
          options: ["A pause", "A doubled consonant", "A vowel elongation", "A silent letter"],
          correctIndex: 1,
        },
        {
          question: "'Madd' refers to what in Arabic recitation?",
          options: ["Stopping", "Nasalization", "Elongation of a vowel", "Whispering"],
          correctIndex: 2,
        },
        {
          question: "Which vowel is represented by a 'dammah'?",
          options: ["A", "I", "U", "No vowel"],
          correctIndex: 2,
        },
      ],
    },
  },
  {
    id: "basic-vocabulary",
    roadmapId: ARABIC_ROADMAP_ID,
    title: "Basic Vocabulary",
    description:
      "Build a foundation of 200+ common Arabic words: household items, colors, numbers, body parts, and everyday phrases.",
    difficulty: "beginner",
    estimatedHours: 10,
    prerequisites: [{ nodeId: "basic-reading" }],
    position: { x: 250, y: 225 },
    sortOrder: 3,
    stage: 1,
    resources: [
      {
        id: "res-vocab-1",
        nodeId: "basic-vocabulary",
        title: "Arabic Vocabulary in Action",
        type: "book",
        author: "Dr. V. Abdur Rahim",
        description:
          "Practical vocabulary building with example sentences.",
        isVerified: true,
      },
      {
        id: "res-vocab-2",
        nodeId: "basic-vocabulary",
        title: "Arabic Flashcards (Anki Deck)",
        type: "article",
        url: "https://ankiweb.net/shared/decks/arabic",
        description:
          "Community-vetted spaced repetition decks for Arabic vocabulary.",
        isVerified: true,
      },
    ],
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "Which of the following best describes the Arabic vocabulary learning approach?",
          options: ["Memorize the dictionary", "Learn words in context with example sentences", "Only learn nouns", "Skip to advanced texts"],
          correctIndex: 1,
        },
        {
          question: "What is the most effective long-term retention method mentioned for vocabulary?",
          options: ["Writing words once", "Spaced repetition flashcards", "Reading the dictionary", "Listening without review"],
          correctIndex: 1,
        },
        {
          question: "How many common Arabic words should a beginner aim to learn?",
          options: ["50", "100", "200+", "1000+"],
          correctIndex: 2,
        },
        {
          question: "What makes a word 'everyday vocabulary' in Arabic?",
          options: ["It is from the Quran", "It is commonly used in daily conversation", "It is a long word", "It is a verb only"],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    id: "madinah-book-1",
    roadmapId: ARABIC_ROADMAP_ID,
    title: "Madinah Book 1",
    description:
      "Study Dr. V. Abdur Rahim's Madinah Arabic Reader Book 1. Learn basic grammar: nouns, verbs, sentence structure, and masculine/feminine forms.",
    difficulty: "beginner",
    estimatedHours: 30,
    prerequisites: [{ nodeId: "basic-vocabulary" }],
    position: { x: 250, y: 350 },
    sortOrder: 4,
    stage: 2,
    resources: [
      {
        id: "res-mad1-1",
        nodeId: "madinah-book-1",
        title: "Madinah Arabic Reader Book 1",
        type: "book",
        author: "Dr. V. Abdur Rahim",
        description:
          "The foundational textbook used at the Islamic University of Madinah for teaching Arabic to non-native speakers.",
        isVerified: true,
      },
      {
        id: "res-mad1-2",
        nodeId: "madinah-book-1",
        title: "Madinah Arabic Course (Book 1) by Asif Meherali",
        type: "video",
        url: "https://www.youtube.com/embed/videoseries?list=PL2C51DED07020185B",
        description:
          "Complete 18-lesson video course by Br. Asif Meherali, covering every lesson of Madinah Book 1 from the Islamic University of Madinah.",
        isVerified: true,
      },
    ],
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "Madinah Book 1 primarily teaches which variety of Arabic?",
          options: ["Colloquial Arabic", "Quranic Arabic", "Modern Standard Arabic", "Egyptian Arabic"],
          correctIndex: 2,
        },
        {
          question: "Who authored the Madinah Arabic Reader series?",
          options: ["Ibn Ajurrum", "Dr. V. Abdur Rahim", "Al-Farahidi", "Sibawayh"],
          correctIndex: 1,
        },
        {
          question: "Which of these is a key grammar topic in Madinah Book 1?",
          options: ["Advanced rhetoric", "Masculine and feminine forms", "Poetic meter", "Balaghah"],
          correctIndex: 1,
        },
        {
          question: "Where is the Madinah curriculum originally taught?",
          options: ["Al-Azhar University", "Islamic University of Madinah", "Umm Al-Qura University", "King Saud University"],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    id: "madinah-book-2",
    roadmapId: ARABIC_ROADMAP_ID,
    title: "Madinah Book 2",
    description:
      "Progress to Madinah Arabic Reader Book 2. Study derived verbs, prepositions, possessive structures, and more complex sentences.",
    difficulty: "intermediate",
    estimatedHours: 40,
    prerequisites: [{ nodeId: "madinah-book-1" }],
    position: { x: 250, y: 475 },
    sortOrder: 5,
    stage: 3,
    resources: [
      {
        id: "res-mad2-1",
        nodeId: "madinah-book-2",
        title: "Madinah Arabic Reader Book 2",
        type: "book",
        author: "Dr. V. Abdur Rahim",
        description:
          "Second volume covering advanced sentence structures and verb forms.",
        isVerified: true,
      },
      {
        id: "res-mad2-2",
        nodeId: "madinah-book-2",
        title: "Madinah Arabic Course (Book 2) by Asif Meherali",
        type: "video",
        url: "https://www.youtube.com/embed/videoseries?list=PLBDFADAAC4A9DEDF8",
        description:
          "Complete video course by Br. Asif Meherali covering all lessons of Madinah Book 2 — verb forms, prepositions, and complex sentences.",
        isVerified: true,
      },
    ],
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "Madinah Book 2 introduces which new concept?",
          options: ["The alphabet", "Derived verbs (awzan)", "Noun genders", "Writing practice"],
          correctIndex: 1,
        },
        {
          question: "Prepositions in Arabic are called?",
          options: ["Ism", "Fi'l", "Harf jarr", "Dhamir"],
          correctIndex: 2,
        },
        {
          question: "What does a possessive structure in Arabic typically use?",
          options: ["Idafah construction", "Separate pronouns only", "Prepositional phrases", "Passive voice"],
          correctIndex: 0,
        },
        {
          question: "How does Madinah Book 2 build on Book 1?",
          options: ["It repeats the same material", "It introduces more complex sentence structures", "It focuses only on vocabulary", "It teaches calligraphy"],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    id: "madinah-book-3",
    roadmapId: ARABIC_ROADMAP_ID,
    title: "Madinah Book 3",
    description:
      "Complete Madinah Arabic Reader Book 3. Master complex grammar, rhetorical styles, and classical Arabic structures.",
    difficulty: "intermediate",
    estimatedHours: 50,
    prerequisites: [{ nodeId: "madinah-book-2" }],
    position: { x: 250, y: 600 },
    sortOrder: 6,
    stage: 4,
    resources: [
      {
        id: "res-mad3-1",
        nodeId: "madinah-book-3",
        title: "Madinah Arabic Reader Book 3",
        type: "book",
        author: "Dr. V. Abdur Rahim",
        description:
          "Third volume completing the Madinah series with advanced grammar and rhetoric.",
        isVerified: true,
      },
      {
        id: "res-mad3-2",
        nodeId: "madinah-book-3",
        title: "Madinah Arabic Course (Book 3) by Asif Meherali",
        type: "video",
        url: "https://www.youtube.com/embed/videoseries?list=PL0456AF8AB89FD3CF",
        description:
          "Complete video course by Br. Asif Meherali covering all lessons of Madinah Book 3 — advanced grammar, rhetoric, and classical Arabic structures.",
        isVerified: true,
      },
    ],
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "Madinah Book 3 focuses on which level of Arabic?",
          options: ["Beginner", "Intermediate-Advanced grammar and rhetoric", "Only vocabulary", "Poetry only"],
          correctIndex: 1,
        },
        {
          question: "Rhetorical styles in Arabic are studied under which branch?",
          options: ["Nahw (Grammar)", "Sarf (Morphology)", "Balaghah (Rhetoric)", "Arud (Prosody)"],
          correctIndex: 2,
        },
        {
          question: "Classical Arabic structures in Book 3 include?",
          options: ["Only modern phrases", "Complex sentence analysis and classical texts", "Only Quranic verses", "Only conversational dialogues"],
          correctIndex: 1,
        },
        {
          question: "What is expected of a student completing Madinah Book 3?",
          options: ["Basic reading ability", "Mastery of advanced grammar and ability to read classical texts", "Conversational fluency only", "Memorization of the dictionary"],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    id: "intermediate-arabic",
    roadmapId: ARABIC_ROADMAP_ID,
    title: "Intermediate Arabic Studies",
    description:
      "Advanced study with Arabiyyah Bayna Yadayk and classical texts. Introduction to Al-Ajrumiyyah for Arabic grammar.",
    difficulty: "advanced",
    estimatedHours: 60,
    prerequisites: [{ nodeId: "madinah-book-3" }],
    position: { x: 250, y: 725 },
    sortOrder: 7,
    stage: 5,
    resources: [
      {
        id: "res-inter-1",
        nodeId: "intermediate-arabic",
        title: "Al-Arabiyyah Bayna Yadayk (Parts 1-4)",
        type: "book",
        author: "Dr. Muhammad bin Abdul Rahman Al-Sheikh",
        description:
          "Comprehensive modern Arabic curriculum used in language institutes worldwide.",
        isVerified: true,
      },
      {
        id: "res-inter-2",
        nodeId: "intermediate-arabic",
        title: "Al-Ajrumiyyah",
        type: "book",
        author: "Ibn Ajurrum",
        description:
          "Foundational text on Arabic grammar (nahw). Essential for advanced Arabic study.",
        isVerified: true,
      },
      {
        id: "res-inter-3",
        nodeId: "intermediate-arabic",
        title: "Learn Arabic Grammar to Understand Quran (Language of Quran)",
        type: "video",
        url: "https://www.youtube.com/embed/videoseries?list=PLC2ruw0EUW8BwpE-seNS6i-_zuNq-jFc4",
        description:
          "Comprehensive 34-video course covering advanced Arabic grammar, I'rab, and sentence analysis — ideal after completing Madinah Book 3.",
        isVerified: true,
      },
    ],
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "What is the primary focus of Al-Arabiyyah Bayna Yadayk?",
          options: ["Classical poetry", "Modern Arabic communication skills", "Ancient texts", "Calligraphy"],
          correctIndex: 1,
        },
        {
          question: "Al-Ajrumiyyah is a foundational text in which field?",
          options: ["Tafseer", "Hadith", "Arabic grammar (Nahw)", "Islamic history"],
          correctIndex: 2,
        },
        {
          question: "Who authored Al-Ajrumiyyah?",
          options: ["Dr. V. Abdur Rahim", "Ibn Ajurrum", "Imam Al-Ghazali", "Ibn Kathir"],
          correctIndex: 1,
        },
        {
          question: "What makes this stage 'advanced' compared to earlier stages?",
          options: ["It introduces the alphabet", "It focuses on advanced grammar and classical text analysis", "It only has videos", "It is optional"],
          correctIndex: 1,
        },
      ],
    },
  },
]

const arabicRoadmap: Roadmap = {
  id: ARABIC_ROADMAP_ID,
  slug: "arabic",
  title: "Arabic Language",
  description:
    "Learn Arabic from the alphabet to intermediate proficiency. Follow the renowned Madinah curriculum used at the Islamic University of Madinah.",
  category: "arabic",
  icon: "book-open-text",
  sortOrder: 1,
  nodes,
}

export const roadmaps: Roadmap[] = [arabicRoadmap]

export function getRoadmapBySlug(slug: string): Roadmap | undefined {
  return roadmaps.find((r) => r.slug === slug)
}

export function getNodeById(nodeId: string): RoadmapNode | undefined {
  return nodes.find((n) => n.id === nodeId)
}
