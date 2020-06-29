import React, { FC, useState, useEffect, FormEvent } from "react"; 
import { Star } from 'react-feather';
import { RouteComponentProps } from 'react-router';

import { Text, Input, Modal, Button } from '../../components';
import { Classes } from './styles';
import WebSockets from '../../services/WebSockets';
import { User } from "../../types/constants";
import SearchRestaurants from './components/SearchRestaurants';
import { OptionalUserPayload } from "../../reducers/user/types";

interface MatchParams {
  id: string;
}

interface VoteProps extends RouteComponentProps<MatchParams> {
  classes: Classes
  user: User
  setUser: (arg0: User) => void
  updateUser: (arg0: OptionalUserPayload) => void
}

const Vote: FC<VoteProps> = ({
  setUser,
  updateUser,
  match: { params },
  history,
  user,
  classes = {},
}) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function joinRoom () {
      try {
        const user = await WebSockets.joinRoom(params.id)

        return setUser(user)
      } catch (error) {
        history.push('/404')
        console.error(error)
      }
    }

    if (!user.username || !user.username.length) joinRoom()
  }, [params, user, history, setUser])

  const updateUsername = async () => {
    const updatedUser = await WebSockets.setUsername(username)

    if (!updatedUser) return null;

    return updateUser({ username: updatedUser.username })
  }

  return (
    <main className={classes.root}>
      <Modal
        closeButton={false}
        isOpen={!user || !user.username || !user.username.length}
        className={classes.modal}
        title="Join a vote"
      >
        <Text h4>Hey! <span role="img" aria-label="waving hand">👋</span></Text>
        <Text>You've joined a vote for a place to eat in <b>{user?.room?.city?.name}</b>.</Text>
        <Text>Start by entering a username and selecting <b>up to three</b> of your favourite restaurants.</Text>
        <Text>Hit the "I'm ready" button once you've finished your selection!</Text>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
          <Input
            placeholder="Enter a username"
            value={username}
            onEnterPressed={updateUsername}
            onChange={(e: FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
          />
          <Button
            disabled={username.length <= 0}
            onClick={updateUsername}
            icon={<Star />}
          >
            Start Voting
          </Button>
        </div>
      </Modal>
      <Text
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          userSelect: 'none',
        }}
        h4
        primaryColor
      >
        Appetite
      </Text>
      <div className={classes.colSm}>
      </div>
      <div className={classes.colMd}>
        {user && user.username && user.username.length && <SearchRestaurants />}
      </div>
    </main>
  )
}

export default Vote;
