package conversation

type Message struct {
	Role    string
	Content string
}

type Conversation struct {
	Messages []Message
}

type Chat struct {
	ID       string
	Provider string
	Messages []Message
}
