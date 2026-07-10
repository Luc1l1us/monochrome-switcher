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

}

export namespace services {
	
	export class APIKeys {
	    claude_key: string;
	    chatgpt_key: string;
	    gemini_key: string;
	    perplex_key: string;
	    deepseek_key: string;
	    grok_key: string;
	
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

