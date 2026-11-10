/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";
const isVercelPreview = process.env.VERCEL_ENV === "preview";

// Content-Security-Policy.
// - Vercel Web Analytics loads its script and sends data on the same origin ('self').
// - The contact form posts to Formspree.
// - Preview deployments also allow the Vercel toolbar (vercel.live).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com${isVercelPreview ? " https://vercel.live" : ""}`,
  `style-src 'self' 'unsafe-inline'${isVercelPreview ? " https://vercel.live" : ""}`,
  `img-src 'self' data: blob:${isVercelPreview ? " https://vercel.live https://vercel.com" : ""}`,
  `font-src 'self'${isVercelPreview ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self' https://formspree.io${isDev ? " ws:" : ""}${isVercelPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `frame-src 'self'${isVercelPreview ? " https://vercel.live" : ""}`,
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Permanent (301) redirects. Every URL from the earlier site keeps working.
const redirect301 = (source, destination) => ({ source, destination, statusCode: 301 });

// Folder names are matched both as typed and percent-encoded, because some old links carry an encoded space.
const legacyFolders = [
  ["Machin learning", "/insights/machine-learning"],
  ["Integer Programming", "/insights/integer-programming"],
  ["maintenance", "/insights/maintenance-management"],
].flatMap(([folder, destination]) => {
  const encoded = encodeURIComponent(folder);
  return encoded === folder ? [[folder, destination]] : [[encoded, destination], [folder, destination]];
});

const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async redirects() {
    return [
      // Old blog URLs. The articles live under /insights.
      redirect301("/blog", "/insights"),
      redirect301("/blog/:slug", "/insights/:slug"),
      // Projects that moved to the "Earlier work" list.
      redirect301("/projects/maintenance-reporting-system", "/projects#earlier-work"),
      redirect301("/projects/integer-programming-models", "/projects#earlier-work"),
      redirect301("/projects/machine-learning-learning-path", "/projects#earlier-work"),
      // Generated case PDFs were removed. Send readers to the project page.
      redirect301("/projects/:slug/case.pdf", "/projects/:slug"),
      // Legacy static folders from the first version of the site.
      ...legacyFolders.flatMap(([folder, destination]) => [
        redirect301(`/${folder}`, destination),
        redirect301(`/${folder}/:path*`, destination),
      ]),
      // The old 4.3 MB portrait was replaced by a compressed file.
      redirect301("/images/first.png", "/images/ahmad-salehiyan.webp"),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }],
      },
    ];
  },
};

export default nextConfig;
