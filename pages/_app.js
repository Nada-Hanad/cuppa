import { useRouter } from "next/router";
import Layout from "../components/shared/layout/layout";
import "../styles/globals.css";
// pages/_app.js
import Login from "./login";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    // if (router.pathname === "/login") {
    //   return;
    // }
    //     if (!localStorage.getItem("token")) {
    //       router.push("/login");
    //     }
  }, [router]);
  if (router.pathname === "/login") {
    return <Login />;
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
