import { useState, useRef, useCallback } from 'react'

/**
 * Custom hook for voice recording using Web Audio API
 * Supports browser's native speech recognition or manual recording
 */
export const useVoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const streamRef = useRef(null)
  const recognitionRef = useRef(null)

  // Initialize Speech Recognition API
  const initSpeechRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      setError('Speech Recognition API not supported in this browser')
      return false
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsRecording(true)
      setError(null)
    }

    recognition.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }
      }

      if (finalTranscript) {
        setTranscript((prev) => prev + finalTranscript)
      }
    }

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`)
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    return true
  }, [])

  // Start recording with speech recognition
  const startRecording = useCallback(async () => {
    setTranscript('')
    setError(null)

    if (!initSpeechRecognition()) {
      // Fallback to audio recording if speech recognition not available
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        streamRef.current = stream

        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder
        audioChunksRef.current = []

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data)
          }
        }

        mediaRecorder.start()
        setIsRecording(true)
      } catch (err) {
        setError(`Microphone access denied: ${err.message}`)
      }
    } else {
      recognitionRef.current?.start()
    }
  }, [initSpeechRecognition])

  // Stop recording
  const stopRecording = useCallback(async () => {
    setIsRecording(false)

    if (recognitionRef.current) {
      recognitionRef.current.stop()
      return transcript
    }

    if (mediaRecorderRef.current) {
      return new Promise((resolve) => {
        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
          setIsProcessing(true)

          // Convert to base64
          const reader = new FileReader()
          reader.onloadend = () => {
            const base64Audio = reader.result.split(',')[1]
            setIsProcessing(false)
            resolve(base64Audio)
          }
          reader.readAsDataURL(audioBlob)
        }

        mediaRecorderRef.current.stop()
        streamRef.current?.getTracks().forEach((track) => track.stop())
      })
    }

    return null
  }, [transcript])

  // Clear transcript
  const clearTranscript = useCallback(() => {
    setTranscript('')
  }, [])

  // Cancel recording
  const cancelRecording = useCallback(() => {
    setIsRecording(false)
    
    if (recognitionRef.current) {
      recognitionRef.current.abort()
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }

    setTranscript('')
    setError(null)
  }, [])

  return {
    isRecording,
    transcript,
    error,
    isProcessing,
    startRecording,
    stopRecording,
    cancelRecording,
    clearTranscript,
  }
}

export default useVoiceRecorder
