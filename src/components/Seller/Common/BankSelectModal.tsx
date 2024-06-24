import React from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Grey4, Grey6 } from 'styles/color';
import { Body1 } from 'styles/font';
import { BankIcon } from 'utils/BankIcon';
import { isBankModalOpenState } from 'utils/atom';
import { bankNameList } from 'utils/constant';
interface BankSelectModalProps {
  setSelectBankType: React.Dispatch<React.SetStateAction<string>>;
}
function BankSelectModal({ setSelectBankType }: BankSelectModalProps) {
  const [isBankModalOpen, setIsBankModalOpen] =
    useRecoilState(isBankModalOpenState);
  return (
    <Wrapper visible={isBankModalOpen}>
      <div className="bar-wrapper">
        <Bar />
      </div>
      <BankCaption>
        <Body1>은행</Body1>
      </BankCaption>
      <BankSelectBox>
        <BankSelectList>
          {bankNameList.map((item) => (
            <BankItem
              onClick={() => {
                setSelectBankType(item);
                setIsBankModalOpen(false);
              }}
            >
              <BankIcon bankType={item} key={item} />
              <BankName>
                <Body1>{item}</Body1>
              </BankName>
            </BankItem>
          ))}
        </BankSelectList>
      </BankSelectBox>
    </Wrapper>
  );
}
const BankCaption = styled.div`
  margin-left: 2rem;
  margin-bottom: 1.6rem;
`;

const BankSelectBox = styled.div`
  height: calc(100% - 4rem);
  overflow: scroll;
`;
const BankSelectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10rem;
`;
const BankItem = styled.div`
  width: 50%;
  display: flex;
  cursor: pointer;
  gap: 0.8rem;
  align-items: center;
  padding: 1.6rem 2.85rem 1.6rem;
  box-sizing: border-box;
`;
const BankName = styled.div``;

const Wrapper = styled.div<{ visible: boolean }>`
  @media (max-width: 767px) {
    width: 100vw;
    height: calc(100% - 9.6rem);
  }
  @media (min-width: 768px) {
    width: 37.5rem;
    height: calc(100% - 9.6rem);
  }
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 28rem;
  background-color: ${Grey6};
  bottom: 0;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 2002;
  animation: ${({ visible }) => (visible ? slideIn : slideOut)} 0.3s ease-in-out;
  .bar-wrapper {
    height: 4.5rem;
    display: flex;
    justify-content: center;
  }
  .row1 {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem 0rem;
  }
  .row2 {
    padding: 0rem 2rem 1.6rem;
  }
  .row {
    display: flex;
    padding: 1rem 2rem;
    justify-content: space-between;
    cursor: pointer;
  }
`;
const slideIn = keyframes`
  from{
    transform : translateY(100%);
  }
  to{
    transform : translateY(0%);
  }
`;
const slideOut = keyframes`
  from{
    transform : translateY(0%);
  }
  to{
    transform : translateY(100%);
  }
`;
const Bar = styled.div`
  margin-top: 1.2rem;
  width: 3.1rem;
  height: 0.3rem;
  background-color: ${Grey4};
`;
export default BankSelectModal;
