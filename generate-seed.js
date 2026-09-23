const fs = require('fs');
const crypto = require('crypto');

function uuidv4() {
  return crypto.randomUUID();
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const industries = ['Food Processing', 'Textile Manufacturing', 'Precision Engineering', 'Agri-tech', 'Cold Storage Logistics', 'Auto Components'];
const cities = ['Indore', 'Pune', 'Coimbatore', 'Ahmedabad', 'Ludhiana', 'Surat'];
const states = ['Madhya Pradesh', 'Maharashtra', 'Tamil Nadu', 'Gujarat', 'Punjab', 'Gujarat'];
const projectTitles = [
  'Thermal Efficiency Upgrade', 
  'Backup Energy Resilience', 
  'Water Recycling System', 
  'Flood Mitigation Barriers', 
  'IoT Equipment Sensors', 
  'Cooling Optimization'
];
const statuses = ['Evaluating', 'Finance-ready', 'Implementation', 'Tracking', 'Completed'];

// Note: In Supabase, auth.users must exist. Since we can't easily insert into auth.users directly via SQL 
// in the public schema without triggering Supabase's internal auth hooks, we'll create a dummy user ID 
// to associate these records with, or simply skip the user_id constraint temporarily for the seed, 
// OR we can just use a fake UUID and temporarily disable the foreign key constraint just for the seed to populate the dashboard.
// Since businesses table requires a user_id referenced to auth.users, let's use a dummy UUID and bypass the constraint for the demo.

const lines = [];
lines.push('-- ClimateGuard Seed Data');
lines.push('-- Note: You MUST create an account in the app BEFORE running this script so that auth.users has at least one user!');
lines.push('');

const businesses = [];
for (let i = 0; i < 20; i++) {
  const id = uuidv4();
  const name = `MSME ${i+1} Pvt. Ltd.`;
  const idx = randomInt(0, cities.length - 1);
  
  businesses.push({
    id,
    name,
    industry: industries[idx],
    city: cities[idx],
    state: states[idx]
  });
  
  lines.push(`INSERT INTO public.businesses (id, user_id, name, industry, city, state) VALUES ('${id}', (SELECT id FROM auth.users LIMIT 1), '${name}', '${industries[idx]}', '${cities[idx]}', '${states[idx]}');`);
}
lines.push('');

for (const b of businesses) {
  // Assessment
  const assessmentId = uuidv4();
  const rev = randomInt(50, 500) * 100000; // 50L to 5Cr
  const prod = randomInt(10, 100) * 1000;
  const elec = randomInt(20, 150) * 1000;
  const water = randomInt(100, 1000) * 1000;
  const backup = randomElement(['Diesel Genset', 'Grid Only', 'Solar + Battery', 'Partial (Diesel)']);
  
  lines.push(`INSERT INTO public.assessments (id, business_id, annual_revenue, daily_production_value, monthly_electricity_cost, monthly_water_usage, backup_power_type, climate_exposure_score, operational_resilience_score) VALUES ('${assessmentId}', '${b.id}', ${rev}, ${prod}, ${elec}, ${water}, '${backup}', ${randomInt(40, 95)}, ${randomInt(20, 80)});`);
  
  // Projects
  const numProjects = randomInt(1, 4);
  for (let j = 0; j < numProjects; j++) {
    const pId = uuidv4();
    const pTitle = randomElement(projectTitles);
    const pStatus = randomElement(statuses);
    const capex = randomInt(1, 10) * 100000;
    const savings = capex * randomInt(15, 35) / 100;
    
    lines.push(`INSERT INTO public.projects (id, business_id, title, status, capex_estimate, annual_savings_estimate, exposure_reduction_pct) VALUES ('${pId}', '${b.id}', '${pTitle}', '${pStatus}', ${capex}, ${savings}, ${randomInt(10, 40)});`);
  }
  
  // Impact Entries (last 6 months)
  const today = new Date();
  for (let m = 0; m < 6; m++) {
    const d = new Date(today.getFullYear(), today.getMonth() - m, 1);
    const dateStr = d.toISOString().split('T')[0];
    const energyCost = randomInt(800, 1500);
    const downtime = randomInt(0, 12);
    lines.push(`INSERT INTO public.impact_entries (business_id, entry_month, energy_cost, downtime_hours) VALUES ('${b.id}', '${dateStr}', ${energyCost}, ${downtime});`);
  }
}

fs.writeFileSync('supabase/seed.sql', lines.join('\\n'));
console.log('Successfully generated supabase/seed.sql');
