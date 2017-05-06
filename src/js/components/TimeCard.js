import React from 'react'
import Localization from '../localization/Localization'

const TimeCard = (props) => {
  return (
    <div className={`time-card ${props.item.name ? '' : 'mini'} ${props.item.type === 1 ? 'fame' : 'default'}`}>
      { props.item.name ? <img src='/'></img> : undefined }
      { props.item.name ? <h2>{Localization.famous}</h2> : undefined }
      { props.item.name ? <p>{Localization.faster}</p> : undefined }
      <span className='days'>{props.item.days} { props.item.days > 1 ? Localization.day_s : Localization.day}</span>
      <div className='price-wrapper'>
        <span className='price'>${props.item.price}</span>
        { props.item.days > 1 ? <span className='per-day'>${Math.round((props.item.price/props.item.days)*100)/100} {Localization.per_day}</span> : undefined }
      </div>
      <div className='buy-now'>
        <input type='button'
          onClick={() => props.purchaseTime(props.item._id)}
          className={`${props.item.type === 1 ? 'red' : 'white'}`}
          value={`${props.item.type === 1 ? Localization.buy_fame : Localization.buy_time}`}></input>
      </div>
    </div>
  )
}

export default TimeCard
