import React, { FC } from "react"; 
import { Search } from 'react-feather';

import { Text, Input } from '../../components';
import { Classes } from './styles';
import RestaurantCard from './components/RestaurantCard';

interface IVoteProps {
  classes: Classes
}

const Vote: FC<IVoteProps> = ({ classes = {} }) => (
  <main className={classes.root}>
    <Text
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        userSelect: 'none',
      }}
      h4
      bold
      primaryColor
    >
      Lunchbox
    </Text>
    <div className={classes.colSm}>
      <Text bold>Select up to three of your favourite restaurants.</Text>
    </div>
    <div className={classes.colMd}>
      <Input width="100%" placeholder="Search for a restaurant" icon={<Search />} />
      <RestaurantCard />
    </div>
  </main>
)

export default Vote;
