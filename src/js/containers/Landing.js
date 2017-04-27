import React, { Component } from 'react'

import Footer from '../components/Footer'
import Signin from '../components/Signin'

export default class Landing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSignin: false
    }

  }

  render() {
    return (
      <div className='landing'>
        <Signin show={this.state.showSignin} id='landing' title='Registrarse'/>
        <div className='hero'>
          <video controls poster="/assets/img/posterimage.png"  playsInline autoPlay loop>
            <source src="/static/video/hero.mp4" type="video/mp4"/>
            Your browser doesn't support video
          </video>
          <div className='content'>
            <h1>Seguidores reales en poco tiempo</h1>
            <p>Con un par de clicks comenzarás a recibir una oleada de seguidores reales, listos para interactuar contigo</p>
            <input type="button" value="Registrarse" onClick={() => this.setState({ showSignin: true })}/>
          </div>
        </div>
        <div className='content'>
          <div className='element center'>
            <div className='element-content'>
              <h1>La plataforma para crecer tu cuenta de Instagram más completa y fácil de usar para todo tipo de personas</h1>
            </div>
          </div>
          <div className='element'>
            <div className='image-container'>
              <div className='image connectivity'></div>
            </div>
            <div className='element-content'>
              <h2>Incrementa tu alcance</h2>
              <p>Nosotros te ayudamos a generar una gran actividad en tu cuenta de Instagram para que tu posicionamiento crezca y comiences a obtener cientos de <span>seguidores 100% reales</span> que están interesados en tu contenido e interactúan contigo.</p>
              <p>Todo de una manera muy sencilla y a un par de clicks. Sólo necesitas adquirir alguno de nuestros paquete des tiempo e invertirlos en tu cuenta de Instagram</p>
            </div>
          </div>
          <div className='element center'>
            <h2>Tu audiencia específica</h2>
            <p>Sabemos que necesitas llegar a audiencias concretas por lo que te ofrecemos la mejor segmentación para atraer a las personas correctas en el momento correcto.</p>
          </div>
          <div className='targets-wrapper'>
            <div className='target'>
              <div className='image-container'>
                <div className='image content'></div>
              </div>
              <div className='element-content'>
                <h2>Contenido</h2>
                <p>Evita el contenido con el que no desees interactuar y filtra sólo lo que te interesa.</p>
              </div>
            </div>
            <div className='target'>
              <div className='image-container'>
                <div className='image location'></div>
              </div>
              <div className='element-content'>
                <h2>Ubicación</h2>
                <p>Negocios locales, áreas específicas, ciudades e incluso países completos. Localiza a tu audiencia.</p>
              </div>
            </div>
            <div className='target'>
              <div className='image-container'>
                <div className='image gender'></div>
              </div>
              <div className='element-content'>
                <h2>Género</h2>
                <p>Negocios locales, áreas específicas, ciudades e incluso países completos. Localiza a tu audiencia.</p>
              </div>
            </div>
            <div className='target'>
              <div className='image-container'>
                <div className='image users'></div>
              </div>
              <div className='element-content'>
                <h2>Usuarios</h2>
                <p>Negocios locales, áreas específicas, ciudades e incluso países completos. Localiza a tu audiencia.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='hall-of-fame'>
          <h1>Tú eres el centro de atención</h1>
          <h3>Deja que las personas te vean y sigan</h3>
          <div className='hall-of-fame-content'>
            <div className='image-container'>
              <div className='hall-of-fame-image'></div>
            </div>
            <div className='element-content'>
              <h1>Salón de la Fama</h1>
              <p>Haz que te cuenta sea el foco de atención para los demás OWA Influencers.</p>
              <p>Así obtendrás seguidores de manera más rápida y directa.</p>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='element center'>
            <div className='element-content'>
              <h1>Sólo el tiempo necesario</h1>
              <p>OWA Influencers es sin duda la mejor plataforma para hacer crecer de manera real tu cuenta de Instagram al mejor costo.</p>
              <p>Mira alguno de los paquetes que tenemos para ti.</p>
              <div className='packages'></div>
              <p>Todos nuestros paquetes ofrecen tiempo el cual utilizas en la plataforma para hacer crecer tu cuenta y obtener interacción de usuarios reales.</p>
            </div>
          </div>
        </div>
        <Footer loggedin={false}>
          <h1>¿Estás listo para recibir una oleada de seguidores?</h1>
          <p>Entra ahora y empieza a crecer tu cuenta de Instagram.</p>
          <input type='button' value='Registrarse' onClick={this.showSignin}/>
        </Footer>
      </div>
    )
  }
}
