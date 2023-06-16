import '@fortawesome/fontawesome-svg-core/styles.css'

import { useRouter } from 'next/router'
import Layout from '../components/shared/layout/layout'
import '../styles/globals.css'
// pages/_app.js
import Login from './login'
import { useEffect } from 'react'
import 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    console.log(localStorage)
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
  }, [])
  if (router.pathname === '/login') {
    return <Login />
  }
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  )
}

export default MyApp
