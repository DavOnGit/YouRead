import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
// import '/node_modules/bootstrap-css-only'

import App from '../../ui/layout/App.jsx'


// onPageLoad(async (sink) => {
//   const App = (await import('../../ui/layout/App.jsx')).default;
//
//   if (typeof NodeList.prototype.forEach !== 'function') {
//     NodeList.prototype.forEach = Array.prototype.forEach
//   }
//   const head = document.querySelector('head')
//   const headChilds = document.body.querySelectorAll('meta, title, link')
//
//   headChilds.forEach((el) => { head.appendChild(el) })
//
//   const loaderStuff = document.querySelectorAll('.initial-loader')
//   loaderStuff.forEach((el) => { el.parentNode.removeChild(el) })
//
//   ReactDOM.render(
//     <App />,
//     document.getElementById('render-target')
//   )
// })

Meteor.startup(() => {
  // IE does't support Nodelist.forEach (tested on IE 10)
  if (typeof NodeList.prototype.forEach !== 'function') {
    NodeList.prototype.forEach = Array.prototype.forEach
  }
  const head = document.querySelector('head')
  const headChilds = document.body.querySelectorAll('meta, title, link')

  headChilds.forEach((el) => { head.appendChild(el) })

  const loaderStuff = document.querySelectorAll('.initial-loader')
  loaderStuff.forEach((el) => { el.parentNode.removeChild(el) })

  render(<App />, document.getElementById('render-target'))
})
