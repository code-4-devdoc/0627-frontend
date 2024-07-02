import { useEffect } from "react";
import { call } from "../../../service/ApiService";
import AboutMe from "./AboutMe";

const AboutMeSection = ({ aboutMe, setAboutMe, resumeId }) => {
    useEffect(() => {
        const fetchAboutMe = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/aboutMes`, 'GET', null);
                setAboutMe(response);
            } catch (error) {
                console.error("Failed to fetch aboutMe", error);
            }
        };

        fetchAboutMe();
    }, [resumeId, setAboutMe]);

    return <AboutMe aboutMe={aboutMe} setAboutMe={setAboutMe} resumeId={resumeId} />;
};

export default AboutMeSection;
