import React, { FC, useState, RefObject } from 'react';
import Autosuggest from 'react-autosuggest';
import cx from 'classnames';
import { Search } from 'react-feather';

import { Text, Input } from '../../../../components';
import { City } from '../../../../types/constants';
import { Classes } from './styles';
import Zomato from '../../../../services/Zomato';

interface SearchCitiesProps {
  onCitySelected: (arg0: City) => void;
  inputRef?: RefObject<HTMLInputElement>;
  classes: Classes;
}

const SearchCities: FC<SearchCitiesProps> = ({ onCitySelected = () => {}, inputRef, classes = {} }) => {
  const [query, setQuery] = useState('')
  const [suggestedCities, setSuggestedCities] = useState<City[]>([]);
  const searchCities = async () => {
    const results = await Zomato.searchCities(query)

    if (!results) return setSuggestedCities([])

    return setSuggestedCities(results)
  }

  return (
    <Autosuggest
      suggestions={suggestedCities}
      inputProps={{
        onChange: (_, { newValue }) => setQuery(newValue),
        value: query,
      }}
      multiSection={false}
      shouldRenderSuggestions={value => value.length > 3}
      getSuggestionValue={s => s && s.name}
      onSuggestionSelected={(_, { suggestion }) => onCitySelected(suggestion)}
      highlightFirstSuggestion
      onSuggestionsFetchRequested={searchCities}
      focusInputOnSuggestionClick={false}
      onSuggestionsClearRequested={() => setSuggestedCities([])}
      renderSuggestion={(s: City, { isHighlighted }) => s && (
        <Text
          bold
          className={cx(classes.suggestion, {
            [classes.suggestionHighlighted as string]: isHighlighted
          })}
        >
          {s.name}
        </Text>
      )}
      renderInputComponent={(props) => (
        <Input
          {...props as any}
          ref={inputRef}
          width="100%"
          ignoreTab
          placeholder="Search for a city"
          icon={<Search />}
        />
      )}
    />
  )
}

export default SearchCities;
