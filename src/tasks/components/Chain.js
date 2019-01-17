import React from 'react'
import representChain from '../helpers/taskHelpers'

const Chain = ({ data }) => (
  <div
    dangerouslySetInnerHTML={{__html: representChain(data) }}>
  </div>
)

export default Chain