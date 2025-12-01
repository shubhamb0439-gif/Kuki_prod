import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://thrzvbgjeqnqjxoxttfh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRocnp2YmdqZXFucWp4b3h0dGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMDUzNjQsImV4cCI6MjA3NDc4MTM2NH0.b17Fu1fBA4Zi9NQYjfa9zxlRqpAGtYHd0RDiL_qSQ0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearAccounts() {
  console.log('Checking auth users...');
  const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();

  if (usersError) {
    console.log('Cannot access auth.users with anon key (expected)');
  } else {
    console.log('Auth users:', users);
  }

  console.log('\nFetching all profiles...');
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, email, name, role');

  if (profilesError) {
    console.error('Error fetching profiles:', profilesError);
    return;
  }

  console.log('\nCurrent profiles:');
  console.log(profiles);
}

clearAccounts();
