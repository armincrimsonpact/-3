// Comprehensive test for registration and login functionality
const testCompleteAuth = async () => {
  const baseUrl = 'http://localhost:3000'
  const testEmail = `test_${Date.now()}@example.com`
  const testPassword = 'testpassword123'
  const testName = 'Test User'
  
  console.log('🔍 Testing complete authentication flow...')
  console.log(`📧 Test email: ${testEmail}`)
  console.log(`🔑 Test password: ${testPassword}`)
  console.log('')

  // Test all user roles
  const roles = ['CLIENT', 'ARTIST', 'STUDIO']
  const results = {}

  for (const role of roles) {
    console.log(`\n========== Testing ${role} Role ==========`)
    
    const roleEmail = `${role.toLowerCase()}_${Date.now()}@example.com`
    
    try {
      // 1. Test Registration
      console.log(`📝 Testing ${role} registration...`)
      const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: roleEmail,
          password: testPassword,
          name: `${testName} ${role}`,
          role: role
        })
      })
      
      const registerData = await registerResponse.json()
      
      if (registerResponse.ok) {
        console.log(`✅ ${role} registration successful`)
        console.log(`   User ID: ${registerData.user?.id}`)
        console.log(`   Role: ${registerData.user?.role}`)
      } else {
        console.log(`❌ ${role} registration failed:`, registerData.error)
        results[role] = { registration: 'FAILED', login: 'SKIPPED', error: registerData.error }
        continue
      }

      // 2. Test Login API
      console.log(`🔐 Testing ${role} login API...`)
      const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: roleEmail,
          password: testPassword
        })
      })
      
      const loginData = await loginResponse.json()
      
      if (loginResponse.ok) {
        console.log(`✅ ${role} login API successful`)
        console.log(`   User ID: ${loginData.user?.id}`)
        console.log(`   Role: ${loginData.user?.role}`)
        console.log(`   Email verified: ${loginData.user?.emailVerified}`)
        console.log(`   Role data available: ${loginData.user?.roleData ? 'YES' : 'NO'}`)
        
        results[role] = { 
          registration: 'SUCCESS', 
          login: 'SUCCESS',
          userId: loginData.user?.id,
          roleData: loginData.user?.roleData ? 'YES' : 'NO'
        }
      } else {
        console.log(`❌ ${role} login API failed:`, loginData.error)
        results[role] = { 
          registration: 'SUCCESS', 
          login: 'FAILED', 
          error: loginData.error 
        }
      }

    } catch (error) {
      console.log(`❌ ${role} test failed with error:`, error.message)
      results[role] = { 
        registration: 'ERROR', 
        login: 'ERROR', 
        error: error.message 
      }
    }
  }

  // 3. Test Admin Registration (requires invite code)
  console.log(`\n========== Testing ADMIN Role ==========`)
  
  try {
    const adminEmail = `admin_${Date.now()}@example.com`
    
    console.log(`📝 Testing ADMIN registration (without invite code)...`)
    const adminRegisterResponse = await fetch(`${baseUrl}/api/auth/register/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: adminEmail,
        password: testPassword + 'Admin',
        name: `${testName} Admin`,
        role: 'ADMIN',
        inviteCode: 'invalid-code'
      })
    })
    
    const adminRegisterData = await adminRegisterResponse.json()
    
    if (adminRegisterResponse.status === 403) {
      console.log(`✅ ADMIN registration correctly rejected without valid invite code`)
      results['ADMIN'] = { 
        registration: 'CORRECTLY_REJECTED', 
        login: 'NOT_TESTED',
        note: 'Invite code validation working'
      }
    } else {
      console.log(`❌ ADMIN registration should have been rejected:`, adminRegisterData)
      results['ADMIN'] = { 
        registration: 'SECURITY_ISSUE', 
        login: 'NOT_TESTED',
        error: 'Invite code validation not working'
      }
    }
  } catch (error) {
    console.log(`❌ ADMIN test failed with error:`, error.message)
    results['ADMIN'] = { 
      registration: 'ERROR', 
      login: 'ERROR', 
      error: error.message 
    }
  }

  // 4. Test invalid credentials
  console.log(`\n========== Testing Invalid Credentials ==========`)
  
  try {
    console.log(`🔐 Testing login with invalid credentials...`)
    const invalidLoginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      })
    })
    
    const invalidLoginData = await invalidLoginResponse.json()
    
    if (invalidLoginResponse.status === 401) {
      console.log(`✅ Invalid credentials correctly rejected`)
      results['INVALID_CREDENTIALS'] = { test: 'PASSED' }
    } else {
      console.log(`❌ Invalid credentials should have been rejected:`, invalidLoginData)
      results['INVALID_CREDENTIALS'] = { test: 'FAILED', error: invalidLoginData }
    }
  } catch (error) {
    console.log(`❌ Invalid credentials test failed:`, error.message)
    results['INVALID_CREDENTIALS'] = { test: 'ERROR', error: error.message }
  }

  // 5. Summary Report
  console.log(`\n========== SUMMARY REPORT ==========`)
  console.log('Registration & Login Test Results:')
  console.log('')
  
  for (const [role, result] of Object.entries(results)) {
    console.log(`${role}:`)
    console.log(`  Registration: ${result.registration}`)
    console.log(`  Login: ${result.login}`)
    if (result.error) {
      console.log(`  Error: ${result.error}`)
    }
    if (result.note) {
      console.log(`  Note: ${result.note}`)
    }
    console.log('')
  }

  // 6. Check for critical issues
  const criticalIssues = []
  
  for (const [role, result] of Object.entries(results)) {
    if (role === 'ADMIN' || role === 'INVALID_CREDENTIALS') continue
    
    if (result.registration === 'FAILED' || result.registration === 'ERROR') {
      criticalIssues.push(`${role} registration not working`)
    }
    if (result.login === 'FAILED' || result.login === 'ERROR') {
      criticalIssues.push(`${role} login not working`)
    }
  }

  if (criticalIssues.length > 0) {
    console.log('🚨 CRITICAL ISSUES FOUND:')
    criticalIssues.forEach(issue => console.log(`  - ${issue}`))
  } else {
    console.log('✅ All core authentication functions working correctly!')
  }

  console.log('\n🔍 Test completed!')
}

// Run the test
testCompleteAuth().catch(console.error) 