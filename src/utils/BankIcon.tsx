import { ReactComponent as BankIcon1 } from 'assets/icons/bank/wuri.svg';
import { ReactComponent as BankIcon2 } from 'assets/icons/bank/kakaobank.svg';
import { ReactComponent as BankIcon3 } from 'assets/icons/bank/kb.svg';
import { ReactComponent as BankIcon4 } from 'assets/icons/bank/shinhan.svg';
import { ReactComponent as BankIcon5 } from 'assets/icons/bank/nh.svg';
import { ReactComponent as BankIcon6 } from 'assets/icons/bank/hana.svg';
import { ReactComponent as BankIcon7 } from 'assets/icons/bank/ibk.svg';
import { ReactComponent as BankIcon8 } from 'assets/icons/bank/scjail.svg';
import { ReactComponent as BankIcon9 } from 'assets/icons/bank/city.svg';
import { ReactComponent as BankIcon10 } from 'assets/icons/bank/kdb.svg';
import { ReactComponent as BankIcon11 } from 'assets/icons/bank/newtown.svg';
import { ReactComponent as BankIcon12 } from 'assets/icons/bank/dgb.svg';
// import { ReactComponent as BankIcon5 } from 'assets/icons/bank/gwangju.svg'; 전북은행
import { ReactComponent as BankIcon13 } from 'assets/icons/bank/gwangju.svg';
import { ReactComponent as BankIcon15 } from 'assets/icons/bank/post-office.svg';
import { ReactComponent as BankIcon16 } from 'assets/icons/bank/sinhyeop.svg';
import { ReactComponent as BankIcon17 } from 'assets/icons/bank/bnk.svg';
// import { ReactComponent as BankIcon5 } from 'assets/icons/bank/bnk.svg'; 부산은행 , 경남은행
import { ReactComponent as BankIcon19 } from 'assets/icons/bank/suhyeop.svg';
import { ReactComponent as BankIcon20 } from 'assets/icons/bank/jeju.svg';
import { ReactComponent as BankIcon21 } from 'assets/icons/bank/saving.svg';
import { ReactComponent as BankIcon22 } from 'assets/icons/bank/kbank.svg';
import { ReactComponent as BankIcon23 } from 'assets/icons/bank/toss.svg';

interface BankIconProps {
  bankType: string;
}

export const BankIcon = ({ bankType }: BankIconProps) => {
  if (bankType === '우리은행') {
    return <BankIcon1 />;
  } else if (bankType === '카카오뱅크') {
    return <BankIcon2 />;
  } else if (bankType === 'KB국민은행') {
    return <BankIcon3 />;
  } else if (bankType === '신한은행') {
    return <BankIcon4 />;
  } else if (bankType === 'NH농협은행') {
    return <BankIcon5 />;
  } else if (bankType === 'KEB하나은행') {
    return <BankIcon6 />;
  } else if (bankType === 'IBK기업은행') {
    return <BankIcon7 />;
  } else if (bankType === 'SC제일은행') {
    return <BankIcon8 />;
  } else if (bankType === '씨티은행') {
    return <BankIcon9 />;
  } else if (bankType === 'KDB산업은행') {
    return <BankIcon10 />;
  } else if (bankType === '새마을금고') {
    return <BankIcon11 />;
  } else if (bankType === '대구은행') {
    return <BankIcon12 />;
  } else if (bankType === '전북은행') {
    return <BankIcon13 />;
  } else if (bankType === '광주은행') {
    return <BankIcon13 />;
  } else if (bankType === '우체국') {
    return <BankIcon15 />;
  } else if (bankType === '신협') {
    return <BankIcon16 />;
  } else if (bankType === '경남은행') {
    return <BankIcon17 />;
  } else if (bankType === '부산은행') {
    return <BankIcon17 />;
  } else if (bankType === '수협') {
    return <BankIcon19 />;
  }
  else if (bankType ==="제주은행"){
    return <BankIcon20/>
  }
  else if (bankType ==="상호저축은행"){
    return <BankIcon21/>
  }
  else if (bankType ==="케이뱅크"){
    return <BankIcon22/>
  }
  else if (bankType === "토스뱅크"){
    return <BankIcon23/>
  }


  return <></>;
};
