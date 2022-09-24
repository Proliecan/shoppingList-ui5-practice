

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    function (Controller, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("sl.ns.shoppinglistmodule.controller.MainView", {
            getActiveListIndex: function () {
                let tabContainer = this.getView().byId("tabContainer");
                let id = tabContainer.getSelectedItem()
                let index = id.substring(id.length - 1, id.length);

                return index;
            },
            getInput: function () {
                let input = this.getView().byId("input");
                return input;
            },
            onInit: function () {
                let oModel = new JSONModel();
                oModel.loadData("/model/list.json");
                this.getView().setModel(oModel);
            },
            onAdd: function (oEvent) {
                let input = this.getInput();
                let value = input.getValue();
                input.setValue("");

                let oModel = this.getView().getModel();
                let data = oModel.getData();

                let index = this.getActiveListIndex();

                data.lists[index].items.push({ name: value, quantity: 1 });
            },
            onTabChanged: function (oEvent) {
                // get name of new tab
                let name = oEvent.getParameter("item").getName();

                let oModel = this.getView().getModel();
                let data = oModel.getData();
                // find list with name in model.lists
                let list = data.lists.find(list => list.name === name);

                let input = this.getInput();
                input.setValue("");
                if (list.editable != null) {
                    input.setEnabled(list.editable);
                }
                else
                    input.setEnabled(true);


            }
        });
    });
