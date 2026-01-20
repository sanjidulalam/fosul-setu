
import { Milestone, TeamMember, RevenueProjection } from './types';

export const MILESTONES: Milestone[] = [
  { year: '2026', title: 'Milestone 1', details: '10K farmers (3K women), BDT 50Cr trade, +15–20% income.' },
  { year: '2027', title: 'Milestone 2', details: '25k farmers, 40+ districts, BDT 150Cr trade, BDT 10Cr revenue, 5K women financed.' },
  { year: '2028', title: 'Milestone 3', details: '50K farmers (30% women), AI advisory, BDT 350Cr trade, +30-35% income.' },
  { year: '2029', title: 'Milestone 4', details: '75+ farmers nationwide, BDT 700Cr trade, partners onboarded, <3% default.' },
  { year: '2030', title: 'Milestone 5', details: '100k+ farmers (25k women), BDT 1,000Cr added income, 30K families uplifted.' },
];

export const TEAM: TeamMember[] = [
  {
    name: 'Tasnimul Hoque Mahi',
    role: 'The Strategist (CEO)',
    specialization: 'Business Model Engineering',
    focus: 'Investor Relations, Financial Architecture & Growth',
    image: 'https://picsum.photos/seed/mahi/400/500'
  },
  {
    name: 'Sruti Das',
    role: 'The Orchestrator (COO)',
    specialization: 'Supply Chain & Operations',
    focus: 'On-Ground Execution & Trust Building',
    image: 'https://picsum.photos/seed/sruti/400/500'
  },
  {
    name: 'Jayonta Biswas',
    role: 'The Product Owner (CPO)',
    specialization: 'Product Strategy & Vendor Mgmt',
    focus: 'User Experience (UX) & Tech Oversight',
    image: 'https://picsum.photos/seed/jayonta/400/500'
  },
  {
    name: 'Sanjidul Alam',
    role: 'API Expert',
    specialization: 'Technology & System Integration',
    focus: 'Scale Architecture & Backend robustness',
    image: 'https://picsum.photos/seed/sanjid/400/500'
  }
];

export const REVENUE_DATA: RevenueProjection[] = [
  { month: 'Month 6', subscribers: 1000, arpu: 150, revenue: 150000 },
  { month: 'Month 12', subscribers: 5000, arpu: 180, revenue: 900000 },
  { month: 'Month 18', subscribers: 15000, arpu: 200, revenue: 3000000 },
  { month: 'Month 24', subscribers: 40000, arpu: 220, revenue: 8800000 },
  { month: 'Month 30', subscribers: 75000, arpu: 250, revenue: 18750000 },
  { month: 'Month 36', subscribers: 100000, arpu: 280, revenue: 28000000 },
];
