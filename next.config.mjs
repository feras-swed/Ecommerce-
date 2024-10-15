/** @type {import('next').NextConfig} */

module.exports = nextConfig;
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
          port: "1337",
          pathname: "/uploads/**",
        },
      ],
    },
  };
  

export default nextConfig;
