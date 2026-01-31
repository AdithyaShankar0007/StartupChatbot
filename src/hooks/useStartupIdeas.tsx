import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "./useAuth"

export interface StartupIdea {
  id: string
  title: string
  description: string
  analysis?: string
  created_at: string
}

export function useStartupIdeas() {
  const [ideas, setIdeas] = useState<StartupIdea[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      setIdeas([])
      setLoading(false)
      return
    }

    const fetchIdeas = async () => {
      try {
        const { data, error } = await supabase
          .from("startup_ideas")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error
        setIdeas(data || [])
      } catch (error) {
        console.error("Error fetching ideas:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchIdeas()
  }, [user])

  const saveIdea = async (title: string, description: string, analysis?: string) => {
    if (!user) throw new Error("User not authenticated")

    const { error } = await supabase.from("startup_ideas").insert({
      user_id: user.id,
      title,
      description,
      analysis,
    })

    if (error) throw error

    // Refetch ideas
    const { data } = await supabase
      .from("startup_ideas")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setIdeas(data || [])
  }

  const deleteIdea = async (id: string) => {
    if (!user) throw new Error("User not authenticated")

    const { error } = await supabase
      .from("startup_ideas")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)

    if (error) throw error

    setIdeas(ideas.filter((idea) => idea.id !== id))
  }

  return { ideas, loading, saveIdea, deleteIdea }
}
