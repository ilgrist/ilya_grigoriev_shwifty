import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const WeatherSearch = ({ searchResults, onSearch, onSelectLocation }) => {
  const [txt, setTxt] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    validate(txt);
  }, [txt]);

  const updateInput = (ev) => {
    if (ev) return setTxt(ev.target.value);
  };

  const validate = (txt) => {
    const reg = new RegExp(/^[a-zA-Z ]*$/g);
    const isValid = reg.test(txt);
    if (isValid) {
      setIsError(false);
      setErrorMessage('');
      search();
    } else {
      setIsError(true);
      setErrorMessage('English letters only');
    }
  };

  const search = () => {
    onSearch(txt);
  };

  const selectLocation = (ev, selection, reason) => {
    if (reason) {
      onSelectLocation(selection);
      setTxt('');
    }
  };

  return (
    <div className="autocomplete-cont">
      <Autocomplete
        disablePortal
        freeSolo
        clearOnBlur
        loading={false}
        onChange={selectLocation}
        inputValue={txt}
        onInputChange={(ev) => updateInput(ev)}
        getOptionLabel={(option) => {
          return `${option.LocalizedName}, ${option.Country.LocalizedName}`;
        }}
        id="combo-box-demo"
        options={searchResults}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter city"
            error={isError}
            helperText={errorMessage}
            autoFocus
          />
        )}
      />
    </div>
  );
};
