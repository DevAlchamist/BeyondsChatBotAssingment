import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Loader2 } from "lucide-react";

const DUMMY_PAGES = [
  { url: "/about", status: "completed" },
  { url: "/features", status: "completed" },
  { url: "/pricing", status: "pending" },
  { url: "/contact", status: "scraping" },
  { url: "/blog/getting-started", status: "completed" },
];

const DUMMY_CHUNKS = [
  "BeyondChats is an AI-powered chatbot platform.",
  "Our mission is to help businesses automate customer support.",
  "We use advanced natural language processing.",
  "Available 24/7 to answer customer queries.",
];

export function Training({ onComplete }) {
  const [selectedPage, setSelectedPage] = useState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Training your chatbot
        </h2>
        <p className="mt-2 text-gray-600">
          We're analyzing your website content to train your AI chatbot
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Pages detected</h3>
          <div className="space-y-2">
            {DUMMY_PAGES.map((page) => (
              <button
                key={page.url}
                onClick={() => setSelectedPage(page.url)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <span className="text-sm">{page.url}</span>
                {page.status === "completed" && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {page.status === "pending" && (
                  <Clock className="h-5 w-5 text-gray-400" />
                )}
                {page.status === "scraping" && (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">
            {selectedPage
              ? `Content from ${selectedPage}`
              : "Select a page to view content"}
          </h3>
          {selectedPage ? (
            <div className="space-y-2">
              {DUMMY_CHUNKS.map((chunk, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 p-4 text-sm text-gray-600"
                >
                  {chunk}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 p-8 text-center text-gray-500">
              Click on a page to view extracted content
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{progress}% complete</span>
          <span>
            Estimated time: {Math.ceil((100 - progress) / 10)} minutes
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={onComplete} className="px-8" disabled={progress < 30}>
          Continue to Integration
        </Button>
      </div>
    </motion.div>
  );
}
