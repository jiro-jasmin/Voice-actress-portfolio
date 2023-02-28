import Head from 'next/head'
import { useRouter } from 'next/router'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import '../styles/styles.scss'

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  return (<>
    <Head>
      <title>Aileen portfolio</title>
    </Head>
    {router.asPath !== '/' && <Nav />}
    <main>
      <Component {...pageProps} />
    </main>
    {router.asPath !== '/' && <Footer />}
  </>
  )
}

export default MyApp
