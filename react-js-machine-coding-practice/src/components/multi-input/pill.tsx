import React from "react";

interface PropType {
    key: number;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    onClickHandler: any;
  }
  const Pill = ({
    key,
    image,
    firstName,
    lastName,
    email,
    onClickHandler,
  }: PropType) => {
    return (
      <div className="suggestion-list pill-container">
        <div key={key} className="pill-btn" onClick={() => onClickHandler(email)}>
          <img src={image} alt={firstName} />
          <span>
            {firstName} {lastName} &times;
          </span>
        </div>
      </div>
    );
  };
  
  export default Pill;
  