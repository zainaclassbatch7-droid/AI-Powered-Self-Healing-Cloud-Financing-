import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  BadgeDollarSign,
  BarChart3,
  CheckCircle2,
  Database,
  LineChart,
  Phone,
  RefreshCw,
  ShieldAlert,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import type { Campaign, Contact, LeadStatus } from '@/types';

interface FinanceCloudViewProps {
  store: {
    contacts: Contact[];
    campaigns: Campaign[];
  };
}

type Severity = 'high' | 'medium' | 'low';

type Anomaly = {
  id: string;
  severity: Severity;
  title: string;
  detail: string;
  impact: string;
  count: number;
};

type ScanState = {
  status: 'idle' | 'running' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  totalFindings: number;
  highestSeverity: Severity;
  dataSource: 'live' | 'mock';
};

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const percent = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 1,
});

const sourceCostMap: Record<string, number> = {
  whatsapp: 140,
  'meta ads': 420,
  facebook: 350,
  instagram: 320,
  referral: 80,
  website: 180,
  walkin: 120,
  'bulk import': 90,
  'manual entry': 60,
};

const statusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  interested: 'Interested',
  converted: 'Converted',
  lost: 'Lost',
};

const mockContacts: Contact[] = [
  {
    id: 'mock-1',
    name: 'Aarav Sharma',
    phone: '+91 9876543210',
    email: 'aarav@example.com',
    course: 'MBA',
    school: 'Delhi Public School',
    source: 'Meta Ads',
    status: 'interested',
    tags: ['hot', 'interested'],
    leadScore: 92,
    createdAt: new Date('2026-04-18T09:00:00'),
    updatedAt: new Date('2026-04-24T10:00:00'),
    messageCount: 8,
    replyCount: 4,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-2',
    name: 'Priya Nair',
    phone: '+91 9999999999',
    email: 'priya@example.com',
    course: 'B.Tech',
    school: 'St. Mary School',
    source: 'Instagram',
    status: 'new',
    tags: ['warm'],
    leadScore: 68,
    createdAt: new Date('2026-04-19T11:30:00'),
    updatedAt: new Date('2026-04-23T14:20:00'),
    messageCount: 2,
    replyCount: 0,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-3',
    name: 'Rahul Verma',
    phone: '9876543210',
    email: 'rahul@example.com',
    course: 'MBA',
    school: 'Delhi Public School',
    source: 'Meta Ads',
    status: 'contacted',
    tags: ['follow-up'],
    leadScore: 81,
    createdAt: new Date('2026-04-16T12:00:00'),
    updatedAt: new Date('2026-04-23T09:45:00'),
    messageCount: 6,
    replyCount: 2,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-4',
    name: 'Sneha Gupta',
    phone: '12345',
    email: 'sneha@example.com',
    course: 'Study Abroad',
    school: 'Bright Future Academy',
    source: 'Website',
    status: 'contacted',
    tags: ['follow-up'],
    leadScore: 74,
    createdAt: new Date('2026-04-14T08:15:00'),
    updatedAt: new Date('2026-04-20T15:10:00'),
    messageCount: 5,
    replyCount: 1,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-5',
    name: 'Ishita Kapoor',
    phone: '+91 8765432109',
    email: 'ishita@example.com',
    course: 'Nursing',
    school: 'Bright Future Academy',
    source: 'Referral',
    status: 'converted',
    tags: ['vip', 'hot'],
    leadScore: 96,
    createdAt: new Date('2026-04-10T10:15:00'),
    updatedAt: new Date('2026-04-25T11:40:00'),
    messageCount: 11,
    replyCount: 7,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-6',
    name: 'Karan Mehta',
    phone: '+91 9876501234',
    email: 'karan@example.com',
    course: 'Diploma',
    school: 'City Central School',
    source: 'WhatsApp',
    status: 'lost',
    tags: ['not-interested'],
    leadScore: 39,
    createdAt: new Date('2026-04-09T13:30:00'),
    updatedAt: new Date('2026-04-21T16:30:00'),
    messageCount: 4,
    replyCount: 1,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-7',
    name: 'Meera Joshi',
    phone: '+91 8888888888',
    email: 'meera@example.com',
    course: 'MBA',
    school: 'Bright Future Academy',
    source: 'Meta Ads',
    status: 'interested',
    tags: ['hot'],
    leadScore: 88,
    createdAt: new Date('2026-04-17T09:45:00'),
    updatedAt: new Date('2026-04-24T09:15:00'),
    messageCount: 7,
    replyCount: 3,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-8',
    name: 'Dev Patel',
    phone: '+91 7654321098',
    email: 'dev@example.com',
    course: 'B.Tech',
    school: 'City Central School',
    source: 'Instagram',
    status: 'converted',
    tags: ['warm'],
    leadScore: 79,
    createdAt: new Date('2026-04-12T15:00:00'),
    updatedAt: new Date('2026-04-25T13:15:00'),
    messageCount: 9,
    replyCount: 5,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-9',
    name: 'Nisha Singh',
    phone: '+91 6123456789',
    email: 'nisha@example.com',
    course: 'MBA',
    school: 'Bright Future Academy',
    source: 'Meta Ads',
    status: 'new',
    tags: ['hot'],
    leadScore: 84,
    createdAt: new Date('2026-04-22T08:40:00'),
    updatedAt: new Date('2026-04-24T17:00:00'),
    messageCount: 3,
    replyCount: 1,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-10',
    name: 'Arjun Rao',
    phone: '+91 9123456780',
    email: 'arjun@example.com',
    course: 'Study Abroad',
    school: 'Scholars Hub',
    source: 'Website',
    status: 'contacted',
    tags: ['call-later'],
    leadScore: 72,
    createdAt: new Date('2026-04-20T12:10:00'),
    updatedAt: new Date('2026-04-24T19:30:00'),
    messageCount: 4,
    replyCount: 1,
    hasOptedIn: false,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-11',
    name: 'Pooja Das',
    phone: '+91 8765432109',
    email: 'pooja@example.com',
    course: 'Nursing',
    school: 'Bright Future Academy',
    source: 'Referral',
    status: 'interested',
    tags: ['follow-up'],
    leadScore: 77,
    createdAt: new Date('2026-04-21T10:10:00'),
    updatedAt: new Date('2026-04-24T18:15:00'),
    messageCount: 6,
    replyCount: 2,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-12',
    name: 'Aditya Sen',
    phone: '+91 9345678901',
    email: 'aditya@example.com',
    course: 'MBA',
    school: 'Scholars Hub',
    source: 'Manual Entry',
    status: 'converted',
    tags: ['vip'],
    leadScore: 91,
    createdAt: new Date('2026-04-08T11:00:00'),
    updatedAt: new Date('2026-04-25T09:20:00'),
    messageCount: 10,
    replyCount: 6,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-13',
    name: 'Ritu Malhotra',
    phone: '+91 7777777777',
    email: 'ritu@example.com',
    course: 'MBA',
    school: 'Bright Future Academy',
    source: 'Meta Ads',
    status: 'new',
    tags: ['hot', 'follow-up'],
    leadScore: 90,
    createdAt: new Date('2026-04-23T10:00:00'),
    updatedAt: new Date('2026-04-25T08:45:00'),
    messageCount: 5,
    replyCount: 2,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
  {
    id: 'mock-14',
    name: 'Farhan Ali',
    phone: '9876543210',
    email: 'farhan@example.com',
    course: 'MBA',
    school: 'Delhi Public School',
    source: 'Meta Ads',
    status: 'interested',
    tags: ['hot'],
    leadScore: 86,
    createdAt: new Date('2026-04-22T09:20:00'),
    updatedAt: new Date('2026-04-25T16:15:00'),
    messageCount: 7,
    replyCount: 3,
    hasOptedIn: true,
    notes: [],
    customFields: {},
  },
];

const mockCampaigns: Campaign[] = [
  {
    id: 'mock-campaign-1',
    name: 'MBA April Push',
    description: 'Retarget high-intent MBA students',
    messageTemplate: 'Hi {{name}}, admissions are open for the MBA intake.',
    targetTags: ['hot', 'interested'],
    targetSegments: [],
    status: 'running',
    totalRecipients: 120,
    sentCount: 120,
    deliveredCount: 114,
    readCount: 98,
    repliedCount: 37,
    failedCount: 6,
    abTestEnabled: false,
    createdBy: 'mock-admin',
    createdAt: new Date('2026-04-10T09:00:00'),
  },
  {
    id: 'mock-campaign-2',
    name: 'Study Abroad Reminder',
    description: 'Document collection and call-back follow-up',
    messageTemplate: 'Your counselor is ready to guide you on the next steps.',
    targetTags: ['follow-up'],
    targetSegments: [],
    status: 'completed',
    totalRecipients: 75,
    sentCount: 75,
    deliveredCount: 72,
    readCount: 59,
    repliedCount: 19,
    failedCount: 3,
    abTestEnabled: true,
    variantA: 'Book your counseling slot today.',
    variantB: 'Reply YES to schedule your counselor callback.',
    createdBy: 'mock-admin',
    createdAt: new Date('2026-04-12T11:00:00'),
  },
];

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, '');
}

function estimateStudentValue(contact: Contact) {
  const course = (contact.course || '').toLowerCase();
  if (course.includes('mba') || course.includes('pgdm')) return 85000;
  if (course.includes('engineering') || course.includes('b.tech')) return 70000;
  if (course.includes('medical') || course.includes('nursing')) return 95000;
  if (course.includes('study abroad') || course.includes('abroad')) return 140000;
  if (course.includes('iti') || course.includes('diploma')) return 45000;
  return 60000;
}

function getAcquisitionCost(contact: Contact) {
  const key = (contact.source || 'manual entry').toLowerCase();
  return sourceCostMap[key] ?? 160;
}

function getSeverityClasses(severity: Severity) {
  if (severity === 'high') return 'bg-red-100 text-red-700 border-red-200';
  if (severity === 'medium') return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-emerald-100 text-emerald-700 border-emerald-200';
}

function createAnomaly(anomaly: Anomaly) {
  return anomaly;
}

function getPredictedProbability(contact: Contact) {
  let probability = 0.08;
  if (contact.status === 'converted') probability = 1;
  else if (contact.status === 'interested') probability += 0.45;
  else if (contact.status === 'contacted') probability += 0.18;
  else if (contact.status === 'lost') probability -= 0.12;

  probability += contact.leadScore / 200;
  probability += Math.min(contact.replyCount, 8) * 0.025;
  probability += Math.min(contact.messageCount, 10) * 0.008;
  if (contact.tags.includes('hot') || contact.tags.includes('interested')) probability += 0.12;
  if (contact.tags.includes('not-interested')) probability -= 0.35;
  if (contact.tags.includes('call-later')) probability -= 0.05;
  if (!contact.hasOptedIn) probability -= 0.06;

  return Math.max(0, Math.min(1, probability));
}

function getPhoneHealth(contact: Contact) {
  const normalized = normalizePhone(contact.phone);
  const repeatedPattern = /^(\d)\1{6,}$/.test(normalized);
  const sequentialPattern =
    normalized.includes('123456') ||
    normalized.includes('234567') ||
    normalized.includes('345678') ||
    normalized.includes('456789');
  const validLength = normalized.length >= 10 && normalized.length <= 12;
  const startsValid = normalized.length < 10 || ['6', '7', '8', '9'].includes(normalized.slice(-10, -9) || normalized[0]);

  return {
    normalized,
    valid: validLength && startsValid && !repeatedPattern,
    repeatedPattern,
    sequentialPattern,
    validLength,
    startsValid,
  };
}

export function FinanceCloudView({ store }: FinanceCloudViewProps) {
  const [scanState, setScanState] = useState<ScanState>({
    status: 'idle',
    totalFindings: 0,
    highestSeverity: 'low',
    dataSource: 'live',
  });
  const [scanDialogOpen, setScanDialogOpen] = useState(false);

  const usingMockData = store.contacts.length === 0;
  const contacts = usingMockData ? mockContacts : store.contacts;
  const campaigns = store.campaigns.length === 0 ? mockCampaigns : store.campaigns;

  const analytics = useMemo(() => {
    const totalStudents = contacts.length;
    const pipeline: Record<LeadStatus, number> = { new: 0, contacted: 0, interested: 0, converted: 0, lost: 0 };
    const duplicateBuckets = new Map<string, Contact[]>();
    const invalidPhones: Contact[] = [];
    const suspiciousPhones: Contact[] = [];
    const stalledHighIntent: Contact[] = [];
    const sourceBuckets = new Map<string, Contact[]>();
    const schoolBuckets = new Map<string, Contact[]>();
    let totalAcquisitionCost = 0;
    let totalPredictedRevenue = 0;
    let convertedRevenue = 0;

    contacts.forEach((contact) => {
      pipeline[contact.status]++;
      totalAcquisitionCost += getAcquisitionCost(contact);

      const predictedProbability = getPredictedProbability(contact);
      const studentValue = estimateStudentValue(contact);
      totalPredictedRevenue += predictedProbability * studentValue;
      if (contact.status === 'converted') convertedRevenue += studentValue;

      const phone = getPhoneHealth(contact);
      if (!phone.valid) invalidPhones.push(contact);
      if (phone.repeatedPattern || phone.sequentialPattern) suspiciousPhones.push(contact);
      if (phone.normalized) {
        duplicateBuckets.set(phone.normalized, [...(duplicateBuckets.get(phone.normalized) || []), contact]);
      }

      if (
        contact.leadScore >= 75 &&
        ['new', 'contacted', 'lost'].includes(contact.status) &&
        (contact.replyCount > 0 || contact.tags.includes('hot'))
      ) {
        stalledHighIntent.push(contact);
      }

      const sourceKey = contact.source?.trim() || 'Unknown';
      sourceBuckets.set(sourceKey, [...(sourceBuckets.get(sourceKey) || []), contact]);

      const schoolKey = contact.school?.trim() || 'Unknown School';
      schoolBuckets.set(schoolKey, [...(schoolBuckets.get(schoolKey) || []), contact]);
    });

    const duplicatePhones = Array.from(duplicateBuckets.values()).filter((group) => group.length > 1);
    const overallConversionRate = totalStudents ? (pipeline.converted / totalStudents) * 100 : 0;
    const interestedLeads = pipeline.interested;
    const projectedExtraConversions = Math.round(
      contacts
        .filter((contact) => contact.status !== 'converted')
        .reduce((sum, contact) => sum + getPredictedProbability(contact), 0),
    );
    const projectedRevenueUpside = Math.max(0, totalPredictedRevenue - convertedRevenue);
    const costPerLead = totalStudents ? totalAcquisitionCost / totalStudents : 0;
    const costPerConversion = pipeline.converted ? totalAcquisitionCost / pipeline.converted : totalAcquisitionCost;
    const roi = totalAcquisitionCost ? ((convertedRevenue - totalAcquisitionCost) / totalAcquisitionCost) * 100 : 0;

    const weakestSources = Array.from(sourceBuckets.entries())
      .map(([source, sourceContacts]) => {
        const converted = sourceContacts.filter((contact) => contact.status === 'converted').length;
        const rate = sourceContacts.length ? (converted / sourceContacts.length) * 100 : 0;
        return { source, total: sourceContacts.length, converted, rate };
      })
      .filter((source) => source.total >= 3 && source.rate + 10 < overallConversionRate)
      .sort((a, b) => a.rate - b.rate);

    const weakSchools = Array.from(schoolBuckets.entries())
      .map(([school, schoolContacts]) => {
        const converted = schoolContacts.filter((contact) => contact.status === 'converted').length;
        const highIntent = schoolContacts.filter((contact) => contact.leadScore >= 70).length;
        return { school, total: schoolContacts.length, converted, highIntent };
      })
      .filter((school) => school.total >= 4 && school.converted === 0 && school.highIntent >= 2)
      .sort((a, b) => b.highIntent - a.highIntent);

    const severityWeight: Record<Severity, number> = { high: 3, medium: 2, low: 1 };
    const anomalies: Anomaly[] = [
      createAnomaly({
        id: 'invalid-phones',
        severity: invalidPhones.length > 4 ? 'high' : invalidPhones.length > 0 ? 'medium' : 'low',
        title: 'Phone number anomalies',
        detail: invalidPhones.length
          ? `${invalidPhones.length} leads have missing digits, invalid prefixes, or unstable number formatting.`
          : 'No invalid phone numbers detected in the current dataset.',
        impact: invalidPhones.length
          ? 'These leads can fail outreach, distort reporting, and inflate acquisition cost.'
          : 'Phone outreach health is stable.',
        count: invalidPhones.length,
      }),
      createAnomaly({
        id: 'duplicate-phones',
        severity: duplicatePhones.length > 2 ? 'high' : duplicatePhones.length > 0 ? 'medium' : 'low',
        title: 'Duplicate lead numbers',
        detail: duplicatePhones.length
          ? `${duplicatePhones.length} duplicate number clusters can double-count students and fake pipeline growth.`
          : 'No duplicate phone clusters found.',
        impact: duplicatePhones.length
          ? 'Deduplicating these records will clean conversion, CAC, and agent workload metrics.'
          : 'No duplicate-contact impact detected.',
        count: duplicatePhones.length,
      }),
      createAnomaly({
        id: 'stalled-intent',
        severity: stalledHighIntent.length > 5 ? 'high' : stalledHighIntent.length > 0 ? 'medium' : 'low',
        title: 'High-score leads are stalling',
        detail: stalledHighIntent.length
          ? `${stalledHighIntent.length} students have strong buying signals but are not yet moving to converted.`
          : 'No stalled high-intent lead cluster detected.',
        impact: stalledHighIntent.length
          ? 'Fast follow-up here is the easiest place to raise conversions.'
          : 'No urgent funnel stall detected.',
        count: stalledHighIntent.length,
      }),
      createAnomaly({
        id: 'source-drops',
        severity: weakestSources.length > 1 ? 'medium' : weakestSources.length > 0 ? 'low' : 'low',
        title: 'Source conversion underperformance',
        detail: weakestSources.length
          ? `${weakestSources.slice(0, 2).map((item) => item.source).join(' and ')} are converting below the portfolio average.`
          : 'No major source-level conversion drop detected.',
        impact: weakestSources.length
          ? 'Budget can be shifted into better channels to lower cost per conversion.'
          : 'Source mix is currently balanced.',
        count: weakestSources.length,
      }),
      createAnomaly({
        id: 'school-clusters',
        severity: weakSchools.length > 0 ? 'medium' : 'low',
        title: 'School clusters with no conversions',
        detail: weakSchools.length
          ? `${weakSchools[0].school} has ${weakSchools[0].total} leads and zero conversions despite qualified interest.`
          : 'No school-level dead zones detected.',
        impact: weakSchools.length
          ? 'This can indicate messaging mismatch, weak counselor follow-up, or bad lead quality.'
          : 'School-level conversion spread looks healthy.',
        count: weakSchools.length,
      }),
    ].sort((a, b) => severityWeight[b.severity] - severityWeight[a.severity] || b.count - a.count);

    return {
      totalStudents,
      interestedLeads,
      convertedStudents: pipeline.converted,
      pipeline,
      overallConversionRate,
      invalidPhones,
      suspiciousPhones,
      duplicatePhones,
      stalledHighIntent,
      weakestSources,
      weakSchools,
      anomalies,
      totalAcquisitionCost,
      totalPredictedRevenue,
      convertedRevenue,
      projectedExtraConversions,
      projectedRevenueUpside,
      costPerLead,
      costPerConversion,
      roi,
    };
  }, [contacts]);

  const findingsCount = analytics.anomalies.reduce((sum, anomaly) => sum + anomaly.count, 0);
  const topSeverity = analytics.anomalies[0]?.severity ?? 'low';
  const campaignReach = campaigns.reduce((sum, campaign) => sum + campaign.sentCount, 0);

  const pipelineSteps = [
    { key: 'new', count: analytics.pipeline.new },
    { key: 'contacted', count: analytics.pipeline.contacted },
    { key: 'interested', count: analytics.pipeline.interested },
    { key: 'converted', count: analytics.pipeline.converted },
    { key: 'lost', count: analytics.pipeline.lost },
  ] as const;

  const runDiagnostics = () => {
    const startedAt = new Date();
    setScanState((current) => ({
      ...current,
      status: 'running',
      startedAt,
      dataSource: usingMockData ? 'mock' : 'live',
    }));

    window.setTimeout(() => {
      setScanState({
        status: 'completed',
        startedAt,
        completedAt: new Date(),
        totalFindings: findingsCount,
        highestSeverity: topSeverity,
        dataSource: usingMockData ? 'mock' : 'live',
      });
      setScanDialogOpen(true);
    }, 900);
  };

  useEffect(() => {
    if (contacts.length === 0 && campaigns.length === 0) return;
    runDiagnostics();
  }, [contacts.length, campaigns.length, findingsCount, topSeverity, usingMockData]);

  const scanHeadline =
    topSeverity === 'high'
      ? 'Critical anomalies detected'
      : topSeverity === 'medium'
        ? 'Reviewable anomalies detected'
        : 'Lead data health is stable';

  const latestChangeText =
    analytics.invalidPhones.length > 0
      ? `${analytics.invalidPhones.length} invalid phone numbers need review`
      : analytics.duplicatePhones.length > 0
        ? `${analytics.duplicatePhones.length} duplicate phone clusters detected`
        : analytics.stalledHighIntent.length > 0
          ? `${analytics.stalledHighIntent.length} high-intent students are stuck in the funnel`
          : 'No urgent change detected in the loaded dataset';

  return (
    <div className="space-y-6">
      {usingMockData && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <p className="font-semibold text-blue-900">Mock data mode is on</p>
          <p className="mt-1 text-sm text-blue-800">
            Finance Cloud is showing built-in sample leads and campaigns because no real contacts were loaded yet.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance Cloud Intelligence</h1>
          <p className="text-slate-500">
            Main command center for lead economics, phone-number anomaly detection, and conversion forecasting.
          </p>
        </div>
        <Button
          onClick={runDiagnostics}
          disabled={scanState.status === 'running'}
          className="bg-emerald-600 hover:bg-emerald-700 gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${scanState.status === 'running' ? 'animate-spin' : ''}`} />
          {scanState.status === 'running' ? 'Running checks...' : 'Run anomaly scan'}
        </Button>
      </div>

      <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Auto Scan Result</DialogTitle>
            <DialogDescription>
              This pop view shows the latest anomaly result and the method Finance Cloud uses to scan data automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 capitalize">{scanState.status}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Severity</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 capitalize">{scanState.highestSeverity}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Findings</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{scanState.totalFindings}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Source</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 capitalize">{scanState.dataSource}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="font-semibold text-slate-900">{scanHeadline}</p>
            <p className="mt-1 text-sm text-slate-600">{latestChangeText}</p>
            <p className="mt-2 text-xs text-slate-500">
              {scanState.completedAt
                ? `Completed at ${scanState.completedAt.toLocaleTimeString()}`
                : 'Waiting for scan completion'}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-900">How the auto scan is done</p>
            <div className="rounded-xl border p-4">
              <p className="text-sm text-slate-700">
                `Stage 1:` Finance Cloud receives contacts and campaigns from the live API, or from mock test data if nothing is loaded yet.
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-sm text-slate-700">
                `Stage 2:` Each contact is checked for phone validity, suspicious repeated digits, sequential patterns, duplicate normalized numbers, lead score strength, reply behavior, source quality, and school performance.
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-sm text-slate-700">
                `Stage 3:` Finance Cloud calculates pipeline counts, predicted conversion probability, projected revenue, acquisition cost, cost per conversion, and ROI.
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-sm text-slate-700">
                `Stage 4:` The detector groups findings into anomaly buckets like invalid phones, duplicate leads, stalled high-intent students, weak sources, and non-converting school clusters.
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-sm text-slate-700">
                `Stage 5:` The highest-severity result is surfaced in the dashboard and this pop view opens so the scan result is visible immediately after load.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Current anomaly hits</p>
            {analytics.anomalies.map((anomaly) => (
              <div key={anomaly.id} className="rounded-xl border p-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-slate-900">{anomaly.title}</p>
                  <Badge variant="outline" className={getSeverityClasses(anomaly.severity)}>
                    {anomaly.severity}
                  </Badge>
                  <Badge variant="secondary">{anomaly.count}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">{anomaly.detail}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-600" />
              Auto anomaly scan
            </CardTitle>
            <CardDescription>
              The scan runs automatically when Finance Cloud loads contacts or campaigns from the API or mock fallback.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Scan status</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 capitalize">{scanState.status}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Highest severity</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 capitalize">{scanState.highestSeverity}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Findings</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{scanState.totalFindings}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Data source</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 capitalize">{scanState.dataSource}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Live anomaly change
            </CardTitle>
            <CardDescription>
              This section changes whenever loaded data changes and the latest scan completes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge variant="outline" className={getSeverityClasses(topSeverity)}>
              {scanHeadline}
            </Badge>
            <p className="text-sm text-slate-700">{latestChangeText}</p>
            <p className="text-sm text-slate-500">
              {scanState.completedAt
                ? `Last completed scan: ${scanState.completedAt.toLocaleTimeString()}`
                : 'Waiting for the first completed scan.'}
            </p>
            <Button variant="outline" size="sm" onClick={() => setScanDialogOpen(true)}>
              View auto scan pop-up
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 text-white">
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-3">
            <Badge className="bg-white/10 text-emerald-200 border-white/10 hover:bg-white/10">Primary finance section</Badge>
            <h2 className="text-3xl font-bold leading-tight">
              {analytics.totalStudents} students tracked, {analytics.convertedStudents} converted, and{' '}
              {currency.format(analytics.projectedRevenueUpside)} still available to unlock.
            </h2>
            <p className="text-slate-300 max-w-3xl">
              The model uses lead score, reply behavior, funnel status, source quality, and phone validity to estimate where revenue is leaking and where extra checks can raise conversions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-sm text-slate-400">Conversion rate</p>
              <p className="text-2xl font-bold text-emerald-300">{percent.format(analytics.overallConversionRate)}%</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-sm text-slate-400">Predicted extra conversions</p>
              <p className="text-2xl font-bold text-blue-300">{analytics.projectedExtraConversions}</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-sm text-slate-400">Modeled acquisition cost</p>
              <p className="text-2xl font-bold text-amber-300">{currency.format(analytics.totalAcquisitionCost)}</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-sm text-slate-400">ROI estimate</p>
              <p className={`text-2xl font-bold ${analytics.roi >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
                {percent.format(analytics.roi)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: 'Validated numbers',
            value: analytics.totalStudents - analytics.invalidPhones.length,
            subtitle: `${analytics.invalidPhones.length} flagged`,
            icon: Phone,
            tone: 'text-blue-600 bg-blue-50',
          },
          {
            title: 'Converted students',
            value: analytics.convertedStudents,
            subtitle: `${analytics.interestedLeads} interested right now`,
            icon: Target,
            tone: 'text-emerald-600 bg-emerald-50',
          },
          {
            title: 'Cost per conversion',
            value: currency.format(analytics.costPerConversion || 0),
            subtitle: `Cost per lead ${currency.format(analytics.costPerLead || 0)}`,
            icon: BadgeDollarSign,
            tone: 'text-amber-600 bg-amber-50',
          },
          {
            title: 'Campaign reach',
            value: campaignReach,
            subtitle: `${campaigns.length} campaigns contributing`,
            icon: BarChart3,
            tone: 'text-purple-600 bg-purple-50',
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">{item.title}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.subtitle}</p>
                  </div>
                  <div className={`rounded-xl p-3 ${item.tone}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              Complete Anomaly Detector
            </CardTitle>
            <CardDescription>
              Phone validation, duplicate checks, funnel stalls, source underperformance, and school-level dead zones.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.anomalies.map((anomaly) => (
              <div key={anomaly.id} className="rounded-xl border p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-900">{anomaly.title}</p>
                      <Badge variant="outline" className={getSeverityClasses(anomaly.severity)}>
                        {anomaly.severity} severity
                      </Badge>
                      <Badge variant="secondary">{anomaly.count} hits</Badge>
                    </div>
                    <p className="text-sm text-slate-600">{anomaly.detail}</p>
                    <p className="text-sm text-slate-500">{anomaly.impact}</p>
                  </div>
                  <div className="sm:w-28">
                    <Progress value={Math.min(100, anomaly.count * 12)} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-emerald-600" />
              Predictive Economics
            </CardTitle>
            <CardDescription>
              Modeled financial view based on current student intent and lead-quality signals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-sm text-emerald-700">Current converted revenue</p>
              <p className="text-2xl font-bold text-emerald-900">{currency.format(analytics.convertedRevenue)}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-blue-700">Predicted total revenue</p>
              <p className="text-2xl font-bold text-blue-900">{currency.format(analytics.totalPredictedRevenue)}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-sm text-amber-700">Revenue still at risk</p>
              <p className="text-2xl font-bold text-amber-900">{currency.format(analytics.projectedRevenueUpside)}</p>
            </div>
            <div className="rounded-xl border border-dashed p-4">
              <p className="text-sm font-medium text-slate-700">Prediction logic</p>
              <p className="mt-1 text-sm text-slate-500">
                We project likely conversions from score, replies, hot tags, campaign engagement, and current funnel stage. Financial values are estimated from course type because the dataset does not yet contain actual fee or spend fields.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-700" />
              Funnel by student count
            </CardTitle>
            <CardDescription>
              This shows how many students are sitting in each stage right now.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pipelineSteps.map((step) => {
              const count = step.count;
              const share = analytics.totalStudents ? (count / analytics.totalStudents) * 100 : 0;
              return (
                <div key={step.key} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{statusLabels[step.key]}</span>
                    <span className="text-slate-500">
                      {count} students • {percent.format(share)}%
                    </span>
                  </div>
                  <Progress value={share} className="h-2.5" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Number checks
            </CardTitle>
            <CardDescription>
              Fast view of phone quality issues that can block outreach and reporting.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Invalid</p>
                <p className="text-2xl font-bold text-slate-900">{analytics.invalidPhones.length}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Duplicates</p>
                <p className="text-2xl font-bold text-slate-900">{analytics.duplicatePhones.length}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Suspicious</p>
                <p className="text-2xl font-bold text-slate-900">{analytics.suspiciousPhones.length}</p>
              </div>
            </div>
            <div className="space-y-2">
              {analytics.invalidPhones.slice(0, 4).map((contact) => (
                <div key={contact.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <div>
                    <p className="font-medium text-slate-800">{contact.name}</p>
                    <p className="text-slate-500">{contact.phone}</p>
                  </div>
                  <Badge variant="outline" className="border-red-200 text-red-700">
                    Review number
                  </Badge>
                </div>
              ))}
              {analytics.invalidPhones.length === 0 && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  All current phone numbers pass the basic validation checks.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              Best places to raise conversions
            </CardTitle>
            <CardDescription>
              Highest-impact checks based on current signal quality.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              analytics.stalledHighIntent.length
                ? `Prioritize ${analytics.stalledHighIntent.length} high-score leads that have replies or hot tags but are still not converted.`
                : 'High-score leads are not currently the main bottleneck.',
              analytics.invalidPhones.length
                ? `Repair or re-verify ${analytics.invalidPhones.length} bad numbers before assigning more agent effort.`
                : 'Phone validation is not dragging current follow-up.',
              analytics.weakestSources[0]
                ? `Reduce spend on ${analytics.weakestSources[0].source} until its conversion rate improves.`
                : 'Source-level performance is fairly even right now.',
              analytics.weakSchools[0]
                ? `Rewrite the pitch for ${analytics.weakSchools[0].school}; the cluster has qualified demand without conversions.`
                : 'No school cluster needs urgent messaging intervention.',
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border p-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-600" />
              Root-cause summaries
            </CardTitle>
            <CardDescription>
              Plain-language explanations of what the detector is seeing in the data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-medium text-slate-800">Why numbers are being flagged</p>
              <p className="mt-1 text-sm text-slate-600">
                We check digit length, likely mobile prefixes, repeated digits, sequential patterns, and duplicate normalized values to catch fake, partial, or reused student records.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-medium text-slate-800">Why money is estimated</p>
              <p className="mt-1 text-sm text-slate-600">
                The app does not yet store actual fee collection or ad-spend values, so Finance Cloud models acquisition cost by source and student value by course family.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-medium text-slate-800">How to improve accuracy next</p>
              <p className="mt-1 text-sm text-slate-600">
                Add real tuition amount, actual marketing spend, counselor owner, and last follow-up outcome so the anomaly detector can move from estimated finance to exact finance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900">Finance note</p>
            <p className="mt-1 text-sm text-amber-800">
              Revenue, acquisition cost, cost per conversion, and ROI are predictive estimates from the current CRM fields. Once we add real fee and spend fields, this section can upgrade from modeled analytics to exact finance reporting.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test anomaly data included</CardTitle>
          <CardDescription>
            Sample leads now include intentional anomaly cases so the section visibly changes as soon as data loads.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-600">
          <p>`12345` tests invalid-length detection.</p>
          <p>`9999999999`, `8888888888`, and `7777777777` test repeated-digit suspicious numbers.</p>
          <p>`9876543210` and `8765432109` are duplicated to test duplicate clusters.</p>
          <p>`Bright Future Academy` and `Meta Ads` contain high-intent but under-converted records to trigger school and source warnings.</p>
        </CardContent>
      </Card>
    </div>
  );
}
