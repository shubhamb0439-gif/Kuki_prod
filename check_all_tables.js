import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://thrzvbgjeqnqjxoxttfh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRocnp2YmdqZXFucWp4b3h0dGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMDUzNjQsImV4cCI6MjA3NDc4MTM2NH0.b17Fu1fBA4Zi9NQYjfa9zxlRqpAGtYHd0RDiL_qSQ0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllTables() {
  const tables = [
    'profiles',
    'employees',
    'employee_wages',
    'employee_loans',
    'employee_bonuses',
    'statements',
    'qr_transactions',
    'attendance',
    'performance_metrics',
    'salary_adjustments',
    'friend_requests',
    'job_postings',
    'job_applications',
    'employee_ratings',
    'employer_ratings',
    'job_roles'
  ];

  console.log('Checking all tables for data:\n');

  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: false });

      if (error) {
        console.log(`❌ ${table}: Error - ${error.message}`);
      } else {
        console.log(`📊 ${table}: ${count || 0} rows`);
        if (data && data.length > 0) {
          console.log(`   Sample:`, data.slice(0, 2));
        }
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`);
    }
  }
}

checkAllTables();
