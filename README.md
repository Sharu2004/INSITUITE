# ⚡ NexusIT Academy — IT Training Institute Website

A production-ready, fully animated website for an IT training institute built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Nodemailer**.

---

## ✨ Features

- **4 Full Pages**: Home, Courses, Enquiry, Contact
- **Animated UI**: Framer Motion scroll animations, hover effects, page transitions
- **Email System**: Nodemailer sends admin notifications + student auto-replies
- **Form Validation**: react-hook-form with real-time validation
- **Glassmorphism Design**: Modern dark theme with gradients and blur effects
- **Fully Responsive**: Mobile-first design, works on all screen sizes
- **SEO Optimized**: Metadata API, semantic HTML
- **TypeScript**: Fully typed codebase
- **Performance**: Image optimization, code splitting, lazy loading

---

## 📁 Folder Structure

```
it-institute/
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles + utility classes
│   ├── loading.tsx             # Loading skeleton
│   ├── not-found.tsx           # 404 page
│   ├── api/
│   │   └── enquiry/
│   │       └── route.ts        # Nodemailer API endpoint
│   ├── courses/
│   │   ├── page.tsx            # Courses page (server)
│   │   └── CoursesClient.tsx   # Courses page (client)
│   ├── enquiry/
│   │   ├── page.tsx            # Enquiry page (server)
│   │   └── EnquiryClient.tsx   # Enquiry form (client)
│   └── contact/
│       ├── page.tsx            # Contact page (server)
│       └── ContactClient.tsx   # Contact page (client)
├── components/
│   ├── Navbar.tsx              # Sticky animated navbar
│   ├── Footer.tsx              # Footer with links & newsletter
│   ├── CourseCard.tsx          # Reusable course card
│   └── AnimationWrappers.tsx   # FadeIn, StaggerContainer, SectionHeader
├── lib/
│   └── data.ts                 # All static data (courses, testimonials, etc.)
├── .env.example                # Environment variables template
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your SMTP credentials (see below).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 📬 Email Setup (Nodemailer)

The enquiry form sends emails via your SMTP server. The easiest option is **Gmail + App Password**.

### Gmail Setup (Recommended)

1. Enable 2-Factor Authentication on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Generate an App Password for "Mail"
4. Copy the 16-character password

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx   # 16-char app password
SMTP_FROM="NexusIT Academy <your-gmail@gmail.com>"
ADMIN_EMAIL=admin@nexusitacademy.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Development Mode (No Email)

If `SMTP_USER` / `SMTP_PASS` are not set, the API logs the email details to the console and returns a success response — so you can develop without real SMTP credentials.

### Alternative SMTP Providers

| Provider | Host | Port |
|----------|------|------|
| Gmail | smtp.gmail.com | 587 |
| SendGrid | smtp.sendgrid.net | 587 |
| Mailgun | smtp.mailgun.org | 587 |
| Outlook | smtp-mail.outlook.com | 587 |
| AWS SES | email-smtp.us-east-1.amazonaws.com | 587 |

---

## 🎨 Design System

### Colors
- **Brand**: `#6272f7` (indigo/blue)
- **Accent**: `#f97316` (orange)
- **Background**: `#080b14` (near-black)
- **Glass**: `rgba(255,255,255,0.04)` with `backdrop-filter: blur(12px)`

### Typography
- **Display**: Syne (headings, logos)
- **Body**: DM Sans (body text)
- **Mono**: JetBrains Mono (code)

### Key CSS Utilities
```css
.glass          /* Glassmorphism card */
.glass-strong   /* Stronger glass effect */
.gradient-text  /* Purple-to-orange gradient text */
.glow-brand     /* Blue glow shadow */
.grid-pattern   /* Subtle dot grid background */
.btn-primary    /* Primary CTA button */
.btn-outline    /* Outline button */
.input-field    /* Form input style */
.badge          /* Small pill badge */
```

---

## 📄 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, courses preview, why us, testimonials, CTA |
| Courses | `/courses` | Searchable, filterable course list with expandable details |
| Enquiry | `/enquiry` | Form with validation, sends email to admin + auto-reply to user |
| Contact | `/contact` | Address, map, social links, contact form |

---

## 🔧 Customization

### Change Institute Name & Details
Edit `lib/data.ts` to update courses, testimonials, stats.
Update contact details in `app/contact/ContactClient.tsx` and `components/Footer.tsx`.

### Add New Courses
Add entries to the `courses` array in `lib/data.ts`:
```ts
{
  id: "my-course",
  title: "My Course Title",
  subtitle: "Course subtitle",
  duration: "3 Months",
  level: "Beginner",
  price: "₹19,999",
  originalPrice: "₹29,999",
  icon: "🚀",
  color: "from-blue-500/20 to-cyan-500/10",
  category: "Cloud",
  skills: ["Skill 1", "Skill 2"],
  highlights: ["Highlight 1", "Highlight 2"],
}
```

### Change Colors
Edit `tailwind.config.ts` to update the `brand` and `accent` color scales.

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

Add environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Other Platforms
- **Railway**: Connect GitHub repo, add env vars, deploy
- **Render**: Create a Web Service, set build command `npm run build`, start command `npm start`
- **Docker**: Add a `Dockerfile` with Node 20 alpine base

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `next` | Framework (App Router) |
| `framer-motion` | Animations & transitions |
| `nodemailer` | Server-side email sending |
| `react-hook-form` | Form state & validation |
| `lucide-react` | Icon library |
| `tailwindcss` | Utility CSS framework |

---

## 🤝 Contributing

Feel free to fork this project and customize it for your institute. Pull requests are welcome!

---

## 📄 License

MIT License — free to use for personal and commercial projects.

---

Built with ❤️ by NexusIT Academy
