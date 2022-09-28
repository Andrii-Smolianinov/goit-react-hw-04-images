import { StylesButton } from 'components/Button/StylesButton';
import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => {
  return (
    <StylesButton type="button" onClick={loadMore}>
      Load more
    </StylesButton>
  );
};
Button.propTypes = {
  loadMore: PropTypes.func,
};
