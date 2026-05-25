export namespace services {
	
	export class Settings {
	    Resizable: boolean;
	    MinimizeToTray: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Settings(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Resizable = source["Resizable"];
	        this.MinimizeToTray = source["MinimizeToTray"];
	    }
	}

}

