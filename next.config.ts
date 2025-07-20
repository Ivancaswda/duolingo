import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true, // ✅ Пропускает ошибки типов
    },
    eslint: {
        ignoreDuringBuilds: true, // ✅ Пропускает ESLint при build
    },
    images: {
        domains: ["cdn-icons-png.flaticon.com", 'avatars.mds.yandex.net'], // <--- Добавлено сюда
    },
  async headers() {
      return [
          {
              source: '/api/(.*)',
              headers: [
                  {
                      key: 'Access-Control-Allow-Origin',
                      value: '*'
                  },
                  {
                      key: "Access-Control-Allow-Methods",
                      value: 'GET, POST, PUT, DELETE, OPTIONS'
                  },
                  {
                      key: "Access-Control-Allow-Headers",
                      value: 'Content-Type Authorization'
                  },
                  {
                      key: "Content-Range",
                      value: 'bytes : 0-9/*'
                  },
              ]
          }
      ]
  }
};

export default nextConfig;
