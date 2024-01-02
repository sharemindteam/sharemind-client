import { Button } from 'components/Common/Button';
import { Header } from 'components/Common/Header';
import Input from 'components/Common/Input';
import { TabA1 } from 'components/Common/TabA1';
import { Routes, Route } from 'react-router-dom';
import { Red, White } from 'styles/color';
import { Heading } from 'styles/font';
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<></>} />
    </Routes>
  );
};
export default Router;
