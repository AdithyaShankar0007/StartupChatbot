import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Message, streamChat } from "@/lib/chat"
import { ChatMessage } from "@/components/ChatMessage"
import { ChatInput } from "@/components/ChatInput"
import { SuggestedPrompts } from "@/components/SuggestedPrompts"
import { SavedIdeas } from "@/components/SavedIdeas"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { useStartupIdeas } from "@/hooks/useStartupIdeas"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, LogIn, LogOut, Save, Menu, X, Lightbulb, Loader2 } from "lucide-react"

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lastAnalysis, setLastAnalysis] = useState<string>("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { user, loading: authLoading, signOut } = useAuth()
  const { ideas, loading: ideasLoading, saveIdea, deleteIdea } = useStartupIdeas()
  const navigate = useNavigate()

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    let assistantContent = ""
    const assistantId = (Date.now() + 1).toString()

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.role === "assistant" && last.id === assistantId) {
          return prev.map((m) =>
            m.id === assistantId ? { ...m, content: assistantContent } : m,
          )
        }
        return [
          ...prev,
          { id: assistantId, role: "assistant", content: assistantContent },
        ]
      })
    }

    await streamChat({
      messages: [...messages, userMessage],
      onDelta: updateAssistant,
      onDone: () => {
        setIsLoading(false)
        setLastAnalysis(assistantContent)
      },
      onError: (error) => {
        setIsLoading(false)
        toast({
          title: "Error",
          description: error,
        })
      },
    })
  }

  const handleSaveIdea = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your startup idea.",
      })
      navigate("/auth")
      return
    }

    const userMessages = messages.filter((m) => m.role === "user")
    if (userMessages.length === 0) {
      toast({
        title: "Nothing to save",
        description: "Start a conversation first to validate an idea.",
      })
      return
    }

    const firstUserMessage = userMessages[0].content
    const title =
      firstUserMessage.slice(0, 100) +
      (firstUserMessage.length > 100 ? "..." : "")

    try {
      await saveIdea(title, firstUserMessage, lastAnalysis || undefined)
      toast({
        title: "Idea saved!",
        description: "Your startup idea has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save idea. Please try again.",
      })
    }
  }

  const handleSignOut = async () => {
    await signOut()
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    })
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar for saved ideas */}
      {user && (
        <>
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-card border-r border-border/50 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">Saved Ideas</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {ideasLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : ideas.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No saved ideas yet
                </p>
              ) : (
                <div className="space-y-2">
                  {ideas.map((idea) => (
                    <div
                      key={idea.id}
                      className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors"
                    >
                      <h3 className="font-medium text-sm line-clamp-2">
                        {idea.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {idea.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </>
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/50 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:block p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">StartupChat</h1>
            </div>

            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground hidden sm:block">
                    {user.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSignOut}
                    title="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate("/auth")}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Chat content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-2 text-center">
                  Validate Your Startup Idea
                </h2>
                <p className="text-muted-foreground text-center mb-8 max-w-md">
                  Get expert analysis on your startup idea. Honest feedback on viability,
                  competitors, risks, and next steps.
                </p>
                <div className="w-full">
                  <SuggestedPrompts onSelect={handleSend} />
                </div>
              </div>
            ) : (
              <div
                ref={scrollRef}
                className="space-y-4 pb-4"
              >
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Input area */}
        <footer className="border-t border-border/50 bg-card/50 backdrop-blur p-4 sticky bottom-0">
          <div className="max-w-4xl mx-auto space-y-3">
            {user && messages.length > 0 && (
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleSaveIdea}
                disabled={isLoading}
              >
                <Save className="h-4 w-4 mr-2" />
                Save This Idea
              </Button>
            )}
            <ChatInput onSend={handleSend} isLoading={isLoading} />
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Index
