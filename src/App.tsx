import EditPost from "./pages/EditPost"
import Post from "./pages/Post"
import PostList from "./pages/PostList"
import {Routes,Route} from "react-router-dom"


function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
       </Routes>
    </>
  )
}

export default App
