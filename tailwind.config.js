/*
 * @Author: SunFei
 * @Date: 2024-08-18 15:49:01
 * @LastEditors: SunFei
 * @LastEditTime: 2024-09-06 21:32:05
 * @Description: tailwindconfig配置文件~
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/styles/style.css"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    // require('@tailwindcss/line-clamp'),
    require("tailwind-scrollbar"),
  ],
  daisyui: {
    styled: true,

    themes: [
      { 
        // 自然
        natural_scent: {
          primary: "#40de5a",
        },

        // 海洋
        ocean_scent: {
          primary: "#fa8c35",
        },
        // 城市
        city_scent: {
          primary: "#ff461f",
        },

        // 晨雾
        morning_fog_scent: {
          primary: "#758a99",
        },
      },
      //配置自己的主题
      "mytheme",
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
  },
};
