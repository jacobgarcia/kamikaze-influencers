import React, { Component } from 'react'
import Geocoder from './Geocoder'

class Example extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: null
    }

    this.onSelect = this.onSelect.bind(this)
    this.locationsChange = this.locationsChange.bind(this)
  }

  onSelect(value){
    this.setState({ value: value })
  }

  locationsChange(localizations) {
    document.getElementById('locations-loader').classList.remove('hidden')
  }

  render() {
    return (
      <div className='section'>
      <div className='section-title'>
        <h4>Locations</h4>
        <div className='loader small hidden' id='locations-loader'></div>
      </div>
      {/* Geocoder:
                 accessToken -- Mapbox developer access token (required)
                 onSelect    -- function called after selecting result (required)
                 showLoader  -- Boolean to attach `.loading` class to results list
             */}
             <Geocoder
               accessToken='pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ'
               onSelect={this.onSelect}
               showLoader={true}
               onChange={this.locationsChange}
               locations={this.state.locations}
               />
        {this.state.value && <pre className='keyline-all'>{JSON.stringify(this.state.value.center)}</pre>}
      </div>
    )
  }
}
export default Example
