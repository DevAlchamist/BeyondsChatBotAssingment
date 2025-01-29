import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Loader2 } from "lucide-react";

export function Organization({ onComplete }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleFetchMetadata = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setDescription(
      "An AI-powered chatbot platform helping businesses automate customer support."
    );
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Set up your organization
        </h2>
        <p className="mt-2 text-gray-600">
          Tell us about your business to personalize your chatbot
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onComplete();
        }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <Input placeholder="Company Name" required />

          <div className="relative">
            <Input
              placeholder="Company Website URL"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {url && (
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleFetchMetadata}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Globe className="h-4 w-4" />
                )}
                <span className="ml-2">Fetch metadata</span>
              </Button>
            )}
          </div>

          <textarea
            className="min-h-[100px] w-full rounded-lg border border-gray-200 p-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            placeholder="Company Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </motion.div>
  );
}
