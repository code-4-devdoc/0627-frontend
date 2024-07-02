import React, { useEffect } from 'react';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";
import ActivityRecord from "./ActivityRecord";

const Activity = ({ activities , setActivities, resumeId }) => {
    // 컴포넌트가 마운트될 때 local storage 에서 이전에 입력된 데이터들을 불러옴
    useEffect(() => {
        const savedActivities = JSON.parse(localStorage.getItem('activities'));
        if (savedActivities) {
            setActivities(savedActivities);
        } else {
            setActivities([{ id: null, activityName: '', organizationName: '', startDate: '', endDate: '', isCurrent: false }]);
        }
    }, [setActivities]);

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(activities));
    }, [activities]);


    // 추가 함수
    const addActivity = () => {
        setActivities(prev => [
            ...prev,
            { id: prev.length, activityName: '', organizationName: '', startDate: '', endDate: '', isCurrent: false }
        ]);
    };

    // 삭제함수
    const removeActivity = (index) => {
        setActivities(prev => prev.filter((_, idx) => idx !== index));
    };


    // 업데이트 함수
    const updateActivity = (index, field, value) => {
        setActivities(prev => prev.map((activity, idx) => idx === index ? { ...activity, [field]: value } : activity));
    };

    return (
        <SectionContainer title="Activity">
            {activities.map((activity, index) => (
                <ActivityRecord
                    key={index}
                    index={index}
                    activity={activity}
                    onRemove={() => removeActivity(index)}
                    onUpdate={updateActivity}
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="대외활동 이력" onClick={addActivity}></AddRecord>
        </SectionContainer>
    );
};

export default Activity;
