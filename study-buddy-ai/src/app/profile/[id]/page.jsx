import React from 'react'

const page = async({params}) => {
  return (
    <div>
      <h1 className='text-2xl text-black'>Profile: {params.id}</h1>
    </div>
  )
}

export default page
