import fs from 'fs';
import { SitemapStream } from 'sitemap';
import axios from 'axios';
import { configDotenv } from 'dotenv';

// load env file
configDotenv();

const generateSitemap = async () => {
  const hostname = 'https://sharemindapp.com';

  // 정적 경로
  const staticRoutes = [
    { url: '/', changefreq: 'monthly', priority: 0.3 },
    { url: '/share', changefreq: 'hourly', priority: 1.0 },
    { url: '/open-consult', changefreq: 'always', priority: 1.0 },
    { url: '/open-consult/likes', changefreq: 'always', priority: 0.8 },
    { url: '/open-consult/recents', changefreq: 'always', priority: 0.8 },
    { url: '/categorySearch', changefreq: 'daily', priority: 0.7 },
    { url: '/service', changefreq: 'never', priority: 0.8 },
    { url: '/service-unavailable', changefreq: 'monthly', priority: 0.5 },
  ];

  // 동적 경로
  const dynamicRoutes = [];

  try {
    const counselorAllResponse = await axios.patch(
      process.env.REACT_APP_API_URL + 'counselors/all?sortType=POPULARITY',
      {
        index: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const profileDynamicRoutes = counselorAllResponse.data.map((counselor) => ({
      url: `/profile/${counselor.counselorId}`,
      changefreq: 'daily',
      priority: 0.7,
    }));

    dynamicRoutes.push(...profileDynamicRoutes);
  } catch (error) {
    console.log(error);
  }

  // Sitemap 생성
  const sitemap = new SitemapStream({ hostname });
  const writeStream = fs.createWriteStream('./public/sitemap.xml');

  sitemap.pipe(writeStream);

  // 정적 경로 추가
  staticRoutes.forEach((route) => sitemap.write(route));

  // 동적 경로 추가
  dynamicRoutes.forEach((route) => sitemap.write(route));

  // 종료
  sitemap.end();

  // 파일 쓰기 완료 이벤트
  writeStream.on('finish', () => {
    console.log('Sitemap successfully written to file!');
  });

  writeStream.on('error', (err) => {
    console.error('Error writing sitemap:', err);
  });
};

generateSitemap();
