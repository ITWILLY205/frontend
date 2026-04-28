// Test script for contact API
const http = require('http');

// Test data
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Subject',
  message: 'Test message from test script'
};

// Test the contact API
const testContactAPI = () => {
  const postData = JSON.stringify(testData);
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/contact',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Response:', data);
      try {
        const jsonData = JSON.parse(data);
        if (jsonData.success) {
          console.log('✅ Contact API test PASSED');
        } else {
          console.log('❌ Contact API test FAILED:', jsonData.message);
        }
      } catch (error) {
        console.log('❌ Failed to parse response:', error);
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ Request error:', error.message);
    console.log('💡 Make sure the backend server is running on port 5000');
    console.log('💡 Run: cd backend && node server.js');
  });

  req.write(postData);
  req.end();
};

console.log('🧪 Testing Contact API...');
testContactAPI();
