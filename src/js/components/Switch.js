import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Switch extends Component {

  constructor(props) {
    super(props)

    //Set inital state
    this.state = {
      active: this.props.active
    }

    this.onActiveChange = this.onActiveChange.bind(this)

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.state.active) {
      this.setState({ active: nextProps.active })
    }
  }

  onActiveChange(event) {
    event.stopPropagation()
    const active = event.target.checked

    //Set new state
    this.setState({
      active: active
    })

    //Call onActiveChange parent's func
    this.props.onChange(active)
  }

  render() {
    return (
      <div className="switch-element draggable">
        <input
          id={`toggle-${this.props.id}`}
          className="switch"
          type="checkbox"
          onChange={this.onActiveChange}
          checked={this.state.active ? "checked" :  ""}
          />
        <label className="label" htmlFor={`toggle-${this.props.id}`}/>
      </div>
    )
  }
}

Switch.propTypes = {
  active: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired
}

export default Switch
