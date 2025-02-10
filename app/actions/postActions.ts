"use server"

import { getPosts, savePosts, type Post } from "../lib/posts"
import { saveMedia, type Media } from "../lib/media"
import { writeFile } from "fs/promises"
import path from "path"

export async function addPost(formData: FormData) {
  const posts = getPosts()
  const date = formData.get("date") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const files = formData.getAll("files") as File[]

  const mediaItems: Media[] = []
  const postId = Date.now().toString()

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, "")
    const filepath = path.join(process.cwd(), "public", "uploads", filename)
    await writeFile(filepath, buffer)
    mediaItems.push({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      filename,
      originalName: file.name,
      uploadDate: new Date().toISOString(),
      postId,
    })
  }

  const newPost: Post = {
    id: postId,
    date,
    title,
    content,
    mediaIds: mediaItems.map((item) => item.id),
  }

  posts.unshift(newPost)
  savePosts(posts)
  saveMedia(mediaItems)
}

