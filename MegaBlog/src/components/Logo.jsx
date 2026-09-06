import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div style={{ width }} className="font-bold text-xl">MegaBlog</div>
  )
}

export default Logo