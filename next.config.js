module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/media/**',
            },
            {
                // https://scontent.cdninstagram.com
                protocol: 'https',
                hostname: 'scontent.cdninstagram.com',
                pathname: '/**',
            }
        ],
    },
    env: {
        API_URL: process.env.apiUrl
    }
}