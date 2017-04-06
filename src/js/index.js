import ReactDOM from 'react-dom'
import Routes from './router'

window.baseUrl = 'http://localhost:8080/v1'

const div = document.createElement('div')
document.body.appendChild(div)
div.id = 'root'

// Used in NetworkRequest and App container
window.host = 'http://localhost:8080'

ReactDOM.render(
  Routes,
  document.getElementById('root')
)
