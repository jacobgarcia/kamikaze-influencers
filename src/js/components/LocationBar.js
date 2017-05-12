import React, { Component } from 'react'
import xhr from 'xhr'

class LocationBar extends Component {

  static search(endpoint, source, accessToken, proximity, bbox, types, query, callback) {
    const searchTime = new Date()
    const uri = endpoint + '/geocoding/v5/' +
      source + '/' + encodeURIComponent(query) + '.json' +
      '?access_token=' + accessToken +
      (proximity ? '&proximity=' + proximity : '') +
      (bbox ? '&bbox=' + bbox : '') +
      (types ? '&types=' + encodeURIComponent(types) : '')
    xhr({ uri: uri, json: true }, function(err, res, body) {
      callback(err, res, body, searchTime)
    })
  }

}

export default LocationBar
