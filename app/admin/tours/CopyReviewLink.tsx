"use client";

import { useState } from "react";

type CopyReviewLinkProps = {
  slug: string;
};

export default function CopyReviewLink({ slug }: CopyReviewLinkProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/tours/${encodeURIComponent(slug)}#write-review`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-900 transition hover:border-blue-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
      aria-label={copied ? "Review link copied" : "Copy direct review link"}
    >
      {copied ? "Copied!" : "Copy Review Link"}
    </button>
  );
}
