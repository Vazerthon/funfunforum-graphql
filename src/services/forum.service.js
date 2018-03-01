import axios from 'axios';

const forumDataFetch = async () => {
  const data = await axios.get(
    'https://funfunautomator.herokuapp.com/hackablejson',
  );
  return data;
};

export default forumDataFetch;
