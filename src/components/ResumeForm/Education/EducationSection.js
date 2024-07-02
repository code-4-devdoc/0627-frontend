import SectionContainer from "../../ResumeCommon/SectionContainer";
import React from "react";
import EducationRecord from "./EducationRecord";
import AddRecord from "../../ResumeCommon/AddRecord";

// EducationSection.js: Education.js와 비슷한 역할. 언어 섹션을 구성

// Education 항목 관리 컴포넌트
const EducationSection = ({ educations, setEducations, resumeId }) => {

    // 언어 추가 함수
    const addEducation = () => {
        setEducations([...educations, { id: educations.length, schoolName: '', major: '', enrollmentPeriod: '', status: '' }]);
    };

    // 언어 제거 함수
    const removeEducation = (index) => {
        setEducations(educations.filter((_, idx) => idx !== index));
    };

    // 언어 업데이트 함수
    const updateEducation = (index, field, value) => {
        setEducations(educations.map((edu, idx) => idx === index ? { ...edu, [field]: value } : edu));
    };

    return (
        <SectionContainer title="Education">
            {educations.map((edu, index) => (
                <EducationRecord
                    key={index}
                    index={index}
                    education={edu}
                    onRemove={() => removeEducation(index)}
                    onUpdate={updateEducation}
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="학력" onClick={addEducation}></AddRecord>
        </SectionContainer>
    );
};

export default EducationSection;