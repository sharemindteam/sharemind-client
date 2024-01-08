import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { Black, Grey3, Grey5, Grey6, Green, Whit, Greene, White } from 'styles/color';
import { Button2 } from 'styles/font';
import { ReactComponent as DownArrowIcon } from 'assets/icons/sorting-down-arrow.svg';

interface ManagementStatusSelectorProps {
  manageStatus: string;
  setManageStatus: React.Dispatch<React.SetStateAction<string>>;
}
export const ManagementStatusSelector = ({
  manageStatus,
  setManageStatus,
}: ManagementStatusSelectorProps) => {
  return (
    <ManagementStatusSelectorWrapper>
      <Button
        text="완료"
        backgroundColor={manageStatus === '완료' ? Green : Grey5}
        onClick={() => {
          setManageStatus('완료');
        }}
        color={manageStatus === '완료' ? White : Black}
        buttonTextType={2}
        width="5.7rem"
        height="3.4rem"
      />
      <Button
        text="진행 중"
        backgroundColor={manageStatus === '진행 중' ? Green : Grey5}
        onClick={() => {
          setManageStatus('진행 중');
        }}
        color={manageStatus === '진행 중' ? White : Black}
        buttonTextType={2}
        width="7.2rem"
        height="3.4rem"
      />
      <Button
        text="정산 예정"
        backgroundColor={manageStatus === '정산 예정' ? Green : Grey5}
        onClick={() => {
          setManageStatus('정산 예정');
        }}
        color={manageStatus === '정산 예정' ? White : Black}
        buttonTextType={2}
        width="7.8rem"
        height="3.4rem"
      />
      <SortingType>
        <Button2 color={Grey3}>최근 1개월</Button2>
        <DownArrowIcon />
      </SortingType>
    </ManagementStatusSelectorWrapper>
  );
};
const ManagementStatusSelectorWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 0.4rem 2rem;
  align-items: center;
  border-bottom: 1px solid ${Grey6};
`;

const SortingType = styled.div`
  display: flex;
  padding: 1rem 0.5rem;
  cursor: pointer;
  align-items: center;
  gap: 0.4rem;
`;
