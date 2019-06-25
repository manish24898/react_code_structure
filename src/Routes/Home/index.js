import React, { Component } from 'react';
import './styles.scss';

import { Page } from '../../Components/HOC';
import { ImageIcon } from '../../Components/Atom';
import { SearchWave, ProfileStack } from '../../Components/Cell';
import { Typography } from '@material-ui/core';
import { Icons } from '../../Shared';
import { RouterService } from '../../Services';
import { Routes } from '../../Config';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      users: [],
      currentUserId: null
    }
  }

  componentDidMount() {
    this.searchUsers();
  }

  searchUsers() {
    this.toggleSearching();
    fetch('https://randomuser.me/api/?results=10')
      .then(response => response.json())
      .then(data => {
        let { results } = data;
        let users = results.map((user, index) => {
          let { login, name, dob, picture } = user;
          return {
            id: login.uuid,
            name: `${name.first} ${name.last}`,
            distance: Math.floor(Math.random() * 100 + 10),
            age: dob.age,
            images: [picture.large, picture.medium, picture.thumbnail]
          };
        });

        this.toggleSearching();
        this.setState({
          users,
          currentUserId: (users[0] || {}).id
        });
      });
  }

  gotoMatches() {
    RouterService.pushRoute(Routes.MATCHES);
  }

  toggleSearching() {
    this.setState(state => ({
      searching: !state.searching
    }));
  }

  onLike(id) {
    this.setActiveUser(id);
  }

  onDislike(id) {
    this.setActiveUser(id);
  }

  onUndo() {
    if (this.lastUser) { // TODO: apply other checks for undo
      this.setState(state => ({
        users: [this.lastUser, ...state.users],
        currentUserId: this.lastUser.id
      }), () => {
        this.lastUser = null;
      });
    }
  }

  setActiveUser(id) {
    let users = [...this.state.users];
    let index = users.findIndex(user => user.id === id);
    let currentUser = users[index + 1];

    this.setState({
      currentUserId: (currentUser ? currentUser.id : null)
    });
  }

  removeUser(id) {
    let users = [...this.state.users];
    let index = users.findIndex(user => user.id === id);

    if (index >= 0) {
      this.lastUser = users.splice(index, 1);

      this.setState({
        users
      }, () => {
        if (this.state.users.length === 0) {
          // All users are swiped out
          this.searchUsers();
        }
      });
    }
  }

  render() {
    let { searching } = this.state;
    return (
      <Page
        pageClassName={'home-page'}
        containerClassName={'home-container'}
        headerProps={{
          rightIcon: false ,
          hasCenterIcon: false,
          onRight: this.gotoMatches.bind(this)
        }}
      >
        {searching ?
          <div className={'search-wave-wrapper'}>
            <div className={'wave-wrapper'}>
              <SearchWave />
            </div>
            <Typography className={'search-info'}>
              Loading...
            </Typography>
          </div>
          : <div>Main section</div>
        }
      </Page>
    );
  }
}

export default HomePage;