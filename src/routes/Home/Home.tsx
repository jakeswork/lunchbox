import React, { FC, useState, FormEvent, createRef } from 'react';
import { Plus, LogIn, X, ArrowRight, Star, Search, Clipboard, Check } from 'react-feather';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import SwipeableViews from 'react-swipeable-views';
import cx from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

import WebSockets from '../../services/WebSockets';
import './react-modal.css';
import header from '../../images/header.svg';
import { Text, Button, Input } from '../../components';
import { Classes } from './styles';
import { User, Location } from '../../types/constants';
import Zomato from '../../services/Zomato';

interface IHomeProps {
  classes: Classes
  setUser: Function;
  user: User;
}

Modal.setAppElement('#root')

const Home: FC<IHomeProps> = ({ classes = {}, setUser, user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0);
  const [city, setCity] = useState('')
  const [suggestedCities, setSuggestedCities] = useState<Array<Location> | null>(null);
  const [selectedCity, setSelectedCity] = useState<Location | null>(null)
  const [disabledInput, setDisabledInput] = useState(-1)
  const [creatingRoom, setCreatingRoom] = useState(false)
  const [roomId, setRoomId] = useState<null | string>(null)
  const [urlCopied, setUrlCopied] = useState(false);

  const usernameInput = createRef<HTMLInputElement>();
  const citySearchInput = createRef<HTMLInputElement>();

  const openModal = () => setModalIsOpen(true)

  const closeModal = () => setModalIsOpen(false)

  const Dot = ({ i = 0 }) => <div className={cx(classes.dot, {[classes.dotActive as string]: currentSlide === i})} />

  const setUserAndTransition = () => {
    if (username.length > 0) {
      setUser({ username })
      citySearchInput?.current?.focus()
    }
  }

  const searchCities = async () => {
    const results = await Zomato.searchCities(city)

    if (!results) return setSuggestedCities([])

    return setSuggestedCities(results)
  }

  const selectCity = (city: Location) => {
    setSelectedCity(city)
    setCity(city.name)
    return setSuggestedCities(null)
  }

  const createRoom = async () => {
    setCreatingRoom(true)

    if (!selectedCity) return null;

    try {
      const roomId = await WebSockets.createRoom(user.username, selectedCity.id)

      setCreatingRoom(false);
      setCurrentSlide(currentSlide + 1);
      return setRoomId(roomId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className={classes.main}>
      <img src={header} alt="Man sitting on chef's hat" className={classes.headingImg} />
      <div>
        <Text h1 primaryColor>Lunchbox <span role="img" aria-label="Takeout Box">🥡</span></Text>
        <Text h4>Find the perfect place to eat.</Text>
        <div className={classes.buttonsContainer}>
          <Button onClick={openModal} icon={<Plus />}>Start a Vote</Button>
          <Button secondary icon={<LogIn />}>Join a Vote</Button>
        </div>
      </div>
      <Modal
        className={classes.modal}
        closeTimeoutMS={200}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onAfterOpen={() => usernameInput?.current?.focus()}
        contentLabel="Start A Vote"
        style={{
          overlay: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }}
      >
        <Text h3>Start a vote</Text>
        <X className={classes.closeModal} onClick={closeModal} />
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
                ref={usernameInput}
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
            <div style={{ position: 'relative' }}>
              <Input
                ref={citySearchInput}
                width="100%"
                disabled={disabledInput === 1}
                value={city}
                ignoreTab
                onChange={(e: FormEvent<HTMLInputElement>) => setCity(e.currentTarget.value)}
                placeholder="Search for a city"
                onEnterPressed={searchCities}
                icon={<Search onClick={searchCities} style={{ cursor: 'pointer' }} />}
              />
              {
                suggestedCities && (
                  <div className={classes.suggestionsWrapper}>
                    {
                      suggestedCities.length > 0
                        ? suggestedCities.map(c => (
                            <div
                              key={c.id}
                              className={classes.suggestion}
                              onClick={() => selectCity(c)}
                            >
                              <Text bold>{c.name}</Text>
                            </div>
                          ))
                        : <Text bold>We're not available in your city yet!</Text>
                    }
                  </div>
                )
              }
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
          </div>
          <div className={classes.slide}>
            <Text h4>We're all set</Text>
            <Text style={{ marginBottom: 16 }}>You can invite people to join your vote using the link below.</Text>
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
