import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code2, Mail, MessageSquare, Share2, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

const INTEGRATION_CODE = `<script>
  window.BEYONDCHATS_CONFIG = {
    botId: 'your-bot-id',
    theme: 'light'
  };
</script>
<script src="https://cdn.beyondchats.ai/widget.js" async></script>`;

export function Integration() {
  const [status, setStatus] = useState("options");
  const [showCode, setShowCode] = useState(false);

  const handleSuccess = () => {
    setStatus("success");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {status === "success"
            ? "Congratulations! 🎉"
            : "Integration & Testing"}
        </h2>
        <p className="mt-2 text-gray-600">
          {status === "success"
            ? "Your chatbot is now live and ready to help your customers"
            : "Let's get your chatbot up and running on your website"}
        </p>
      </div>

      {status === "options" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Button
            variant="outline"
            className="h-auto flex-col gap-4 p-6 text-left"
            onClick={() => setShowCode(true)}
          >
            <Code2 className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold">Developer Integration</h3>
              <p className="text-sm text-gray-600">
                Add a simple code snippet to your website
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col gap-4 p-6 text-left"
            onClick={() => setShowCode(true)}
          >
            <Mail className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold">Email Instructions</h3>
              <p className="text-sm text-gray-600">
                Send integration steps to your developer
              </p>
            </div>
          </Button>
        </div>
      )}

      {showCode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-4 rounded-lg bg-gray-900 p-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Add to your website's <code>&lt;head&gt;</code>
            </h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigator.clipboard.writeText(INTEGRATION_CODE)}
            >
              Copy code
            </Button>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-gray-300">
            {INTEGRATION_CODE}
          </pre>
        </motion.div>
      )}

      {(showCode || status === "testing") && (
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => setStatus("testing")}>
            Test Integration
          </Button>
          <Button onClick={handleSuccess}>Verify Installation</Button>
        </div>
      )}

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="flex justify-center">
            <Trophy className="h-24 w-24 text-yellow-500" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Start Chatting
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share Success
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
