import axios from 'axios';

const forumDataFetch = async () => {
  const data = await axios.get(
    'https://ffforumautomator.herokuapp.com/hackable-data',
  );
  return data;
};

export default forumDataFetch;
