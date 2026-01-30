"use client";

import dynamic from "next/dynamic";

const Terminal = dynamic(
  () => import("@/components/Terminal").then((mod) => mod.Terminal),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-black rounded-lg border border-gray-800 animate-pulse" />
    ),
  },
);

export default function PlaygroundPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Playground</h1>
          <p className="text-gray-400">
            Try out ParseArger directly in your browser. Generate bash scripts,
            documentation, and more.
          </p>
        </div>

        <Terminal />

        <div className="text-sm text-gray-500">
          <p>Tips:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              Run <code>generate --help</code> to see all available options.
            </li>
            <li>Generated scripts run in a virtual environment.</li>
            <li>
              Use the <strong>Download Output</strong> button to save your
              generated scripts.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
