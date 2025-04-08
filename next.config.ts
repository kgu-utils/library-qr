import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 정적 HTML 파일로 내보내기
  images: {
    unoptimized: true, // 정적 내보내기를 위한 이미지 최적화 비활성화
  },
  trailingSlash: true, // URL 끝에 슬래시 추가
};

export default nextConfig;
