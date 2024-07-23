import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

// FUNCTION TO CREATE A COMMENT
export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      console.log(req.body);
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    //Create new comment
    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    // Save comment to the DB
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

// GET ALL THE COMMENTS OF A POST
export const getPostComments = async (req, res, next) => {
  try {
    // Get the comments of the specific post
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// HANDLE LIKE FUNCTIONALITY
export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    const userIndex = comment.like.indexOf(req.user.id);
    console.log(userIndex);
    if (userIndex === -1) {
      //user have not liked
      comment.numberOfLikes += 1;
      comment.like.push(req.user.id);
    } else {
      // User liked - need to unlike
      comment.numberOfLikes -= 1;
      comment.like.splice(userIndex, 1);
    }

    //save to db
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {}
};
