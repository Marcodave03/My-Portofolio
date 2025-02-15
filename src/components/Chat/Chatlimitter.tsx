"use client"

import { useState, useEffect } from "react"

const CHAT_LIMIT_KEY = "chatLimit"
const CHAT_LIMIT_RESET_TIME = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export function useChatLimit(limit: number) {
  const [count, setCount] = useState(0)
  const [lastReset, setLastReset] = useState(0)

  useEffect(() => {
    const storedData = localStorage.getItem(CHAT_LIMIT_KEY)
    if (storedData) {
      const { count: storedCount, lastReset: storedLastReset } = JSON.parse(storedData)
      setCount(storedCount)
      setLastReset(storedLastReset)
    }
  }, [])

  useEffect(() => {
    const now = Date.now()
    if (now - lastReset > CHAT_LIMIT_RESET_TIME) {
      setCount(0)
      setLastReset(now)
    }
    localStorage.setItem(CHAT_LIMIT_KEY, JSON.stringify({ count, lastReset }))
  }, [count, lastReset])

  const incrementCount = () => {
    if (count < limit) {
      setCount(count + 1)
      return true
    }
    return false
  }

  return {
    count,
    incrementCount,
    isLimited: count >= limit,
  }
}

