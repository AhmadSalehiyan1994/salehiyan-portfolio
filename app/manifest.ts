import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ahmad Salehiyan",
    short_name: "Salehiyan",
    description: "Ph.D. Candidate at Oklahoma State University. Reinforcement learning and optimization for decision-making under uncertainty.",
    start_url: "/",
    display: "standalone",
    background_color: "#101012",
    theme_color: "#101012",
    lang: "en",
    icons: [
      {
        src: "/manifest-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/manifest-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
