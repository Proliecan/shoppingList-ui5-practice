/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"slns/shopping-list-module/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
