/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/articles',
        destination: '/journey',
        permanent: true,
      },
      {
        source: '/articles/:slug',
        destination: '/journey/:slug',
        permanent: true,
      },
      {
        source: '/journal',
        destination: '/journey',
        permanent: true,
      },
      {
        source: '/journal/:slug',
        destination: '/journey/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
