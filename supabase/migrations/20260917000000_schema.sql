-- ClimateGuard Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 0. Drop existing tables if they exist to allow clean re-runs
DROP TABLE IF EXISTS public.impact_entries CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.assessments CASCADE;
DROP TABLE IF EXISTS public.businesses CASCADE;

-- 1. Businesses Table
CREATE TABLE public.businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    industry TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Assessments Table (Stores the baseline operational data)
CREATE TABLE public.assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    annual_revenue NUMERIC,
    daily_production_value NUMERIC,
    monthly_electricity_cost NUMERIC,
    monthly_water_usage NUMERIC,
    backup_power_type TEXT,
    climate_exposure_score INTEGER DEFAULT 0,
    operational_resilience_score INTEGER DEFAULT 0,
    recovery_readiness_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Projects Table (Resilience Interventions)
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Evaluating', -- Evaluating, Finance-ready, Implementation, Tracking, Completed
    capex_estimate NUMERIC,
    annual_savings_estimate NUMERIC,
    exposure_reduction_pct NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Impact Ledger Table
CREATE TABLE public.impact_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    entry_month DATE NOT NULL, -- Stored as the first of the month
    energy_cost NUMERIC,
    downtime_hours NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_entries ENABLE ROW LEVEL SECURITY;

-- Policies for businesses
CREATE POLICY "Allow all businesses" ON public.businesses
    FOR ALL USING (true);

-- Policies for assessments
CREATE POLICY "Allow all assessments" ON public.assessments
    FOR ALL USING (true);

-- Policies for projects
CREATE POLICY "Allow all projects" ON public.projects
    FOR ALL USING (true);

-- Policies for impact entries
CREATE POLICY "Allow all impact entries" ON public.impact_entries
    FOR ALL USING (true);
