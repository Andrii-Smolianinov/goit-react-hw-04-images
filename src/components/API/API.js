import axios from 'axios';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30113842-e56eb4bc3062add658b965540';
const LIMIT = 15;
const instance = axios.create({
  baseURL: `${BASE_URL}?key=${API_KEY}&image_type=photo`,
  params: {
    per_page: LIMIT,
  },
});

export const searchPosts = async (q, page = 1) => {
  const { data } = await instance.get('&', {
    params: {
      page,
      q,
    },
  });
  return data;
};
searchPosts.propTypes = {
  page: PropTypes.number,
  q: PropTypes.string,
};
