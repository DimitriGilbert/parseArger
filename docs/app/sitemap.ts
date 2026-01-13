import { MetadataRoute } from "next";

// Required for static export
export const dynamic = "force-static";

const baseUrl = "https://dimitrigilbert.github.io/parseArger";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/docs",
    "/docs/generate-parse",
    "/docs/arguments",
    "/docs/nested-options",
    "/docs/completion-docs",
    "/docs/html-forms",
    "/docs/tutorial",
    "/docs/case-study",
    "/docs/prompts",
    "/docs/prompts/tiny",
    "/docs/prompts/small",
    "/docs/prompts/medium",
    "/docs/prompts/large",
    "/docs/prompts/extralarge",
    "/docs/prompts/complete",
    // Raw files for AI assistants
    "/llms.txt",
    "/prompts/tiny.md",
    "/prompts/small.md",
    "/prompts/medium.md",
    "/prompts/large.md",
    "/prompts/extralarge.md",
    "/prompts/complete.md",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/docs" ? 0.9 : 0.7,
  }));
}
