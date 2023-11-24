/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
            },
        ],
    },
    
}

module.exports = nextConfig
