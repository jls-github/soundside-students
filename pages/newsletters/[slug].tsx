import { GetStaticPaths, GetStaticProps } from "next";
import {
  getNewsletterBySlug,
  getNewsletterSlugs,
} from "../api/newsletters_api";

type Props = {
  newsletter: { title: string; content: string; slug: string };
  errors?: string;
};

const Newsletter = ({ newsletter, errors }: Props) => {
  if (errors) {
    return <p>{errors}</p>;
  }
  const { title, content, slug } = newsletter;
  console.log(slug)
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Newsletter;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getNewsletterSlugs().map((slug) => ({
    params: { slug: slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug;
    const newsletter = getNewsletterBySlug(String(slug), [
      "title",
      "content",
      "slug",
    ]);
    return { props: { newsletter } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
