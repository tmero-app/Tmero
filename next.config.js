/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,   
  },
  sassOptions: {
    includePaths: ['./scss'],
  }
}

module.exports = nextConfig
