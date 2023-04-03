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
                protocol: 'https',
                hostname: 'weltewhome.uz',
                pathname: '/media/**',
            },
            {
                // https://scontent.cdninstagram.com
                protocol: 'https',
                hostname: 'scontent.cdninstagram.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'scontent-ams4-1.cdninstagram.com',
                pathname: '/**',
            }
        ],
    },
    env: {
        API_URL: process.env.apiUrl
    }
}