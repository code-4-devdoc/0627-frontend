import React, {useEffect, useState} from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import EducationRecord from "./EducationRecord";
import AddRecord from "../../ResumeCommon/AddRecord";

// Education.js: 사용자가 Education 항목 내 입력란에 입력한 데이터들을 관리하고 표시함

// Education 항목 데이터 관리 컴포넌트
const Education = ({ educations, setEducations }) => {

    // 컴포넌트가 마운트될 때 local storage 에서 이전에 입력된 데이터들을 불러옴
    useEffect(() => {
        const savedEducations = JSON.parse(localStorage.getItem('languages'));
        if (setEducations) {
            setEducations(savedEducations);
        } else {
            setEducations([{  id: null, schoolName: '', major: '', enrollmentPeriod: '', status: '' }]);
        }
    }, [setEducations]);

    // 입력 데이터가 변경될 때마다 local storage 에 저장
    useEffect(() => {
        localStorage.setItem('languages', JSON.stringify(educations));
    }, [educations]);

    // 추가 함수
    const addEducation = () => {
        setEducations(prev => [
            ...prev,
            { id: prev.length, schoolName: '', major: '', enrollmentPeriod: '', status: '' }
        ]);
    };

    // 삭제 함수
    const removeEducation = (index) => {
        setEducations(prev => prev.filter((_, idx) => idx !== index));
    };

    // 업데이트 함수
    const updateEducation = (index, field, value) => {
        setEducations(prev => prev.map((edu, idx) => idx === index ? { ...edu, [field]: value } : edu));
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
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="학력" onClick={addEducation}></AddRecord>
        </SectionContainer>
    );
};

export default Education;