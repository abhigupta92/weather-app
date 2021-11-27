import React, { useCallback, useState } from "react";

import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import weatherService from "../../service/weather";

import Mui from "../../mui";

import { LocationSuggestion } from "../../service/weather/types";
import { AxiosResponse } from "axios";

const LocationSearch = (): React.ReactElement => {
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

  const onChangeInput = (value: string) => {
    setSearchString(value);
    setLocations([]);
    if (!isEmpty(value)) {
      setLoading(true);
      debouncedFetch(value);
    }
  };

  return (
    <Mui.Autocomplete
      id="location-search-input"
      freeSolo
      noOptionsText="No Results"
      sx={{
        width: 300,
        borderBottomColor: "white",
        display: { xs: "none", sm: "block" },
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
      onInputChange={(_, newInputValue) => onChangeInput(newInputValue)}
      renderInput={(params) => (
        <Mui.TextField
          {...params}
          variant="standard"
          placeholder="Search Location"
          style={{ borderBottomColor: "white" }}
          InputProps={{
            ...params.InputProps,
            style: { borderBottomColor: "white" },
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <Mui.CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default LocationSearch;
