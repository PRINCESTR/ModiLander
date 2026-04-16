import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, async lazy() { const { StartPage } = await import("./pages/StartPage"); return { Component: StartPage }; } },
      { path: "game", async lazy() { const { GamePage } = await import("./pages/GamePage"); return { Component: GamePage }; } },
      { path: "win-loss", async lazy() { const { WinLossPage } = await import("./pages/WinLossPage"); return { Component: WinLossPage }; } },
      { path: "privacy", async lazy() { const { PrivacyPage } = await import("./pages/PrivacyPage"); return { Component: PrivacyPage }; } },
      { path: "about", async lazy() { const { AboutPage } = await import("./pages/AboutPage"); return { Component: AboutPage }; } },
      { path: "contact", async lazy() { const { ContactPage } = await import("./pages/ContactPage"); return { Component: ContactPage }; } },
      { path: "*", async lazy() { const { StartPage } = await import("./pages/StartPage"); return { Component: StartPage }; } },
    ],
  },
]);
