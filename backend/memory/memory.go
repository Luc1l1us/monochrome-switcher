package memory

import "time"

type Message struct {
	Role    string
	Content string
	Time    time.Time
}

type Memory struct {
	ID       string
	Content  string
	Created  time.Time
	LastUsed time.Time
}

type Agent struct {
	ID           string
	SystemPrompt string
	History      []Message
	Memories     []Memory
}

type MemoryManager struct {
	Agent *Agent
}
