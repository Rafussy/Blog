import Header from "../components/Header"
import Footer from "../components/Footer"
import AddPostForm from "../components/AddPostForm"

export default function AddPost() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Add New Post</h1>
        <AddPostForm />
      </main>
      <Footer />
    </div>
  )
}

