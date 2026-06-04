export namespace services {
	
	export class APIKeys {
	    claude_key: string;
	    chatgpt_key: string;
	    gemini_key: string;
	
	    static createFrom(source: any = {}) {
	        return new APIKeys(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.claude_key = source["claude_key"];
	        this.chatgpt_key = source["chatgpt_key"];
	        this.gemini_key = source["gemini_key"];
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

