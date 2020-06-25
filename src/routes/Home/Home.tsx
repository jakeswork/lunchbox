import React, { FC, useState, FormEvent, createRef } from 'react';
import { Plus, LogIn, ArrowRight, Star, Clipboard, Check } from 'react-feather';
import { Link, RouteComponentProps } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import cx from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

import WebSockets from '../../services/WebSockets';
import header from '../../images/header.svg';
import { Text, Button, Input, Modal } from '../../components';
import { Classes } from './styles';
import { User, Location } from '../../types/constants';
import SearchCities from './components/SearchCities';

interface IHomeProps extends RouteComponentProps {
  classes: Classes
  setUser: (arg0: User) => void;
  user: User;
}

const Home: FC<IHomeProps> = ({ classes = {}, setUser, user, history }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCity, setSelectedCity] = useState<Location | null>(null)
  const [disabledInput, setDisabledInput] = useState(-1)
  const [creatingRoom, setCreatingRoom] = useState(false)
  const [roomId, setRoomId] = useState<null | string>(null)
  const [urlCopied, setUrlCopied] = useState(false);
  const [joinVotePanelOpen, setJoinVotePanelOpen] = useState(false);
  const [joinRoomInput, setJoinRoomInput] = useState('')

  const citySearchInput = createRef<HTMLInputElement>();

  const Dot = ({ i = 0 }) => <div className={cx(classes.dot, {[classes.dotActive as string]: currentSlide === i})} />

  const setUserAndTransition = () => {
    if (username.length > 0) {
      setUser({ username })
      citySearchInput?.current?.focus()
    }
  }

  const createRoom = async () => {
    if (!selectedCity || !user.username) return null;

    setCreatingRoom(true)

    try {
      const roomId = await WebSockets.createRoom(user.username, selectedCity)

      setCreatingRoom(false);

      setCurrentSlide(currentSlide + 1);

      return setRoomId(roomId)
    } catch (error) {
      console.error(error)
    }
  }

  const joinExistingVote = () => {
    if (!joinRoomInput) return null;

    const idParts = joinRoomInput.split('/')
    const roomId = idParts.length < 2 ? joinRoomInput.trim() : idParts.pop()?.trim()

    return history.push(`vote/${roomId}`)
  }

  return (
    <main className={classes.main}>
      <img src={header} alt="Man sitting on chef's hat" className={classes.headingImg} />
      <div>
        <Text h1 primaryColor>Lunchbox <span role="img" aria-label="Takeout Box">🥡</span></Text>
        <Text h4>Find the perfect place to eat.</Text>
        <div className={classes.buttonsContainer}>
          <Button
            onClick={() => {
              setModalIsOpen(true); 
              setJoinVotePanelOpen(false);
            }}
            icon={<Plus />}
          >
            Start a Vote
          </Button>
          <Button
            secondary
            icon={<LogIn />}
            onClick={() => setJoinVotePanelOpen(true)}
          >
            Join a Vote
          </Button>
          {
            joinVotePanelOpen && (
              <div className={classes.joinVotePanel}>
                <Text bold>Enter an ID or URL below to start voting.</Text>
                <Input autoFocus value={joinRoomInput} onChange={e => setJoinRoomInput(e.target.value)} placeholder="Enter an ID or URL" />
                <Button onClick={joinExistingVote} icon={<Star />}>Start Voting</Button>
              </div>
            )
          }
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <Text h3>Start a vote</Text>
        <Text>Follow the instructions below to open your vote.</Text>
        <SwipeableViews
          onTransitionEnd={() => setDisabledInput(currentSlide - 1)}
          disabled
          index={currentSlide}
          onChangeIndex={(index: number) => setCurrentSlide(index)}
        >
          <div className={classes.slide}>
            <Text h4>Hello!</Text>
            <Text style={{ marginBottom: 16 }}>Firstly, what name should we call you?</Text>
            <div>
              <Input
                autoFocus
                width="100%"
                onChange={(e: FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
                value={username}
                ignoreTab
                placeholder="Enter a username"
                onEnterPressed={setUserAndTransition}
                disabled={disabledInput === 0}
              />
              <Button
                className={classes.nextButton}
                disabled={username.length < 1 || currentSlide !== 0}
                icon={<ArrowRight />}
                onClick={setUserAndTransition}
              >
                Next
              </Button>
            </div>
          </div>
          <div className={classes.slide}>
            <Text h4>Thanks, {user.username}!</Text>
            <Text style={{ marginBottom: 16 }}>Where are we eating today?</Text>
            <SearchCities
              onCitySelected={setSelectedCity}
              inputRef={citySearchInput}
            />
            <Button
              className={classes.nextButton}
              icon={<Star />}
              onClick={createRoom}
              loading={creatingRoom}
              disabled={!selectedCity || currentSlide !== 1}
            >
              Open Vote
            </Button>
          </div>
          <div className={classes.slide}>
            <Text h4>We're all set</Text>
            <Text style={{ marginBottom: 16 }}>
              You can invite people to join your vote for a place to eat in <b>{selectedCity?.name}</b> using the link below:
            </Text>
            <Link
              to={`vote/${roomId}`}
              rel="noopener noreferrer"
              className={classes.link}
            >
              {`${window.location.href}vote/${roomId}`}
            </Link>
            <Link
              to={`vote/${roomId}`}
              rel="noopener noreferrer"
            >
              <Button style={{ width: '100%' }} icon={<LogIn />}>
                Join Vote
              </Button>
            </Link>
            <CopyToClipboard text={`${window.location.href}vote/${roomId}`} onCopy={() => setUrlCopied(true)}>
              <Button success={urlCopied} secondary icon={urlCopied ? <Check /> : <Clipboard />}>
                Copy to clipboard
              </Button>
            </CopyToClipboard>
          </div>
        </SwipeableViews>
        <div className={classes.dotsWrapper}>
          <Dot />
          <Dot i={1} />
          <Dot i={2} />
        </div>
      </Modal>
    </main>
  )
}

export default Home;
