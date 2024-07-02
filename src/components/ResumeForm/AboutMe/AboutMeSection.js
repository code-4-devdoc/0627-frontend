import React, { useEffect } from 'react';
import AboutMe from "./AboutMe";
import { call } from "../../../service/ApiService";

const AboutMeSection = ({ aboutMes, setAboutMes, resumeId }) => {
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/aboutMes`, 'GET', null);
                setAboutMes(response);
            } catch (error) {
                console.error("Failed to fetch aboutMe", error);
            }
        };

        fetchdata();
    }, [resumeId, setAboutMes]);

    return <AboutMe aboutMes={aboutMes} setAboutMes={setAboutMes} resumeId={resumeId} />;
};

export default AboutMeSection;
