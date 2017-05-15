import React, { Component } from 'react'
import Localization from '../localization/Localization'

class Intro extends Component {

  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      visible: props.visible
    }

    this.changePage = this.changePage.bind(this)
  }

  changePage(page) {

    if (page === 4) {
      this.props.onEnd()
      this.setState({
        visible: false
      })
    }

    this.setState({
      page
    })
  }

  getSection(section) {
    switch (section) {
      case 0:
        return (
          <div className=''>
            <img src="/static/img/time.svg" className=''></img>
            <h3>{Localization.time}</h3>
            <p>{Localization.add_time}</p>
          </div>
        )
      case 1:
        return (
          <div className=''>
            <img src="/static/img/activity.svg" className=''></img>
            <h3>{Localization.grow}</h3>
            <p>{Localization.grow_exp}</p>
          </div>
        )
      case 2:
        return (
          <div className=''>
            <img src="/static/img/target.svg" className=''></img>
            <h3>{Localization.target}</h3>
            <p>{Localization.target_exp}</p>
          </div>
        )
      case 3:
        return (
          <div className=''>
            <div className='hall-of-fame-image intro'></div>
            <h3>{Localization.become}</h3>
            <p>{Localization.become_exp}</p>
          </div>
        )
      default:
        return null;
      break;
    }
  }

  render() {
    return (
      <div className={`hover intro ${this.state.visible ? '' : 'hidden'}`}>
        <div className='container'>
        { this.getSection(this.state.page) }
        <div className='intro-nav'>
          <div className='control'onClick={() => this.changePage(this.state.page-1)}>{this.state.page === 0 ? '' : Localization.back}</div>
          <ul className='page-nav'>
            {[0,1,2,3].map((number) =>
              <li onClick={() => this.changePage(number)} key={number} className={this.state.page === number ? 'active' : ''}></li>
            )}
          </ul>
          <div className='control'onClick={() => this.changePage(this.state.page+1)}>{this.state.page === 3 ? Localization.ok : Localization.next}</div>
        </div>

        </div>
      </div>
    )
  }

}

export default Intro
