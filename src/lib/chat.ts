export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: Date
}

const SYSTEM_PROMPT = `You are StartupGPT, an expert startup advisor. Evaluate startup ideas with brutal honesty.

**ALWAYS respond using this EXACT format for startup ideas:**

## Idea
• <one-line summary of the startup idea>

## Existing
• <competitor 1 - brief description>
• <competitor 2 - brief description>
• <competitor 3 - brief description>

## Viability
• <Clear assessment: Yes / Maybe / Risky - with brief reasoning>

## Risks
• <risk 1>
• <risk 2>
• <risk 3>

## Next Steps
• <action 1>
• <action 2>
• <action 3>

## Score
• <X / 10> - <brief justification>

**Rules:**
- Keep each bullet point concise (1-2 sentences max)
- Be direct and honest, not fluffy
- Focus on actionable insights
- If asked general startup questions (not idea validation), respond helpfully but still use clear bullet points and headers`

export async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[]
  onDelta: (deltaText: string) => void
  onDone: () => void
  onError: (error: string) => void
}) {
  try {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY

    if (!apiKey) {
      onError("API key not configured. Please set VITE_DEEPSEEK_API_KEY")
      return
    }

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        stream: true,
      }),
    })

    if (response.status === 429) {
      onError("Rate limit exceeded. Please wait a moment and try again.")
      return
    }

    if (response.status === 402) {
      onError("Insufficient credits. Please check your API quota.")
      return
    }

    if (!response.ok || !response.body) {
      const errorData = await response.text()
      console.error("API Error:", response.status, errorData)
      onError("Failed to connect to AI service")
      return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let textBuffer = ""
    let streamDone = false

    while (!streamDone) {
      const { done, value } = await reader.read()
      if (done) break

      textBuffer += decoder.decode(value, { stream: true })

      let newlineIndex: number
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex)
        textBuffer = textBuffer.slice(newlineIndex + 1)

        if (line.endsWith("\r")) line = line.slice(0, -1)
        if (line.startsWith(":") || line.trim() === "") continue
        if (!line.startsWith("data: ")) continue

        const jsonStr = line.slice(6).trim()
        if (jsonStr === "[DONE]") {
          streamDone = true
          break
        }

        try {
          const parsed = JSON.parse(jsonStr)
          const content = parsed.choices?.[0]?.delta?.content as string | undefined
          if (content) onDelta(content)
        } catch {
          textBuffer = line + "\n" + textBuffer
          break
        }
      }
    }

    // Process remaining buffer
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue
        if (raw.endsWith("\r")) raw = raw.slice(0, -1)
        if (raw.startsWith(":") || raw.trim() === "") continue
        if (!raw.startsWith("data: ")) continue
        const jsonStr = raw.slice(6).trim()
        if (jsonStr === "[DONE]") continue
        try {
          const parsed = JSON.parse(jsonStr)
          const content = parsed.choices?.[0]?.delta?.content as string | undefined
          if (content) onDelta(content)
        } catch {
          /* ignore */
        }
      }
    }

    onDone()
  } catch (error) {
    console.error("Chat error:", error)
    onError(error instanceof Error ? error.message : "Unknown error occurred")
  }
}
