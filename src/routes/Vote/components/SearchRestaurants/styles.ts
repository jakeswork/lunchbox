import { Theme } from "../../../../utils/theme";

export default (theme: Theme) => ({
  container: {
    maxWidth: 752
  },
  restaurantCard: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '32px 0',
    padding: 24,
    border: `1px solid ${theme.colorGrey}`,
    background: 'white',
    borderRadius: 4
  },
  restaurantImg: {
    height: 'calc(100% - 136px)',
    backgroundSize: 'cover',
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: theme.colorGrey,
    display: 'flex',
    justifyContent: 'center',
    color: theme.textPrimary,
    alignItems: 'center'
  },
  imageWrapper: {
    width: 'calc(35% - 16px)',
    marginRight: 24
  },
  infoWrapper: {
    width: '65%'
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  bulletIcon: {
    marginRight: 8,
    marginBottom: 4,
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  inlineText: {
    display: 'inline',
    verticalAlign: 'middle',
    marginBottom: 0
  },
  bullet: {
    margin: '8px 0',
  }
});

export type Classes = {
  container: string;
  restaurantCard: string;
  restaurantImg: string;
  imageWrapper: string;
  infoWrapper: string;
  buttonsWrapper: string;
  bulletIcon: string;
  inlineText: string;
  bullet: string;
};
