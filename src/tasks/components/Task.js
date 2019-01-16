import React, { Component } from 'react'
import '../Task.scss'

const Task = (props) => (
  <div>
    {props.match.params.id}
  </div>
)

export default Task