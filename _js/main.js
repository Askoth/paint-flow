window.Main = {
	module: {},
	dependencyList: {},
	loadedModules: {},
	loadedModulesLog: {},
	init: function () {

		var moduleList = Object.keys(this.module);

		var areModulesInstalled = this.installModules(moduleList);

		if (areModulesInstalled) {
			console.log('Modules are installed');
		} else {
			console.log('Not all modules were installed');
		}
	},
	register: function (namespace, dependencies, fn) {
		module = this.module;

		if (module[namespace]) {
			throw '[main] Method ' + namespace + ' already exists'
		}

		if (dependencies instanceof Function) {
			fn = dependencies;
			dependencies = [];
		}

		module[namespace] = fn;

		if (dependencies.length === 0) {
			dependencies = this.parseFnParams(fn);
		}

		if (dependencies instanceof Array && dependencies.length > 0) {

			if (!(dependencies instanceof Array)) {
				dependencies = [dependencies];
			}

			this.dependencyList[namespace] = dependencies;

		} else {
			this.dependencyList[namespace] = [];
		}

	},

	parseFnParams: function (fn) {
		var params = fn.toString()
				.replace(/\n|\r|\s/g, '') //deals with multiline problem
				.replace(/[^\{]*?\(([^\)]*)\).*/, '$1');

		params = params.split(',');

		if (params.length == 1 && params[0] == "") {
			params = [];
		}

		return params;
	},

	installModules: function (moduleList, i) {

		var moduleList = this.sortModules(moduleList, this.dependencyList),
			areDependenciesLoaded = false,
			dependenciesNames,
			dependencyArr;

console.log('[installModules] [moduleList]', moduleList);

		for (var i = 0; i < moduleList.length; i ++) {

			dependenciesNames = moduleList[i];

			dependencyArr = this.getDependencies(this.dependencyList[dependenciesNames]);

			this.loadedModules[dependenciesNames] = this.module[dependenciesNames].apply(this, dependencyArr);
			this.loadedModulesLog[dependenciesNames] = true;
			areDependenciesLoaded = this.checkDependencies(dependenciesNames);
		}


		return areDependenciesLoaded;

	},

	sortModules: function (moduleList, dependencyList) {

		var oldModuleList = [].concat(moduleList),
			newModuleList = [],
			notifications = {
				on: this.on,
				trigger: this.trigger
			},
			placeBehind = {},

			//loops
			i,
			j;

		function notificationCallback (moduleName) {
			return function (dependency) {

				var currentDependencies = placeBehind[moduleName],
					dependencyIndex = placeBehind[moduleName].indexOf(dependency);

				placeBehind[moduleName].splice(dependencyIndex, 1);

				if (placeBehind[moduleName].length == 0) {
					newModuleList.push(moduleName);
					notifications.trigger(moduleName);
				}

			}
		}


		//modules with dependencies
		//use event emitter logic
		var moduleName = oldModuleList[i],
				thisModuleDependencyList;

		for (i = 0; i < oldModuleList.length; i++) {

			moduleName = oldModuleList[i];
			thisModuleDependencyList = [].concat(dependencyList[moduleName]);

			placeBehind[moduleName] = thisModuleDependencyList;

			for (j = 0; j < thisModuleDependencyList.length; j++) {

				notifications.on(thisModuleDependencyList[j], new notificationCallback(moduleName))

			}
			
		}


		//modules without dependencies
		for (i = 0; i < oldModuleList.length; i++) {
			if (dependencyList[oldModuleList[i]].length == 0) {
				newModuleList.push(oldModuleList[i]);

				// oldModuleList.splice(i, 1);
				
				notifications.trigger(oldModuleList[i]);
			}
		}

		return newModuleList;

	},

	getDependencies: function (names) {

		if (!names || names.length == 0) {
			return names;
		}

		var dependencyArr = [],
			i = names.length,
			loadedModules = this.loadedModules;

		while (i--) {
			dependencyArr.unshift(loadedModules[names[i]]);
		}

		return dependencyArr;

	},

	checkDependencies: function (moduleName) {
		var areDependenciesRegistered = true,
			thisModuleDependencies = this.dependencyList[moduleName];

		if (!thisModuleDependencies) {
			return areDependenciesRegistered;
		}

		for (var i = 0; i < thisModuleDependencies.length; i++) {
			if (!this.module[thisModuleDependencies[i]]) {
				throw '[checkDependencies] Dependency: "' + thisModuleDependencies[i] + '" for module "' + moduleName + '" is not registered.'
			}

			if (!this.loadedModulesLog[thisModuleDependencies[i]]) {
				areDependenciesRegistered = false;
			}

		}

		return areDependenciesRegistered;
	},

	//maybe further use later on
	on: function (event, callback) {

		if (!this.registeredListeners) {
			this.registeredListeners = {};
		}

		if (!this.registeredListeners[event]) {
			this.registeredListeners[event] = [];
		}

		this.registeredListeners[event].push(callback);
	},
	trigger: function (event) {

		if (!this.registeredListeners || !this.registeredListeners[event]) {
			return;
		}

		var callbacks = this.registeredListeners[event],
			args = Array.prototype.slice.call(arguments, 1);

		for (var i = 0; i < callbacks.length; i++) {
			callbacks[i].apply(this, args);
		}
	}

};