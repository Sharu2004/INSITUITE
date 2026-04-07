import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with NexusIT Academy. Visit us, call us, or send us a message.",
};

export default function ContactPage() {
  return <ContactClient />;
}
