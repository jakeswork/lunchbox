import React, { Component, FormEvent } from "react"; 
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

interface VoteState {
  username: string;
}

class Vote extends Component<VoteProps, VoteState> {
  state = {
    username: ''
  }

  async componentDidMount () {
    const { setUserRoom, match: { params }, history, user} = this.props

    if (!user || !user.username) {
      try {
        const room = await WebSockets.joinRoom(params.id)

        return setUserRoom(room)
      } catch (error) {
        history.push('/404')
        console.log(error)
      }
    }
  }

  render () {
    const { user, classes } = this.props;
    const { username } = this.state;

    return (
      <main className={classes.root}>
        <Modal closeButton={false} isOpen={!user || !user.username} className={classes.modal}>
          <Text h3>Hello!</Text>
          <Text>You've joined a vote for a place to eat in <b>{user?.room?.city?.name}</b>.</Text>
          <Text>Start by entering a username and selecting <b>up to three</b> of your favourite restaurants.</Text>
          <Text>Hit the "I'm ready" button once you've finished your selection!</Text>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e: FormEvent<HTMLInputElement>) => this.setState({ username: e.currentTarget.value })}
            />
            <Button disabled={username.length <= 0} icon={<Star />}>Start Voting</Button>
          </div>
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
