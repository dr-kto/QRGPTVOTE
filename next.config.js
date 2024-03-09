/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'pbxt.replicate.delivery',
      'g4yqcv8qdhf169fk.public.blob.vercel-storage.com',
      'qr15lgf3mso2w4q8.public.blob.vercel-storage.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.standardlife.kz',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
// Error: Invalid src prop (https://qr15lgf3mso2w4q8.public.blob.vercel-storage.com/yHwQtBp-B5cvwtwu0v469wouIHmGLGvoMvZPIv.png) on `next/image`, hostname "qr15lgf3mso2w4q8.public.blob.vercel-storage.com" is not configured under images in your `next.config.js`
