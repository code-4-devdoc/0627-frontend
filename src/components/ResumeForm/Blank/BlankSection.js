import React from 'react';
import styled from 'styled-components';

const BlankSectionContainer = styled.div`
    height: 100px; // 빈 공간의 높이
    width: 800px;
    position: relative;
    margin-bottom: 20px; // 항목들 사이에 일정 간격 추가
    
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover .hover-content {
        display: block; // 마우스를 올렸을 때 안내문구 및 버튼 표시
    }
`;

const HoverContent = styled.div`
    display: none;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const RemoveButton = styled.button`
    margin-top: 10px;
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
`;

const BlankSection = ({ onRemove }) => {
    return (
        <BlankSectionContainer>
            <HoverContent className="hover-content">
                <div>PDF 출력 시 페이지와 페이지 사이의 항목 잘림을 방지하기 위해 추가하는 빈 항목</div>
                <RemoveButton onClick={onRemove}>삭제</RemoveButton>
            </HoverContent>
        </BlankSectionContainer>
    );
};

export default BlankSection;

