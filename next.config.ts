import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['5.34.215.179'], // сюда добавляем IP или домен с которого будут грузиться картинки
  },
};

export default nextConfig;
