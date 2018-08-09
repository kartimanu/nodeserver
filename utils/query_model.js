
const helper = require('./helper');
const qmodels = {};
const queryscript = {};

//RDB QUERY : USERS
queryscript.selectallWSusers = "SELECT * FROM wls_users";
queryscript.insertuser = "INSERT INTO wls_users set ? ";
queryscript.updateuser = "UPDATE wls_users SET ? WHERE user_name = ?";
queryscript.deleteuser = "DELETE FROM wls_users WHERE user_name = ?";

//RDB QUERY : PUBLICITY
queryscript.getpublicitydata = "SELECT PB_METAINSTANCE_ID, PB_FILLIN_DATE, PB_DEVICE_ID, PB_SIMCARD_ID, PB_PHONE_NUMBER, PB_USER_NAME, PB_V_DATE, PB_PARK, PB_TALUK, PB_VILLAGE_1, PB_VILLAGE_2, PB_LAT, PB_LONG, PB_ALT, PB_ACC, PB_C_VILLAGE FROM publicity";

//RDB QUERY : DAILY COUNT
queryscript.selectallDAO = "SELECT * FROM DAILY_COUNT";
queryscript.selectDCuser = "SELECT * FROM dc_cases WHERE DC_CASE_ID = ?";
queryscript.getallDC = "SELECT * FROM DAILY_COUNT DC JOIN dc_cases FA ON DC.DC_CASE_ID=FA.DC_CASE_ID";
queryscript.insertintoDC_table = "INSERT IGNORE INTO daily_count set ? ";
queryscript.insertintoDC_FAusers = "INSERT IGNORE INTO dc_cases set ? ";

//RDB QUERY : COMPENSATION
queryscript.selectOM_data = "SELECT * FROM compensation_details";
queryscript.selectOM_casedata = "SELECT * FROM com_cases_details WHERE COM_WSID_FORM_DATE = ?";


//PROD RDB QUERY
queryscript.insertintowsDC_table = "INSERT IGNORE INTO odk.DAILY_COUNT set ? ";

//FORM QUERY 
queryscript.selectallFormDC = "SELECT * FROM wsodk_dailycount_apr_18_results";

qmodels.get_dcofficers = function (data) {
    var MIN_ID = data['meta:instanceID'].split(":");

    var insertquery = {

        DC_METAINSTANCE_ID: MIN_ID[1],
        DC_FILLIN_DATE: data.today,
        DC_DEVICE_ID: data.deviceid,
        DC_SIMCARD_ID: data.simserial,
        DC_PHONE_NUMBER: data.phonenumber,
        DC_USER_NAME: data.username,
        DC_CASE_DATE: helper.methods.GetFormattedDate(data['details:dc_date']),
        DC_NH_CASES: data['details:nh_cases'],
        DC_BP_CASES: data['details:bp_cases'],
        DC_TOTAL_CASES: data['details:ws_cases'],
        DC_CASE_ID: MIN_ID[1] + "_" + data.username

    };

    console.log("inserting" + insertquery.DC_CASE_DATE);
    return insertquery;
}

qmodels.createuser = function (data) {
    var insertquery = {
        First_name: data.firstname,
        Last_name: data.lastname,
        user_name: data.username,
        user_pwd: data.password,
        Email_id: data.email,
        Phone_number: data.phone
    };

    console.log("inserting user");
    return insertquery;
}

exports.sqlquery = queryscript;
exports.datamodels = qmodels;