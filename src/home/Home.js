import React from 'react'
import './Home.scss'
const Home = () => (
  <div>
    <div className="about-the-app">
      <h1>About The App</h1>
      <p><strong>Concatenate</strong> is an app designed to display progress. The concept is simple. Users create tasks to track. After completing the task, and adding to the chain (a visual representation of the number of days in a row a task has been completed), a user is able to view the fruits of repitition and incremental growth. In this way, an incentive is implicitly formed:</p>
      <p>Don&lsquo;t break the chain!</p>
    </div>
    <div className="about-the-dev">
      <h2>About The Developer</h2>
      <p><strong>Emmanuel Zen Price</strong>, born in New York, currently resides in Providence, RI, where he codes incessantly, reads voraciously, and exercises too little.</p>
    </div>
  </div>
)

export default Home