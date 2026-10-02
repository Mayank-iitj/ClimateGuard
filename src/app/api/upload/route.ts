import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const records = body.data;

    // Use a fixed demo user ID for now to tie everything together, 
    // or extract from NextAuth session if you want true multi-tenant.
    const userId = "demo-user-123"; 

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
      const business = businesses[i]; // assuming same order, but safer to match by name if possible. supabase returns in order for bulk inserts.

      assessmentsToInsert.push({
        business_id: business.id,
        annual_revenue: parseFloat(record.Annual_Revenue) || 0,
        monthly_electricity_cost: parseFloat(record.Monthly_Electricity_Cost) || 0,
        backup_power_type: record.Backup_Power_Type,
        climate_exposure_score: Math.floor(Math.random() * 50) + 40,
        operational_resilience_score: Math.floor(Math.random() * 50) + 30
      });

      for (let j = 0; j < 6; j++) {
        const d = new Date();
        d.setMonth(d.getMonth() - j);
        impactsToInsert.push({
          business_id: business.id,
          entry_month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`,
          energy_cost: (parseFloat(record.Monthly_Electricity_Cost) || 1000) * (0.8 + Math.random() * 0.4),
          downtime_hours: Math.floor(Math.random() * 12)
        });
      }

      projectsToInsert.push({
        business_id: business.id,
        title: 'Cooling Optimization',
        status: 'Evaluating',
        capex_estimate: 250000,
        annual_savings_estimate: 50000,
        exposure_reduction_pct: 15
      });
      projectsToInsert.push({
        business_id: business.id,
        title: 'Flood Mitigation Barriers',
        status: 'Implementation',
        capex_estimate: 600000,
        annual_savings_estimate: 120000,
        exposure_reduction_pct: 35
      });
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
