import React, { Component } from "react"; 
import { Search, Star } from 'react-feather';
import { RouteComponentProps } from 'react-router';

import { Text, Input, Modal, Button } from '../../components';
import { Classes } from './styles';
import WebSockets from '../../services/WebSockets';
import RestaurantCard from './components/RestaurantCard';
import { User, Room } from "../../types/constants";

interface MatchParams {
  id: string;
}

interface VoteProps extends RouteComponentProps<MatchParams> {
  classes: Classes
  user: User
  setUserRoom: (arg0: Room) => void
}

class Vote extends Component<VoteProps> {
  async componentDidMount () {
    const { setUserRoom, match: { params }, user} = this.props

    if (!user || !user.username) {
      const room = await WebSockets.joinRoom(params.id)

      return setUserRoom(room)
    }
  }

  render () {
    const { user, classes } = this.props;

    return (
      <main className={classes.root}>
        <Modal isOpen={!user || !user.username}>
          <Text h3>Hello!</Text>
          <Text h4>You've joined a vote for a place to eat in <b>{user?.room?.location?.name}</b>.</Text>
          <Text>Start by entering a username and selecting <b>up to three</b> of your favourite restaurants.</Text>
          <Text>Hit the "I'm ready" button once you've finished your selection!</Text>
          <Input placeholder="Enter a username" />
          <Button icon={<Star />}>Start Voting</Button>
        </Modal>
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
  }
}

export default Vote;
