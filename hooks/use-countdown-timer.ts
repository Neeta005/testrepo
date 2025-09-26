"use client"

import { useState, useEffect } from "react"

export function useCountdownTimer(initialTime = 30) {
  const [timer, setTimer] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timer > 0) {
      interval = setTimeout(() => setTimer(timer - 1), 1000)
    } else if (timer === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearTimeout(interval)
    }
  }, [isActive, timer])

  const startTimer = (time: number = initialTime) => {
    setTimer(time)
    setIsActive(true)
  }

  const resetTimer = () => {
    setTimer(initialTime)
    setIsActive(false)
  }

  return {
    timer,
    isActive,
    startTimer,
    resetTimer,
  }
}
