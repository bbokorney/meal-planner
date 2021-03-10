import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const AddItemInput = ({
  onAddItemCallback,
  buttonText,
  placeHolderText,
  fullWidth,
  multiline,
}) => {
  const [text, setText] = useState("");

  const onAddItemClicked = () => {
    if (!text) {
      return;
    }
    onAddItemCallback(text);
    setText("");
  };

  return (
    <div>
      <TextField
        value={text}
        style={{ margin: 8 }}
        placeholder={placeHolderText}
        fullWidth={fullWidth}
        multiline={multiline}
        margin="normal"
        onChange={(e) => setText(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" color="primary" onClick={onAddItemClicked}>
        {buttonText}
      </Button>
    </div>
  );
};
