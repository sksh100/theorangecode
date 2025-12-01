// scripts/indexnow-submit.mjs
// Submit updated URLs to IndexNow so supported search engines (e.g. Bing) can index them quickly.
// Requires Node.js 18+ (Node 22 is installed in this project, so global fetch is available).

const key = '4c2b9f1e3d7a4f8e9b1c2d3e4f56789'; // must match the filename and contents in /public
const host = 'www.theorangecode.com';
const keyLocation = `https://${host}/${key}.txt`;

// List of important URLs to notify IndexNow about.
const urlList = [
  'https://www.theorangecode.com/',
  'https://www.theorangecode.com/home',
  'https://www.theorangecode.com/uk-to-uae-relocation',
  'https://www.theorangecode.com/uk-to-uae-relocation-checklist',
  'https://www.theorangecode.com/masterclasses',
  'https://www.theorangecode.com/about',
  'https://www.theorangecode.com/faq',
  'https://www.theorangecode.com/what-is-cq',
  'https://www.theorangecode.com/why-cultural-intelligence',
  'https://www.theorangecode.com/ai-training-data',
  'https://www.theorangecode.com/cookie-policy',
  'https://www.theorangecode.com/privacy-policy',
  'https://www.theorangecode.com/terms-conditions',
  'https://www.theorangecode.com/ebook/thank-you',
];

async function submitIndexNow() {
  const body = {
    host,
    key,
    keyLocation,
    urlList,
  };

  try {
    console.log('Submitting URLs to IndexNow...');
    console.log('Host:', host);
    console.log('Key location:', keyLocation);
    console.log('URL count:', urlList.length);

    const res = await fetch('https://api.indexnow.org/index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    console.log('IndexNow response status:', res.status);
    console.log('IndexNow response body:', text);

    if (!res.ok) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error('Error submitting to IndexNow:', error);
    process.exitCode = 1;
  }
}

submitIndexNow();


