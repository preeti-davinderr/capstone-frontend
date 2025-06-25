// // data/weekData.ts

// export interface WeekInfo {
//     week: number;
//     title: string;
//     size: string;
//     weight: string;
//     visualText: string;
//     footer: string;
//   }
  
//   export const weekData: WeekInfo[] = [
//     {
//       week: 1,
//       title: 'Your Little Watermelon – Week 3',
//       size: '~0.5 mm',
//       weight: 'Less than 1g',
//       visualText: 'Cute\nWatermelon\nVisuals',
//       footer: 'Growing Sweet: 37 Weeks to Go',
//     },
//     {
//       week: 2,
//       title: 'Your Little Watermelon – Week 3',
//       size: '~0.5 mm',
//       weight: 'Less than 1g',
//       visualText: 'Cute\nWatermelon\nVisuals',
//       footer: 'Growing Sweet: 37 Weeks to Go',
//     },
//     {
//       week: 3,
//       title: 'Your Little Watermelon – Week 3',
//       size: '~0.5 mm',
//       weight: 'Less than 1g',
//       visualText: 'Cute\nWatermelon\nVisuals',
//       footer: 'Growing Sweet: 37 Weeks to Go',
//     },
//     {
//       week: 4,
//       title: 'Your Little Watermelon – Week 4',
//       size: '~0.8 mm',
//       weight: 'Less than 1g',
//       visualText: 'Cute\nWatermelon\nVisuals',
//       footer: 'Growing Sweet: 36 Weeks to Go',
//     },
//     {
//       week: 5,
//       title: 'Your Little Watermelon – Week 5',
//       size: '~1.2 mm',
//       weight: 'Less than 1g',
//       visualText: 'Cute\nWatermelon\nVisuals',
//       footer: 'Growing Sweet: 35 Weeks to Go',
//     },
//     {
//       week: 6,
//       title: 'Your Little Watermelon – Week 6',
//       size: '~2.0 mm',
//       weight: 'Less than 1g',
//       visualText: 'Cute\nWatermelon\nVisuals',
//       footer: 'Growing Sweet: 34 Weeks to Go',
//     },
//     {
//       week: 7,
//       title: 'Your Little Watermelon – Week 6',
//       size: '~2.0 mm',
//       weight: 'Less than 1g',
//       visualText: 'Cute\nWatermelon\nVisuals',
//       footer: 'Growing Sweet: 34 Weeks to Go',
//     }
//   ];
  
// data/weekDetails.ts

export interface WeekDetails {
  week: number;
  title: string;
  size: string;
  weight: string;
  visualText: string;
  image: any;
  footer: string;
  description: string;
  developments: string[];
  highlights: {
    title: string;
    subtitle: string;
    icon: string; // Just a placeholder, you can add icon names
  }[];
  articles: {
    title: string;
    subtitle: string;
    readTime: string;
    date: string;
  }[];
}

export const weekData: WeekDetails[] = [
  {
      week: 1,
      title: 'Your Little Watermelon – Week 1',
      size: '~1.2 mm',
      weight: 'Less than 1g',
      visualText: 'Cute\nWatermelon\nVisuals',
      image: require('../assets/development/week (1).webp'),
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops'
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' }
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago'
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago'
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago'
        }
      ]
  },
  {
      week: 2,
      title: 'Your Little Watermelon – Week 2',
      size: '~1.2 mm',
      weight: 'Less than 1g',
      visualText: 'Cute\nWatermelon\nVisuals',
      image: require('../assets/development/week (2).webp'),
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops'
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' }
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago'
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago'
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago'
        }
      ]
  },
  {
      week: 3,
      title: 'Your Little Watermelon – Week 3',
      size: '~1.2 mm',
      weight: 'Less than 1g',
      visualText: 'Cute\nWatermelon\nVisuals',
      image: require('../assets/development/week (3).webp'),
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops'
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' }
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago'
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago'
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago'
        }
      ]
  },
  {
      week: 4,
      title: 'Your Little Watermelon – Week 4',
      size: '~1.2 mm',
      weight: 'Less than 1g',
      visualText: 'Cute\nWatermelon\nVisuals',
      image: require('../assets/development/week (4).webp'),
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops'
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' }
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago'
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago'
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago'
        }
      ]
  },
  {
      week: 5,
      title: 'Your Little Watermelon – Week 5',
      size: '~1.2 mm',
      weight: 'Less than 1g',
      visualText: 'Cute\nWatermelon\nVisuals',
      image: require('../assets/development/week (5).webp'),
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops'
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' }
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago'
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago'
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago'
        }
      ]
  },
  {
      week: 6,
      title: 'Your Little Watermelon – Week 6',
      size: '~1.2 mm',
      weight: 'Less than 1g',
      visualText: 'Cute\nWatermelon\nVisuals',
      image: require('../assets/development/week (6).webp'),
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops'
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' }
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago'
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago'
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago'
        }
      ]
  },
  {
      week: 7,
      title: 'Your Little One - Week 7',
      size: 'Blueberry (~1.3 cm)',
      weight: '~0.8g',
      visualText: 'Week 7',
      image: require('../assets/development/week (7).webp'),
      footer: '33 Weeks to Go',
      description: 'Brain development continues, hands and feet develop ridges, and internal organs form.',
      developments: ['Brain development continues', 'Hands and feet develop ridges', 'Internal organs form'],
      highlights: [],
      articles: []
  },
  {
      week: 8,
      title: 'Your Little One - Week 8',
      size: 'Raspberry (~1.6 cm)',
      weight: '~1g',
      visualText: 'Week 8',
      image: require('../assets/development/week (8).webp'),
      footer: '32 Weeks to Go',
      description: 'Fingers and toes form, eyelids and lips appear, and the tail is nearly gone.',
      developments: ['Fingers and toes form', 'Eyelids and lips appear', 'Tail nearly gone'],
      highlights: [],
      articles: []
  },
  {
      week: 9,
      title: 'Your Little One - Week 9',
      size: 'Grape (~2.3 cm)',
      weight: '~2g',
      visualText: 'Week 9',
      image: require('../assets/development/week (9).webp'),
      footer: '31 Weeks to Go',
      description: 'Eyelids cover the eyes, arms grow longer, and the embryo becomes a fetus.',
      developments: ['Eyelids cover eyes', 'Arms grow longer', 'Embryo becomes a fetus'],
      highlights: [],
      articles: []
  },
  {
      week: 10,
      title: 'Your Little One - Week 10',
      size: 'Kumquat (~3.1 cm)',
      weight: '~4g',
      visualText: 'Week 10',
      image: require('../assets/development/week (10).webp'),
      footer: '30 Weeks to Go',
      description: 'Eyelids fuse, external ears develop, and limbs bend at the joints.',
      developments: ['Eyelids fuse', 'External ears develop', 'Limbs bend at joints'],
      highlights: [],
      articles: []
  },
  {
      week: 11,
      title: 'Your Little One - Week 11',
      size: 'Fig (~4.1 cm)',
      weight: '~7g',
      visualText: 'Week 11',
      image: require('../assets/development/week (11).webp'),
      footer: '29 Weeks to Go',
      description: 'Finger and toe nails appear, bones are hardening, and genitals begin forming.',
      developments: ['Finger and toe nails appear', 'Bones hardening', 'Genitals begin forming'],
      highlights: [],
      articles: []
  },
  {
      week: 12,
      title: 'Your Little One - Week 12',
      size: 'Lime (~5.4 cm)',
      weight: '~14g',
      visualText: 'Week 12',
      image: require('../assets/development/week (12).webp'),
      footer: '28 Weeks to Go',
      description: 'Reflexes are active, the digestive system begins working, and hormones start flowing.',
      developments: ['Reflexes active', 'Digestive system begins working', 'Hormones start flowing'],
      highlights: [],
      articles: []
  },
  {
      week: 13,
      title: 'Your Little One - Week 13',
      size: 'Pea pod (~7.4 cm)',
      weight: '~23g',
      visualText: 'Week 13',
      image: require('../assets/development/week (13).webp'),
      footer: '27 Weeks to Go',
      description: 'Vocal cords form, ribs are visible, and the intestines are functional.',
      developments: ['Vocal cords form', 'Ribs visible', 'Intestines functional'],
      highlights: [],
      articles: []
  },
  {
      week: 14,
      title: 'Your Little One - Week 14',
      size: 'Lemon (~8.7 cm)',
      weight: '~43g',
      visualText: 'Week 14',
      image: require('../assets/development/week (14).webp'),
      footer: '26 Weeks to Go',
      description: 'Genitals are visible, facial expressions form, and lanugo starts growing.',
      developments: ['Genitals visible', 'Facial expressions form', 'Lanugo starts growing'],
      highlights: [],
      articles: []
  },
  {
      week: 15,
      title: 'Your Little One - Week 15',
      size: 'Apple (~10.1 cm)',
      weight: '~70g',
      visualText: 'Week 15',
      image: require('../assets/development/week (15).webp'),
      footer: '25 Weeks to Go',
      description: 'Bones lengthen, the baby can move its limbs, and skin begins forming.',
      developments: ['Bones lengthen', 'Baby can move limbs', 'Skin begins forming'],
      highlights: [],
      articles: []
  },
  {
      week: 16,
      title: 'Your Little One - Week 16',
      size: 'Avocado (~11.6 cm)',
      weight: '~100g',
      visualText: 'Week 16',
      image: require('../assets/development/week (16).webp'),
      footer: '24 Weeks to Go',
      description: 'The head straightens, eyes move, and fingernails are fully grown.',
      developments: ['Head straightens', 'Eyes move', 'Fingernails fully grow'],
      highlights: [],
      articles: []
  },
  {
      week: 17,
      title: 'Your Little One - Week 17',
      size: 'Turnip (~13 cm)',
      weight: '~140g',
      visualText: 'Week 17',
      image: require('../assets/development/week (17).webp'),
      footer: '23 Weeks to Go',
      description: 'Sweat glands form, the heartbeat is stronger, and cartilage hardens into bone.',
      developments: ['Sweat glands form', 'Heartbeat stronger', 'Cartilage hardens into bone'],
      highlights: [],
      articles: []
  },
  {
      week: 18,
      title: 'Your Little One - Week 18',
      size: 'Bell pepper (~14.2 cm)',
      weight: '~190g',
      visualText: 'Week 18',
      image: require('../assets/development/week (18).webp'),
      footer: '22 Weeks to Go',
      description: 'Ears stick out, eyes are sensitive to light, and the uterus forms (if it is a girl).',
      developments: ['Ears stick out', 'Eyes sensitive to light', 'Uterus forms (if girl)'],
      highlights: [],
      articles: []
  },
  {
      week: 19,
      title: 'Your Little One - Week 19',
      size: 'Mango (~15.3 cm)',
      weight: '~240g',
      visualText: 'Week 19',
      image: require('../assets/development/week (19).webp'),
      footer: '21 Weeks to Go',
      description: 'The skin develops layers, arms and legs are in proportion, and the baby swallows amniotic fluid.',
      developments: ['Skin develops layers', 'Arms/legs in proportion', 'Baby swallows amniotic fluid'],
      highlights: [],
      articles: []
  },
  {
      week: 20,
      title: 'Your Little One - Week 20',
      size: 'Banana (~16.4 cm)',
      weight: '~300g',
      visualText: 'Week 20',
      image: require('../assets/development/week (20).webp'),
      footer: '20 Weeks to Go',
      description: 'Eyebrows and hair form, sex is identifiable by ultrasound, and the heartbeat is audible with a stethoscope.',
      developments: ['Eyebrows and hair form', 'Sex identifiable by ultrasound', 'Heartbeat audible with stethoscope'],
      highlights: [],
      articles: []
  },
  {
      week: 21,
      title: 'Your Little One - Week 21',
      size: 'Carrot (~26.7 cm)',
      weight: '~360g',
      visualText: 'Week 21',
      image: require('../assets/development/week (21).webp'),
      footer: '19 Weeks to Go',
      description: 'Bone marrow is making blood, kicks are stronger, and the skin is translucent.',
      developments: ['Bone marrow making blood', 'Kicks stronger', 'Skin translucent'],
      highlights: [],
      articles: []
  },
  {
      week: 22,
      title: 'Your Little One - Week 22',
      size: 'Spaghetti squash (~27.8 cm)',
      weight: '~430g',
      visualText: 'Week 22',
      image: require('../assets/development/week (22).webp'),
      footer: '18 Weeks to Go',
      description: 'The sense of taste develops, hair is more visible, and the pancreas starts producing hormones.',
      developments: ['Taste sense develops', 'Hair more visible', 'Pancreas starts producing hormones'],
      highlights: [],
      articles: []
  },
  {
      week: 23,
      title: 'Your Little One - Week 23',
      size: 'Large mango (~28.9 cm)',
      weight: '~500g',
      visualText: 'Week 23',
      image: require('../assets/development/week (23).webp'),
      footer: '17 Weeks to Go',
      description: 'Lungs form blood vessels, fat starts depositing, and hearing is more developed.',
      developments: ['Lungs form blood vessels', 'Fat starts depositing', 'Hearing more developed'],
      highlights: [],
      articles: []
  },
  {
      week: 24,
      title: 'Your Little One - Week 24',
      size: 'Corn cob (~30 cm)',
      weight: '~600g',
      visualText: 'Week 24',
      image: require('../assets/development/week (24).webp'),
      footer: '16 Weeks to Go',
      description: 'Lung surfactant starts forming, the skin is pink and wrinkled, and the face is well-defined.',
      developments: ['Lung surfactant starts forming', 'Skin pink and wrinkled', 'Face well-defined'],
      highlights: [],
      articles: []
  },
  {
      week: 25,
      title: 'Your Little One - Week 25',
      size: 'Rutabaga (~34.6 cm)',
      weight: '~660g',
      visualText: 'Week 25',
      image: require('../assets/development/week (25).webp'),
      footer: '15 Weeks to Go',
      description: 'Hair thickens, the spine forms 33 vertebrae, and the hands have a grasp reflex.',
      developments: ['Hair thickens', 'Spine forms 33 vertebrae', 'Hands grasp reflex'],
      highlights: [],
      articles: []
  },
  {
      week: 26,
      title: 'Your Little One - Week 26',
      size: 'Zucchini (~35.6 cm)',
      weight: '~760g',
      visualText: 'Week 26',
      image: require('../assets/development/week (26).webp'),
      footer: '14 Weeks to Go',
      description: 'Eyes open, breathing practice starts, and fingerprints are clearly visible.',
      developments: ['Eyes open', 'Breathing practice starts', 'Fingerprints clearly visible'],
      highlights: [],
      articles: []
  },
  {
      week: 27,
      title: 'Your Little One - Week 27',
      size: 'Cauliflower (~36.6 cm)',
      weight: '~875g',
      visualText: 'Week 27',
      image: require('../assets/development/week (27).webp'),
      footer: '13 Weeks to Go',
      description: 'The nervous system matures, muscle tone improves, and brain tissue is expanding.',
      developments: ['Nervous system matures', 'Muscle tone improves', 'Brain tissue expanding'],
      highlights: [],
      articles: []
  },
  {
      week: 28,
      title: 'Your Little One - Week 28',
      size: 'Eggplant (~37.6 cm)',
      weight: '~1 kg',
      visualText: 'Week 28',
      image: require('../assets/development/week (28).webp'),
      footer: '12 Weeks to Go',
      description: 'The brain develops grooves, eyes move, and the baby practices breathing.',
      developments: ['Brain develops grooves', 'Eyes move', 'Baby practices breathing'],
      highlights: [],
      articles: []
  },
  {
      week: 29,
      title: 'Your Little One - Week 29',
      size: 'Butternut squash (~38.6 cm)',
      weight: '~1.2 kg',
      visualText: 'Week 29',
      image: require('../assets/development/week (29).webp'),
      footer: '11 Weeks to Go',
      description: 'Muscles tone up, the baby stretches and kicks often, and the senses sharpen.',
      developments: ['Muscles tone up', 'Baby stretches/kicks often', 'Senses sharpen'],
      highlights: [],
      articles: []
  },
  {
      week: 30,
      title: 'Your Little One - Week 30',
      size: 'Cabbage (~39.9 cm)',
      weight: '~1.3 kg',
      visualText: 'Week 30',
      image: require('../assets/development/week (30).webp'),
      footer: '10 Weeks to Go',
      description: 'Eyesight is improving, red blood cell production is in the bone marrow, and the skin is smoother.',
      developments: ['Eyesight improving', 'Red blood cell production in bone marrow', 'Skin smoother'],
      highlights: [],
      articles: []
  },
  {
      week: 31,
      title: 'Your Little One - Week 31',
      size: 'Coconut (~41.1 cm)',
      weight: '~1.5 kg',
      visualText: 'Week 31',
      image: require('../assets/development/week (31).webp'),
      footer: '9 Weeks to Go',
      description: 'The nervous system is fully functional, the bladder fills regularly, and the baby is aware of sounds.',
      developments: ['Nervous system fully functional', 'Bladder fills regularly', 'Baby aware of sounds'],
      highlights: [],
      articles: []
  },
  {
      week: 32,
      title: 'Your Little One - Week 32',
      size: 'Jicama (~42.4 cm)',
      weight: '~1.7 kg',
      visualText: 'Week 32',
      image: require('../assets/development/week (32).webp'),
      footer: '8 Weeks to Go',
      description: 'A breathing rhythm is established, toenails are complete, and the bones are soft.',
      developments: ['Breathing rhythm established', 'Toenails complete', 'Soft bones'],
      highlights: [],
      articles: []
  },
  {
      week: 33,
      title: 'Your Little One - Week 33',
      size: 'Pineapple (~43.7 cm)',
      weight: '~1.9 kg',
      visualText: 'Week 33',
      image: require('../assets/development/week (33).webp'),
      footer: '7 Weeks to Go',
      description: 'Skull bones are soft, pupils dilate, and the baby can detect light and dark.',
      developments: ['Skull bones soft', 'Pupils dilate', 'Baby detects light/dark'],
      highlights: [],
      articles: []
  },
  {
      week: 34,
      title: 'Your Little One - Week 34',
      size: 'Cantaloupe (~45 cm)',
      weight: '~2.1 kg',
      visualText: 'Week 34',
      image: require('../assets/development/week (34).webp'),
      footer: '6 Weeks to Go',
      description: 'The central nervous system matures, eyes are open during wake time, and the baby hiccups often.',
      developments: ['Central nervous system matures', 'Eyes open during wake time', 'Baby hiccups often'],
      highlights: [],
      articles: []
  },
  {
      week: 35,
      title: 'Your Little One - Week 35',
      size: 'Honeydew melon (~46.2 cm)',
      weight: '~2.4 kg',
      visualText: 'Week 35',
      image: require('../assets/development/week (35).webp'),
      footer: '5 Weeks to Go',
      description: 'Lanugo is mostly gone, organs are maturing, and movements are strong.',
      developments: ['Lanugo mostly gone', 'Organs maturing', 'Strong movements'],
      highlights: [],
      articles: []
  },
  {
      week: 36,
      title: 'Your Little One - Week 36',
      size: 'Romaine lettuce (~47.4 cm)',
      weight: '~2.6 kg',
      visualText: 'Week 36',
      image: require('../assets/development/week (36).webp'),
      footer: '4 Weeks to Go',
      description: 'The baby is gaining fat, the digestive system is ready, and the bones are soft but firm.',
      developments: ['Baby gaining fat', 'Digestive system ready', 'Bones soft but firm'],
      highlights: [],
      articles: []
  },
  {
      week: 37,
      title: 'Your Little One - Week 37',
      size: 'Swiss chard (~48.6 cm)',
      weight: '~2.9 kg',
      visualText: 'Week 37',
      image: require('../assets/development/week (37).webp'),
      footer: '3 Weeks to Go',
      description: 'The baby is full-term, the lungs are fully mature, and there is a strong grasp reflex.',
      developments: ['Baby full-term', 'Lungs fully mature', 'Strong grasp reflex'],
      highlights: [],
      articles: []
  },
  {
      week: 38,
      title: 'Your Little One - Week 38',
      size: 'Leek (~49.8 cm)',
      weight: '~3.1 kg',
      visualText: 'Week 38',
      image: require('../assets/development/week (38).webp'),
      footer: '2 Weeks to Go',
      description: 'The skin is smooth, the body is plump, and the vernix thickens.',
      developments: ['Skin smooth', 'Body plump', 'Vernix thickens'],
      highlights: [],
      articles: []
  },
  {
      week: 39,
      title: 'Your Little One - Week 39',
      size: 'Mini watermelon (~50.7 cm)',
      weight: '~3.3 kg',
      visualText: 'Week 39',
      image: require('../assets/development/week (39).webp'),
      footer: '1 Week to Go',
      description: 'The organs are complete, and the baby is practicing breathing and gripping.',
      developments: ['Organs complete', 'Baby practicing breathing and gripping'],
      highlights: [],
      articles: []
  },
  {
      week: 40,
      title: 'Your Little One - Week 40',
      size: 'Small pumpkin (~51.2 cm)',
      weight: '~3.5–4 kg',
      visualText: 'Week 40',
      image: require('../assets/development/week (40).webp'),
      footer: 'Ready for Birth',
      description: 'Fully developed, with strong reflexes, and ready for birth.',
      developments: ['Fully developed', 'Strong reflexes', 'Ready for birth'],
      highlights: [],
      articles: []
  }
];
