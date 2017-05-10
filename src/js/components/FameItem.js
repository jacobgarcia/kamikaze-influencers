import React, { Component } from 'react'

import NetworkRequest from '../NetworkRequest'
import Localization from '../localization/Localization'

class FameItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      following: false
    }
  }

  onFollow(user_id){
    //document.getElementById('tags-loader').classList.remove('hidden')
    NetworkRequest.updateFameFollowers(user_id)
    .then((response) => {
      const user = response.data.user
      // Update local information
      localStorage.setItem('user', JSON.stringify(response.data.user))
      this.props.onFollow(response.data.user.timeEnd)
      //document.getElementById('tags-loader').classList.add('hidden')
      this.setState({
        following: true
      })
    })
    .catch(error => {
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
      button = null
    } else if (this.state.following){
        button = <input type="button" className='disabled' value={Localization.following_hall}></input>
    } else {
        button = <input type="button" value={Localization.follow} onClick={() => this.onFollow(user.instagram.id)}></input>
    }
    return (
      <div className='fame-item'>
        <div className='fame-item-content'>
          <div className='profile'>
            <div className='profile-picture'><img src={user.profile_picture}></img></div>
            <a href={'http://www.instagram.com/' + user.username}>{user.username}</a>
          </div>
          {button}
        </div>
      </div>

    )
  }

}

export default FameItem
