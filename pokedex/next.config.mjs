/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
    {
      protocol: "https",
      hostname: "raw.githubusercontent.com",
    },
    {
      protocol: "https",
      hostname: "www.pokemon.com",
    },
    {
      protocol: "https",
      hostname: "archives.bulbagarden.net",
    },
  ],
  },
};

export default nextConfig;
