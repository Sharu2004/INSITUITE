"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle, AlertCircle, Send, Loader2, User, Mail, Phone, BookOpen, MessageSquare } from "lucide-react";
import { courses } from "@/lib/data";
import { FadeIn } from "@/components/AnimationWrappers";

interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

function EnquiryForm() {
  const searchParams = useSearchParams();
  const defaultCourse = searchParams.get("course") || "";

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { course: defaultCourse },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Something went wrong");
      setStatus("success");
      reset();
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-12 text-center border border-green-500/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={36} className="text-green-400" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Enquiry Submitted! 🎉
        </h3>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Thank you for reaching out! Our career advisors will contact you within 24 hours to discuss the best options for you.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-primary"
        >
          Submit Another Enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          <span className="flex items-center gap-2"><User size={14} /> Full Name *</span>
        </label>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" },
          })}
          placeholder="e.g. Arjun Sharma"
          className="input-field"
        />
        {errors.name && (
          <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
            <AlertCircle size={12} /> {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          <span className="flex items-center gap-2"><Mail size={14} /> Email Address *</span>
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
          })}
          type="email"
          placeholder="you@example.com"
          className="input-field"
        />
        {errors.email && (
          <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
            <AlertCircle size={12} /> {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          <span className="flex items-center gap-2"><Phone size={14} /> Phone Number *</span>
        </label>
        <input
          {...register("phone", {
            required: "Phone number is required",
            pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit Indian mobile number" },
          })}
          type="tel"
          placeholder="98765 43210"
          className="input-field"
        />
        {errors.phone && (
          <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
            <AlertCircle size={12} /> {errors.phone.message}
          </p>
        )}
      </div>

      {/* Course */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          <span className="flex items-center gap-2"><BookOpen size={14} /> Course Interested In *</span>
        </label>
        <select
          {...register("course", { required: "Please select a course" })}
          className="input-field"
        >
          <option value="">Select a course...</option>
          {courses.map((c) => (
            <option key={c.id} value={c.title}>
              {c.title} — {c.duration}
            </option>
          ))}
          <option value="Not decided yet">Not decided yet (need guidance)</option>
        </select>
        {errors.course && (
          <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
            <AlertCircle size={12} /> {errors.course.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          <span className="flex items-center gap-2"><MessageSquare size={14} /> Message (Optional)</span>
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us about your background, goals, or any questions you have..."
          className="input-field resize-none"
        />
      </div>

      {/* Error alert */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          >
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending Enquiry...
          </>
        ) : (
          <>
            <Send size={18} />
            Submit Enquiry
          </>
        )}
      </button>

      <p className="text-center text-slate-600 text-xs">
        By submitting, you agree to our{" "}
        <a href="#" className="text-brand-400 hover:underline">Privacy Policy</a>.
        We'll respond within 24 hours.
      </p>
    </form>
  );
}

export default function EnquiryClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-900 grid-pattern" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-600/10 blur-[100px] rounded-full" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <FadeIn direction="right">
              <span className="badge mb-6 inline-flex">📬 Enquiry Form</span>
              <h1
                className="text-5xl font-extrabold text-white mb-5 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Start Your <span className="gradient-text">Tech Journey</span> Today
              </h1>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Fill in the form and our career advisors will get back to you within 24 hours with a personalised roadmap.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {[
                  { icon: "⚡", title: "Quick Response", desc: "Our team replies within 24 business hours" },
                  { icon: "🎯", title: "Free Career Counselling", desc: "30-min session to map out your learning path" },
                  { icon: "💰", title: "EMI & Scholarship Options", desc: "Flexible payment plans for every budget" },
                  { icon: "🏆", title: "100% Placement Assistance", desc: "We'll be with you until you land the job" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{item.title}</div>
                      <div className="text-slate-500 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Right — Form */}
            <FadeIn direction="left" delay={0.2}>
              <div className="glass-strong rounded-2xl p-8 border border-white/8 sticky top-24">
                <h2
                  className="text-xl font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Enquiry Form
                </h2>
                <p className="text-slate-500 text-sm mb-6">All fields marked with * are required.</p>

                <Suspense fallback={<div className="text-slate-500 text-sm">Loading form...</div>}>
                  <EnquiryForm />
                </Suspense>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
