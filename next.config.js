/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // transpile the Clarity package from node_modules so Next's bundler
  // transforms its ESM sources and avoids the `src/utils` import error.
  transpilePackages: ['@microsoft/clarity'],
};

module.exports = nextConfig;
