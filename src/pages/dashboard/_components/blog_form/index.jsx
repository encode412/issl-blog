import { Cancel01Icon } from "hugeicons-react";
import React, { useState } from "react";
import { Button } from "../../../../components";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Spinner } from "../../../../constants/images";

const BlogForm = ({
  handleCancelClick,
  blogUpdate,
  updateForm,
  setShowBlogForm,
  getBlogPosts,
}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [details, setDetails] = useState({
    title: blogUpdate ? updateForm.title : "",
    content: blogUpdate ? updateForm.content : "",
    image: image,
  });

  const [errorState, setErrorState] = useState({
    titleError: "",
    contentError: "",
    imageError: "",
  });

  const validate = () => {
    let isError = false;
    const errors = {
      titleError: "",
      contentError: "",
      imageError: "",
    };

    if (!details.title) {
      isError = true;
      errors.titleError = "Please enter a title";
    }
    if (!details.content) {
      isError = true;
      errors.contentError = "Please enter your blog content";
    }

    setErrorState({ ...errorState, ...errors });
    return isError;
  };

  const handleForm = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
        // setDetails({ ...details, file: file });
      };
      reader.readAsDataURL(file);
    } else {
      alert("select again");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    setLoading(true);
    if (!error) {
      try {
        const response = await addDoc(collection(db, "posts"), details);

        console.log(response);
      } catch (error) {
        console.log(error);
        const errorCode = error.code;
        setErrorState({ ...errorState, servererror: errorCode });
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "posts", updateForm.id);
      await updateDoc(docRef, details);
      setShowBlogForm(false);
      getBlogPosts();
      console.log("Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full rounded-[10px] border border-[#d5d5d5] bg-primary">
      <div className="flex flex-col gap-y-3 px-10 py-5">
        <div className="flex justify-end">
          <Cancel01Icon
            onClick={handleCancelClick}
            className="cursor-pointer"
          />
        </div>
        <p className="text-xl font-medium">
          Fill the details below to {blogUpdate ? "update" : "create"} a new
          blog
        </p>
        <form className="mt-3 flex flex-col gap-y-3">
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="email" className="text-base font-normal">
              Title
            </label>
            <input
              onChange={handleForm}
              value={details.title}
              type="text"
              name="title"
              id="title"
              placeholder="Enter your blog title"
              className="w-full rounded-[6px] border border-[#d5d5d5] px-4 py-3 focus:outline-none"
            />
            <span className="text-xs text-[#e62e2e]">
              {errorState.titleError}
            </span>
          </div>
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="email" className="text-base font-normal">
              Content
            </label>
            <textarea
              onChange={handleForm}
              value={details.content}
              type="text"
              name="content"
              id="content"
              placeholder="Enter your blog content"
              className="w-full rounded-[6px] border border-[#d5d5d5] px-4 py-3 focus:outline-none"
            />
            <span className="text-xs text-[#e62e2e]">
              {errorState.titleError}
            </span>
          </div>

          <div className="flex w-full items-center justify-center rounded-[6px] border border-[#d5d5d5] px-4 py-10">
            <label htmlFor="file">
              <div className="cursor-pointer border border-lightgray px-3 py-1 text-sm transition-all ease-in hover:scale-95">
                Add image
              </div>
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="image"
                className="h-[100px] w-[100px]"
              />
            )}
          </div>
          {loading ? (
            <div className="mt-4 w-full">
              <Button
                className="w-full"
              >
                <img src={Spinner} alt="loading" />
              </Button>
            </div>
          ) : (
            <div className="mt-4 w-full">
              <Button
                onClick={blogUpdate ? handleUpdate : handleSubmit}
                className="w-full"
              >
                {blogUpdate ? "Update" : "Submit"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
