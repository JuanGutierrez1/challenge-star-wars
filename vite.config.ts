import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [{
          urlPattern: new RegExp('https://swapi.dev/api/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'swapi-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp('https://kit.fontawesome.com/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'fontawesome-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp('https://ka-f.fontawesome.com/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'fontawesome-styles-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp('https://starwars-visualguide.com/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'characters-pictures-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
        ]
      },
      manifest: {
        name: 'Star Wars Characters',
        short_name: 'SW Characters',
        description: 'Star Wars character information',
        theme_color: '#0c213c',
        icons: [
          {
            "src": "/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/pwa-maskable-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/pwa-maskable-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
      }
    })
  ],
})
