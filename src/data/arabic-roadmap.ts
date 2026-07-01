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
        title: "Arabic Alphabet Series",
        type: "video",
        url: "https://www.youtube.com/playlist?list=PL6TlMIZ5ylgpZidZPTHbJfBZME0Wv0R-n",
        description:
          "Comprehensive video series covering each letter's pronunciation and writing.",
        isVerified: true,
      },
    ],
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
        title: "Read & Practice Arabic",
        type: "video",
        url: "https://www.youtube.com/playlist?list=PLLB2D2kF7TGpF9rCzI0JtW8K9mN0dKzLQ",
        description:
          "Guided reading practice sessions for beginners.",
        isVerified: true,
      },
    ],
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
        title: "Madinah Arabic Course (Book 1)",
        type: "video",
        url: "https://www.youtube.com/playlist?list=PL6TlMIZ5ylgoS5UOZ5s9s9Xz9Yz9X9z9X",
        description:
          "Complete video lectures covering every lesson in Madinah Book 1.",
        isVerified: true,
      },
    ],
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
        title: "Madinah Arabic Course (Book 2)",
        type: "video",
        url: "https://www.youtube.com/playlist?list=PL6TlMIZ5ylgqY6Y6Y6Y6Y6Y6Y6Y6Y6Y6Y6Y",
        description:
          "Step-by-step video explanations for Madinah Book 2.",
        isVerified: true,
      },
    ],
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
        title: "Madinah Arabic Course (Book 3)",
        type: "video",
        url: "https://www.youtube.com/playlist?list=PL6TlMIZ5ylgrRrRrRrRrRrRrRrRrRrRrRrR",
        description:
          "Complete video lectures for Madinah Book 3.",
        isVerified: true,
      },
    ],
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
        title: "Intermediate Arabic Grammar",
        type: "video",
        url: "https://www.youtube.com/playlist?list=PL6TlMIZ5ylgvVvVvVvVvVvVvVvVvVvVvVvV",
        description:
          "Advanced grammar explanations for intermediate learners.",
        isVerified: true,
      },
    ],
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
