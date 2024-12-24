import React, { useEffect, useState } from "react";
import { BgOverlay, BlogCard, Layout } from "../../components";
import DashboardNav from "./_components/navbar";
import BlogForm from "./_components/blog_form";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const DashboardPage = () => {
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogUpdate, setBlogUpdate] = useState(false);
  const [updateForm, setUpdateForm] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddNewBlog = () => {
    setShowBlogForm(true);
  };

  useEffect(() => {
    getBlogPosts();
  }, []);

  const getBlogPosts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const blogPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        content: doc.data().content,
        title: doc.data().title,
        image: doc.data().image,
      }));

      setLoading(false);
      setBlogPosts(blogPosts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (post) => {
    try {
      const docRef = doc(db, "posts", post.id);
      await deleteDoc(docRef);
      getBlogPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBlog = async (post) => {
    setBlogUpdate(true);
    setUpdateForm(post);
    setShowBlogForm(true);
  };

  return (
    <Layout>
      {showBlogForm && (
        <BgOverlay isModalOpen={showBlogForm}>
          <div className="absolute left-[30%] top-24 w-1/2 animate-slide_up">
            <BlogForm
              handleCancelClick={() => {
                setShowBlogForm(false);
                setBlogUpdate(false);
              }}
              blogUpdate={blogUpdate}
              updateForm={updateForm}
              setShowBlogForm={setShowBlogForm}
              getBlogPosts={getBlogPosts}
              setBlogUpdate={setBlogUpdate}
            />
          </div>
        </BgOverlay>
      )}
      {loading && (
        <div className="text-center absolute left-[10%] right-0 text-xl font-medium">Loading...</div>
      )}
      <DashboardNav handleNewClick={handleAddNewBlog} />
      <div className="flex flex-row gap-x-10 px-6">
        {blogPosts.map((post) => (
          <BlogCard
            post={post}
            key={post.id}
            deleteBlog={handleDeleteBlog}
            updateBlog={handleUpdateBlog}
          />
        ))}
      </div>
      <div className=" flex justify-center items-center text-xl">
        {blogPosts.length === 0 && <div>No posts available</div>}
      </div>
    </Layout>
  );
};

export default DashboardPage;
