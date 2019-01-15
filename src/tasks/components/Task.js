import React, { Component } from 'react'
import '../Task.scss'

const Task = ({ id, name, chains }) => (
  <li id={id} className="task-link">{name}</li>
)

export default Task