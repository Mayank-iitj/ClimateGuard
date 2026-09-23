<div align="center">
  <div style="padding: 20px;">
    <!-- You can optionally replace the globe emoji below with an actual image link if you host a logo! -->
    <h1>🌍 ClimateGuard</h1>
  </div>
  
  <p><strong>Stress-test today. Stay resilient tomorrow.</strong></p>
  <p><i>The AI-powered climate resilience and financial planning platform for MSMEs.</i></p>

  <div>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
  </div>
  <br/>
</div>

## 📖 About the Project

**ClimateGuard** is a digital climate stress-test and resilience planning layer designed specifically for Micro, Small, and Medium Enterprises (MSMEs). 

Small businesses face the highest operational risk from climate anomalies (heatwaves, floods, supply chain disruptions), yet they lack the enterprise-grade tools to model these risks or secure resilience-focused capital. ClimateGuard bridges this gap by automatically assessing risk exposure, simulating the financial cost of inaction, and generating bank-ready resilience finance packs.

> **🏆 Built for SANKALP 2026** - Aiming to drive systemic financial inclusion and climate adaptation.

---

## ✨ Key Features

- **Dynamic Onboarding Engine**: Instantly generates personalized AI risk baselines upon user signup based on industry, location, and revenue.
- **Interactive Dashboards**: Premium, glassmorphic UI visualizing climate exposure, operational resilience, and recovery readiness.
- **Financial Impact Simulator**: Projects the "Cost of Inaction" vs. "Net ROI" of implementing resilience measures over time using `recharts`.
- **Bank-Ready Finance Packs**: Translates climate risks into structured financial requirements, making businesses eligible for sustainable MSME financing tiers.
- **Climate Copilot (AI)**: An integrated OpenAI-powered assistant that advises MSMEs on tailored thermal optimizations, backup power solutions, and risk mitigation strategies.
- **Multi-Tenant Architecture**: Secure Row-Level Security (RLS) via Supabase ensuring users only see and manage their own enterprise data.

---

## 🛠 Tech Stack

| Category | Technologies |
| --- | --- |
| **Framework** | Next.js 16 (App Router), React 19 |
| **Styling & UI** | Tailwind CSS v4, shadcn/ui, Framer Motion, Lucide Icons |
| **Database & Auth** | Supabase (PostgreSQL + RLS), `@supabase/ssr` |
| **AI Integration** | Vercel AI SDK, OpenAI API (`gpt-4o-mini` / `gpt-5-nano`) |
| **Data Visualization**| Recharts |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone & Install
```bash
git clone https://github.com/your-username/climateguard.git
cd climateguard
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add your keys:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# OpenAI Configuration (For Climate Copilot)
OPENAI_API_KEY=your_openai_api_key
```

### 3. Run the Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action!

---

## 🌐 Deployment (Vercel)

ClimateGuard is production-ready and optimized for Vercel deployment.

1. Push your code to your GitHub repository.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. **Crucial:** In the Environment Variables section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `OPENAI_API_KEY`
5. Click **Deploy**. Vercel will automatically detect Next.js and build the project flawlessly.

---

<div align="center">
  <i>Empowering MSMEs to adapt, survive, and thrive in a changing climate.</i>
</div>
# ClimateGuard
