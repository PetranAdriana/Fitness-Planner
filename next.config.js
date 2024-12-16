module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-exercisedb.vercel.app',
        pathname: '/api/v1/images/**',
      },
    ],
  },
};
