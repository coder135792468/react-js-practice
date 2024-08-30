import { useState } from "react";

const Comment = ({ comment, onSubmit,onDelete }) => {
  const [toggleReplyInput, setToggleReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const addComment = () => {
    onSubmit(comment.id, replyText);
    setReplyText("");
  };
  return (
    <div className="comments-containers">
      <div>{comment.content}</div>
      <div>
        <button onClick={() => setToggleReplyInput(!toggleReplyInput)}>
          {toggleReplyInput ? "Hide Reply" : "Show Reply"}
        </button>
        <button onClick={()=>onDelete(comment.id)}>Delete</button>
      </div>

      {toggleReplyInput && (
        <div className="reply-comments">
          <div>
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Reply..."
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  addComment();
                }
              }}
            />
            <button onClick={addComment}>Add</button>
          </div>
          {comment.replies.map((newcomment) => (
            <Comment comment={newcomment} onSubmit={addComment} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
