import AllPosts from './AllPosts'
import './App.css'
import BlogPostForm from './BlogPost'
import Footer from './Footer'
import HeaderPic from './HeaderPic'
import WelcomeHeader from './WelcomeHeader'

function App() {

  return (
    <>
    <HeaderPic src="/ProfilePic.png"/>
    <WelcomeHeader/>
    <BlogPostForm/>
    <AllPosts/>
    <Footer/>
    </>
  )
}

export default App
