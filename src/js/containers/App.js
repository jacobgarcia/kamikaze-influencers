import React, { Component, TypeProps } from 'react'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className=''>
        <nav>
          <div className=''>
            <div className=''><img src=""></img></div>
            <span>username</span>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }

}

App.TypeProps = {

}

export default App
