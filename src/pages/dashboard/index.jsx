import React, { useEffect, useState } from "react";
import { BgOverlay, BlogCard, Layout } from "../../components";
import DashboardNav from "./_components/navbar";
import BlogForm from "./_components/blog_form";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const DashboardPage = () => {
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogUpdate, setBlogUpdate] = useState(false);
  const [updateForm, setUpdateForm] = useState(null);

  const handleAddNewBlog = () => {
    setShowBlogForm(true);
  };

  useEffect(() => {
    getBlogPosts();
  }, []);

  const getBlogPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      console.log(querySnapshot);
      const blogPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        content: doc.data().content,
        title: doc.data().title,
        image: null,
      }));

      console.log(blogPosts);
      setBlogPosts(blogPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBlog = async (post) => {
    console.log(post);
    try {
      const docRef = doc(db, "posts", post.id);
      await deleteDoc(docRef);
      getBlogPosts();
      console.log("Deleted Successfully");
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
          <div className="animate-slide_up absolute left-[30%] top-24 w-1/2">
            <BlogForm
              handleCancelClick={() => setShowBlogForm(false)}
              blogUpdate={blogUpdate}
              updateForm={updateForm}
              setShowBlogForm={setShowBlogForm}
              getBlogPosts={getBlogPosts}
            />
          </div>
        </BgOverlay>
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
    </Layout>
  );
};

export default DashboardPage;
