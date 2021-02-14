import { GetStaticProps } from "next";
import Head from "next/head";
import { getNewsletters } from "./api/newsletters_api";

type Props = {
  newsletters: {slug: string, title: string}[]
}
export default function Home({newsletters}: Props) {
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
          <h3>Newsletters</h3>
          {newsletters.map((newsletter) => newsletter.title)}
        </section>

        <section>
          <h3>Upcoming Events</h3>
        </section>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const newsletters = getNewsletters(['slug', 'title']);
  return { props: { newsletters } };
};
