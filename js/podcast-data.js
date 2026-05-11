const podcastData = [
  {
    id: 0, title: "The Future of AI Assistants", category: "technology",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    meta: "Technology · 2h 24min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    youtubeId: "L_Guz73e6fw",
    host: "Lex Fridman",
    date: "Mar 25, 2023",
    duration: "2h 24min",
    excerpt: "Sam Altman on GPT-4, ChatGPT, and the future of AI.",
    desc: "Sam Altman, CEO of OpenAI, sits down with Lex Fridman to discuss GPT-4, ChatGPT, DALL-E, AI safety, competition, and the road to AGI. A deep dive into the technology that's reshaping our world."
  },
  {
    id: 1, title: "Slow Living in a Fast World", category: "lifestyle",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    meta: "Lifestyle · 2h 38min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    youtubeId: "nDLb8_wgX50",
    host: "Andrew Huberman",
    date: "Jan 1, 2024",
    duration: "2h 38min",
    excerpt: "David Goggins on building discipline, inner strength, and resilience.",
    desc: "David Goggins, retired Navy SEAL and ultramarathoner, shares his philosophy on building mental toughness, embracing discomfort, and finding strength through adversity. A masterclass in human potential."
  },
  {
    id: 2, title: "Design Thinking at Scale", category: "design",
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
    meta: "Design · 41 min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    host: "Jordan Lee",
    date: "Mar 5, 2026",
    duration: "41 min",
    excerpt: "How large organizations implement human-centered design.",
    desc: "Jordan dives into the challenges and triumphs of scaling design thinking across enterprise organizations. Learn how design teams can maintain their creative edge while navigating corporate structures, stakeholder expectations, and the pressure to deliver measurable results."
  },
  {
    id: 3, title: "The Culture of Remote Work", category: "culture",
    img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    meta: "Culture · 35 min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    host: "Samira Khan",
    date: "Feb 28, 2026",
    duration: "35 min",
    excerpt: "Navigating identity and belonging in distributed teams.",
    desc: "Samira explores the cultural shifts driven by remote work, from changing notions of professionalism to the rise of digital-first communities. A deep look at how distributed teams build trust, foster creativity, and maintain human connection across screens."
  },
  {
    id: 4, title: "Deep Focus Habits", category: "productivity",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    meta: "Productivity · 22 min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    host: "Ryan O'Brien",
    date: "Feb 22, 2026",
    duration: "22 min",
    excerpt: "Mastering the art of concentrated work in a distracted age.",
    desc: "Ryan breaks down the science of deep work and shares practical frameworks for achieving flow state consistently. From environment design to attention management, this episode is a masterclass in doing your best work without burning out."
  },
  {
    id: 5, title: "The Art of Podcasting", category: "design",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    meta: "Design · 38 min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    host: "Jordan Lee",
    date: "Feb 16, 2026",
    duration: "38 min",
    excerpt: "Behind the scenes of creating a successful audio series.",
    desc: "Ever wondered what goes into producing a top-rated podcast? Jordan takes you behind the microphone to explore the craft of audio storytelling — from scripting and recording to editing and distribution. Essential listening for aspiring podcasters."
  },
  {
    id: 6, title: "Ethical Entrepreneurship", category: "technology",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    meta: "Technology · 29 min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    host: "Alex Chen",
    date: "Feb 10, 2026",
    duration: "29 min",
    excerpt: "Building a startup that balances profit and purpose.",
    desc: "Alex sits down with founders who are proving that ethical business isn't just possible — it's profitable. This episode tackles tough questions about sustainability, fair labor, transparent pricing, and how to build a company you're proud of."
  },
  {
    id: 7, title: "Culinary Adventures", category: "lifestyle",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
    meta: "Lifestyle · 42 min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    host: "Maya Patel",
    date: "Feb 4, 2026",
    duration: "42 min",
    excerpt: "Exploring global cuisines and the stories behind them.",
    desc: "Maya takes you on a culinary journey around the world, exploring how food shapes culture, identity, and memory. From street food in Bangkok to fine dining in Copenhagen, this episode is a feast for the ears and the imagination."
  },
  {
    id: 8, title: "Urban Planning Reimagined", category: "design",
    img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    meta: "Design · 31 min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    host: "Jordan Lee",
    date: "Jan 28, 2026",
    duration: "31 min",
    excerpt: "How cities are being designed for people, not cars.",
    desc: "Jordan explores the future of urban design, spotlighting cities around the world that are reimagining public spaces, transportation, and community living. Discover how thoughtful design can create happier, healthier, more connected communities."
  },
  {
    id: 9, title: "The Sound of Culture", category: "culture",
    img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
    meta: "Culture · 27 min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    host: "Samira Khan",
    date: "Jan 22, 2026",
    duration: "27 min",
    excerpt: "How music and podcasts are shaping modern culture.",
    desc: "Samira examines the powerful role of audio media in shaping contemporary culture. From algorithmic discovery to the renaissance of radio-style storytelling, this episode explores how sound is redefining entertainment, education, and community."
  },
  {
    id: 10, title: "Mindful Productivity", category: "productivity",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    meta: "Productivity · 25 min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    host: "Ryan O'Brien",
    date: "Jan 16, 2026",
    duration: "25 min",
    excerpt: "Combining mindfulness techniques with peak performance.",
    desc: "Ryan challenges the hustle culture narrative by introducing mindfulness as a productivity superpower. Learn how meditation, intentional breaks, and present-moment awareness can actually make you more effective, creative, and fulfilled at work."
  },
  {
    id: 11, title: "Green Technology Trends", category: "technology",
    img: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80",
    meta: "Technology · 33 min",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    host: "Alex Chen",
    date: "Jan 10, 2026",
    duration: "33 min",
    excerpt: "Innovations that are driving sustainability forward.",
    desc: "Alex explores the most exciting green technologies shaping our future — from carbon capture and vertical farming to next-generation solar and circular economy innovations. An optimistic look at how technology is helping heal the planet."
  }
];
