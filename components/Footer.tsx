"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Mail, Phone, MapPin, Twitter, Linkedin, Youtube, Github, Instagram } from "lucide-react";

const footerLinks = {
  Courses: [
    { label: "AWS Cloud", href: "/courses" },
    { label: "DevOps Engineering", href: "/courses" },
    { label: "Full Stack Dev", href: "/courses" },
    { label: "Android Dev", href: "/courses" },
    { label: "Data Science", href: "/courses" },
    { label: "Cybersecurity", href: "/courses" },
  ],
  Company: [
    { label: "About Us", href: "/" },
    { label: "Our Team", href: "/" },
    { label: "Placement Cell", href: "/" },
    { label: "Testimonials", href: "/" },
    { label: "Blog", href: "/" },
    { label: "Careers", href: "/" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Enquiry Form", href: "/enquiry" },
    { label: "FAQ", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
    { label: "Refund Policy", href: "/" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900 grid-pattern opacity-50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-600/10 blur-[100px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center glow-brand">
                <Zap size={20} className="text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  NexusIT
                </span>
                <span className="text-[10px] font-semibold text-brand-400 tracking-[0.2em] uppercase -mt-0.5">
                  Academy
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering the next generation of tech professionals with industry-aligned training, expert mentorship, and guaranteed placement support.
            </p>
            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: MapPin, text: "42, Tech Park, Whitefield, Bangalore – 560066" },
                { icon: Phone, text: "+91 98765 43210" },
                { icon: Mail, text: "hello@nexusitacademy.com" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={13} className="text-brand-400" />
                  </div>
                  <span className="text-slate-400 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-500 text-sm hover:text-brand-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-white font-semibold mb-1">Stay in the loop</h4>
            <p className="text-slate-400 text-sm">Get the latest courses, offers & tech insights.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1 md:w-72 text-sm py-3"
            />
            <button className="btn-primary text-sm py-3 px-6 whitespace-nowrap">Subscribe</button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} NexusIT Academy. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-white hover:border-brand-500/50 transition-colors duration-300"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
