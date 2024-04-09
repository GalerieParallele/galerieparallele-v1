/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    images: {
        domains: ['firebasestorage.googleapis.com', 'picsum.photos', 'codeur-production.s3.eu-west-3.amazonaws.com', 'www.hoteldegallifet.com', 'flagcdn.com', 'loremflickr.com'],
    }
}

module.exports = nextConfig;
