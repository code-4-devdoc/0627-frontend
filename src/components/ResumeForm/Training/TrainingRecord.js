import React, { useEffect, useState } from 'react';
import CheckboxLabels from "../../ResumeCommon/CheckboxLabels";
import styled from "styled-components";
import { call } from "../../../service/ApiService";

const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
`;

const TrainingRecord = ({ index, educationCompletions, onRemove, onUpdate, resumeId }) => {
    const checkboxOption = "진행 중";
    console.log(educationCompletions)
    const [isChecked, setIsChecked] = useState(educationCompletions.endDate === '');
    const [startDate, setStartDate] = useState(educationCompletions.startDate || '');
    const [endDate, setEndDate] = useState(educationCompletions.endDate || '');
    const [error, setError] = useState('');

    useEffect(() => {
        setIsChecked(educationCompletions.endDate === '');
        setStartDate(educationCompletions.startDate || '');
        setEndDate(educationCompletions.endDate || '');
    }, [educationCompletions]);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            setEndDate(''); // 체크박스 선택시 endDate 초기화
            handleInputChange('endDate', '');
        }
    };

    // 입력 값 변경 핸들러
    const handleInputChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    const handleDateChange = (field, value) => {
        if (field === 'startDate') {
            setStartDate(value);
        } else {
            setEndDate(value);
        }

        if (validateDate(value) || value === '') {
            setError('');
            handleInputChange(field, value);
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    // 삭제 핸들러
    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/educationCompletions/${educationCompletions.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete training data", error);
        }
    };

    return (
        <Border>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{
                    cursor: "pointer",
                    borderRadius: "0px 8px 0px 3px",
                    width: 30,
                    height: 20,
                    backgroundColor: "rgba(18, 73, 156, 50%)",
                    color: "white",
                    border: "none"
                }} onClick={handleRemove}>-
                </button>
            </div>
            <div style={{ display: "flex", height: 35, alignItems: "center", marginTop: 5, gap: 5 }}>
                <Input
                    style={{ width: 150 }}
                    placeholder="교육명"
                    value={educationCompletions.courseName}
                    onChange={(e) => handleInputChange('courseName', e.target.value)}
                />
                <Input
                    style={{ width: 150 }}
                    placeholder="교육 기관"
                    value={educationCompletions.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                />
                <div style={{ display: "flex", gap: 5, alignItems: "center", marginLeft: 5 }}>
                    <Input
                        style={{ width: 70 }}
                        placeholder="YYYY.MM"
                        value={startDate}
                        onChange={(e) => handleDateChange('startDate', e.target.value)}
                    />
                    <span>-</span>
                    <Input
                        style={{ width: 70, marginRight: 10 }}
                        placeholder="YYYY.MM"
                        value={endDate}
                        onChange={(e) => handleDateChange('endDate', e.target.value)}
                        disabled={isChecked}
                    />
                    <CheckboxLabels
                        option={checkboxOption}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    {error && <div style={{ fontSize: 13, color: 'rgba(202, 5, 5, 1)' }}>{error}</div>}
                </div>
            </div>
        </Border>
    );
};

export default TrainingRecord;
