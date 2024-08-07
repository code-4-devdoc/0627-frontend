import React, {useMemo, useState} from 'react';
import styled, {createGlobalStyle} from "styled-components";
import { call } from "../../../service/ApiService";

const GlobalStyle = createGlobalStyle`
  @media print {
      .remove-btn {
          display: none !important;
      }
  }
`;

const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
    height: 135px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
`;

const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size',
    'h1',
];

const AwardRecord = ({ index, award, onRemove, onUpdate, resumeId }) => {
    const [error, setError] = useState('');

    const handleInputChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    const handleDateChange = (value) => {
        handleInputChange('date', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/awards/${award.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete award data", error);
        }
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [
                        {
                            color: [],
                        },
                        { background: [] },
                    ],
                ],
            },
        };
    }, []);

    return (
        <>
            <GlobalStyle/>
            <Border>
                <div style={{ display: "flex", justifyContent: "flex-end", height: 20 }}>
                    <button
                        className="remove-btn"
                        style={{
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
                <div style={{ display: "flex", height: error ? 55 : 35, marginTop: 5, gap: 5 }}>
                    <Input style={{ width: 150, height: 18 }} placeholder="수상명" value={award.awardName} onChange={(e) => handleInputChange('awardName', e.target.value)} />
                    <Input style={{ width: 150, height: 18 }} placeholder="수상 기관" value={award.awardingInstitution} onChange={(e) => handleInputChange('awardingInstitution', e.target.value)} />
                    <div>
                        <Input style={{ width: 70 }} placeholder="YYYY.MM" value={award.date} onChange={(e) => handleDateChange(e.target.value)} />
                        {error && <div className="error" style={{fontSize: 13, color: 'rgba(202, 5, 5, 1)', marginLeft: 2, marginTop: 2}}>{error}</div>}
                    </div>
                </div>
                <div style={{ marginTop: 5 }}>
                    <Input as="textarea"
                           style={{ width: 590, height: 50, fontFamily: "inherit" }}
                           placeholder="부연 설명을 입력하세요."
                           value={award.description}
                           onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                </div>
            </Border>
        </>
    );
};

export default AwardRecord;
