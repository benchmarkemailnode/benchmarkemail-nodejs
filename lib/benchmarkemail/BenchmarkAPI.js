var http = require('http'),
    fs = require('fs'),
    request = require('request');
    querystring =require('querystring');
    qs = require('qs');
    
/*** Benchmark Email API wrapper for the API version 1.0.  ***/
 
function BenchmarkAPI (apiKey) {

	if (!apiKey)
		throw new Error('Please provide your API key');
	
	
	var packageContents ='';
	
	/* Get the contents from package.json file */
	packageContents = fs.readFileSync(__dirname+'/../../package.json');
	
	this.version     = '1.0';
	this.apiKey      = apiKey;
	this.packageInfo = packageContents;
	this.httpUri     = 'http://www.benchmarkemail.com/api/'+this.version; 
}

module.exports = BenchmarkAPI;

BenchmarkAPI.prototype = {

	callFunction:function(methodname, methodparams, params, callback){
			
		var uriparams = {};
		uriparams['token'] = this.apiKey;
		
		for (var i = 0; i < methodparams.length; i++)
		{
			uriparams[methodparams[i]] = params[methodparams[i]] ? params[methodparams[i]]: '';
		}

		request.post({
			uri : this.httpUri+'/?output=json&method='+methodname,
			headers : { 'Content-Type' : 'application/x-www-form-urlencoded' },
			body : qs.stringify(uriparams)
		}, function (error, response, body) {
			var Response;
			var errorObj ;
			
			try {
				Response = JSON.parse(body); 
			} catch (error) {
				errorObj = new Error('Error parsing Response from Benchmark Email API.');
				callback(errorObj, null);
				return;
			}

			if (Response.error) {
				errorObj = new Error('Error: \''+Response.error+'\' (Code: '+Response.code+')');
				callback(errorObj, null);
				return;
			}

			callback(null, Response);	    
		});
	},
	
	/***** Campaign Related Methods *****/
	
	/**
	 ** Duplicate an existing Email and return the ID of the newly created Email. 
	 ** The new email will have the same subject, content, target list as the one being copied. 
	 ** The newly created email will be saved with the status 'Incomplete'.
 	 **/
	emailCopy:function(params, callback){
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailCopy', [ 'emailID' ], params, callback);
	},
	
	/**
	 ** Create a new Email based on the details provided. 
	 ** Returns the ID of the newly created Email.
 	 **/
	emailCreate:function(params, callback){
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailCreate', [ 'emailDetails' ], params, callback);
	},
	
	/**
	 ** Create a new Rss Email based on the details provided. 
	 ** Return the ID of the newly created Rss Email.
	 **/
	emailRssCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailRssCreate', ['emailDetails',], params, callback);
	},

	/**
	 ** Delete the Email for given ID. 
	 ** Returns true if the email was deleted.
 	 **/
	emailDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailDelete', [ 'emailID' ], params, callback);
	},
	
	/**
	 ** Get the list of emails using the filter and paging limits, 
	 ** order by the name or date of the email.
 	 **/
	emailGet:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailGet', [ 'filter', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder' ], 
		params, callback);
	},
	
	/**
	 ** Get all the details for given Email ID.
	 **/	
	emailGetDetail:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailGetDetail', [ 'emailID' ], params, callback);
	},
	
	/**
	 ** Get the list of Rss emails using the filter and paging limits, 
	 ** order by the name or date of the email.
 	 **/ 
	emailRssGet:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailRssGet', [ 'filter', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder' ], 
		params, callback);
	},
	
	/**
	 ** Get all the details for given Email ID.
	 **/
	emailRssGetDetail:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailRssGetDetail', [ 'emailID' ], params, callback);
	},
	
	/**
	 ** Get the list of contact lists being used in an email.
	 **/
	emailGetList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailGetList', [ 'emailID' ], params, callback);
	},
	
	/**
	 ** Schedule an email for delivery for the given date time.
	 **/
	emailSchedule:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailSchedule ', [ 'emailID', 'scheduleDate', ], params, callback);
	},
	
	/**
	 ** Schedule an Rss email for delivery for the given date time and interval.
	 **/
	emailRssSchedule:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailRssSchedule ', [ 'emailID', 'scheduleDate', 'interval' ], params, callback);
	},
	
	/**
	 ** Schedule an email for immediate delivery.
	 **/
	emailSendNow:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailSendNow  ', [ 'emailID' ], params, callback);
	},
	
	/**
	 ** Send a test email for the given Email ID
	 **/
	emailSendTest:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailSendTest  ', [ 'emailID', 'testEmail' ], params, callback);
	},
	
	/**
	 ** Set an email as draft. 
	 ** This would clear its delivery schedule.
	 **/
	emailUnSchedule:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailUnSchedule  ', [ 'emailID' ], params, callback);
	},
	
	/**
	 ** Update an existing email with the given details.
	 **/
	emailUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailUpdate', [ 'emailDetails' ], params, callback);
	},
	
	/**
	 ** Update an existing email with the given details.
	 **/
	emailRssUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailRssUpdate', [ 'emailDetails' ], params, callback);
	},
	
	/**
	 ** Assign the given contact/segments to the email.
	 **/
	 emailAssignList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailAssignList', [ 'emailID', 'contacts' ], params, callback);
	},
	
	/**
	 ** Reassign the given contact/segments to the email.
	 **/
	emailReassignList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailReassignList ', [ 'emailID', 'contacts' ], params, callback);
	},
	
	/**
	 ** Resend an email campaign to contacts 
	 ** that were added since the campaign was last sent .
	 **/
	 emailResend:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailResend ', [ 'emailID', 'scheduleDate' ], params, callback);
	},
	
	/**
	 ** Quick send the email campaign to a list of contacts .
	 **/
	emailQuickSend:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailQuickSend', [ 'emailID', 'ListName', 'emails', 'scheduleDate' ], params, callback);
	},
	
	/**
	 ** Gets all the available email Template Categories.
	 **/
	emailCategoryGetList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('emailCategoryGetList', [], params, callback);
	},
	
	/**
	 ** Create an Autoresponder campaign .
	 **/
	autoresponderCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('autoresponderCreate', [ 'Autoresponder' ], params, callback);
	},
	
	/**
	 ** Update an Autoresponder campaign .
	 **/
	autoresponderUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('autoresponderUpdate', [ 'status', 'Autoresponder' ], params, callback);
	},
	
	/**
	 ** Delete an Autoresponder campaign .
	 **/
	autoresponderDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('autoresponderDelete', [ 'autoresponderID' ], params, callback);
	},
	
	/**
	 ** Delete an Autoresponder email.
	 **/
	autoresponderDetailDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('autoresponderDetailDelete', [ 'AutoresponderID', 'autoresponderDetailID' ], params, callback);
	},
	
	/**
	 ** Get the list of Autoresponders using the filter and paging limits, 
	 ** order by the name or date of the autoresponder.
	 */
	autoresponderGetList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('autoresponderGetList', [ 'pageNumber', 'pageSize', 'orderBy', 'filter', 'sortOrder' ], 
		params, callback);
	},
	
	/**
	 ** Get details of the Autoresponder email .
	 **/
	 autoresponderGetEmailDetail:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('autoresponderGetEmailDetail', [ 'autoresponderID',  'autoresponderDetailID' ], 
		params, callback);
	},
	
	/**
	 ** Get details of the Autoresponder.
	 **/
	 autoresponderGetDetail:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('autoresponderGetDetail', [ 'autoresponderID' ], params, callback);
	},
	
	/**
	 ** Create Autoresponder email template
	 ** and Returns the ID of the newly created Autoresponder email template.
	 **/
	autoresponderDetailCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('autoresponderDetailCreate', [ 'AutoresponderDetail' ], params, callback);
	},
	
	
	/***** Contact List Related Methods *****/

	/**
	 ** Add the contact details to the given contact list. 
	 ** Multiple contacts would be added if the details has more than one items.
	 **/
	listAddContacts:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listAddContacts', [ 'listID', 'contacts' ], params, callback);
	},
	
	/**
	 ** Add the contact details to the given contact list 
	 ** and returns contacts ID's in CSV format. 
	 **/
	listAddContactsRetID:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listAddContactsRetID', [ 'listID', 'contacts' ], params, callback);
	},
	
	/**
	 ** Add the contact details to the given contact list after confirmation. 
	 ** Multiple contacts would be added if the details has more than one items.
	 **/
	 listAddContactsOptin:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listAddContactsOptin', [ 'listID', 'contacts', 'optin' ], params, callback);
	},
	
	/**
	 ** Create a new contact list with the given name.
	 ** Returns the ID of the newly created list.
	 **/
	 listCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listCreate', [ 'listName' ], params, callback);
	},
	
	/**
	 ** Delete an existing contact list.
	 **/
	listDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listDelete', [ 'listID' ], params, callback);
	},
	
	/**
	 ** Get the contact list Details for the given email ID.
	 **/
	listSearchContacts:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listSearchContacts', [ 'emailID' ], params, callback);
	},
	
	/**
	 ** Get the list of contact lists using the filter and paging limits, 
	 ** ordered by the name or date of the contact list.
	 **/
	listGet:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listGet', [ 
			'filter', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder' 
		], params, callback);
	},
	
	/**
	 ** Get the contact details from the contact list for the given email address.
	 **/
	listGetContactDetails:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listGetContactDetails', [ 'listID', 'email' ], params, callback);
	},
	
	/**
	 ** Get the list of contacts in the given list using the filter and paging limits,
	 ** ordered by the email or date of the contact.
	 **/
	listGetContacts:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listGetContacts', [ 
			'listID', 'filter', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder' 
		], params, callback);
	},
	
	/**
	 ** Get the list of contacts in the given list using the filter and paging limits, 
	 ** ordered by the email or date of the contact.
	 **/
	listGetContactsAllFields:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listGetContactsAllFields', [ 
			'listID', 'filter', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder' 
		], params, callback);
	},
	
	/**
	 ** Get the list of contacts in the given list of specific type 
	 ** may be(Optin or NotOptedIn or ConfirmedBounces or Active or Unsubscribe) 
	 ** using the filter and paging limits, ordered by the email or date of the contact.
	 **/
	listGetContactsByType:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listGetContactsByType', [ 
			'listID', 'filter', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder', 'Type' 
		], params, callback);
	},
	
	/**
	 ** Update the given contact in the list based on the details provided.
	 **/
	 listUpdateContactDetails:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listUpdateContactDetails', [ 'listID', 'contactID', 'contactDetail' ], params, callback);
	},
	
	/**
	 ** Unsubscribe the contacts from the given contact list 
	 **/
	 listUnsubscribeContacts:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listUnsubscribeContacts', [  'listID', 'contacts' ], params, callback);
	},
	
	/**
	 ** Delete contacts from the given contact list.
	 **/
	listDeleteContacts:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listDeleteContacts', [ 'listID', 'contactids' ], params, callback);
	},
	
	/**
	 ** Delete a contact which matches the email from the given contact list.
	 **/
	 listDeleteEmailContact:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listDeleteEmailContact', [ 'listID', 'email' ], params, callback);
	},
	
	/**
	 ** Add the contact details using the given signup form.
	 **/
	listAddContactsForm:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listAddContactsForm', [ 'signupFormID', 'contacts' ], params, callback);
	},
	
	/**
	 ** Create a new segment based on the given details
	 **/
	segmentCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('segmentCreate', [ 'segmentDetail' ], params, callback);
	},
	
	/**
	 ** Delete a segment based on the given ID
	 **/
	segmentDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('segmentDelete', [ 'segmentID' ], params, callback);
	},
	
	/**
	 ** Get the list of segments using the paging limits, 
	 ** ordered by the name or date of the segment.
	 **/
	segmentGet:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('segmentGet', [ 'filter', 'pageNumber', 'pageSize', 'orderBy' ], params, callback);
	},
	
	/**
	 ** Get all the details for given segment ID.
	 **/
	segmentGetDetail:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('segmentGetDetail', [ 'segmentID' ], params, callback);
	},
	
	/**
	 ** Get the list of segment criteria
	 **/
	segmentGetCriteriaList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('segmentGetCriteriaList', [ 'segmentID' ], params, callback);
	},
	
	/**
	 ** Create a segment criteria
	 **/
	segmentCreateCriteria:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('segmentCreateCriteria', [ 'segmentID', 'segmentCriteria' ], params, callback);
	},
	
	/**
	 ** Get the contacts for a segment
	 **/
	segmentGetContacts:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('segmentGetContacts', [
		    'segmentID', 'filter', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder',
		],  params, callback);
	},
	
	/**
	 ** Get the count of segments 
	 **/
	segmentGetCount:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('segmentGetCount', [ 'filter' ], params, callback);
	},
	
	
	/***** Reports Related Methods *****/
	
	/**
	 ** Get the list of sent campaign using the filter and paging limits,
	 ** ordered by the name or date of the campaign.
	 **/
	reportGet:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGet', [ 
			'filter', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder' 
		], params, callback);
	},
	
	/**
	 ** Get the email addresses which bounced in a given campaign,using the paging limits, 
	 ** ordered by the email or date of the bounced record.
	 **/
	reportGetBounces:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetBounces', [ 
			'emailID', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder' 
		], params, callback);
	},
	
	/**
	 ** Get the click URL stats for the given campaign.
	 **/
	reportGetClicks:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetClicks', [ 'emailID' ], params, callback);
	},
	
	/**
	 ** Get the email address which have clicked on URLs for the given campaign.
	 **/
	reportGetClickEmails:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetClickEmails', [ 
			'emailID', 'ClickURL', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder' 
		], params, callback);
	},
	
	/**
	 ** Get the email addresses to which the given campaign was forwarded,using the paging limits, 
	 ** ordered by the email or date of the forwarded record.
	 **/
	reportGetForwards:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetForwards', [
		    'emailID', 'ClickURL', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder'	    
		], params, callback);
	},
	
	/**
	 ** Get the email addresses which hard bounced in a given campaign,using the paging limits, 
	 ** ordered by the email or date of the bounced record.
	 **/
	reportGetHardBounces:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetHardBounces', [
		    'emailID', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder'	    
		], params, callback);
	},
	
	/**
	 ** Get the email addresses which soft bounced in a given campaign,using the paging limits, 
	 ** ordered by the email or date of the bounced record.
	 **/
	reportGetSoftBounces:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetSoftBounces', [
		    'emailID', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder'	    
		], params, callback);
	},
	
	/**
	 ** Get the email addresses which were opened in a given campaign,using the paging limits, 
	 ** ordered by the email or date of the opened record.
	 **/
	reportGetOpens:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetOpens', [
		    'emailID', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder'	    
		], params, callback);
	},
	
	/**
	 ** Get the email addresses which were unopened in a given campaign,using the paging limits, 
	 ** ordered by the email or date of the opened record.
	 **/
	reportGetUnOpens:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetOpens', [
		    'emailID', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder'	    
		], params, callback);
	},
	
	/**
	 ** Get the email addresses which were unsubscribed in a given campaign,using the paging limits, 
	 ** ordered by the email or date of the opened record.
	 **/
	reportGetUnsubscribes:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetUnsubscribes', [
		    'emailID', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder'	    
		], params, callback);
	},

	/**
	 ** Get the summary statistics for a given campaign. 
	 **/
	 reportGetSummary:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetSummary', [   'emailID' ], params, callback);
	},
	
	/**
	 ** Get the summary statistics for more than one campaign.
	 **/
	 reportCompare:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportCompare', [ 'emailIDs' ], params, callback);
	},
	
	/**
	 ** Get the list of Countries with there region code and opent Count.
	 **/
	 reportGetOpenCountry:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetOpenCountry', [ 'emailID' ], params, callback);
	},
	
	/**
	 ** Retrives Open Count for each region of the country
	 **/
	 reportGetOpenForCountry:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('reportGetOpenForCountry', [ 'emailID', 'CountryCode' ], params, callback);
	},
	
	
	/***** Survey Methods *****/

	/**
	 ** Create a new Survey based on the details provided. 
	 ** Return the ID of the newly created Survey.
	 **/
	surveyCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyCreate', [ 'surveyData' ], params, callback);
	},
	
	/**
	 ** Update an existing Survey based on the details provided. 
	 ** Return the ID Updated Survey.
	 **/
	surveyUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyUpdate', [ 'SurveyID', 'surveyData' ], params, callback);
	},
	
	/**
	 ** Delete an existing Survey based on the details provided. 
	 ** Return the ID of Deleted Survey.
	 **/
	surveyDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyDelete', [ 'SurveyID' ], params, callback);
	},
	
	/**
	 ** Create a new Survey Question based on the details provided. 
	 ** Return the ID of the newly created Survey Question.
	 **/
	surveyQuestionCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyQuestionCreate', [ 'SurveyID', 'surveyQuestionData' ], params, callback);
	},
	
	/**
	 ** Delete an existing Survey Question based on the details provided. 
	 ** Return the ID of the Deleted Survey Question.
	 **/
	 surveyQuestionDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyQuestionDelete', [ 'SurveyID', 'QuestionID' ], params, callback);
	},
	
	/**
	 ** Update an existing Survey Question based on the details provided. 
	 ** Return the ID of the updated Survey Question.
	 **/
	 surveyQuestionUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyQuestionUpdate', [ 'SurveyID', 'surveyQuestionData' ], params, callback);
	},
	
	/**
	 ** Update Survey Color based on the details provided. 
	 ** Return the ID of the updated Survey.
	 **/
	surveyColorUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyColorUpdate', [  'SurveyID', 'surveyColorData' ], params, callback);
	},
	
	/**
	 ** Update Survey Status based on the details provided. 
	 ** Returns 1 if the survey is updated else 0.
	 **/
	surveyStatusUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyStatusUpdate', [ 'SurveyID', 'Status' ], params, callback);
	},
	
	/**
	 ** Get the list of Surveys using the filter and paging limits, 
	 ** order by the name or date of the surveys.
	 **/
	surveyGetList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyGetList', [
		    'filter', 'status', 'pagenumber', 'pagesize', 'orderBy', 'sortOrder'
		], params, callback);
	},
	
	/**
	 ** Get the color of Surveys.
	 **/
	surveyGetColor:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyGetColor', [ 'SurveyID' ], params, callback);
	},
	
	/**
	 ** Generates the report of all the available survey questions
	 **/
	 surveyGetQuestionList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyGetQuestionList', [ 'SurveyID' ], params, callback);
	},
	
	/**
	 ** Get the report of Survey.
	 **/
	surveyReportList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}		
		this.callFunction('surveyReportList', [
		    'filter', 'status', 'pagenumber', 'pagesize', 'orderBy', 'sortOrder'
		], params, callback);
	},
	
	/**
	 ** Get the list of Survey Questions with answers and there responses.
	 **/
	surveyResponseReport:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}		
		this.callFunction('surveyResponseReport', [
		    'filter', 'status', 'pagenumber', 'pagesize', 'orderBy', 'sortOrder'
		], params, callback);
	},
	
	/**
	 ** Provide all available templates for the survey.
	 **/
	 surveyTemplateGetList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyTemplateGetList', [], params, callback);
	},
	
	/**
	 ** Create a new Survey using existing survey. 
	 ** Return the ID of the newly created Survey.
	 **/
	 surveyCopy:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyCopy', [ 'SurveyID', 'NewSurveyName' ], params, callback);
	},
	
	/**
	 ** Create a new Survey using existing survey template. 
	 ** Return the ID of the newly created Survey.
	 **/
	 surveyCopyTemplate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('surveyCopyTemplate', [ 'SurveyID', 'NewSurveyName' ], params, callback);
	},
	
	/***** Poll Methods *****/

	/**
	 ** Create a new Poll based on the details provided. 
	 ** Return the ID of the newly created Poll.
	 **/
	 pollCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('pollCreate', [ 'pollData' ], params, callback);
	},
	
	/**
	 ** Update an existing Poll based on the details provided. 
	 ** Return the ID of the Updated Poll.
	 **/
	pollUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('pollUpdate', [ 'PollID', 'pollData' ], params, callback);
	},
	
	/**
	 ** Delete an existing Poll based on the details provided. 
	 ** Return the ID of the Deleted Poll.
	 **/
	 pollDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('pollDelete', [ 'PollID' ], params, callback);
	},
	
	/**
	 ** Update Poll Status based on the details provided. 
	 ** Return 1 if the poll is updated else 0.
	 **/
	 pollStatusUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('pollStatusUpdate', [ 'PollID', 'Status' ], params, callback);
	},
	
	/**
	 ** Get the list of Polls using the filter and paging limits, 
	 ** order by the name or date of the polls.
	 **/
	pollGetList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('pollGetList', [
		    'filter', 'status', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder'
		], params, callback);
	},
	
	/**
	 ** Create a new Poll using existing poll. 
	 ** Return the ID of the newly created Poll.
	 **/
	pollCopy:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('pollCopy', [ 'PollID', 'NewPollName' ], params, callback);
	},
	
	/**
	 ** Generates the report of all the available poll.
	 **/
	pollReportList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('pollReportList', [
		    'filter', 'status', 'pageNumber', 'pageSize', 'orderBy', 'sortOrder', 'NewPollName'
		], params, callback);
	},
	
	/**
	 ** Get the list of Poll Options with their responses.
	 **/
	pollResponseReport:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('pollResponseReport', [ 'PollID' ], params, callback);
	},
	
	/***** Video Gallery Methods *****/

	/**
	 ** Add the Video.Returns true if the video is embeded else false.
	 **/
	 videoCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('videoCreate', [ 'videoStructure' ], params, callback);
	},
	
	/**
	 ** Delete the Video.
	 ** Returns the ID of the deleted video.
	 **/
	 videoDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('videoDelete', [ 'VideoID' ], params, callback);
	},
	
	/**
	 ** Get the list of Videos using paging limits.
	 **/
	 videoGetList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('videoGetList', [ 'pageNumber', 'pageSize' ], params, callback);
	},
	
	/***** SignUp Form Methods *****/

	/**
	 ** Create a new Signup Form based on the details provided. 
	 ** Return the ID of the newly created SignUpForm.
	 **/
	 signupFormCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('signupFormCreate', [ 'signupForm' ], params, callback);
	},
	
	/**
	 ** Update Colors,background and font of an existing SignUp Form based on the details provided. 
	 ** Return Boolean value true if form updated else false
	 **/
	 signupFormUpdateColor:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('signupFormUpdateColor', [ 'signupFormID', 'signupForm' ], params, callback);
	},
	
	/**
	 ** Update an existing SignUp Form based on the details provided. 
	 ** Return Boolean value true if SignupForm updated.
	 **/
	 signupFormUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('signupFormUpdate', [ 'signupFormID', 'signupForm' ], params, callback);
	},
	
	/**
	 ** Update various custom fields of an existing SignUp Form based on the details provided. 
	 ** Return Boolean value true if form updated else false
	 **/
	 signupFormUpdateMessage:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('signupFormUpdateMessage', [ 'signupFormID', 'signupForm' ], params, callback);
	},
	
	/**
	 ** Retrive an existing SignUp Form based on the details provided. 
	 ** Return SignupFormDataStructure 
	 **/
	signupFormGet:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('signupFormGet', [ 'signupFormID' ], params, callback);
	},
	
	/**
	 ** Retrive an existing SignUp Form based on the details provided. 
	 ** Return SignupFormDataStructure 
	 **/
	 signupFormGetCode:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('signupFormGetCode', [ 'signupFormID', 'Codetype' ], params, callback);
	},
	
	/**
	 ** Delete an existing SignUp Form based on the details provided. 
	 ** Returns boolean true if deleted else false 
	 **/
	signupFormDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('signupFormDelete', [ 'signupFormID' ], params, callback);
	},
	
	/**
	 ** Get the list of signup forms using the paging limits, 
	 ** ordered by the name or date of the signup form.
	 **/
	 listGetSignupForms:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('listGetSignupForms', [
		    'pageNumber', 'pageSize', 'orderBy'
		], params, callback);
	},
	
	/***** Image Gallery Methods *****/

	/**
	 ** Add the Image.Returns true if the image is embeded else false.
	 **/
	 imageAdd:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('imageAdd', [ 'imgdata' ], params, callback);
	},
	
	/**
	 ** Delete an Image from the client's account.
	 ** Returns true if image has been deleted or else throws an exception.
	 **/
	imageDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('imageDelete', [ 'ImageID' ], params, callback);
	},
	
	/**
	 ** Get the list of Images in the client's Image Gallery.
	 **/
	imageGetList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('imageGetList', [ 'pageNumber', 'pageSize' ], params, callback);
	},
	
	/**
	 ** Get details for an image.Returns Image data.
	 **/
	imageGet:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('imageGet', [ 'imageID' ], params, callback);
	},
	
	/**
	 ** Get the count of images in the client's Image Gallery.Returns the count of Images. 
	 **/
	 imageGetCount:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('imageGetCount', [ ], params, callback);
	},
	
	
	/***** User Management Methods *****/

	/**
	 ** Add a token for the user.
	 **/
	tokenAdd:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}		
		this.callFunction('tokenAdd', [ 'username', 'password', 'token' ], params, callback);
	},
	
	/**
	 ** Delete an existing token for the user.
	 **/
	 tokenDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}		
		this.callFunction('tokenDelete', [ 'username', 'password', 'token' ], params, callback);
	},
	
	/**
	 ** Register a new SubAccount for the user
	 **/
	subAccountCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('subAccountCreate', [ 'accountstruct' ], params, callback);
	},
	
	/**
	 ** Update SubAccount details for the user 
	 **/
	 subAccountUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('subAccountUpdate', [ 'accountstruct' ], params, callback);
	},
	
	/**
	 ** Get the list of SubAccounts for the user 
	 **/
	subAccountGetList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('subAccountGetList', [ ], params, callback);
	},
	
	/**
	 ** Update SubAccount status for the user
	 **/
	 subAccountUpdateStatus:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('subAccountUpdateStatus', [ 'ID', 'status' ], params, callback);
	},
	
	/**
	 ** Get the list of emails sent for confirmation by the user 
	 **/
	 confirmEmailList:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('confirmEmailList', [ ], params, callback);
	},
	
	/**
	 ** Adding emails for confirmation for the user  
	 **/
	confirmEmailAdd:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		}
		this.callFunction('confirmEmailAdd', [ 'targetEmailID' ], params, callback);
	},
	
	/***** Webhook Realted Methods *****/

	/**
	 ** Create a new Webhook based on the details provided. 
	 ** Return the ID of the newly created Webhook.
	 **/
	 webhookCreate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		} 
		this.callFunction('webhookCreate', [ 'webhookDetails' ], params, callback);
	},
	
	/**
	 ** Delete the Webhook for given ID. 
	 ** Returns true if the webhook was deleted.
	 **/
	 webhookDelete:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		} 
		this.callFunction('webhookDelete', [ 'webhookID' ], params, callback);
	},
	
	/**
	 ** Get the list of webhook using the listID of the contact list.
	 **/
	 webhookGet:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		} 
		this.callFunction('webhookGet', [ 'listID' ], params, callback);
	},
	
	/**
	 ** Update an existing webhook with the given details.
	 **/
	 webhookUpdate:function (params, callback) {
		if(typeof(params) == "function"){
			params = {};
			callback = params;
		} 
		this.callFunction('webhookUpdate', [ 'webhookDetails' ], params, callback);
	}

}
