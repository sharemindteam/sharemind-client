import { getMyInfo, getProfiles } from 'api/get';
import { Space } from 'components/Common/Space';
import { CategoryModal } from 'components/Seller/SellerMyPageModifyProfile/CategoryModal';
import IsOutPopup from 'components/Seller/SellerMyPageModifyProfile/IsOutPopup';
import { ModifyProfileHeader } from 'components/Seller/SellerMyPageModifyProfile/ModifyProfileHeader';
import { ModifyProfileMainSection } from 'components/Seller/SellerMyPageModifyProfile/ModifyProfileMainSection';
import SetChatTimeSection, {
  SelectedTimeList,
} from 'components/Seller/SellerMyPageModifyProfile/SetChatTimeSection';
import { StyleModal } from 'components/Seller/SellerMyPageModifyProfile/StyleModal';
import { TypeModal } from 'components/Seller/SellerMyPageModifyProfile/TypeModal';
import { UpdateSuccess } from 'components/Seller/SellerMyPageModifyProfile/UpdateSuccess';
import { useCustomSelect } from 'hooks/useCustomSelect';
import { useInput } from 'hooks/useInput';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import {
  isBankModalOpenState,
  isCategoryModalOpenState,
  isOutPopupOpenState,
  isStyleModalOpenState,
  isSuccessUpdateState,
  isTypeOpenModalState,
  isUpdateModalOpenState,
} from 'utils/atom';
const categoryList = {
  연애갈등: 1,
  '이별/재회': 2,
  여자심리: 3,
  남자심리: 4,
  '썸/연애초기': 5,
  짝사랑: 6,
  권태기: 7,
  기타: 8,
};

export const SellerMypageModifyProfile = () => {
  // 상담 카테고리 enum List,, 후에 POST할 때 Mapping 필요
  const [selectCategory, setSelectCategory] = useState<number[]>([]);
  // 상담 스타일 string
  const [selectStyle, setSelectStyle] = useState<string>('');
  // 상담 방식 enum List
  const [selectType, setSelectType] = useState<string[]>([]);
  const [selectedTimeList, setSelectedTimeList] = useState<SelectedTimeList>({
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
    SAT: [],
    SUN: [],
  });
  // 모달 띄워주는 여부
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useRecoilState<boolean>(
    isCategoryModalOpenState,
  );
  const [isStyleModalOpen, setIsStyleModalOpen] = useRecoilState<boolean>(
    isStyleModalOpenState,
  );
  const [isTypeModalOpen, setIsTypeModalOpen] =
    useRecoilState<boolean>(isTypeOpenModalState);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useRecoilState<boolean>(
    isUpdateModalOpenState,
  );
  const [isBankModalOpen, setIsBankModalOpen] =
    useRecoilState<boolean>(isBankModalOpenState);

  const [isSucessUpdate, setIsUpdateSuccess] =
    useRecoilState<boolean>(isSuccessUpdateState);
  const [isOutPopupOpen, setIsOutPopupOpen] =
    useRecoilState(isOutPopupOpenState);
  // 채팅 상담시간 페이지로 이동할지여부
  const [isSetChatTime, setIsSetChatTime] = useState<boolean>(false);

  const nickname = useInput('');
  const category = useCustomSelect('category');
  const style = useCustomSelect('style');
  const type = useCustomSelect('type');
  // 시간 설정은 나중에....ㅠㅠ
  const availableTime = useCustomSelect('time');

  const letterPrice = useInput('');
  const chatPrice = useInput('');

  const oneLiner = useInput('');
  const experience = useInput('');
  const [isNoProfile, setIsNoProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileLevel: any = await getMyInfo();
        if (profileLevel?.data?.profileStatus === 'NO_PROFILE') {
          setIsNoProfile(true);
        } else if (profileLevel?.data?.profileStatus === 'EVALUATION_PENDING') {
          alert('판매 정보 검토 중이니 조금만 기다려주세요!');
          navigate('/seller/mypage/viewProfile');
        } else {
          const profileRes: any = await getProfiles();
          console.log(profileRes);
          const data = profileRes.data;
          if (profileRes?.response?.status === 404) {
            alert('판매 정보가 등록되어 있지 않습니다.');
            navigate('/seller/mypage');
          }
          nickname.setValue(data?.nickname);
          category.setViewValue(data?.consultCategories.join(', '));
          setSelectCategory(
            data?.consultCategories.map((item: any) => categoryList[item]),
          );
          style.setViewValue(data?.consultStyle);
          setSelectStyle(data?.consultStyle);

          type.setViewValue(data?.consultTypes.join(', '));
          setSelectType(data?.consultTypes);
          // availableTime.setViewValue(data?.consultTimes);
          data?.consultCosts?.편지 &&
            letterPrice.setValue(
              String(data?.consultCosts?.편지)?.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ',',
              ),
            );
          data?.consultCosts?.채팅 &&
            chatPrice.setValue(
              String(data?.consultCosts?.채팅)?.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ',',
              ),
            );
          setSelectedTimeList({ ...selectedTimeList, ...data?.consultTimes });
          oneLiner.setValue(data?.introduction);
          experience.setValue(data?.experience);
          setIsLoading(false);
        }
      } catch (err) {
        navigate('/seller/mypage');
        alert(err);
      }
      // accountNum.setValue(profileDummyData.accountNum);
      // bankType.setValue(profileDummyData.bankType);
      // bankOwner.setValue(profileDummyData.bankOwner);
    };
    fetchProfile();
  }, []);
  return (
    <>
      <ModifyProfileHeader
        isNoProfile={isNoProfile}
        isSetChatTime={isSetChatTime}
        setIsSetChatTime={setIsSetChatTime}
      />
      {isLoading ? (
        <>
          <Space height="20vh" />
          <LoadingSpinner />
        </>
      ) : isSucessUpdate ? (
        <UpdateSuccess />
      ) : isSetChatTime ? (
        <SetChatTimeSection
          setSelectedList={setSelectedTimeList}
          setIsSetChatTime={setIsSetChatTime}
          selectedList={selectedTimeList}
        />
      ) : (
        <ModifyProfileMainSection
          isNoProfile={isNoProfile}
          nickname={nickname}
          category={category}
          style={style}
          type={type}
          availableTime={availableTime}
          letterPrice={letterPrice}
          chatPrice={chatPrice}
          oneLiner={oneLiner}
          experience={experience}
          selectCategory={selectCategory}
          selectStyle={selectStyle}
          selectType={selectType}
          setIsSetChatTime={setIsSetChatTime}
          selectAvailableTime={selectedTimeList}
        />
      )}
      {/* 모달 여부 True면.. */}
      {isCategoryModalOpen ||
      isOutPopupOpen ||
      isStyleModalOpen ||
      isTypeModalOpen ||
      isBankModalOpen ||
      isUpdateModalOpen ? (
        <BackDrop />
      ) : null}
      {isCategoryModalOpen && (
        <CategoryModal
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />
      )}
      {isStyleModalOpen && (
        <StyleModal selectStyle={selectStyle} setSelectStyle={setSelectStyle} />
      )}
      {isTypeModalOpen && (
        <TypeModal selectType={selectType} setSelectType={setSelectType} />
      )}{' '}
      {isOutPopupOpen && <IsOutPopup />}
      {/* {isBankModalOpen && (
        <BankSelectModal setSelectBankType={setSelectBankType} />
      )} */}
    </>
  );
};
const BackDrop = styled.div`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  top: 0;
  z-index: 2001;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;
