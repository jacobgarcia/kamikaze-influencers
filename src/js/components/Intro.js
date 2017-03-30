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
    console.log(page)
    if (page === 3) {
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
            <img src="/" className=''></img>
            <h3>Add time</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
        )
      case 1:
        return (
          <div className=''>
            <img src="/" className=''></img>
            <h3>Grow your activity</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
        )
      case 2:
        return (
          <div className=''>
            <img src="/" className=''></img>
            <h3>Become famous</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
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
          <div className='control'></div>
          <ul className='page-nav'>
            {[0,1,2,3].map((number) =>
              <li onClick={() => this.changePage(number)} key={number}></li>
            )}
          </ul>
          <div className='control'onClick={() => this.changePage(this.state.page+1)}>Next</div>
        </div>

        </div>
      </div>
    )
  }

}

export default Intro
