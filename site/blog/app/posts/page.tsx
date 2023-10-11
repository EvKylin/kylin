import Link from "next/link";

import DateFormat from "@/app/components/DateFormat";
import PostLabel from "@/app/components/PostLabel";
import seo from "@/utils/seo";

import { getAllPosts } from "@/lib/posts";

export async function generateMetadata() {
  return seo({ title: "Blog" });
}

export default async function Posts() {
  const posts = await getAllPosts();

  return (
    <>
      <div className="uppercase py-1 mb-8 -mt-8 text-sm text-center font-medium tracking-widest text-gray-400">
        Total {posts?.length} Posts
      </div>
      <div className="prose grid gap-9 m-auto">
        {posts?.map((post: any) => (
          <Link
            href={`/posts/${post.slug}`}
            className="group font-normal overflow-hidden cursor-pointer no-underline transition fade-in-up "
            key={post.slug}
          >
            <div className="text-xl text-gray-600 group-hover:text-brand truncate ease-in duration-300">
              {post.meta?.title}
            </div>
            <div className="text-gray-400 text-sm leading-none flex items-center">
              <time className="my-3 inline-flex items-center">
                <span className="i-heroicons:calendar mr-1 w-4 h-4 text-brand" />
                <DateFormat value={post.meta?.date} short />
              </time>
              <span className="mx-2 w-0.5 h-0.5 bg-gray-400" />
              {/* {post.meta.category} */}
              {post.meta?.tags.slice(0, 3).map((tag: string) => (
                <PostLabel title={tag} key={tag} />
              ))}
            </div>

            <div className="text-gray-500 line-clamp-3">{post.excerpt}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
