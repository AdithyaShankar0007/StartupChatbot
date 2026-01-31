import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { StartupIdea } from "@/hooks/useStartupIdeas"

interface SavedIdeasProps {
  ideas: StartupIdea[]
  onDelete: (id: string) => void
}

export function SavedIdeas({ ideas, onDelete }: SavedIdeasProps) {
  if (ideas.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Saved Ideas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea) => (
          <Card key={idea.id} className="p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="font-semibold text-sm flex-1">{idea.title}</h4>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => onDelete(idea.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{idea.description}</p>
            {idea.analysis && (
              <p className="text-xs line-clamp-2 text-foreground/70">{idea.analysis}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
