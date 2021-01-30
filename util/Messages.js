Ext.define('DDO.util.Messages', {
    singleton: true,
    alternateClassName: ['Messages'],
    LOGIN : {
        SESSIONS : 'Something went wrong while validating sessions!!!',
        ROUTECHANGE : 'Something went wrong while changing route!!!',
        LOGINCLICK : 'Something went wrong while login click!!!',
        STORELOAD : 'Something went wrong while loading the login store!!!'
       },
    NOMINATION: {
        WARNING: 'WARNING',
        ERROR: 'Error',
        HOURSWARNING: 'Hours should not be 0 or negative value !!!',
        RECORDEXIST: 'Record Already Exists!!!',
        SERVERERROR: 'server-side failure with status code ',
        CLOSECONFIRMATION: 'Are you sure, You want to close Nomination Form ?',
        MAXLENGTH: 'Max Length for nomination is 6000',
        SELECTEMPLOYEE: 'please select Employee',
        INSUFFICENTBALANCE: 'User does not have enough balance to nominate',
        NOFREQUENCYFOUND: 'No frequency found!!!',
        TOAST: {
            DELETENOMINATIONRECORD: 'Something went wrong while deleting nomination record!!!',
            PROCESSINGCOMMENT: 'Something went wrong while processing comment!!!',
            LOADINGFREQUENCY: 'Something went wrong while loading frequency option!!!',
            FAILEDFREQUENCY: 'Fail to get Frequency Option',
            KARMABASEDOPTION: 'Something went wrong while loading karma based option!!!',
            ADDNOMINATIONRECORD: 'Something went wrong while adding nomination record !!!',
            SENDAPPROVAL: 'Something went wrong while Sending nomination request!!!',
            FREQUENCYSELECTERROR: 'Something went wrong while Selecting frequency!!!',
            KARMACALCULATION: 'Something went wrong while karma score calculation',
            WINDOWCLOSEBEFORE: 'Something went wrong while closing nomination Window!!!',
            EMPLOYEEDETAILSETUP: 'Something went wrong while setting employee details!!!',
            DATESELECTCANCEL: 'Something went wrong while canceling data selection!!!',
            DATESELECTIONCONFIRMATION: 'Something went wrong while confirming date selection!!!',
            DATESELECTPROCESS: 'Something went wrong while selecting date!!!',
            KARMACATEGORYSELECTION: 'Something went wrong while Selecting karma category!!!',
            DATEPICKERCLOSE: 'Something went wrong while closing date picker!!!',
            DATEPICKERACTIVATION: 'Something went wrong while activating date field!!!',
            SENTBACKNOMINATION: 'Something went wrong while moving nomination record from sent back to self nomination!!!',
            NOMINATIONSWITCHTAB: 'Something went wrong while Switching between self nomination & sent back nomination!!!',
            NOMINATIONWINDOWCLOSE: 'Something went wrong while closing nominate window!!!',
            RESETFORMVALUES: 'Something went wrong while resetting form!!!',
            WINDOWOUTSIDECLICK: 'Something went wrong while clicking outside the window!!!',
            NOMINATETAGSELECTED: 'Something went wrong while selecting nominate tag!!!',
            NOMINATEOTHERSELECT: 'Something went wrong while selecting nomination record!!!',
            NOMINATEOTHERICON: 'Something went wrong while selecting nominate icon!!!',
            NOMINATEOTHERSAVERECORD: 'Something went wrong while saving nomination other record!!!',
            NOMINATEOTHERATINGICON: 'Something went wrong while selecting nomination icon rating!!!',
            RULEFOCUSLEAVE: 'Something went wrong while processing rules!!!',
            NOMINATEOTHERKARMASELECTION: 'Something went wrong while processing karma option selection!!!',
            UIFAILURE: 'Something went wrong while updating UI',

        }
    },
    USERPROFILE : {
        PROFILESKILLS : {
      ADDSKILL : 'Something went wrong while opening the form!!!',
      SAVECLICK : 'Something went wrong while saving the form!!!',
      CANCELCLICK : 'Something went wrong while cancel click!!!',
      COMBOCHANGE : 'Something went wrong while changing the value of combobox!!!',
      RENDER : 'Something went wrong while rendering profile skills view!!!'
        },
       ADDEDUCATIONFORM :{
        SAVECLICK : 'Something went wrong while saving the form!!!',
        CANCELCLICK : 'Something went wrong while cancel click!!!',
        YEAR : 'Something went wrong while selecting the year!!!',
        ADDBUTTON : 'Something went wrong while opening the form!!!',
        EDITCLICK :'Something went wrong while clicking on the edit icon!!!',
        RENDER : 'Something went wrong while rendering the education data view!!!',
        MOUSEHOVER : 'Something went wrong while mouse hover!!!'
       },
        INTERESTS : {
          ADDBUTTON : 'Something went wrong while opening the textfield!!!',
          ADDINTERESTS : 'Something went wrong while saving the data!!!',
          REMOVECLICK : 'Something went wrong while removing the interest!!!',
          RENDER : 'Something went wrong while opening the interests view!!!'
        },
        ADDJOBBUTTON:{
            CANCELCLICK : 'Something went wrong while cancel click!!!',
            SAVECLICK : 'Something went wrong while saving the form!!!',
            YEAR : 'Something went wrong while selecting the year!!!',
            CHECKBOX : 'Something went wrong while selecting the checkbox!!!',
            MONTH : 'Something went wrong while selecting the month!!!',
            ADDBUTTON : 'Something went wrong while opening the form!!!',
            ITEMCLICK : 'Somethig went wrong while clicking on the item!!!',
            EDITABLE : 'Something went wrong while making the item editable before refresh!!!',
            RENDER : 'Something went wrong while rendering the jobs view!!!',
            MOUSEHOVER : 'Something went wrong with edit icon when mouse hover!!!',
            BACKCLICK : 'Something went wrong while clicking on the back button!!!',
            FORMSAVE : 'Something went wrong while clicking on the form save button!!!',
            STARTDATEVALIDATION : 'Something went wrong while start date validation!!!',
            ENDDATEVALIDATION : 'Something went wrong while end date validation!!!',
            JOBCHANGE :'Something went wrong while changing the job!!!'
        },
        KARMAWALLETHISTORY:{
          DBCLICK : 'Something went wrong while showing the window!!!'
        },
        DETAILSBUTTON : 'Something went wrong while opening the timeline view!!!',
        PROJECTMANAGER : 'Something went wrong while clicking on the reporting manager button!!!',
        PROJECTHISTORY : 'Something went wrong while opening the project history view!!!',
        EDITPERSONALDETAILS : 'Something went wrong while opening the window of edit presonal details!!!',
        ADDJOB : 'Something went wrong while hovering on the add job!!!',
        ADDEDUCATION : 'Something went wrong while mouse hovering on add education button!!!',
        ADDINTERESTS : 'Something went wrong while mouse hovering on the add interests button!!!',
        ADDSKILLS : 'Something went wrong while mouse hovering on the add skills button!!!',
        PRINTUSERPROFILE : 'Something went wrong while printing the user profile data!!!',
        WALLETKARMASCORE : 'Something went wrrong while opening the wallet karma score view!!!',
        NOMINATECLICK : 'Something went wrong while clicking on the nominate button!!!',
        UPLOADPHOTO : 'Something went wrong while uploading the photo!!!',
        SENDRESIGNATION  : 'Something went wrong while opening the send resignation window!!!',
        RESIGNATIONPERSONALDETAILS :'Something went wrong while giving access to the send resignation and the edit personal details!!!',
        PROFILEDATA : 'Something went wrong while loading the user profile data!!!'
     },
     EDUCATIONFORM : {
      SAVEBUTTON : 'Something went wrong while saving the form!!!',
      BACKICON : 'Something went wrong while clicking on the back icon click!!!',
      SAVEBTNACCESS : 'Something went wrong while giving the access to save button!!!'
     },
     COPYROLE : {
         ROLEMODIFICATION : 'No role views are modified!!!',
        ROLEUPDATE : 'Roles view updated successfully!!!',
        ROLEACCESS : 'Unable to add access for role view!!!',
        },
    ROLE: {
        NOTHINGMODIFIED: 'Nothing is modified!',
        VIEWUPDATED: 'views update successfully',
        ADDACCESSFAIL: 'Unable to add access for view',
        TOAST: {
            APPLYACCESS: 'Something went wrong while updating role access!!!',
            ROLECHANGE: 'Something went wrong while changing roles!!!',
            PREPARESERVICEDATA: 'Something went wrong while getting services data for role changes!!!',
            DOSERVICECALL: 'Something went wrong while reaching to services for apply access!!!',
            SEARCH : 'Something went wrong while searching the roles !!!'
        }
    },

    EMPLOYEERESIGNATION: {
        TOAST: {
            SUCCESS: 'Successfully Saved !',
            NEXT: 'Something went wrong with next button!! ',
            BACK: 'Something went wrong with back button!! ',
            NEXTPROJECT: 'Something went wrong at next button click at project card!!',
            NEXTASSET: 'Something went wrong at next button click at asset card!!',
            NEXTFINALHR: 'Something went wrong at final hr card!',
            KEYDOWNDATE: 'Something went wrong at date field setting with proposed date and actual date!',
            BUTTONACTIONCLICK: 'Something went wrong at handling of progress status and thus,handling of buttons!',
            PROJECTBUTTONEDITCLICK: 'Something went wrong at adding "employeenoticeperiodwindoeadd"!',
            SUBMITBUTTONUPDATE: 'Something went wrong at setting params at updateExitEmpAjax!',
            UPDATEEXITEMPAJAX: 'Something went wrong at Ajax request at updateExitEmpAjax!',
            UPDATEBUTTONCLICK: 'Something went wrong at updating records!',
            PROJECTAJAX: 'Something went wrong at requesting to project approval failed!!!',
            PROJECTENDDATE: 'Something went wrong while updating End Date!!!',
            REQUESTUPDATE: 'Something went wrong at setting allocateparams !',
            STATUSSELECT: 'Something went wrong at status,combobox and its showing of store !',
            ONCLICKCHECK: 'Something went wrong at assets cards check button!',
            EYEBUTTON : 'Something went wrong while opening the window!!!',
            ENABLEBUTTON : 'Something went wrong while enabling the buttons!!!',
            ACTIONWINDOW : 'Something went wrong while opening the window!!!'
        }
    },
    NOMINATION: {
        WARNING: 'WARNING',
        ERROR: 'Error',
        HOURSWARNING: 'Hours should not be 0 or negative value !!!',
        RECORDEXIST: 'Record Already Exists!!!',
        SERVERERROR: 'server-side failure with status code ',
        CLOSECONFIRMATION: 'Are you sure, You want to close Nomination Form ?',
        MAXLENGTH: 'Max Length for nomination is 6000',
        SELECTEMPLOYEE: 'please select Employee',
        INSUFFICENTBALANCE: 'User does not have enough balance to nominate',
        NOFREQUENCYFOUND: 'No frequency found!!!',
        TOAST: {
            DELETENOMINATIONRECORD: 'Something went wrong while deleting nomination record!!!',
            PROCESSINGCOMMENT: 'Something went wrong while processing comment!!!',
            LOADINGFREQUENCY: 'Something went wrong while loading frequency option!!!',
            FAILEDFREQUENCY: 'Fail to get Frequency Option',
            KARMABASEDOPTION: 'Something went wrong while loading karma based option!!!',
            ADDNOMINATIONRECORD: 'Something went wrong while adding nomination record !!!',
            SENDAPPROVAL: 'Something went wrong while Sending nomination request!!!',
            FREQUENCYSELECTERROR: 'Something went wrong while Selecting frequency!!!',
            KARMACALCULATION: 'Something went wrong while karma score calculation',
            WINDOWCLOSEBEFORE: 'Something went wrong while closing nomination Window!!!',
            EMPLOYEEDETAILSETUP: 'Something went wrong while setting employee details!!!',
            DATESELECTCANCEL: 'Something went wrong while canceling data selection!!!',
            DATESELECTIONCONFIRMATION: 'Something went wrong while confirming date selection!!!',
            DATESELECTPROCESS: 'Something went wrong while selecting date!!!',
            KARMACATEGORYSELECTION: 'Something went wrong while Selecting karma category!!!',
            DATEPICKERCLOSE: 'Something went wrong while closing date picker!!!',
            DATEPICKERACTIVATION: 'Something went wrong while activating date field!!!',
            SENTBACKNOMINATION: 'Something went wrong while moving nomination record from sent back to self nomination!!!',
            NOMINATIONSWITCHTAB: 'Something went wrong while Switching between self nomination & sent back nomination!!!',
            NOMINATIONWINDOWCLOSE: 'Something went wrong while closing nominate window!!!',
            RESETFORMVALUES: 'Something went wrong while resetting form!!!',
            WINDOWOUTSIDECLICK: 'Something went wrong while clicking outside the window!!!',
            NOMINATETAGSELECTED: 'Something went wrong while selecting nominate tag!!!',
            NOMINATEOTHERSELECT: 'Something went wrong while selecting nomination record!!!',
            NOMINATEOTHERICON: 'Something went wrong while selecting nominate icon!!!',
            NOMINATEOTHERSAVERECORD: 'Something went wrong while saving nomination other record!!!',
            NOMINATEOTHERATINGICON: 'Something went wrong while selecting nomination icon rating!!!',
            RULEFOCUSLEAVE: 'Something went wrong while processing rules!!!',
            NOMINATEOTHERKARMASELECTION: 'Something went wrong while processing karma option selection!!!',
            UIFAILURE: 'Something went wrong while updating UI'
        }
    },
    ROLE: {
        NOTHINGMODIFIED: 'Nothing is modified!',
        VIEWUPDATED: 'views update successfully',
        ADDACCESSFAIL: 'Unable to add access for view',
        TOAST: {
            APPLYACCESS: 'Something went wrong while updating role access!!!',
            ROLECHANGE: 'Something went wrong while changing roles!!!',
            PREPARESERVICEDATA: 'Something went wrong while getting services data for role changes!!!',
            DOSERVICECALL: 'Something went wrong while reaching to services for apply access!!!'
        }
    },

    EMPLOYEERESIGNATION: {
        TOAST: {
            SUCCESS: 'Successfully Saved !',
            NEXT: 'Something went wrong with next button!! ',
            BACK: 'Something went wrong with back button!! ',
            NEXTPROJECT: 'Something went wrong at next button click at project card!!',
            NEXTASSET: 'Something went wrong at next button click at asset card!!',
            NEXTFINALHR: 'Something went wrong at final hr card!',
            KEYDOWNDATE: 'Something went wrong at date field setting with proposed date and actual date!',
            BUTTONACTIONCLICK: 'Something went wrong at handling of progress status and thus,handling of buttons!',
            PROJECTBUTTONEDITCLICK: 'Something went wrong at adding "employeenoticeperiodwindoeadd"!',
            SUBMITBUTTONUPDATE: 'Something went wrong at setting params at updateExitEmpAjax!',
            UPDATEEXITEMPAJAX: 'Something went wrong at Ajax request at updateExitEmpAjax!',
            UPDATEBUTTONCLICK: 'Something went wrong at updating records!',
            PROJECTAJAX: 'Something went wrong at requesting to project approval failed!!!',
            REQUESTUPDATE: 'Something went wrong at setting allocateparams !',
            STATUSSELECT: 'Something went wrong at status,combobox and its showing of store !',
            ONCLICKCHECK: 'Something went wrong at assets cards check button!'


        }
    },

    ALLOCATION: {
        TOAST: {
            ALLOCATIONSHEET: 'Something went wrong while downloading the allocation sheet!!!',
            SELECTMONTH: 'Something went wrong while selecting the month!!!',
            SELECTDATE: 'Something went wrong while selecting the date!!!',
            STORELOAD: 'Something went wrong while loading the data in the grid!!!',
            MENUITEMCLICK: 'Something went wrong while selecting menu option!!!',
            MENULOADERR: 'Something went wrong while loading menu option!!!'
        }
    },
    EMPLOYEESETUP: {
        SUCCESS: 'Success',
        FAILED: 'Failed',
        WIN: {
            CANCELCLICK: 'Something went wrong while cancelling the form!!!',
            SAVECLICK: 'Something went wrong while saving the form!!!',
            AFTERTABCHANGE: 'Something went wrong after tab change operation',
            BEFORETABCHANGE: 'Something went wrong before tab change operation'
        },
        DEPARTMENT: {
            TOAST: {
                ADDBUTTON: 'Something went wrong while opening the form window!!!',
                GRIDROW: 'Something went wrong while selecting the grid row!!!',
                CANCELCLICK: 'Something went wrong while clicking on the cancel button!!!',
                SAVECLICK: 'Something went wrong while clicking on the save button!!!'
            }
        },
        ACCOUNT: {
            TOAST: {
                ACCOUNTFORMRESETBTN: 'Something went wrong while reseting the form!!!',
                ACCOUNTFORMSUBMIT: 'Something went wrong while submitting the form!!!',
                ACCOUNTLOGOCLICK: 'Something went wrong while uploading the image!!!',
                ACCFORMSUBMITFAILMSG: 'Something went wrong while updating the form!!!',
                DETAILUPDATE: 'Account details updated successfully!!!',
            }

        },
        ROLE: {
            ADDNEWCLICK: 'Something went wrong while showing form window to add new record!!!',
            GRIDROWCLICK: 'Something went wrong while showing form to update existing data!!!',
            WINDOWOUTSIDECLICK: 'Something went wrong while clicking outside the window!!!',
            CANCELCLICK: 'Something went wrong while cancelling form!!!',
            SAVECLICK: 'Something went wrong while saving form!!!',
        },
        FINANCIALYEAR: {
            WINDOWOUTSIDECLICK: 'Something went wrong while clicking outside the window!!!',
            CANCELCLICK: 'Something went wrong while cancelling form!!!',
            SAVECLICK: 'Something went wrong while saving form!!!',
            ADDNEWCLICK: 'Something went wrong while showing form window to add new record!!!',
            GRIDROWCLICK: 'Something went wrong while showing form to update existing data!!!',
            DELETECLICK: 'Something went wrong while deleteing selected row!!!'
        },
        DESIGNATION: {
            TOAST: {
                ADDBUTTON: 'Something went wrong while opening the form window!!!',
                GRIDROW: 'Something went wrong while selecting the grid row!!!',
                CANCELCLICK: 'Something went wrong while clicking on the cancel button!!!',
                SAVECLICK: 'Something went wrong while clicking on the save button!!!'
            }
        },
        CLIENTS: {
            TOAST:{
                ADDBUTTON: 'Something went wrong while opening the form window!!!',
                CANCELCLICK: 'Something went wrong while clicking on the cancel button!!!',
                SAVECLICK: 'Something went wrong while clicking on the save button!!!',
                GRIDROW: 'Something went wrong while selecting the grid row!!!',
                EDIT:"Something went wrong while Editing",
                DELETE:"Something went wrong while Deleting"
            }
        },
        EMPTAB: {
            EMPLOYEECLICK: 'Something went wrong while accessing employee table!!!',
            UTILIZATIONCLICK: 'Something went wrong while accessing utilization table!!!',
            REPORTCLICK: 'Something went wrong while accessing report table!!!',
            EMPVIEWRENDER: 'Something went wrong while rendering employee view!!!',
            DOWNLOADEXCEL: 'Something went wrong while downloading excel sheet!!!',
            REPORTS: {
                DATERANGECHANGE: 'Something went wrong while selecting the date!!!',
                TRIGGER: 'Something went wrong while clearing the trigger icon!!!',
                DOWNLOAD: 'Something went wrong while downloading the reports sheet!!!',
                APPLYBTN: 'Something went wrong while clicking on the apply button!!!',
                CLEARBTN: 'Something went wrong while clicking on the clear button!!!'
            },
            UTILIZATION: {
                COMBOSELECTITEM: 'Something went wrong while selecting any item!!!',
            },
            EMPLOYEE: {
                NEWEMPLOYEE: 'Something went wrong while processing new employee!!!',
                UPDATEEMPLOYEE: 'Something went wrong while updating existing employee!!!',
                ROWCLICKEMPCODE: 'Something went wrong while updating employee code!!!',
                EMPSEARCHOPERATION: 'Something went wrong while employee search operation!!!',
                CLEARTRIGGER: 'Something went wrong while triggering clear!!!',
                PERSONALDETAILS: {
                    SAVECLICK: 'Something went wrong while clicking on the save button!!!',
                    CANCELCLICK: 'Something went wrong while clicking on cancel button!!!',
                    MARITALSTATUS: 'Something went wrong while selecting the marital status!!!',
                    PERSONALDETAILS: 'Something went wrong while changing personal details!!!',
                    DOBERRMSG: 'Date of Birth should not be after Anniversary Day!!!',
                    ANNIVERSARYMSG: 'Anniversary Date should not be before Date of Birth!',
                    DATERANGE: 'Proper date needs to be selected!!!',
                    DATEVALID: 'Something went wrong while validating the date!!!',
                    EMPPERSONAL: 'Successfully Added Employee Personal Details',
                    PERSONALDETAILSFAIL: 'Failed to Add Employee Personal Details',
                    UPDATEPERSONALDETAILS: 'Successfully Updated Employee Personal Details',
                    UPDATEDETAILSFAILED: 'Failed to Update Employee Personal Details',
                    VALIDATION: 'Something went wrong while doing the validation !!!',
                },
                WORKS: {
                    SAVECLICK: 'Something went wrong while saving works details!!!',
                    CANCELCLICK: 'Something went wrong while cancelling works details form!!!',
                    STATUSCHANGE: 'Something went wrong while changing status!!!',
                    DETAILSCHANGES: 'Something went wrong while changing details of works!!!',
                    REPORTINGCHANGE: 'Something went wrong while changing reporting manager!!!',
                    STATUSRENDER: 'Something went wrong while loading work status!!!',
                    CHANGEWORKDETAILS: 'Something went wrong while changing work details',
                    KEYDATEOPERATION: 'Something went wrong while accessing date via keyboards!!!',
                    REPORTINGSELECT: 'Something went wrong while selecting reporting manager!!!',
                    SAMEEMP: "You can't report to same employee!!!",
                    WARNING: 'Warning',
                    FAIL: 'Failed',
                    SUCCESS: 'Success',
                    UPDATESUCCESS: 'Successfully Updated Employee Work details',
                    SEPERATEDDATE: 'Please select Separated Date',
                    UPDATESERVICES: 'Something went wrong while executing update operation!!!',
                    UPDATEREPORTING: 'Something went wrong while updating reporting manager operation!!!',
                    ADDWORKERR: 'Something went wrong while add work details!!!',
                    // INVALID: 'InValid form, Please fill all the required fields!!!'
                },
                ACCESSDETAILS: {
                    SAVECLICK: 'Something went wrong while clicking on the save button!!!',
                    CANCELCLICK: 'Something went wrong while clicking on cancel button!!!',
                    BEFORESELECT: 'Something went wrong while removing tag!!!',
                    SELECTCOMBO: 'Something went wrong in the combobox selecting and closing!!!',
                    DATEVALID: 'Something went wrong while validating the date!!!'
                },
                EMPLOYEEFORM: {
                    SAVEBTNUNABLE: 'Something went wrong while editing the form field!!!',
                    FORMSAVE: 'Something went wrong while updating the store!!!',
                    ERRORMSG: 'Something went wrong while Updating the Employee Details!!!'
                },
                ADDRESS: {
                    SAVEBTNUNABLE: 'Something went wrong while editing the form field!!!',
                    SELECTCHECKBOX: 'Something went wrong while changing the checkbox !!!',
                    FAILTOADD: 'Failed to Add Employee Address!!!',
                    SUCCESSMSG: 'Successfully Added Employee Address!!!',
                    FAILMSGUPDATE: 'Failed to update Employee Address!!!',
                    SUCCESSMSGUPDATE: 'Successfully updated Employee Address!!!',
                    ERRORMSG: 'Something went wrong while Updating the Employee Details!!!',
                }
            }
        }
    },
    RESOURCEREQUEST: {
        TOAST: {
            ADDPROJECTCLICK: 'Failed to send updated records for approval !',
            UPDATEAJAX: 'Failed to send ajax request to update records !',
            DATERANGE: 'Failed to set valid date  !',
            KEYDOWNDATE: 'Failed to check valid date !',
            SELECTPROJECT: 'Failed to filter past resources !',
            SAVEBUTTON: 'Failed to save the details entered !',
            UPDATEBUTTON: 'Failed to update the record !',
            RESETBUTTON: 'Failed to reset the window !',
            BUTTONRESOURCE: 'Failed to add new resource !',
            CLOSEBUTTON: 'Failed to close the Resource Request Window !',
            EMPLOYEECOMBO: 'Failed to search the combobox !',
            NEWALLOCATION: 'Failure to show new allocation grid !',
            UPDATEALLOCATION: 'Failure to show update allocation grid !',
            CLICKCLOSEBUTTON: 'Failed to mask mainview port !'
        }
    },
    EXECUTIVEDASHBOARD: {
        RESOURCEAPPROVAL: {
            TOAST: {
                PENDINGNOMINATIONFAIL: 'Something went wrong while clearing the Pending Nominations!!!',
                REJECT: 'Something went wrong while Rejecting the Resource Approval!!!',
                ACCEPT: 'Something went wrong while Accepting the Resource Approval!!!',
            }
        },
        KARMAAPPROVAL: {
            FAILMSG: 'Unable to approve the Karma',
            TOAST: {
                ACCEPT: 'Something went wrong while Accepting the Karma Approval!!!',
                REJECT: 'Something went wrong while Rejecting the Karma Approval!!!',
                PENDINGNOMINATIONFAIL: 'Something went wrong while clearing the Pending Nominations!!!',
            }
        },
        TECHNOLOGIES: {
            DELETE: 'Something went wrong while Deleting!!!',
            ADDING: 'Something went wrong while Adding!!!',
            TOAST: {
                DELETETECH: 'Something went wrong while Deleting the technologies !!!',
                SUBMITTECH: 'Something went wrong while Adding the technologies !!!',
                SEARCH: 'Something went wrong while searching the technologies !!!',
                ADDTECHNOLOGY: 'Something went wrong while click on addtechnologies !!!'
            }
        },
        PROJECTVIEW: {
            ADDPROJCTWINDOW : {
                 IMAGEUPLOAD : 'Something went wrong while uploading the image!!!',
                 CANCELCLICK : 'Something went while closing the window!!!',
                 SAVECLICK : 'Something went wrong whilke clicking on save button!!!'
            },
            RECORDSELECT : 'Something went wrong while selecting the record!!!',
            STATUSUPDATEFAIL: "<span style = 'color:red'>Failed To Update Project Status</span>",
            STATUSUPDATESUCCESS: "<span style = 'color:green'>Project Status Updated Successfully</span>",
            NOTECLOSE : 'Something went wrong while closing the note window!!!',
            NOTESUBMIT : 'Something went wrong in the submit button!!!',
            FEEDBACK:'Something went wrong in opening the feedback window!!!',
            PROJSEARCH : 'Something went wrong while searching the project!!!',
            STATUSSELECT : 'Something went wrong while selecting the status!!!',
            ADDPROJECT : 'Something went wrong while opening the add project window!!!',
            PEOPLEPAGE : 'Something went wrong while Loading the item people view page!!!',
            IMAGELOAD : 'Something went wrong while Changing the project image !!!',
            STATUS : 'Something went wrong while Changing the Status !!!',
            PROJECTNAME : 'Something went wrong while Selecting the project name !!!',
            SEARCHPROJECT : 'Something went wrong while Searching the project name !!!',
            PROJECTPAGE : 'Something went wrong while again going to the project page !!!',
            NOTES : {
              OPENWINDOW : 'Something went wrong while opening the window!!!',
              CREATEWINDOW : 'Something went wrong while creating the window!!!',
              STATUSCLICK : 'Something went wrong while selecting the status!!!',
              NOTETYPE : 'Something went wrong while fetching the records!!!',
              EMPLOYEESELECT : 'Something went wrong while selecting the employee!!!',
              TRIGGERCLICK : 'Something went wrong while clicking on the trigger item!!!',
              DATEFILTER :'Something went wrong while clearing the filter of the dates!!!',
              WINDOWCLOSE : 'Something went wrong while closing the window!!!',
              XCLICK : 'Something went wrong while closing the window!!!',
              SUBMITCLICK : 'Something went wrong submitting the form!!!',
              EDITCLICK : 'Something went wrong while making the edit button visible!!!',
              DELETECLICK : 'Something went wrong while deleting the record!!!',
              CLEARFILTER : 'Something went wrong while clearing the filter of status and note!!!',
              SUBMITVISIBLE : 'Something went wrong while making the submit button visible!!!',
              COMBOCLOSE : 'Something went wrong while closing the combobox!!!'
            },
            PEOPLEPAGE: 'Something went wrong while Loading the item people view page!!!',
            IMAGELOAD: 'Something went wrong while Changing the project image !!!',
            STATUS: 'Something went wrong while Changing the Status !!!',
            PROJECTNAME: 'Something went wrong while Selecting the project name !!!',
            SEARCHPROJECT: 'Something went wrong while Searching the project name !!!',
            PROJECTPAGE: 'Something went wrong while again going to the project page !!!',
        },
        MOM: {
            ITEMCLICK: 'Something went wrong while selecting the item!!!',
            WINDOWVIEW: 'Something went wrong on opening the window!!!',
            CREATEWINDOW: 'Something went wrong while creating the window!!!',
            SEARCHFIELD: 'Something went wrong while searching in the text field!!!',
            WINDOWOUTSIDETAP: 'Something went wrong while closing the window!!!',
            MOMPUBLISH: 'Something went wrong while clicking on the publish button!!!',
            DRAFTSBUTTON: 'Something went wrong while clicking on the drafts button!!!',
            STARTTIME: 'Something went wrong while selecting the start time!!!',
            ENDTIME: 'Something went wrong while selecting the end time!!!',
            ADDTASK: 'Something went wrong while adding task!!!'
        },
        PEOPLE: {
            SEARCHBTN: 'Something went wrong while searching the people!!!',
            PEOPLELOAD: 'Something went wrong while loading the people!!!',
            CLICKONPEOPLE: 'Something went wrong while clicking on people item!!!',
            PEOPLEDELETE: 'Something went wrong while deleting the people!!!',
            ADDPPLBTN: 'Something went wrong while clicking on AddPeople button!!!',
            CHECHBOX: 'Something went wrong while clicking on checkbox button!!!',
            DELETE: 'Are you sure, Do you want to delete?',
            DELETEFAIL: "Employee Delete Failure",
            CANCEL: 'Something went wrong while clicking on cancel button!!!',
            SAVE: 'Something went wrong while clicking on save button!!!',
            DATE: 'Something went wrong while selecting the date!!!',
            ROLE: 'Something went wrong while selecting the role!!!',
            SAVERESOURCE: 'Something went wrong while clicking on save butten!!!',
        }
    },
    MOM: {
        ITEMCLICK: 'Something went wrong while selecting the item!!!',
        WINDOWVIEW: 'Something went wrong on opening the window!!!',
        CREATEWINDOW: 'Something went wrong while creating the window!!!',
        SEARCHFIELD: 'Something went wrong while searching in the text field!!!',
        WINDOWOUTSIDETAP: 'Something went wrong while closing the window!!!',
        MOMPUBLISH: 'Something went wrong while clicking on the publish button!!!',
        DRAFTSBUTTON: 'Something went wrong while clicking on the drafts button!!!',
        STARTTIME: 'Something went wrong while selecting the start time!!!',
        ENDTIME: 'Something went wrong while selecting the end time!!!',
        ADDTASK: 'Something went wrong while adding task!!!'

    },
    FEEDSPOSTCONTENT: {
        TOAST: {
            POSTCONTENT: 'Something Went Wrong While Fetching the Posted Content',
            UPDATEPOSTCONTENTLENGTH: 'Something Went Wrong While Upadating the Post Content Length'
        }
    },
    HELP: {
        RENDERERR: 'Something Went Wrong While loading help page!!!'
    },
    REDEEM: {
        GRIDCLICK: 'Something Went Wrong While loading pop-up for updating order details!!!',
        WINOUTSIDECLICK: 'Something Went Wrong While closing the window!!!',
        FORMCANCEL: 'Something Went Wrong While Cancelling Order Details!!!',
        COMPLETEORDER: 'Something Went Wrong While Completing order!!!'
    },

    ALLOCATION: {
        TOAST: {
            ALLOCATIONSHEET: 'Something went wrong while downloading the allocation sheet!!!',
            SELECTMONTH: 'Something went wrong while selecting the month!!!',
            SELECTDATE: 'Something went wrong while selecting the date!!!',
            STORELOAD: 'Something went wrong while loading the data in the grid!!!',
            MENUITEMCLICK: 'Something went wrong while selecting menu option!!!',
            MENULOADERR: 'Something went wrong while loading menu option!!!'
        }
    },

    INITIATEEXIT: {
        TOAST: {
            SEARCH: 'Something went wrong while searching combobox',
            AJAX: 'Something went wrong while making ajax call',
            AMAZON: 'Something went wrong while uploading to Amazon S3 Bucket',
            DOCUMENT: "<span style='color:green'>Document Uploaded Successfully</span>",
            SUBMITEXIT: 'Something went wrong while processing employee exit operation!!!'
        }
    },
    EMPLOYEEDASHBOARD: {
        GROUPS: {
           EXISTGROUP: 'This group name is already existed!!!' ,
           DELETE: "Are you sure you want to delete this group?",
           NOTDELETE: "Group Cann't be deleted as it is Tagged with Post!!",
           DELETESUCCESS : 'Successfully deleted!', 
           ADDPROJECT: 'Something went wrong while adding the project!!!', 
           ITEMSELECT: 'Something went wrong while selecting the item in group combo!!!',
           STORELOAD: 'Something went wrong while loading the store!!!', 
           GROUPNAME: 'Something went wrong while writing the group anme!!!', 
           DELETERECORD: 'Something went wrong while deleting the people from group!!!',
           ADDPEOPLE: 'Something went wrong while adding the people in group!!!',
           GROUPDELETE: 'Something went wrong while deleting the group!!!',
           SHOWPEOPLE: 'Something went wrong while showing the selecte people!!!',
           CHECKBOXSELECT: 'Something went wrong while selecting  All people!!!',
           SEARCHFLDNULL: 'Something went wrong while search field is null!!!',
           SEARCHBTN: 'Something went wrong while searching the people!!!',
           ADDTOGRP: 'Something went wrong while selecting the people!!!',
           ADDTOGRPBTN: 'Something went wrong while clicking on add to group btn!!!',

        },
        KARMASCORE: {
            STARTDATE: "Start date should be less than or equal to End date",
            STARTMONTH:"Start month should be less than or equal to End month",
            STARTYEAR: "Start year should be less than or equal to End year",
            ENDDATE:   "End date should be greater than or equal to Start date",
            ENDMONTH:   "End month should be greater than or equal to start month",
            ENDYEAR: "End year should be greater than or equal to start year",
            SEARCH: "Something went wrong while searching !!!",
            KARMASCOREITEM: "Something went wrong while clicking on karma score items !!!",
            KARMASCORE: "Something went wrong while loading the karma score!!!",
            ITEMSELECT: "Somrthing went wrong while selecting the item!!!",
            TRIGGERITM: "Somrthing went wrong while trigger item is clicked!!!",
            RANGECHANGE: "Somrthing went wrong while changing the range!!!",
            SEARCHTGGR: "Somrthing went wrong while searching!!!",
            LARMALOAD:  "Somrthing went wrong while loading the karma score!!!",
            GROUPITEM: "Something went wrong while selecting the group item!!!",
            PROFILE: "Something went wrong while opening the profile!!!",
            DESIGNATION: "Something went wrong while rendering the designation view!!!",
            SUPERVISOR: "Something went wrong while rendering the supervisor view!!!",
            SUPERVISORHEADER: "Something went wrong while clicking on the supervisor header!!!",
            DATERANGE: "Something went wrong while the ddate range!!!",
            DOWNLOAD: "Something went wrong while downloading the file!!!",
        },
        KARMASETUP: {
            WALLET : {
                NEWWALLET: 'Something went wrong while showing add new wallet form!!!',
                EDITWALLET: 'Something went wrong while showing edit wallet form!!!',
                UPDATEWALLETREC: 'Something went wrong while updating wallet record!!!',
                WINOUTSIDECLICK: 'Something went wrong while closing window!!!',
                FORMCANCEL: 'Something went wrong while cancelling form progress!!!',
                EDITWALLET: 'Something went wrong while showing edit wallet form!!!'
            },
            KARMARULE : {
                ADDCLICK : 'Something went wrong while opening the window!!!',
                GRIDROWCLICK : 'Something went wrong while opening the window!!!',
                OUTSIDETAP : 'Something went wrong while closing the window!!!',
                CANCELCLICK : 'Something went wrong while clicking on the cancel button!!!',
                SAVECLICK : 'Something went wrong while clicking on save button!!!',
                NAMECHANGE : 'Something went wrong in field validations!!!'
            },
            KARMAACCESS : {
                ADDCLICK : 'Something went wrong while opening the window!!!',
                GRIDROWCLICK : 'Something went wrong while opening the window!!!',
                KARMASEARCH : 'Something went wrong while searching the records!!!',
                CLOSEICON : 'Something went wrong while clicking on close icon!!!',
                SAVECLICK : 'Something went wropng while clicking on save button!!!',
                OUTSIDETAP : 'Something went wrong while closing the window!!!',
                CANCELCLICK : 'Something went wrong while clicking on the cancel button!!!',
                ACCESSDETAILS : 'Something went wrong while selecting the record!!!',
                KARMASELECT : 'Something went wrong while selecting the karma value!!!',
                DELRECORD : 'Something went wrong while deleting the record!!!'
            },
            KARMARATING: {
                ITEMCLICK: 'Something went wrong while clicking on rating icon!!!',
                ICONNAME : 'Something went wrong while mentioning icon name!!!',
                IMGUPLOAD: 'Something went wrong while uploading images!!!',
                ICONSAVEClICK: 'Something went wrong while saving rating icon!!!',
                IMAGESUCCESS: 'Images uploaded successfully',
                IMAGEFAIL: 'Images not uploaded successfully'
            }
        },
    },
    KARMADASHBOARD : {
        GRIDRENDER: 'Something went wrong while loading karma score details!!!'
    },
    KARMAREPORT:{
        TOAST:{
            CLEARTRIGGER:'Something went wrong while triggering clear!!!',
            DOWNLOAD:'Something went wrong while downloading the karma report!!!',
            DATESELECTIONCONFIRMATION: 'Something went wrong while confirming date selection!!!',
            DATESELECTPROCESS:'Something went wrong while selecting date!!!',
            DATESELECTCANCEL:'Something went wrong while canceling data selection!!!',
            FORMVALIDATION:'Something went wrong at form validation'
        }
        

    },
  EMPLOYEEREPORT: {
    TOAST: {
        SEARCH: 'Something went wrong while searching grid data', 
        FILTER: 'Something went wrong while clearing the filters',
        WINFILTER: 'Something went wrong whileapllying the filters',
        APPLYBTN: 'Something went wrong while unabling or disabling the apply button'
    }
  },
    HOME: {
        TRIGGERSEARCH: 'Something went wrong while searching karma scores!!!',
        ITEMCLICK: 'Something went wrong while clicking on karma score card!!!',
        COMBORENDER: 'Something went wrong while rendering combobox component!!!',
        COMBOSELECTION : 'Something went wrong while selecting option!!!',
        KARMAITEMCLICK: 'Something went wrong while selecting Items!!!',
        DETAILCLICK: 'Something went wrong while clicking on details!!!',
        TODODETAILSCLICK: 'Something went wrong while accessing todo details!!!',
        TASKEDIT: 'Something went wrong while Modifing task data!!!',
        TASKDELETE: 'Something went wrong while deleting task!!!',
        TASKNAMEKEYPRESS: 'Something went wrong while modifing name!!!',
        TASKSTATUS: 'Something went wrong while displaying task details!!!',
        TODOENDDATE: 'Something went wrong while calculation for end date!!!',
        ADDTASKDATE: 'Something went wrong while add operation on task!!!',
        DATEPICKERRENDER: 'Something went wrong while rendering date picker!!!',
        VALIDATEEDIT: 'Something went wrong while validating task modified details!!!',
        BEFOREEDITNAME: 'Something went wrong while task details',
        CANCELOPERATION: 'Something went wrong while cancelling operation!!!',
        CELLDATEPICKER: 'Something went wrong while accessing date picker!!!',
        TASKTOOLTIP: 'Something went wrong while showing tooltip!!!',
        NONDELETE: 'Task can not be deleted',
        PENDING: '<span class="ddo-todo-outdated-taskname">Pending</span>',
        GREAT: '<span class="ddo-todo-completed-task">Great!</span>',
        SEARCHTASK: 'Something went wrong while searching tasks details!!!',
        TASKTOGGLE: 'Something went wrong while switching task based on status!!!',
        UNDOTASK: 'Something went wrong while reversing recent changes!!!',
        FEEDOUTSIDE: 'Something went wrong while focus leaves from window!!!',
        HITEM: 'Something went wrong while for accessing feed functionality!!!',
        FILTEROPERATION: 'Something went wrong while performing filter operation!!!',
        ADDFILTERCHANGE: 'Something went wrong while changing filter details!!!',
        FILTERCANCELCLICK: 'Something went wrong while canceling filter operation!!!',
        FILTERBTNCLICK: 'Something went wrong while processing filter operation!!!',
        ADDFILTER: 'Something went wrong while adding filter details!!!',
        NEWFEEDNOTIFICATION: 'Something went wrong while new feed notification retrival!!!',
        NEWCOMMENTNOTIFICATION: 'Something went wrong while new comment notification!!!',
        LOADFEEDSCROLLDATA: 'Something went wrong while scroll feed data!!!',
        POSTBTNCLICK: 'Something went wrong while posting!!!',
        SHARETYPESELECT: 'Something went wrong while selecting share type!!!',
        POSTTEXTENTER: 'Something went wrong while while writing post!!!',
        IMGUPLOADRENDER: 'Something went wrong while checking image upload!!!',
        IMGUPLOADCLICK: 'Something went wrong while performing image upload!!!',
        SENDCOMMENTCLICK: 'Something went wrong while  sending commnets!!!',
    },
    PROFILE: {
        RESIGNOK: 'Something went wrong while sending resignation!!!',
        NOMINATECLOSE: 'Something went wrong while closing nominate other window!!!',
        WINOUTSIDE: 'Something went wrong while focus leaves the window!!!',
        KEYDATEOPERATION: 'Something went wrong while date field changes via key!!!',
        DATERANGECHANGE: 'Something went wrong while changing date ranges!!!',
        MARTIALSTATUS: 'Something went wrong while martial status!!!',
        UPDATEPERSONALDETAILS: 'Something went wrong while updating personal details!!!',
        FORMCANCEL: 'Something went wrong while cancelling update employee details!!!',
        PERSONALDETAILSCHANGE: 'Something went wrong while changing personal details!!!'
    }
});
