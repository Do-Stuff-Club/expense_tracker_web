import { Button, Card, Grid, List, Switch, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import EditTagItem from "../../../components/editTagItem";

import { editCategory, newCategory, newTag } from "../../../redux/tags/action";
import { RootState } from "../../../redux/store";
import withAuth from "../../../components/withAuthentication";
import { Category } from "../../../redux/tags/types";
import { GetStaticPaths, GetStaticProps } from "next";

const stateToProps = (state: RootState) => ({
  auth: {
    loggedIn: state.user.loggedIn,
  },
  ...state,
});
const connector = connect(stateToProps, {
  newCategory,
  editCategory,
  newTag,
});
type ReduxProps = ConnectedProps<typeof connector>;
type EditCategoryProps = ReduxProps;

function EditCategory(props: EditCategoryProps) {
  const [categoryName, setCategoryName] = useState<string>("");
  const [newTagName, setNewTagName] = useState<string>("");
  const [newTagHasError, setNewTagHasError] = useState<boolean>(false);
  const [newTagErrorMessage, setNewTagErrorMessage] = useState<string>("");
  const router = useRouter();

  const { id } = router.query; //FIXME set type for router query
  const category = props.tag.categories.find(
    // @ts-expect-error FIXME- router query type doesn't work as I want it to, temporarily ignore types
    (category) => category.id == parseInt(id) // FIXME handle issue where index is not found
  );

  const handleIdError = () => {};

  const handleChangeCategoryName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    setCategoryName(target.value.trim());
  };

  const handleChangeNewTagName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    setNewTagName(target.value.trim());
  };

  if (category == null) {
    handleIdError();
    return <></>; // FIXME
  } else {
    const addNewTag = () => {
      // Validate new tag name
      category.tags.forEach((tag) => {
        if (tag.name == newTagName) {
          setNewTagHasError(true);
          setNewTagErrorMessage("Tag already exists.");
          return;
        } else if (newTagName == "") {
          setNewTagHasError(true);
          setNewTagErrorMessage("Tag name cannot be empty.");
          return;
        }
      });
      // Tag is good
      console.log("adding new tag");
      props.newTag({
        name: newTagName,
        category: category,
        headers: props.user.authHeaders,
      });
    };

    const validateTagText = (idx: number) => (
      newName: string
    ): [boolean, string] => {
      const otherTags = category.tags.filter((_, i) => i !== idx);
      otherTags.forEach((tag) => {
        if (tag.name == newName) {
          return [false, "Tag already exists"];
        } else if (newName == "") {
          return [false, "Tag name cannot be empty"];
        }
      });
      return [true, ""];
    };
    const handleChangeRequired = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const newCategory: Category = {
        ...category,
        required: event.target.checked,
      };
      props.editCategory({
        category: newCategory,
        headers: props.user.authHeaders,
      }); // FIXME add error handling
    };
    return (
      <Card>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid>
            <TextField
              label="Name"
              onChange={handleChangeCategoryName}
              defaultValue={category.name}
            ></TextField>
            <Switch
              checked={category.required}
              onChange={handleChangeRequired}
            ></Switch>
          </Grid>
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
              {category.tags.map((tag, i) => {
                return (
                  <EditTagItem
                    name={tag.name}
                    id={tag.id}
                    validateTagText={validateTagText(tag.id)}
                    key={i}
                  />
                );
              })}
            </List>
            <Link href="/tag">Done Editing</Link>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default connector(withAuth(EditCategory));
