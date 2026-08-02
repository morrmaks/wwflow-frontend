import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'plus.unsplash.com' },
      { hostname: 'localhost' }
    ]
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:4000/graphql'
      }
    ];
  }
};

export default nextConfig;
