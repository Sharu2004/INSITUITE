"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Clock, BarChart2, CheckCircle, ChevronDown, ChevronUp, ArrowRight, Search } from "lucide-react";
import { courses } from "@/lib/data";
import { FadeIn, SectionHeader } from "@/components/AnimationWrappers";

const categories = ["All", "Cloud", "DevOps", "Web Dev", "Mobile", "AI/ML", "Security"];

export default function CoursesClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-900 grid-pattern" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-600/10 blur-[100px] rounded-full" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <span className="badge">📚 All Programs</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find Your <span className="gradient-text">Perfect Course</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto"
          >
            {courses.length} industry-aligned programs to kick-start or accelerate your tech career.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-lg mx-auto"
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search courses, skills, technologies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12 text-sm"
            />
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="sticky top-[72px] z-30 py-4 px-4 border-b border-white/5 bg-dark-900/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brand-500 text-white glow-brand"
                    : "glass text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Course cards */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-slate-400 text-lg">No courses match your search.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-4 text-brand-400 hover:text-brand-300 text-sm font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {filtered.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass rounded-2xl border border-white/5 hover:border-brand-500/20 transition-all duration-300 overflow-hidden"
                >
                  {/* Collapsed header */}
                  <button
                    onClick={() => setExpandedId(expandedId === course.id ? null : course.id)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                          {course.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3
                              className="text-lg font-bold text-white truncate"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {course.title}
                            </h3>
                            <span className="badge text-xs flex-shrink-0">{course.category}</span>
                          </div>
                          <p className="text-slate-500 text-sm truncate">{course.subtitle}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                              <Clock size={12} />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                              <BarChart2 size={12} />
                              {course.level}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right hidden md:block">
                          <div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                            {course.price}
                          </div>
                          <div className="text-slate-600 text-sm line-through">{course.originalPrice}</div>
                        </div>
                        <div className="text-slate-500">
                          {expandedId === course.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {expandedId === course.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-white/5 pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Skills */}
                            <div>
                              <h4 className="text-white font-semibold text-sm mb-3">Skills You'll Learn</h4>
                              <div className="flex flex-wrap gap-2">
                                {course.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-3 py-1.5 rounded-lg text-xs text-slate-300 bg-white/5 border border-white/5 font-medium"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Highlights */}
                            <div>
                              <h4 className="text-white font-semibold text-sm mb-3">Course Highlights</h4>
                              <ul className="space-y-2">
                                {course.highlights.map((h) => (
                                  <li key={h} className="flex items-center gap-2 text-slate-400 text-sm">
                                    <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col justify-center items-start md:items-end gap-3">
                              <div className="md:text-right">
                                <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                                  {course.price}
                                </div>
                                <div className="text-slate-500 text-sm line-through">{course.originalPrice}</div>
                                <div className="text-green-400 text-xs font-semibold mt-1">
                                  Save ₹{(parseInt(course.originalPrice.replace(/[₹,]/g, "")) - parseInt(course.price.replace(/[₹,]/g, ""))).toLocaleString("en-IN")}
                                </div>
                              </div>
                              <Link
                                href={`/enquiry?course=${encodeURIComponent(course.title)}`}
                                className="btn-primary flex items-center gap-2 text-sm py-3 w-full md:w-auto justify-center"
                              >
                                Enroll in {course.title}
                                <ArrowRight size={16} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Bottom CTA */}
      <FadeIn className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-10 border border-white/5">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Not sure which course is right for you?
          </h3>
          <p className="text-slate-400 mb-6">
            Book a free 30-minute counselling session with our career advisors. We'll help you pick the perfect path.
          </p>
          <Link href="/enquiry" className="btn-primary inline-flex items-center gap-2">
            Get Free Counselling
            <ArrowRight size={16} />
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
