// scripts/indexnow-submit.mjs
// Submit updated URLs to IndexNow so supported search engines (e.g. Bing) can index them quickly.
// Requires Node.js 18+ (Node 22 is installed in this project, so global fetch is available).

const key = '4c2b9f1e3d7a4f8e9b1c2d3e4f56789'; // must match the filename and contents in /public
const host = 'www.theorangecode.com';
const keyLocation = `https://${host}/${key}.txt`;

// List of important URLs to notify IndexNow about.
// This should match all URLs in sitemap.ts (except protected pages like /courses/)
const urlList = [
  'https://www.theorangecode.com/',
  'https://www.theorangecode.com/home',
  'https://www.theorangecode.com/about',
  'https://www.theorangecode.com/faq',
  'https://www.theorangecode.com/privacy-policy',
  'https://www.theorangecode.com/terms-conditions',
  'https://www.theorangecode.com/uk-to-uae-relocation',
  'https://www.theorangecode.com/uk-to-uae-relocation-checklist',
  'https://www.theorangecode.com/why-cultural-intelligence',
  'https://www.theorangecode.com/what-is-cq',
  'https://www.theorangecode.com/cultural-intelligence-uae',
  'https://www.theorangecode.com/masterclasses',
  'https://www.theorangecode.com/ai-training-data',
  'https://www.theorangecode.com/cookie-policy',
  'https://www.theorangecode.com/ebook/thank-you',
];

async function submitIndexNow() {
  const body = {
    host,
    key,
    keyLocation,
    urlList,
  };

  // Try multiple IndexNow endpoints
  const endpoints = [
    'https://api.indexnow.org/index',
    'https://www.bing.com/indexnow',
  ];

  console.log('Submitting URLs to IndexNow...');
  console.log('Host:', host);
  console.log('Key location:', keyLocation);
  console.log('URL count:', urlList.length);
  console.log('');

  let success = false;
  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      console.log(`Trying endpoint: ${endpoint}`);
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      console.log(`Response status: ${res.status}`);
      
      if (res.ok || res.status === 202) {
        if (res.status === 202) {
          console.log('✅ Success! URLs accepted (202 Accepted - validation pending).');
        } else {
          console.log('✅ Success! URLs submitted successfully.');
        }
        console.log('Response:', text || '(empty response)');
        success = true;
        break;
      } else {
        console.log('❌ Failed:', text);
        lastError = { endpoint, status: res.status, text };
      }
    } catch (error) {
      console.error(`❌ Error with ${endpoint}:`, error.message);
      lastError = { endpoint, error: error.message };
    }
    console.log('');
  }

  if (!success) {
    console.error('All IndexNow endpoints failed. Last error:', lastError);
    process.exitCode = 1;
  }
}

submitIndexNow();


