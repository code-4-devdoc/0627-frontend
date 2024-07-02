import React, {useEffect, useState} from 'react';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";

const Training = ({ educationCompletions, setEducationCompletions}) => {

    // 컴포넌트가 마운트될 때 local storage 에서 이전에 입력된 데이터들을 불러옴
    useEffect(() => {
        const savedTrainings = JSON.parse(localStorage.getItem('training'));
        if (savedTrainings) {
            setEducationCompletions(savedTrainings);
        } else {
            setEducationCompletions([{ id: null,  courseName: '', institution: '', startDate: '', endDate: '' }]);
        }
    }, [setEducationCompletions]);

    // 입력 데이터가 변경될 때마다 local storage 에 저장
    useEffect(() => {
        localStorage.setItem('training', JSON.stringify(educationCompletions));
    }, [educationCompletions]);

    // 추가 함수
    const addTraining = () => {
        setEducationCompletions(prev => [
            ...prev,
            { id: prev.length, courseName: '', institution: '', startDate: '', endDate: '' }
        ]);
    };

    // 삭제 함수
    const removeTraining = (index) => {
        setEducationCompletions(prev => prev.filter((_, idx) => idx !== index));
    };

    // 업데이트 함수
    const updateTraining = (index, field, value) => {
        setEducationCompletions(prev => prev.map((trn, idx) => idx === index ? { ...trn, [field]: value } : trn));
    };

    return (
        <SectionContainer title="Training">
            {educationCompletions}
            <div style={{height: 10}}></div>
            <AddRecord fieldName="교육 이력" onClick={addTraining}></AddRecord>
        </SectionContainer>
    );
};

export default Training;
