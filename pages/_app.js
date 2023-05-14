import { useRouter } from "next/router";
import Layout from "../components/shared/layout";
import "../styles/globals.css";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
function MyApp({ Component, pageProps }) {
  return (
    <main className={ubuntu.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}

export default MyApp
