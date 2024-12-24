import { Delete01Icon, Edit01Icon } from "hugeicons-react";
import React from "react";

const BlogCard = ({ post, deleteBlog, updateBlog }) => {
  const handleDeleteBlog = () => {
    deleteBlog(post);
  };
  const handleUpdateBlog = () => {
    updateBlog(post);
  };
  return (
    <div className="mt-10 w-[20%] rounded-[8px] bg-primary drop-shadow-lg">
      <div className="flex flex-col px-5 py-3">
        <div className="flex justify-end gap-x-3">
          <Edit01Icon
            color="#0f9e22"
            strokeWidth={2}
            className="cursor-pointer transition-all ease-out hover:scale-95"
            onClick={handleUpdateBlog}
          />
          <Delete01Icon
            color="#e42929"
            strokeWidth={2}
            onClick={handleDeleteBlog}
            className="cursor-pointer transition-all ease-out hover:scale-95"
          />
        </div>
        <div className="my-2 text-lg font-medium">{post.title}</div>
        <img src={post?.image} alt="" className="h-[200px] w-[200px]" />
        <div className="my-2 mt-3 text-[#2f2f2f]">{post.content}</div>
      </div>
    </div>
  );
};

export default BlogCard;
