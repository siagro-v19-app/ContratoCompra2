sap.ui.define([
	"br/com/idxtecContratoCompra/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("br.com.idxtecContratoCompra.controller.ContratoCompra", {
		onInit: function(){
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
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