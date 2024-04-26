import { White } from '../../styles/color';
import styled from 'styled-components';
// TabB2 스타일 틀
// 왼쪽 아이콘 Import 후 <div className="left-icon"> <아이콘/></div>
// 오른쪾 아이코 Import 후 <div className="right-icon"><아이콘/></div>

export const TabB2 = styled.header`
  display: flex;
  align-items: center;
  background-color: ${White};
  border-bottom: 1px solid rgba(242, 241, 248, 0.95);
  justify-content: center;
  height: 5.2rem;
  position: sticky;
  z-index: 999;
  top: 0;
  & > div.left-icon {
    position: absolute;
    left: 2rem;
    cursor: pointer;
  }
  & > div.right-icon {
    position: absolute;
    right: 2rem;
    cursor: pointer;
  }
`;
