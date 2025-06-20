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
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops',
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' },
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago',
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago',
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago',
        },
      ],
    },
    {
      week: 2,
      title: 'Your Little Watermelon – Week 2',
      size: '~1.2 mm',
      weight: 'Less than 1g',
      visualText: 'Cute\nWatermelon\nVisuals',
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops',
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' },
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago',
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago',
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago',
        },
      ],
    },
    {
      week: 3,
      title: 'Your Little Watermelon – Week 3',
      size: '~1.2 mm',
      weight: 'Less than 1g',
      visualText: 'Cute\nWatermelon\nVisuals',
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops',
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' },
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago',
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago',
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago',
        },
      ],
    },
    {
      week: 4,
      title: 'Your Little Watermelon – Week 4',
      size: '~1.2 mm',
      weight: 'Less than 1g',
      visualText: 'Cute\nWatermelon\nVisuals',
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops',
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' },
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago',
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago',
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago',
        },
      ],
    },
    {
      week: 5,
      title: 'Your Little Watermelon – Week 5',
      size: '~1.2 mm',
      weight: 'Less than 1g',
      visualText: 'Cute\nWatermelon\nVisuals',
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops',
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' },
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago',
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago',
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago',
        },
      ],
    },
    {
      week: 6,
      title: 'Your Little Watermelon – Week 6',
      size: '~1.2 mm',
      weight: 'Less than 1g',
      visualText: 'Cute\nWatermelon\nVisuals',
      footer: 'Growing Sweet: 35 Weeks to Go',
      description: 'Your baby is just a tiny watermelon seed this week — tucked in and starting to grow.',
      developments: [
        'Heart begins to beat',
        'Neural tube formation',
        'Basic brain structure develops',
      ],
      highlights: [
        { title: 'Heart Forms', subtitle: 'Primitive heart begins', icon: '❤️' },
        { title: 'Brain Growth', subtitle: 'Neural development', icon: '🧠' },
        { title: 'Eye Buds', subtitle: 'Vision development', icon: '👁️' },
        { title: 'Limb Buds', subtitle: 'Arms and legs form', icon: '✋' },
      ],
      articles: [
        {
          title: 'First Trimester Nutrition Guide',
          subtitle: 'Essential nutrients for early pregnancy',
          readTime: '5 min read',
          date: '2 hours ago',
        },
        {
          title: 'Managing Morning Sickness',
          subtitle: 'Tips to cope with early pregnancy symptoms',
          readTime: '3 min read',
          date: '1 day ago',
        },
        {
          title: 'Safe Exercises During Pregnancy',
          subtitle: 'Stay active safely throughout your pregnancy',
          readTime: '7 min read',
          date: '2 days ago',
        },
      ],
    },
  ];
  