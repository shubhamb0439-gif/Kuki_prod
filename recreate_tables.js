import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://thrzvbgjeqnqjxoxttfh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRocnp2YmdqZXFucWp4b3h0dGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMDUzNjQsImV4cCI6MjA3NDc4MTM2NH0.b17Fu1fBA4Zi9NQYjfa9zxlRqpAGtYHd0RDiL_qSQ0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  const tables = [
    'profiles',
    'employees',
    'employee_wages',
    'employee_loans',
    'employee_bonuses',
    'statements',
    'qr_transactions',
    'salary_adjustments',
    'friend_requests',
    'job_postings',
    'job_applications',
    'employee_ratings',
    'employer_ratings',
    'job_roles'
  ];

  console.log('Checking if tables exist:\n');

  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('id', { count: 'exact', head: true });

      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✓ ${table}: exists`);
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`);
    }
  }

  console.log('\n\nChecking admin account:');
  const { data: adminProfile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', 'admin@gmail.com')
    .maybeSingle();

  if (error) {
    console.log('❌ Error checking admin:', error.message);
  } else if (adminProfile) {
    console.log('✓ Admin profile exists:');
    console.log('  ID:', adminProfile.id);
    console.log('  Email:', adminProfile.email);
    console.log('  Name:', adminProfile.name);
    console.log('  Role:', adminProfile.role);
  } else {
    console.log('❌ Admin profile not found');
  }
}

checkTables();
