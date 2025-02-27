import React from 'react'

const TemporaryLoading = (
  { text }: { text: string }
) => {
  return (
    <div className='container flex items-center justify-center '>
      <p>
        {text}
      </p>
    </div>
  )
}

export default TemporaryLoading