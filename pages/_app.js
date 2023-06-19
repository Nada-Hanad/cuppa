import "@fortawesome/fontawesome-svg-core/styles.css";

import { useRouter } from "next/router";
import Layout from "../components/shared/layout/layout";
import "../styles/globals.css";
// pages/_app.js
import Login from "./login";
import { useEffect, useState } from "react";

import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  useEffect(() => {
    console.log(localStorage);
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);
  if (router.pathname === "/login") {
    return <Login />;
  }
  return (
    <Layout>
      {isLoading && (
        <div className="z-30 flex items-center justify-center w-full h-screen bg-white">
          <div className="fixed z-50 custom-loading-indicator animate-ping">
            <img src="/icons/blackLogo.svg" alt="logo" />
          </div>
        </div>
      )}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
