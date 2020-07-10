import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

import { Classes } from './styles';
import { Card } from '../../../../../../components'

interface LoadingCardProps {
  classes: Classes
}

const LoadingCard: FC<LoadingCardProps> = ({ classes = {} }) => {
  const num = () => {
    const min = Math.ceil(150);
    const max = Math.floor(300);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
    <Card className={classes.restaurantCard}>
      <ContentLoader height={260} width={600}>
        <rect x="0" y="0" rx="4" ry="4" width="225" height="136" />
        <rect x="0" y="150" rx="4" ry="4" width="225" height="46" />
        <rect x="0" y="210" rx="4" ry="4" width="225" height="46" />
        <rect x="248" y="0" rx="1" ry="1" width="160" height="27" />
        <rect x="248" y="35" rx="1" ry="1" width="64" height="14" />
        <rect x="320" y="35" rx="1" ry="1" width="72" height="14" />
        <rect x="248" y="56" rx="1" ry="1" width="108" height="24" />
        <rect x="248" y="88" rx="1" ry="1" width={num()} height="20" />
        <rect x="248" y="118" rx="1" ry="1" width={num()} height="20" />
        <rect x="248" y="148" rx="1" ry="1" width={num()} height="20" />
        <rect x="248" y="178" rx="1" ry="1" width={num()} height="20" />
        <rect x="248" y="208" rx="1" ry="1" width={num()} height="20" />
        <rect x="248" y="236" rx="1" ry="1" width={num()} height="20" />
      </ContentLoader>
    </Card>
  )
}

export default LoadingCard;
