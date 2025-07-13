// Test registration process
const testRegistration = async () => {
  const testEmail = `test_${Date.now()}@example.com`
  const testPassword = 'testpassword123'
  const testName = 'Test User'
  const testRole = 'CLIENT'
  
  console.log('🔍 Testing registration process...')
  console.log('📧 Test email:', testEmail)
  console.log('🔑 Test password:', testPassword)
  console.log('👤 Test name:', testName)
  console.log('🎭 Test role:', testRole)
  console.log('')

  try {
    console.log('📡 Sending registration request...')
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        name: testName,
        role: testRole
      })
    })
    
    console.log('📊 Response status:', response.status)
    console.log('📊 Response ok:', response.ok)
    
    const data = await response.json()
    console.log('📋 Response data:', JSON.stringify(data, null, 2))
    
    if (!response.ok) {
      console.error('❌ Registration failed:')
      console.error('Status:', response.status)
      console.error('Error:', data.error)
      console.error('Details:', data.details)
      return
    }
    
    console.log('✅ Registration response received')
    
    // Wait a moment and try to verify the user was created
    console.log('⏳ Waiting 3 seconds before checking Supabase...')
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    console.log('🔍 Testing if user can now login...')
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    })
    
    const loginData = await loginResponse.json()
    console.log('🔑 Login response status:', loginResponse.status)
    console.log('🔑 Login response:', JSON.stringify(loginData, null, 2))
    
    if (loginResponse.ok) {
      console.log('✅ Login successful!')
    } else {
      console.log('❌ Login failed after registration')
    }
    
  } catch (error) {
    console.error('💥 Test failed with error:', error)
    console.error('Stack trace:', error.stack)
  }
}

// Wait a moment for server to start, then run test
setTimeout(() => {
  testRegistration()
}, 10000)

console.log('⏳ Waiting 10 seconds for development server to start...') 