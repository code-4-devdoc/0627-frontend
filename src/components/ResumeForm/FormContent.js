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
                        return <LanguageSection key={index} languages={languages} setLanguages={setLanguages} resumeId={resumeId} />;
                    case 'Award':
                        return <AwardSection key={index} awards={awards} setAwards={setAwards} resumeId={resumeId} />;
                    case 'Skill':
                        return <SkillSection key={index} skills={skills} setSkills={setSkills} resumeId={resumeId} />;
                    case 'Career':
                        return <CareerSection key={index} careers={careers} setCareers={setCareers} resumeId={resumeId} />;
                    case 'Project':
                        return <ProjectSection key={index} projects={projects} setProjects={setProjects} resumeId={resumeId} />;
                    case 'Certificate':
                        return <CertificateSection key={index} certificates={certificates} setCertificates={setCertificates} resumeId={resumeId} />;
                    case 'Blank':
                        return <BlankSection key={index} onRemove={() => onRemoveBlankSection(index)} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default FormContent;
