import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            injectRegister: "auto",
            workbox: {
                globPatterns: ["**/*.{jsx,css,js,html,png,glb,mp3}"],
            },
            includeAssets: ["icon192.png", "icon512.png"],
            manifest: {
                name: "UselessBox",
                short_name: "UselessBox",
                description: "A box that turns itself off",
                theme_color: "#000000",
                id: "UselessBoxVR",
                display: "standalone",
                start_url: "/",
                icons: [
                    {
                        src: "icon192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icon512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
