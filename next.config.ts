import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Desactiva optimización de imágenes para static export
  },
};

export default nextConfig;