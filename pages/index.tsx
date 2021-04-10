import Link from "next/link"
import { getAllNodes } from "next-mdx"
import { Icon } from "reflexjs"

export default function IndexPage({ posts }) {
  return (
    <div variant="container" textAlign="center" py="20">
      <h1 variant="heading.h1">
        Welcome to <span color="primary">Reflexjs</span>
      </h1>
      <p fontSize="xl" my="4">
        Get started by editing <code variant="text.code">pages/index.js</code>
      </p>
      <a href="https://reflexjs.org/docs" variant="button.primary">
        Read the docs
      </a>

      <div variant="container.md" mt="16">
        <div display="grid" col="1|2" gap="10">
          {posts?.map((post) => (
            <div
              key={post.slug}
              borderWidth="1"
              textAlign="left"
              p="6"
              rounded="lg"
            >
              <Link href={post.url} passHref>
                <a color="text">
                  <h2 variant="heading.h3">{post.frontMatter.title}</h2>
                  <p mt="2">{post.frontMatter.excerpt}</p>
                  <span variant="button.link.sm" px="0" mt="2">
                    View Post <Icon name="arrow-right" ml="2" />
                  </span>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes("post"),
    },
  }
}
