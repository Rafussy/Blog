"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { addPost } from "../actions/postActions"
import Image from "next/image"

export default function AddPostForm() {
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files || [])])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("date", date)
    formData.append("title", title)
    formData.append("content", content)
    files.forEach((file) => {
      formData.append("files", file)
    })
    await addPost(formData)
    setDate("")
    setTitle("")
    setContent("")
    setFiles([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    router.push("/")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div>
        <label htmlFor="files" className="block text-sm font-medium text-gray-700">
          Upload Photos/Videos
        </label>
        <input
          type="file"
          id="files"
          onChange={handleFileChange}
          multiple
          accept="image/*,video/*"
          ref={fileInputRef}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">Selected Files:</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {files.map((file, index) => (
              <div key={index} className="relative">
                {file.type.startsWith("image/") ? (
                  <Image
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt={`Preview ${index}`}
                    width={150}
                    height={150}
                    objectFit="cover"
                    className="rounded-lg"
                  />
                ) : (
                  <video src={URL.createObjectURL(file)} className="w-[150px] h-[150px] object-cover rounded-lg" />
                )}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
                <p className="text-sm text-gray-500 mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Post
      </button>
    </form>
  )
}

