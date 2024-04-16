import {
  getAdminsPedningProfilse,
  getAdminsRefundWaiting,
  getAdminsUnpaidConsults,
  getAdminsUnpaidPosts,
} from 'api/get';
import {
  patchAdminsPendingProfiles,
  patchAdminsRefundWaiting,
  patchAdminsUnpaidConsults,
  patchAdminsUnpaidPosts,
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

type OpenPay = {
  postId: number;
  customerName: string;
  cost: number;
  isPublic: boolean;
  createdAt: string;
};
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
interface Refund {
  paymentId: number;
  customerNickname: string;
  counselorNickname: string;
  status: string;
  consultType: string;
  consultedAt: string;
  cost: number;
  paidAt: string;
  method: string;
}
export const Admin = () => {
  const navigate = useNavigate();
  const [consultData, setConsultData] = useState<PayArray>([]);
  const [openConsultData, setOpenConsultData] = useState<OpenPay[]>([]);
  console.log(openConsultData);
  const [profileData, setProfileData] = useState<Counselor[]>([]);
  const [refundData, setRefundData] = useState<Refund[]>([]);
  const [valid, setValid] = useState<boolean>(false);
  // 0 : 결제관리(consult) 1: 마인더인증 관리(counselor) 2: 환불 관리 (refund)
  const [pageState, setPageState] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      if (pageState === 0) {
        //상담 결제 관리
        try {
          const res: any = await getAdminsUnpaidConsults();
          const res2: any = await getAdminsUnpaidPosts();
          if (res.status === 200 && res2.status === 200) {
            setConsultData(res.data);
            setOpenConsultData(res2.data);
            setValid(true);
          } else if (
            res.response.status === 403 ||
            res2.response.status === 403
          ) {
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
      } else if (pageState === 2) {
        //상담사 프로필 심사
        try {
          const res: any = await getAdminsRefundWaiting();
          if (res.status === 200) {
            setRefundData(res.data);
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
  const handleOpenConsultComplete = async (postId: number) => {
    try {
      const res: any = await patchAdminsUnpaidPosts(postId);
      if (res.status === 200) {
        alert('성공적으로 처리되었습니다.');
        const newData = openConsultData.filter(
          (iter) => iter.postId !== postId,
        );
        setOpenConsultData(newData);
      } else if (res.response.status === 400) {
        alert('이미 결제 완료된 상담입니다.');
      } else if (res.response.status === 404) {
        alert('존재하지 않는 상담 아이디로 요청되었습니다.');
      }
    } catch (err) {
      alert('요청 도중 오류가 발생하였습니다.');
    }
  };
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
  const handleRefundComplete = async (paymentId: number) => {
    try {
      const res: any = await patchAdminsRefundWaiting(paymentId);
      if (res.status === 200) {
        alert('성공적으로 처리되었습니다.');
        const newData = refundData.filter(
          (iter) => iter.paymentId !== paymentId,
        );
        setRefundData(newData);
      } else if (res.response.status === 400) {
        alert('환불 예정 상태가 아닌 결제에 대한 요청입니다.');
      } else if (res.response.status === 404) {
        alert('존재하지 않는 결제 아이디로 요청되었습니다.');
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
            <Button
              text="환불 예정 결제 정보"
              backgroundColor={LightGreen}
              color={Green}
              onClick={() => {
                setPageState(2);
              }}
            />
          </ButtonWrapper>
          {openConsultData.map((value) => {
            return (
              <Box>
                <Caption1>{`게시물 ID : ${value.postId}`}</Caption1>
                <Caption1>{`구매자 이름 : ${value.customerName}`}</Caption1>
                <Caption1>{`공개 여부 : ${
                  value.isPublic ? '공개' : '비공개'
                }`}</Caption1>
                <Caption1>{`가격 : ${value.cost.toLocaleString()}`}</Caption1>
                <Caption1>{`createdAt : ${value.createdAt}`}</Caption1>
                <Button
                  text="결제완료"
                  margin="1rem 0 0 0"
                  onClick={() => {
                    handleOpenConsultComplete(value.postId);
                  }}
                />
              </Box>
            );
          })}
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
            <Button
              text="환불 예정 결제 정보"
              backgroundColor={LightGreen}
              color={Green}
              onClick={() => {
                setPageState(2);
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
    } else if (pageState === 2) {
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
            <Button
              text="환불 예정 결제 정보"
              backgroundColor={LightGreen}
              color={Green}
              onClick={() => {
                setPageState(2);
              }}
            />
          </ButtonWrapper>
          {refundData.map((value) => {
            return (
              <Box key={value.paymentId}>
                <Caption1>{`결제 ID : ${value.paymentId}`}</Caption1>
                <Line />
                <Caption1>{`구매자 이름 : ${value.customerNickname}`}</Caption1>
                <Line />
                <Caption1>{`상담사 이름 : ${value.counselorNickname}`}</Caption1>
                <Line />
                <Caption1>{`상담 상태 : ${value.status}`}</Caption1>
                <Line />
                <Caption1>{`상담 타입 : ${value.consultType}`}</Caption1>
                <Line />
                <Caption1>{`상담 일시 : ${value.consultedAt}`}</Caption1>
                <Line />
                <Caption1>{`가격 : ${value.cost}`}</Caption1>
                <Line />
                <Caption1>{`결제 일시 : ${value.paidAt}`}</Caption1>
                <Line />
                <Caption1>{`결제 방식 : ${value.method}`}</Caption1>
                <Line />
                <Button
                  text="환불 승인"
                  margin="1rem 0 0 0"
                  onClick={() => {
                    handleRefundComplete(value.paymentId);
                  }}
                />
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
