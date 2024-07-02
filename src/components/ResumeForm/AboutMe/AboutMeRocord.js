import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { call } from "../../../service/ApiService";
import birthdayIcon from '../../../assets/birthday-icon.png';
import phoneIcon from '../../../assets/phone-icon.png';
import emailIcon from '../../../assets/email-icon.png';
import githubIcon from '../../../assets/github-icon.png';
import blogIcon from '../../../assets/blog-icon.png';

const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
    position: relative;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    margin-right: 5px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Icon = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

const ImagePreview = styled.img`
    width: 220px;
    height: 250px;
    object-fit: cover;
    position: absolute;
    top: 10px;
    right: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
`;

const AboutMeRecord = ({ index, aboutMe, onRemove, onUpdate, resumeId }) => {
    const [error, setError] = useState({});
    const [image, setImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    useEffect(() => {
        if (aboutMe.photo) {
            setImagePreviewUrl(aboutMe.photo);
        }
    }, [aboutMe.photo]);

    const handleInputChange = (field, value) => {
        onUpdate(index, field, value);
        validateField(field, value);
    };

    const validateDate = (date) => {
        return /^\d{4}\.\d{2}\.\d{2}$/.test(date);
    };

    const validatePhoneNumber = (phoneNumber) => {
        return /^\d{3}-\d{4}-\d{4}$/.test(phoneNumber);
    };

    const validateEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const validateField = (field, value) => {
        let errorMessage = '';
        switch (field) {
            case 'birthday':
                if (!validateDate(value) && value !== '') {
                    errorMessage = '날짜 형식을 확인해 주세요.';
                }
                break;
            case 'phoneNumber':
                if (!validatePhoneNumber(value) && value !== '') {
                    errorMessage = '전화번호 형식을 확인해 주세요.';
                }
                break;
            case 'email':
                if (!validateEmail(value) && value !== '') {
                    errorMessage = '이메일 형식을 확인해 주세요.';
                }
                break;
            default:
                break;
        }
        setError(prevError => ({ ...prevError, [field]: errorMessage }));
    };

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setImage(file);
            setImagePreviewUrl(reader.result);
            handleInputChange('photo', reader.result); // 이미지 URL을 저장
        }

        reader.readAsDataURL(file);
    };

    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/aboutMes/${aboutMe.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete aboutMe data", error);
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
                    backgroundColor: "rgba(18, 73, 156, 0%)",
                    color: "white",
                    border: "none"
                }} onClick={handleRemove}>-
                </button>
            </div>
            <Row>
                <Icon style={{opacity: 0}} src={birthdayIcon} alt="birthday" />  {/*간격 조정을 위한 빈그림*/}
                <Input style={{ width: 150 }} placeholder="이름" value={aboutMe.name} onChange={(e) => handleInputChange('name', e.target.value)} />
            </Row>
            <Row>
                <Icon src={birthdayIcon} alt="birthday" />
                <Input style={{ width: 125 }} placeholder="YYYY.MM.DD" value={aboutMe.birthday} onChange={(e) => handleInputChange('birthday', e.target.value)} />
                {error.birthday && <div style={{ fontSize: 13, color: 'rgba(202, 5, 5, 1)' }}>{error.birthday}</div>}
            </Row>
            <Row>
                <Icon src={phoneIcon} alt="phone" />
                <Input style={{ width: 300 }} placeholder="전화번호 ('-' 포함)" value={aboutMe.phoneNumber} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} />
                {error.phoneNumber && <div style={{ fontSize: 13, color: 'rgba(202, 5, 5, 1)' }}>{error.phoneNumber}</div>}
            </Row>
            <Row>
                <Icon src={emailIcon} alt="email" />
                <Input style={{ width: 300 }} placeholder="이메일" value={aboutMe.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                {error.email && <div style={{ fontSize: 13, color: 'rgba(202, 5, 5, 1)' }}>{error.email}</div>}
            </Row>
            <Row>
                <Icon src={githubIcon} alt="github" />
                <Input style={{ width: 300 }} placeholder="깃허브 주소" value={aboutMe.github} onChange={(e) => handleInputChange('github', e.target.value)} />
            </Row>
            <Row>
                <Icon src={blogIcon} alt="blog" />
                <Input style={{ width: 300 }} placeholder="블로그 주소" value={aboutMe.blog} onChange={(e) => handleInputChange('blog', e.target.value)} />
            </Row>
            <Row>
                <Input as="textarea" style={{ width: 600, height: 100, fontFamily: "inherit" }} placeholder="자기소개" value={aboutMe.introduction} onChange={(e) => handleInputChange('introduction', e.target.value)} />
            </Row>
            <div style={{ marginTop: 10 }}>
                <input type="file" onChange={handleImageChange} accept="image/*" />
                {imagePreviewUrl && (
                    <ImagePreview src={imagePreviewUrl} alt="Profile Image" />
                )}
            </div>
        </Border>
    );
};

export default AboutMeRecord;
