/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["admin.alhilalrestaurant.com"], // Add your domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
