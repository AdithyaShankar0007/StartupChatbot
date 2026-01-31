import { useEffect, useState } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)")
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    setIsMobile(mq.matches)
    mq.addEventListener("change", handleChange)

    return () => {
      mq.removeEventListener("change", handleChange)
    }
  }, [])

  return !!isMobile
}
