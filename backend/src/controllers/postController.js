import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import sanitizeMarkdown from "../utils/sanitizeMarkdown.js";

const findPostBySlug = async (slug, res) => {
  const post = await Post.findOne({ slug });
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return null;
  }
  return post;
};

const checkUserPermissions = (post, user, res) => {
  if (post.author.toString() !== user.id && user.role !== "admin") {
    res.status(403).json({ message: "Access denied" });
    return false;
  }
  return true;
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: "publish" }).sort({
      likes: -1,
      dislikes: 1,
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No published posts found" });
    }

    res.status(200).json({ message: "All posts", posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await findPostBySlug(slug, res);
    if (!post) return;

    res.status(200).json({ message: "Post retrieved successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, tags, coverImage, status } = req.body;
    if (!(title && content && status)) {
      return res
        .status(400)
        .json({ message: "Title, content, and status are required" });
    }

    if (!["draft", "publish"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const author = await User.findById(req.user.id);
    const sanitizedContent = sanitizeMarkdown(content);
    const post = await Post.create({
      title,
      content: sanitizedContent,
      author: req.user.id,
      tags,
      authorUsername: author.username,
      coverImage,
      status
    });
    author.totalPosts = Number(author.totalPosts) + 1
    await author.save();

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, tags, coverImage, status } = req.body;

    const post = await findPostBySlug(slug, res);
    if (!post) return;

    if (!checkUserPermissions(post, req.user, res)) return;

    if (title) post.title = sanitizeMarkdown(title);
    if (content) post.content = sanitizeMarkdown(content);
    if (tags) post.tags = sanitizeMarkdown(tags);
    if (coverImage) post.coverImage = coverImage;
    if (status) post.status = status;

    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await findPostBySlug(slug, res);
    if (!post) return;

    if (!checkUserPermissions(post, req.user, res)) return;

    await Post.findOneAndDelete({ slug });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPosts = await Post.find({ authorUsername: username });
    if (!userPosts || userPosts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json({ message: "User posts", posts: userPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const likePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id;

    const post = await findPostBySlug(slug, res);
    if (!post) return;

    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }

    if (post.dislikes.includes(userId)) {
      post.dislikes.pull(userId);
      post.dislikesCount -= 1;
    }

    post.likes.push(userId);
    post.likesCount += 1;

    await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const dislikePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id;

    const post = await findPostBySlug(slug, res);
    if (!post) return;

    if (post.dislikes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already disliked this post" });
    }

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
      post.likesCount -= 1;
    }

    post.dislikes.push(userId);
    post.dislikesCount += 1;

    await post.save();

    res.status(200).json({ message: "Post disliked successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const { slug } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const post = await findPostBySlug(slug, res);
    if (!post) return;

    post.comments.push({
      user: req.user.id,
      comment: sanitizeMarkdown(content),
    });
    await post.save();
    res.status(201).json({ message: "Comment added successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const modifyComment = async (req, res) => {
  try {
    const { slug, commentId } = req.params;
    const { content } = req.body;

    if (!(commentId && content)) {
      return res
        .status(400)
        .json({ message: "Comment ID and content are required" });
    }

    const post = await findPostBySlug(slug, res);
    if (!post) return;

    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!checkUserPermissions(comment, req.user, res)) return;

    comment.comment = sanitizeMarkdown(content);
    await post.save();

    res.status(200).json({ message: "Comment modified successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { slug, commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required" });
    }

    const post = await findPostBySlug(slug, res);
    if (!post) return;

    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!checkUserPermissions(comment, req.user, res)) return;

    post.comments.pull(commentId);
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
  likePost,
  dislikePost,
  commentOnPost,
  modifyComment,
  deleteComment,
};
