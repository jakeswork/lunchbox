import withStyles from "react-jss";
import { connect } from 'react-redux';
import { Dispatch } from "redux";

import Home from "./Home";
import styles from "./styles";
import { State } from '../../reducers'
import { SET_USER } from '../../reducers/user/types';

const mapStateToProps = (state: State) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (payload: any) => dispatch({ type: SET_USER, payload })
})

const styled = withStyles(styles)(Home)

export default connect(mapStateToProps, mapDispatchToProps)(styled)
