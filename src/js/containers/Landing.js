import React, { Component } from 'react'

import Footer from '../components/Footer'
import Signin from '../components/Signin'
import NetworkRequest from '../NetworkRequest'

import Localization from '../localization/Localization'

export default class Landing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSignin: false,
      timeItems: []
    }

  }

  componentWillMount() {
    NetworkRequest.getTimeItems()
    .then((response) => {
      this.setState({
        timeItems: response.data.items.filter((item) => item.type === 0)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className='landing'>
        <Signin show={this.state.showSignin} id='landing' title='Iniciar sesión'/>
        <div className='hero'>
          <video poster="/static/img/hero.jpeg"  playsInline autoPlay loop>
            <source src="/static/video/hero.mp4" type="video/mp4"/>
            Your browser doesn't support video
          </video>
          <div className='content'>
            <h1>TEST</h1>
            <p>{Localization.subheader}</p>
            <p>{Localization.signup_now} </p>
            <input type="button" value={Localization.sign} onClick={() => this.setState({ showSignin: true })}/>
          </div>
        </div>
        <div className='content'>
          <div className='aside top'>
            <div className='mini-section easy'>
              <h3>{Localization.ease}</h3>
              <p>{Localization.ease_exp}</p>
            </div>
            <div className='mini-section for-all'>
              <h3>{Localization.everyone}</h3>
              <p>{Localization.everyone_exp}</p>
            </div>
            <div className='mini-section organic'>
              <h3>{Localization.organic}</h3>
              <p>{Localization.organic_exp}</p>
            </div>
          </div>
          <div className='element center'>
            <div className='element-content'>
              <h1>{Localization.header}</h1>
            </div>
          </div>
          <div className='element'>
            <div className='image-container'>
              <div className='image connectivity'></div>
            </div>
            <div className='element-content'>
              <h2>{Localization.reach}</h2>
              <p>{Localization.reach_exp}</p>
              <p>{Localization.reach_exp2}</p>
            </div>
          </div>
          <div className='element center'>
            <h2>{Localization.audience}</h2>
            <p>{Localization.audience_exp}</p>
          </div>
          <div className='targets-wrapper'>
            <div className='target'>
              <div className='image-container'>
                <div className='image content'></div>
              </div>
              <div className='element-content'>
                <h2>{Localization.content}</h2>
                <p>{Localization.content_exp}</p>
              </div>
            </div>
            <div className='target'>
              <div className='image-container'>
                <div className='image location'></div>
              </div>
              <div className='element-content'>
                <h2>{Localization.location}</h2>
                <p>{Localization.location_exp}</p>
              </div>
            </div>
            <div className='target'>
              <div className='image-container'>
                <div className='image exceptions'></div>
              </div>
              <div className='element-content'>
                <h2>{Localization.exceptions}</h2>
                <p>{Localization.exceptions_exp}</p>
              </div>
            </div>
            <div className='target'>
              <div className='image-container'>
                <div className='image users'></div>
              </div>
              <div className='element-content'>
                <h2>{Localization.users}</h2>
                <p>{Localization.users_exp}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='hall-of-fame'>
          <h1>{Localization.attention}</h1>
          <h3>{Localization.expose}</h3>
          <div className='aside'>
            <div className='image-container'>
              <div className='hall-of-fame-image'></div>
            </div>
            <div className='element-content'>
              <h1>{Localization.hall}</h1>
              <p>{Localization.hall_exp}</p>
              <p>{Localization.hall_exp2}</p>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='element center'>
            <div className='element-content'>
              <h1>{Localization.package_time}</h1>
              <p>{Localization.time_exp}</p>
              <p>{Localization.time_exp2}</p>
              <div className='packages'>
                { this.state.timeItems.map((item, index) =>
                  <div className='timepack' key={index}>
                    <span className='days'>{item.days} { item.days > 1 ? Localization.day_s : Localization.day}</span>
                    <div className='price-wrapper'>
                      <span className='price'>${item.price}</span>
                      { item.days > 1 ? <span className='per-day'>${Math.round((item.price/item.days)*100)/100} {Localization.per_day} </span> : undefined }
                    </div>
                  </div>
                )}
              </div>
              <input type='button' value={Localization.buy_now} className='red' onClick={() => this.setState({ showSignin: true })}/>
              <div className='spacing'>
                <p>{Localization.packages}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer loggedin={false}>
          <h1>{Localization.wave}</h1>
          <p>{Localization.enter}</p>
          <input type='button' value={Localization.sign} onClick={() => this.setState({ showSignin: true })}/>
        </Footer>
      </div>
    )
  }
}
