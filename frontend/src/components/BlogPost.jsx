import { Heart, ThumbsUp } from "lucide-react";
import React from "react";

function BlogPost({ title, content, authorUsername, likesCount }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-2">
          <ThumbsUp className="text-purple-500 w-5 h-5" />
          <span className="text-gray-700 font-semibold text-lg text-center" >{likesCount}</span>
        </div>
      </div>
      <p className="mb-4 text-gray-700">{content}</p>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>By {authorUsername}</span>
        <a
          href="#read-more"
          className="bg-blue-500 text-white py-2 px-4 rounded transition-colors duration-300 ease-in-out hover:bg-blue-600"
        >
          Read More
        </a>
      </div>
    </div>
  );
}

export default BlogPost;
