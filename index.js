//
// function init() {

// 	var hash = location.hash || "#address";

// 	var dom = $(hash);

// 	dom.show();

// 	dom.siblings().hide();
// }

// init();

// window.onhashchange = init;

var hashModuleMap = {
	"address": addressModule,
	"rList": rListModule,
	"detail": detailModule,
	"search": searchModule
}

var prevModule = null,
	currModule = null,
	moduleCache = {}; // 判断对象是否被初始化

function routeControl() {
	//路由控制
	var khash = "";

	var hash = location.hash.slice(1) || "address";

	khash = hash;

	if(hash.indexOf("rList") !== -1) {
		khash = "rList";
		rListModule.loadList(hash, true);
	}

	if(hash.indexOf("detail") !== -1) {
		khash = "detail";
		detailModule.loadInfo(hash);
		detailModule.reset();
	}

	var module = hashModuleMap[khash]; // 动态获取对象的属性

	prevModule = currModule;

	currModule = module;

	if (prevModule) 
		prevModule.leave();

	module.enter();

	if (!moduleCache[khash]) {
		module.init();
		moduleCache[khash] = true;
	}	
}

routeControl();

window.onhashchange = routeControl;
