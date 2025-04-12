import AllPosts from "./AllPosts";
import "./App.css";
import BlogPostForm from "./BlogPost";
import Footer from "./Footer";
import HeaderPic from "./HeaderPic";
import WelcomeHeader from "./WelcomeHeader";

function App() {
  return (
    <>
      <HeaderPic
        src="/ProfilePic.webp"
        alt="A work of art serving as the header for Hank's Journal."
      />
      <WelcomeHeader />
      <BlogPostForm />
      <AllPosts />
      <Footer />
    </>
  );
}

export default App;
