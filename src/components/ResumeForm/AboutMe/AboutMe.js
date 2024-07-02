import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import blogIcon from '../../../assets/blog-icon.png';
import githubIcon from '../../../assets/github-icon.png';
import emailIcon from '../../../assets/email-icon.png';
import phoneIcon from '../../../assets/phone-icon.png';
import birthdayIcon from '../../../assets/birthday-icon.png';
import FieldWithToggleButton from "./FieldWithToggleButton";
import AboutMeRecord from "./AboutMeRocord";
import AddRecord from "../../ResumeCommon/AddRecord";

// const Input = styled.input`
//     padding: 8px;
//     margin-right: 8px;
//     margin-bottom: 10px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     display: block;
//     font-size: 15px;
// `;
//
// const Button = styled.button`
//     width: 25px;
//     height: 25px;
//     background-color: ${props => props.active ? 'rgba(175, 175, 175, 1)' : 'rgba(129, 172, 255, 1)'};
//     color: white;
//     border: none;
//     border-radius: 50%;
//     cursor: pointer;
//     margin-right: 10px;
//     margin-top: 7px;
// `;
//
// const ImagePreview = styled.img`
//     width: 200px;
//     height: 200px;
//     object-fit: cover;
// `;
//
// const ImageContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     border-style: dashed;
//     border-color: rgba(239, 245, 255, 1);
//     padding: 15px 0 15px 0;
// `;

function useInputValidation(initialValue, pattern) {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(true);

    function onChange(e) {
        const newValue = e.target.value;
        const valid = pattern.test(newValue);
        setIsValid(valid);
        setValue(newValue);
    }

    return { value, setValue, onChange, isValid, setIsValid };
}

const AboutMe = ({ aboutMes, setAboutMes, resumeId }) => {
    const [showAddButton, setShowAddButton] = useState(true);

    useEffect(() => {
        const savedAboutMes = JSON.parse(localStorage.getItem('aboutMes'));
        if (savedAboutMes) {
            setAboutMes(savedAboutMes);
            setShowAddButton(savedAboutMes.length < 1);
        } else {
            setAboutMes([{ id: null, name: '', birthday: '', github: '', email: '', phoneNumber: '', blog: '', introduction: '', photo: '' }]);
            setShowAddButton(true);
        }
    }, [setAboutMes]);

    useEffect(() => {
        localStorage.setItem('aboutMes', JSON.stringify(aboutMes));
    }, [aboutMes]);

    useEffect(() => {
        setShowAddButton(aboutMes.length < 1);
    }, [aboutMes]);

    const addAboutMe = () => {
        setAboutMes(prev => [
            ...prev,
            { id: prev.length, name: '', birthday: '', github: '', email: '', phoneNumber: '', blog: '', introduction: '', photo: '' }
        ]);
    };

    const removeAboutMe = (index) => {
        setAboutMes(prev => prev.filter((_, idx) => idx !== index));
    };

    const updateAboutMe = (index, field, value) => {
        setAboutMes(prev => prev.map((aboutMe, idx) => idx === index ? { ...aboutMe, [field]: value } : aboutMe));
    };

    return (
        <SectionContainer title="About Me">
            {aboutMes.map((aboutMe, index) => (
                <AboutMeRecord
                    key={index}
                    index={index}
                    aboutMe={aboutMe}
                    onRemove={() => removeAboutMe(index)}
                    onUpdate={updateAboutMe}
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            {showAddButton && <AddRecord fieldName="소개" onClick={addAboutMe} />}
        </SectionContainer>
    );
};

export default AboutMe;
