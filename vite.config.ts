import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",
    port: 4444,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "contact-api",
      configureServer(server) {
        server.middlewares.use("/api/contact", (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: false, message: "Method not allowed" }));
            return;
          }
          const chunks: Buffer[] = [];
          req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
          req.on("end", () => {
            try {
              const body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as { name?: string; email?: string; message?: string };
              if (!body.name || !body.email || !body.message) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ ok: false, message: "All fields are required." }));
                return;
              }

              const record = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                name: body.name.trim(),
                email: body.email.trim(),
                message: body.message.trim(),
                createdAt: new Date().toISOString(),
              };

              fs.mkdirSync("data", { recursive: true });
              fs.appendFileSync("data/contact-submissions.ndjson", `${JSON.stringify(record)}\n`, "utf8");

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true, id: record.id }));
            } catch {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, message: "Invalid request payload." }));
            }
          });
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use("/api/contact", (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: false, message: "Method not allowed" }));
            return;
          }
          const chunks: Buffer[] = [];
          req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
          req.on("end", () => {
            try {
              const body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as { name?: string; email?: string; message?: string };
              if (!body.name || !body.email || !body.message) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ ok: false, message: "All fields are required." }));
                return;
              }

              const record = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                name: body.name.trim(),
                email: body.email.trim(),
                message: body.message.trim(),
                createdAt: new Date().toISOString(),
              };

              fs.mkdirSync("data", { recursive: true });
              fs.appendFileSync("data/contact-submissions.ndjson", `${JSON.stringify(record)}\n`, "utf8");

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true, id: record.id }));
            } catch {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, message: "Invalid request payload." }));
            }
          });
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
}));
