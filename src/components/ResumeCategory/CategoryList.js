import React, { useState, useEffect } from 'react';

// 섹션 목록 정의
const sections = [
<<<<<<< HEAD
    { name: 'AboutMe', detail: '프로필', isOpen: false },
    { name: 'Skill', detail: '기술 스택', isOpen: false },
    { name: 'Education', detail: '학력', isOpen: false },
    { name: 'Career', detail: '경력', isOpen: false },
    { name: 'Project', detail: '프로젝트', isOpen: false },
    { name: 'Training', detail: '교육 이수', isOpen: false },
    { name: 'Activity', detail: '대외 활동', isOpen: false },
    { name: 'Award', detail: '수상 이력', isOpen: false },
    { name: 'Certificate', detail: '자격증', isOpen: false },
    { name: 'Language', detail: '어학', isOpen: false }
=======
    { name: 'About Me', detail: '프로필' },
    { name: 'Skill', detail: '기술 스택' },
    { name: 'Education', detail: '학력' },
    { name: 'Career', detail: '경력' },
    { name: 'Project', detail: '프로젝트' },
    { name: 'Training', detail: '교육 이수' },
    { name: 'Activity', detail: '대외 활동' },
    { name: 'Award', detail: '수상 이력' },
    { name: 'Certificate', detail: '자격증' },
    { name: 'Language', detail: '어학' },
    { name: 'Blank', detail: '빈 항목' } // 빈 항목 추가
>>>>>>> 4572ddda91c4f675b5390fe7135441028fd3be9f
];

const CategoryList = ({ onSectionChange, activeSections }) => {
    // 섹션 상태 관리
    const [sectionStates, setSectionStates] = useState([]);

    useEffect(() => {
        // 초기 로드 시 activeSections를 sectionStates로 설정
        setSectionStates(activeSections);
    }, [activeSections]);

    // 섹션 토글 함수
    const toggleSection = (section) => {
        let newSections;
        if (sectionStates.includes(section)) {
            newSections = sectionStates.filter(item => item !== section);
        } else {
            newSections = [...sectionStates, section];
        }
        setSectionStates(newSections);
        onSectionChange(newSections);
    };

    return (
        <div className="category-list">
            {sections.map((section) => (
                <div key={section.name} className="category-list-item">
                    <span style={{ width: 100, fontWeight: 'bold' }}>{section.name}</span>
                    <span style={{ width: 80, textAlign: 'left' }}>{section.detail}</span>
                    <button
                        className={sectionStates.includes(section.name) ? 'button-minus' : 'button-plus'}
                        onClick={() => toggleSection(section.name)}
                    >
                        {sectionStates.includes(section.name) ? '-' : '+'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;