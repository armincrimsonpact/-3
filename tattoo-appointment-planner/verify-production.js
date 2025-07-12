const https = require('https');
const { execSync } = require('child_process');

console.log('🔍 InkCircle Production Verification Script\n');

// Configuration
const config = {
  timeout: 30000,
  expectedStatusCodes: [200, 301, 302],
  requiredPages: [
    '/',
    '/login',
    '/register',
    '/artists',
    '/pricing',
    '/about-us'
  ],
  apiEndpoints: [
    '/api/csrf',
    '/api/auth/login',
    '/api/auth/register'
  ]
};

// Get production URL from environment or prompt
const productionUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL;

if (!productionUrl) {
  console.error('❌ Production URL not found!');
  console.error('   Please set NEXT_PUBLIC_APP_URL or VERCEL_URL environment variable');
  process.exit(1);
}

console.log(`🌐 Testing production deployment: ${productionUrl}\n`);

// Helper function to make HTTP requests
function makeRequest(url, path = '') {
  return new Promise((resolve, reject) => {
    const fullUrl = `${url}${path}`;
    const options = {
      method: 'GET',
      timeout: config.timeout,
      headers: {
        'User-Agent': 'InkCircle-Production-Test/1.0'
      }
    };

    const req = https.request(fullUrl, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          url: fullUrl
        });
      });
    });

    req.on('error', (error) => {
      reject({ error, url: fullUrl });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({ error: 'Request timeout', url: fullUrl });
    });

    req.end();
  });
}

// Test 1: Basic connectivity
async function testConnectivity() {
  console.log('📋 Test 1: Basic connectivity...');
  
  try {
    const response = await makeRequest(productionUrl);
    if (config.expectedStatusCodes.includes(response.statusCode)) {
      console.log('✅ Site is accessible');
      console.log(`   Status: ${response.statusCode}`);
      return true;
    } else {
      console.log(`❌ Unexpected status code: ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Connection failed: ${error.error || error.message}`);
    return false;
  }
}

// Test 2: Essential pages
async function testPages() {
  console.log('\n📋 Test 2: Essential pages...');
  
  let passedTests = 0;
  
  for (const page of config.requiredPages) {
    try {
      const response = await makeRequest(productionUrl, page);
      if (config.expectedStatusCodes.includes(response.statusCode)) {
        console.log(`✅ ${page} - Status: ${response.statusCode}`);
        passedTests++;
      } else {
        console.log(`❌ ${page} - Status: ${response.statusCode}`);
      }
    } catch (error) {
      console.log(`❌ ${page} - Error: ${error.error || error.message}`);
    }
  }
  
  console.log(`   Passed: ${passedTests}/${config.requiredPages.length}`);
  return passedTests === config.requiredPages.length;
}

// Test 3: API endpoints
async function testApiEndpoints() {
  console.log('\n📋 Test 3: API endpoints...');
  
  let passedTests = 0;
  
  for (const endpoint of config.apiEndpoints) {
    try {
      const response = await makeRequest(productionUrl, endpoint);
      if (response.statusCode >= 200 && response.statusCode < 500) {
        console.log(`✅ ${endpoint} - Status: ${response.statusCode}`);
        passedTests++;
      } else {
        console.log(`❌ ${endpoint} - Status: ${response.statusCode}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint} - Error: ${error.error || error.message}`);
    }
  }
  
  console.log(`   Passed: ${passedTests}/${config.apiEndpoints.length}`);
  return passedTests === config.apiEndpoints.length;
}

// Test 4: Security headers
async function testSecurityHeaders() {
  console.log('\n📋 Test 4: Security headers...');
  
  try {
    const response = await makeRequest(productionUrl);
    const headers = response.headers;
    
    const securityHeaders = [
      'x-frame-options',
      'x-content-type-options',
      'x-xss-protection',
      'strict-transport-security',
      'content-security-policy'
    ];
    
    let passedHeaders = 0;
    
    for (const header of securityHeaders) {
      if (headers[header]) {
        console.log(`✅ ${header}: ${headers[header]}`);
        passedHeaders++;
      } else {
        console.log(`❌ ${header}: Missing`);
      }
    }
    
    console.log(`   Passed: ${passedHeaders}/${securityHeaders.length}`);
    return passedHeaders >= securityHeaders.length - 1; // Allow 1 missing header
  } catch (error) {
    console.log(`❌ Security header test failed: ${error.error || error.message}`);
    return false;
  }
}

// Test 5: Performance check
async function testPerformance() {
  console.log('\n📋 Test 5: Performance check...');
  
  try {
    const startTime = Date.now();
    await makeRequest(productionUrl);
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    console.log(`   Load time: ${loadTime}ms`);
    
    if (loadTime < 3000) {
      console.log('✅ Performance: Excellent (< 3s)');
      return true;
    } else if (loadTime < 5000) {
      console.log('⚠️  Performance: Good (< 5s)');
      return true;
    } else {
      console.log('❌ Performance: Poor (> 5s)');
      return false;
    }
  } catch (error) {
    console.log(`❌ Performance test failed: ${error.error || error.message}`);
    return false;
  }
}

// Test 6: SSL certificate
async function testSSL() {
  console.log('\n📋 Test 6: SSL certificate...');
  
  try {
    const response = await makeRequest(productionUrl);
    
    if (productionUrl.startsWith('https://')) {
      console.log('✅ HTTPS enabled');
      
      // Check for HSTS header
      const hstsHeader = response.headers['strict-transport-security'];
      if (hstsHeader) {
        console.log('✅ HSTS header present');
        return true;
      } else {
        console.log('⚠️  HSTS header missing');
        return true;
      }
    } else {
      console.log('❌ HTTPS not enabled');
      return false;
    }
  } catch (error) {
    console.log(`❌ SSL test failed: ${error.error || error.message}`);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting production verification...\n');
  
  const tests = [
    { name: 'Connectivity', func: testConnectivity },
    { name: 'Pages', func: testPages },
    { name: 'API Endpoints', func: testApiEndpoints },
    { name: 'Security Headers', func: testSecurityHeaders },
    { name: 'Performance', func: testPerformance },
    { name: 'SSL', func: testSSL }
  ];
  
  const results = [];
  
  for (const test of tests) {
    const passed = await test.func();
    results.push({ name: test.name, passed });
  }
  
  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  
  let totalPassed = 0;
  for (const result of results) {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${result.name}`);
    if (result.passed) totalPassed++;
  }
  
  console.log(`\nOverall: ${totalPassed}/${results.length} tests passed`);
  
  if (totalPassed === results.length) {
    console.log('\n🎉 All tests passed! Your production deployment is ready.');
  } else if (totalPassed >= results.length * 0.8) {
    console.log('\n⚠️  Most tests passed. Please review failed tests.');
  } else {
    console.log('\n❌ Multiple tests failed. Please review your deployment.');
  }
  
  // Additional checks
  console.log('\n📋 Additional Manual Checks:');
  console.log('• Test user registration flow');
  console.log('• Test user login flow');
  console.log('• Test appointment booking');
  console.log('• Test email notifications');
  console.log('• Test responsive design on mobile');
  console.log('• Test database operations');
  console.log('• Monitor error logs in Vercel dashboard');
  
  return totalPassed === results.length;
}

// Execute tests
runAllTests().then((allPassed) => {
  process.exit(allPassed ? 0 : 1);
}).catch((error) => {
  console.error('❌ Verification script failed:', error);
  process.exit(1);
}); 