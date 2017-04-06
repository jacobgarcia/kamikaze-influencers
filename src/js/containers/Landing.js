import React, { Component } from 'react'



class Landing extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    console.log('Rendering landing')
    return (
      <div className='landing'>
        <div className='hero'>
          <div className='content'>
            <h1>Seguidores reales en poco tiempo</h1>
            <p>Con un par de clicks comenzarás a recibir una oleada de seguidores reales, listos para interacturar contigo</p>
            <input type="button" value="Comenzar"/>
          </div>
        </div>
        <div className='content'>
          <h1>La plataforma para crecer tu cuenta de Instagram más completa y fácil de usar</h1>
          <div className=''>
            <div className=''></div>
            <div className=''>
              <h2>Incrementa tu alcance</h2>
            </div>
          </div>
          <div className=''>
            <h2>Tu audiencia específica</h2>
          </div>
          <div className=''>
            <div className=''></div>
            <div className=''>
              <h2>Contenido</h2>
            </div>
          </div>
          <div className=''>
            <div className=''></div>
            <div className=''>
              <h2>Ubicación</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Landing
