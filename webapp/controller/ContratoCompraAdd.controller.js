sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"br/com/idxtecContratoCompra/helpers/MoedaHelpDialog",
	"br/com/idxtecContratoCompra/helpers/CotacaoMoedaHelpDialog",
	"br/com/idxtecContratoCompra/helpers/ProdutoHelpDialog",
	"br/com/idxtecContratoCompra/helpers/UnidadeMedidaHelpDialog",
	"br/com/idxtecContratoCompra/helpers/CorretorHelpDialog",
	"br/com/idxtecContratoCompra/helpers/SafraHelpDialog",
	"br/com/idxtecContratoCompra/helpers/VariedadeHelpDialog",
	"br/com/idxtecContratoCompra/helpers/LocalEstoqueHelpDialog",
	"br/com/idxtecContratoCompra/helpers/CreditoMonsantoHelpDialog",
	"br/com/idxtecContratoCompra/services/Session"
], function(Controller, History, MessageBox, JSONModel, MoedaHelpDialog, CotacaoMoedaHelpDialog, ProdutoHelpDialog,
	UnidadeMedidaHelpDialog, CorretorHelpDialog, SafraHelpDialog, VariedadeHelpDialog, LocalEstoqueHelpDialog,
	CreditoMonsantoHelpDialog, Session) {
	"use strict";

	return Controller.extend("br.com.idxtecContratoCompra.controller.ContratoCompraAdd", {
		onInit: function(){
			var oRouter = this.getOwnerComponent().getRouter();
			
			oRouter.getRoute("contratocompraadd").attachMatched(this._routerMatch, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			
			this.showFormFragment("ContratoCompraCampos");
			
			//desativar close button tabcontainer
			var oTabContainer = this.getView().byId("tabContrato");
        	
        	oTabContainer.addEventDelegate({
            	onAfterRendering: function() {
					var oTabStrip = this.getAggregation("_tabStrip");
					var oItems = oTabStrip.getItems();
					for (var i = 0; i < oItems.length; i++) {
						var oCloseButton = oItems[i].getAggregation("_closeButton");
						oCloseButton.setVisible(false);
					}
            	}
        	}, oTabContainer);
		},
		
		moedaReceived: function() {
			this.getView().byId("moeda").setSelectedKey(this.getModel("model").getProperty("/Moeda"));
		},
		
		cotacaoReceived: function() {
			this.getView().byId("cotacao").setSelectedKey(this.getModel("model").getProperty("/Cotacao"));
		},
		
		produtoReceived: function() {
			this.getView().byId("produto").setSelectedKey(this.getModel("model").getProperty("/Produto"));
		},
		
		unidadeReceived: function() {
			this.getView().byId("unidade").setSelectedKey(this.getModel("model").getProperty("/Unidade"));
		},
		
		corretorReceived: function() {
			this.getView().byId("corretor").setSelectedKey(this.getModel("model").getProperty("/Corretor"));
		},
		
		safraReceived: function() {
			this.getView().byId("safra").setSelectedKey(this.getModel("model").getProperty("/Safra"));
		},
		
		variedadeReceived: function() {
			this.getView().byId("variedade").setSelectedKey(this.getModel("model").getProperty("/Variedade"));
		},
		
		armazemReceived: function() {
			this.getView().byId("armazem").setSelectedKey(this.getModel("contratosaldo").getProperty("/Armazem"));
		},
		
		royaltiesReceived: function() {
			this.getView().byId("royalties").setSelectedKey(this.getModel("contratosaldo").getProperty("/Royalties"));
		},
		
		unidadeReceived1: function() {
			this.getView().byId("unidademedida").setSelectedKey(this.getModel("contratosaldo").getProperty("/UnidadeMedida"));
		},
		
		handleSearchMoeda: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			MoedaHelpDialog.handleValueHelp(this.getView(), sInputId);
		},
		
		handleSearchCotacao: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			CotacaoMoedaHelpDialog.handleValueHelp(this.getView(), sInputId);
		},
		
		handleSearchProduto: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			ProdutoHelpDialog.handleValueHelp(this.getView(), sInputId);
		},
		
		handleSearchUnidade: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			UnidadeMedidaHelpDialog.handleValueHelp(this.getView(), sInputId);
		},
		
		handleSearchCorretor: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			CorretorHelpDialog.handleValueHelp(this.getView(), sInputId);
		},
		
		handleSearchSafra: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			SafraHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchVariedade: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			VariedadeHelpDialog.handleValueHelp(this.getView(), sInputId);
		},
		
		handleSearchArmazem: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			LocalEstoqueHelpDialog.handleValueHelp(this.getView(), sInputId);
		},
		
		handleSearchRoyalties: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			CreditoMonsantoHelpDialog.handleValueHelp(this.getView(), sInputId);
		},
		
		handleSearchUnidade1: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			UnidadeMedidaHelpDialog.handleValueHelp(this.getView(), sInputId);
		},
		
		_routerMatch: function() {
			var oViewModel = this.getOwnerComponent().getModel("view");
			var oContratoModel = new JSONModel();
			var oContratoSaldoModel = new JSONModel();
			var oContrato = {
				"Numero": "",
				"Emissao": new Date(),
				"Moeda": "",
				"Produto": 0,
				"Quantidade": 0.00,
				"ValorUnitario": 0.00,
				"Comissao": 0.00,
				"Unidade": 0,
				"TipoFrete": "NENHUM",
				"Modalidade": "FIX",
				"Status": "ANDAMENTO",
				"EntregaDe": new Date(),
				"EntregaAte": new Date(),
				"Corretor": 0,
				"ReferenciaExterna": "",
				"Safra": 0,
				"Variedade": 0,
				"Cotacao": 0,
				"AliquotaFunrural": 0.00,
				"Observacoes": "",
				"FiscalEncerrado": false,
				"RetemFunrural": false,
				"Empresa" : Session.get("EMPRESA_ID"),
				"Usuario": Session.get("USUARIO_ID"),
				"EmpresaDetails": { __metadata: { uri: "/Empresas(" + Session.get("EMPRESA_ID") + ")"}},
				"UsuarioDetails": { __metadata: { uri: "/Usuarios(" + Session.get("USUARIO_ID") + ")"}}
			};
			
			oViewModel.setData({
				titulo: "Inserir Contrato",
				numEdit: true
			});
			
			oContratoModel.setData(oContrato);
			oContratoSaldoModel.setData([]);
			
			this.getView().setModel(oContratoModel,"model");
			this.getView().setModel(oContratoSaldoModel,"contratosaldo");
			
			this.getView().byId("moeda").setValue(null);
			this.getView().byId("cotacao").setValue(null);
			this.getView().byId("produto").setValue(null);
			this.getView().byId("unidade").setValue(null);
			this.getView().byId("corretor").setValue(null);
			this.getView().byId("safra").setValue(null);
			this.getView().byId("variedade").setValue(null);
			this.getView().byId("royalties").setValue(null);
			this.getView().byId("armazem").setValue(null);
		},
		
		
		loadSafras: function(oEvent){
			oEvent.getSource().getBinding("items").resume();
		},
		
		onInserirLinha: function(oEvent) {
			var oContratoModel = this.getView().getModel("model");
			var oContratoSaldoModel = this.getView().getModel("contratosaldo");
			var oItems = oContratoSaldoModel.getProperty("/");
			var oNovoItem = oItems.concat({
	    		Id: 0,
				Contrato: oContratoModel.getProperty("/Numero"),
				Armazem: 0,
				Royalties: 0,
				UnidadeMedida: 0,
				Quantidade: 1,
				Saldo: 0,
				Empresa: Session.get("EMPRESA_ID"),
				Usuario: Session.get("USUARIO_ID"),
				EmpresaDetails: { __metadata: { uri: "/Empresas(" + Session.get("EMPRESA_ID") + ")"}},
				UsuarioDetails: { __metadata: { uri: "/Usuarios(" + Session.get("USUARIO_ID") + ")"}}
	    	});
			this.getView().getModel("contratosaldo").setProperty("/", oNovoItem);
		},
		
		onRemoverLinha: function(oEvent){
			var oContratoSaldoModel = this.getView().getModel("contratosaldo");
			
			var oTable = this.getView().byId("tableContratoSaldo");
			//var oTable = sap.ui.getCore().byId("tableContratoSaldo");
			
			var nIndex = oTable.getSelectedIndex();
			var oModel = this.getModel();
			
			if (nIndex > -1) {
				var oContext = oTable.getContextByIndex(nIndex);
				var oDados = oContext.getObject();
				var oItems = oContratoSaldoModel.getProperty("/");
				
				oItems.splice(nIndex,1);
				oContratoSaldoModel.setProperty("/", oItems);
				oTable.clearSelection();
			} else {
				sap.m.MessageBox.warning("Selecione um item na tabela !");
			}
		},
		
		salvar: function() {
			var that = this;
			var oContratoModel = this.getView().getModel("model");
			var oContratoSaldoModel = this.getView().getModel("contratosaldo");
			var oModel = this.getModel();
			
			var oDadosContrato = oContratoModel.getData();
			var oDadosItens = oContratoSaldoModel.getData();
			
			if (oDadosItens.length === 0) {
				sap.m.MessageBox.warning("Pedido não tem itens.");
				return;
			}
			
			
			oModel.setDeferredGroups(["upd"]);
			
			
			oDadosContrato.Corretor = oDadosContrato.Corretor ? oDadosContrato.Corretor : 0;
			oDadosContrato.Safra = oDadosContrato.Safra ? oDadosContrato.Safra : 0;
			oDadosContrato.Variedade = oDadosContrato.Variedade ? oDadosContrato.Variedade : 0;
			oDadosContrato.Cotacao = oDadosContrato.Cotacao ? oDadosContrato.Cotacao : 0;
			
			oDadosContrato.MoedaDetails = {
				__metadata: {
					uri: "/Moedas('" + oDadosContrato.Moeda + "')"
				}
			};
			
			oDadosContrato.ProdutoDetails = {
				__metadata: {
					uri: "/Produtos(" + oDadosContrato.Produto + ")"
				}
			};
			
			oDadosContrato.UnidadeMedidaDetails = {
				__metadata: {
					uri: "/UnidadeMedidas(" + oDadosContrato.Unidade + ")"
				}
			};
			
			oDadosContrato.CorretorDetails = {
				__metadata: {
					uri: "/Corretors(" + oDadosContrato.Corretor + ")"
				}
			};
			
			oDadosContrato.SafraDetails = {
				__metadata: {
					uri: "/Safras(" + oDadosContrato.Safra + ")"
				}
			};
			
			oDadosContrato.VariedadeDetails = {
				__metadata: {
					uri: "/Variedades(" + oDadosContrato.Variedade + ")"
				}
			};
			
			oDadosContrato.CotacaoMoedaDetails = {
				__metadata: {
					uri: "/CotacaoMoedas(" + oDadosContrato.Cotacao + ")"
				}
			};
			
			oModel.create("/ContratoCompras", oDadosContrato,{
				groupId: "upd",
				success: function(oData){
					// talves seja necessario para pegar o id do objeto
				}
			});
			
			for ( var i = 0; i < oDadosItens.length; i++) {
				oDadosItens[i].LocalEstoqueDetails = {
					__metadata: { uri: "/LocalEstoques(" + oDadosItens[i].Armazem + ")" }
				};
				oDadosItens[i].CreditoMonsantoDetails = {
					__metadata: { uri: "/CreditoMonsantos(" + oDadosItens[i].Royalties + ")" }
				};
				oDadosItens[i].UnidadeMedidaDetails = {
					__metadata: { uri: "/UnidadeMedidas(" + oDadosItens[i].UnidadeMedida + ")" }
				};
				oDadosItens[i].ContratoCompraDetails = {
					__metadata: { uri: "/ContratoCompras('" + oDadosContrato.Numero + "')" } 
				};
				
				oModel.create("/ContratoCompraSaldos", oDadosItens[i], { 
						groupId: "upd" 
				});
			}
			
			oModel.submitChanges({
				groupId: "upd",
				success: function(oResponse) {
					//se a propriedade response não for undefined, temos erro de gravação
					var erro = oResponse.__batchResponses[0].response;
					if (!erro) {
						sap.m.MessageBox.success("Contrato inserido com sucesso!.",{
							onClose: function() {
								that.navBack();
							}
						});
					}
				}
			});
		},
		
		navBack: function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				oRouter.navTo("contratocompra", {}, true);
			}
		},
		
		_getFormFragment: function (sFragmentName) {
			if (this._formFragment) {
				return this._formFragment;
			}
		
			this._formFragment = sap.ui.xmlfragment(this.getView().getId(),`br.com.idxtecContratoCompra.view.${sFragmentName}`, this);

			return this._formFragment;
		},
		
		showFormFragment : function (sFragmentName) {
			var oPage = this.getView().byId("pageContratoAdd");
			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		},
		
		fechar: function(oEvent) {
			this.navBack();
		},
		
		getModel : function(sModel) {
			return this.getOwnerComponent().getModel(sModel);	
		},
	});

});