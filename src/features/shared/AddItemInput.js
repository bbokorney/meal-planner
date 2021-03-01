import React, { useState } from "react";

export const AddItemInput = ({
  onAddItemCallback,
  buttonText,
  placeHolderText,
}) => {
  const [text, setText] = useState("");

  const onAddItemClicked = () => {
    onAddItemCallback(text);
    setText("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeHolderText}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="button" onClick={onAddItemClicked}>
        {buttonText}
      </button>
    </div>
  );
};
