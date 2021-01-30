Ext.define('DDO.util.AlertMessages', {
    singleton: true,

    alternateClassName: ['AlertMessages'],

    existDepartment: "Entered department already exist!",
    existRole: "Entered role already exist!",
    existDesignation: "Entered designation already exist!",
    existRule: "Entered Rule already exist!",
    existCategory: "Entered Category already exist!",
    existSkill :"Entered skill already exist!",
    existProjectRole:'Entered role already exists!',
    existKarma: "Entered Karma already exist!",

    authFailed: "<span class='err-toast'>Authentication failed. <br />Please try again with proper credentials.</span>",

    imageFormat: "<span class='err-toast'>Invalid image format : <br />[Accpet JPG, JPEG, PNG format]</span>",
    imageNotCreated: "<span class='err-toast'>Image not added</span>",

    unableLikeFeed: "<span class='err-toast'>Unable to like the feed.</span>",
    unableUpdateComment: "<span class='err-toast'>Unable to update a comment. Please try again later.</span>",
    unableAddComment: "<span class='err-toast'>Unable to add a comment. Please try again later.</span>",
    unableCreateFeed: "<span class='err-toast'>Unable to create a feed. Please try again later.</span>",

    profilePicSuccess: "<span class='nonerr-toast'>Profile pic changed successfully!</span>",
    profilePicFailure: "<span class='err-toast'>Failed to change profile pic!</span>",
    coverPicSuccess: "<span class='nonerr-toast'>Cover pic changed successfully!</span>",
    coverPicFailure: "<span class='err-toast'>Failed to change profile pic!</span>",

    logoPicSuccess: "<span class='nonerr-toast'>Logo pic changed successfully!</span>",
    logoPicFailure: "<span class='err-toast'>Failed to change logo pic!</span>",

    noCities: "<span class='err-toast'>No cities are available for selected state!</span>",
    noStates: "<span class='err-toast'>No states are available for selected country!</span>",

    empAddedSuccess: "<span class='nonerr-toast'>Employee Added Successfully</span>",
    empDeletedSuccess: "<span class='err-toast'>Employee Deleted Successfully</span>",

    startDateGreaterMsg: "<span class='err-toast'>Start date should be less than End date</span>",
    endDateLesserMsg: "<span class='err-toast'>End date should be greater than Start date</span>",

    invalidRoleAlloc: "Employee already exist for this role!",

    networkFailed: "Network failure!",

    noteAddFailed: "<span class='err-toast'>Failed to insert the note!</span>",
    noteUpdateFailed: "<span class='err-toast'>Failed to update the note!</span>",
    noteRemoveFailed: "<span class='err-toast'>Failed to remove the note!</span>",

    //err message for account Registration company.
    companyExists: "<span class='err-toast'>Company name already engazed with us</span>",
    phNumExists: "<span class='err-toast'>Phone number already engazed with us</span>",
    orgEmailExists: "<span class='err-toast'>User Email already engazed with us</span>",

    //tooltip msg for valid company|phone number in account Registration.
    companyValid:'Valid Company Details',
    phNumValid:'Valid Phone Number Details',
    orgEmailValid:'Valid User Email Details',

    //Self Nomination display messages
    selfNomError: "Self nomination not allowed!",

    //No wallet found for project employee - alert message
    proEmpWalletNotFound: "Some of the employees related to the project <br>does not have employee wallet!"
});
