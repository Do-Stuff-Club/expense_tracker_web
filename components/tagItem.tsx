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

type TagItemProps = {
  name: string;
  onDelete: () => void;
};

export default function TagItem(props: TagItemProps) {
  return (
    <ListItem>
      <ListItemText primary={props.name}></ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
