import React from 'react'
import {Link} from 'react-router-dom'

import developers from '../../developers.json'

const Developers = () => (
  <div className='map'>
    <Link to='/'> Home </Link>
    <h2>See where all the Developers are from:</h2>
    <ul>
      {developers.map((dev)=> (
        <li key={dev.name}>{dev.city}</li>
    ))}
    </ul>
  </div>
)

export default Developers