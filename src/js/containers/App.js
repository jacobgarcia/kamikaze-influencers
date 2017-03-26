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
    if (token) {
      NetworkRequest.getProfile((response, err) => {
        if (err) console.log(err)
        //console.log(response.data)
        const { full_name, id, profile_picture, username } = response.data
        const user = {
          'full_name': full_name,
          'id': id,
          'profile_picture': profile_picture,
          'username': username
        }
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({
          user
        })
      })
    }
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
