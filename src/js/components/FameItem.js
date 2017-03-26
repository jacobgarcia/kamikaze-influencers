import React, { Component } from 'react'

class FameItem extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    const user = this.props.user

    return (
      <div className='fame-item'>
        <div className='fame-item-content'>
          <div className='profile'>
            <div className='profile-picture'><img src={user.profile_picture}></img></div>
            <span>@{user.username}</span>
          </div>
          <input type="button" value="+"></input>
        </div>
      </div>

    )
  }

}

export default FameItem
