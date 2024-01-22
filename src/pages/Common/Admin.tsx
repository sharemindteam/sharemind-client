import { getAdminsPedningProfilse, getAdminsUnpaidConsults } from 'api/get';
import {
  patchAdminsPendingProfiles,
  patchAdminsUnpaidConsults,
} from 'api/patch';
import { Button } from 'components/Common/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey5, LightGreen } from 'styles/color';
import { Caption1, Heading } from 'styles/font';
type Pay = {
  consultId: number;
  consultType: string;
  cost: number;
  counselorName: string;
  createdAt: string;
  customerName: string;
};
type PayArray = Pay[];
type ConsultTimes = {
  [day: string]: string[];
};

type ConsultCosts = {
  [consultType: string]: number;
};
type Counselor = {
  consultCategories: string[];
  consultCosts: ConsultCosts;
  consultStyle: string;
  consultTimes: ConsultTimes;
  consultTypes: string[];
  counselorId: number;
  experience: string;
  introduction: string;
  nickname: string;
};
export const Admin = () => {
  const navigate = useNavigate();
  const [consultData, setConsultData] = useState<PayArray>([]);
  const [profileData, setProfileData] = useState<Counselor[]>([]);
  const [valid, setValid] = useState<boolean>(false);
  // 0 : 결제관리(consult) 1: 마인더인증 관리(counselor)
  const [pageState, setPageState] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      if (pageState === 0) {
        //상담 결제 관리
        try {
          const res: any = await getAdminsUnpaidConsults();
          if (res.status === 200) {
            setConsultData(res.data);
            setValid(true);
          } else if (res.response.status === 403) {
            alert('접근 권한이 없습니다.');
            navigate('/login');
          }
        } catch (e) {
          alert('조회 도중 오류가 발생하였습니다.');
        }
      } else if (pageState === 1) {
        //상담사 프로필 심사
        //여기 테스트할 수가 없어서 후순위
        try {
          const res: any = await getAdminsPedningProfilse();
          if (res.status === 200) {
            setProfileData(res.data);
            setValid(true);
          } else if (res.response.status === 403) {
            alert('접근 권한이 없습니다.');
            navigate('/login');
          }
        } catch (e) {
          alert('조회 도중 오류가 발생하였습니다.');
        }
      }
    };
    fetchData();
  }, [pageState]);
  const handleConsultComplete = async (consultId: number) => {
    try {
      const res: any = await patchAdminsUnpaidConsults(consultId);
      if (res.status === 200) {
        alert('성공적으로 처리되었습니다.');
        const newData = consultData.filter(
          (iter) => iter.consultId !== consultId,
        );
        setConsultData(newData);
      } else if (res.response.status === 400) {
        alert('이미 결제 완료된 상담입니다.');
      } else if (res.response.status === 404) {
        alert('존재하지 않는 상담 아이디로 요청되었습니다.');
      }
    } catch (e) {
      alert('요청 도중 오류가 발생하였습니다.');
    }
  };
  const handleCounselorComplete = async (
    counselorId: number,
    isPassed: boolean,
  ) => {
    const params = {
      isPassed: isPassed,
    };
    try {
      const res: any = await patchAdminsPendingProfiles(counselorId, {
        params,
      });
      if (res.status === 200) {
        alert('성공적으로 처리되었습니다.');
        const newData = profileData.filter(
          (iter) => iter.counselorId !== counselorId,
        );
        setProfileData(newData);
      } else if (res.response.status === 400) {
        alert('이미 결제 완료된 상담입니다.');
      } else if (res.response.status === 404) {
        alert('존재하지 않는 상담 아이디로 요청되었습니다.');
      }
    } catch (e) {
      alert('요청 도중 오류가 발생하였습니다.');
    }
  };
  if (valid === true) {
    if (pageState === 0) {
      return (
        <>
          <Heading color={Green} padding="0.5rem">
            admin 페이지
          </Heading>
          <ButtonWrapper>
            <Button
              text="결제 승인"
              backgroundColor={LightGreen}
              color={Green}
              onClick={() => {
                setPageState(0);
              }}
            />
            <Button
              text="상담사 프로필 승인"
              backgroundColor={LightGreen}
              color={Green}
              onClick={() => {
                setPageState(1);
              }}
            />
          </ButtonWrapper>
          {consultData.map((value) => {
            return (
              <Box>
                <Caption1>{`상담ID : ${value.consultId}`}</Caption1>
                <Caption1>{`셰어 이름 : ${value.customerName}`}</Caption1>
                <Caption1>{`마인더 이름 : ${value.counselorName}`}</Caption1>
                <Caption1>{`상담 타입 : ${value.consultType}`}</Caption1>
                <Caption1>{`가격 : ${value.cost.toLocaleString()}`}</Caption1>
                <Caption1>{`createdAt : ${value.createdAt}`}</Caption1>
                <Button
                  text="결제완료"
                  margin="1rem 0 0 0"
                  onClick={() => {
                    handleConsultComplete(value.consultId);
                  }}
                />
              </Box>
            );
          })}
        </>
      );
    } else if (pageState === 1) {
      return (
        <>
          <Heading color={Green} padding="0.5rem">
            admin 페이지
          </Heading>
          <ButtonWrapper>
            <Button
              text="결제 승인"
              backgroundColor={LightGreen}
              color={Green}
              onClick={() => {
                setPageState(0);
              }}
            />
            <Button
              text="상담사 프로필 승인"
              backgroundColor={LightGreen}
              color={Green}
              onClick={() => {
                setPageState(1);
              }}
            />
          </ButtonWrapper>
          {profileData.map((value) => {
            return (
              <Box key={value.counselorId}>
                <Caption1>{`마인더 ID : ${value.counselorId}`}</Caption1>
                <Line />
                <Caption1>{`상담 카테고리 : ${value.consultCategories}`}</Caption1>
                <Line />
                <Caption1>{`상담스타일 : ${value.consultStyle}`}</Caption1>
                <Line />
                <Caption1>{`상담 시간:`}</Caption1>
                {Object.keys(value.consultTimes).map((day) => (
                  <div key={day}>
                    <Caption1>{`${day}: ${value.consultTimes[day].join(
                      ', ',
                    )}`}</Caption1>
                  </div>
                ))}
                <Line />
                <Caption1>{`상담 타입 : ${value.consultTypes}`}</Caption1>
                <Line />
                <Caption1>{`상담 가격:`}</Caption1>
                {Object.keys(value.consultCosts).map((type) => (
                  <div key={type}>
                    <Caption1>{`${type}: ${value.consultCosts[type]}`}</Caption1>
                  </div>
                ))}
                <Line />
                <Caption1>{`경험: ${value.experience}`}</Caption1>
                <Line />
                <Caption1>{`소개: ${value.introduction}`}</Caption1>
                <Line />
                <Caption1>{`닉네임: ${value.nickname}`}</Caption1>
                <Line />
                <ButtonWrapper>
                  <Button
                    text="승인"
                    margin="1rem 0 0 0"
                    onClick={() => {
                      handleCounselorComplete(value.counselorId, true);
                    }}
                  />
                  <Button
                    text="거부"
                    margin="1rem 0 0 0"
                    onClick={() => {
                      handleCounselorComplete(value.counselorId, false);
                    }}
                  />
                </ButtonWrapper>
              </Box>
            );
          })}
        </>
      );
    }
  } else {
    <>
      <Heading color={Green}>admin 페이지</Heading>
      <Caption1>잘못된 접근입니다.</Caption1>
    </>;
  }
};
const Box = styled.div`
  padding: 1rem;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 1rem;
`;
const Line = styled.div`
  width: 100%;
  height: 0.2rem;
  background-color: ${Grey5};
`;
