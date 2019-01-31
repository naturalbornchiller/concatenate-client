import React from 'react'
import './Home.scss'
const Home = () => (
  <div className="about-container">
    <div className="about-the-app">
      <h1 className="about-header">About The App</h1>
      <p><strong>Concatenate</strong> is an app designed to display progress. The concept is simple. Users create tasks to track. After completing the task, and adding to the chain (a visual representation of the number of days in a row a task has been completed), a user is able to view the fruits of repitition and incremental growth. In this way, an incentive is implicitly formed:</p>
      <p className="fun">Don&lsquo;t break the chain!</p>
    </div>
    {/* <div className="developer-info-super-container">
      <div id="developer-info-container">
        <h2 className="about-header">About The Developer</h2>
        <p className="pertinant-information thin-border" id="bio">
          <strong>Emmanuel Zen Price</strong>, born somewhere east of San Marino,
          started taking web development seriously in Spring 2018, before which
          he was holed up in Upstate New York (a dismal place - if you can ignore the
          scenery), reading depressing novels, writing depressing short stories, taking
          stock of his life. He currently resides in Providence, Rhode Island.<br /><br />
          Emmanuel has always had a fascination with haiku and envisioned this site as a
          means of sharing his interest with the other denizens of the internet.
        </p>
      </div>
    </div> */}
  </div>
)

{/* <div className="about-the-dev">
<h2 className="about-header">About The Developer</h2>
<p><strong>Emmanuel Zen Price</strong>, born in New York, currently resides in Providence, RI, where he codes incessantly, reads voraciously, and exercises too little.</p>
</div> */}

export default Home