import React, { Component } from 'react'

import NetworkRequest from '../NetworkRequest'

class FameItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      following: false
    }
  }

  onFollow(user_id){
    console.log("Your IG id is " + user_id)
    //document.getElementById('tags-loader').classList.remove('hidden')
    NetworkRequest.updateFameFollowers(user_id)
    .then((response) => {
      const user = response.data.user
      // Update local information
      localStorage.setItem('user', JSON.stringify(response.data.user))
      //document.getElementById('tags-loader').classList.add('hidden')
      this.setState({
        following: true
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    //  document.getElementById('tags-loader').classList.add('hidden')
    })
  }

  render() {
    const user = this.props.user
    const instagram_id = this.props.instagram_id

    let button = undefined
    if (user.instagram.id === instagram_id) {
      button = <input type="button" value=""></input>
    } else if (this.state.following){
        button = <input type="button" value="Following"></input>
    } else {
        button = <input type="button" value="+" onClick={() => this.onFollow(user.instagram.id)}></input>
    }
    return (
      <div className='fame-item'>
        <div className='fame-item-content'>
          <div className='profile'>
            <div className='profile-picture'><img src={user.profile_picture}></img></div>
            <a href={'http://www.instagram.com/' + user.username}>{user.username}</a>
            <span>{user.fullName}</span>
          </div>
          {button}
        </div>
      </div>

    )
  }

}

export default FameItem
