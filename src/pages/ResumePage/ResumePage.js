import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './ResumePage.css';
import ResumeNav from "../../components/ResumeCommon/ResumeNav";
import styled from "styled-components";
import CategoryList from "../../components/ResumeCategory/CategoryList";
import FormContent from "../../components/ResumeForm/FormContent";
import { call } from "../../service/ApiService";
import { kogptService } from "../../service/kogptService";
import axios from "axios";

// ResumePage.js: 이력서 작성 페이지(/resumes/{resumeId})를 구성, 데이터 불러오기, 저장하기 등의 기능을 담당

const CategoryContainer = styled.div`
    margin-left: 20px;
    width: 400px;
    height: 630px;
    background-color: rgba(0, 30, 89, 1);
`;

const CategoryContainer2 = styled.div`
    width: 85%;
    height: 90%;
    background-color: white;
    border-radius: 5px;
`;

const Title = styled.h3`
    margin-top: 25px;
    margin-left: 25px;
    margin-bottom: 15px;
    background-color: white;
    color: black;
`;

const Line = styled.div`
    height: 1px;
    margin-left: 20px;
    width: 300px;
    background-color: rgba(0, 30, 89, 1);
`;

const ResumeTitle = styled.input`
    display: flex;
    align-items: center;
    width: 740px;
    height: 40px;
    font-size: 20px;
    padding: 10px;
    border-radius: 5px;
    border-color: rgba(89, 127, 200, 1);
    border-width: 3px;
    border-style: solid;
    line-height: 1.5;
    box-sizing: border-box;
`;

const Button = styled.button`
    display: none;
`;

function ResumePage({ baseUrl }) {
    const navigate = useNavigate();
    const { resumeId } = useParams();
    const [activeSections, setActiveSections] = useState([]);
    const [resumeTitle, setResumeTitle] = useState("");
    const [languages, setLanguages] = useState([]);
    const [awards, setAwards] = useState([]);
    const [skills, setSkills] = useState([]);
    const [careers, setCareers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [activities, setActivities] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [aboutMe, setAboutMe] = useState({});
    const [educations, setEducations] = useState([]);

    // 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}`, "GET");
                const { title, languages, awards, skills, careers, certificates, projects, activities, trainings, aboutMe, educations } = response;
                setResumeTitle(title || "");
                setLanguages(languages || []);
                setAwards(awards || []);
                setSkills(skills || []);
                setCareers(careers || []);
                setProjects(projects || []);
                setCertificates(certificates || []);
                setActivities(activities || []);
                setTrainings(trainings || []);
                setAboutMe(aboutMe || {});
                setEducations(educations || []);
                setActiveSections([
                    ...(languages.length ? ['Language'] : []),
                    ...(awards.length ? ['Award'] : []),
                    ...(skills.length ? ['Skill'] : []),
                    ...(careers.length ? ['Career'] : []),
                    ...(projects.length ? ['Project'] : []),
                    ...(certificates.length ? ['Certificate'] : []),
                    ...(activities.length ? ['Activity'] : []),
                    ...(trainings.length ? ['Training'] : []),
                    ...(aboutMe ? ['About Me'] : []),
                    ...(educations.length ? ['Education'] : [])
                ]);
            } catch (error) {
                console.error("Failed to fetch resume data", error);
            }
        };
        fetchData();
    }, [resumeId]);

    // 항목 변경
    const handleSectionChange = (sections) => {
        setActiveSections(sections); // 기존 섹션을 유지하고 새로운 섹션 추가/제거
    };

    // 제목 변경
    const handleTitleChange = (event) => {
        setResumeTitle(event.target.value);
    };

    // 전체 저장
    const handleSave = async () => {
        try {
            const data = {
                title: resumeTitle,
                languages: languages,
                awards: awards,
                skills: skills,
                careers: careers,
                projects: projects,
                certificates: certificates,
                activities: activities,
                trainings: trainings,
                aboutMe: aboutMe,
                educations: educations
            };

            await call(`/api/resumes/${resumeId}/save`, "POST", data);

            alert('전체 저장이 완료되었습니다.');
            navigate("/resumes");
        } catch (error) {
            console.error("Failed to save resume data", error);
        }
    };

    // PDF 인쇄, 저장, 미리보기
    const handlePrint = () => {
        window.print();
    };

    const handleRemoveBlankSection = (index) => {
        setActiveSections(prevSections => prevSections.filter((_, i) => i !== index));
    };

    const [prompt, setPrompt] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateText = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await kogptService(prompt);
            if (response && response.generations && response.generations.length > 0) {
                setGeneratedText(response.generations[0].text);
            } else {
                setGeneratedText('No text generated.');
            }
        } catch (error) {
            setError('텍스트 생성 중 오류가 발생했습니다.');
            console.error('API call error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="app">
            <div className="nav">
                <ResumeNav defaultActive="작성" handleSave={handleSave} handlePrint={handlePrint} />
            </div>
            <div style={{ display: 'flex' }}>
                <div className="category-container">
                    <CategoryContainer style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                        <CategoryContainer2>
                            <Title>이력서 항목</Title>
                            <Line />
                            <CategoryList onSectionChange={handleSectionChange} activeSections={activeSections}></CategoryList>
                        </CategoryContainer2>
                    </CategoryContainer>
                    <div style={{width: 300, textAlign: 'center', marginLeft: 50, marginTop: 15 }}>
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter your prompt here"
                        />
                        <button onClick={generateText} disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Generate Text'}
                        </button>
                        {generatedText && <p>Generated Text: {generatedText}</p>}
                        {error && <p>Error: {error}</p>}
                    </div>
                </div>
                <div className="form-container">
                    <div id="printContent" style={{ width: '100%',  background: 'white', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30, marginBottom: 10 }}>
                            <ResumeTitle type="text" value={resumeTitle} onChange={handleTitleChange} placeholder="이력서 제목 (저장용)" />
                        </div>
                        <FormContent
                            activeSections={activeSections}
                            setActiveSections={setActiveSections}
                            languages={languages} setLanguages={setLanguages}
                            awards={awards} setAwards={setAwards}
                            skills={skills} setSkills={setSkills}
                            careers={careers} setCareers={setCareers}
                            projects={projects} setProjects={setProjects}
                            certificates={certificates} setCertificates={setCertificates}
                            activities={activities} setActivities={setActivities}
                            trainings={trainings} setTrainings={setTrainings}
                            aboutMe={aboutMe} setAboutMe={setAboutMe}
                            educations={educations} setEducations={setEducations}
                            resumeId={resumeId}
                            onRemoveBlankSection={handleRemoveBlankSection}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumePage;

