import fs from "fs"
import path from "path"

const postsFile = path.join(process.cwd(), "posts.json")

export interface Post {
  id: string
  date: string
  title: string
  content: string
  mediaIds: string[]
}

export function getPosts(): Post[] {
  if (!fs.existsSync(postsFile)) {
    return []
  }
  const fileContents = fs.readFileSync(postsFile, "utf8")
  return JSON.parse(fileContents)
}

export function savePosts(posts: Post[]) {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2))
}

