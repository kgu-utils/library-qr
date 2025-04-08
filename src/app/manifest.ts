import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

  return {
    name: "도서관 QR 코드",
    short_name: "도서관 QR",
    description: "학번 기반 QR 코드 생성 애플리케이션",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    icons: [
      {
        src: `${basePath}/web-app-manifest-192x192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/web-app-manifest-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
