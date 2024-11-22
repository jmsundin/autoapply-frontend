import Head from 'next/head'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Job Search Preferences</title>
        <meta name="description" content="Set your job search preferences" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  )
}

export default Layout

