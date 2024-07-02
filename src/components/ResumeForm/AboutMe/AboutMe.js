import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import blogIcon from '../../../assets/blog-icon.png';
import githubIcon from '../../../assets/github-icon.png';
import emailIcon from '../../../assets/email-icon.png';
import phoneIcon from '../../../assets/phone-icon.png';
import birthdayIcon from '../../../assets/birthday-icon.png';
import FieldWithToggleButton from "./FieldWithToggleButton";
import { call } from "../../../service/ApiService";

const Input = styled.input`
    padding: 8px;
    margin-right: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: block;
    font-size: 15px;
`;

const Button = styled.button`
    width: 25px;
    height: 25px;
    background-color: ${props => props.active ? 'rgba(175, 175, 175, 1)' : 'rgba(129, 172, 255, 1)'};
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;
    margin-top: 7px;
`;

const ImagePreview = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-style: dashed;
    border-color: rgba(239, 245, 255, 1);
    padding: 15px 0 15px 0;
`;

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

const AboutMe = ({ aboutMe, setAboutMe, resumeId }) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(aboutMe?.photo || '');

    useEffect(() => {
        const fetchAboutMe = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/aboutMes`, 'GET', null);
                setAboutMe(response);
            } catch (error) {
                console.error("Failed to fetch aboutMe", error);
            }
        };

        fetchAboutMe();
    }, [resumeId, setAboutMe]);

    const handleInputChange = (field, value) => {
        setAboutMe(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
            handleInputChange('photo', reader.result);
        }

        reader.readAsDataURL(file);
    };

    const [isActive, setIsActive] = useState({
        phone: false,
        email: false,
        githubAddress: false,
        blogAddress: false,
        selfIntroduction: false,
        birthday: false
    });

    const toggleActive = (field, input) => {
        setIsActive(prev => {
            const newState = { ...prev, [field]: !prev[field] };

            if (prev[field] && !input.isValid) {
                input.setValue("");
                input.setIsValid(true);
            }
            return newState;
        });
    };

    const phoneInput = useInputValidation(aboutMe?.phoneNumber || '', /^\d{3}-\d{4}-\d{4}$/);
    const emailInput = useInputValidation(aboutMe?.email || '', /^[a-zA-Z0-9.]+@[a-z]+\.[a-z]+$/);
    const birthdayInput = useInputValidation(aboutMe?.birthday || '', /^\d{4}\.\d{2}\.\d{2}$/);
    const githubInput = useInputValidation(aboutMe?.github || '', /^https:\/\/github\.com\/([a-zA-Z0-9_-]+\/?[a-zA-Z0-9_-]*\/?)*$/);
    const blogInput = useInputValidation(aboutMe?.blog || '', /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
    const introInput = useInputValidation(aboutMe?.introduction || '', /^[\s\S]*$/);

    return (
        <SectionContainer title="About Me">
            <div style={{ display: "flex", paddingTop: 10 }}>
                <div>
                    <Input
                        placeholder="이름"
                        style={{ marginLeft: 39 }}
                        value={aboutMe?.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />

                    <FieldWithToggleButton
                        icon={birthdayIcon}
                        placeholder="생년월일 (YYYY.MM.DD)"
                        isActive={isActive.birthday}
                        inputProps={birthdayInput}
                        toggleActive={toggleActive}
                        fieldType="birthday"
                        errorMessage="날짜 형식을 확인해 주세요."
                        value={birthdayInput.value}
                        onChange={(e) => {
                            birthdayInput.onChange(e);
                            handleInputChange('birthday', e.target.value);
                        }}
                    />

                    <FieldWithToggleButton
                        icon={phoneIcon}
                        placeholder="전화번호 ('-' 포함)"
                        isActive={isActive.phone}
                        inputProps={phoneInput}
                        toggleActive={toggleActive}
                        fieldType="phone"
                        errorMessage="전화번호 형식을 확인해 주세요."
                        value={phoneInput.value}
                        onChange={(e) => {
                            phoneInput.onChange(e);
                            handleInputChange('phoneNumber', e.target.value);
                        }}
                    />

                    <FieldWithToggleButton
                        icon={emailIcon}
                        placeholder="이메일"
                        isActive={isActive.email}
                        inputProps={emailInput}
                        toggleActive={toggleActive}
                        fieldType="email"
                        errorMessage="이메일 형식을 확인해 주세요."
                        value={emailInput.value}
                        onChange={(e) => {
                            emailInput.onChange(e);
                            handleInputChange('email', e.target.value);
                        }}
                    />

                    <FieldWithToggleButton
                        icon={githubIcon}
                        placeholder="깃허브 주소"
                        isActive={isActive.githubAddress}
                        inputProps={githubInput}
                        toggleActive={toggleActive}
                        fieldType="githubAddress"
                        errorMessage="깃허브 주소를 확인해 주세요."
                        value={githubInput.value}
                        onChange={(e) => {
                            githubInput.onChange(e);
                            handleInputChange('github', e.target.value);
                        }}
                    />

                    <FieldWithToggleButton
                        icon={blogIcon}
                        placeholder="블로그 주소"
                        isActive={isActive.blogAddress}
                        inputProps={blogInput}
                        toggleActive={toggleActive}
                        fieldType="blogAddress"
                        errorMessage="블로그 주소를 확인해 주세요."
                        value={blogInput.value}
                        onChange={(e) => {
                            blogInput.onChange(e);
                            handleInputChange('blog', e.target.value);
                        }}
                    />
                </div>
                <div>
                    <ImageContainer style={{ marginLeft: 60 }}>
                        <input style={{ marginLeft: 55 }} type="file" onChange={handleImageChange} accept="image/*" />
                        {imagePreviewUrl && (
                            <ImagePreview style={{ marginTop: 10 }} src={imagePreviewUrl} alt="Profile Image" />
                        )}
                    </ImageContainer>
                </div>
            </div>

            <div style={{ display: "flex", marginLeft: 39 }}>
                <div>
                    <Input
                        style={{ width: 600, height: 60, fontFamily: "inherit" }}
                        as="textarea"
                        placeholder="자기소개를 입력하세요."
                        disabled={!isActive.selfIntroduction}
                        {...introInput}
                        value={aboutMe?.introduction || ''}
                        onChange={(e) => {
                            introInput.onChange(e);
                            handleInputChange('introduction', e.target.value);
                        }}
                        isValid={introInput.isValid}
                    />
                    {(isActive.selfIntroduction && !introInput.isValid) && (
                        <p style={{ color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13 }}>
                            입력을 확인해 주세요.
                        </p>
                    )}
                </div>
                <Button onClick={() => toggleActive('selfIntroduction', introInput)} active={isActive.selfIntroduction}>
                    {isActive.selfIntroduction ? '-' : '+'}
                </Button>
            </div>
        </SectionContainer>
    );
};

export default AboutMe;
