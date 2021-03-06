//META{"name":"{{PLUGIN_NAME}}","displayName":"{{DISPLAY_NAME}}","website":"{{WEBSITE}}","source":"{{SOURCE}}"}*//

var {{PLUGIN_NAME}} = (() => {
    const config = {{CONFIG}};
	const compilePlugin = ([Plugin, Api]) => {
		const plugin = {{INNER}};
        return plugin(Plugin, Api);
    };
	
    return !global.ZeresPluginLibrary ? class {
        getName() {return config.info.name;} getAuthor() {return config.info.authors.map(a => a.name).join(", ");} getDescription() {return config.info.description;} getVersion() {return config.info.version;}
        showAlert() {window.mainCore.alert("Library Missing",`The Library needed for this plugin is missing, please download it from here: <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BetterDiscordAddons/master/Plugins/ZeresPluginLibrary/0PluginLibrary.plugin.js">https://github.com/rauenzi/BetterDiscordAddons/tree/master/Plugins/ZeresPluginLibrary</a>`);}
		load() {
			if (!global.PluginAPI) return this.showAlert();
			const vm = require("vm"), plugin = compilePlugin(global.PluginAPI.buildPlugin(config));
			try {new vm.Script(plugin, {displayErrors: true});} catch(err) {return bdpluginErrors.push({name: this.getName(), file: this.getName() + ".plugin.js", reason: "Plugin could not be compiled.", error: {message: err.message, stack: err.stack}});}
			global["{{PLUGIN_NAME}}"] = plugin;
			try {new vm.Script(`new global["{{PLUGIN_NAME}}"]();`, {displayErrors: true});} catch(err) {return bdpluginErrors.push({name: this.getName(), file: this.getName() + ".plugin.js", reason: "Plugin could not be constructed", error: {message: err.message, stack: err.stack}});}
			bdplugins[this.getName()].plugin = new global["{{PLUGIN_NAME}}"]();
			bdplugins[this.getName()].plugin.load();
		}
		start() {if (!global.PluginAPI) return this.showAlert(); bdplugins[this.getName()].plugin.start();} stop() {}
    } : compilePlugin(global.ZeresPluginLibrary.buildPlugin(config));
})();