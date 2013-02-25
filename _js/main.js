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
		var sortModuleDependencies = function (a, b) {

				if (dependencyList[a].length == 0) {
					return -1;
				}

				if (dependencyList[b].length == 0) {
					return +1;
				}

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
	}

};