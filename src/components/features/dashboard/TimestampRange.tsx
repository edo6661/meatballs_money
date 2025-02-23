import React from 'react'

const TimeStampRange = (
  { timestamp }: { timestamp?: string }
) => {
  return (
    <div className="leading-none text-muted-foreground">
      {timestamp ?? 'No Data'}
    </div>
  )
}

export default TimeStampRange