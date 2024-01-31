import styled from 'styled-components';
import { Red } from 'styles/color';
import { Body1, Subtitle } from 'styles/font';
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
  if (!isLogined || data === undefined) {
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
        {data.totalOngoing !== 0 && (
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
  margin-bottom: 1.2rem;
  .nav-consult {
    width: 100%;
    height: 4.4rem;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 0.4rem;
  }
`;
const NavConsult = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.9rem;
  margin-left: 2rem;
`;
const MoreIcon = styled(More)`
  margin-right: 3.8rem;
  margin-top: 1.5rem;
`;
