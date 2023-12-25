import localFont from "next/font/local";

export const workSans = localFont({
  preload: false,
  src: [
    {
      path: "../../public/fonts/WorkSans.ttf",
    },
  ],
  variable: "--font-work-sans",
});
