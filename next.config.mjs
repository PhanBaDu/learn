/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Cấu hình để xử lý SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
