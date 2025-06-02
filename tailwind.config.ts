// tailwind.config.js
module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      "./app.vue"
    ],
    theme: {
      extend: {
        // Tambahkan custom variant untuk group
        variants: {
          extend: {
          }
        }
      }
    },
    plugins: [],
  }