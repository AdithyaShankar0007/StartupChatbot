import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Rocket, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"

const emailSchema = z.string().email("Please enter a valid email address")
const passwordSchema = z.string().min(6, "Password must be at least 6 characters")

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const { signIn, signUp, user, loading } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (!loading && user) {
      navigate("/")
    }
  }, [user, loading, navigate])

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    const emailResult = emailSchema.safeParse(email)
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message
    }

    const passwordResult = passwordSchema.safeParse(password)
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      if (isLogin) {
        await signIn(email, password)
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        })
      } else {
        await signUp(email, password, displayName)
        toast({
          title: "Account created!",
          description: "Welcome to StartupChat!",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Authentication failed"
      toast({
        title: isLogin ? "Login failed" : "Sign up failed",
        description: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              Startup<span className="text-primary">Chat</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin
              ? "Sign in to access your saved startup ideas"
              : "Start validating your startup ideas today"}
          </p>
        </div>

        {/* Form */}
        <div className="rounded-lg border bg-card p-6 border-border/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-foreground">
                  Display Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="John Doe"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required={!isLogin}
                    disabled={isSubmitting}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                className="p-0 ml-1 h-auto"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setErrors({})
                }}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
