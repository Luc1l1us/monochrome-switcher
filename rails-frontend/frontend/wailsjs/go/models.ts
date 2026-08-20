export namespace core {
	
	export class Message {
	    role: string;
	    content: string;
	
	    static createFrom(source: any = {}) {
	        return new Message(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.role = source["role"];
	        this.content = source["content"];
	    }
	}
	export class Chat {
	    id: string;
	    provider: string;
	    title: string;
	    state: string;
	    created_at: string;
	    messages: Message[];
	
	    static createFrom(source: any = {}) {
	        return new Chat(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.provider = source["provider"];
	        this.title = source["title"];
	        this.state = source["state"];
	        this.created_at = source["created_at"];
	        this.messages = this.convertValues(source["messages"], Message);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ChatSummary {
	    id: string;
	    provider: string;
	    title: string;
	    created_at: string;
	    state: string;
	
	    static createFrom(source: any = {}) {
	        return new ChatSummary(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.provider = source["provider"];
	        this.title = source["title"];
	        this.created_at = source["created_at"];
	        this.state = source["state"];
	    }
	}

}

export namespace services {
	
	export class APIKeys {
	    claude_key: string;
	    chatgpt_key: string;
	    gemini_key: string;
	    perplex_key: string;
	    deepseek_key: string;
	    grok_key: string;
	    openrouter_key: string;
	
	    static createFrom(source: any = {}) {
	        return new APIKeys(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.claude_key = source["claude_key"];
	        this.chatgpt_key = source["chatgpt_key"];
	        this.gemini_key = source["gemini_key"];
	        this.perplex_key = source["perplex_key"];
	        this.deepseek_key = source["deepseek_key"];
	        this.grok_key = source["grok_key"];
	        this.openrouter_key = source["openrouter_key"];
	    }
	}
	export class Settings {
	    resizable: boolean;
	    minimizetotray: boolean;
	    launchonstartup: boolean;
	    transparency: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Settings(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.resizable = source["resizable"];
	        this.minimizetotray = source["minimizetotray"];
	        this.launchonstartup = source["launchonstartup"];
	        this.transparency = source["transparency"];
	    }
	}

}

