"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import { Registration } from "@/components/setup/registration";
import { Organization } from "@/components/setup/organization";
import { Training } from "@/components/setup/training";
import { Integration } from "@/components/setup/integration";
import { motion } from "framer-motion";

export default function Main() {
  const [step, setStep] = useState("registration");

  const steps = [
    { title: "Account", step: "registration" },
    { title: "Organization", step: "organization" },
    { title: "Training", step: "training" },
    { title: "Integration", step: "integration" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">BeyondChats</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12">
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <div className="absolute left-0 top-9 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
              <div
                className="absolute left-0 top-9 h-0.5 w-full -translate-y-1/2 bg-blue-600 transition-all duration-500"
                style={{
                  width: `${
                    ((steps.findIndex((s) => s.step === step) + 1) /
                      steps.length) *
                    100
                  }%`,
                }}
              />
              <div className="relative z-10 flex justify-between">
                {steps.map((s, i) => {
                  const isActive =
                    steps.findIndex((st) => st.step === step) >= i;
                  return (
                    <div
                      key={s.step}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                          isActive ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span
                        className={`text-sm ${
                          isActive ? "text-blue-600" : "text-gray-500"
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          {step === "registration" && (
            <Registration onComplete={() => setStep("organization")} />
          )}
          {step === "organization" && (
            <Organization onComplete={() => setStep("training")} />
          )}
          {step === "training" && (
            <Training onComplete={() => setStep("integration")} />
          )}
          {step === "integration" && <Integration />}
        </motion.div>
      </main>
    </div>
  );
}
