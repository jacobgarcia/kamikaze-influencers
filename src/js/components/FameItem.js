import React, { Component } from 'react'

class FameItem extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  onFollow(id){
    console.log("Your IG id is " + id)
  }

  render() {
    const user = this.props.user

    return (
      <div className='fame-item'>
        <div className='fame-item-content'>
          <div className='profile'>
            <div className='profile-picture'><img src={user.profile_picture}></img></div>
            <a href={'http://www.instagram.com/' + user.username}>{user.username}</a>
            <span>{user.fullName}</span>
          </div>
          <input type="button" value="+" onClick={() => this.onFollow(user.instagram.id)}></input>
        </div>
      </div>

    )
  }

}

export default FameItem
