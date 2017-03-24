import React, { Component } from 'react'

const redirect_uri = 'http://localhost:8080/authenticate'
const client_id = '4133eeeafdea4e15b6447df3bef09a9c'

class Landing extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className='landing'>
        <a href={`https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token`}>Login</a>
      </div>
    )
  }

}

export default Landing
