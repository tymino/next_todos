// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  env: {
    URL: 'http://localhost:3000',
    // URL: 'https://next-todos-socket.vercel.app',
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
