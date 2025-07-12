const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 InkCircle Production Deployment Script');
console.log('📦 Supabase + Vercel Deployment\n');

// Configuration
const config = {
  projectName: 'inkcircle-tattoo-booking',
  buildCommand: 'npm run build',
  startCommand: 'npm start',
  nodeVersion: '18.x'
};

// Step 1: Pre-deployment checks
console.log('📋 Step 1: Pre-deployment checks...');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run from project root.');
  process.exit(1);
}

// Check if environment variables are set
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.error('   Please create .env.local with your credentials first.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const hasValidSupabaseUrl = envContent.includes('supabase.co') && !envContent.includes('your-project.supabase.co');
const hasValidKeys = envContent.includes('eyJ') || envContent.includes('ey0');

if (!hasValidSupabaseUrl || !hasValidKeys) {
  console.error('❌ Environment variables appear to contain placeholder values');
  console.error('   Please update .env.local with real Supabase credentials');
  process.exit(1);
}

console.log('✅ Environment setup looks good');

// Step 2: Install dependencies and build
console.log('\n📋 Step 2: Installing dependencies and building...');
try {
  console.log('   • Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });
  
  console.log('   • Running build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 3: Test Supabase connection
console.log('\n📋 Step 3: Testing Supabase connection...');
try {
  const testScript = `
    const { createClient } = require('@supabase/supabase-js');
    const fs = require('fs');
    
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const envVars = {};
    envContent.split('\\n').forEach(line => {
      if (line && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
          envVars[key.trim()] = value.trim();
        }
      }
    });
    
    const supabase = createClient(
      envVars.NEXT_PUBLIC_SUPABASE_URL,
      envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    supabase.from('_test').select('*').limit(1).then(({ error }) => {
      if (error && error.code !== 'PGRST116') {
        console.error('Connection failed:', error.message);
        process.exit(1);
      }
      console.log('✅ Supabase connection successful');
    });
  `;
  
  fs.writeFileSync('temp-test.js', testScript);
  execSync('node temp-test.js', { stdio: 'inherit' });
  fs.unlinkSync('temp-test.js');
  
} catch (error) {
  console.error('❌ Supabase connection test failed');
  console.error('   Please check your Supabase credentials');
  process.exit(1);
}

// Step 4: Deploy database schema
console.log('\n📋 Step 4: Deploying database schema...');
try {
  console.log('   • Running Prisma migration...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  console.log('   • Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('✅ Database schema deployed successfully');
} catch (error) {
  console.error('❌ Database deployment failed:', error.message);
  console.error('   Please check your DATABASE_URL configuration');
  process.exit(1);
}

// Step 5: Vercel deployment check
console.log('\n📋 Step 5: Vercel deployment preparation...');

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'pipe' });
  console.log('✅ Vercel CLI is installed');
} catch (error) {
  console.log('⚠️  Vercel CLI not installed. Installing...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully');
  } catch (installError) {
    console.error('❌ Failed to install Vercel CLI');
    console.error('   Please run: npm install -g vercel');
    process.exit(1);
  }
}

// Step 6: Final deployment summary
console.log('\n📋 Step 6: Deployment summary...');
console.log('   ✅ Dependencies installed and project built');
console.log('   ✅ Supabase connection verified');
console.log('   ✅ Database schema deployed');
console.log('   ✅ Prisma client generated');
console.log('   ✅ Vercel CLI ready');

console.log('\n🎉 Pre-deployment checks complete!');
console.log('\n📝 Next steps for Vercel deployment:');
console.log('1. Login to Vercel: vercel login');
console.log('2. Deploy to Vercel: vercel --prod');
console.log('3. Configure environment variables in Vercel dashboard');
console.log('4. Run post-deployment verification');

console.log('\n🔧 Manual steps required:');
console.log('• Set up environment variables in Vercel dashboard');
console.log('• Run supabase-setup.sql in your Supabase SQL editor');
console.log('• Test the production deployment');
console.log('• Set up custom domain (optional)');

console.log('\n📚 Documentation:');
console.log('• vercel-env-template.md - Environment variables guide');
console.log('• VERCEL_DEPLOYMENT_GUIDE.md - Complete deployment guide');
console.log('• supabase-setup.sql - Database security setup');

console.log('\n🔗 Useful commands:');
console.log('• vercel --prod          - Deploy to production');
console.log('• vercel logs            - View deployment logs');
console.log('• vercel env ls          - List environment variables');
console.log('• vercel domains         - Manage custom domains');

console.log('\n🌐 After deployment:');
console.log('• Update NEXT_PUBLIC_APP_URL in your environment variables');
console.log('• Update Supabase Auth settings with your production URL');
console.log('• Test all authentication flows');
console.log('• Monitor application performance'); 