import React from 'react'
import Next from 'next/app'
import firebase from 'firebase'

import { config } from '../helpers/constants'

import 'css-reset-and-normalize/css/reset-and-normalize.css'

class App extends Next {
  constructor(props){
    super(props)
    if (firebase.apps.length == 0) {
      firebase.initializeApp(config.firebase)
    }
  }
  
  render() {
    const { Component, pageProps } = this.props
    return (
      <Component 
        {...pageProps} 
      />
    )
  }
}

export default App