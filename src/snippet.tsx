import { useHydrate } from "next-mdx/client"
import { components } from "@reflexjs/mdx"

export function Snippet({ snippet }) {
  const content = useHydrate(snippet, {
    components,
  })

  return (
    <div>
      <h4 variant="heading.h4">{snippet.frontMatter.title}</h4>
      <div mt="4">{content}</div>
    </div>
  )
}
