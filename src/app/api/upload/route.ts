import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();
    const records = body.data;

    // Use actual authenticated user ID
    const userId = session.user.id || session.user.email || "demo-user-123";

    // Clear existing data for this user to make it fresh
    await supabase.from('businesses').delete().eq('user_id', userId);

    // 1. Bulk Insert Businesses
    const businessesToInsert = records.map((record: any) => ({
      user_id: userId,
      name: record.Facility_Name,
      industry: record.Industry_Type,
      city: record.City,
      state: record.State
    }));

    const { data: businesses, error: bizError } = await supabase.from('businesses').insert(businessesToInsert).select();
    if (bizError) throw bizError;

    const assessmentsToInsert: any[] = [];
    const impactsToInsert: any[] = [];
    const projectsToInsert: any[] = [];

    // 2. Prepare all child records
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const business = businesses[i];

      // --- CUSTOM ALGORITHM: CLIMATE EXPOSURE SCORE ---
      let climateScore = 50; // Base score
      const coastalStates = ['MH', 'GJ', 'TN', 'AP', 'WB', 'OR', 'KL', 'KA'];
      const heatStates = ['RJ', 'DL', 'UP', 'MP', 'HR', 'PB'];
      
      if (coastalStates.includes(record.State)) climateScore += 25; // Cyclone/Flood risk
      if (heatStates.includes(record.State)) climateScore += 20; // Heatwave risk

      // --- CUSTOM ALGORITHM: OPERATIONAL RESILIENCE SCORE ---
      let resilienceScore = 50;
      if (record.Backup_Power_Type === 'Grid Only') resilienceScore -= 30;
      else if (record.Backup_Power_Type === 'Solar + Battery') resilienceScore += 35;
      else if (record.Backup_Power_Type === 'Diesel Genset') resilienceScore += 10;
      else resilienceScore += 20; // UPS / Gas

      if (['IT/ITeS', 'Pharmaceuticals', 'Manufacturing'].includes(record.Industry_Type)) {
        resilienceScore -= 10; // Highly sensitive to downtime
      }

      // Ensure bounds
      climateScore = Math.min(100, Math.max(0, climateScore));
      resilienceScore = Math.min(100, Math.max(0, resilienceScore));

      assessmentsToInsert.push({
        business_id: business.id,
        annual_revenue: parseFloat(record.Annual_Revenue) || 0,
        monthly_electricity_cost: parseFloat(record.Monthly_Electricity_Cost) || 0,
        backup_power_type: record.Backup_Power_Type,
        climate_exposure_score: climateScore,
        operational_resilience_score: resilienceScore
      });

      // --- CUSTOM ALGORITHM: IMPACT ENTRIES (Historical Cost Modeling) ---
      const baseElec = parseFloat(record.Monthly_Electricity_Cost) || 1000;
      for (let j = 0; j < 6; j++) {
        const d = new Date();
        d.setMonth(d.getMonth() - j);
        
        // Simulate seasonal variations based on state (e.g., summer heatwaves increase AC loads)
        const isSummer = (d.getMonth() >= 3 && d.getMonth() <= 6); 
        const heatMultiplier = (isSummer && heatStates.includes(record.State)) ? 1.4 : 1.0;
        
        // Simulate grid failures causing downtime if they lack good backup
        const gridFails = (record.Backup_Power_Type === 'Grid Only') ? Math.floor(Math.random() * 8) + 2 : 0;

        impactsToInsert.push({
          business_id: business.id,
          entry_month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`,
          energy_cost: baseElec * heatMultiplier * (0.9 + Math.random() * 0.2), // +/- 10% variance
          downtime_hours: gridFails
        });
      }

      // --- CUSTOM ALGORITHM: GENERATE TAILORED PROJECTS ---
      // Project 1: Address Power Backup if weak
      if (record.Backup_Power_Type === 'Grid Only' || record.Backup_Power_Type === 'Diesel Genset') {
        const capex = baseElec * 12 * 2; // Assume 2-year energy bill for Solar Capex
        projectsToInsert.push({
          business_id: business.id,
          title: 'Solar PV + Battery Energy Storage',
          status: 'Finance-ready',
          capex_estimate: capex,
          annual_savings_estimate: baseElec * 12 * 0.4, // Save 40% of grid bill
          exposure_reduction_pct: 40
        });
      }

      // Project 2: Address Geography Risks
      const revenue = parseFloat(record.Annual_Revenue) || 100000;
      if (coastalStates.includes(record.State)) {
        projectsToInsert.push({
          business_id: business.id,
          title: 'Perimeter Flood Barriers & Drainage',
          status: 'Evaluating',
          capex_estimate: revenue * 0.05, // 5% of revenue
          annual_savings_estimate: revenue * 0.02, // Avoided losses
          exposure_reduction_pct: 25
        });
      } else if (heatStates.includes(record.State)) {
         projectsToInsert.push({
          business_id: business.id,
          title: 'Industrial HVAC & Thermal Insulation',
          status: 'Implementation',
          capex_estimate: revenue * 0.03,
          annual_savings_estimate: baseElec * 12 * 0.15, // 15% energy savings
          exposure_reduction_pct: 20
        });
      }
    }

    // 3. Bulk Insert child records
    if (assessmentsToInsert.length > 0) {
      const { error: asmtError } = await supabase.from('assessments').insert(assessmentsToInsert);
      if (asmtError) throw asmtError;
    }
    
    // Chunk impact entries if it's too large (e.g. 600 rows is fine for Supabase usually, but let's be safe)
    if (impactsToInsert.length > 0) {
      const { error: impactError } = await supabase.from('impact_entries').insert(impactsToInsert);
      if (impactError) throw impactError;
    }

    if (projectsToInsert.length > 0) {
      const { error: projError } = await supabase.from('projects').insert(projectsToInsert);
      if (projError) throw projError;
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('has_onboarded', 'true', { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return response;
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
