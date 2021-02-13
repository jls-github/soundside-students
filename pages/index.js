import Head from 'next/head'

export default function Home({newslettters}) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Soundside Students</h1>
        <p>Serving Jesus in the South Puget Sound</p>
        <section>
          Newsletters
        </section>
        <section>
          Upcoming Events
        </section>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const newsletters = []
}