//import { SendDataToServer } from '../../components/index.js';


function SendDataToServer(userData) {
    fetch('/test', { // Change this to the correct endpoint path
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userData
    })
    .then(response => {
        if (response.ok) {
            console.log('Data sent successfully');            
        } else {
            console.error('Failed to send data');            
        }
    })
    .catch(error => {
        console.error('Error:', error);        
    });
}




function Test(){




    var userRole = sessionStorage.getItem('userRole');
    var studentFormData = sessionStorage.getItem('studentData');
    var occupation = sessionStorage.getItem('occupation');
    occupation = JSON.stringify(occupation);
    var startDate = sessionStorage.getItem('startDate');
    startDate = JSON.stringify(startDate);
    var endDate = sessionStorage.getItem('endDate');
    endDate = JSON.stringify(endDate);
    var studentDescription = sessionStorage.getItem('studentDescription');
    studentDescription = JSON.stringify(studentDescription);
    var onlineProfiles = sessionStorage.getItem('onlineProfile');
    onlineProfiles = JSON.stringify(onlineProfiles);
    var noDates = sessionStorage.getItem('noDates') !== null ? sessionStorage.getItem('noDates') : false;
    var companyFormData = sessionStorage.getItem('companyData');    
    var companyDescription = sessionStorage.getItem('companyDescription');
    companyDescription = JSON.stringify(companyDescription);
    var companyStartDate = sessionStorage.getItem('startDate');
    companyStartDate = JSON.stringify(companyStartDate);
    var companyEndDate = sessionStorage.getItem('endDate');
    companyEndDate = JSON.stringify(companyEndDate);
    var companyOnlineProfile = sessionStorage.getItem('onlineProfile');
    companyOnlineProfile = JSON.stringify(companyOnlineProfile);
    var noInterns = sessionStorage.getItem('noInterns') !== null ? sessionStorage.getItem('noInterns') : false;



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

        SendDataToServer(studentData);

    }else if(userRole === 'company') {
       /*  var companyData = {
            companyFormData: companyFormData,
            companyDescription: companyDescription,
            companyStartDate: companyStartDate,
            companyEndDate: companyEndDate,
            companyOnlineProfile: companyOnlineProfile,
            noInterns: noInterns,
        } */
        var companyData = "Hello World";
        SendDataToServer(companyData);
    }
    

    return(
        <>
            <div className="companyUser_container">
                {companyData && Object.values(companyData).map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
            <div className="studentUser_container">
            {studentData && Object.values(studentData).map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </>
    );
}

export default Test