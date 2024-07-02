import React, {useEffect} from "react";
import {call} from "../../../service/ApiService";
import Education from "./Education";


// Education 항목 관리 컴포넌트
const EducationSection = ({ educations, setEducations, resumeId }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/educations`, 'GET', null);
                setEducations(response);
            } catch (error) {
                console.error("Failed to fetch careers", error);
            }
        };

        fetchData();
    }, [resumeId, setEducations]);

    return <Education educations={educations} setEducations={setEducations} />;
}

export default EducationSection;