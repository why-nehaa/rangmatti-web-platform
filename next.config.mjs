/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // facilitates static preview and local/external mock assets
  },
};

export default nextConfig;
