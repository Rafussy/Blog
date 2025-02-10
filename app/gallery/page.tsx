import Header from "../components/Header"
import Footer from "../components/Footer"
import { getMedia } from "../lib/media"
import Image from "next/image"

export default function GalleryPage() {
  const media = getMedia().sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Gallery</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => (
            <div key={item.id} className="relative aspect-square">
              {item.filename.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                <Image
                  src={`/uploads/${item.filename}`}
                  alt={item.originalName}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              ) : (
                <video src={`/uploads/${item.filename}`} className="w-full h-full object-cover rounded-lg" controls />
              )}
              <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                {new Date(item.uploadDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

