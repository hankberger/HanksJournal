import AllPosts from './AllPosts'
import './App.css'
import BlogPostForm from './BlogPost'
import HeaderPic from './HeaderPic'
import WelcomeHeader from './WelcomeHeader'

function App() {

  return (
    <>
    <HeaderPic src="/ProfilePic.png"/>
    <WelcomeHeader/>
    <BlogPostForm/>
    <AllPosts/>
    </>
  )
}

export default App
