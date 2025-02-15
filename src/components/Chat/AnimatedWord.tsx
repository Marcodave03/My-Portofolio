"use client"

import type React from "react"
import { useRef, useEffect } from "react"

interface AnimatedWordProps {
  word: string
  delay: number
  isBold?: boolean
  linkUrl?: string
  onWordShown?: (index: number) => void
  wordIndex?: number
  isDark?: boolean
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({
  word,
  delay,
  isBold,
  linkUrl,
  onWordShown,
  wordIndex,
  isDark,
}) => {
  const wordRef = useRef<HTMLSpanElement | HTMLAnchorElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onWordShown && wordRef.current && wordIndex !== undefined) {
        onWordShown(wordIndex)
      }
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay, onWordShown, wordIndex])

  const style = {
    display: "inline-block",
    opacity: 0,
    animation: `fadeIn 0.15s ease-in-out forwards ${delay}s`,
    marginRight: "0.25em",
  }

  const className = isBold ? "font-semibold" : ""

  if (linkUrl) {
    return (
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        className={`underline ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"}`}
        ref={wordRef as React.RefObject<HTMLAnchorElement>}
        data-word={word}
      >
        {word}
      </a>
    )
  }

  return (
    <span style={style} className={className} ref={wordRef} data-word={word}>
      {word}
    </span>
  )
}

export default AnimatedWord

