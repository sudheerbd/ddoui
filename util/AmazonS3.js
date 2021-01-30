/**
 * @class AmazonS3

Provides a utility class for uploading files direct to the Amazon S3 service, using CORS.
Requires a server-side page to be created, as specified by AmazonS3#signingUrl, which takes in the file name ("name") and file type ("type"), and digitally signs the request for submission to Amazon S3.


Class created by Daniel Gallo, based on non-Sencha code sample from [here](http://www.ioncannon.net/programming/1539/direct-browser-uploading-amazon-s3-cors-fileapi-xhr2-and-signed-puts/).


Example usage:

    AmazonS3.uploadFile(fileUploadField);

You can also pass in a configuration to override some of the default properties:

    AmazonS3.uploadFile(fileUploadField, {
        signingUrl: 'newurl.php',
        invalidFileMessage: 'Please select a file.'
    });

And have callbacks when a file has successfully uploaded:

    AmazonS3.uploadFile(fileUploadField, {
        successCallback: function(response) {
            console.log('success');
        }
    });

Preview:

{@img fileuploadfield.png File upload field in a form}

During upload:

{@img progressbar.png Progress bar during upload}

Example signing page (in PHP):

    <?php

    // The following 3 properties are specific to your Amazon S3 setup. The Secret Key should obviously not be shared or divulged.
    $S3_KEY='Public Key Here';
    $S3_SECRET='Secret Key Here';
    $S3_BUCKET='/Bucket Name Here';

    $EXPIRE_TIME=(60 * 5); // 5 minutes
    $S3_URL='http://s3-us-west-2.amazonaws.com';

    // The full file name including extension
    $objectName='/' . urlencode($_GET['name']);

    // File MIME type
    $mimeType=$_GET['type'];
    $expires = time() + $EXPIRE_TIME;
    $amzHeaders= "x-amz-acl:public-read";

    // The string to sign, based on the request type, MIME type of the file, headers and file path
    $stringToSign = "PUT\n\n$mimeType\n$expires\n$amzHeaders\n$S3_BUCKET$objectName";

    // Sign the string with the S3 Secret key.
    $sig = urlencode(base64_encode(hash_hmac('sha1', $stringToSign, $S3_SECRET, true)));

    // Generate the URL to where the file should be uploaded on Amazon S3, appending query string params such as the S3 public key, expiry time and signature
    $url = urlencode("$S3_URL$S3_BUCKET$objectName?AWSAccessKeyId=$S3_KEY&Expires=$expires&Signature=$sig");

    // Return the signed Amazon S3 URL
    echo $url;
    ?>

 * @singleton
 */
Ext.define('DDO.util.AmazonS3', {
    singleton: true,
    alternateClassName: ['AmazonS3'],
    requires: [
        'Ext.Ajax',
        'Ext.ProgressBar',
        'Ext.String',
        'Ext.window.MessageBox',
        'Ext.window.Window'
    ],

    /// imageUrl: "murairiiii",

    config: {
        /**
         * @cfg {Ext.form.field.File} fileUploadField
         * The file upload field containing the file to upload.
         */
        fileUploadField: null,

        imageUrl: "murairiiii",

        /**
         * @cfg {Boolean} allowCancel
         * If set to true, the user will be able to cancel the upload through the use of a Cancel button.
         */
        allowCancel: true,

        /**
         * @cfg {String} cancelText
         * Text that's shown within the Cancel button.
         */
        cancelText: 'Cancel',

        /**
         * @cfg {String} signingUrl
         * The URL to your page that accepts the file name and file type, and returns a signed Amazon S3 URL for uploading to the S3 service.
         * You can see an [example of a PHP signing page here](http://www.ioncannon.net/programming/1539/direct-browser-uploading-amazon-s3-cors-fileapi-xhr2-and-signed-puts/).
         */
        // signingUrl: 'signfile.php',

        /**
         * @cfg {String} invalidFileMessage
         * Message that's shown to the user if there isn't a file to upload.
         */
        invalidFileMessage: 'Please provide a file to upload.',

        /**
         * @cfg {String} invalidBrowserMessage
         * Message that's shown to the user if their browser doesn't support this type of file upload.
         */
        invalidBrowserMessage: 'Your browser doesn\'t support the ability to upload files using this method.',

        /**
         * @cfg {String} finalizingText
         * The text that's shown within the Progress Bar when the upload is finalising.
         */
        finalizingText: 'Finalising.',

        /**
         * @cfg {String} uploadingText
         * The text that's shown within the Progress Bar when the file is uploading.
         */
        uploadingText: 'Uploading.',

        /**
         * @cfg {String} abortedText
         * The text that's shown within the Progress Bar when the upload has been aborted.
         */
        abortedText: 'Aborted.',

        /**
         * @cfg {String} completedText
         * The text that's shown within the Progress Bar when the upload has completed successfully.
         */
        completedText: 'Upload completed.',

        /**
         * @event progressCallback
         * Fired when the file commences upload and there is progress information.
         * @param {Object} progress The progress event object.
         */
        progressCallback: null,

        /**
         * @event successCallback
         * Fired when the file has successfully uploaded to the remote server.
         * @param {Object} response The response object.
         */
        successCallback: null,

        /**
         * @event failureCallback
         * Fired when the file has failed to upload to the remote server.
         */
        failureCallback: null,

        /**
         * @event abortCallback
         * Fired when the upload has been cancelled by the user.
         * @param {Object} response The response object.
         */
        abortCallback: null,

        // Reference to the progress bar component.
        progressBar: null,

        // Reference to the progress window component.
        progressWindow: null,

        // Reference to the XMLHttpRequest object.
        xhr: null
    },

    /**
     * Uploads the file from the provided {@link Ext.form.field.File} field.
     * @param {Ext.form.field.File} fileUploadField The file upload field.
     * @param {Object} config The configuration options.
     */
    //   imagePath:null,
    uploadFile: function (fileUploadField, projectId) {
        var me = this,
            deferred = new Ext.Deferred(),
            files = fileUploadField.fileInputEl.dom.files,
            file;

        /**
         * Validating fielfield
         */
        if (files.length === 0) {
            // me.showError(me.getInvalidFileMessage());
            return;
        }
        file = files[0];
        var login = Ext.getStore('login');
        var empId = login.getData().items[0].data.ddo_employee_id;

        Ext.Ajax.request({
            url: 'generatepresignedurl/presignedUrl',
            method: 'GET',
            params: {
                name: file.name + empId,
                type: file.type,
                imageFolder: fileUploadField.name,
            },

            success: function (response) {
                var responseText = JSON.parse(response.responseText),
                 presignedUrl = responseText.signedUrl,
                 location = responseText.location,
                 param;

                param = {

                    imageFolder: fileUploadField.name,
                    imageLocation: location,
                    successId: 'uploaded',
                }
                if (projectId) {
                    param.projectId = projectId;
                }
                me.requestParam = param;

                me.startUpload(file, presignedUrl, location).then(function (res) {
                    me.updateStatustoDB(this).then(function (res) {
                        deferred.resolve(res);

                    });

                }, null, null, me);

            },
            failure: function (response) {
                deferred.reject();
                Ext.Msg.alert("Failure", responseText.message);
            }
        });
        return deferred.promise;

    },
    /**
     * This method will be called to update data to DB
     */
    updateStatustoDB: function (obj) {
        var deferred = new Ext.Deferred();

        Ext.Ajax.request({
            url: 'generatepresignedurl/presignedUrl',
            method: 'GET',
            params: obj.requestParam || {},
            success: function (response) {
                var responseText = JSON.parse(response.responseText);
                imageUrl = responseText.data.imageUrl;
                if(imageUrl && !imageUrl.includes('feedsImage')){
                    Ext.Msg.alert("Success", "Successfully uploaded");
                }
                deferred.resolve(imageUrl);

            },
            failure: function () {
                deferred.reject();
                Ext.Msg.alert("Failure", "failed to upload");
            }
        });

        return deferred.promise;

    },
    // uploadFile1: function (fileUploadField, paraMeter) {

    //     var me = this;

    //     me.fileUploadField = fileUploadField;

    //     if (me.fileUploadField.fileInputEl.dom.files.length === 0) {
    //         me.showError(me.getInvalidFileMessage());
    //         return;
    //     }

    //     var file = me.fileUploadField.fileInputEl.dom.files[0];
    //     var deferred = new Ext.Deferred();
    //     // Fire off a request to the signing page. This will return a signed Amazon S3 URL that will be used for the upload.
    //     Ext.Ajax.request({
    //         url: 'generatepresignedurl/presignedUrl',
    //         method: 'GET',
    //         params: {
    //             name: file.name,
    //             type: file.type,
    //             imageFolder: fileUploadField.name,
    //         },

    //         success: function (response) {
    //             var responseText = JSON.parse(response.responseText);
    //             var presignedUrl = responseText.signedUrl;
    //             var location = responseText.location;

    //             var param = {
    //                 imageFolder: fileUploadField.name,
    //                 imageLocation: location,
    //                 successId: 'uploaded',
    //             }
    //             if (paraMeter) {
    //                 param.projectId = paraMeter;
    //             }

    //             me.startUpload(file, presignedUrl, location).then(function (res) {
    //                 me.updateStatustoDB().then(function (res) {
    //                     deferred.resolve(res);
    //                 });

    //             }, null, null, me);

    //         },
    //         failure: function (response) {
    //             Ext.Msg.alert("Failure", responseText.message);

    //         }
    //     });
    //     return deferred.promise;
    // },


    /**
     * Cancels the upload currently in progress.
     * @param {Ext.button.Button} button Reference to the Cancel button.
     */
    cancelUpload: function (button) {
        var me = this;

        // Abort the file upload
        me.xhr.abort();

        // Stop the button being clicked multiple times
        button.disable();

        // Update the progress bar to zero percent, and show the aborted text
        me.updateStatus(0, me.abortedText);

        // Close progress window after one second
        me.closeProgressWindow();

        Ext.callback(me.abortCallback, me);
    },

    /**
     * Starts the file upload process.
     * @private
     * @param {Object} file The underlying File Object file from the {@link Ext.form.field.File} field.
     * @param {String} signedUrl The Amazon S3 signed url. This is the url to where the file will be uploaded, and should contain a signature for authorising the request.
     */
    startUpload: function (file, signedUrl, imageLocation) {
        var deferred = new Ext.Deferred();
        // var signedUrl="https://ddodevops.s3.amazonaws.com/jacket.jpg?AWSAccessKeyId=AKIAT4CJHPM3WU6ADJ4J&Signature=qx3TTAt30KDcsYGwC1cETM0v9iU%3D&Expires=1560769444";
        var me = this,
            xhr = me.xhr = me.createCorsRequest('PUT', signedUrl);

        if (!xhr) {
            me.showError(me.getInvalidBrowserMessage());
        } else {
            xhr.onload = function () {
                if (xhr.status == 200) {
                    deferred.resolve(this);
                    // Ext.callback(me.successCallback, me, [xhr]);

                } else {
                    Ext.callback(me.failureCallback, me, [xhr]);
                    deferred.reject();
                }

                me = null;
            };
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    deferred.resolve(this);
                }
            }
            xhr.onerror = function (response) {
                Ext.callback(me.failureCallback, me, [response]);
                me = null;
                deferred.reject();
            };
            xhr.open('PUT', imageLocation, true);
            xhr.setRequestHeader('x-amz-acl', 'public-read-write');
            xhr.setRequestHeader('Content-Type', file.type);
            xhr.send(file);
        }
        return deferred.promise;
    },

    /**
     * Shows an error message inside a {@link Ext.window.MessageBox}.
     * @private
     * @param {String} error The error message to show inside the generated {@link Ext.window.MessageBox}.
     */
    showError: function (error) {
        Ext.Msg.show({
            title: 'Error',
            msg: error,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    },

    /**
     * Creates a CORS request that can then be used for the file upload.
     * @private
     * @param {String} method The method to use in the request (PUT, POST).
     * @param {String} url The Amazon S3 url where the file should be uploaded, as returned from the signing url.
     * @return {Object}
     */
    createCorsRequest: function (method, url) {
        var xhr = new XMLHttpRequest();

        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }

        return xhr;
    },
    imagePathModify: function (location) {
        if (location.includes("s3.amazonaws.com")) {
            var imagePath = location.replace('https://muraribuckettesting.s3.amazonaws.com/', "");
            return imagePath;
        }

    }

});
