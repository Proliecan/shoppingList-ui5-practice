sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    function (Controller,JSONModel, MessageToast) {
        "use strict";

        
        return Controller.extend("sl.ns.shoppinglistmodule.controller.MainView", {
            onInit: function () {
                let oModel = new JSONModel();
                oModel.loadData("/model/list.json");
                this.getView().setModel(oModel);
                console.log(oModel);
            },

            onAdd: function (oEvent) {
                let input = this.getView().byId("input");
                let value = input.getValue();
                input.setValue("");
                MessageToast.show(value);

                let oModel = this.getView().getModel();
                let data = oModel.getData();
                data.items.push({ name: value, quantity: 1 });
            },
        });
    });
