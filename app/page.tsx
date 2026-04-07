"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Star, Users, Award, TrendingUp, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { courses, stats, testimonials, whyChooseUs } from "@/lib/data";
import CourseCard from "@/components/CourseCard";
import { FadeIn, StaggerContainer, staggerItem, SectionHeader } from "@/components/AnimationWrappers";

const floatingOrbs = [
  { size: 500, x: "-10%", y: "-20%", color: "rgba(98,114,247,0.12)", delay: 0 },
  { size: 400, x: "60%", y: "10%", color: "rgba(167,139,250,0.1)", delay: 1 },
  { size: 350, x: "20%", y: "60%", color: "rgba(249,115,22,0.07)", delay: 2 },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="overflow-hidden">
      {/* ──────────────────── HERO ──────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-dark-900 grid-pattern" />

        {/* Floating orbs */}
        {floatingOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[80px] pointer-events-none"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: orb.color,
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: orb.delay }}
          />
        ))}

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-slate-300 font-medium">
                🎉 New batch starting <span className="text-brand-400 font-semibold">Feb 1, 2025</span>
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-white">Build Skills.</span>
            <br />
            <span className="gradient-text text-glow">Land Your</span>
            <br />
            <span className="text-white">Dream Tech Job.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Industry-aligned courses in AWS, DevOps, Full Stack, Data Science & more. Trained by certified experts.{" "}
            <span className="text-white font-medium">95% placement rate.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/courses" className="btn-primary flex items-center justify-center gap-2 text-base">
              Explore Courses
              <ArrowRight size={18} />
            </Link>
            <Link href="/enquiry" className="btn-outline flex items-center justify-center gap-2 text-base">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Play size={12} className="text-white ml-0.5" />
              </div>
              Free Counselling
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-px"
          >
            <div className="glass rounded-2xl overflow-hidden flex">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`px-6 py-4 ${
                    i < stats.length - 1 ? "border-r border-white/5" : ""
                  }`}
                >
                  <div
                    className="text-2xl font-extrabold gradient-text-blue"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-600 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-brand-500/50 to-transparent"
            animate={{ scaleY: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ──────────────────── COURSES PREVIEW ──────────────────── */}
      <section className="section-pad relative">
        <div className="absolute inset-0 bg-dark-800/50" />
        <div className="relative max-w-7xl mx-auto">
          <SectionHeader
            badge="🚀 Popular Programs"
            title={<>Our <span className="gradient-text">Industry-Ready</span> Courses</>}
            subtitle="Handcrafted programs designed with Fortune 500 companies to give you the exact skills employers are hiring for."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <Link href="/courses" className="btn-outline inline-flex items-center gap-2">
              View All Courses & Pricing
              <ChevronRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ──────────────────── WHY CHOOSE US ──────────────────── */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-600/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <SectionHeader
            badge="💡 Why NexusIT"
            title={<>What Makes Us <span className="gradient-text">Different</span></>}
            subtitle="We don't just teach — we transform careers. Here's why 10,000+ students chose NexusIT Academy."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div key={item.title} variants={staggerItem}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="glass rounded-2xl p-6 h-full group hover:border-brand-500/30 transition-all duration-300 border border-white/5"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3
                    className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ──────────────────── TESTIMONIALS ──────────────────── */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-800/40" />
        <div className="relative max-w-7xl mx-auto">
          <SectionHeader
            badge="🌟 Success Stories"
            title={<>Students Who <span className="gradient-text">Made It Big</span></>}
            subtitle="Real stories from real students who transformed their careers with NexusIT Academy."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-5">"{t.text}"</p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">
                      {t.role} @ {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── HIRING PARTNERS ──────────────────── */}
      <section className="py-16 px-4 relative overflow-hidden border-y border-white/5">
        <FadeIn className="text-center mb-10">
          <span className="text-slate-600 text-sm tracking-widest uppercase font-semibold">
            Our students work at
          </span>
        </FadeIn>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 max-w-5xl mx-auto">
          {["Google", "Amazon", "Infosys", "TCS", "Wipro", "Zoho", "Freshworks", "HCL"].map((company, i) => (
            <motion.div
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.1 }}
              className="text-slate-600 hover:text-slate-300 transition-colors font-bold text-lg tracking-wide cursor-default"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {company}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ──────────────────── CTA BANNER ──────────────────── */}
      <section className="section-pad relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="animated-border">
              <div className="glass-strong rounded-2xl p-12 md:p-16">
                {/* Decorative orb */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-purple-500/10 rounded-2xl" />

                <div className="relative">
                  <div className="text-5xl mb-6">🚀</div>
                  <h2
                    className="text-4xl md:text-5xl font-extrabold text-white mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Ready to <span className="gradient-text">Level Up</span>?
                  </h2>
                  <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                    Join 10,000+ students who already transformed their careers. Next batch filling fast — secure your seat now.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/enquiry" className="btn-primary flex items-center justify-center gap-2 text-base">
                      Start Your Journey
                      <ArrowRight size={18} />
                    </Link>
                    <Link href="/contact" className="btn-outline flex items-center justify-center gap-2 text-base">
                      Talk to Counsellor
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
