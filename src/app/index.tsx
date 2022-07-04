import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchService } from "../components/Search";
import { AppDispatch } from "../store";

declare type IName = { name: number; }

declare type IPortrayed = { portrayed: number; }

export default function App () {
    const [searchValue, setSearchValue] = useState<string>("");
    const [dropDownValue, setDropDownValue] = useState("1");
    const [userValue, setUserValue] = useState<any[] | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.search);

    const characterAscending = (a: IName, b: IName) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };

    const characterDesscending = (a: IName, b: IName) => {
        if (a.name < b.name) {
            return 1;
        }
        if (a.name > b.name) {
            return -1;
        }
        return 0;
    };

    const actorAscending = (a: IPortrayed, b: IPortrayed) => {
        if (a.portrayed < b.portrayed) {
            return -1;
        }
        if (a.portrayed > b.portrayed) {
            return 1;
        }
        return 0;
    };

    const actorDesscending = (a: IPortrayed, b: IPortrayed) => {
        if (a.portrayed < b.portrayed) {
            return 1;
        }
        if (a.portrayed > b.portrayed) {
            return -1;
        }
        return 0;
    };

    useEffect(() => {
        setUserValue(user);
    }, [user]);

    useEffect(() => {
        dispatch(searchService(searchValue));
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
                        onChange={ (e) => {
                            setSearchValue(e.target.value);
                        } }
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
                                onChange={ (e) => {
                                    setDropDownValue(e.target.value as string);
                                } }
                            >
                                <MenuItem value={ "1" }>Character name ascending</MenuItem>
                                <MenuItem value={ "2" }>Character name desscending</MenuItem>
                                <MenuItem value={ "3" }>Actors name ascending</MenuItem>
                                <MenuItem value={ "4" }>Actors name descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                { isError ? message : "" }

                { userValue?.length === 0 ? "no actors" : "" }

                {/* ascending */ }

                <Grid container spacing={ 4 }>
                    { isSuccess &&
                      userValue &&
                      userValue.map((user: any) => {
                          const { char_id, name, img, nickname } = user;
                          return (
                              <Grid item xs={ 3 } key={ char_id }>
                                  <Box className="user">
                                      <Box className="img">
                                          <img src={ img } alt={ name }/>
                                      </Box>
                                      <article>
                                          <p>
                                              { name }
                                              <span>{ nickname }</span>
                                          </p>
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
