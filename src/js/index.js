import ReactDOM from 'react-dom'
import Routes from './router'

//window.baseUrl = 'http://localhost:8080/v1'
 window.baseUrl = 'https://kamikazefollowers.com/v1'

const div = document.createElement('div')
document.body.appendChild(div)
div.id = 'root'

ReactDOM.render(
  Routes,
  document.getElementById('root')
)
