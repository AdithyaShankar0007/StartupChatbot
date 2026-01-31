import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2 } from "lucide-react"

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading?: boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  isLoading = false,
  placeholder = "Describe your startup idea...",
}: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSend(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1"
      />
      <Button
        type="submit"
        disabled={isLoading || !input.trim()}
        size="icon"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </Button>
    </form>
  )
}
