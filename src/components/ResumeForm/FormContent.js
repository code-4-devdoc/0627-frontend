import React from 'react';
import LanguageSection from './Language/LanguageSection';
import AwardSection from './Award/AwardSection';
import SkillSection from './Skill/SkillSection';
import CareerSection from './Career/CareerSection';
import ProjectSection from './Project/ProjectSection';
import CertificateSection from "./Certificate/CertificateSection";
<<<<<<< HEAD
import ActivitySection from "./Activity/ActivitySection";
import TrainingSection from "./Training/TrainingSection";
import AboutMeSection from "./AboutMe/AboutMeSection";
import EducationSection from "./Education/EducationSection";
=======
import BlankSection from './Blank/BlankSection';
>>>>>>> 4572ddda91c4f675b5390fe7135441028fd3be9f


<<<<<<< HEAD
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
=======
const FormContent = ({ activeSections, languages, setLanguages, awards, setAwards, skills, setSkills, careers, setCareers, projects, setProjects, certificates, setCertificates, resumeId, onRemoveBlankSection }) => {
    return (
        <div className="section-content">
            {activeSections.map((section, index) => {
                switch (section) {
                    case 'Language':
                        return (
                            <div key={index} className="section-item">
                                <LanguageSection languages={languages} setLanguages={setLanguages} resumeId={resumeId} />
                            </div>
                        );
                    case 'Award':
                        return (
                            <div key={index} className="section-item">
                                <AwardSection awards={awards} setAwards={setAwards} resumeId={resumeId} />
                            </div>
                        );
                    case 'Skill':
                        return (
                            <div key={index} className="section-item">
                                <SkillSection skills={skills} setSkills={setSkills} resumeId={resumeId} />
                            </div>
                        );
                    case 'Career':
                        return (
                            <div key={index} className="section-item">
                                <CareerSection careers={careers} setCareers={setCareers} resumeId={resumeId} />
                            </div>
                        );
                    case 'Project':
                        return (
                            <div key={index} className="section-item">
                                <ProjectSection projects={projects} setProjects={setProjects} resumeId={resumeId} />
                            </div>
                        );
                    case 'Certificate':
                        return (
                            <div key={index} className="section-item">
                                <CertificateSection certificates={certificates} setCertificates={setCertificates} resumeId={resumeId} />
                            </div>
                        );
                    case 'Blank':
                        return (
                            <div key={index} className="section-item">
                                <BlankSection onRemove={() => onRemoveBlankSection(index)} />
                            </div>
                        );
                    default:
                        return null;
                }
            })}
>>>>>>> 4572ddda91c4f675b5390fe7135441028fd3be9f
        </div>
    );
};

export default FormContent;
