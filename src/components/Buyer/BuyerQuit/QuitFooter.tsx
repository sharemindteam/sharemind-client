import { Button } from 'components/Common/Button';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, LightGreen } from 'styles/color';
interface QuitFooterProps {
  reasonSelected: boolean;
  setReasonSelected: Dispatch<SetStateAction<boolean>>;
}
export const QuitFooter = ({
  reasonSelected,
  setReasonSelected,
}: QuitFooterProps) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Button
        text="취소"
        width="16rem"
        height="5.2rem"
        onClick={() => {
          navigate('/setting');
        }}
      />
      {reasonSelected ? (
        <Button
          text="탈퇴하기"
          width="16rem"
          height="5.2rem"
          backgroundColor={LightGreen}
          color={Green}
          onClick={() => {
            navigate('/mypage');
          }}
        />
      ) : (
        <Button
          text="다음"
          width="16rem"
          height="5.2rem"
          backgroundColor={LightGreen}
          color={Green}
          onClick={() => {
            setReasonSelected(true);
          }}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  position: fixed;
  bottom: 0;
  gap: 1.5rem;
  margin-bottom: 1.9rem;
`;
