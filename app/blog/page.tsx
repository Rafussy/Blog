import Header from "../components/Header"
import Footer from "../components/Footer"
import { getPosts } from "../lib/posts"

export default function BlogPage() {
  const posts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow flex flex-col">
              <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm flex-grow">{post.content.substring(0, 100)}...</p>
              <a href={`/blog/${post.id}`} className="text-blue-600 hover:underline mt-2">
                Read more
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

