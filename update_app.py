import sys
import re

file_path = r'd:\Projects\Portfolio\adi_resume\Portfolio\src\App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# PROFILE
profile_repl = '''const PROFILE = {
  name: "Aditya Patil",
  title: "AI Developer | Multi-Agent Orchestration | RL & Cognitive Architectures",
  summary:
    "Highly technical AI Developer & IEEE Student Branch Chair (2026) with a focus on Multi-Agent Orchestration, Reinforcement Learning, and Applied Cognitive Architectures. Proven track record of building production-ready AI environments and long-term memory systems.",
  location: "Belgaum, India",
  email: "adityavpatil818@gmail.com",
  phone: "+91 815284 5070",
  avatarUrl: "/Adi.webp", // User's photo in public folder
  initials: "AP",
  socials: [
    { name: "GitHub", icon: Github, url: "https://github.com/Nadex19-Adi" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/aditya-patil-77aab2352/",
    },
    { name: "Portfolio", icon: Globe, url: "#" },
  ],
};'''
content = re.sub(r'const PROFILE = \{.*?\n\};\n', profile_repl + '\n', content, flags=re.DOTALL)

# STATS
stats_repl = '''const STATS = [
  { label: "Systems Engineered", value: "12+" },
  { label: "Research Projects", value: "4" },
  { label: "AI Frameworks", value: "6+" },
  { label: "Publications", value: "2" },
];'''
content = re.sub(r'const STATS = \[.*?\];\n', stats_repl + '\n', content, flags=re.DOTALL)

# EXPERIENCE
experience_repl = '''const EXPERIENCE = [
  {
    role: "Chair",
    company: "IEEE Student Branch JCER",
    period: "2026 - 2027",
    location: "Belgaum",
    highlights: [
      "Leading the student branch for 2026 as the Chair.",
      "Organizing and managing technical activities, student life, and volunteer functions."
    ],
  },
  {
    role: "Technical Committee (Member)",
    company: "IEEE Bangalore Section SAC",
    period: "2026 - 2027",
    location: "Bangalore",
    highlights: [
      "Working as a volunteer in the technical committee, Students Association Committee (SAC) under IEEE Bangalore Section.",
      "Organizing and managing technical activities, student life, and volunteer functions throughout the region."
    ],
  },
  {
    role: "Co-Lead (Technical Committee)",
    company: "IEEE North Karnataka Sub-Section (NKSS)",
    period: "2025 - 2026",
    location: "North Karnataka",
    highlights: [
      "Worked as Co-Lead in the technical committee, Students Association Committee (SAC) under IEEE North Karnataka Subsection.",
      "Organized and managed technical activities, student life, and volunteer functions throughout the region."
    ],
  }
];'''
content = re.sub(r'const EXPERIENCE = \[.*?\];\n', experience_repl + '\n', content, flags=re.DOTALL)

# PROJECTS
projects_repl = '''const PROJECTS = [
  {
    name: "MemoryForm",
    tech: ["Python", "FastAPI", "Supabase", "React"],
    desc: "AI Long-Term Memory Engine solving LLM amnesia using integrated Sentence-Transformers and a custom weighted ranking algorithm.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 10,
    metrics: {
      "Architecture": "Multi-Agent",
      "Storage": "Hybrid PostgreSQL",
      "Embeddings": "all-MiniLM-L6-v2",
      "Features": "Recency & Confidence",
      "Status": "Production"
    }
  },
  {
    name: "Bhasha AI",
    tech: ["LangGraph", "LangChain", "Transformers"],
    desc: "Architected a 6-agent translation workflow that handles technical glossary injection, cultural adaptation, and sentiment alignment.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 12,
    metrics: {
      "Scale": "6-Agent Workflow",
      "Domain": "Localization",
      "Quality": "High-fidelity",
      "Status": "Production"
    }
  },
  {
    name: "SupportEnv",
    tech: ["FastAPI", "Stable Baselines3", "Gradio", "OpenEnv"],
    desc: "Built a production-grade Reinforcement Learning environment to train AI agents on high-stress support tickets.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 18,
    metrics: {
      "Type": "RL Environment",
      "Target": "Support Tickets",
      "Grader": "Sentiment & Accuracy",
      "Status": "Production"
    }
  },
  {
    name: "Disaster Management",
    tech: ["CrewAI", "Streamlit", "Transformers"],
    desc: "Multi-agent emergency orchestrator coordinating five specialized agents for incident triage and resource management.",
    image: "/disaster.png",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 15,
    metrics: {
      "Architecture": "5-Agent Crew",
      "NLP Focus": "Zero-shot RoBERTa",
      "Task": "Incident Triage",
      "Status": "Prototype"
    }
  },
  {
    name: "Cloud Cost Optimization",
    tech: ["Python", "ARIMA", "LSTM", "K-Means"],
    desc: "Hybrid cost-optimization engine that achieved a 28% reduction in cloud over-provisioning costs by accurately classifying machine workloads.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 15,
    metrics: {
      "Cost Focus": "28% Reduction",
      "Architecture": "Hybrid Engine",
      "Dataset": "Google Cluster Trace",
      "Status": "Research"
    }
  },
  {
    name: "Elevare Platform",
    tech: ["React", "Flask", "Gemini 2.5", "Supabase"],
    desc: "AI-driven job matching platform featuring an automated ATS scoring engine and domain-specific recommendations.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 20,
    metrics: {
      "Matching": "Domain-Specific",
      "Analysis": "Automated ATS",
      "Platform": "Vercel Hosted",
      "Status": "Production"
    }
  },
  {
    name: "Agri-Sethu (SIH)",
    tech: ["Streamlit", "Scikit", "MongoDB", "SoilGrids"],
    desc: "Smart crop recommendation system reducing fertilizer waste and improving yield prediction accuracy by 18%.",
    image: "/crop.png",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 15,
    metrics: {
      "Accuracy": "18% Improvement",
      "Geospatial": "ISRO Bhuvan Maps",
      "Database": "MongoDB",
      "Status": "Hackathon"
    }
  }
];'''
content = re.sub(r'const PROJECTS = \[.*?\];\n', projects_repl + '\n', content, flags=re.DOTALL)

# SKILL_CATEGORIES
skills_repl = '''const SKILL_CATEGORIES = [
  {
    title: "AI & ML Frameworks",
    skills: ["LangChain", "Transformers", "HuggingFace", "Scikit-Learn", "Reinforcement Learning", "CrewAI", "LangGraph"]
  },
  {
    title: "Languages",
    skills: ["Python", "SQL", "Bash", "C/C++", "TypeScript", "JavaScript"]
  },
  {
    title: "Full-Stack & Backend",
    skills: ["React 18", "Vite", "FastAPI", "Streamlit", "Node.js", "Supabase", "Flask", "Docker"]
  }
];'''
content = re.sub(r'const SKILL_CATEGORIES = \[.*?\];\n', skills_repl + '\n', content, flags=re.DOTALL)

# TECHNICAL_FOCUS
tech_repl = '''const TECHNICAL_FOCUS = [
  "Multi-Agent Orchestration & Cognitive Architectures",
  "Reinforcement Learning Environments (OpenEnv Specs)",
  "Full-Stack Development (React, FastAPI, Supabase)",
  "Research-Focused Optimization (Cost, Pathing, Classification)",
  "Leadership & Strategic Community Management",
];'''
content = re.sub(r'const TECHNICAL_FOCUS = \[.*?\];\n', tech_repl + '\n', content, flags=re.DOTALL)

# BIO_PARAGRAPHS
bio_repl = '''const BIO_PARAGRAPHS = [
  "I am a highly technical AI Developer focusing on Multi-Agent Orchestration, Reinforcement Learning, and Applied Cognitive Architectures. I build production-ready AI environments, such as SupportEnv, and design long-term memory systems for intelligent agents.",
  "In addition to my technical work, I actively serve as the IEEE Student Branch Chair (2026), leading technical committees and organizing regional activities across the North Karnataka and Bangalore Sections. My core expertise spans Python, React, FastAPI, and Supabase, empowering me to tackle everything from robust AI pipelines to full-stack web platforms.",
  "Whether I'm reducing cloud infrastructure costs by 28%, architecting complex 6-agent language translation pipelines, or leading technical communities, I prioritize execution, measurable performance, and real-world impact."
];'''
content = re.sub(r'const BIO_PARAGRAPHS = \[.*?\];\n', bio_repl + '\n', content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated App.tsx successfully.")
