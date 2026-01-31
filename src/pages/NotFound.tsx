import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Home } from "lucide-react"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground mb-6">Page not found</p>
        <Button onClick={() => navigate("/")} variant="default">
          <Home className="h-4 w-4 mr-2" />
          Go Home
        </Button>
      </div>
    </div>
  )
}
