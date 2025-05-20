import styled from 'styled-components';
import { ReactNode } from 'react';

export const Wrapper = styled.div`
  max-width: 1100px;
  background: #ebfeff;
  border-radius: 10px;
  border: 2px solid #0085a3;
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  text-align: center;

  p {
    font-size: 1rem;
  }
`;

interface ButtonWrapperProps {
  correct: boolean;
  userClicked: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children?: ReactNode;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  cursor: pointer;
  user-select: none;
  font-size: 0.8rem;
  width: 100%;
  height: 40px;
  margin: 5px 0;
  padding: 5px;
  border-radius: 10px;
  transition: all 0.3s ease;

  ${({ correct, userClicked }) => {
    return correct 
      ? `background: linear-gradient(90deg, #56FFA4, #59BC86)`
      : !correct && userClicked 
      ? `background: linear-gradient(90deg, #FF5656, #C16868)`
      : `background: linear-gradient(90deg, #56ccff, #6eafb4)`;
  }}

  border: 3px solid #ffffff;
  box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
  color: black;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
`;

// Remove the redundant ButtonWrapperHover component
// The hover effect is already defined in ButtonWrapper
// export const ButtonWrapperHover = styled(ButtonWrapper)`
//   :hover {
//     opacity: 0.8;
//   }
// `;