import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['wwwyacheslav.ru:4443'], // сюда добавляем IP или домен с которого будут грузиться картинки
  },
};

export default nextConfig;
