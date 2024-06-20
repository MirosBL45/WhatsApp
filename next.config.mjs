/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "zany-lyrebird-582.convex.cloud" },
            { hostname: "oaidalleapiprodscus.blob.core.windows.net" },
        ],
    },
};

export default nextConfig;