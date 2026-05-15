import type { NextConfig } from 'next';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  async headers() {
    const cors = [
      { key: 'Access-Control-Allow-Origin', value: '*' },
      { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
    ];
    return [
      {
        source: '/embed.js',
        headers: [
          ...cors,
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' },
        ],
      },
      {
        source: '/embed.esm.js',
        headers: [
          ...cors,
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' },
        ],
      },
      {
        source: '/schedule-:lang.json',
        headers: [
          ...cors,
          { key: 'Cache-Control', value: 'public, max-age=43200, s-maxage=43200' },
        ],
      },
    ];
  },
};

export default nextConfig;
