import { useState } from "react";
import useCommentTree from "./hooks/use-tree";
import commentsData from "./data/comments.json";
import Comment from "./comment";
import "./style.css";

const NestedComment = () => {
  const [formText, setFormText] = useState("");
  const { comments, insertComment,deleteComment } = useCommentTree(commentsData);

  const handleSubmit = (e) => {
    if (e.code === "Enter") {
      insertComment(undefined, formText);
      setFormText("");
    }
  };
  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
  };
  const handleDeleteComment = (commentId)=>{
     deleteComment(commentId);
  }
  return (
    <div>
      <div>
        <input
          value={formText}
          placeholder="Press enter to submit..."
          onChange={(e) => setFormText(e.target.value)}
          onKeyDown={handleSubmit}
          className="main-input-field"
        />
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} 
        onDelete={handleDeleteComment}
        onSubmit={handleReply} />
      ))}
    </div>
  );
};

export default NestedComment;
