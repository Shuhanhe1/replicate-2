/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_CONDUCTSCIENCE_URL: process.env.NEXT_PUBLIC_CONDUCTSCIENCE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '20.119.84.53',
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
};

export default nextConfig;
