import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Localization from '../localization/Localization'
import FameItem from './FameItem'

function HallOfFame(props) {
  return (
    <div className='hall-section'>
      <div className="hall-of-fame-title">
        <h4><span className="fame-span">{Localization.fame}</span></h4>
        <div className='hint white'>
          <span><b>{Localization.hall}</b>{Localization.hall_exp3}</span>
        </div>
      </div>

      <div className='hall-of-fame'>
      {props.famous ?
        <FameItem username={props.username}
          onFollow={props.onFollow}
          picture={props.profilePicture}/>
      : undefined }
        {props.hallOfFame.map((user, index) =>
          <FameItem username={user.username}
            onFollow={props.onFollow}
            key={index}
            instagram_id={user.instagram.id}
            picture={user.profile_picture} />
        )}
        {props.hallOfFollowing.map((user, index) =>
          <FameItem username={user.username}
            onFollow={props.onFollow}
            key={index}
            instagram_id={user.instagram.id}
            picture={user.profile_picture}
            following={true}/>
        )
      }
      </div>
      <span className="free">{ Localization.hall_coa}</span>
    </div>
  )
}

export default HallOfFame
