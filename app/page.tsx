import Header from "./components/Header"
import Footer from "./components/Footer"
import { getPosts } from "./lib/posts"
import Link from "next/link"

export default function Home() {
  const posts = getPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Ralf Journey</h1>
        <p className="text-xl mb-4">Explore my personal blog and join me on my journey.</p>
        <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow flex flex-col">
              <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-sm flex-grow">{post.content.substring(0, 100)}...</p>
              <a href={`/blog/${post.id}`} className="text-blue-600 hover:underline mt-2">
                Read more
              </a>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

