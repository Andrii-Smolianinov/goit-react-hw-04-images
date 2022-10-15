import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import {
  HeaderSearchbar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from 'components/Searchbar/StylesSearchbar';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warn('🥴🥴🥴 введіть запит!', { theme: 'colored' });
      return;
    }
    onSubmit(searchQuery);    
    setSearchQuery('');
  };
  

  return (
    <HeaderSearchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit"  onClick={handleSubmit}>
          <ImSearch style={{ marginRight: 8 }} />
          <SearchFormButtonLabel></SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={searchQuery}
        />
      </SearchForm>
    </HeaderSearchbar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
