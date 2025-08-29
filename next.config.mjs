/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], // Add your domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
