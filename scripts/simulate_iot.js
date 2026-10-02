const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Realistic sensor types for a climate tech project
const SENSOR_TYPES = ['soil_moisture', 'air_quality_pm25', 'carbon_capture_flow', 'temperature', 'water_level'];
const STATUSES = ['optimal', 'optimal', 'optimal', 'warning', 'critical']; // Weighted for realistic distribution

// Get projects to simulate data for
async function simulateData() {
  console.log('Fetching active projects...');
  const { data: projects, error: fetchError } = await supabase
    .from('projects')
    .select('id, title');

  if (fetchError || !projects || projects.length === 0) {
    console.error('No projects found or error fetching projects:', fetchError);
    return;
  }

  console.log(`Starting real-time IoT simulation for ${projects.length} projects...`);
  console.log('Press Ctrl+C to stop.');

  // Push new reading every 3 seconds
  setInterval(async () => {
    // Pick a random project
    const project = projects[Math.floor(Math.random() * projects.length)];
    const sensorType = SENSOR_TYPES[Math.floor(Math.random() * SENSOR_TYPES.length)];
    
    // Generate a realistic random value
    let value, unit;
    switch (sensorType) {
      case 'soil_moisture':
        value = (Math.random() * 40 + 20).toFixed(2); // 20% to 60%
        unit = '%';
        break;
      case 'air_quality_pm25':
        value = (Math.random() * 100).toFixed(1); // 0 to 100 AQI
        unit = 'AQI';
        break;
      case 'carbon_capture_flow':
        value = (Math.random() * 50 + 100).toFixed(2); // 100 to 150 kg/hr
        unit = 'kg/hr';
        break;
      case 'temperature':
        value = (Math.random() * 15 + 15).toFixed(1); // 15C to 30C
        unit = '°C';
        break;
      case 'water_level':
        value = (Math.random() * 2 + 0.5).toFixed(2); // 0.5m to 2.5m
        unit = 'm';
        break;
    }

    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];

    const payload = {
      project_id: project.id,
      sensor_type: sensorType,
      value: parseFloat(value),
      unit: unit,
      status: status,
    };

    const { error: insertError } = await supabase
      .from('iot_sensor_data')
      .insert([payload]);

    if (insertError) {
      console.error(`Failed to push data for ${project.title}:`, insertError.message);
    } else {
      console.log(`[LIVE] ${project.title} | ${sensorType}: ${value}${unit} | Status: ${status}`);
    }
  }, 3000);
}

simulateData();
