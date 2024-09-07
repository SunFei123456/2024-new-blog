/*
 * @Author: 孙飞
 * @Date: 2024-08-18 15:49:01
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-06 21:32:05
 * @Description: tailwindconfig配置文件~
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/styles/style.css'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    // require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
  daisyui: {

    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ], // https://daisyui.com/docs/themes/ 提供了好多预设主题,可以查看填写
  }
}

