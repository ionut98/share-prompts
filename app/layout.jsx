import "@styles/globals.css";

import { Suspense } from "react";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Loading from "@components/Loading";

export const metadata = {
  title: "Promptly",
  description: "Discover and share prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.svg" sizes="any" />
      </head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
