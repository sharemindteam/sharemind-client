import { deleteAuthQuit } from 'api/delete';
import { Button } from 'components/Common/Button';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Green, LightGreen, White } from 'styles/color';
import { checkedNumberState, quitLongReasonState } from 'utils/atom';
import { quitReasons } from 'utils/constant';
import { getCookie, removeCookie } from 'utils/cookie';
interface QuitFooterProps {
  reasonSelected: boolean;
  setReasonSelected: Dispatch<SetStateAction<boolean>>;
}
export const QuitFooter = ({
  reasonSelected,
  setReasonSelected,
}: QuitFooterProps) => {
  const navigate = useNavigate();
  const quitReasonInput = useRecoilValue<string>(quitLongReasonState);
  const checkedNumber = useRecoilValue<number>(checkedNumberState);
  const deleteAccount = async () => {
    try {
      const body = {
        shortReason: quitReasons[checkedNumber],
        longReason: quitReasonInput,
        accessToken: getCookie('accessToken'),
        refreshToken: getCookie('refreshToken'),
      };
      const res: any = await deleteAuthQuit(body);
      if (res.status === 200) {
        alert('탈퇴 완료되었습니다');
        removeCookie('accessToken');
        removeCookie('refreshToken');
        navigate('/share');
      } else if (res.response.status === 400) {
        alert(
          '미완료 상담이 있거나 환불금/정산금 남아있는 경우 회원 탈퇴가 제한됩니다.',
        );
        navigate('/mypage');
      }
    } catch (e) {
      alert(e);
    }
  };
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
            deleteAccount();
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
            if (!(checkedNumber >= 0 && checkedNumber <= 6)) {
              alert('탈퇴 사유를 선택해주세요');
            } else {
              setReasonSelected(true);
            }
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
  padding-top: 0.8rem;
  padding-bottom: 1.9rem;
  background-color: ${White};
`;
