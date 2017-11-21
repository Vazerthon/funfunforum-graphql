import axios from 'axios';
import Dataloader from 'dataloader';

export const forumDataFetch = async () => {
  const data = await axios.get(
    'https://ffforumautomator.herokuapp.com/hackable-data',
  );
  return data;
};

export const forumDataloader = new Dataloader(forumDataFetch);
