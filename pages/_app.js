import { useRouter } from 'next/router';
import Layout from '../components/shared/layout';
import '../styles/globals.css';
// pages/_app.js
import { Ubuntu } from 'next/font/google';
import Login from './login';


const ubuntu = Ubuntu({
     weight: ['300', '400', '500', '700'],
     subsets: ['latin'],
});
function MyApp({ Component, pageProps }) {
     const isLoginPage = Component === Login;
     if (isLoginPage) {
          return (
               <main className={ubuntu.className}>
                    <Component {...pageProps} />
               </main>
          );
     } else {
          return (
               <main className={ubuntu.className}>
                    <Layout>
                         <Component {...pageProps} />
                    </Layout>
               </main>
          );
     }
}

export default MyApp
