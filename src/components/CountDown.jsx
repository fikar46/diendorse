import { useEffect, useState } from 'react'
import moment from 'moment';
import React from 'react'
const INTERVAL = 1000
const CountdownExpired = ({expiredTime}) => {
  const diff = expiredTime * 1000
  const [timeLeft,setTimeLeft] = useState(moment.duration(diff, 'milliseconds'))

  useEffect(() => {

    const intervalFn = setInterval(() => {
      setTimeLeft(moment.duration(timeLeft - INTERVAL, 'milliseconds'))
    }, 1000)

    if(((timeLeft.minutes() <= 0) && (timeLeft.seconds() <= 0))) {
      clearInterval(intervalFn)
    }
    return () => {
      clearInterval(intervalFn)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[timeLeft])

  return(
    <div>
      {`${timeLeft.minutes()} : ${timeLeft.seconds()}`}
    </div>
  )
}

export default CountdownExpired;