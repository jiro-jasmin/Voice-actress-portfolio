import Head from 'next/head'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import '../styles/styles.scss'

function MyApp({ Component, pageProps }) {
  return (<>
    <Head>
      <title>Aileen portfolio</title>
    </Head>
    <Nav />
    <main>
      <Component {...pageProps} />
    </main>
    <Footer />
  </>
  )
}

export default MyApp
