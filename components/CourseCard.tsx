"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, BarChart2, ChevronRight, Tag } from "lucide-react";
import { Course } from "@/lib/data";

interface CourseCardProps {
  course: Course;
  index?: number;
  compact?: boolean;
}

export default function CourseCard({ course, index = 0, compact = false }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="relative h-full rounded-2xl overflow-hidden glass border border-white/5 hover:border-brand-500/30 transition-all duration-500">
        {/* Gradient top bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${course.color.replace("/20", "").replace("/10", "")}`} />

        {/* Glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-30`} />
        </div>

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="text-4xl mb-1">{course.icon}</div>
            <span className="badge text-xs">{course.category}</span>
          </div>

          <h3
            className="text-xl font-bold text-white mb-1 group-hover:text-brand-300 transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {course.title}
          </h3>
          <p className="text-slate-500 text-sm mb-4">{course.subtitle}</p>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Clock size={13} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <BarChart2 size={13} />
              <span>{course.level}</span>
            </div>
          </div>

          {/* Skills */}
          {!compact && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {course.skills.slice(0, 6).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg text-xs text-slate-400 bg-white/5 border border-white/5"
                >
                  {skill}
                </span>
              ))}
              {course.skills.length > 6 && (
                <span className="px-2.5 py-1 rounded-lg text-xs text-slate-500 bg-white/5 border border-white/5">
                  +{course.skills.length - 6} more
                </span>
              )}
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <div>
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {course.price}
              </span>
              <span className="text-slate-600 text-sm line-through ml-2">{course.originalPrice}</span>
            </div>
            <Link
              href="/enquiry"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500/20 border border-brand-500/30 text-brand-400 text-sm font-semibold hover:bg-brand-500/30 hover:text-white transition-all duration-300 group/btn"
            >
              Enroll
              <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
