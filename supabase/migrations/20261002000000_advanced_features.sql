-- Advanced Climate Tech Features Schema Extension

-- 1. IoT Sensor Data (Realtime Simulation)
CREATE TABLE IF NOT EXISTS public.iot_sensor_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    sensor_type TEXT NOT NULL, -- e.g., 'soil_moisture', 'air_quality', 'carbon_capture_flow'
    value NUMERIC NOT NULL,
    unit TEXT NOT NULL,
    status TEXT DEFAULT 'optimal', -- optimal, warning, critical
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for this table
alter publication supabase_realtime add table public.iot_sensor_data;

-- 2. Project Locations (GIS Mapping)
CREATE TABLE IF NOT EXISTS public.project_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE UNIQUE,
    latitude NUMERIC NOT NULL,
    longitude NUMERIC NOT NULL,
    risk_zone_type TEXT, -- e.g., 'flood_plain', 'wildfire_risk', 'safe'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. AI Assessments (Actionable AI)
CREATE TABLE IF NOT EXISTS public.ai_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    ai_summary TEXT NOT NULL,
    risk_factors JSONB NOT NULL DEFAULT '[]',
    recommended_interventions JSONB NOT NULL DEFAULT '[]',
    assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Blockchain Ledger Verifications (Trust & Transparency)
CREATE TABLE IF NOT EXISTS public.blockchain_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    verifier_name TEXT NOT NULL,
    verification_type TEXT NOT NULL, -- e.g., 'Carbon Offset Proof', 'Site Inspection'
    tx_hash TEXT NOT NULL UNIQUE, -- Simulated blockchain hash
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. System Alerts (Automated Alerts & Interventions)
CREATE TABLE IF NOT EXISTS public.system_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    alert_level TEXT NOT NULL, -- warning, critical
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.iot_sensor_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blockchain_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_alerts ENABLE ROW LEVEL SECURITY;

-- Simple policies for demo
CREATE POLICY "Allow all sensor data" ON public.iot_sensor_data FOR ALL USING (true);
CREATE POLICY "Allow all project locations" ON public.project_locations FOR ALL USING (true);
CREATE POLICY "Allow all ai assessments" ON public.ai_assessments FOR ALL USING (true);
CREATE POLICY "Allow all blockchain verifications" ON public.blockchain_verifications FOR ALL USING (true);
CREATE POLICY "Allow all system alerts" ON public.system_alerts FOR ALL USING (true);
