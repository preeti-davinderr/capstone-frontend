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
        { title: 'Tiny Seed', subtitle: 'Just beginning to grow', icon: '🌱' },
        { title: 'Heart Start', subtitle: 'Primitive heart begins forming', icon: '❤️' },
        { title: 'Brain Foundation', subtitle: 'Neural tube developing', icon: '🧠' },
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
          title: 'Your First Trimester Checklist',
          subtitle: 'Things to do in early pregnancy',
          readTime: '6 min read',
          date: '3 hours ago'
        },
        {
          title: 'Early Pregnancy Symptoms Explained',
          subtitle: 'Understanding what to expect',
          readTime: '4 min read',
          date: '1 day ago'
        },
        {
          title: 'Choosing Your Prenatal Vitamins',
          subtitle: 'Key ingredients for a healthy start',
          readTime: '5 min read',
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
        { title: 'Continued Growth', subtitle: 'Rapid cell division', icon: '📈' },
        { title: 'Organ Beginnings', subtitle: 'Early internal organ development', icon: '🫀' },
        { title: 'Nervous System', subtitle: 'Neural tube progressing', icon: '🧠' }
      ],
      articles: [
        {
          title: 'Understanding Early Fetal Development',
          subtitle: 'What happens in the first few weeks',
          readTime: '7 min read',
          date: '4 hours ago'
        },
        {
          title: 'The Importance of Folic Acid',
          subtitle: 'Crucial for neural tube development',
          readTime: '3 min read',
          date: '2 days ago'
        },
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
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '�️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' }
      ],
      articles: [
        {
          title: 'Your First Prenatal Appointment',
          subtitle: 'What to expect at your initial visit',
          readTime: '5 min read',
          date: '1 day ago'
        },
        {
          title: 'Early Pregnancy Scans: What They Show',
          subtitle: 'The first glimpses of your baby',
          readTime: '6 min read',
          date: '3 days ago'
        },
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
        { title: 'Size Increase', subtitle: 'Growing rapidly in size', icon: '📏' },
        { title: 'More Defined Organs', subtitle: 'Key organs continue to develop', icon: '🫀' },
        { title: 'Circulatory System', subtitle: 'Blood vessels forming', icon: '🩸' }
      ],
      articles: [
        {
          title: 'Managing Fatigue in Early Pregnancy',
          subtitle: 'Tips to boost your energy',
          readTime: '4 min read',
          date: '5 hours ago'
        },
        {
          title: 'Emotional Changes During Pregnancy',
          subtitle: 'Coping with mood swings',
          readTime: '6 min read',
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
          title: 'Common Pregnancy Discomforts and Remedies',
          subtitle: 'Dealing with nausea, heartburn, and more',
          readTime: '8 min read',
          date: '1 day ago'
        },
        {
          title: 'Partner Support During Pregnancy',
          subtitle: 'How partners can help and prepare',
          readTime: '5 min read',
          date: '4 days ago'
        },
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
      highlights: [
        { title: 'Brain Boost', subtitle: 'Ongoing brain development', icon: '🧠' },
        { title: 'Hand & Foot Ridges', subtitle: 'Beginning of digits', icon: '🦶' },
        { title: 'Organ Formation', subtitle: 'Internal organs taking shape', icon: '🫁' }
      ],
      articles: [
        {
          title: 'The Marvel of Embryonic Development',
          subtitle: 'A closer look at early stages',
          readTime: '7 min read',
          date: '6 hours ago'
        },
        {
          title: 'Choosing a Healthcare Provider for Pregnancy',
          subtitle: 'Factors to consider for your care',
          readTime: '5 min read',
          date: '2 days ago'
        }
      ]
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
        { title: 'Digits Emerge', subtitle: 'Fingers and toes forming', icon: '🖐️' },
        { title: 'Facial Features', subtitle: 'Eyelids and lips appear', icon: '😊' },
        { title: 'Tail Recedes', subtitle: 'Embryonic tail almost gone', icon: '✨' }
      ],
      articles: [
        {
          title: 'Your Baby\'s Development: Week by Week',
          subtitle: 'A detailed guide to growth',
          readTime: '10 min read',
          date: '1 day ago'
        },
        {
          title: 'Preparing for Your First Ultrasound',
          subtitle: 'What to expect and how to prepare',
          readTime: '4 min read',
          date: '3 days ago'
        },
      ]
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
        { title: 'Eyelids Cover', subtitle: 'Eyes protected for development', icon: '👁️' },
        { title: 'Arms Lengthen', subtitle: 'Limbs growing in proportion', icon: '💪' },
        { title: 'Fetus Stage', subtitle: 'Transition from embryo to fetus', icon: '👶' }
      ],
      articles: [
        {
          title: 'The Fetal Period: What Changes?',
          subtitle: 'From embryo to a tiny human',
          readTime: '6 min read',
          date: '8 hours ago'
        },
        {
          title: 'Coping with Pregnancy Hormones',
          subtitle: 'Understanding the emotional rollercoaster',
          readTime: '5 min read',
          date: '2 days ago'
        },
      ]
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
        { title: 'Eyelids Fuse', subtitle: 'Temporary fusion for development', icon: '🔒' },
        { title: 'Ears Develop', subtitle: 'External ears are forming', icon: '👂' },
        { title: 'Joint Movement', subtitle: 'Limbs can bend at joints', icon: '🦵' }
      ],
      articles: [
        {
          title: 'Baby\'s First Movements: When Will You Feel Them?',
          subtitle: 'Understanding quickening',
          readTime: '3 min read',
          date: '1 day ago'
        },
        {
          title: 'Nutrition for a Healthy Second Trimester',
          subtitle: 'Key foods for continued growth',
          readTime: '7 min read',
          date: '4 days ago'
        },
      ]
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
        { title: 'Nail Growth', subtitle: 'Tiny nails emerging', icon: '💅' },
        { title: 'Bones Hardening', subtitle: 'Skeleton becoming stronger', icon: '🦴' },
        { title: 'Genital Formation', subtitle: 'External genitals developing', icon: '🚻' }
      ],
      articles: [
        {
          title: 'Understanding Your Baby\'s Gender',
          subtitle: 'When and how you might find out',
          readTime: '4 min read',
          date: '9 hours ago'
        },
        {
          title: 'Preparing Your Home for Baby',
          subtitle: 'Safety and nursery essentials',
          readTime: '8 min read',
          date: '3 days ago'
        },
      ]
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
        { title: 'Reflexes Active', subtitle: 'Practice movements', icon: '⚡' },
        { title: 'Digestion Starts', subtitle: 'Digestive system begins function', icon: '🍎' },
        { title: 'Hormone Flow', subtitle: 'Endocrine system becoming active', icon: '🧪' }
      ],
      articles: [
        {
          title: 'The Second Trimester: A Guide',
          subtitle: 'The "golden" period of pregnancy',
          readTime: '7 min read',
          date: '1 day ago'
        },
        {
          title: 'Prenatal Testing Options Explained',
          subtitle: 'Making informed decisions',
          readTime: '9 min read',
          date: '5 days ago'
        },
      ]
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
        { title: 'Vocal Cord Form', subtitle: 'Ready for first cries', icon: '🗣️' },
        { title: 'Ribs Visible', subtitle: 'Developing chest structure', icon: '🦴' },
        { title: 'Intestines Functional', subtitle: 'Digestive system active', icon: '🍎' }
      ],
      articles: [
        {
          title: 'Understanding Your Growing Bump',
          subtitle: 'Changes in your body during pregnancy',
          readTime: '4 min read',
          date: '10 hours ago'
        },
        {
          title: 'Exercise Safely in Your Second Trimester',
          subtitle: 'Maintaining fitness during pregnancy',
          readTime: '6 min read',
          date: '2 days ago'
        },
      ]
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
        { title: 'Genitals Visible', subtitle: 'Sex can be determined', icon: '🚻' },
        { title: 'Facial Expressions', subtitle: 'Practice frowns and smiles', icon: '😊' },
        { title: 'Lanugo Grows', subtitle: 'Fine hair covering skin', icon: ' Fuzzy' }
      ],
      articles: [
        {
          title: 'The Role of Lanugo Hair in Fetal Development',
          subtitle: 'Temporary hair for protection',
          readTime: '3 min read',
          date: '1 day ago'
        },
        {
          title: 'Bonding with Your Baby Before Birth',
          subtitle: 'Ways to connect with your little one',
          readTime: '5 min read',
          date: '4 days ago'
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
        { title: 'Bones Lengthen', subtitle: 'Rapid growth in length', icon: '📏' },
        { title: 'Limb Movement', subtitle: 'Active wiggles and kicks', icon: '🤸' },
        { title: 'Skin Formation', subtitle: 'Developing protective layers', icon: '🧴' }
      ],
      articles: [
        {
          title: 'Decoding Your Baby\'s Kicks and Movements',
          subtitle: 'What those flutters mean',
          readTime: '4 min read',
          date: '11 hours ago'
        },
        {
          title: 'Preparing for Your Mid-Pregnancy Scan',
          subtitle: 'The anatomy scan explained',
          readTime: '7 min read',
          date: '2 days ago'
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
        { title: 'Head Straightens', subtitle: 'More upright posture', icon: '⬆️' },
        { title: 'Eye Movements', subtitle: 'Eyes are starting to move', icon: '👀' },
        { title: 'Fingernails Complete', subtitle: 'Fully formed nails', icon: '💅' }
      ],
      articles: [
        {
          title: 'Sleep Positions During Pregnancy',
          subtitle: 'Finding comfort as your bump grows',
          readTime: '3 min read',
          date: '1 day ago'
        },
        {
          title: 'Building Your Baby Registry',
          subtitle: 'Essentials for new parents',
          readTime: '8 min read',
          date: '5 days ago'
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
        { title: 'Sweat Glands', subtitle: 'Starting to regulate temperature', icon: '💧' },
        { title: 'Strong Heartbeat', subtitle: 'Easily audible heartbeat', icon: '💓' },
        { title: 'Bone Hardening', subtitle: 'Cartilage turning to bone', icon: '🦴' }
      ],
      articles: [
        {
          title: 'Understanding Your Weight Gain in Pregnancy',
          subtitle: 'Healthy ranges and expectations',
          readTime: '5 min read',
          date: '12 hours ago'
        },
        {
          title: 'Dealing with Pregnancy Brain',
          subtitle: 'Tips for forgetfulness and focus',
          readTime: '4 min read',
          date: '3 days ago'
        },
      ]
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
        { title: 'Ears Prominent', subtitle: 'Ears taking their shape', icon: '👂' },
        { title: 'Light Sensitivity', subtitle: 'Reacting to light changes', icon: '💡' },
        { title: 'Uterus Forms (Girls)', subtitle: 'Developing female reproductive organs', icon: '♀️' }
      ],
      articles: [
        {
          title: 'The Wonder of Fetal Hearing Development',
          subtitle: 'What your baby can hear inside',
          readTime: '6 min read',
          date: '1 day ago'
        },
        {
          title: 'Choosing a Name for Your Baby',
          subtitle: 'Tips and inspiration',
          readTime: '7 min read',
          date: '6 days ago'
        },
      ]
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
        { title: 'Skin Layers', subtitle: 'Skin is thickening and maturing', icon: '🧴' },
        { title: 'Proportional Limbs', subtitle: 'Arms and legs reaching final proportions', icon: '⚖️' },
        { title: 'Swallowing Fluid', subtitle: 'Practicing for digestion', icon: '😋' }
      ],
      articles: [
        {
          title: 'The Role of Amniotic Fluid in Development',
          subtitle: 'More than just a cushion',
          readTime: '4 min read',
          date: '13 hours ago'
        },
        {
          title: 'Maternity Clothes: Comfort and Style',
          subtitle: 'Embracing your changing body',
          readTime: '5 min read',
          date: '3 days ago'
        },
      ]
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
        { title: 'Hair & Brows', subtitle: 'First signs of hair', icon: '💇' },
        { title: 'Sex Identifiable', subtitle: 'Gender often visible now', icon: '💙' },
        { title: 'Heartbeat Audible', subtitle: 'Loud and clear heart sounds', icon: '🩺' }
      ],
      articles: [
        {
          title: 'Your Mid-Pregnancy Ultrasound: What to Know',
          subtitle: 'A detailed look at your baby\'s development',
          readTime: '7 min read',
          date: '1 day ago'
        },
        {
          title: 'Feeling Your Baby Move: The Joy of Quickening',
          subtitle: 'When you can expect to feel those first flutters',
          readTime: '4 min read',
          date: '7 days ago'
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
        { title: 'Blood Production', subtitle: 'Bone marrow takes over blood cell formation', icon: '🩸' },
        { title: 'Stronger Kicks', subtitle: 'Feeling more pronounced movements', icon: '🦵' },
        { title: 'Translucent Skin', subtitle: 'Skin still thin and transparent', icon: '✨' }
      ],
      articles: [
        {
          title: 'Counting Kicks: What and Why',
          subtitle: 'Monitoring your baby\'s movements',
          readTime: '5 min read',
          date: '14 hours ago'
        },
        {
          title: 'Dealing with Leg Cramps During Pregnancy',
          subtitle: 'Tips for relief and prevention',
          readTime: '3 min read',
          date: '4 days ago'
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
        { title: 'Taste Buds Develop', subtitle: 'Exploring flavors in amniotic fluid', icon: '👅' },
        { title: 'Hair Growth', subtitle: 'More visible hair on head and body', icon: '💇' },
        { title: 'Pancreas Active', subtitle: 'Beginning hormone production', icon: 'Insulin' }
      ],
      articles: [
        {
          title: 'Your Changing Body in the Second Trimester',
          subtitle: 'Understanding aches and pains',
          readTime: '6 min read',
          date: '1 day ago'
        },
        {
          title: 'Preparing for Childbirth Classes',
          subtitle: 'What to learn and when to start',
          readTime: '7 min read',
          date: '8 days ago'
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
        { title: 'Lung Vessels Form', subtitle: 'Preparing for breathing air', icon: '🫁' },
        { title: 'Fat Deposits', subtitle: 'Gaining insulating fat for warmth', icon: '👶' },
        { title: 'Hearing Improves', subtitle: 'Can hear sounds more clearly', icon: '👂' }
      ],
      articles: [
        {
          title: 'The Importance of Rest in Pregnancy',
          subtitle: 'Why sleep matters for you and baby',
          readTime: '4 min read',
          date: '15 hours ago'
        },
        {
          title: 'Creating a Birth Plan: Your Choices',
          subtitle: 'Personalizing your labor and delivery experience',
          readTime: '8 min read',
          date: '5 days ago'
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
        { title: 'Lung Surfactant', subtitle: 'Critical for breathing outside the womb', icon: '💨' },
        { title: 'Pink & Wrinkled Skin', subtitle: 'Developing its own character', icon: '👶' },
        { title: 'Well-Defined Face', subtitle: 'Facial features are clearer', icon: '😊' }
      ],
      articles: [
        {
          title: 'Gestational Diabetes: What You Need to Know',
          subtitle: 'Screening and management',
          readTime: '7 min read',
          date: '1 day ago'
        },
        {
          title: 'Benefits of Prenatal Massage',
          subtitle: 'Relaxation and pain relief',
          readTime: '4 min read',
          date: '9 days ago'
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
        { title: 'Hair Thicker', subtitle: 'More hair on the head and body', icon: '💇' },
        { title: 'Spine Forms', subtitle: '33 vertebrae are now in place', icon: '🦴' },
        { title: 'Grasp Reflex', subtitle: 'Practicing gripping firmly', icon: '🤏' }
      ],
      articles: [
        {
          title: 'Understanding Braxton Hicks Contractions',
          subtitle: 'Practice contractions explained',
          readTime: '3 min read',
          date: '16 hours ago'
        },
        {
          title: 'Choosing Your Baby\'s Pediatrician',
          subtitle: 'Important considerations for care',
          readTime: '6 min read',
          date: '4 days ago'
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
        { title: 'Eyes Open', subtitle: 'Can open and close eyes', icon: '👀' },
        { title: 'Breathing Practice', subtitle: 'Mimicking breathing movements', icon: '🌬️' },
        { title: 'Fingerprints Visible', subtitle: 'Unique identity forming', icon: ' fingerprints' }
      ],
      articles: [
        {
          title: 'Third Trimester: What to Expect',
          subtitle: 'Entering the home stretch of pregnancy',
          readTime: '8 min read',
          date: '1 day ago'
        },
        {
          title: 'Dealing with Swelling During Pregnancy',
          subtitle: 'Tips for reducing edema',
          readTime: '5 min read',
          date: '10 days ago'
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
        { title: 'Nervous System Maturing', subtitle: 'Brain and nerves developing connections', icon: '🧠' },
        { title: 'Improved Muscle Tone', subtitle: 'Stronger and more coordinated movements', icon: '💪' },
        { title: 'Brain Tissue Expands', subtitle: 'Rapid brain growth continues', icon: '💡' }
      ],
      articles: [
        {
          title: 'Preparing for Labor and Delivery',
          subtitle: 'Packing your hospital bag and more',
          readTime: '7 min read',
          date: '17 hours ago'
        },
        {
          title: 'Common Third Trimester Discomforts',
          subtitle: 'Managing back pain, heartburn, and fatigue',
          readTime: '6 min read',
          date: '5 days ago'
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
        { title: 'Brain Grooves Develop', subtitle: 'Brain becoming more complex', icon: '🧠' },
        { title: 'Eye Movement', subtitle: 'Eyes moving and tracking', icon: '👀' },
        { title: 'Breathing Practice', subtitle: 'More regular breathing movements', icon: '🌬️' }
      ],
      articles: [
        {
          title: 'Understanding Your Baby\'s Position for Birth',
          subtitle: 'Breech, head-down, and more',
          readTime: '5 min read',
          date: '1 day ago'
        },
        {
          title: 'Signs of Labor: What to Look For',
          subtitle: 'Distinguishing true labor from false labor',
          readTime: '4 min read',
          date: '11 days ago'
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
        { title: 'Muscles Tone Up', subtitle: 'Stronger and more defined muscles', icon: '💪' },
        { title: 'Stretching & Kicking', subtitle: 'Active movements are common', icon: '🤸' },
        { title: 'Senses Sharpen', subtitle: 'Sensory perception improving', icon: '✨' }
      ],
      articles: [
        {
          title: 'The Nesting Instinct: Embracing the Urge to Prepare',
          subtitle: 'Getting ready for baby\'s arrival',
          readTime: '3 min read',
          date: '18 hours ago'
        },
        {
          title: 'Pain Management Options During Labor',
          subtitle: 'Understanding epidurals and natural methods',
          readTime: '7 min read',
          date: '6 days ago'
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
        { title: 'Eyesight Improves', subtitle: 'Can perceive light and shadow better', icon: '👀' },
        { title: 'Red Blood Cell Production', subtitle: 'Bone marrow is now the primary site', icon: '🩸' },
        { title: 'Smoother Skin', subtitle: 'Losing wrinkles as fat deposits increase', icon: '👶' }
      ],
      articles: [
        {
          title: 'Postpartum Recovery: What to Expect',
          subtitle: 'Your body after birth',
          readTime: '8 min read',
          date: '1 day ago'
        },
        {
          title: 'Breastfeeding Basics for New Moms',
          subtitle: 'Getting started and common challenges',
          readTime: '6 min read',
          date: '12 days ago'
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
        { title: 'Nervous System Functional', subtitle: 'Brain and nerves are well-developed', icon: '🧠' },
        { title: 'Bladder Fills', subtitle: 'Practicing urination', icon: '🚽' },
        { title: 'Aware of Sounds', subtitle: 'Reacting to voices and music', icon: '👂' }
      ],
      articles: [
        {
          title: 'Essential Baby Gear for Newborns',
          subtitle: 'What you really need for baby\'s first months',
          readTime: '9 min read',
          date: '19 hours ago'
        },
        {
          title: 'Newborn Sleep Patterns: What to Expect',
          subtitle: 'Understanding infant sleep cycles',
          readTime: '5 min read',
          date: '7 days ago'
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
        { title: 'Breathing Rhythm', subtitle: 'Developing a consistent breathing pattern', icon: '🌬️' },
        { title: 'Toenails Complete', subtitle: 'All ten tiny toenails are formed', icon: '🦶' },
        { title: 'Soft Bones', subtitle: 'Bones are still soft for birth', icon: '🦴' }
      ],
      articles: [
        {
          title: 'Caring for Your Newborn: First Steps',
          subtitle: 'Feeding, changing, and comforting',
          readTime: '10 min read',
          date: '1 day ago'
        },
        {
          title: 'Postpartum Mental Health: Recognizing and Seeking Help',
          subtitle: 'Understanding the baby blues and PPD',
          readTime: '6 min read',
          date: '13 days ago'
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
        { title: 'Soft Skull Bones', subtitle: 'Flexible for passage through birth canal', icon: '👶' },
        { title: 'Pupils Dilate', subtitle: 'Eyes reacting to light changes', icon: '💡' },
        { title: 'Detects Light/Dark', subtitle: 'Can perceive changes in illumination', icon: '🌓' }
      ],
      articles: [
        {
          title: 'The Art of Swaddling Your Newborn',
          subtitle: 'Creating a cozy and secure sleep environment',
          readTime: '4 min read',
          date: '20 hours ago'
        },
        {
          title: 'First Aid for New Parents',
          subtitle: 'Essential knowledge for common baby issues',
          readTime: '7 min read',
          date: '8 days ago'
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
        { title: 'CNS Maturing', subtitle: 'Further development of brain and spinal cord', icon: '🧠' },
        { title: 'Eyes Open When Awake', subtitle: 'Exploring the surrounding environment', icon: '👀' },
        { title: 'Frequent Hiccups', subtitle: 'Common as lungs mature', icon: ' hiccup' }
      ],
      articles: [
        {
          title: 'Safe Sleep Practices for Infants',
          subtitle: 'Reducing the risk of SIDS',
          readTime: '5 min read',
          date: '1 day ago'
        },
        {
          title: 'The Importance of Tummy Time',
          subtitle: 'A guide to early motor development',
          readTime: '3 min read',
          date: '14 days ago'
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
        { title: 'Lanugo Fades', subtitle: 'Fine hair is mostly shed', icon: '✨' },
        { title: 'Organs Maturing', subtitle: 'All systems are almost ready for birth', icon: '🫀' },
        { title: 'Strong Movements', subtitle: 'Feeling powerful kicks and stretches', icon: '💪' }
      ],
      articles: [
        {
          title: 'Understanding Baby Cues: Crying, Fussing, and More',
          subtitle: 'Decoding your newborn\'s communication',
          readTime: '6 min read',
          date: '21 hours ago'
        },
        {
          title: 'Building a Strong Parent-Baby Bond',
          subtitle: 'Early interactions that make a difference',
          readTime: '7 min read',
          date: '9 days ago'
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
        { title: 'Gaining Fat', subtitle: 'Plumping up for birth', icon: '👶' },
        { title: 'Digestive System Ready', subtitle: 'Prepared for first feedings', icon: '🍎' },
        { title: 'Bones Soft & Firm', subtitle: 'Strong enough, yet flexible for birth', icon: '🦴' }
      ],
      articles: [
        {
          title: 'Car Seat Safety: What Every Parent Needs to Know',
          subtitle: 'Installing and using your car seat correctly',
          readTime: '5 min read',
          date: '1 day ago'
        },
        {
          title: 'Newborn Reflexes: What They Mean',
          subtitle: 'Understanding your baby\'s natural responses',
          readTime: '4 min read',
          date: '15 days ago'
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
        { title: 'Full-Term', subtitle: 'Considered full-term this week', icon: '✔️' },
        { title: 'Lungs Mature', subtitle: 'Ready to breathe independently', icon: '🫁' },
        { title: 'Strong Grasp Reflex', subtitle: 'Can hold onto fingers tightly', icon: '🤏' }
      ],
      articles: [
        {
          title: 'The Fourth Trimester: Caring for Yourself Postpartum',
          subtitle: 'Prioritizing your well-being after birth',
          readTime: '8 min read',
          date: '22 hours ago'
        },
        {
          title: 'Preparing Siblings for a New Baby',
          subtitle: 'Helping older children adjust',
          readTime: '6 min read',
          date: '10 days ago'
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
        { title: 'Smooth Skin', subtitle: 'Wrinkles disappear as fat increases', icon: '🧴' },
        { title: 'Plump Body', subtitle: 'Well-rounded and ready for birth', icon: '👶' },
        { title: 'Vernix Thickens', subtitle: 'Protective coating is abundant', icon: '✨' }
      ],
      articles: [
        {
          title: 'Induction of Labor: When and Why',
          subtitle: 'Understanding the process of labor induction',
          readTime: '7 min read',
          date: '1 day ago'
        },
        {
          title: 'The Golden Hour: First Moments After Birth',
          subtitle: 'Skin-to-skin contact and early bonding',
          readTime: '5 min read',
          date: '16 days ago'
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
        { title: 'Organs Complete', subtitle: 'All vital organs fully developed', icon: '🫀' },
        { title: 'Breathing Practice', subtitle: 'Refining breathing patterns', icon: '🌬️' },
        { title: 'Gripping Practice', subtitle: 'Strengthening hand grasp', icon: '🤏' }
      ],
      articles: [
        {
          title: 'Your Due Date Has Passed: What Now?',
          subtitle: 'Understanding post-term pregnancy',
          readTime: '4 min read',
          date: '23 hours ago'
        },
        {
          title: 'The First Week with Your Newborn',
          subtitle: 'Adjusting to life with a baby at home',
          readTime: '8 min read',
          date: '11 days ago'
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
        { title: 'Fully Developed', subtitle: 'All systems are go!', icon: '✅' },
        { title: 'Strong Reflexes', subtitle: 'Ready for life outside the womb', icon: '⚡' },
        { title: 'Ready for Birth', subtitle: 'Your little one is preparing to meet you!', icon: '👣' }
      ],
      articles: [
        {
          title: 'The First Feed: Latching and Nursing Tips',
          subtitle: 'Getting started with breastfeeding or bottle-feeding',
          readTime: '6 min read',
          date: '1 day ago'
        },
        {
          title: 'New Parent Survival Guide',
          subtitle: 'Tips for navigating the first few weeks with baby',
          readTime: '9 min read',
          date: '17 days ago'
        },
      ]
    }
  ];