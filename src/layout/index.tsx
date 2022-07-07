import { Grid } from "@material-ui/core";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { search } from "src/reducer/search";
import { store } from "../store";
import "./index.scss";

export interface IName {
    name: number;
}

export interface IPortrayed {
    portrayed: number;
}

export default function App () {
    const [searchValue, setSearchValue] = useState<string>("");
    const [dropDownValue, setDropDownValue] = useState("1");
    const [userValue, setUserValue] = useState<any[]>([]);
    const dispatch = useDispatch<typeof store.dispatch>();
    const { user, isError, isSuccess, message } = useSelector((state: any) => state.search);

    const characterAscending = (a: IName, b: IName) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    };

    const characterDesscending = (a: IName, b: IName) => {
        return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
    };

    const actorAscending = (a: IPortrayed, b: IPortrayed) => {
        return a.portrayed < b.portrayed ? -1 : a.portrayed > b.portrayed ? 1 : 0;
    };

    const actorDesscending = (a: IPortrayed, b: IPortrayed) => {
        return a.portrayed < b.portrayed ? 1 : a.portrayed > b.portrayed ? -1 : 0;
    };

    useEffect(() => {
        setUserValue(user);
    }, [user]);

    useEffect(() => {
        dispatch(search(searchValue));
    }, [searchValue, dispatch]);

    useEffect(() => {
        if (dropDownValue === "1" && userValue) {
            setUserValue([...userValue].sort(characterAscending));
        } else if (dropDownValue === "2" && userValue) {
            setUserValue([...userValue].sort(characterDesscending));
        } else if (dropDownValue === "3" && userValue) {
            setUserValue([...userValue].sort(actorAscending));
        } else if (dropDownValue === "4" && userValue) {
            setUserValue([...userValue].sort(actorDesscending));
        }
    }, [dropDownValue]);

    return (
        <>
            <Box className="container">
                <Box className="heading">
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        value={ searchValue }
                        onChange={ (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            setSearchValue(e.target.value);
                        } }
                    />
                    <Box className="drop-down">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Native Select</InputLabel>
                            <Select
                                variant="outlined"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={ dropDownValue }
                                label="Outlined"
                                onChange={ (e) => {
                                    setDropDownValue(e.target.value as string);
                                } }
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
                <Grid container spacing={ 4 }>
                    { isSuccess && userValue && userValue.map((user: any) => {
                        return (
                            <Grid item xs={ 3 } key={ user.char_id }>
                                <Box className="user">
                                    <Box className="img">
                                        <img src={ user.img } alt={ user.name }/>
                                    </Box>
                                    <article>
                                        <p>{ user.name }<span>{ user.nickname }</span></p>
                                    </article>
                                </Box>
                            </Grid>
                        );
                    }) }
                </Grid>
            </Box>
        </>
    );
};
