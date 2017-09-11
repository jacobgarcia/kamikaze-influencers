import React, { Component } from 'react'
import Localization from '../localization/Localization'

class Tags extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tags: this.props.tags || [],
      tagsString: '',
      active: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.keyDown = this.keyDown.bind(this)
    this.addTag = this.addTag.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tags !== this.state.tags) {
      this.setState({ tags: nextProps.tags })
    }
  }

  addTag(tag) {

    if (this.state.tags.includes(tag)) {
      this.setState({ tagsString: '' })
      return
    }

    if (tag === '' || tag === ',') return

    this.setState((prevState) => {
      tags: prevState.tags.push(tag)
    }, () => this.props.onChange(this.state.tags))

    this.setState({ tagsString: '' })
  }

  handleChange(event) {
    let tagsText = event.target.value

    this.setState({
      tagsString: tagsText
    })

    if (tagsText.includes(',')) {
      let tag = tagsText.slice(0, -1).toLowerCase()
      tag = tag.replace('#','') // Parse the tag without the #
      tag = tag.replace(/\s/g, ''); // Parse the tag without spaces
      this.addTag(tag)
    }
  }

  deleteTag(index) {
    this.setState((prevState) => {
      tags: prevState.tags.splice(index, 1)
    }, () => this.props.onChange(this.state.tags))
  }

  keyDown(event) {

    if (event.keyCode == 13 && this.state.tagsString.length === 0) {
      const tag = event.target.value.toLowerCase()
      this.addTag(tag)
    }

    if (event.keyCode === 8 && this.state.tags.count !== 0 && this.state.tagsString.length === 0) {
      this.setState((prevState) => {
        tags: prevState.tags.pop()
      }, () => this.props.onChange(this.state.tags))
    }
  }

  render() {
    return (
      <div className={`tags ${this.state.active ? 'active' : ''}`}>
        {this.state.tags.map((tag, index) =>
          <div className='tag' key={`tag-${index}`}>
            <span key={index} className='delete' onClick={() => this.deleteTag(index)}></span>
            <span>{tag}</span>
            </div>
        )}
        <input type="text"
          onBlur={() => this.setState({ active: false }) }
          onFocus={() => this.setState({ active: true }) }
          onChange={this.handleChange}
          onKeyDown={this.keyDown}
          placeholder={this.props.placeholder}
          value={this.state.tagsString}/>
      </div>
    )
  }

}

export default Tags
