import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import {
  HeaderSearchbar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from 'components/Searchbar/StylesSearchbar';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = event => {
    this.setState({ searchQuery: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.warn('🥴🥴🥴 введіть запит!', { theme: 'colored' });
      return;
    }
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    //onSubmit - пропс у якому передається у <Searchbar onSubmit={onSearch} з PostSearch. звязує state з PostSearch.
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    const { handleSubmit, handleInputChange } = this;
    return (
      <HeaderSearchbar>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit" onClick={handleSubmit}>
            <ImSearch style={{ marginRight: 8 }} />
            <SearchFormButtonLabel></SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            className="input"
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
}
