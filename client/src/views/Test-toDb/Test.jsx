import React, { useEffect } from 'react';
import { SendDataToServer } from '../../components/index.js';

function Test() {
    useEffect(() => {
        // get the current role
        const userRole = sessionStorage.getItem('userRole');

        if (userRole === 'student') {
            const studentFormData = JSON.parse(sessionStorage.getItem('studentData'));
            const occupation = sessionStorage.getItem('occupation');
            const startDate = sessionStorage.getItem('startDate');
            const endDate = sessionStorage.getItem('endDate');
            const studentDescription = sessionStorage.getItem('studentDescription');
            const onlineProfiles = sessionStorage.getItem('onlineProfile');
            const noDates = sessionStorage.getItem('noDates') !== null ? sessionStorage.getItem('noDates') : false;

            const studentData = {
                studentFormData,
                occupation,
                startDate,
                endDate,
                studentDescription,
                onlineProfiles,
                noDatesSelected: noDates,
            };

            SendDataToServer(studentData);
        } else if (userRole === 'company') {
            const companyFormData = JSON.parse(sessionStorage.getItem('companyData'));
            const companyDescription = sessionStorage.getItem('companyDescription');
            const companyStartDate = sessionStorage.getItem('startDate');
            const companyEndDate = sessionStorage.getItem('endDate');
            const companyOnlineProfile = sessionStorage.getItem('onlineProfile');
            const noInterns = sessionStorage.getItem('noInterns') !== null ? sessionStorage.getItem('noInterns') : false;

            const companyData = {
                companyFormData,
                companyDescription,
                companyStartDate,
                companyEndDate,
                companyOnlineProfile,
                noInterns,
            };
           

            SendDataToServer(companyData);
        }
    }, []);

    return null; // Adjust return if necessary
}

export default Test;