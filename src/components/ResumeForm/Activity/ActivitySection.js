import React from "react";
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import ActivityRecord from "./ActivityRecord";

const ActivitySection = ({ activities, setActivities, resumeId}) => {
    // 대외활동 추가 함수
    const addActivity = () => {
        setActivities([...activities, { id: activities.length, activityName: '', organizationName: '', startDate: '', endDate: '' }]);
    };

    // 대외활동 제거 함수
    const removeActivity = (index) => {
        setActivities(activities.filter((_, idx) => idx !== index));
    };

    // 대외활동 업데이트 함수
    const updateActivity = (index, field, value) => {
        setActivities(activities.map((act, idx) => idx === index ? { ...act, [field]: value } : act));
    };

    return (
        <SectionContainer title="Activity">
            {activities.map((act, index) => (
                <ActivityRecord
                    key={index}
                    index={index}
                    activity={act}
                    onRemove={() => removeActivity(index)}
                    onUpdate={updateActivity}
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="대외 활동 이력" onClick={addActivity}></AddRecord>
        </SectionContainer>
    );
};

export default ActivitySection;