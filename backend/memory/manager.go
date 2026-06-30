package memory

import (
	"strings"
)

func (m *MemoryManager) BuildContext() []Message {
	messages := []Message{}

	messages = append(messages,
		Message{
			Role:    "system",
			Content: m.Agent.SystemPrompt,
		})

	if len(m.Agent.Memories) > 0 {

		var MemoryText strings.Builder

		MemoryText.WriteString("Known facts:\n")

		for _, mem := range m.Agent.Memories {
			MemoryText.WriteString("- ")
			MemoryText.WriteString(mem.Content)
			MemoryText.WriteString("\n")
		}

		messages = append(messages,
			Message{
				Role:    "system",
				Content: MemoryText.String(),
			})
	}

	return messages
}
