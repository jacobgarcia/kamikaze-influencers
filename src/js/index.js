import ReactDOM from 'react-dom'
import Routes from './router'

const div = document.createElement('div')
document.body.appendChild(div)
div.id = 'root'

ReactDOM.render(
  Routes,
  document.getElementById('root')
)
