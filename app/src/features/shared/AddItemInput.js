import React, { useState } from "react";

export const AddItemInput = ({
  onAddItemCallback,
  buttonText,
  placeHolderText,
  elementType,
}) => {
  const [text, setText] = useState("");

  const onAddItemClicked = () => {
    onAddItemCallback(text);
    setText("");
  };

  const inputProps = {
    type: "text",
    placeholder: placeHolderText,
    value: text,
    onChange: (e) => setText(e.target.value),
  };
  let textElement;
  if (!elementType || elementType === "input") {
    textElement = <input {...inputProps} />;
  } else if (elementType === "textarea") {
    textElement = <textarea {...inputProps} />;
  }

  return (
    <div>
      {textElement}
      <button type="button" onClick={onAddItemClicked}>
        {buttonText}
      </button>
    </div>
  );
};
