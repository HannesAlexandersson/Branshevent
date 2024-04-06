

// get the current role
var userRole = sessionStorage.getItem('userRole');

//get the data from session storage
var studentFormData = sessionStorage.getItem('studentData');
//parse the data that where stored as JSON
studentFormData = JSON.parse(studentFormData);

var occupation = sessionStorage.getItem('occupation');

var startDate = sessionStorage.getItem('startDate');

var endDate = sessionStorage.getItem('endDate');

var studentDescription = sessionStorage.getItem('studentDescription');

var onlineProfiles = sessionStorage.getItem('onlineProfile');
//get conditional data or store it as false if its not set
var noDates = sessionStorage.getItem('noDates') !== null ? sessionStorage.getItem('noDates') : false;

//the same for the companydata
var companyFormData = sessionStorage.getItem('companyData');    
companyFormData = JSON.parse(companyFormData);
var companyDescription = sessionStorage.getItem('companyDescription');
var companyStartDate = sessionStorage.getItem('startDate');
var companyEndDate = sessionStorage.getItem('endDate');
var companyOnlineProfile = sessionStorage.getItem('onlineProfile');
var noInterns = sessionStorage.getItem('noInterns') !== null ? sessionStorage.getItem('noInterns') : false;

    // merge all the data to a single object
    if (userRole === 'student') {
        var studentData = {
            studentFormData: studentFormData,
            occupation: occupation,
            startDate: startDate,
            endDate: endDate,
            studentDescription: studentDescription,
            onlineProfiles: onlineProfiles,
            noDatesSelected: noDates,            
        }
       

    }else if(userRole === 'company') {
        var companyData = {
            companyFormData: companyFormData,
            companyDescription: companyDescription,
            companyStartDate: companyStartDate,
            companyEndDate: companyEndDate,
            companyOnlineProfile: companyOnlineProfile,
            noInterns: noInterns,
        }      
    }
  /* <div className="companyUser_container">
{companyData && Object.values(companyData).map((item, index) => (
    <p key={index}>{item}</p>
))}
</div>
<div className="studentUser_container">
{studentData && Object.values(studentData).map((item, index) => (
    <p key={index}>{item}</p>
))}
</div> */