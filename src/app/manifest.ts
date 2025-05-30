import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GitView - GitHub Profile Viewer",
    short_name: "GitView",
    description:
      "A modern web application for exploring GitHub profiles and repositories",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F8FF",
    theme_color: "#0F7173",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
