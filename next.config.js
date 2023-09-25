/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '103.226.250.81',
        port: '9000',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\bcanvas\.node\b/,
      use: 'raw-loader',
    });
    return config;
  },
};

module.exports = nextConfig;
