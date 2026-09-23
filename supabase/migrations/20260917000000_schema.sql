-- ClimateGuard Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Businesses Table
CREATE TABLE public.businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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
CREATE POLICY "Users can view own business" ON public.businesses
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own business" ON public.businesses
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own business" ON public.businesses
    FOR UPDATE USING (auth.uid() = user_id);

-- Policies for assessments
CREATE POLICY "Users can manage own assessments" ON public.assessments
    FOR ALL USING (business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid()));

-- Policies for projects
CREATE POLICY "Users can manage own projects" ON public.projects
    FOR ALL USING (business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid()));

-- Policies for impact entries
CREATE POLICY "Users can manage own impact entries" ON public.impact_entries
    FOR ALL USING (business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid()));
