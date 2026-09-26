import * as icons from "../../../../../icons"

export const providers = [
    {
        id: "claude",
        name: "Claude",
        icon: icons.claude,
        apiURL: "https://platform.claude.com/settings/keys",
        apikey: "claude_key",
        column: 1
    },
    {
        id: "chatgpt",
        name: "ChatGPT",
        icon: icons.chatgpt,
        apiURL: "https://openai.com/api/",
        apikey: "chatgpt_key",
        column: 1
    },
    {
        id: "gemini",
        name: "Gemini",
        icon: icons.gemini,
        apiURL: "https://ai.google.dev/gemini-api/docs",
        apikey: "gemini_key",
        column: 1
    },
    {
        id: "openrouter",
        name: "OpenRouter",
        icon: icons.openrouter,
        apiURL: "https://openrouter.ai/docs",
        apikey: "openrouter_key",
        column: 1
    },
    {
        id: "perplexity",
        name: "Perplexity",
        icon: icons.perplexity,
        apiURL: "https://console.perplexity.ai/",
        apikey: "perplex_key",
        column: 2
    },
    {
        id: "deepseek",
        name: "DeepSeek",
        icon: icons.deepseek,
        apiURL: "https://platform.deepseek.com/api_keys",
        apikey: "deepseek_key",
        column: 2
    },
    {
        id: "grok",
        name: "Grok",
        icon: icons.grok,
        apiURL: "https://grok-api.apidog.io/",
        apikey: "grok_key",
        column: 2
    },
]