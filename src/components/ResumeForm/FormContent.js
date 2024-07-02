import React from 'react';
import LanguageSection from './Language/LanguageSection';
import AwardSection from './Award/AwardSection';
import SkillSection from './Skill/SkillSection';
import CareerSection from './Career/CareerSection';
import ProjectSection from './Project/ProjectSection';
import CertificateSection from "./Certificate/CertificateSection";
import ActivitySection from "./Activity/ActivitySection";
import TrainingSection from "./Training/TrainingSection";
import AboutMeSection from "./AboutMe/AboutMeSection";
import EducationSection from "./Education/EducationSection";

// FormContent.js: 활성화된 항목들에 대응되는 컴포넌트들을 랜더링하는 역할

const FormContent = ({ activeSections,
                         languages, setLanguages,
                         awards, setAwards,
                         skills, setSkills,
                         careers, setCareers,
                         projects, setProjects,
                         activities, setActivities,
                         trainings, setTrainings,
                         aboutMes, setAboutMes,
                         educations, setEducations,
                         certificates, setCertificates, resumeId }) => {
    return (
        <div className="section-content">
            {activeSections.includes('AboutMe') && (
                <AboutMeSection aboutMes={aboutMes} setAboutMes={setAboutMes} resumeId={resumeId} />
            )}
            {activeSections.includes('Skill') && (
                <SkillSection skills={skills} setSkills={setSkills} resumeId={resumeId} />
            )}
            {activeSections.includes('Education') && (
                <EducationSection educations={educations} setEducations={setEducations} resumeId={resumeId} />
            )}
            {activeSections.includes('Career') && (
                <CareerSection careers={careers} setCareers={setCareers} resumeId={resumeId} />
            )}
            {activeSections.includes('Project') && (
                <ProjectSection projects={projects} setProjects={setProjects} resumeId={resumeId} />
            )}
            {activeSections.includes('Training') && (
                <TrainingSection trainings={trainings} setTrainings={setTrainings} resumeId={resumeId} />
            )}
            {activeSections.includes('Activity') && (
                <ActivitySection activities={activities} setActivities={setActivities} resumeId={resumeId} />
            )}
            {activeSections.includes('Award') && (
                <AwardSection awards={awards} setAwards={setAwards} resumeId={resumeId} />
            )}
            {activeSections.includes('Certificate') && (
                <CertificateSection certificates={certificates} setCertificates={setCertificates} resumeId={resumeId}/>
            )}
            {activeSections.includes('Language') && (
                <LanguageSection languages={languages} setLanguages={setLanguages} resumeId={resumeId} />
            )}
        </div>
    );
};

export default FormContent;



