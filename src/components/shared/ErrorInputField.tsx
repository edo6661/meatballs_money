import React from 'react'

const ErrorInputField = (
  { error }: { error: string }
) => {
  return (
    <p key={error} className='text-red-500'>
      {error}
    </p>
  )
}

export default ErrorInputField