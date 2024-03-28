const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                // Tüm originlere izin veren CORS politikası
                source: '/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*', // Tüm originlere izin vermek için '*' kullanılır
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig
