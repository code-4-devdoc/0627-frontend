import React from 'react';
import LanguageSection from './Language/LanguageSection';
import AwardSection from './Award/AwardSection';
import SkillSection from './Skill/SkillSection';
import CareerSection from './Career/CareerSection';
import ProjectSection from './Project/ProjectSection';
import CertificateSection from "./Certificate/CertificateSection";
import BlankSection from './Blank/BlankSection';


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
        </div>
    );
};

export default FormContent;
