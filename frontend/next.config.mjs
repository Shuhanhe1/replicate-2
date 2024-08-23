/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_CONDUCTSCIENCE_URL: process.env.NEXT_PUBLIC_CONDUCTSCIENCE_URL,
  },
};

export default nextConfig;
