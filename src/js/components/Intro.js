import React, { Component } from 'react'

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
            <h3>Add time</h3>
            <p>You will need to add time to your account in order to grow your activity.</p>
          </div>
        )
      case 1:
        return (
          <div className=''>
            <img src="/static/img/activity.svg" className=''></img>
            <h3>Grow your activity</h3>
            <p>Start using your time liking, following and commenting to increase your followers.</p>
          </div>
        )
      case 2:
        return (
          <div className=''>
            <img src="/static/img/target.svg" className=''></img>
            <h3>Target your audience</h3>
            <p>Reach your audience using different types of targeting.</p>
          </div>
        )
      case 3:
        return (
          <div className=''>
            <img src="/" className=''></img>
            <h3>Become famous</h3>
            <p>Scale the top of the Hall of Fame and start winning new followers much faster.</p>
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
          <div className='control'onClick={() => this.changePage(this.state.page-1)}>{this.state.page === 0 ? '' : 'Back'}</div>
          <ul className='page-nav'>
            {[0,1,2,3,4].map((number) =>
              <li onClick={() => this.changePage(number)} key={number} className={this.state.page === number ? 'active' : ''}></li>
            )}
          </ul>
          <div className='control'onClick={() => this.changePage(this.state.page+1)}>{this.state.page === 3 ? 'OK' : 'Next'}</div>
        </div>

        </div>
      </div>
    )
  }

}

export default Intro
