import { prisma } from "~/db.server";

export interface Post {
  slug: string;
  title: string;
  markdown: string;
}

export const getPostListings = async () => {
  return prisma.post.findMany({
    select: {
      slug: true,
      title: true,
    },
  });
};

export const getPosts = async () => {
  return prisma.post.findMany();
};

export const getPost = async ({ slug }: { slug: string }) => {
  return prisma.post.findUnique({
    where: {
      slug,
    },
  });
};
