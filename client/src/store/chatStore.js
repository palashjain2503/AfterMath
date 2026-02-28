import { create } from 'zustand'

export const useChatStore = create((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  conversationId: null,

  // Add a message to the conversation
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, { ...message, id: Date.now() }],
    })),

  // Set the loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set error message
  setError: (error) => set({ error }),

  // Clear error
  clearError: () => set({ error: null }),

  // Clear all messages
  clearMessages: () => set({ messages: [], conversationId: null }),

  // Set conversation ID
  setConversationId: (id) => set({ conversationId: id }),

  // Get all messages
  getMessages: () => get().messages,

  // Get last message
  getLastMessage: () => {
    const messages = get().messages
    return messages[messages.length - 1] || null
  },
}))

export default useChatStore
