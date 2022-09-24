/*global QUnit*/

sap.ui.define([
	"slns/shopping-list-module/controller/MainView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MainView Controller");

	QUnit.test("I should test the MainView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
