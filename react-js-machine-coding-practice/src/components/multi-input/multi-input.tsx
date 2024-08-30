import React,{ useEffect, useState } from "react";
import Pill from "./pill";
import "./multi-input.css";

interface PropType {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

//https://dummyjson.com/users/search?q=John
export default function MultiInput() {
  const [text, setText] = useState("");
  const [suggestion, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PropType[]>([]);
  const [selectedUserSet, setSelectedUserSet] = useState<any>(new Set());
  const [activeUserId, setActiveUserId] = useState<number>(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/users/search?q=${text}`);
      const data = await res.json();
      setSuggestions(data["users"]);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (text.trim().length > 0) fetchData();
    else setSuggestions([]);
  }, [text]);

  const handleSelectedUser = (user: PropType) => {
    setSelectedUser([...selectedUser, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setText("");
    setSuggestions([]);
  };

  const onClickHandler = (email: string) => {
    setSelectedUserSet(
      new Set([
        ...selectedUser
          ?.filter((user: PropType) => user.email !== email)
          .map((user) => user.email),
      ])
    );
    setSelectedUser(
      selectedUser?.filter((user: PropType) => user.email !== email)
    );
  };

  const onHandleKeyDown = (e: any) => {
    const maxLen =
      suggestion?.filter((user: PropType) => !selectedUserSet.has(user.email))
        .length || 0;
    if (
      text.length === 0 &&
      e.code === "Backspace" &&
      selectedUser.length > 0
    ) {
      onClickHandler(selectedUser[selectedUser.length - 1].email);
      setSuggestions([]);
    } else if (e.code === "ArrowUp" && activeUserId > 0) {
      setActiveUserId(activeUserId - 1);
    } else if (e.code === "ArrowDown" && activeUserId < maxLen - 1) {
      setActiveUserId(activeUserId + 1);
    } else if (
      e.code === "Enter" &&
      activeUserId >= 0 &&
      activeUserId < maxLen
    ) {
      handleSelectedUser(
        suggestion?.filter(
          (user: PropType) => !selectedUserSet.has(user.email)
        )[activeUserId]
      );
      setActiveUserId(0);
    }
  };
  return (
    <div>
      <div className="input-container">
        {selectedUser?.map((user: PropType) => (
          <Pill key={user.id} {...user} onClickHandler={onClickHandler} />
        ))}
        <div className="input-field-container">
          <input
            className="input-field"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Search.."
            onKeyDown={onHandleKeyDown}
          />
          {(loading || error || suggestion.length > 0) && (
            <div className="suggestion-box">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p color="red">Something wents wrong</p>
              ) : (
                suggestion
                  ?.filter((user: PropType) => !selectedUserSet.has(user.email))
                  ?.map((user: PropType, index) => (
                    <div
                      key={user.id}
                      className={`suggestion-list ${
                        index === activeUserId ? "active" : ""
                      }`}
                      onClick={() => handleSelectedUser(user)}
                    >
                      <img src={user.image} alt={user.firstName} />
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
