import React, { Component, Fragment } from 'react';
import styles from './App.module.scss';
import classNames from 'classnames/bind';
import { 
  Switch, 
  Route, 
  withRouter 
} from 'react-router-dom';
import { inject } from 'mobx-react';
import { action } from 'mobx';
import Landing from '../../pages/Landing';
import Login from '../../pages/Login/Login';
import Main from '../../pages/Main';
import Case from '../../pages/Case';
import ClinicalDB from '../../pages/ClinicalDB/ClinicalDB';
import Page404 from '../common/Page404/Page404';

const cx = classNames.bind(styles);

@withRouter
@inject('userStore')
class App extends Component { 
  
  @action _initialize = async () => {
    await this.props.userStore.setLoginUser();
  }

  _redirect = () => {
    this.props.history.replace('/');
  }
  
  @action componentWillMount() {
    this._initialize();
  }

  componentDidMount() {
    if (this.props.location.pathname === '/login' && this.props.userStore.getIsLoggedIn ) {
      this._redirect();
    }
  }

  _renderApp = (user, isLoggedIn) => {
    if (!user) {
      return (
        <div className={cx('App')}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Landing} />
            <Route component={Page404} />
          </Switch>
        </div>
      );
    }
    if (user && isLoggedIn) {
      return (
        <div className={cx('App')}>
          <Switch>
            <Route path="/clinicaldb" component={ClinicalDB} />
            <Route path="/case" component={Case} />
            <Route path="/" exact component={Main} />
            <Route component={Page404} />
          </Switch>
        </div>
      );
    }
  }

  render() {
    const isLoggedIn = this.props.userStore.getIsLoggedIn;
    const user = this.props.userStore.getLoginUser;
    return (
      <Fragment>
        {this._renderApp(user, isLoggedIn)}
      </Fragment>
    )
  }
}

export default App;
