

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/Input",
    "sap/ui/layout/HorizontalLayout",
    "sap/m/Label",
    "sap/ui/core/VerticalAlign"
],
    function (Controller, JSONModel, MessageToast, Dialog, Button, ButtonType, Input, HorizontalLayout, Label, VerticalAlign) {
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
                let data = oModel.getData();
                data.listMode = "DetailAndActive";
                oModel.setData(data);
                this.getView().setModel(oModel);
            },
            onAdd: function (oEvent) {
                let input = this.getInput();
                let value = input.getValue();
                if (value === "") {
                    return;
                }

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

                let editable = true;
                if (list.editable === false) editable = false;

                let input = this.getInput();
                input.setValue("");
                if (editable) {
                    input.setEnabled(true);
                    data.listMode = "DetailAndActive";
                } else {
                    input.setEnabled(false);
                    data.listMode = "Inactive";
                }
                oModel.setData(data);
                this.getView().setModel(oModel);
            },
            onItemPress: function (oEvent) {
                let item = oEvent.getSource().getBindingContext().getObject();

                let oModel = this.getView().getModel();
                let data = oModel.getData();


                let al = this.getActiveListIndex();
                // if list is not editable, do nothing
                if (data.lists[al].editable === false) {
                    MessageToast.show("List not editable");
                    return;
                }
                // go through each element of active list
                for (let i = 0; i < data.lists[al].items.length; i++) {
                    // if item is found, remove it
                    if (data.lists[al].items[i] == item) {
                        data.lists[al].items.splice(i, 1);
                        break;
                    }
                }
                //add item to done list
                data.lists.find(list => list.id === "Done").items.push(item);
                // APPLY CHANGES TO MODEL
                oModel.setData(data);
                this.getView().setModel(oModel);

                MessageToast.show("Item removed");
            }
        });
    });
