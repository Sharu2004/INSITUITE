import type { Metadata } from "next";
import EnquiryClient from "./EnquiryClient";

export const metadata: Metadata = {
  title: "Enquiry",
  description: "Submit an enquiry to NexusIT Academy. Our team will get back to you within 24 hours.",
};

export default function EnquiryPage() {
  return <EnquiryClient />;
}
