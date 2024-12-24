import { Cancel01Icon } from "hugeicons-react";
import React, { useState } from "react";
import { Button } from "../../../../components";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../../firebase";
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
    image: blogUpdate ? updateForm.image : null,
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
    if (!details.image) {
      isError = true;
      errors.imageError = "Please select an image";
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
      setImage(file);
      setDetails({ ...details, image: file });
      const reader = new FileReader();

      reader.onloadend = () => {
        // setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("select again");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();

    if (!error) {
      setLoading(true);

      if (image) {
        try {
          const storageRef = ref(storage, `images/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              console.log(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              const response = await addDoc(collection(db, "posts"), {
                ...details,
                image: downloadURL,
              });
              setLoading(false);
              setShowBlogForm(false);
              getBlogPosts();
            },
          );
        } catch (error) {
          setLoading(false);
          const errorCode = error.code;
          setErrorState({ ...errorState, servererror: errorCode });
        }
      } else {
        try {
          const response = await addDoc(collection(db, "posts"), details);
          setLoading(false);
          setShowBlogForm(false);
          getBlogPosts();
        } catch (error) {
          setLoading(false);
          const errorCode = error.code;
          setErrorState({ ...errorState, servererror: errorCode });
        }
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const docRef = doc(db, "posts", updateForm.id);
            await updateDoc(docRef, { ...details, image: downloadURL });
            setLoading(false);
            setShowBlogForm(false);
            getBlogPosts();
          },
        );
      } else {
        const docRef = doc(db, "posts", updateForm.id);
        await updateDoc(docRef, details);
        setShowBlogForm(false);
        setLoading(false);
        getBlogPosts();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
            <span className="text-sm text-[#e62e2e]">
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
            <span className="text-sm text-[#e62e2e]">
              {errorState.contentError}
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
          <span className="text-sm text-[#e62e2e]">
            {errorState.imageError}
          </span>
          <div>
            {(imagePreview) && (
              <img
                src={imagePreview}
                alt="image"
                className="h-[100px] w-[100px]"
              />
            )}
            {(updateForm && !imagePreview) && (
              <img
                src={details.image}
                alt="image"
                className="h-[100px] w-[100px]"
              />
            )}
          </div>
          {loading ? (
            <div className="mt-4 w-full">
              <Button className="flex w-full justify-center">
                <img
                  src={Spinner}
                  className="h-[25px] w-[25px]"
                  alt="loading"
                />
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
