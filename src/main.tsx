import { createRoot } from "react-dom/client";
import { StrictMode, Suspense } from "react";
import { KcPage } from "./keycloak-theme/kc.gen";
import App from "./App";
import { getKcContextMock } from "./keycloak-theme/login/KcPageStory";
import "./index.css";

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
/*
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {}
    });
}
*/

if (import.meta.env.DEV) {
  window.kcContext = getKcContextMock({
    pageId: "login.ftl",
    overrides: {
      social: {
        providers: [
          {
            alias: "github",
            displayName: "GitHub",
            providerId: "github",
            loginUrl: "https://github.com/login/oauth/authorize",
          },
        ],
      },
    },
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {window.kcContext ? (
      <KcPage kcContext={window.kcContext} />
    ) : (
      <Suspense>
        <App />
      </Suspense>
    )}
  </StrictMode>
);
