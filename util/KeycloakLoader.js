

Ext.define('DDO.util.KeycloakLoader', {
  extend: "Ext.util.Observable",
  singleton: true,
  alternateClassName: ['KeycloakLoader'],
  keycloak: null,

  initialize: function() {
    var me = this,
      keycloak;
    var host = location.hostname.toLowerCase();
    if (Constants.ENVIORMENTHOSTNAMES.PRODUCTION === host) {
      keycloak = Keycloak('./resources/keycloak/keycloakProd.json');
    } else if (Constants.ENVIORMENTHOSTNAMES.STAGING === host) {
      keycloak = Keycloak('./resources/keycloak/keycloakSt.json');
    } else if(Constants.ENVIORMENTHOSTNAMES.DEV === host){
      keycloak = Keycloak('./resources/keycloak/keycloakDev.json');
    } else {
      keycloak = Keycloak('./resources/keycloak/keycloakLocal.json');
    }
    me.keycloak = keycloak;
  },

  getKeycloak: function() {
    return this.keycloak;
  }
});
