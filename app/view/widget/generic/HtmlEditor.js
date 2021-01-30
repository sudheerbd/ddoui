Ext.define('DDO.view.widget.generic.HtmlEditor', {
    extend: 'Ext.form.field.HtmlEditor',
    alias: 'widget.ddohtmleditor',
    /**
     * CSS class added on iframe to under it add other styles.
     * @type String
     */
    iframeBodyCls: 'fields-html-editor',
    /**
     * Empty text regex to check if value of field is empty text or user entered
     * text.
     * @type String
     */
    emptyTextRegex: '<span[^>]+[^>]*>{0}<\/span>',
    /**
     * Empty text template to use.
     * @type String
     */
    emptyTextTpl: '<span class="htmleditor-empty-text" style="color:#404040;">{0}</span>',
    /**
     * Empty text to put in field
     * @type String
     */
    emptyText: '',
    /**
     * Validation result value.
     * @type Boolean
     */
    valid: true,
    /**
     * Flag to make this field a placeholder non editable with toolbar hidden, 
     * look like a common and reduced textarea field, when a keydown or mousedown
     * is retrieved on it, show toolbar and do a resize using 'editHeight'.
     * It come back to placeholder size on blur leaving value on field but only
     * readeable.
     * @type Boolean
     */
    asPlaceholder: false,
    /**
     * Flag to know if field is already been editing.
     * @type Boolean
     */
    editing: false,
    /**
     * Height of component after click to edit if 'asPlaceholder' flag is true.
     * @type Number
     */
    editHeight: 200,
    /**
     * Initial field height
     * @type Number
     */
    height: 100,
    /**
     * Height backup after resize to edit when field has 'asPlaceholder' flag
     * on true.
     * @type Number
     */
    heightBkp: 100,
    /**
     * Flag to prevent field doesn't have value
     * @type Boolean
     */
    allowBlank: true,
    /**
     * Leave it in false to disable this validation, otherwise use integer
     * numbers to check min length of text.
     * See: lengthOfPlainText property.
     * @type {Boolean|Integer}
     */
    minLength: false,
    /**
     * Leave it in false to disable this validation, otherwise use integer
     * numbers to check max length of text.
     * See: lengthOfPlainText property.
     * @type {Boolean|Integer}
     */
    maxLength: false,
    /**
     * Flag to validate or not in 'blur' event.
     * @type Boolean
     */
    validateOnBlur: true,
    /**
     * Flag to validate or not in 'change' event.
     * @type Boolean
     */
    validateOnChange: true,
    /**
     * Allow blank validation error template.
     * @type String
     */
    emptyValueError: 'This field is required.',
    /**
     * Flag to remove HTML tags using Ext.util.Format.stripTags method and 
     * check length of plain text. Otherwise check length with tags too.
     * @type Boolean
     */
    lenghtOfPlainText: true,
    /**
     * Min length value error template
     * @type String
     */
    minLenghtValueError: 'Minimum length should be {0}',
    /**
     * Max length value error template
     * @type String
     */
    maxLengthValueError: 'Maximum length should be {0}',
    /**
     * Constructor.
     */
    initComponent: function () {
        var height, cfg = {
            fn: this.handleEmptyText,
            element: 'el'
        };

        // 50px as placeholder
        // 100px normal html editor
        height = this.asPlaceholder ? 50 : 100;

        Ext.apply(this, {
            height: height,
            heightBkp: height,
            listeners: {
                mousedown: cfg,
                keydown: cfg,
                change: this.onChange,
                focus: this.onFocus,
                blur: this.onBlur,
                initialize: this.onInitialize,
                scope: this
            }
        });

        this.callParent(arguments);
    },
    /**
     * Handler for 'initialize' event of Html Editor.
     * Load to iframe same bootstrap.css of Application. This give chance to
     * create styles in same sass files of rest of application and use on
     * this field.
     */
    onInitialize: function () {
        var emptyText, element,
            frameWin = this.getWin(),
            cssLink = null,
            fnBlur = Ext.bind(this.onHtmlEditorBlur, this),
            fnFocus = Ext.bind(this.onHtmlEditorFocus, this);

        frameWin.addEventListener('focus', fnFocus, false);
        frameWin.addEventListener('blur', fnBlur, false);

        cssLink = document.createElement("link")
        cssLink.href = "bootstrap.css";
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        frameWin.document.getElementsByTagName('head')[0].appendChild(cssLink);

        Ext.get(frameWin.document.body).addCls(this.iframeBodyCls);

        if (this.asPlaceholder) {
            this.getToolbar().hide();
        }

        if (Ext.isEmpty(this.getValue()) && !Ext.isEmpty(this.emptyText)) {
            this.preventMark = true;
            this.setEmptyText(true);
        }
    },
    /**
     * Handler for events 'mousedown' and 'keydown' to check and replace
     * empty text for an empty value.
     */
    handleEmptyText: function () {
        var emptyText = this.emptyText,
            value = this.getValue(),
            regexString, regex;

        if (this.isEmptyText(value)) {
            this.setValue('');
            this.focus();
        }
    },
    /**
     * Method which will fire the event "focus". It handler is for iframe 
     * 'focus' event.
     */
    onHtmlEditorFocus: function (event) {
        this.fireEvent('focus', this);
    },
    /**
     * Method which will fire the event "blur". It handler is for iframe 'blur'
     * event.
     */
    onHtmlEditorBlur: function (event) {
        this.fireEvent('blur', this);
    },
    /**
     * Handler for 'focus' event of document iframe.
     * Here if field is not editing and flag 'asPlaceholer' is true show
     * toolbar
     */
    onFocus: function () {
        if (this.asPlaceholder && !this.editing) {
            this.getToolbar().show();

            this.heightBkp = this.getHeight();

            this.setHeight(this.editHeight);
        }

        if (!this.editing) {
            this.editing = true;
        }

        if (this.preventMark) {
            this.preventMark = false;
        }
    },
    /**
     * Handler for 'blur' event of document iframe
     * Here if field is editing and flag 'asPlaceholder' is true  hide toolbar
     * and restore original height.
     */
    onBlur: function () {
        if (this.asPlaceholder && this.editing) {
            this.editing = false;

            this.getToolbar().hide();

            this.setHeight(this.heightBkp);
        }
        var value = this.getValue(),
            result = null;

        if (this.validateOnBlur) {
            result = this.validate(this.getValue());
        }

        if (Ext.isEmpty(value) || Ext.isEmpty(Ext.util.Format.stripTags(value))) {
            this.setEmptyText();
        }

        return result;
    },
    /**
     * Handler for change event. If validateOnBlur is active invoke validation
     * function
     * @param {String} newValue
     */
    onChange: function (newValue) {
        // Returns boolean and it prevent change propagation if this is not
        // valid
        if (this.validateOnChange) {
            return this.validate(newValue);
        }
    },
    /**
     * Format empty text using emptyTpl with emptyCls and emptyText. 
     */
    setEmptyText: function () {
        var emptyText;

        emptyText = Ext.String.format(this.emptyTextTpl, this.emptyText);

        this.setValue(emptyText)
    },
    /**
     * Remove invalid mark of field.
     */
    markValid: function () {
        var frameWin = null,
            frameEl = null;

        frameWin = this.getWin();
        frameEl = Ext.get(frameWin.frameElement);

        frameEl.removeCls("x-form-trigger-wrap-default");
        frameEl.removeCls("x-form-trigger-wrap-invalid");

        Ext.tip.QuickTipManager.unregister(frameEl);
    },
    /**
     * Mark field as invalid like ExtJs fields.
     * @param {String|String[]} errors Errors to show.
     */
    markInvalid: function (errors) {
        if (this.preventMark) {
            return;
        }

        var frameWin = null,
            frameEl = null,
            _errors, _error,
            errorTpl = '<li>{0}</li>',
            errorList,
            errorTextTpl = '<ul class="x-list-plain">{0}</ul>',
            errorText;

        frameWin = this.getWin();
        frameEl = Ext.get(frameWin.frameElement);

        frameEl.addCls("x-form-trigger-wrap-default");
        frameEl.addCls("x-form-trigger-wrap-invalid");
        // Manually register a quick tip for a specific element
        _errors = [];

        if (Ext.isString(errors)) {
            _errors.push(errors);
        } else if (!Ext.isArray(errors)) {
            _errors.push(errors);
        } else if (Ext.isArray(errors)) {
            _errors = Ext.Array.merge(errors, _errors);
        }

        errorList = [];
        for (var i = 0; i < _errors.length; i++) {
            _error = _errors[i];
            errorList.push(Ext.String.format(errorTpl, _error));
        }

        errorText = Ext.String.format(errorTextTpl, errorList.join(""));

        Ext.tip.QuickTipManager.register({
            target: frameEl,
            text: errorText,
            showDelay: 0,
            width: 100
        });
    },
    /**
     * Check if value in field is emptyText property
     * @return {Boolean}
     */
    isEmptyText: function (value) {
        var regexString, regex;

        regexString = Ext.String.format(this.emptyTextRegex, this.emptyText);
        regex = new RegExp(regexString);

        return regex.test(value);
    },
    /**
     * Check if value in editor is empty text or nothing.
     * @return {Boolean|String} True if empty otherwise error string
     */
    checkAllowBlank: function (value) {
        if ((!value || this.isEmptyText(value) || Ext.isEmpty(value)) && !this.allowBlank) {
            return this.emptyValueError;
        }

        return true;
    },
    /**
     * Check length if have limits configurated.
     * @param {String} value
     * @return {Boolean|String[]} Returns boolean if valid else array with 
     * errors.
     */
    checkLength: function (value) {
        var errors = [];

        if (this.isEmptyText(value)) {
            return true;
        }

        if (this.minLength) {
            if (value.length < this.minLength) {
                errors.push(Ext.String.format(this.minLenghtValueError,
                    this.minLength
                ));
            }
        }

        if (this.maxLength) {
            if (value.length > this.maxLength) {
                errors.push(Ext.String.format(this.maxLengthValueError,
                    this.maxLength
                ));
            }
        }

        if (errors.length > 0) {
            return errors;
        }

        return true;
    },
    /**
     * Inspect field to check allowBlank and min/max length.
     * @return {Boolean}
     */
    validate: function () {
        var errors = [],
            value = this.getValue(),
            allowBlankResult = true,
            lengthResult = true,
            valid = true;

        if (this.lenghtOfPlainText && !this.isEmptyText(value)) {
            value = Ext.util.Format.stripTags(value);
        }

        allowBlankResult = this.checkAllowBlank(value);
        lengthResult = this.checkLength(value);

        if (allowBlankResult !== true) {
            errors.push(allowBlankResult);
        }

        if (lengthResult !== true) {
            errors = Ext.Array.merge(errors, lengthResult);
        }

        if (errors.length > 0) {
            this.markInvalid(errors);
            valid = false;
        } else {
            this.markValid();
            valid = true;
        }

        if (valid !== this.valid) {
            this.fireEvent('validitychange', [this, valid]);
        }

        this.valid = valid;

        return valid;
    },
    /**
     * Wrap to ExtJs Form validation.
     * @return {Boolean}
     */
    validateValue: function () {
        return this.validate();
    },
    /**
     * Returns last validation result of field.
     * @return {Boolean}
     */
    isValid: function () {
        return this.valid;
    }
});