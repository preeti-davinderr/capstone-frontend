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
import { COLORS } from "../styles/globalStyles";

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
    icon: string;
    iconColor?: string;
    bgColor?: string;
  }[];
  articles: {
    title: string;
    subtitle: string;
    readTime: string;
    date: string;
    url: string;
  }[];
}

// Helper function to get trimester-specific articles
const getTrimesterArticles = (week: number) => {
  if (week <= 13) {
    // First Trimester (Weeks 1-13)
    return [
      {
        title: 'Your Guide to a Healthy Pregnancy',
        subtitle: 'Comprehensive information on prenatal care and lifestyle choices',
        readTime: '8 min read',
        date: '2 hours ago',
        url: 'https://www.canada.ca/en/public-health/services/health-promotion/healthy-pregnancy/healthy-pregnancy-guide.html'
      },
      {
        title: 'Oral Health and Pregnancy',
        subtitle: 'The significance of maintaining oral hygiene during pregnancy',
        readTime: '5 min read',
        date: '1 day ago',
        url: 'https://www.canada.ca/en/public-health/services/pregnancy/oral-health-pregnancy.html'
      },
      {
        title: 'Folic Acid & Neural Tube Defects',
        subtitle: 'The role of folic acid in preventing neural tube defects',
        readTime: '6 min read',
        date: '2 days ago',
        url: 'https://www.canada.ca/en/public-health/services/pregnancy/folic-acid.html'
      }
    ];
  } else if (week <= 27) {
    // Second Trimester (Weeks 14-27)
    return [
      {
        title: 'Healthy Eating When Pregnant & Breastfeeding',
        subtitle: 'Guidance on dietary choices and nutritional requirements',
        readTime: '9 min read',
        date: '3 hours ago',
        url: 'https://food-guide.canada.ca/en/tips-for-healthy-eating/pregnant-breastfeeding/'
      },
      {
        title: 'Family-Centred Maternity & Newborn Care',
        subtitle: 'National Guidelines for prenatal care and practices',
        readTime: '10 min read',
        date: '1 day ago',
        url: 'https://www.canada.ca/en/public-health/services/maternity-newborn-care-guidelines.html'
      },
      {
        title: 'Healthy Weight Gain During Pregnancy',
        subtitle: 'PDF guide on recommended weight gain ranges',
        readTime: '6 min read',
        date: '2 days ago',
        url: 'https://www.canada.ca/content/dam/hc-sc/migration/hc-sc/fn-an/alt_formats/pdf/nutrition/prenatal/hwgdp-ppspg-eng.pdf'
      }
    ];
  } else {
    // Third Trimester (Weeks 28-40)
    return [
      {
        title: 'Immunization in Pregnancy & Breastfeeding',
        subtitle: 'Safety and importance of vaccines during pregnancy',
        readTime: '8 min read',
        date: '4 hours ago',
        url: 'https://www.canada.ca/en/public-health/services/publications/healthy-living/canadian-immunization-guide-part-3-vaccination-specific-populations/page-4-immunization-pregnancy-breastfeeding.html'
      },
      {
        title: 'Your Guide to a Healthy Pregnancy',
        subtitle: 'Week-by-week overview of pregnancy development',
        readTime: '12 min read',
        date: '1 day ago',
        url: 'https://www.canada.ca/en/public-health/services/health-promotion/healthy-pregnancy/healthy-pregnancy-guide.html'
      }
    ];
  }
};

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
        { title: 'Tiny Seed', subtitle: 'Just beginning to grow', icon: 'seed', iconColor: COLORS.peach400, bgColor: COLORS.white },
        { title: 'Heart Start', subtitle: 'Primitive heart begins forming', icon: 'heart-pulse', iconColor: COLORS.peach400, bgColor: COLORS.peach400 },
        { title: 'Brain Foundation', subtitle: 'Neural tube developing', icon: 'brain', iconColor: COLORS.purple500, bgColor: COLORS.purple100 }
      ],
      articles: getTrimesterArticles(1)
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
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: 'heart', iconColor: COLORS.peach400, bgColor: COLORS.peach400 },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: 'brain', iconColor: COLORS.purple500, bgColor: COLORS.purple100 },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: 'eye', iconColor: COLORS.purple500, bgColor: COLORS.blush100 },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: 'human-handsup', iconColor: COLORS.peach400, bgColor: COLORS.white }
      ],
      articles: getTrimesterArticles(2)
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
        { title: 'Continued Growth', subtitle: 'Rapid cell division', icon: 'trending-up', iconColor: COLORS.peach400, bgColor: COLORS.white },
        { title: 'Organ Beginnings', subtitle: 'Early internal organ development', icon: 'heart-pulse', iconColor: COLORS.peach400, bgColor: COLORS.peach400 },
        { title: 'Nervous System', subtitle: 'Neural tube progressing', icon: 'brain', iconColor: COLORS.purple500, bgColor: COLORS.purple100 }
      ],
      articles: getTrimesterArticles(3)
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
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: 'heart', iconColor: COLORS.peach400, bgColor: COLORS.peach400 },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: 'brain', iconColor: COLORS.purple500, bgColor: COLORS.purple100 },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: 'eye', iconColor: COLORS.purple500, bgColor: COLORS.blush100 },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: 'human-handsup', iconColor: COLORS.peach400, bgColor: COLORS.white }
      ],
      articles: getTrimesterArticles(4)
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
        { title: 'Size Increase', subtitle: 'Growing rapidly in size', icon: 'ruler', iconColor: COLORS.peach400, bgColor: COLORS.white },
        { title: 'More Defined Organs', subtitle: 'Key organs continue to develop', icon: 'heart-pulse', iconColor: COLORS.peach400, bgColor: COLORS.peach400 },
        { title: 'Circulatory System', subtitle: 'Blood vessels forming', icon: 'water', iconColor: COLORS.purple500, bgColor: COLORS.blush100 }
      ],
      articles: getTrimesterArticles(5)
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
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: 'heart', iconColor: COLORS.peach400, bgColor: COLORS.peach400 },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: 'brain', iconColor: COLORS.purple500, bgColor: COLORS.purple100 },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: 'eye', iconColor: COLORS.purple500, bgColor: COLORS.blush100 },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: 'human-handsup', iconColor: COLORS.peach400, bgColor: COLORS.white }
      ],
      articles: getTrimesterArticles(6)
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
      highlights: [
        { title: 'Brain Boost', subtitle: 'Ongoing brain development', icon: 'brain', iconColor: COLORS.purple500, bgColor: COLORS.purple100 },
        { title: 'Hand & Foot Ridges', subtitle: 'Beginning of digits', icon: 'human-male', iconColor: COLORS.peach400, bgColor: COLORS.white },
        { title: 'Organ Formation', subtitle: 'Internal organs taking shape', icon: 'heart', iconColor: COLORS.purple500, bgColor: COLORS.blush100 }
      ],
      articles: getTrimesterArticles(7)
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
      highlights: [
        { title: 'Digits Emerge', subtitle: 'Fingers and toes forming', icon: 'human-handsup', iconColor: COLORS.peach400, bgColor: COLORS.white },
        { title: 'Facial Features', subtitle: 'Eyelids and lips appear', icon: 'face-woman', iconColor: COLORS.purple500, bgColor: COLORS.blush100 },
        { title: 'Tail Recedes', subtitle: 'Embryonic tail almost gone', icon: 'star', iconColor: COLORS.peach400, bgColor: COLORS.peach400 }
      ],
      articles: getTrimesterArticles(8)
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
      highlights: [
        { title: 'Eyelids Cover', subtitle: 'Eyes protected for development', icon: 'eye', iconColor: COLORS.purple500, bgColor: COLORS.blush100 },
        { title: 'Arms Lengthen', subtitle: 'Limbs growing in proportion', icon: 'human', iconColor: COLORS.peach400, bgColor: COLORS.white },
        { title: 'Fetus Stage', subtitle: 'Transition from embryo to fetus', icon: 'baby', iconColor: COLORS.peach400, bgColor: COLORS.peach400 }
      ],
      articles: getTrimesterArticles(9)
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
      highlights: [
        { title: 'Eyelids Fuse', subtitle: 'Temporary fusion for development', icon: 'eye', iconColor: COLORS.purple500, bgColor: COLORS.purple100 },
        { title: 'Ears Develop', subtitle: 'External ears are forming', icon: 'ear-hearing', iconColor: COLORS.peach400, bgColor: COLORS.white },
        { title: 'Joint Movement', subtitle: 'Limbs can bend at joints', icon: 'human', iconColor: COLORS.peach400, bgColor: COLORS.peach400 }
      ],
      articles: getTrimesterArticles(10)
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
      highlights: [
        { title: 'Nail Growth', subtitle: 'Tiny nails emerging', icon: 'human-handsup', iconColor: COLORS.peach400, bgColor: COLORS.white },
        { title: 'Bones Hardening', subtitle: 'Skeleton becoming stronger', icon: 'human', iconColor: COLORS.purple500, bgColor: COLORS.blush100 },
        { title: 'Genital Formation', subtitle: 'External genitals developing', icon: 'human', iconColor: COLORS.purple500, bgColor: COLORS.purple100 }
      ],
      articles: getTrimesterArticles(11)
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
      highlights: [
        { title: 'Reflexes Active', subtitle: 'Practice movements', icon: 'lightning-bolt', iconColor: COLORS.peach400, bgColor: COLORS.peach400 },
        { title: 'Digestion Starts', subtitle: 'Digestive system begins function', icon: 'food-apple', iconColor: COLORS.purple500, bgColor: COLORS.white },
        { title: 'Hormone Flow', subtitle: 'Endocrine system becoming active', icon: 'flask', iconColor: COLORS.purple500, bgColor: COLORS.blush100 }
      ],
      articles: getTrimesterArticles(12)
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
      highlights: [
        { title: 'Vocal Cord Form', subtitle: 'Ready for first cries', icon: 'microphone-variant' },
        { title: 'Ribs Visible', subtitle: 'Developing chest structure', icon: 'bone' },
        { title: 'Intestines Functional', subtitle: 'Digestive system active', icon: 'food-apple' }
      ],
      articles: getTrimesterArticles(13)
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
      highlights: [
        { title: 'Genitals Visible', subtitle: 'Sex can be determined', icon: 'human-male-female' },
        { title: 'Facial Expressions', subtitle: 'Practice frowns and smiles', icon: 'emoticon' },
        { title: 'Lanugo Grows', subtitle: 'Fine hair covering skin', icon: 'human' }
      ],
      articles: [
        {
          title: 'The Role of Lanugo Hair in Fetal Development',
          subtitle: 'Temporary hair for protection',
          readTime: '3 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Bonding with Your Baby Before Birth',
          subtitle: 'Ways to connect with your little one',
          readTime: '5 min read',
          date: '4 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Bones Lengthen', subtitle: 'Rapid growth in length', icon: 'ruler' },
        { title: 'Limb Movement', subtitle: 'Active wiggles and kicks', icon: 'human-handsup' },
        { title: 'Skin Formation', subtitle: 'Developing protective layers', icon: 'human' }
      ],
      articles: [
        {
          title: 'Decoding Your Baby\'s Kicks and Movements',
          subtitle: 'What those flutters mean',
          readTime: '4 min read',
          date: '11 hours ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Preparing for Your Mid-Pregnancy Scan',
          subtitle: 'The anatomy scan explained',
          readTime: '7 min read',
          date: '2 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Head Straightens', subtitle: 'More upright posture', icon: 'arrow-up' },
        { title: 'Eye Movements', subtitle: 'Eyes are starting to move', icon: 'eye' },
        { title: 'Fingernails Complete', subtitle: 'Fully formed nails', icon: 'human-handsup' }
      ],
      articles: [
        {
          title: 'Sleep Positions During Pregnancy',
          subtitle: 'Finding comfort as your bump grows',
          readTime: '3 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Building Your Baby Registry',
          subtitle: 'Essentials for new parents',
          readTime: '8 min read',
          date: '5 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Sweat Glands', subtitle: 'Starting to regulate temperature', icon: 'water' },
        { title: 'Strong Heartbeat', subtitle: 'Easily audible heartbeat', icon: 'heart-pulse' },
        { title: 'Bone Hardening', subtitle: 'Cartilage turning to bone', icon: 'bone' }
      ],
      articles: getTrimesterArticles(17)
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
      highlights: [
        { title: 'Ears Prominent', subtitle: 'Ears taking their shape', icon: 'ear-hearing' },
        { title: 'Light Sensitivity', subtitle: 'Reacting to light changes', icon: 'lightbulb' },
        { title: 'Uterus Forms (Girls)', subtitle: 'Developing female reproductive organs', icon: 'human-female' }
      ],
      articles: getTrimesterArticles(18)
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
      highlights: [
        { title: 'Skin Layers', subtitle: 'Skin is thickening and maturing', icon: 'human' },
        { title: 'Proportional Limbs', subtitle: 'Arms and legs reaching final proportions', icon: 'scale-balance' },
        { title: 'Swallowing Fluid', subtitle: 'Practicing for digestion', icon: 'food' }
      ],
      articles: getTrimesterArticles(19)
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
      highlights: [
        { title: 'Hair & Brows', subtitle: 'First signs of hair', icon: 'human' },
        { title: 'Sex Identifiable', subtitle: 'Gender often visible now', icon: 'human-male-female' },
        { title: 'Heartbeat Audible', subtitle: 'Loud and clear heart sounds', icon: 'stethoscope' }
      ],
      articles: [
        {
          title: 'Your Mid-Pregnancy Ultrasound: What to Know',
          subtitle: 'A detailed look at your baby\'s development',
          readTime: '7 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Feeling Your Baby Move: The Joy of Quickening',
          subtitle: 'When you can expect to feel those first flutters',
          readTime: '4 min read',
          date: '7 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Blood Production', subtitle: 'Bone marrow takes over blood cell formation', icon: 'blood-bag' },
        { title: 'Stronger Kicks', subtitle: 'Feeling more pronounced movements', icon: 'human-handsup' },
        { title: 'Translucent Skin', subtitle: 'Skin still thin and transparent', icon: 'star' }
      ],
      articles: [
        {
          title: 'Counting Kicks: What and Why',
          subtitle: 'Monitoring your baby\'s movements',
          readTime: '5 min read',
          date: '14 hours ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Dealing with Leg Cramps During Pregnancy',
          subtitle: 'Tips for relief and prevention',
          readTime: '3 min read',
          date: '4 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Taste Buds Develop', subtitle: 'Exploring flavors in amniotic fluid', icon: 'food-variant' },
        { title: 'Hair Growth', subtitle: 'More visible hair on head and body', icon: 'human' },
        { title: 'Pancreas Active', subtitle: 'Beginning hormone production', icon: 'Insulin' }
      ],
      articles: [
        {
          title: 'Your Changing Body in the Second Trimester',
          subtitle: 'Understanding aches and pains',
          readTime: '6 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Preparing for Childbirth Classes',
          subtitle: 'What to learn and when to start',
          readTime: '7 min read',
          date: '8 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Lung Vessels Form', subtitle: 'Preparing for breathing air', icon: 'lungs' },
        { title: 'Fat Deposits', subtitle: 'Gaining insulating fat for warmth', icon: 'baby-face' },
        { title: 'Hearing Improves', subtitle: 'Can hear sounds more clearly', icon: 'ear' }
      ],
      articles: [
        {
          title: 'The Importance of Rest in Pregnancy',
          subtitle: 'Why sleep matters for you and baby',
          readTime: '4 min read',
          date: '15 hours ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Creating a Birth Plan: Your Choices',
          subtitle: 'Personalizing your labor and delivery experience',
          readTime: '8 min read',
          date: '5 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Lung Surfactant', subtitle: 'Critical for breathing outside the womb', icon: 'weather-windy' },
        { title: 'Pink & Wrinkled Skin', subtitle: 'Developing its own character', icon: 'baby-face' },
        { title: 'Well-Defined Face', subtitle: 'Facial features are clearer', icon: 'face-woman' }
      ],
      articles: [
        {
          title: 'Gestational Diabetes: What You Need to Know',
          subtitle: 'Screening and management',
          readTime: '7 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Benefits of Prenatal Massage',
          subtitle: 'Relaxation and pain relief',
          readTime: '4 min read',
          date: '9 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Hair Thicker', subtitle: 'More hair on the head and body', icon: 'human' },
        { title: 'Spine Forms', subtitle: '33 vertebrae are now in place', icon: 'bone' },
        { title: 'Grasp Reflex', subtitle: 'Practicing gripping firmly', icon: 'human-handsup' }
      ],
      articles: [
        {
          title: 'Understanding Braxton Hicks Contractions',
          subtitle: 'Practice contractions explained',
          readTime: '3 min read',
          date: '16 hours ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Choosing Your Baby\'s Pediatrician',
          subtitle: 'Important considerations for care',
          readTime: '6 min read',
          date: '4 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Eyes Open', subtitle: 'Can open and close eyes', icon: 'eye' },
        { title: 'Breathing Practice', subtitle: 'Mimicking breathing movements', icon: 'weather-windy' },
        { title: 'Fingerprints Visible', subtitle: 'Unique identity forming', icon: 'fingerprint' }
      ],
      articles: [
        {
          title: 'Third Trimester: What to Expect',
          subtitle: 'Entering the home stretch of pregnancy',
          readTime: '8 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Dealing with Swelling During Pregnancy',
          subtitle: 'Tips for reducing edema',
          readTime: '5 min read',
          date: '10 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Nervous System Maturing', subtitle: 'Brain and nerves developing connections', icon: 'brain' },
        { title: 'Improved Muscle Tone', subtitle: 'Stronger and more coordinated movements', icon: 'arm-flex' },
        { title: 'Brain Tissue Expands', subtitle: 'Rapid brain growth continues', icon: 'lightbulb' },
      ],
      articles: [
        {
          title: 'Preparing for Labor and Delivery',
          subtitle: 'Packing your hospital bag and more',
          readTime: '7 min read',
          date: '17 hours ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Common Third Trimester Discomforts',
          subtitle: 'Managing back pain, heartburn, and fatigue',
          readTime: '6 min read',
          date: '5 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Brain Grooves Develop', subtitle: 'Brain becoming more complex', icon: 'brain' },
        { title: 'Eye Movement', subtitle: 'Eyes moving and tracking', icon: 'eye' },
        { title: 'Breathing Practice', subtitle: 'More regular breathing movements', icon: 'weather-windy' }
      ],
      articles: [
        {
          title: 'Understanding Your Baby\'s Position for Birth',
          subtitle: 'Breech, head-down, and more',
          readTime: '5 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Signs of Labor: What to Look For',
          subtitle: 'Distinguishing true labor from false labor',
          readTime: '4 min read',
          date: '11 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Muscles Tone Up', subtitle: 'Stronger and more defined muscles', icon: 'arm-flex' },
        { title: 'Stretching & Kicking', subtitle: 'Active movements are common', icon: 'human-handsup' },
        { title: 'Senses Sharpen', subtitle: 'Sensory perception improving', icon: 'star' }
      ],
      articles: [
        {
          title: 'The Nesting Instinct: Embracing the Urge to Prepare',
          subtitle: 'Getting ready for baby\'s arrival',
          readTime: '3 min read',
          date: '18 hours ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Pain Management Options During Labor',
          subtitle: 'Understanding epidurals and natural methods',
          readTime: '7 min read',
          date: '6 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Eyesight Improves', subtitle: 'Can perceive light and shadow better', icon: 'eye' },
        { title: 'Red Blood Cell Production', subtitle: 'Bone marrow is now the primary site', icon: 'blood-bag' },
        { title: 'Smoother Skin', subtitle: 'Losing wrinkles as fat deposits increase', icon: 'baby-face' }
      ],
      articles: [
        {
          title: 'Postpartum Recovery: What to Expect',
          subtitle: 'Your body after birth',
          readTime: '8 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Breastfeeding Basics for New Moms',
          subtitle: 'Getting started and common challenges',
          readTime: '6 min read',
          date: '12 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Nervous System Functional', subtitle: 'Brain and nerves are well-developed', icon: 'brain' },
        { title: 'Bladder Fills', subtitle: 'Practicing urination', icon: 'toilet' },
        { title: 'Aware of Sounds', subtitle: 'Reacting to voices and music', icon: 'ear-hearing' }
      ],
      articles: [
        {
          title: 'Essential Baby Gear for Newborns',
          subtitle: 'What you really need for baby\'s first months',
          readTime: '9 min read',
          date: '19 hours ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Newborn Sleep Patterns: What to Expect',
          subtitle: 'Understanding infant sleep cycles',
          readTime: '5 min read',
          date: '7 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Breathing Rhythm', subtitle: 'Developing a consistent breathing pattern', icon: 'weather-windy' },
        { title: 'Toenails Complete', subtitle: 'All ten tiny toenails are formed', icon: 'human-male' },
        { title: 'Soft Bones', subtitle: 'Bones are still soft for birth', icon: 'bone' }
      ],
      articles: [
        {
          title: 'Caring for Your Newborn: First Steps',
          subtitle: 'Feeding, changing, and comforting',
          readTime: '10 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Postpartum Mental Health: Recognizing and Seeking Help',
          subtitle: 'Understanding the baby blues and PPD',
          readTime: '6 min read',
          date: '13 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Soft Skull Bones', subtitle: 'Flexible for passage through birth canal', icon: 'baby-face' },
        { title: 'Pupils Dilate', subtitle: 'Eyes reacting to light changes', icon: 'lightbulb' },
        { title: 'Detects Light/Dark', subtitle: 'Can perceive changes in illumination', icon: 'weather-night' }
      ],
      articles: [
        {
          title: 'The Art of Swaddling Your Newborn',
          subtitle: 'Creating a cozy and secure sleep environment',
          readTime: '4 min read',
          date: '20 hours ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'First Aid for New Parents',
          subtitle: 'Essential knowledge for common baby issues',
          readTime: '7 min read',
          date: '8 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'CNS Maturing', subtitle: 'Further development of brain and spinal cord', icon: 'brain' },
        { title: 'Eyes Open When Awake', subtitle: 'Exploring the surrounding environment', icon: 'eye' },
        { title: 'Frequent Hiccups', subtitle: 'Common as lungs mature', icon: 'baby-face' }
      ],
      articles: [
        {
          title: 'Safe Sleep Practices for Infants',
          subtitle: 'Reducing the risk of SIDS',
          readTime: '5 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'The Importance of Tummy Time',
          subtitle: 'A guide to early motor development',
          readTime: '3 min read',
          date: '14 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Lanugo Fades', subtitle: 'Fine hair is mostly shed', icon: 'star' },
        { title: 'Organs Maturing', subtitle: 'All systems are almost ready for birth', icon: 'heart' },
        { title: 'Strong Movements', subtitle: 'Feeling powerful kicks and stretches', icon: 'arm-flex' },
      ],
      articles: [
        {
          title: 'Understanding Baby Cues: Crying, Fussing, and More',
          subtitle: 'Decoding your newborn\'s communication',
          readTime: '6 min read',
          date: '21 hours ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Building a Strong Parent-Baby Bond',
          subtitle: 'Early interactions that make a difference',
          readTime: '7 min read',
          date: '9 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Gaining Fat', subtitle: 'Plumping up for birth', icon: 'baby-face' },
        { title: 'Digestive System Ready', subtitle: 'Prepared for first feedings', icon: 'food-apple' },
        { title: 'Bones Soft & Firm', subtitle: 'Strong enough, yet flexible for birth', icon: 'bone' }
      ],
      articles: [
        {
          title: 'Car Seat Safety: What Every Parent Needs to Know',
          subtitle: 'Installing and using your car seat correctly',
          readTime: '5 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Newborn Reflexes: What They Mean',
          subtitle: 'Understanding your baby\'s natural responses',
          readTime: '4 min read',
          date: '15 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Full-Term', subtitle: 'Considered full-term this week', icon: 'check-circle' },
        { title: 'Lungs Mature', subtitle: 'Ready to breathe independently', icon: 'lungs' },
        { title: 'Strong Grasp Reflex', subtitle: 'Can hold onto fingers tightly', icon: 'human-handsup' },
      ],
      articles: [
        {
          title: 'The Fourth Trimester: Caring for Yourself Postpartum',
          subtitle: 'Prioritizing your well-being after birth',
          readTime: '8 min read',
          date: '22 hours ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'Preparing Siblings for a New Baby',
          subtitle: 'Helping older children adjust',
          readTime: '6 min read',
          date: '10 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Smooth Skin', subtitle: 'Wrinkles disappear as fat increases', icon: 'human' },
        { title: 'Plump Body', subtitle: 'Well-rounded and ready for birth', icon: 'baby-face' },
        { title: 'Vernix Thickens', subtitle: 'Protective coating is abundant', icon: 'star' },
      ],
      articles: [
        {
          title: 'Induction of Labor: When and Why',
          subtitle: 'Understanding the process of labor induction',
          readTime: '7 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'The Golden Hour: First Moments After Birth',
          subtitle: 'Skin-to-skin contact and early bonding',
          readTime: '5 min read',
          date: '16 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Organs Complete', subtitle: 'All vital organs fully developed', icon: 'heart' },
        { title: 'Breathing Practice', subtitle: 'Refining breathing patterns', icon: 'weather-windy' },
        { title: 'Gripping Practice', subtitle: 'Strengthening hand grasp', icon: 'human-handsup' }
      ],
      articles: [
        {
          title: 'Your Due Date Has Passed: What Now?',
          subtitle: 'Understanding post-term pregnancy',
          readTime: '4 min read',
          date: '23 hours ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'The First Week with Your Newborn',
          subtitle: 'Adjusting to life with a baby at home',
          readTime: '8 min read',
          date: '11 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
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
      highlights: [
        { title: 'Fully Developed', subtitle: 'All systems are go!', icon: 'check-circle' },
        { title: 'Strong Reflexes', subtitle: 'Ready for life outside the womb', icon: 'lightning-bolt' },
        { title: 'Ready for Birth', subtitle: 'Your little one is preparing to meet you!', icon: 'foot-print' },
      ],
      articles: [
        {
          title: 'The First Feed: Latching and Nursing Tips',
          subtitle: 'Getting started with breastfeeding or bottle-feeding',
          readTime: '6 min read',
          date: '1 day ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
        {
          title: 'New Parent Survival Guide',
          subtitle: 'Tips for navigating the first few weeks with baby',
          readTime: '9 min read',
          date: '17 days ago',
          url: 'https://en.wikipedia.org/wiki/Pregnancy'
        },
      ]
    }
  ];