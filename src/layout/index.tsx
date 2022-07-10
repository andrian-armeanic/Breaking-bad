import {
    Box,
    ButtonBase,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { search } from "../reducer/search";
import "./index.scss";

export type IName = { name: number };

export type IPortrayed = { portrayed: number };

export default function App () {
    const [searchValue, setSearchValue] = useState<string>("");
    const [dropDownValue, setDropDownValue] = useState("1");
    const [userValue, setUserValue] = useState<object[]>([]);
    const dispatch = useDispatch<Dispatch>();
    const { user, isError, isSuccess, message } = useSelector(
        (state: any) => state.search,
    );

    const handleSortType = () => {
        if (dropDownValue === "1") {
            setUserValue([...user].sort(characterAscending));
        } else if (dropDownValue === "2") {
            setUserValue([...user].sort(characterDescending));
        } else if (dropDownValue === "3") {
            setUserValue([...user].sort(actorAscending));
        } else if (dropDownValue === "4") {
            setUserValue([...user].sort(actorDescending));
        }
    };

    const characterAscending = (a: IName, b: IName) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    };

    const characterDescending = (a: IName, b: IName) => {
        return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
    };

    const actorAscending = (a: IPortrayed, b: IPortrayed) => {
        return a.portrayed < b.portrayed ? -1 : a.portrayed > b.portrayed ? 1 : 0;
    };

    const actorDescending = (a: IPortrayed, b: IPortrayed) => {
        return a.portrayed < b.portrayed ? 1 : a.portrayed > b.portrayed ? -1 : 0;
    };

    const searchOnTextFieldChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,) => {
        setSearchValue(e.target.value);
    };

    const sortOnSelectChange = (e: { target: { value: string } }) => {
        setDropDownValue(e.target.value as string);
    };

    useEffect(() => {
        setUserValue(user);
    }, [user]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            dispatch(search(searchValue));
        }, 500);

        return () => {
            clearTimeout(debounce);
        };
    }, [searchValue, dispatch]);

    useEffect(() => {
        handleSortType();
    }, [dropDownValue, userValue.length]);

    return (
        <>
            <Box className="container">
                <Box className="heading">
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        value={ searchValue }
                        onChange={ searchOnTextFieldChange }
                    />
                    <Box className="drop-down">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Native Select
                            </InputLabel>
                            <Select
                                variant="outlined"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={ dropDownValue }
                                label="Outlined"
                                onChange={ sortOnSelectChange }
                            >
                                <MenuItem value={ "1" }>Character name ascending</MenuItem>
                                <MenuItem value={ "2" }>Character name descending</MenuItem>
                                <MenuItem value={ "3" }>Actors name ascending</MenuItem>
                                <MenuItem value={ "4" }>Actors name descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                { isError ? message : "" }
                { userValue?.length === 0 ? "no actors" : "" }
                <div className="actors-list">
                    { isSuccess &&
                      userValue.map((user: any) => (
                          <Grid item xs={ 3 } key={ user.char_id }>
                              <ButtonBase>
                                  <Box className="user">
                                      <Box className="img">
                                          <img src={ user.img } alt={ user.name }/>
                                      </Box>
                                      <article>
                                          <p>
                                              { user.name }
                                              <span>{ user.nickname }</span>
                                          </p>
                                      </article>
                                  </Box>
                              </ButtonBase>
                          </Grid>
                      )) }
                </div>
            </Box>
        </>
    );
}
