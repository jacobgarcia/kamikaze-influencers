import React from 'react'

const TimeCard = (props) => {
  return (
    <div className={`time-card ${props.item.name ? '' : 'mini'} ${props.item.type === 1 ? 'fame' : 'default'}`}>
      { props.item.name ? <img src='/'></img> : undefined }
      { props.item.name ? <h2>{props.item.name}</h2> : undefined }
      { props.item.name ? <p>{props.item.description}</p> : undefined }
      <span className='days'>{props.item.days} { props.item.days > 1 ? 'days ' : 'day '}</span>
      <div className='price-wrapper'>
        <span className='price'>${props.item.price}</span>
        { props.item.days > 1 ? <span className='per-day'>${Math.round((props.item.price/props.item.days)*100)/100} per day</span> : undefined }
      </div>
      <div className='buy-now'>
        <input type='button'
          onClick={() => props.purchaseTime(props.item._id)}
          className={`${props.item.type === 1 ? 'red' : 'white'}`}
          value={`${props.item.type === 1 ? 'Buy Fame' : 'Buy Time'}`}></input>
      </div>
    </div>
  )
}

export default TimeCard
