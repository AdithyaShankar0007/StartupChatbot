import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const suggestions = [
  "Evaluate a mobile app for fitness tracking",
  "Is my SaaS idea viable in 2026?",
  "What are the risks of launching a marketplace?",
  "How do I validate my startup idea?",
]

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          variant="outline"
          className="justify-start text-left h-auto p-4 whitespace-normal"
          onClick={() => onSelect(suggestion)}
        >
          <Sparkles className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{suggestion}</span>
        </Button>
      ))}
    </div>
  )
}
