export default {
  selectionWrapper: {
    margin: '16px 0',
  },
  restaurantListItem: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > svg': {
      cursor: 'pointer'
    }
  }
};

export type Classes = {
  selectionWrapper: string;
  restaurantListItem: string;
};
