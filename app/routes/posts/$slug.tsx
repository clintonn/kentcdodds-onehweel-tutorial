import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { getPost } from "~/models/post.server";
import { json } from "@remix-run/node";
import { marked } from "marked";
import invariant from "tiny-invariant";

interface LoaderData {
  title: string;
  html: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  invariant(slug, "slug not found");
  const post = await getPost({ slug });
  invariant(post, `Post not found ${slug}`);
  const html = marked.parse(post.markdown);
  return json<LoaderData>({ title: post.title, html });
};

const PostRoute = () => {
  const { title, html } = useLoaderData() as LoaderData;

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default PostRoute;
