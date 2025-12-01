import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://thrzvbgjeqnqjxoxttfh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRocnp2YmdqZXFucWp4b3h0dGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMDUzNjQsImV4cCI6MjA3NDc4MTM2NH0.b17Fu1fBA4Zi9NQYjfa9zxlRqpAGtYHd0RDiL_qSQ0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAdmin() {
  console.log('Testing admin profile insertion...\n');

  // Sign in as admin
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@gmail.com',
    password: 'Shub@0811'
  });

  if (authError) {
    console.error('Auth error:', authError);
    return;
  }

  console.log('✓ Signed in as admin');
  console.log('User ID:', authData.user.id);

  // Try to insert profile directly (authenticated request)
  console.log('\nAttempting to insert profile...');
  const { data: insertData, error: insertError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      email: 'admin@gmail.com',
      name: 'Admin',
      role: 'admin'
    })
    .select();

  if (insertError) {
    console.error('Insert error:', insertError);
  } else {
    console.log('✓ Profile inserted:', insertData);
  }

  // Check if profile exists
  console.log('\nChecking if profile exists...');
  const { data: checkData, error: checkError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id);

  if (checkError) {
    console.error('Check error:', checkError);
  } else {
    console.log('Profiles found:', checkData);
  }

  // Check all profiles
  console.log('\nChecking all profiles...');
  const { data: allProfiles, error: allError } = await supabase
    .from('profiles')
    .select('*');

  if (allError) {
    console.error('All profiles error:', allError);
  } else {
    console.log('Total profiles:', allProfiles?.length);
    console.log('All profiles:', allProfiles);
  }
}

testAdmin();
