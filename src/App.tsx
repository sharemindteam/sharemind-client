import Router from 'Router';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="App" style={{ height: '100%', width: '100%' }}>
      <Helmet>
        <title>셰어마인드 - 경험 공유 연애상담 플랫폼</title>
        <meta
          name="description"
          content="나와 비슷한 경험을 공유하는 사람들과 익명으로 부담없이 연애상담을 나눠보세요."
        />
      </Helmet>
      <Router />
    </div>
  );
}

export default App;
