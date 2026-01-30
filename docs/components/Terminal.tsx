"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import "xterm/css/xterm.css";
// import "xterm/lib/xterm.css"; // Some environments need this
import { ParseArger } from "parsearger-js/browser";

// Initial Command
const WELCOME_MSG = [
  `Welcome to ParseArger Playground!
  `,
  `Type 'parseArger generate --help' to see available options.
  `,
  `Type 'parseArger generate --pos "file Input"' to generate a script.
  `,
];

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const parseArgerRef = useRef<ParseArger | null>(null);

  const [downloadContent, setDownloadContent] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>("script.sh");

  // Terminal State
  const inputBuffer = useRef<string>("");
  const history = useRef<string[]>([]);
  const historyIndex = useRef<number>(-1);

  useEffect(() => {
    // Small timeout to ensure DOM is ready and has dimensions
    const initTimer = setTimeout(() => {
      if (!terminalRef.current) return;

      // Initialize XTerm
      const term = new XTerm({
        cursorBlink: true,
        theme: {
          background: "#1e1e1e",
          foreground: "#f0f0f0",
        },
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: 14,
      });

      const fitAddon = new FitAddon();
      fitAddonRef.current = fitAddon;
      term.loadAddon(fitAddon);
      term.loadAddon(new WebLinksAddon());

      term.open(terminalRef.current);

      try {
        fitAddon.fit();
      } catch (e) {
        console.warn("Fit failed:", e);
      }

      xtermRef.current = term;

      // Initialize ParseArger
      parseArgerRef.current = new ParseArger();

      // term.writeln(WELCOME_MSG);
      for (const msg of WELCOME_MSG) {
        term.writeln(msg);
      }
      term.write("$ ");

      // Handle Input
      term.onData((data) => {
        const code = data.charCodeAt(0);

        // Enter
        if (code === 13) {
          term.write("\r\n");
          const command = inputBuffer.current.trim();

          if (command) {
            executeCommand(command);
            history.current.push(command);
            historyIndex.current = history.current.length;
          } else {
            term.write("$ ");
          }

          inputBuffer.current = "";
        }
        // Backspace
        else if (code === 127) {
          if (inputBuffer.current.length > 0) {
            inputBuffer.current = inputBuffer.current.slice(0, -1);
            term.write("\b \b");
          }
        }
        // Up Arrow (History)
        else if (data === "\x1b[A") {
          if (historyIndex.current > 0) {
            historyIndex.current--;
            const cmd = history.current[historyIndex.current];
            // Clear current line
            while (inputBuffer.current.length > 0) {
              inputBuffer.current = inputBuffer.current.slice(0, -1);
              term.write("\b \b");
            }
            inputBuffer.current = cmd;
            term.write(cmd);
          }
        }
        // Down Arrow (History)
        else if (data === "\x1b[B") {
          if (historyIndex.current < history.current.length - 1) {
            historyIndex.current++;
            const cmd = history.current[historyIndex.current];
            while (inputBuffer.current.length > 0) {
              inputBuffer.current = inputBuffer.current.slice(0, -1);
              term.write("\b \b");
            }
            inputBuffer.current = cmd;
            term.write(cmd);
          } else {
            // Clear to empty
            historyIndex.current = history.current.length;
            while (inputBuffer.current.length > 0) {
              inputBuffer.current = inputBuffer.current.slice(0, -1);
              term.write("\b \b");
            }
          }
        }
        // Normal character
        else if (code >= 32) {
          inputBuffer.current += data;
          term.write(data);
        }
      });
    }, 100);

    // Handle Resize
    const handleResize = () => {
      if (fitAddonRef.current) {
        try {
          fitAddonRef.current.fit();
        } catch (e) {
          // ignore
        }
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("resize", handleResize);
      if (xtermRef.current) {
        xtermRef.current.dispose();
        xtermRef.current = null;
      }
    };
  }, []);

  const executeCommand = async (rawCommand: string) => {
    const term = xtermRef.current;
    if (!term || !parseArgerRef.current) return;

    let commandToRun = rawCommand;

    // Check for parseArger prefix
    if (rawCommand.startsWith("parseArger ")) {
      commandToRun = rawCommand.slice("parseArger ".length);
    } else if (rawCommand === "parseArger") {
      commandToRun = "--help";
    } else if (rawCommand !== "clear" && !rawCommand.startsWith(".")) {
      // Enforce prefix
      term.writeln(
        "\r\n\x1b[33mCommand not found. Did you mean 'parseArger " +
          rawCommand.split(" ")[0] +
          "'?\x1b[0m",
      );
      term.write("$ ");
      return;
    }

    try {
      // Basic clear
      if (commandToRun === "clear") {
        term.clear();
        term.write("$ ");
        return;
      }

      const result = await parseArgerRef.current.exec(commandToRun);

      // Print stdout
      if (result.stdout) {
        term.writeln(result.stdout.replace(/\n/g, "\r\n"));

        // Handle file download
        if (commandToRun.startsWith("generate")) {
          setDownloadContent(result.stdout);
          setDownloadFilename("generated_script.sh");
        } else if (commandToRun.startsWith("document")) {
          setDownloadContent(result.stdout);
          setDownloadFilename("documentation.md");
        }
      }

      if (result.stderr) {
        term.writeln(`\x1b[31m${result.stderr.replace(/\n/g, "\r\n")}\x1b[0m`);
      }
    } catch (error: any) {
      term.writeln(`\r\n\x1b[31mError: ${error.message}\x1b[0m`);
    }

    term.write("$ ");
  };

  const handleDownload = () => {
    if (!downloadContent) return;

    const blob = new Blob([downloadContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-[600px] bg-black p-4 rounded-lg border border-gray-800">
      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
        <h2 className="text-gray-400 text-sm font-mono">ParseArger Terminal</h2>
        {downloadContent && (
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-mono transition-colors"
          >
            Download Output
          </button>
        )}
      </div>
      <div className="flex-1 w-full overflow-hidden" ref={terminalRef} />
    </div>
  );
}
