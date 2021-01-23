import {
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import React, { ChangeEvent, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Tag } from "../redux/tags/types";

type EditTagItemProps = {
  name: string;
  id: number;
  validateTagText: (newName: string) => [boolean, string];
  onDelete: () => void;
  onRename: (newName: string) => void;
};

export default function EditTagItem(props: EditTagItemProps) {
  const [text, setText] = useState<string>(props.name);
  const [editing, setEditing] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onEdit = () => {
    setEditing(true);
  };
  const onSave = () => {
    if (!hasError) {
      props.onRename(text);
      setEditing(false); // FIXME error handling onRename
    }
  };
  const onDelete = () => {
    props.onDelete();
  };
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    const [error, message] = props.validateTagText(target.value);
    setHasError(error);
    setErrorMessage(message);
    setText(target.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == "Enter") onSave();
  };

  if (editing)
    return (
      <ListItem divider>
        {hasError ? (
          <TextField
            autoFocus
            onChange={handleChange}
            defaultValue={props.name}
            error
            helperText={errorMessage}
            onKeyPress={handleKeyPress}
          />
        ) : (
          <TextField
            autoFocus
            onChange={handleChange}
            defaultValue={props.name}
            onKeyPress={handleKeyPress}
          />
        )}
        <ListItemSecondaryAction>
          <IconButton aria-label="Save" onClick={onSave}>
            <SaveIcon />
          </IconButton>
          <IconButton aria-label="Delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  else
    return (
      <ListItem>
        <ListItemText
          primary={props.name}
          onDoubleClick={onEdit}
        ></ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="Rename" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
}
