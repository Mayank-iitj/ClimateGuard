-- Drop old conflicting tables to ensure a clean setup
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS msme_profiles CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;

-- Create MSME Profiles table
CREATE TABLE IF NOT EXISTS msme_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL, -- Ties to NextAuth user ID
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  msme_id UUID REFERENCES msme_profiles(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL,
  climate_exposure INTEGER NOT NULL,
  operational_resilience INTEGER NOT NULL,
  recovery_readiness INTEGER NOT NULL,
  baseline_exposure_inr BIGINT NOT NULL,
  mitigated_exposure_inr BIGINT NOT NULL,
  required_capital_inr BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Chat History table (optional, for persistent AI threads)
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Dummy Data for the Demo (If no user is logged in yet)
-- Note: Replace 'demo-user-id' with an actual auth ID when testing live
INSERT INTO msme_profiles (id, user_id, company_name, industry, location) 
VALUES (
  '11111111-1111-1111-1111-111111111111', 
  'demo-user-id', 
  'Shakti Foods Pvt. Ltd.', 
  'Food Processing', 
  'Indore, MP'
) ON CONFLICT DO NOTHING;

INSERT INTO assessments (msme_id, overall_score, climate_exposure, operational_resilience, recovery_readiness, baseline_exposure_inr, mitigated_exposure_inr, required_capital_inr)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  72,
  71,
  54,
  42,
  210000, -- 2.1L
  70000,  -- 0.7L
  350000  -- 3.5L
) ON CONFLICT DO NOTHING;
