import { useState } from "react";

const useCommentTree = (initialComments = []) => {
  const [comments, setComments] = useState(initialComments);

  const insertNode = (tree, commentId, newComment) => {
    return tree.map((comment) => {
      if (commentId === comment.id) {
        return {
          ...comment,
          replies: [newComment, ...comment.replies],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, newComment),
        };
      }
      return comment;
    });
  };

  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setComments((prevComment) =>
        insertNode(prevComment, commentId, newComment)
      );
    } else {
      setComments([newComment, ...comments]);
    }
  };

  const deleteNode = (tree, id) => {
    return tree.reduce((acc, comment) => {
      if (comment.id === id) {
        return acc;
      } else {
        comment.replies = deleteNode(comment.replies, id);
      }
      return [...acc, comment];
    }, []);
  };

  const deleteComment = (commentId) => {
    setComments((prev) => deleteNode(prev, commentId));
  };
  return {
    comments,
    insertComment,
    deleteComment,
  };
};

export default useCommentTree;
