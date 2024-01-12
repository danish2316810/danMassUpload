

sap.ui.define([
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], function (MessageBox, MessageToast, Controller, Fragment,JSONModel) {
    "use strict";

    return Controller.extend("massupload.project1.controller.View1", {

        onInit: function() {
            // Create a JSON model for the form data
            var oModel = new JSONModel({
              STUDENTS_ID: "",
              STUDENTS_ID: "",
              LAST_NAME: "",
              DOB: "",
              ADDRESS: ""
            });
      
            this.getView().setModel(oModel);
          },

        onSubmit: function() {
            // Get the form data from the model
            var oFormData = this.getView().getModel().getData();
      
            // Call a function to send the data to the backend
            this._sendDataToBackend(oFormData);
          },
      
          _sendDataToBackend: function(oFormData) {
            // Create an AJAX request or use a suitable method to send the data to the backend
            // Example using jQuery AJAX
            jQuery.ajax({
              url: "/catalog/Students",
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify(oFormData),
              success: function(data, textStatus, xhr) {
                // Handle success
                console.log("Data submitted successfully");
              },
              error: function(xhr, textStatus, errorThrown) {
                // Handle error
                console.error("Error submitting data:", errorThrown);
              }
            });
          },


         
    });
});



