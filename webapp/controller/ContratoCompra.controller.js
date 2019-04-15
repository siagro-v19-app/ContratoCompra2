sap.ui.define([
	"br/com/idxtecContratoCompra/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"br/com/idxtecContratoCompra/services/Session"
], function(BaseController, Filter, FilterOperator, JSONModel, Session) {
	"use strict";

	return BaseController.extend("br.com.idxtecContratoCompra.controller.ContratoCompra", {
		onInit: function(){
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			
			this.getModel().attachMetadataLoaded(function(){
				var oFilter = new Filter("Empresa", FilterOperator.EQ, Session.get("EMPRESA_ID"));
				var oView = this.getView();
				var oTable = oView.byId("tableContrato");
				var oColumn = oView.byId("columnNumero");
				
				oTable.sort(oColumn);
				oView.byId("tableContrato").getBinding("rows").filter(oFilter, "Application");
			});
		},
		
		filtraContrato: function(oEvent){
			var sQuery = oEvent.getParameter("query");
			var oFilter1 = new Filter("Empresa", FilterOperator.EQ, Session.get("EMPRESA_ID"));
			var oFilter2 = new Filter("Numero", FilterOperator.Contains, sQuery);
			
			var aFilters = [
				oFilter1,
				oFilter2
			];

			this.getView().byId("tableContaReceber").getBinding("rows").filter(aFilters, "Application");
		},

		onRefresh: function(e){
			var oModel = this.getOwnerComponent().getModel();
			oModel.refresh(true);
			this.getView().byId("tableContrato").clearSelection();
		},
		
		onIncluir: function(oEvent){
			this.getRouter().navTo("contratocompraadd");
		},
		
		onEditar: function(){
			var oTable = this.getView().byId("tablePedidos");
			var nIndex = oTable.getSelectedIndex();
			
			if (nIndex > -1) {
				var oContext = oTable.getContextByIndex(nIndex);
				this.getRouter().navTo("contratocompraedit",{
					contrato: oContext.getProperty("Numero")		
				});
			} else {
				sap.m.MessageBox.warning("Selecione um contrato na tabela.");
			}
			oTable.clearSelection();
		}
		
		/*onRemover: function(e){
			var that = this;
			var oTable = this.byId("tableContrato");
			var nIndex = oTable.getSelectedIndex();
			
			if (nIndex === -1){
				MessageBox.warning("Selecione um contrato na tabela.");
				return;
			}
			
			MessageBox.confirm("Deseja remover este contrato?", {
				onClose: function(sResposta){
					if(sResposta === "OK"){
						that._remover(oTable, nIndex);
						MessageBox.success("Contrato removido com sucesso!");
					}
				}
			});
		},
		
		_remover: function(oTable, nIndex){
			var oModel = this.getOwnerComponent().getModel();
			var oContext = oTable.getContextByIndex(nIndex);
			
			oModel.remove(oContext.sPath, {
				success: function(){
					oModel.refresh(true);
					oTable.clearSelection();
				},
				error: function(oError){
					MessageBox.error(oError.responseText);
				}
			});
		}*/
	});
});