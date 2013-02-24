window.main = {
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

		// window.main[namespace] = this.module[namespace]();
	},
	register: function (namespace, dependencies, fn) {
		module = this.module;

		if (module[namespace]) {
			throw '[main] Method ' + namespace + ' already exists'
		}

		if (dependencies instanceof Function) {
			fn = dependencies;
		}

		module[namespace] = fn;

		if (dependencies && dependencies.length && dependencies.length > 0) {

			if (!(dependencies instanceof Array)) {
				dependencies = [dependencies];
			}

			this.dependencyList[namespace] = dependencies;
		}

	},
	installModules: function (moduleList, i) {

		var moduleList = this.sortModules(moduleList, this.dependencyList),
			areDependenciesLoaded = false;

		for (var i = 0; i < moduleList.length; i ++) {
			this.loadedModules[moduleList[i]] = this.module[moduleList[i]]();
			this.loadedModulesLog[moduleList[i]] = true;
			areDependenciesLoaded = this.checkDependencies(moduleList[i]);
		}


		return areDependenciesLoaded;

	},

	sortModules: function (moduleList, dependencyList) {

		var sortModuleDependencies = function (a, b) {

				if (dependencyList[a].indexOf(b) != -1) {
					return +1;
				}

				if (dependencyList[b].indexOf(a) != -1) {
					return -1;
				}

				return a - b;
			};

		return moduleList.sort(sortModuleDependencies);

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
	}

};