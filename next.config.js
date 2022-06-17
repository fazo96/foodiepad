/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    relay: require('./relay.config.js'),
  }
}

module.exports = nextConfig
