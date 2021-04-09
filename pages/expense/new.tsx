import { Button, Card, Grid, List, MenuItem, Select, Switch, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { createExpenseAction, updateAllExpensesAction } from "../../redux/expenses/action";
import { RootState } from "../../redux/store";
import withAuth from "../../components/withAuthentication";
import PageLayout from "../../components/pageLayout";
import { createExpenseCall } from "../../api/expense/call";
import { prependListener } from "node:process";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/InputLabel";

// Date Picker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';


const stateToProps = (state: RootState) => ({
    auth: {
        loggedIn: state.user.loggedIn,
    },
    ...state,
});
const connector = connect(stateToProps, {
    updateAllExpensesAction,
    createExpenseAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type NewExpenseProps = ReduxProps;

function NewExpense(props: NewExpenseProps) {
    const router = useRouter();

    const [expenseName, setExpenseName] = useState<string>("");
    const [price, setPrice] = useState<number>(0.00);
    const currentDate = new Date();
    const [dateString, setDateString] = useState<string>(`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`);
    const [selectedDate, setDate] = useState<Date | null>(currentDate);
    const [link, setLink] = useState<string>("");
    const [tagArray, setTagArray] = useState<Array<string>>([]);
    const currentTags = props.tag.categories.map(category => category.name);
    // const [newTagName, setNewTagName] = useState<string>("");
    // const [newTagHasError, setNewTagHasError] = useState<boolean>(false);
    // const [newTagErrorMessage, setNewTagErrorMessage] = useState<string>("");
    
    const handleChangeExpenseName = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = event.target;
        setExpenseName(target.value.trim());
    };

    const handleChangePrice = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = event.target;
        // Parse to float
        setPrice(parseFloat(target.value.trim()));
    }

    // TODO: date validation
    const handleChangeDate = (date: Date | null) => {
      setDate(date);
      const newDateString = (selectedDate == null) ? dateString : `${selectedDate.getMonth()! + 1}/${selectedDate.getDate()!}/${selectedDate.getFullYear()!}`;
      setDateString(newDateString);
    }

    const handleChangeLink = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = event.target;
        setLink(target.value.trim());
    }

    const handleChangeTags = (
        event: React.ChangeEvent<{ value: unknown }>
        ) => {
        const { options } = event.target as HTMLSelectElement;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setTagArray(value);
      };

    const submitExpense = () => {
        createExpenseCall({
            name: expenseName,
            cost: price,
            date: dateString,
            link: link,
            tags: tagArray,
            headers: props.user.authHeaders,
        }).then(
            (data) => {
                props.createExpenseAction(data)
                router.push("/expense")
            },
            (error) => console.log(error)
        );
    };
    return (
        <PageLayout pageName="Create Expense">
            <Card>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Grid>
                    <TextField
                      label="Name"
                      onChange={handleChangeExpenseName}
                    ></TextField>
                    <TextField
                      label="Price"
                      onChange={handleChangePrice}
                    ></TextField>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Select purchase date"
                        value={selectedDate}
                        onChange={handleChangeDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                     </MuiPickersUtilsProvider> 
                    <TextField
                      label="Link"
                      onChange={handleChangeLink}
                    ></TextField>
                    <Select
                      labelId="tag-select-label"
                      id="tag-select"
                      multiple
                      value={tagArray}
                      onChange={handleChangeTags}
                      input={<Input /> }
                      >
                      {currentTags.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                            {tag}
                        </MenuItem>
                      ))}
                    </Select> 
                  </Grid>
                  <Button onClick={submitExpense}>Save</Button>
                  <Link href="/expense">Cancel</Link>
                </Grid>
            </Card>
        </PageLayout>
    );
}

export default connector(withAuth(NewExpense));
