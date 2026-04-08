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
      { path: "*", async lazy() { const { StartPage } = await import("./pages/StartPage"); return { Component: StartPage }; } },
    ],
  },
]);
