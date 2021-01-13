import { Button, Card, Grid, List, TextField } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import TagItem from "./tagItem";

interface CategoryCreatorProps {}

export default function CategoryCreator(props: CategoryCreatorProps) {
  const [tagArray, setTagArray] = useState<Array<string>>([]);
  const [newTagName, setNewTagName] = useState<string>("");
  const [newTagHasError, setNewTagHasError] = useState<boolean>(false);
  const [newTagErrorMessage, setNewTagErrorMessage] = useState<string>("");

  const handleChangeNewTagName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    setNewTagName(target.value.trim());
  };

  const addNewTag = () => {
    // Validate new tag name
    if (tagArray.includes(newTagName)) {
      setNewTagHasError(true);
      setNewTagErrorMessage("Tag already exists.");
    } else if (newTagName.trim() == "") {
      setNewTagHasError(true);
      setNewTagErrorMessage("Tag name cannot be empty.");
    } else {
      // Tag is good
      console.log("adding new tag");
      setTagArray([...tagArray, newTagName]);
    }
  };

  const renameTag = (newName: string, idx: number): [boolean, string] => {
    // Validate new tag name
    if (tagArray.includes(newName)) {
      return [true, "Tag already exists"];
    } else if (newName.trim() == "") {
      return [true, "Tag name cannot be empty"];
    } else {
      // Tag is good
      const newArray = tagArray.map((oldName, i) =>
        i == idx ? newName : oldName
      );
      setTagArray(newArray);
      return [false, "No Error"];
    }
  };

  return (
    <Card>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid>
          {newTagHasError ? (
            <TextField
              label="Tag Name"
              error
              helperText={newTagErrorMessage}
              onChange={(e) => handleChangeNewTagName(e)}
            />
          ) : (
            <TextField
              label="Tag Name"
              onChange={(e) => handleChangeNewTagName(e)}
            />
          )}
          <Button onClick={addNewTag}>Add</Button>
          <List>
            {tagArray.map((tag, i) => {
              return (
                <TagItem
                  name={tag}
                  setTagName={(newName) => renameTag(newName, i)}
                  key={i}
                />
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Card>
  );
}
