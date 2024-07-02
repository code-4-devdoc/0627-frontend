import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import React from "react";
import TrainingRecord from "./TrainingRecord";

const TrainingSection = ({ educationCompletions, setEducationCompletions, resumeId }) => {
    //직업훈련 추가 함수
    const addTraining = () => {
        setEducationCompletions([...educationCompletions,
            {id: educationCompletions.length, courseName: '', institution: '', startDate: '', endDate: ''}]);
    };

    //직업 훈련 제거 함수
    const removeTraining = (index) => {
        setEducationCompletions(educationCompletions.filter((_, idx) => idx !== index));
    };

    //직업 훈련 업데이트 함수
    const updateTraining = (index, field, value) => {
        setEducationCompletions(educationCompletions.map((edu, idx) => idx === index ? { ...edu, [field]: value } : edu));
    };

    return (
        <SectionContainer title="Training">
            {educationCompletions.map((edu, index) => (
                <TrainingRecord
                    key={index}
                    index={index}
                    educationCompletions={edu}
                    onRemove={() => removeTraining(index)}
                    onUpdate={updateTraining}
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="직업 훈련 이력" onClick={addTraining}></AddRecord>
        </SectionContainer>
    );
};

export default TrainingSection;