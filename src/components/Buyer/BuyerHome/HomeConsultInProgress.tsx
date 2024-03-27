import styled from 'styled-components';
import { Grey4, Red } from 'styles/color';
import { Body1, Body3, Subtitle } from 'styles/font';
import { ReactComponent as More } from 'assets/icons/icon-more.svg';
import { ConsultCard } from '../Common/ConsultCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getConsultsCustomers } from 'api/get';
interface Response {
  id: number;
  consultStyle: string;
  status: string;
  opponentNickname: string;
  latestMessageUpdatedAt: string;
  latestMessageContent: string;
  latestMessageIsCustomer: boolean;
  unreadMessageCount: number;
  reviewCompleted: boolean;
  consultId: number;
  isChat: boolean;
}

interface Data {
  totalOngoing: number;
  responses: Response[];
}
export const HomeConsultInProgress = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Data>();
  const [isLogined, setIsLogined] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const res: any = await getConsultsCustomers();
      if (res.status === 200) {
        setData(res.data);
        setIsLogined(true);
      } else if (res.response.status === 401) {
        setIsLogined(false);
      }
    };
    fetchData();
  }, []);
  //  || data === undefined
  if (!isLogined || !data || !data.responses) {
    return <></>;
  } else {
    return (
      <Wrapper>
        <div
          className="nav-consult"
          onClick={() => {
            navigate('/consult');
          }}
        >
          <NavConsult>
            <Subtitle>진행 중인 상담</Subtitle>
            {/* 나중에 api */}
            <Body1 color={Red}>{data.totalOngoing}</Body1>
          </NavConsult>
          <MoreIcon />
        </div>
        {data.totalOngoing === 0 && (
          <div style={{ paddingLeft: '2rem', alignSelf: 'flex-start' }}>
            <Body3 color={Grey4}>진행중인 상담이 없어요.</Body3>
          </div>
        )}
        {data.totalOngoing !== 0 && data.responses[0] && (
          <ConsultCard
            consultStyle={data.responses[0].consultStyle}
            id={data.responses[0].id}
            latestMessageContent={data.responses[0].latestMessageContent}
            latestMessageIsCustomer={data.responses[0].latestMessageIsCustomer}
            latestMessageUpdatedAt={data.responses[0].latestMessageUpdatedAt}
            opponentNickname={data.responses[0].opponentNickname}
            status={data.responses[0].status}
            unreadMessageCount={data.responses[0].unreadMessageCount}
            reviewCompleted={data.responses[0].reviewCompleted}
            consultId={data.responses[0].consultId}
            isLetter={!data.responses[0].isChat}
          />
        )}
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1.2rem 0 2.2rem;
  .nav-consult {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 2.2rem 3.2rem 1.2rem 2rem;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-bottom: 0.4rem;
  }
`;
const NavConsult = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0px auto 0px 0px
`;
const MoreIcon = styled(More)`
`;
