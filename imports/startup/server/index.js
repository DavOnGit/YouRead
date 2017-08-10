// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import { onPageLoad } from 'meteor/server-render'
import { Inject } from 'meteor/meteorhacks:inject-initial'

Inject.rawHead('loader-style',
  // Force the initial scale for Android and iOS as our spinner may be
  //  distorted by their default viewport values.
  '<meta name="viewport" class="initial-loader" content="width=device-width,maximum-scale=1,' +
    'initial-scale=1,user-scalable=no">' +
  // The loading spinner needs some theming.
  '<style class="initial-loader">' +
    'html{background-color: #36342e;}' +
    'body{color:#ddd;overflow:hidden !important;width:100%;height:100%;}' +
    '#initial-spinner {' +
      'bottom:0;height:80px;left:0;margin:auto;position:absolute;' +
      'top:0;right:0;width:80px;overflow:hidden;' +
      '-webkit-animation: rotation .6s infinite linear;' +
      'animation: rotation .6s infinite linear;' +
      'border-left:6px solid rgba(255,194,0,.20);' +
      'border-right:6px solid rgba(255,194,0,.20);' +
      'border-bottom:6px solid rgba(255,194,0,.20);' +
      'border-top:6px solid rgba(255,194,0,.9);' +
      'border-radius:100%;' +
    '}' +
    '@-webkit-keyframes rotation {' +
      'from {-webkit-transform: rotate(0deg);}' +
      'to {-webkit-transform: rotate(359deg);}' +
    '}' +
    '@-moz-keyframes rotation {' +
      'from {-moz-transform: rotate(0deg);}' +
      'to {-moz-transform: rotate(359deg);}' +
    '}' +
    '@-o-keyframes rotation {' +
      'from {-o-transform: rotate(0deg);}' +
      'to {-o-transform: rotate(359deg);}' +
    '}' +
    '@keyframes rotation {' +
      'from {transform: rotate(0deg);}' +
      'to {transform: rotate(359deg);}' +
    '}' +
    '</style>'
)
// The loading spinner is a CSS animation.
// /!\ WARNING: The trick is to create a fake body by injecting data
// in the HTML's head as Meteor is requesting JS  file in a blocking
// fashion and mobile only allow 1 HTTP request at a time on a GPRS network.
Inject.rawBody('loader-body2', '<div id="initial-spinner" class="initial-loader"></div>')

require('./api.js')
