// Sample data for testing the Admin Portal
export const initializeSampleData = () => {
  // AI Tools Sample Data
  if (!localStorage.getItem('admin_tools')) {
    const sampleTools = [
      {
        id: '1',
        name: 'ChatGPT',
        tagline: 'Conversational AI assistant for various tasks',
        companyName: 'OpenAI',
        categories: ['AI Assistant', 'Natural Language'],
        rating: 4.8,
        usersCount: 100000,
        authorBy: 'OpenAI Team',
        toolUrl: 'https://chat.openai.com',
        bannerImage: 'https://via.placeholder.com/800x400',
        overview: 'Advanced AI chatbot for conversations and assistance',
        description: 'ChatGPT is a large language model trained by OpenAI...',
        features: ['Natural conversations', 'Code generation', 'Writing assistance'],
        isActive: true
      },
      {
        id: '2',
        name: 'Midjourney',
        tagline: 'AI-powered image generation tool',
        companyName: 'Midjourney Inc',
        categories: ['Image Generation', 'Creative AI'],
        rating: 4.6,
        usersCount: 50000,
        authorBy: 'Midjourney Team',
        toolUrl: 'https://midjourney.com',
        bannerImage: 'https://via.placeholder.com/800x400',
        overview: 'Create stunning AI-generated artwork and images',
        description: 'Midjourney is an independent research lab...',
        features: ['High-quality images', 'Various art styles', 'Discord integration'],
        isActive: true
      }
    ];
    localStorage.setItem('admin_tools', JSON.stringify(sampleTools));
  }

  // ChatGPT Prompts Sample Data
  if (!localStorage.getItem('admin_prompts')) {
    const samplePrompts = [
      {
        id: '1',
        name: 'Email Marketing Assistant',
        tagline: 'Create compelling email campaigns',
        categories: ['Marketing', 'Email'],
        rating: 4.7,
        authorBy: 'Marketing Pro',
        bannerImage: 'https://via.placeholder.com/800x400',
        overview: 'Generate effective email marketing content',
        promptTemplate: 'Create an email marketing campaign for [PRODUCT] targeting [AUDIENCE]...',
        useCases: ['Product launches', 'Newsletter content', 'Sales emails'],
        isActive: true
      }
    ];
    localStorage.setItem('admin_prompts', JSON.stringify(samplePrompts));
  }

  // AI Articles Sample Data
  if (!localStorage.getItem('admin_articles')) {
    const sampleArticles = [
      {
        id: '1',
        name: 'The Future of AI in Business',
        tagline: 'How AI is transforming modern enterprises',
        categories: ['Business', 'AI Technology'],
        rating: 4.9,
        readtime: 8,
        authorBy: 'Tech Writer',
        bannerImage: 'https://via.placeholder.com/800x400',
        overview: 'Comprehensive analysis of AI adoption in business',
        description: 'Artificial Intelligence is revolutionizing how businesses operate...',
        isActive: true
      }
    ];
    localStorage.setItem('admin_articles', JSON.stringify(sampleArticles));
  }
};