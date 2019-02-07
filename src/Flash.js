import React from 'react'

import './Flash.scss'

const Flash = props => props.message 
  ?  <span className={ `Flash ${props.type}` }>{ props.message }</span>
  : null

export default Flash