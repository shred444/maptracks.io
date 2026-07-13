import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/maptracks.io" : "",
  assetPrefix: isGitHubPages ? "/maptracks.io/" : undefined,
  trailingSlash: isGitHubPages,
};

export default nextConfig;
