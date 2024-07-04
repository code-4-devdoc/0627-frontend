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
import {TextField, Button, CircularProgress, Typography, Box, Paper, Collapse, IconButton} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import kakaoBrainLogo from '../../assets/kakaobrain-logo.png';

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


const GptContainer = styled.div`
    background-color: white;
    width: 370px;
    margin-left: 20px;
    text-align: center;
    margin-top: 10px;
    padding: 10px;
    border-radius: 20px;
    border-color: #FFECAD;
    border-width: thick;
    border-style: solid;
`

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
            console.log(data)

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
    const [maxTokens, setMaxTokens] = useState(50); // default value for maxTokens
    const [generatedText, setGeneratedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPromptGuide, setShowPromptGuide] = useState(false);
    const [guideText, setGuideText] = useState('');

    const generateText = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await kogptService(prompt, maxTokens);
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


    const promptExamples = [
        `KoGPT를 사용하여 경력 항목을 작성하려면 다음과 같은 프롬프트를 사용해 보세요:
        "...(경력 요약)... 위와 같은 내용을 바탕으로 이전 직장에서 맡았던 역할과 주요 성과를 설명해 주세요."`,
        `KoGPT를 사용하여 기술 항목을 작성하려면 다음과 같은 프롬프트를 사용해 보세요:
        "...(기술 요약)... 위와 같은 내용을 바탕으로 보유한 기술과 사용 경험을 간략히 나열해 주세요."`,
        `KoGPT를 사용하여 프로젝트 항목을 작성하려면 다음과 같은 프롬프트를 사용해 보세요:
        "...(프로젝트 요약)... 위와 같은 내용을 바탕으로 참여한 프로젝트의 이름, 기간, 사용 기술, 그리고 나의 기여도를 설명해 주세요."`,
        `KoGPT를 사용하여 수상 경력 항목을 작성하려면 다음과 같은 프롬프트를 사용해 보세요:
        "...(수상 경력 요약)... 위와 같은 내용을 바탕으로 수상한 경력과 관련된 세부 사항을 제공해 주세요."`,
        `KoGPT를 사용하여 [ ] 항목을 작성하려면 다음과 같은 프롬프트를 사용해 보세요:
        "...([ ] 요약)... 위와 같은 내용을 바탕으로 [ ] 주세요."`
    ];

    const togglePromptGuide = () => {
        setShowPromptGuide(!showPromptGuide);
        if (!showPromptGuide) {
            setGuideText(promptExamples[Math.floor(Math.random() * promptExamples.length)]);
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
                    <GptContainer>
                        <div style={{marginTop: 20}}>
                            <img style={{width: 100}} src={kakaoBrainLogo} alt="logo"/>
                        </div>
                        <Box sx={{ width: 312, textAlign: 'center', marginLeft: 4, marginTop: 2 }}>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width:300, marginBottom: 1, marginLeft:1}}>
                                <Typography variant="body1" sx={{ fontSize: 17, fontWeight: 'bold' }}>질문 프롬프트 작성 가이드</Typography>
                                <IconButton onClick={togglePromptGuide}>
                                    {showPromptGuide ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                            </Box>
                            <Collapse in={showPromptGuide}>
                                <Paper elevation={1} sx={{ padding: 3, marginTop: 0, backgroundColor: '#FFFAEB', marginBottom:3 }}>
                                    <Typography variant="body2">
                                        {guideText}
                                    </Typography>
                                </Paper>
                            </Collapse>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="KoGPT에게 질문해보세요."
                                sx={{ marginBottom: 2 , width: 255 }}
                            />
                            <TextField
                                type="number"
                                variant="outlined"
                                value={maxTokens}
                                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                                placeholder="답변 길이 설정"
                                sx={{ width: 150, marginBottom: 2 }}
                            />
                            <Button
                                style={{marginLeft: 10, marginTop: 2, fontWeight:'bold'}}
                                variant="contained"
                                color="primary"
                                onClick={generateText}
                                disabled={isLoading}
                                sx={{ fontSize: 15, height: 50, backgroundColor: '#FFB900', color: '#fff', '&:hover': { backgroundColor: '#FFAA00' } }}
                            >
                                {isLoading ? <CircularProgress size={24} /> : '답변 생성'}
                            </Button>
                            {generatedText && (
                                <Paper variant="outlined" elevation={3} sx={{ padding: 2, marginTop: 2, marginBottom: 2, borderColor:'#FFF0DE', borderWidth: 2, backgroundColor:'#FFF6EC' }}>
                                    <Typography variant="body1">{generatedText}</Typography>
                                </Paper>
                            )}
                            {error && (
                                <Typography variant="body1" color="error">{error}</Typography>
                            )}
                        </Box>
                    </GptContainer>
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

