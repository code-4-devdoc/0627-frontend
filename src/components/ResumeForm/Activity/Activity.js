import React, { useEffect } from 'react';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";
import ActivityRecord from "./ActivityRecord";

const Activity = ({ activities = [], setActivities, resumeId }) => {
    useEffect(() => {
        const savedActivities = JSON.parse(localStorage.getItem('activities'));
        if (savedActivities) {
            setActivities(savedActivities);
        } else {
            setActivities([{ id: null, activityName: '', organizationName: '', startDate: '', endDate: '' }]);
        }
    }, [setActivities]);

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(activities));
    }, [activities]);

    const addActivity = () => {
        setActivities(prev => [
            ...prev,
            { id: prev.length, activityName: '', organizationName: '', startDate: '', endDate: '' }
        ]);
    };

    const removeActivity = (index) => {
        setActivities(prev => prev.filter((_, idx) => idx !== index));
    };

    const updateActivity = (index, field, value) => {
        setActivities(prev => prev.map((act, idx) => idx === index ? { ...act, [field]: value } : act));
    };

    return (
        <SectionContainer title="Activity">
            {activities.map((act, index) => (
                <ActivityRecord
                    key={index}
                    index={index}
                    activities={act}
                    onRemove={() => removeActivity(index)}
                    onUpdate={updateActivity}
                    resumeId={resumeId} // resumeId를 ActivityRecord로 전달합니다.
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="대외활동 이력" onClick={addActivity}></AddRecord>
        </SectionContainer>
    );
};

export default Activity;
