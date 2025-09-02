/**
 * Module Description
 * 
 *				Script Name			: 		TSS_client_bulk_approval_Screen
				Script Type			: 		Client	
				Developer Name		: 		Kavya Sri
				Description			: 		1. This script will be called by TSS_Suitelet_Bulk_App_Screen suitelet script.
											2. filters function will be called when user clicks on Filter button in the Bulk Approval Screen.
											
 *
 */
/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord','N/url','N/format'],   
    function(currentRecord, url, format) {
    
        function filters() {
        try{
            var currentrecord = currentRecord.get();
            var loc = currentrecord.getValue({
                fieldId: 'custpage_location'
            });
            
            var fromdate = currentrecord.getText({
                fieldId: 'custpage_fromdate'
            });
            var todate = currentrecord.getText({
                fieldId: 'custpage_todate'
            });
             if(loc == null || loc == undefined || loc == ''){
                alert("Warehouse should not be null!");
                return false;
            }else if((fromdate == null || fromdate == undefined || fromdate == '') && (todate == null || todate == undefined || todate == '')){
                alert("From date and To date should not be null!");
                return false;

            }else if(fromdate == null || fromdate == undefined || fromdate == ''){
                alert("From date should not be null!");
                return false;
            }else if(todate == null || todate == undefined || todate == ''){
                alert("To date should not be null!");
                return false;
            }else if((fromdate != null && fromdate != undefined && fromdate != '') && (todate != null && todate != undefined && todate != ''))
            {
                var fdate = format.parse({value:fromdate, type: format.Type.DATE});
                var tdate = format.parse({value:todate, type: format.Type.DATE});
                if(tdate.getTime() < fdate.getTime() ){
                    alert("From date should be earlier or equal to the To date!");
                    return false;
                }
            }
            var dept = currentrecord.getValue({
            fieldId: 'custpage_deptinfo'
            });
            var binvalues = currentrecord.getValue({
                fieldId: 'custpage_bin'
            });
            var plan = currentrecord.getValue({
                fieldId: 'custpage_plan'
            });
            var action = currentrecord.getValue({
                fieldId: 'custpage_action'
            });
            var binzone = currentrecord.getValue({
                fieldId: 'custpage_binzone'
            });
            var scan_user = currentrecord.getValue({
                fieldId: 'custpage_user'
            });
            var brand = currentrecord.getValue({
                fieldId: 'custpage_brand'
            });
            var itemType = currentrecord.getValue({
                fieldId: 'custpage_itemtyp'
            });
            var classdata = currentrecord.getValue({
                fieldId: 'custpage_class'
            });
            var pfvendor = currentrecord.getValue({
                fieldId: 'custpage_pfvendor'
            });
            var author = currentrecord.getValue({
                fieldId: 'custpage_author'
            });
            
            
            window.onbeforeunload = null;
            var redirecturl = url.resolveScript({
                scriptId: 'customscripttss_suitelet_bulk_app_screen',
                deploymentId: 'customdeploytss_suitelet_bulk_app_screen',
                
            })+'&location=' + loc + '&department=' + dept + '&bin=' + binvalues + '&plan=' + plan + '&action=' + action + '&fdate=' +fromdate + '&tdate=' +todate + '&binzone=' +binzone+ '&scan_user=' +scan_user+'&brand=' +brand+'&itemTyp=' +itemType+'&class=' +classdata+'&pfvendor=' +pfvendor+'&author=' +author;
            window.location.href=redirecturl;   
        }
        catch(error){
            alert('Error occured in filters function' + error);
        }
    }
    function recal_variance(full_url) {
        try{
            var count1 = 0;
            var currentrecord = currentRecord.get();
            var loc = currentrecord.getValue({
                fieldId: 'custpage_location'
            });
            if(loc == null || loc == undefined || loc == ''){
                alert("Warehouse should not be null!");
                return false;
            }
            var linecount1 = currentrecord.getLineCount({sublistId: 'bulk_app_rec'});
            for(var i=0 ;i<linecount1 ; i++){
                var value = currentrecord.getSublistValue({sublistId: 'bulk_app_rec',fieldId: 'custpage_sub_process',line: i});
                if (value == true){
                    count1++;
                }
            }
            if(count1==0){
                alert('Select atleast one item to recalculate variance');
                return false;
            }else if(count1==1){
                window.onbeforeunload = null;
                window.open(full_url, '_blank');
               
            }
        }catch(error){
            alert('Error occured in recalculate variance function',+error);
        }
    }
    function refresh() {
        window.location.reload();
    }
    function saveRecord(context){
        try {
        	var count = 0;
            var currentrecord = context.currentRecord;
            var action = currentrecord.getValue({
                fieldId: 'custpage_action'
            });
            
            var account = currentrecord.getValue({
                fieldId: 'custpage_account'
            });
            if(action == 1){
                if(account == null || account == undefined || account == '' ){
                    alert('Please enter value(s) for: Account');
                    return false;
                }
            }
            var lineCount = currentrecord.getLineCount({sublistId: 'bulk_app_rec'});
            for(var i=0 ;i<lineCount ; i++){
                var value = currentrecord.getSublistValue({sublistId: 'bulk_app_rec',fieldId: 'custpage_sub_process',line: i});
                if (value == true){
                    count++;
                }
            }
            if(count==0){
                if(action == 1){
                    alert('Select atleast one item to approve');
                    return false;
                }else{
                    alert('Select atleast one item to reject');
                    return false;
                }
                
            }
        }
        catch (error) {
            alert('Error occured in Save record function' + error); 
        }
        return true;
    }
    return {filters: filters,
            saveRecord :saveRecord,
            recal_variance : recal_variance,
            refresh : refresh
           
    };
});
 git add "TSS_client_bulk_approval_screen (3).js"