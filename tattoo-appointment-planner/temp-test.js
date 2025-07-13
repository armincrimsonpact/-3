
    const { createClient } = require('@supabase/supabase-js');
    const fs = require('fs');
    
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const envVars = {};
    envContent.split('\n').forEach(line => {
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
  