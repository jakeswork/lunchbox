import React, { FC } from 'react';
import { Star } from 'react-feather';

import theme from '../../../../../../utils/theme';
import { Classes } from './styles';

interface StarRatingProps {
  rating?: number;
  classes: Classes
}

const StarRating: FC<StarRatingProps> = ({ rating = 0, classes = {} }) => {
  const props = {
    size: 20
  }
  const ratings = [1, 2, 3, 4, 5];
  const stars = ratings.map((r) => {
    if (r < rating) return <Star {...props} key={r} fill={theme.colorAmber} color={theme.colorAmber} />

    return <Star {...props} key={r} color={theme.colorGrey} />
  })

  return (
    <div className={classes.root}>
      {stars}
    </div>
  )
}

export default StarRating;
