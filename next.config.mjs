/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["foodics-console-production.s3.eu-west-1.amazonaws.com"], // Add your domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
