import { getAdmins } from 'api/get';
import { patchAdmins } from 'api/patch';
import { Button } from 'components/Common/Button';
import Input from 'components/Common/Input';
import { useInput } from 'hooks/useInput';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Green } from 'styles/color';
import { Caption1, Caption2, Heading } from 'styles/font';
type Pay = {
  consultId: number;
  consultType: string;
  cost: number;
  counselorName: string;
  createdAt: string;
  customerName: string;
};
type PayArray = Pay[];
export const Admin = () => {
  const [data, setData] = useState<PayArray>([]);
  const [valid, setValid] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await getAdmins();
        if (res.status === 200) {
          setData(res.data);
          setValid(true);
        } else if (res.response.status === 403) {
          alert('접근 권한이 없습니다.');
        }
      } catch (e) {
        alert('조회 도중 오류가 발생하였습니다.');
      }
    };
    fetchData();
  }, []);
  const handleComplete = async (consultId: number) => {
    try {
      const res: any = await patchAdmins(consultId);
      if (res.status === 200) {
        alert('성공적으로 처리되었습니다.');
        const newData = data.filter((iter) => iter.consultId !== consultId);
        setData(newData);
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
    return (
      <>
        <Heading color={Green} padding="0.5rem">
          admin 페이지
        </Heading>
        {data.map((value) => {
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
                  handleComplete(value.consultId);
                }}
              />
            </Box>
          );
        })}
      </>
    );
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
`;
