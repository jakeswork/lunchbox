import { Theme } from "../../../../../../utils/theme";

export default (theme: Theme) => ({
  restaurantCard: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 32,
    padding: 24,
  },
  imageWrapper: {
    width: 'calc(40% - 16px)',
    marginRight: 24
  },
  restaurantImg: {
    height: 'calc(100% - 136px)',
    backgroundSize: 'cover',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: theme.colorGrey,
    display: 'flex',
    justifyContent: 'center',
    color: theme.textPrimary,
    alignItems: 'center'
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  infoWrapper: {
    width: '60%'
  },
  inlineText: {
    display: 'inline',
    verticalAlign: 'middle',
    marginBottom: 0
  },
  bulletIcon: {
    marginRight: 8,
    marginBottom: 4,
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  bullet: {
    margin: '8px 0',
  }
});

export type Classes = {
  restaurantCard: string;
  imageWrapper: string;
  restaurantImg: string;
  buttonsWrapper: string;
  infoWrapper: string;
  inlineText: string;
  bulletIcon: string;
  bullet: string;
};
