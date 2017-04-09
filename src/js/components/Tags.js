import React, { Component } from 'react'

class Tags extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tags: this.props.tags || [],
      tagsString: ''
    }

    console.log('props', this.props)

    this.handleChange = this.handleChange.bind(this)
    this.keyDown = this.keyDown.bind(this)
    this.addTag = this.addTag.bind(this)
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
      const tag = tagsText.slice(0, -1).toLowerCase()
      this.addTag(tag)
    }
  }

  deleteTag(index) {
    this.setState((prevState) => {
      tags: prevState.tags.splice(index, 1)
    }, () => this.props.onChange(this.state.tags))
  }

  keyDown(event) {

    if (event.keyCode == 13) {
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
      <div className='tags'>
        {this.state.tags.map((tag, index) =>
          <div className='tag' key={`tag-${index}`}>
            <span key={index} className='delete' onClick={() => this.deleteTag(index)}></span>
            <span>{tag}</span>
            </div>
        )}
        <input type="text"
          onChange={this.handleChange}
          onKeyDown={this.keyDown}
          value={this.state.tagsString}></input>
      </div>
    )
  }

}

export default Tags
