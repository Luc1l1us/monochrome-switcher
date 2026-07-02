package conversation

type ConversationManager struct {
	History []Message
}

func (c *ConversationManager) AddUserMessage(msg string) {
	c.History = append(c.History, Message{
		Role:    "user",
		Content: msg,
	})
}

func (c *ConversationManager) AddAIMessage(msg string) {
	c.History = append(c.History, Message{
		Role:    "aiagent",
		Content: msg,
	})
}
