import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LocationBar from '../components/LocationBar'
import Localization from '../localization/Localization'
/**
 * Geocoder component: connects to Mapbox.com Geocoding API
 * and provides an autocompleting interface for finding locations.
 */
 class Geocoder extends Component {

   constructor(props) {
     super(props)

     this.state = {
       results: [],
       focus: null,
       loading: false,
       searchTime: new Date(),
       locations: this.props.locations || [],
       locationString: '',
       coordinatesString: ''
     }

     this.componentDidMount = this.componentDidMount.bind(this)
     this.onInput = this.onInput.bind(this)
     this.moveFocus = this.moveFocus.bind(this)
     this.acceptFocus = this.acceptFocus.bind(this)
     this.onKeyDown = this.onKeyDown.bind(this)
     this.onResult = this.onResult.bind(this)
     this.clickOption = this.clickOption.bind(this)
     this.addLocation = this.addLocation.bind(this)
     this.deleteLocation = this.deleteLocation.bind(this)
   }

   componentWillReceiveProps(nextProps) {
     if (nextProps.locations !== this.state.locations) {
       this.setState({ locations: nextProps.locations })
     }
   }

   componentDidMount() {
     if (this.props.focusOnMount){
          ReactDOM.findDOMNode(this.refs.input).focus()
     }
   }

   onInput(e) {
     this.setState({loading:true})
     var value = e.target.value
     if (value === '') {
       this.setState({
         results: [],
         focus: null,
         loading:false,
         locationString: value
       })
     } else {
         // Show the input string in the search bar
         this.setState({
            locationString: value
         })
     }
   }

   moveFocus(dir) {
     if(this.state.loading) return;
     this.setState({
       focus: this.state.focus === null ?
         0 : Math.max(0,
           Math.min(
             this.state.results.length - 1,
             this.state.focus + dir))
     })

   }

   acceptFocus() {
     if (this.state.focus !== null) {
       this.props.onSelect(this.state.results[this.state.focus]);
     }
   }

   onKeyDown(e) {
     switch (e.which) {
       // up
       case 38:
         e.preventDefault()
         this.moveFocus(-1)
         break;
       // down
       case 40:
         this.moveFocus(1)
         break;
       // accept
       case 13:
         if( this.state.results.length > 0 && this.state.focus == null) {
           this.clickOption(this.state.results[0],0)
         }
         this.acceptFocus()
         break;
     }
   }

   onResult(err, res, body, searchTime) {
     // searchTime is compared with the last search to set the state
     // to ensure that a slow xhr response does not scramble the
     // sequence of autocomplete display.
     if (!err && body && body.features && this.state.searchTime <= searchTime) {
       this.setState({
         searchTime: searchTime,
         loading: false,
         results: body.features,
         focus: null
       })
       this.props.onSuggest(this.state.results)
     }

   }

   clickOption(place, listLocation) {
     this.props.onSelect(place)
     this.state.locationString = place.place_name
     this.state.coordinatesString = place.center[0] + ',' + place.center[1]
     this.setState({focus:listLocation})
     // focus on the input after click to maintain key traversal
     ReactDOM.findDOMNode(this.refs.input).focus()
     this.addLocation(this.state.locationString, this.state.coordinatesString)
     return false
   }

   addLocation(description, coordinates) {
     /* Set object definitions */
     var location = {
       description: description,
       coordinates: coordinates
     }

     if (this.state.locations.includes(location)) {
       this.setState({ locationString: '' })
       return
     }

     if (description === '' || description === ',') return


     this.setState((prevState) => {
       locations: prevState.locations.push(location)
     }, () => this.props.onChange(this.state.locations))

     this.setState({ locationString: '' })
     this.setState({ coordinatesString: '' })
   }

   deleteLocation(index) {
     this.setState((prevState) => {
       locations: prevState.locations.splice(index, 1)
     }, () => this.props.onChange(this.state.locations))
   }

   search(value) {
     LocationBar.search(
      this.props.endpoint,
      this.props.source,
      this.props.accessToken,
      this.props.proximity,
      this.props.bbox,
      this.props.types,
      value,
      this.onResult)
   }

   render() {
     var input = <input
       ref='input'
       className={this.props.inputClass}
       onInput={this.onInput}
       onKeyDown={this.onKeyDown}
       placeholder={Localization.locations_sep}
       type='text'
       value={this.state.locationString}/>
     var locations = this.state.locations
     return (
       <div className='geo-coder'>
         <div className='tags'>
           { Object.keys(locations).map((location, index) =>
            <div className='tag' key={`location-${index}`}>
              <a id={JSON.stringify(locations[location].description)}></a>
              <span key={index} className='delete' onClick={() => this.deleteLocation(index)}></span>
              <span>{locations[location].description}</span>
            </div>
           )}
           { this.props.inputPosition === 'top' && input }
           <input type="button" value={Localization.search} className='red' onClick={() => this.search(this.state.locationString)}/>
          </div>

         {this.state.results.length > 0 && (
           <ul className='locations-list'>
             {this.state.results.map((result, i) => (
               <li key={result.id}>
                 <a href='#'
                   onClick={this.clickOption.bind(this, result, i)}
                   className={this.props.resultClass + ' ' + (i === this.state.focus ? this.props.resultFocusClass : '')}
                   key={result.id}>{result.place_name}</a>
               </li>
             ))}
           </ul>
         )}
         { this.props.inputPosition === 'bottom' && input }
       </div>
     )
   }
 }

 Geocoder.propTypes = {
  endpoint: React.PropTypes.string,
  source: React.PropTypes.string,
  inputClass: React.PropTypes.string,
  resultClass: React.PropTypes.string,
  resultsClass: React.PropTypes.string,
  inputPosition: React.PropTypes.string,
  inputPlaceholder: React.PropTypes.string,
  resultFocusClass: React.PropTypes.string,
  onSelect: React.PropTypes.func.isRequired,
  onSuggest: React.PropTypes.func,
  accessToken: React.PropTypes.string.isRequired,
  proximity: React.PropTypes.string,
  bbox: React.PropTypes.string,
  showLoader: React.PropTypes.bool,
  focusOnMount: React.PropTypes.bool,
  types: React.PropTypes.string
}


 Geocoder.defaultProps = {
     endpoint: 'https://api.tiles.mapbox.com',
     inputClass: '',
     resultClass: '',
     resultsClass: 'geo-coder',
     resultFocusClass: 'strong',
     inputPosition: 'top',
     inputPlaceholder: 'Enter a location to search',
     showLoader: false,
     source: 'mapbox.places',
     proximity: '',
     bbox: '',
     types: 'region,place,district,locality',
     onSuggest: function() {},
     focusOnMount: true
}

 export default Geocoder
