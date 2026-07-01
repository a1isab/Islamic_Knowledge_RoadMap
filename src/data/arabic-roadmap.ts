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
        id: "guide-alphabet-1",
        nodeId: "arabic-alphabet",
        title: "Study Guide: Master the Arabic Alphabet",
        type: "guide",
        isVerified: true,
        content: `## Learning Objectives
By the end of this stage, you should be able to:
- Recognize and name all 28 Arabic letters in their isolated form
- Pronounce each letter correctly from its point of articulation (makhraj)
- Identify letters in their initial, medial, and final forms
- Write each letter correctly in all positional forms

## What to Study

### 1. Letter Names & Shapes
Learn the 28 letters in order: **Alif** (ا), **Baa** (ب), **Taa** (ت), **Thaa** (ث), **Jeem** (ج), **Haa** (ح), **Khaa** (خ), **Daal** (د), **Dhaal** (ذ), **Raa** (ر), **Zaay** (ز), **Seen** (س), **Sheen** (ش), **Saad** (ص), **Daad** (ض), **Taa** (ط), **Zaa** (ظ), **Ayn** (ع), **Ghayn** (غ), **Faa** (ف), **Qaaf** (ق), **Kaaf** (ك), **Laam** (ل), **Meem** (م), **Noon** (ن), **Haa** (ه), **Waaw** (و), **Yaa** (ي).

### 2. Points of Articulation (Makharij)
Letters originate from five main areas: **throat**, **tongue**, **lips**, **nasal passage**, and **chest cavity**. Pay special attention to:
- **Heavy letters** (Tafkheem): ص، ض، ط، ظ، ق، غ، خ
- **Unique Arabic sounds**: ع، ح، ط، ص، ض، ظ، غ، خ، ث، ذ

### 3. Letter Forms by Position
Each letter has up to four forms depending on position in a word:
- **Isolated** (standalone)
- **Initial** (connected from right only)
- **Medial** (connected from both sides)
- **Final** (connected from left only)

Memorize the six **non-connecting letters**: ا، د، ذ، ر، ز، و — these only connect from the right.

## How to Practice
- **Daily writing**: Write the alphabet in isolated form, then practice connecting letters into words
- **Flashcard drills**: Use Anki or paper flashcards for random letter recognition
- **Pronunciation recording**: Record yourself and compare with native pronunciation
- **Noorani Qaida**: Work through Lessons 1-3 which systematically introduce each letter

## Recommended Books
- **Noorani Qaida** — the traditional primer used worldwide for centuries
- **Arabic Alphabet Chart** — shows all forms of each letter side by side

## Milestone
You have mastered this stage when you can:
- Recognize any Arabic letter instantly in any position
- Pronounce all 28 letters with correct makhraj
- Write each letter in its correct positional form
- Read simple 2-3 letter combinations aloud`,
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
        id: "guide-reading-1",
        nodeId: "basic-reading",
        title: "Study Guide: Basic Reading & Tajweed",
        type: "guide",
        isVerified: true,
        content: `## Learning Objectives
By the end of this stage, you should be able to:
- Read Arabic words fluently with proper vowel sounds
- Understand and apply sukoon (absence of vowel), shaddah (doubling), and madd (elongation)
- Recite short phrases with basic tajweed rules

## What to Study

### 1. Short Vowels (Harakat)
Start by mastering the three short vowels:
- **Fatha** (ــَـ) — "a" sound as in *cat*
- **Kasra** (ــِـ) — "i" sound as in *sit*
- **Damma** (ــُـ) — "u" sound as in *put*

### 2. Noon Saakinah & Tanween
Learn the nasalization rules for noon saakinah and double vowels:
- Tanween with fatha (ــًـ)
- Tanween with kasra (ــٍـ)
- Tanween with damma (ــٌـ)

### 3. Sukoon
Understand the absence of a vowel (ــْـ) and how it affects pronunciation when a consonant without a vowel follows a voweled letter.

### 4. Shaddah (Tashdeed)
Master the doubling of a consonant — the letter with shaddah (ــّـ) is pronounced with emphasis, held longer than a single letter.

### 5. Madd (Elongation)
Study the long vowel letters and their elongation rules:
- **Alif maddiyyah** (ا) — elongates fatha
- **Waaw maddiyyah** (و) — elongates damma
- **Yaa maddiyyah** (ي) — elongates kasra

## How to Practice
- **Read aloud daily**: Practice from the Quran or any Arabic text for 15-20 minutes
- **Tajweed drills**: Work through Qaidah Nooraniyyah lessons focusing on one rule at a time
- **Audio comparison**: Listen to a reciter and mimic their pronunciation
- **Write & read**: Write Arabic words, then read them back applying the rules

## Recommended Books
- **Qaidah Nooraniyyah** by Shaykh Noor Muhammad Haqqani — the complete guide to reading with tajweed principles

## Milestone
You have mastered this stage when you can:
- Read unfamiliar Arabic words aloud applying vowel rules correctly
- Identify and apply sukoon, shaddah, and madd in any word
- Recite short Quranic phrases (2-3 words) with basic tajweed`,
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
        id: "guide-vocab-1",
        nodeId: "basic-vocabulary",
        title: "Study Guide: Building Arabic Vocabulary",
        type: "guide",
        isVerified: true,
        content: `## Learning Objectives
By the end of this stage, you should be able to:
- Recognize and use 200+ common Arabic words in context
- Understand basic vocabulary categories: colors, numbers, family, body parts, household items, everyday phrases
- Form simple sentences using your vocabulary

## What to Study

### 1. Core Vocabulary Categories
Focus on learning words in thematic groups:
- **Colors**: أحمر (red), أزرق (blue), أصفر (yellow), أخضر (green), أبيض (white), أسود (black)
- **Numbers 1-20**: واحد (1), اثنان (2), ثلاثة (3), أربعة (4), خمسة (5), etc.
- **Family**: أب (father), أم (mother), أخ (brother), أخت (sister), ابن (son), بنت (daughter)
- **Body Parts**: رأس (head), يد (hand), عين (eye), قلب (heart), فم (mouth)
- **Household**: باب (door), نافذة (window), كتاب (book), قلم (pen), كرسي (chair)
- **Everyday Phrases**: كيف حالك؟ (How are you?), الحمد لله (Praise be to God), جزاك الله خيراً (May Allah reward you)

### 2. Vocabulary Learning Method
- **Learn words in sentences**, not in isolation — context is essential for retention
- **Study frequently used words** — focus on words that appear commonly in Quran and daily speech
- **Use spaced repetition** — review words at increasing intervals for long-term memory

## How to Practice
- **Anki flashcards**: Download community decks or create your own for spaced repetition
- **Label your environment**: Place Arabic labels on objects in your home
- **Daily journal**: Write 3-5 simple sentences daily using new vocabulary
- **Word lists**: Create themed word lists and review them weekly

## Recommended Books
- **Arabic Vocabulary in Action** by Dr. V. Abdur Rahim — practical vocabulary with example sentences
- **Anki Decks** — community-vetted spaced repetition decks for Arabic (ankiweb.net)

## Milestone
You have mastered this stage when you can:
- Recognize 200+ Arabic words without translation
- Use each word correctly in a simple sentence
- Understand common greetings and everyday phrases`,
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
        id: "guide-mad1-1",
        nodeId: "madinah-book-1",
        title: "Study Guide: Madinah Book 1",
        type: "guide",
        isVerified: true,
        content: `## Learning Objectives
By the end of this book, you should be able to:
- Understand and construct nominal sentences (jumlah ismiyyah)
- Distinguish between masculine and feminine nouns and adjectives
- Use prepositions, possessive constructions (idafah), and demonstrative pronouns
- Conjugate basic past tense verbs
- Read and understand simple Arabic texts

## What to Study

### Lessons 1-3: Pointing Words & Definiteness
- **هذا** (this — masc.), **هذه** (this — fem.), **ذلك** (that — masc.), **تلك** (that — fem.)
- The definite article **ال** (Al-)
- Asking questions with **ما** (what) and **من** (who)

### Lessons 4-6: Prepositions & Possession
- Common prepositions: **في** (in), **على** (on), **إلى** (to), **مِن** (from), **عن** (about), **مع** (with)
- **Idafah construction** (possessive): كتابُ الولدِ (the boy's book)
- **Feminine marker**: التاء المربوطة (ـة)

### Lessons 7-10: Adjectives & Pronouns
- **Na'at-Man'ut** (adjective-noun agreement in gender, case, and definiteness)
- **Personal pronouns**: أنا، نحن، أنتَ، أنتِ، هو، هي، هم

### Lessons 11-14: Plurals & Duals
- Sound masculine plural (ـون، ـين)
- Sound feminine plural (ـات)
- Broken plurals (irregular)
- Dual form (ـان، ـين)

### Lessons 15-18: Past Tense & Numbers
- Past tense verb conjugation (فعل ماضي)
- Numbers 1-10 and their grammatical rules
- Diptotes (الممنوع من الصرف)

## How to Practice
- **Complete all exercises** at the end of each lesson — they are essential for mastery
- **Use the English Key** alongside the Arabic text to check your understanding
- **Write sentences**: For each lesson, write 5 original sentences using the new grammar
- **Read aloud**: Practice reading the lesson texts multiple times

## Recommended Books
- **Madinah Arabic Reader Book 1** by Dr. V. Abdur Rahim
- **English Key** for Book 1 — available alongside the textbook
- **Handouts and Solutions** from the LQToronto website

## Milestone
You have mastered this stage when you can:
- Read and fully understand any lesson text from Book 1 without translation
- Construct correct nominal sentences with proper gender agreement
- Apply idafah construction correctly
- Conjugate past tense verbs for all pronouns`,
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
        id: "guide-mad2-1",
        nodeId: "madinah-book-2",
        title: "Study Guide: Madinah Book 2",
        type: "guide",
        isVerified: true,
        content: `## Learning Objectives
By the end of this book, you should be able to:
- Understand and use **inna and its sisters** (إنَّ، لَعَلَّ، كَأَنَّ، لَكِنَّ، لَيْتَ)
- Conjugate present tense verbs (فعل مضارع) and command verbs (فعل أمر)
- Use **kaana and its sisters** (كان، أصبح، ظلّ، ليس)
- Understand the **idafah** construction in depth
- Master numbers 11-100 and their grammatical rules
- Identify and conjugate **weak verbs** (الأفعال المعتلة)

## What to Study

### Inna & Its Sisters
Learn how **إنَّ** (indeed), **لَعَلَّ** (perhaps), **كَأَنَّ** (as if), **لَكِنَّ** (but), and **لَيْتَ** (if only) affect the case of the subject and predicate.

### Kaana & Its Sisters
Understand how **كان** (was), **أصبح** (became), **ظلَّ** (remained), **ليس** (is not), and similar verbs reverse the case of the mubtada and khabar.

### Present Tense Verbs
- Conjugation of **فعل مضارع** for all pronouns
- The moods of the present tense: **رفع** (indicative), **نصب** (subjunctive), **جزم** (jussive)
- Particles that affect the present tense: **لن** (will not), **لم** (did not), **لا الناهية** (prohibition)

### Command Verbs & Prohibition
- Forming **فعل أمر** (imperative) from the present tense
- Using **لا الناهية** for prohibition

### Weak Verbs
- Introduction to **الأجوف** (hollow verbs — middle letter is و or ي)
- Introduction to **الناقص** (defective verbs — final letter is و or ي)

### Numbers 11-100
- Grammatical rules for numbers 11-19, 20-99, and 100
- Gender agreement rules for numbers

## How to Practice
- **Complete every exercise** — Book 2 exercises are designed to reinforce each concept
- **Verb conjugation drills**: Create conjugation tables for each new verb pattern
- **Sentence translation**: Practice translating sentences from English to Arabic
- **Read Quranic verses**: Apply your grammar knowledge to analyze simple Quranic phrases

## Recommended Books
- **Madinah Arabic Reader Book 2** by Dr. V. Abdur Rahim
- **English Key** for Book 2
- **Handouts and Grammar Notes** (available from LQToronto resources)

## Milestone
You have mastered this stage when you can:
- Recognize and explain the function of inna/kaana and their sisters
- Conjugate past, present, and command verbs for any pronoun
- Identify weak verb patterns
- Construct complex sentences using multiple grammatical structures`,
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
        id: "guide-mad3-1",
        nodeId: "madinah-book-3",
        title: "Study Guide: Madinah Book 3",
        type: "guide",
        isVerified: true,
        content: `## Learning Objectives
By the end of this book, you should be able to:
- Perform complete grammatical analysis (i'rab) of Arabic sentences
- Understand passive voice verbs and their conjugation
- Identify and analyze derived verb forms (أوزان)
- Distinguish between transitive and intransitive verbs
- Read and analyze classical Arabic texts with confidence

## What to Study

### Derived Verb Forms (أوزان الفعل المجرد والمزيد)
Master the meanings and patterns of the common derived forms:
- **Form I**: فَعَلَ (base meaning)
- **Form II**: فَعَّلَ (intensification/causative)
- **Form III**: فَاعَلَ (participation/reciprocity)
- **Form IV**: أَفْعَلَ (causative)
- **Form V**: تَفَعَّلَ (reflexive of Form II)
- **Form VI**: تَفَاعَلَ (reflexive of Form III)
- **Form VII**: اِنْفَعَلَ (passive/reflexive)
- **Form VIII**: اِفْتَعَلَ (reflexive/reciprocal)
- **Form IX**: اِفْعَلَّ (colors/physical defects)
- **Form X**: اِسْتَفْعَلَ (asking/considering)

### Passive Voice (الفعل المبني للمجهول)
- How passive is formed in past and present tense
- The change in vowel patterns: past tense (ضُرِبَ vs. ضَرَبَ)
- The agent is dropped and replaced by a substitute subject (نائب فاعل)

### Transitive & Intransitive Verbs
- **الفعل المتعدي** (transitive) — needs an object
- **الفعل اللازم** (intransitive) — does not need an object
- How to make intransitive verbs transitive through derived forms

### Verbs of Wonder & Praise
- **أفعل به** (what a wonderful...) — verb of wonder
- **نعم وبئس** (how excellent/how terrible) — verbs of praise and blame
- **حسب/kafa** (sufficed)

### Full Grammatical Analysis (إعراب)
- Learn the systematic approach to parsing every word in a sentence
- Identify grammatical cases and their markers (original vs. subsidiary)
- Recognize the 9 categories of words that are **ممنوع من الصرف** (diptotes)

## How to Practice
- **Parse daily**: Take 2-3 sentences from the Quran or classical texts and write full i'rab
- **Verb form drills**: Create conjugation tables for each of the 10 derived forms
- **Translate classical passages**: Apply your skills to passages from Quran and Hadith
- **Summarize the rules**: Write your own condensed grammar notes for each topic

## Recommended Books
- **Madinah Arabic Reader Book 3** by Dr. V. Abdur Rahim
- **English Key** for Book 3
- **Arabic Grammar (Wright)** — for advanced reference

## Milestone
You have mastered this stage when you can:
- Analyze any sentence from Madinah Book 3 with full i'rab
- Recognize and explain the meaning of all 10 derived verb forms
- Distinguish between active and passive voice confidently
- Read and comprehend classical Arabic passages`,
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
        id: "guide-intermediate-1",
        nodeId: "intermediate-arabic",
        title: "Study Guide: Intermediate Arabic Studies",
        type: "guide",
        isVerified: true,
        content: `## Learning Objectives
By the end of this stage, you should be able to:
- Engage in intermediate-level Arabic conversation (Al-Arabiyyah Bayna Yadayk approach)
- Master Al-Ajrumiyyah — the foundational text of Arabic grammar
- Perform thorough i'rab analysis of classical Arabic sentences
- Understand and apply all major grammar rules systematically
- Read intermediate Arabic texts with minimal reliance on translation

## What to Study

### Part 1: Al-Arabiyyah Bayna Yadayk (Books 1-4)
This series focuses on **conversational Arabic** through immersive, graded lessons. Each unit builds listening, speaking, reading, and writing skills.

**Key areas:**
- **Listening & speaking**: Daily dialogues covering real-life situations
- **Reading comprehension**: Graded passages with controlled vocabulary
- **Writing**: Sentence construction progressing to paragraph writing
- **Vocabulary**: Systematic introduction of high-frequency words in context

**How to approach:**
- Work through each unit sequentially — the series is designed to be self-contained
- Practice dialogues aloud with a partner or by shadowing audio recordings
- Complete all exercises in the workbook
- Aim to finish at least Books 1 and 2 for solid intermediate proficiency

### Part 2: Al-Ajrumiyyah (متن الآجرومية)
This concise text by **Ibn Ajurrum** covers the entire science of Arabic grammar and is traditionally the first grammar text memorized by students.

**Key chapters to master:**
1. **الكلام** (Speech) — definition and types of Arabic speech
2. **الإعراب** (Grammatical Analysis) — signs of rafa, nasb, khafd, and jazm
3. **Marfaat** (Nominatives) — the 7 categories of words in the nominative case
4. **Nawaasikh** (Abrogators of the nominal sentence) — inna, kaana, and their sisters
5. **Mansubaat** (Accusatives) — all words that take the accusative case
6. **Makhfudhaat** (Genitives) — words in the genitive case

**How to study Al-Ajrumiyyah:**
- **Memorize the text** word-for-word (it's only a few pages)
- Study a reliable explanation (sharh) alongside the text
- Apply each rule to Quranic verses for practice
- Test yourself by analyzing sentences from the Quran

### Part 3: Integration
- Read short hadith texts and produce full i'rab analysis
- Practice translating Arabic sentences into English and vice versa
- Build a personal grammar reference notebook

## Recommended Books
- **Al-Arabiyyah Bayna Yadayk (Books 1-4)** by Dr. Abdurrahman Al-Fawzan et al.
- **Al-Ajrumiyyah** by Ibn Ajurrum (the classical grammar primer)
- **A Sharh (Explanation) of Al-Ajrumiyyah** — any reliable commentary

## Milestone
You have mastered this stage when you can:
- Hold a basic conversation on everyday topics in Arabic
- Recite Al-Ajrumiyyah from memory and explain each chapter
- Perform full i'rab on a sentence from the Quran or Hadith
- Read intermediate Arabic texts with comprehension
- Explain the key grammar rules of any sentence you encounter`,
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
