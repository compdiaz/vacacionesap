sap.ui.define([
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/core/Popup'
],
	function (MessageToast, Fragment, Controller, Popup) {
		"use strict";

		return Controller.extend("vacacionesap.controller.App", {
			onInit: function () {
				this.byId("openMenu").attachBrowserEvent("tab keyup", function (oEvent) {
					this._bKeyboard = oEvent.type === "keyup";
				}, this);
			},

			handlePressOpenMenu: function (oEvent) {
				var oButton = oEvent.getSource();

				// create menu only once
				if (!this._menu) {
					Fragment.load({
						name: "vacacionesap.fragment.MenuItemEventing",
						controller: this
					}).then(function (oMenu) {
						this._menu = oMenu;
						this.getView().addDependent(this._menu);
						this._menu.open(this._bKeyboard, oButton, Popup.Dock.BeginTop, Popup.Dock.BeginBottom, oButton);
					}.bind(this));
				} else {
					this._menu.open(this._bKeyboard, oButton, Popup.Dock.BeginTop, Popup.Dock.BeginBottom, oButton);
				}
			},

			handleMenuItemPress: function (oEvent) {
				MessageToast.show("'" + oEvent.getParameter("item").getText() + "' Presionado");
			},

			handleTextFieldItemPress: function (oEvent) {
				MessageToast.show("'" + oEvent.getParameter("item").getValue() + "' entered");
			},
			onCollapseExpandPress: function () {
				var oNavigationList = this.byId("navigationList");
				var bExpanded = oNavigationList.getExpanded();

				oNavigationList.setExpanded(!bExpanded);
				console.log(bExpanded);
			},
			onitem1: function() {
				console.log("Item1");
			},

			onHideShowSubItemPress: function () {
				var oNavListItem = this.byId("subItemTwo");
				oNavListItem.setVisible(!oNavListItem.getVisible());
			}

		});

	});
