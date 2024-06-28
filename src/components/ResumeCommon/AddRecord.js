import React from "react";
import styled from "styled-components";

const AddButton = styled.button`
    width: 20px;
    height: 20px;
    background-color: rgba(90, 214, 169, 1);
    color: white;
    border-radius: 50%;
    border: none;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Container = styled.div`
    display: flex;
    align-items: center;

    @media print {
        display: none; /* 인쇄 시 숨김 */
    }
`;

const AddRecord = ({ fieldName, onClick }) => {
    return (
        <Container>
            <AddButton onClick={onClick}>+</AddButton>
            <span style={{ marginLeft: 10, fontWeight: 600 }}>{fieldName} 추가</span>
        </Container>
    );
};

export default AddRecord;
