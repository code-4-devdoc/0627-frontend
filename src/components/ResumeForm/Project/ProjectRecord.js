import React, {useMemo, useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import CheckboxLabels from "../../ResumeCommon/CheckboxLabels";
import SkillSearchComponent from "../SearchSkills/SkillSearchComponent";
import { call } from "../../../service/ApiService";
import ReactQuill from "react-quill";

const GlobalStyle = createGlobalStyle`
  @media print {
      .add-quill-btn,
      .ql-toolbar {
          display: none !important;
      }
      .ql-container.ql-snow {
          border: none !important;
          height: auto !important;
          overflow: hidden !important;
      }
      .ql-editor {
          height: auto !important;
          overflow: hidden !important;
      }
      .print-border {
          height: auto !important;
          min-height: auto !important;
      }
      .border-no-quill {
          height: 160px !important;
      }
      .border-with-quill {
          height: 210px !important;
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
    height: ${(props) => (props.quill ? '298px' : '195px')};
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
`;

const Button = styled.div`
    min-width: 625px;
    min-height: 25px;
    max-height: 25px;
    max-width: 625px;
    padding: 5px;
    border: none;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    background-color: ${(props) => (props.quill ? 'rgba(175, 175, 175, 1)' : 'rgba(129, 172, 255, 1)')};
    cursor: pointer;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
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

const ProjectRecord = ({ index, project, onRemove, onUpdate, resumeId }) => {
    const checkboxOption = "진행 중";
    const [isChecked, setIsChecked] = useState(project.isCurrent);

    const [error, setError] = useState('');
    const [quill, setQuill] = useState(false);

    const handleInputChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    const handleStartDateChange = (value) => {
        handleInputChange('startDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    const handleEndDateChange = (value) => {
        handleInputChange('endDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onUpdate(index, 'isCurrent', checked);
        if (checked) {
            onUpdate(index, 'endDate', ''); // 현재 진행 중이라면 종료일 제거
        }
    };

    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/projects/${project.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete project data", error);
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

    const handleQuill = () => {
        setQuill(prevQuill => !prevQuill);
    }

    return (
        <>
            <GlobalStyle />
        <Border quill={quill} className={`print-border ${quill ? "border-with-quill" : "border-no-quill"}`}>
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
                <Input style={{ width: 150 }} placeholder="프로젝트명" value={project.title} onChange={(e) => onUpdate(index, 'title', e.target.value)} />
                <Input style={{ width: 70 }} placeholder="YYYY.MM" value={project.startDate} onChange={(e) => handleStartDateChange(e.target.value)} />
                <span>-</span>
                <Input
                    style={{ width: 70 }}
                    placeholder={isChecked ? "N/A" : "YYYY.MM"}
                    disabled={isChecked}
                    value={isChecked ? "N/A" : project.endDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                />
                <CheckboxLabels option={checkboxOption} checked={isChecked} onChange={handleCheckboxChange}></CheckboxLabels>
            </div>
            {error && <div style={{ fontSize: 13, color: 'rgba(202, 5, 5, 1)' }}>{error}</div>}
            <Input style={{ width: 620, marginTop: 5 }} placeholder="프로젝트 소개" value={project.intro} onChange={(e) => onUpdate(index, 'intro', e.target.value)} />
            <div style={{ height: 5 }}></div>
            <SkillSearchComponent 
                    singleSelection={true}
                    selectedSkills={project.techStack || ""}
                    onSkillChange={(projects) => handleInputChange('techStack', projects)}
                />
            {/*<Input as="textarea"*/}
            {/*    style={{ marginTop: 5, width: 620, height: 60, fontFamily: "inherit" }}*/}
            {/*    placeholder="부연 설명을 입력하세요."*/}
            {/*    value={project.description}*/}
            {/*    onChange={(e) => onUpdate(index, 'description', e.target.value)}*/}
            {/*/>*/}
            <div style={{ marginLeft: -40, marginTop: 5, justifyContent:'center', alignItems:'center', display:'flex', flexDirection:'column'}}>
                <Button className="add-quill-btn" onClick={handleQuill} quill={quill}>{ quill ? "상세 설명 제거" : "상세 설명 추가"}</Button>
                {quill && <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    style={{width: 630, height:60, marginTop:3}}
                    onChange={(content) => onUpdate(index, 'description', content)}
                    value={project.description}
                />}
            </div>
        </Border>
        </>
    );
}

export default ProjectRecord;
