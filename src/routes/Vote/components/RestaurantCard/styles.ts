import { Theme } from "../../../../utils/theme";

export default (theme: Theme) => ({
  restaurantCard: ({ compact = false }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: compact ? 24 : 32,
    padding: compact ? 16 : 24,
  }),
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
  infoWrapper: ({ compact = false }) => ({
    width: compact ? '100%' : '60%',
    display: compact ? 'flex' : 'block',
    alignItems: 'center',
  }),
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
  },
  compact: ({ compact = false }) => ({
    minWidth: compact ? '40%' : 'auto'
  })
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
  compact: string;
};
