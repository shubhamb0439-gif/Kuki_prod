import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://thrzvbgjeqnqjxoxttfh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRocnp2YmdqZXFucWp4b3h0dGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMDUzNjQsImV4cCI6MjA3NDc4MTM2NH0.b17Fu1fBA4Zi9NQYjfa9zxlRqpAGtYHd0RDiL_qSQ0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupAdmin() {
  console.log('Setting up admin account...\n');

  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'Shub@0811';

  try {
    console.log('Step 1: Signing in or creating admin auth account...');

    // Try to sign in first
    let userId;
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword
    });

    if (signInError) {
      // If sign in fails, try to sign up
      console.log('Sign in failed, attempting to create new account...');
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
        options: {
          data: {
            full_name: 'Admin'
          }
        }
      });

      if (signUpError) throw signUpError;
      userId = signUpData.user.id;
      console.log('✓ Admin auth account created');
    } else {
      userId = signInData.user.id;
      console.log('✓ Signed in as admin');
    }

    console.log('User ID:', userId);

    console.log('\nStep 2: Creating admin profile...');
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        email: adminEmail,
        name: 'Admin',
        role: 'admin',
        currency: 'USD',
        preferred_language: 'en'
      }, {
        onConflict: 'id'
      })
      .select();

    if (profileError) {
      console.error('Profile error:', profileError);
    } else {
      console.log('✓ Admin profile created');
      console.log('Profile data:', profileData);
    }

    const { data: checkProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    console.log('\nVerification - Profile exists:', checkProfile);

    console.log('\n✓ Admin setup complete!');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

setupAdmin();
