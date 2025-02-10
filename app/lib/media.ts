import fs from "fs"
import path from "path"

const mediaFile = path.join(process.cwd(), "media.json")

export interface Media {
  id: string
  filename: string
  originalName: string
  uploadDate: string
  postId: string
}

export function getMedia(): Media[] {
  if (!fs.existsSync(mediaFile)) {
    return []
  }
  const fileContents = fs.readFileSync(mediaFile, "utf8")
  return JSON.parse(fileContents)
}

export function saveMedia(media: Media[]) {
  const existingMedia = getMedia()
  const updatedMedia = [...existingMedia, ...media]
  fs.writeFileSync(mediaFile, JSON.stringify(updatedMedia, null, 2))
}

