import React, { Component } from 'react'
import '../Task.scss'

const Task = ({ className, index, name, chains }) => (
  <li className={className}>{name}</li>
)

export default Task