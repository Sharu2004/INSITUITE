export interface Course {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  level: string;
  price: string;
  originalPrice: string;
  icon: string;
  color: string;
  skills: string[];
  highlights: string[];
  category: string;
}

export const courses: Course[] = [
  {
    id: "aws-cloud",
    title: "AWS Cloud Architect",
    subtitle: "Amazon Web Services Certification",
    duration: "3 Months",
    level: "Beginner to Advanced",
    price: "₹24,999",
    originalPrice: "₹39,999",
    icon: "☁️",
    color: "from-orange-500/20 to-amber-500/10",
    category: "Cloud",
    skills: ["EC2", "S3", "Lambda", "RDS", "VPC", "CloudFormation", "IAM", "EKS"],
    highlights: ["AWS Certified Solutions Architect prep", "Hands-on labs", "Live projects", "Mock exams"],
  },
  {
    id: "devops",
    title: "DevOps Engineering",
    subtitle: "CI/CD & Infrastructure Automation",
    duration: "4 Months",
    level: "Intermediate",
    price: "₹29,999",
    originalPrice: "₹49,999",
    icon: "⚙️",
    color: "from-brand-500/20 to-purple-500/10",
    category: "DevOps",
    skills: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible", "GitLab CI", "Prometheus", "Grafana"],
    highlights: ["Real pipeline projects", "K8s cluster setup", "Monitoring & alerting", "Industry mentors"],
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    subtitle: "MERN + Next.js + TypeScript",
    duration: "6 Months",
    level: "Beginner to Advanced",
    price: "₹34,999",
    originalPrice: "₹59,999",
    icon: "💻",
    color: "from-cyan-500/20 to-teal-500/10",
    category: "Web Dev",
    skills: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "PostgreSQL", "REST APIs", "GraphQL"],
    highlights: ["5+ portfolio projects", "Job placement support", "1-on-1 mentoring", "Interview prep"],
  },
  {
    id: "android",
    title: "Android Development",
    subtitle: "Kotlin & Jetpack Compose",
    duration: "4 Months",
    level: "Beginner to Advanced",
    price: "₹26,999",
    originalPrice: "₹44,999",
    icon: "📱",
    color: "from-green-500/20 to-emerald-500/10",
    category: "Mobile",
    skills: ["Kotlin", "Jetpack Compose", "MVVM", "Retrofit", "Room DB", "Firebase", "Play Store", "Coroutines"],
    highlights: ["Publish your own app", "Google Play deployment", "Real-world projects", "Career support"],
  },
  {
    id: "data-science",
    title: "Data Science & ML",
    subtitle: "Python, ML & AI Applications",
    duration: "5 Months",
    level: "Intermediate",
    price: "₹32,999",
    originalPrice: "₹54,999",
    icon: "🤖",
    color: "from-pink-500/20 to-rose-500/10",
    category: "AI/ML",
    skills: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "NLP", "Computer Vision", "SQL", "Tableau"],
    highlights: ["Kaggle competitions", "ML model deployment", "Industry datasets", "Placement drive"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Ethical Hacking",
    subtitle: "CEH + Security+ Preparation",
    duration: "3 Months",
    level: "Intermediate",
    price: "₹27,999",
    originalPrice: "₹45,999",
    icon: "🔐",
    color: "from-red-500/20 to-rose-500/10",
    category: "Security",
    skills: ["Penetration Testing", "Kali Linux", "OWASP", "Metasploit", "Wireshark", "SIEM", "SOC", "Forensics"],
    highlights: ["CEH certification prep", "Virtual lab environment", "Bug bounty training", "CTF challenges"],
  },
];

export const testimonials = [
  {
    name: "Arjun Sharma",
    role: "DevOps Engineer",
    company: "Infosys",
    avatar: "AS",
    color: "from-brand-500 to-purple-500",
    rating: 5,
    text: "NexusIT transformed my career completely. The DevOps course was hands-on and practical. Within 2 months of completing, I landed a role at Infosys with a 3x salary hike.",
  },
  {
    name: "Priya Nair",
    role: "Full Stack Developer",
    company: "Zoho",
    avatar: "PN",
    color: "from-cyan-500 to-teal-500",
    rating: 5,
    text: "The MERN stack course curriculum is incredible. Real projects, live code reviews, and the mentors genuinely care about your growth. Got placed at Zoho before even completing the course!",
  },
  {
    name: "Karthik Raj",
    role: "AWS Solutions Architect",
    company: "TCS",
    avatar: "KR",
    color: "from-orange-500 to-amber-500",
    rating: 5,
    text: "Cleared AWS SAA-C03 on first attempt. The mock exams and hands-on labs were exactly what I needed. The instructors are AWS certified professionals — it really shows in the quality.",
  },
  {
    name: "Deepa Menon",
    role: "Android Developer",
    company: "Freshworks",
    avatar: "DM",
    color: "from-green-500 to-emerald-500",
    rating: 5,
    text: "Best investment of my life. From zero coding knowledge to publishing my first app on Play Store in 4 months. The Kotlin and Jetpack Compose content is top-notch.",
  },
  {
    name: "Vikram Iyer",
    role: "Data Scientist",
    company: "MuSigma",
    avatar: "VI",
    color: "from-pink-500 to-rose-500",
    rating: 5,
    text: "The ML curriculum is comprehensive and up-to-date. The instructors pushed me to compete on Kaggle and I finished in the top 10% of my first competition. Amazing experience!",
  },
  {
    name: "Sneha Krishnan",
    role: "Security Analyst",
    company: "HCL",
    avatar: "SK",
    color: "from-red-500 to-orange-500",
    rating: 5,
    text: "The cybersecurity course gave me real-world pentesting skills. The virtual lab environment is fantastic. Got my CEH cert and a 60% salary jump. Highly recommend NexusIT!",
  },
];

export const stats = [
  { value: "10,000+", label: "Students Trained" },
  { value: "95%", label: "Placement Rate" },
  { value: "200+", label: "Hiring Partners" },
  { value: "15+", label: "Industry Experts" },
];

export const whyChooseUs = [
  {
    icon: "🎯",
    title: "Industry-Aligned Curriculum",
    desc: "Courses designed with input from top tech companies. Learn exactly what employers need in 2024.",
  },
  {
    icon: "🧑‍💻",
    title: "Live Project Training",
    desc: "Build real portfolio projects, not toy apps. Deploy to production and impress any interviewer.",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Instructors",
    desc: "Learn from certified professionals with 10+ years of industry experience at FAANG and top MNCs.",
  },
  {
    icon: "💼",
    title: "Placement Guarantee",
    desc: "95% placement rate with 200+ hiring partners. We don't rest until you land your dream job.",
  },
  {
    icon: "🎓",
    title: "Globally Recognized Certificates",
    desc: "Our certifications are recognized by top MNCs. Pair with AWS, Google, or Microsoft cert prep.",
  },
  {
    icon: "🔄",
    title: "Lifetime Access & Updates",
    desc: "Pay once, learn forever. Get lifetime access to course materials and all future curriculum updates.",
  },
];
