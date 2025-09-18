/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["admin.alhilalrestaurant.com"], // Add your domain here
    // domains: ["localhost"], // Add your domain here
    domains: ["192.168.18.223"], // Add your domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
