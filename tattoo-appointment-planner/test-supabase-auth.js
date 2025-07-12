#!/usr/bin/env node

/**
 * 🧪 Test Supabase Authentication & Database Connection
 * 
 * This script tests if your Supabase setup is working correctly.
 * Run this before deploying to production.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

console.log('🧪 Testing Supabase Authentication & Database');
console.log('============================================');
console.log('');

// Check if required environment variables are set
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

console.log('📋 Checking Environment Variables...');
let missingVars = [];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    missingVars.push(envVar);
    console.log(`❌ ${envVar} - Missing`);
  } else {
    console.log(`✅ ${envVar} - Present`);
  }
}

if (missingVars.length > 0) {
  console.log('');
  console.log('🚨 Missing Environment Variables!');
  console.log('');
  console.log('Please create a .env.local file with:');
  console.log('');
  console.log('# Supabase Configuration');
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...');
  console.log('SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...');
  console.log('DATABASE_URL=postgresql://postgres:password@db.project.supabase.co:5432/postgres');
  console.log('');
  console.log('📚 Get your credentials from: https://supabase.com/dashboard');
  console.log('');
  process.exit(1);
}

console.log('');
console.log('🔗 Testing Supabase Connection...');

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testConnection() {
  try {
    // Test database connection
    const { data, error } = await supabase.from('user_profiles').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.log('❌ Database connection failed:');
      console.log('   Error:', error.message);
      console.log('');
      console.log('💡 This might mean:');
      console.log('   1. Your DATABASE_URL is incorrect');
      console.log('   2. You haven\'t run the database schema setup');
      console.log('   3. Your Supabase project isn\'t set up yet');
      console.log('');
      console.log('🔧 To fix:');
      console.log('   1. Run supabase-setup.sql in your Supabase SQL Editor');
      console.log('   2. Check your Supabase project dashboard');
      console.log('   3. Verify your credentials are correct');
      return false;
    }
    
    console.log('✅ Database connection successful!');
    console.log(`   Found ${data || 0} user profiles in database`);
    
    return true;
  } catch (err) {
    console.log('❌ Connection test failed:');
    console.log('   Error:', err.message);
    return false;
  }
}

async function testAuth() {
  try {
    console.log('');
    console.log('🔐 Testing Authentication...');
    
    // Test auth functionality by checking if we can access auth methods
    const { data: { user }, error } = await supabase.auth.getUser();
    
    // This should return null user (no one logged in) or an error about invalid JWT
    // Both are expected behaviors for a fresh setup
    if (error && error.message !== 'Invalid JWT' && error.message !== 'Auth session missing!') {
      console.log('❌ Auth test failed:');
      console.log('   Error:', error.message);
      return false;
    }
    
    // Test that we can access auth session (should be null for fresh setup)
    const { data: session } = await supabase.auth.getSession();
    
    console.log('✅ Authentication system working!');
    console.log('   Ready to handle user registration and login');
    if (user) {
      console.log(`   Current user: ${user.email}`);
    } else {
      console.log('   No user currently logged in (expected for fresh setup)');
    }
    
    return true;
  } catch (err) {
    console.log('❌ Auth test failed:');
    console.log('   Error:', err.message);
    return false;
  }
}

async function runTests() {
  console.log('');
  console.log('🚀 Running Tests...');
  console.log('');
  
  const dbTest = await testConnection();
  const authTest = await testAuth();
  
  console.log('');
  console.log('📊 Test Results:');
  console.log('================');
  console.log(`Database Connection: ${dbTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Authentication: ${authTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');
  
  if (dbTest && authTest) {
    console.log('🎉 All tests passed! Ready for deployment!');
    console.log('');
    console.log('🚀 Next steps:');
    console.log('   1. Run: npm run build');
    console.log('   2. Deploy to Vercel');
    console.log('   3. Set environment variables in Vercel dashboard');
    console.log('   4. Test production deployment');
    console.log('');
    return true;
  } else {
    console.log('🚨 Some tests failed. Please fix the issues above.');
    console.log('');
    console.log('📚 Need help? Check these guides:');
    console.log('   - SUPABASE_PRODUCTION_ONLY.md');
    console.log('   - supabase-setup.sql');
    console.log('   - VERCEL_DEPLOYMENT_GUIDE.md');
    console.log('');
    return false;
  }
}

// Only run if called directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests }; 