import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleLeft as Google, Mail } from "lucide-react";

export function Registration({ onComplete }) {
  const [step, setStep] = useState("initial");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === "initial") {
      setStep("verification");
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {step === "initial" ? "Create your account" : "Verify your email"}
        </h2>
        <p className="mt-2 text-gray-600">
          {step === "initial"
            ? "Start setting up your AI chatbot in minutes"
            : "Enter the verification code sent to your email"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === "initial" ? (
          <>
            <div className="space-y-4">
              <Input placeholder="Full Name" required autoComplete="name" />
              <Input
                type="email"
                placeholder="Email address"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-4">
              <Button type="submit" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Continue with Email
              </Button>

              <Button type="button" variant="outline" className="w-full">
                <Google className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <Input
              placeholder="Enter verification code"
              required
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
            <Button type="submit" className="w-full">
              Verify Email
            </Button>
          </div>
        )}
      </form>
    </motion.div>
  );
}
