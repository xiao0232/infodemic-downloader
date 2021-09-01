import React from 'react'

interface Props {
  children: React.ReactNode
}

const Card: React.VFC<Props> = ({ children }) => {
  return (
    <>
      <div className="card">{children}</div>
    </>
  )
}

export default Card
