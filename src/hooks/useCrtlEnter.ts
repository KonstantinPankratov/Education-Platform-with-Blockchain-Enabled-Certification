import { useEffect } from 'react'

/**
 * Custom hook to handle Ctrl+Enter key press and execute a callback
 * @param callback - The function to call when Ctrl+Enter is pressed.
 */
const useCtrlEnter = (callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        callback()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [callback])
}

export default useCtrlEnter