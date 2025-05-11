/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    fontLoaders: [
      { 
        loader: 'default', 
        options: { 
          timeout: 120000,  // Doubled timeout for font loading
          retries: 3,       // Add retries for failed requests
          backoff: true     // Enable exponential backoff
        } 
      }
    ],
    requestTimeout: 120000,  // Doubled request timeout
    isrMemoryCacheSize: 50,
    workerThreads: true,     // Enable worker threads for better performance
    optimizeCss: true        // Enable CSS optimization
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = false;
    }
    // Add performance hints
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    };
    return config;
  }
};

module.exports = nextConfig;