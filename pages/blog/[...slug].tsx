import { getAllMdxNodes, getMdxNode, getMdxPaths } from "next-mdx/server"
import Link from "next/link"
import { Icon } from "reflexjs"
import { Snippet } from "../../src/snippet"

export default function PostPage({ post, snippets }) {
  return (
    <div variant="container.md" py="10">
      <Link href="/" passHref>
        <a variant="button.link">
          <Icon name="arrow-left" mr="2" />
          Back home
        </a>
      </Link>

      <h1 variant="heading.h1">{post.frontMatter.title}</h1>
      <p variant="text.lead" mt="2">
        {post.frontMatter.excerpt}
      </p>

      {snippets?.map((snippet) => (
        <div key={snippet.url} mt="10">
          <Snippet snippet={snippet} />
        </div>
      ))}
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths("post"),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const post = await getMdxNode("post", context)

  if (!post) {
    return {
      notFound: true,
    }
  }

  const snippets = await getAllMdxNodes("snippet")

  return {
    props: {
      post,
      snippets: snippets.filter((snippet) =>
        snippet.relationships.post.some(({ slug }) => slug === post.slug)
      ),
    },
  }
}
