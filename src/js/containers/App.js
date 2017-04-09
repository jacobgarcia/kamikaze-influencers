import React, { Component, TypeProps } from 'react'

import Nav from '../components/Nav'
import NetworkRequest from '../NetworkRequest'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: JSON.parse(localStorage.getItem('user'))
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token')

    if (!token)
      // TODO: handle no token
      return

    NetworkRequest.getProfile()
    .then((response) => {
      const { full_name, _id, profile_picture, username, timeEnd } = response.data.user
      const user = {
        full_name,
        _id,
        profile_picture,
        username,
        timeEnd
      }
      localStorage.setItem('user', JSON.stringify(user))
      this.setState({
        user
      })
    })
    .catch((error) => {
      console.log(error)
    })

  }

  render() {

    return (
      <div className='app'>
        <Nav user={this.state.user}></Nav>
        <div className='body'>
          {this.props.children}
        </div>
      </div>
    )
  }

}

App.TypeProps = {

}

export default App
