export namespace services {
	
	export class Settings {
	    resizable: boolean;
	    minimizetotray: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Settings(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.resizable = source["resizable"];
	        this.minimizetotray = source["minimizetotray"];
	    }
	}

}

