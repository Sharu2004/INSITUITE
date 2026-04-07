"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock, Send, Loader2,
  CheckCircle, AlertCircle, Twitter, Linkedin, Youtube, Instagram
} from "lucide-react";
import { FadeIn, SectionHeader } from "@/components/AnimationWrappers";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["42, Tech Park, Whitefield", "Bangalore, Karnataka – 560066"],
    color: "text-brand-400",
    bg: "bg-brand-500/10",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 98765 43210", "+91 80 2345 6789"],
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@nexusitacademy.com", "admissions@nexusitacademy.com"],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sun: 10:00 AM – 4:00 PM"],
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-400" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
];

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, course: "General Enquiry" }),
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

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-900 grid-pattern" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-purple-600/8 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-brand-600/8 blur-[100px] rounded-full" />

        <div className="relative max-w-7xl mx-auto">
          <SectionHeader
            badge="📍 Get In Touch"
            title={<>We'd Love to <span className="gradient-text">Hear From You</span></>}
            subtitle="Whether you have a question about our courses, pricing, or placement — our team is ready to answer."
          />

          {/* Contact info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                    <Icon size={20} className={item.color} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                  {item.lines.map((line) => (
                    <p key={line} className="text-slate-400 text-sm leading-relaxed">
                      {line}
                    </p>
                  ))}
                </motion.div>
              );
            })}
          </div>

          {/* Map + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <FadeIn direction="right">
              <div className="h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/5 relative">
                <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl ring-1 ring-white/5" />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.481506174413!2d77.74018!3d12.96840!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae132f4f0f3c5d%3A0x4bdf0d5fc4f0a5e9!2sWhitefield%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.8)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="min-h-[400px]"
                  title="NexusIT Academy Location"
                />
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn direction="left" delay={0.1}>
              <div className="glass-strong rounded-2xl p-8 border border-white/8">
                <h2
                  className="text-2xl font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Send Us a Message
                </h2>
                <p className="text-slate-500 text-sm mb-6">
                  We typically respond within 24 business hours.
                </p>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle size={28} className="text-green-400" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-slate-400 text-sm mb-6">
                        We'll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="btn-primary text-sm py-2.5"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
                          <input
                            {...register("name", { required: "Name is required" })}
                            placeholder="Your name"
                            className="input-field"
                          />
                          {errors.name && (
                            <p className="mt-1 text-red-400 text-xs flex items-center gap-1">
                              <AlertCircle size={11} /> {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                          <input
                            {...register("email", {
                              required: "Email is required",
                              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                            })}
                            type="email"
                            placeholder="you@example.com"
                            className="input-field"
                          />
                          {errors.email && (
                            <p className="mt-1 text-red-400 text-xs flex items-center gap-1">
                              <AlertCircle size={11} /> {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Subject *</label>
                        <input
                          {...register("subject", { required: "Subject is required" })}
                          placeholder="e.g. Course enquiry, Batch schedule..."
                          className="input-field"
                        />
                        {errors.subject && (
                          <p className="mt-1 text-red-400 text-xs flex items-center gap-1">
                            <AlertCircle size={11} /> {errors.subject.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Message *</label>
                        <textarea
                          {...register("message", {
                            required: "Message is required",
                            minLength: { value: 20, message: "Message must be at least 20 characters" },
                          })}
                          rows={5}
                          placeholder="Write your message here..."
                          className="input-field resize-none"
                        />
                        {errors.message && (
                          <p className="mt-1 text-red-400 text-xs flex items-center gap-1">
                            <AlertCircle size={11} /> {errors.message.message}
                          </p>
                        )}
                      </div>

                      <AnimatePresence>
                        {status === "error" && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                          >
                            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                            <span>{errorMessage}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? (
                          <><Loader2 size={18} className="animate-spin" /> Sending...</>
                        ) : (
                          <><Send size={18} /> Send Message</>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>

          {/* Social + Bottom CTA */}
          <FadeIn className="mt-16 text-center">
            <p className="text-slate-500 text-sm mb-4">Follow us on social media for updates & offers</p>
            <div className="flex justify-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 rounded-xl glass border border-white/5 flex items-center justify-center text-slate-500 ${color} transition-colors duration-300`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
