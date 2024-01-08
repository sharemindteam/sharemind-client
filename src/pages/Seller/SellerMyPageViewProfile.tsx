import {
  ModifyButton,
} from 'components/Seller/SellerMyPageViewProfile/ModifyButton';
import { ViewProfileHeader } from 'components/Seller/SellerMyPageViewProfile/ViewProfileHeader';
import { ViewProfileMainSection } from 'components/Seller/SellerMyPageViewProfile/ViewProfileMainSection';

export const SellerMypageViewProfile = () => {
  return (
    <>
      <ViewProfileHeader />
      <ViewProfileMainSection
        profileIdentifier={3}
        name="김고민상담"
        category="이별/재회, 권태기, 남자심리"
        chatStyle="팩폭"
        type="편지, 채팅"
        chatTime="1시간"
        letterFee={5000}
        chatFee={10000}
        oneLiner="재회를 밥먹듯이 하고나서 안정적인 연애를 유지하고 있어요"
        experience="안녕하세요. 한 남자와 재회를 밥먹듯이 하고 안정적으로 연애를 유지 중인 여성입니다. 그 사람과 연애를 하면서 저는 스스로도 많은 내적 성장을 겪었고 가치관이 180도 변하게 되었습니다. 주변 친구들에게 연애 상담을 하는 것은 많은 부작용을 가져옵니다. 내 남자친구는 친구들에게 이미지가 바닥이 되어 있고, 잦은 이별 상담에 주변 사람들이 떠나가기 시작합니다. 하지만 이 고통을 누군가에게라도 말하지 않으면 풀리지 않을 것만 같습니다. 저는 상담자분이 장기적으로 행복해질 수 있는 방법을 제시할 것이고 그것이 당장은 괴로움을 증가시킬 수 있는 원인이 될 수도 있을 것입니다."
      />
    </>
  );
};
