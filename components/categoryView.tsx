import classes from "*.module.css";
import Link from "next/link";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import React from "react";
import { Category } from "../redux/tags/types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useRouter } from "next/router";

export interface CategoryViewProps {
  listKey: number;
  category: Category;
  onDelete: () => void;
}

export default function CategoryView(props: CategoryViewProps) {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };

  const onEdit = () => {};
  return (
    <>
      <ListItem button onClick={handleClick} key={props.listKey}>
        <ListItemText primary={"Name: " + props.category.name} />
        <ListItemSecondaryAction>
          <Link href={"/category/" + props.category.id + "/edit"} passHref>
            <IconButton aria-label="Edit" onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="Delete" onClick={props.onDelete}>
            <DeleteIcon />
          </IconButton>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.category.tags.map((tag, i) => {
            return (
              <ListItem button key={i}>
                <ListItemText primary={tag.name} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
