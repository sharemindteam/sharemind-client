import { Flex } from 'components/Common/Flex';
import { Header } from 'components/Common/Header';
import { ReactComponent as ServerFixIcon } from '../../assets/icons/server-fix.svg';
import { Heading } from 'styles/font';
import { Green } from 'styles/color';
function ServerDown() {
  return (
    <>
      <Header isBuyer={false} />
      <Flex height="calc(100vh - 6rem)" direction="column" gap={'1.5rem'}>
        <ServerFixIcon />
        <Heading color={Green}>서비스 점검 중 </Heading>
      </Flex>
    </>
  );
}

export default ServerDown;
