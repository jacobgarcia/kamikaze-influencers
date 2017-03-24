import React, { Component } from 'react'

const redirect_uri = 'http://owainfluencers.com/authenticate'
const client_id = '4133eeeafdea4e15b6447df3bef09a9c'

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className=''>
        <a href={`https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`}>Redirect</a>
      </div>
    )
  }

}

export default Dashboard
