import React, { useEffect } from 'react';
import { SendDataToServer } from '../../components/index.js';

function Test() {
    useEffect(() => {
        // get the current role
        const userRole = sessionStorage.getItem('userRole');

        if (userRole === 'student') {
            const studentFormData = JSON.parse(sessionStorage.getItem('studentData'));
            const studentOccupation = sessionStorage.getItem('occupation');
            const studentStartDate = sessionStorage.getItem('startDate');
            const studentEndDate = sessionStorage.getItem('endDate');
            const studentDescription = sessionStorage.getItem('studentDescription');
            const studentOnlineProfiles = sessionStorage.getItem('onlineProfile');
            const studentTagsData = JSON.parse(sessionStorage.getItem('selectedTags'));
            const studentWorkLocation = sessionStorage.getItem('selectedLocation');
            const noDates = sessionStorage.getItem('noDates') !== null ? sessionStorage.getItem('noDates') : false;

            const studentData = {
                userRole,
                studentFormData,
                studentOccupation,
                studentStartDate,
                studentEndDate,
                studentDescription,
                studentOnlineProfiles,
                studentTagsData,
                studentWorkLocation,
                noDatesSelected: noDates,
            };

            SendDataToServer(studentData);
        } else if (userRole === 'company') {
            const companyFormData = JSON.parse(sessionStorage.getItem('companyData'));
            const companyDescription = sessionStorage.getItem('companyDescription');
            const companyStartDate = sessionStorage.getItem('startDate');
            const companyEndDate = sessionStorage.getItem('endDate');
            const companyOnlineProfile = sessionStorage.getItem('onlineProfile');
            const companyTagsData = JSON.parse(sessionStorage.getItem('selectedTags'));
            const companyWorkLocation = sessionStorage.getItem('selectedLocation');
            const noInterns = sessionStorage.getItem('noInterns') !== null ? sessionStorage.getItem('noInterns') : false;

            const companyData = {
                userRole,
                companyFormData,
                companyDescription,
                companyStartDate,
                companyEndDate,
                companyOnlineProfile,
                companyTagsData,
                companyWorkLocation,
                noInterns,
            };
           

            SendDataToServer(companyData);
        }
    }, []);

    return null; // Adjust return if necessary
}

export default Test;