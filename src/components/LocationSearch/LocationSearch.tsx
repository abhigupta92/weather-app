import React, { useCallback, useState } from "react";

import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import weatherService from "../../service/weather";

import { Box, Autocomplete, TextField, CircularProgress } from "../mui";

import { LocationSuggestion } from "../../service/weather/types";
import { AxiosResponse } from "axios";

import stylesCreator from "./styles";
import "./index.css";

type Props = {
  onChange: (option: LocationSuggestion) => void;
};
const LocationSearch = (props: Props): React.ReactElement => {
  const { onChange } = props;
  const [searchString, setSearchString] = useState<string | undefined>("");
  const [open, setOpen] = useState<boolean>(false);
  const [locations, setLocations] = React.useState<
    readonly LocationSuggestion[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleResponse = (response: AxiosResponse) => {
    const { data } = response;
    setLocations(data);
    setLoading(false);
  };

  const fetchLocation = (value: string) => {
    if (!isEmpty(value)) {
      weatherService.getLocationSuggestions(value).then(handleResponse);
    } else {
      setLocations([]);
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((nextValue) => fetchLocation(nextValue), 1000),
    [] // will be created only once initially
  );

  const onChangeInput = (_: any, value: string) => {
    setSearchString(value);
    setLocations([]);
    if (!isEmpty(value)) {
      setLoading(true);
      debouncedFetch(value);
    }
  };

  const onChangeLocation = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string | LocationSuggestion | null
  ) => onChange(value as LocationSuggestion);

  const classes = stylesCreator();
  return (
    <Box className="location-search-container">
      <Autocomplete
        id="location-search-input"
        freeSolo
        noOptionsText="No Results"
        sx={{
          width: "100%",
          borderBottomColor: "white",
          paddingRight: { xs: 0, sm: 2 },
        }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={(
          option: LocationSuggestion,
          value: LocationSuggestion
        ) => option.name === value.name}
        getOptionLabel={(option: LocationSuggestion) => option.name}
        options={locations}
        loading={loading}
        popupIcon=""
        inputValue={searchString}
        onInputChange={onChangeInput}
        onChange={onChangeLocation}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Search Location"
            InputProps={{
              ...params.InputProps,
              classes: {
                root: classes.inputRoot,
                underline: classes.underline,
              },
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default LocationSearch;
