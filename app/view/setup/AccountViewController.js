/**
 * The file AccountViewController is the controller for the 'DDO.view.setup.Account' And  'DDO.view.setup.AccountDetail'.
 * @extends {Ext.app.ViewController}
 * @alias controller.accountviewcontroller
 */
Ext.define('DDO.view.setup.AccountViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.accountviewcontroller',
	/**
	 * The function onLogoImgUrlClick will perform when the  'change' event of the filefield is fired in the  Account.js file.
	 * It will upload the logo of account view.
	 * @param {Ext.form.field.File} 'filefield' which is the form field.
	 * @param {string} 'Value' which takes the string of the value entered.
	 */
	onLogoImgUrlClick: function (filefield, value) {
		try {
			var me = this;
			if (AmazonS3.uploadFile(filefield)) {
				AmazonS3.uploadFile(filefield).then(function (img) {
					var mainViewPort, respText, imgPath, singleSlashUrl;
					mainViewPort = Ext.ComponentQuery.query('mainviewport')[0];
					imgPath = img,
						loginStore = Ext.getStore('login'),
						userRecord = loginStore.getAt(0);
					if (mainViewPort) {
						mainViewPort.getViewModel().set('companyLogoUrl', Api.URL.imageUrl + imgPath);
						userRecord.set('logo_url', imgPath)
						Utility.toastReuseFn('t', AlertMessages.logoPicSuccess);
					}
					this.getViewModel().set("companyLogoUrl")
				});
			}
		} catch (err) {
			Utility.showToast(Messages.EMPLOYEESETUP.ACCOUNT.TOAST.ACCOUNTLOGOCLICK, err);
		}
	},
	/**
	 * The function imageTypeExtension is responsible for taking only image types in the field. 
	 * @param {Ext.Component} 'fileField' the file field component. 
	 */
	imageTypeExtension:function(fileField){
		fileField.fileInputEl.set({
			accept:'image/*'
		});
	},
	/**
	 * The function accountFormSubmit will perform when the 'handler' event of the 'button' is fired in the AccountDetail.
	 * It is updating the data by clicking on update button.
	 * @param {Ext.button.Button} 'btn' when button is being clicked.
	 */
	accountFormSubmit: function (btn) {
		try {
			var form, store, formValues,
				formRec, stateCombo, cityCombo,
				stateName, cityName, params,
				storeRecord, record,viewModel;
		
			form = btn.up('account');
			 store = Ext.getStore('setup.AccountStore');
			formRec = form.getValues();
			params = {
				name: formRec.name,
				description: formRec.description,
				email: formRec.requestemail,
				country: formRec.country,
				city: formRec.city,
				state: formRec.state,
				address: formRec.address,
				phonenumber: formRec.phonenumber,
				zipcode: formRec.zipcode
			};
			this.updateAjaxSubmit(params, store, form);
		} catch (err) {
			Utility.showToast(Messages.EMPLOYEESETUP.ACCOUNT.TOAST.ACCOUNTFORMSUBMIT, err);
		}
	},
	/**
	 * The function updateAjaxSubmit is use to update the details in Account.js.
	 * @param {params} 'params' which takes the params like 'name' 'description' 'email' 'country' 'city' 'state' 'address','phonenumber', 'zipcode' 
	 * @param {Ext.data.Store} 'store' it contain all the records of 'setup.AccountStore'.
	 * @param {Ext.form.Form} 'form' which takes the AccountDetailView.
	 */
	updateAjaxSubmit: function (params, store, form) {
		if (form.isDirty() == true) {
			var promiseFormSubmit = new Promise(function (resolve, reject) {
				Ext.Ajax.request({
					url: Api.URL.account.UPDATE,
					method: 'PUT',
					params: params,
					success: function (resp, b) {
						var resolveObj = {};
						resolveObj.form = form;
						resolveObj.res = resp;
						resolve(resolveObj);
					},
					failure: function (resp, b) {
						reject(resp);
					}
				});
			});
			promiseFormSubmit.then(function (resolveObj) {
				var records, rec;
				records = JSON.parse(resolveObj.res.responseText);
				store.reload({
					scope: this,
					callback: function (records, operations, eOpts) {
						if (records && records.length > 0) {
							rec = records[0];
							resolveObj.form.down('accountdetail').getForm().setValues(rec);
							Utility.onMakeLoadDirtyFalse(form, store);
						}
					}
				});
				Ext.getBody().unmask();
				Ext.Msg.alert('SUCCESS', records.message);
			}).catch(function (resp) {
				if (resp && !Ext.isEmpty(resp.responseText)) {
					var decodeText = Ext.decode(resp.responseText);
					Utility.showToast(Messages.ACCOUNT.TOAST.ACCFORMSUBMITFAILMSG, err);
					Ext.Msg.alert('Failure', decodeText.message);
					Ext.getBody().unmask();
				}
			});
		}
	},
	/**
	 * The function accountFormSubmit will perform when the 'handler' event of the 'button' is fired in the AccountDetail.
	 * this function is reseting the form in account details.
	 * @param {Ext.button.Button} 'btn' when button is being clicked.
	 */
	accountFormReset: function (btn) {
		try {
			var form = btn.up('form');
			form.reset();
		} catch (err) {
			Utility.showToast(Messages.EMPLOYEESETUP.ACCOUNT.TOAST.ACCOUNTFORMRESETBTN, err);
		}
	}
});