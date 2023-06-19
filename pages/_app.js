import "@fortawesome/fontawesome-svg-core/styles.css";

import { useRouter } from "next/router";
import Layout from "../components/shared/layout/layout";
import "../styles/globals.css";
// pages/_app.js
import Login from "./login";
import { useEffect } from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

config.autoAddCss = false;
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    console.log(localStorage);
    // if (!localStorage.getItem("token")) {
    //   router.push("/login");
    // }
  }, []);
  // if (router.pathname === "/login") {
  //   return <Login />;
  // }
  return (
    <Layout>
      <ToastContainer />

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
