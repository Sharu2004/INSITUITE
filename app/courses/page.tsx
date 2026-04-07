import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore our industry-aligned IT courses in AWS, DevOps, Full Stack, Android, Data Science, and Cybersecurity.",
};

export default function CoursesPage() {
  return <CoursesClient />;
}
