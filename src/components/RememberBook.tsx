"use client";

import { useEffect } from "react";
import { rememberBook } from "@/lib/last-book";

export default function RememberBook({ slug }: { slug: string }) {
  useEffect(() => rememberBook(slug), [slug]);
  return null;
}
