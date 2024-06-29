import React, { useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

const Search = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelectedPlace({ lat, lng });
      console.log("Selected Place:", { lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search an address"
          className="form-control"
        />
        <ComboboxPopover>
          {status === "OK" && (
            <ComboboxList>
              {data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
            </ComboboxList>
          )}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;
