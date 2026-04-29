import type { Contact, Campaign, Automation, Task, Message } from '@/types';

const now = new Date();
const d = (daysAgo: number) => new Date(now.getTime() - daysAgo * 86400000);

export const MOCK_CONTACTS: Contact[] = [
  { id: 'c1', name: 'Aarav Sharma', phone: '+919876543210', email: 'aarav@example.com', course: 'MBA', school: 'Delhi Public School', source: 'Meta Ads', status: 'interested', tags: ['hot', 'interested'], leadScore: 92, intent: 'interested', messageCount: 8, replyCount: 4, hasOptedIn: true, createdAt: d(10), updatedAt: d(1), lastContactedAt: d(1), notes: [], customFields: {} },
  { id: 'c2', name: 'Priya Nair', phone: '+919999999999', email: 'priya@example.com', course: 'B.Tech', school: 'St. Mary School', source: 'Instagram', status: 'new', tags: ['warm'], leadScore: 68, intent: 'neutral', messageCount: 2, replyCount: 0, hasOptedIn: true, createdAt: d(8), updatedAt: d(2), notes: [], customFields: {} },
  { id: 'c3', name: 'Rahul Verma', phone: '9876543210', email: 'rahul@example.com', course: 'MBA', school: 'Delhi Public School', source: 'Meta Ads', status: 'contacted', tags: ['follow-up'], leadScore: 81, intent: 'neutral', messageCount: 6, replyCount: 2, hasOptedIn: true, createdAt: d(12), updatedAt: d(2), lastContactedAt: d(2), notes: [], customFields: {} },
  { id: 'c4', name: 'Sneha Gupta', phone: '12345', email: 'sneha@example.com', course: 'Study Abroad', school: 'Bright Future Academy', source: 'Website', status: 'contacted', tags: ['follow-up'], leadScore: 74, intent: 'neutral', messageCount: 5, replyCount: 1, hasOptedIn: true, createdAt: d(14), updatedAt: d(5), lastContactedAt: d(5), notes: [], customFields: {} },
  { id: 'c5', name: 'Ishita Kapoor', phone: '+918765432109', email: 'ishita@example.com', course: 'Nursing', school: 'Bright Future Academy', source: 'Referral', status: 'converted', tags: ['vip', 'hot'], leadScore: 96, intent: 'interested', messageCount: 11, replyCount: 7, hasOptedIn: true, createdAt: d(18), updatedAt: d(0), lastContactedAt: d(0), notes: [], customFields: {} },
  { id: 'c6', name: 'Karan Mehta', phone: '+919876501234', email: 'karan@example.com', course: 'Diploma', school: 'City Central School', source: 'WhatsApp Group', status: 'lost', tags: ['not-interested'], leadScore: 39, intent: 'not-interested', messageCount: 4, replyCount: 1, hasOptedIn: true, createdAt: d(20), updatedAt: d(4), notes: [], customFields: {} },
  { id: 'c7', name: 'Meera Joshi', phone: '+918888888888', email: 'meera@example.com', course: 'MBA', school: 'Bright Future Academy', source: 'Meta Ads', status: 'interested', tags: ['hot'], leadScore: 88, intent: 'interested', messageCount: 7, replyCount: 3, hasOptedIn: true, createdAt: d(9), updatedAt: d(1), lastContactedAt: d(1), notes: [], customFields: {} },
  { id: 'c8', name: 'Dev Patel', phone: '+917654321098', email: 'dev@example.com', course: 'B.Tech', school: 'City Central School', source: 'Instagram', status: 'converted', tags: ['warm'], leadScore: 79, intent: 'interested', messageCount: 9, replyCount: 5, hasOptedIn: true, createdAt: d(16), updatedAt: d(0), lastContactedAt: d(0), notes: [], customFields: {} },
  { id: 'c9', name: 'Nisha Singh', phone: '+916123456789', email: 'nisha@example.com', course: 'MBA', school: 'Bright Future Academy', source: 'Meta Ads', status: 'new', tags: ['hot'], leadScore: 84, intent: 'neutral', messageCount: 3, replyCount: 1, hasOptedIn: true, createdAt: d(3), updatedAt: d(1), notes: [], customFields: {} },
  { id: 'c10', name: 'Arjun Rao', phone: '+919123456780', email: 'arjun@example.com', course: 'Study Abroad', school: 'Scholars Hub', source: 'Website', status: 'contacted', tags: ['call-later'], leadScore: 72, intent: 'neutral', messageCount: 4, replyCount: 1, hasOptedIn: false, createdAt: d(5), updatedAt: d(1), lastContactedAt: d(1), notes: [], customFields: {} },
  { id: 'c11', name: 'Pooja Das', phone: '+918765432109', email: 'pooja@example.com', course: 'Nursing', school: 'Bright Future Academy', source: 'Referral', status: 'interested', tags: ['follow-up'], leadScore: 77, intent: 'interested', messageCount: 6, replyCount: 2, hasOptedIn: true, createdAt: d(4), updatedAt: d(1), lastContactedAt: d(1), notes: [], customFields: {} },
  { id: 'c12', name: 'Aditya Sen', phone: '+919345678901', email: 'aditya@example.com', course: 'MBA', school: 'Scholars Hub', source: 'Manual Entry', status: 'converted', tags: ['vip'], leadScore: 91, intent: 'interested', messageCount: 10, replyCount: 6, hasOptedIn: true, createdAt: d(22), updatedAt: d(0), lastContactedAt: d(0), notes: [], customFields: {} },
  { id: 'c13', name: 'Ritu Malhotra', phone: '+917777777777', email: 'ritu@example.com', course: 'MBA', school: 'Bright Future Academy', source: 'Meta Ads', status: 'new', tags: ['hot', 'follow-up'], leadScore: 90, intent: 'neutral', messageCount: 5, replyCount: 2, hasOptedIn: true, createdAt: d(2), updatedAt: d(0), notes: [], customFields: {} },
  { id: 'c14', name: 'Farhan Ali', phone: '9876543210', email: 'farhan@example.com', course: 'MBA', school: 'Delhi Public School', source: 'Meta Ads', status: 'interested', tags: ['hot'], leadScore: 86, intent: 'interested', messageCount: 7, replyCount: 3, hasOptedIn: true, createdAt: d(3), updatedAt: d(1), lastContactedAt: d(1), notes: [], customFields: {} },
  { id: 'c15', name: 'Kavya Reddy', phone: '+919988776655', email: 'kavya@example.com', course: 'Medical', school: 'Scholars Hub', source: 'Referral', status: 'interested', tags: ['hot', 'vip'], leadScore: 94, intent: 'interested', messageCount: 12, replyCount: 8, hasOptedIn: true, createdAt: d(6), updatedAt: d(0), lastContactedAt: d(0), notes: [], customFields: {} },
  { id: 'c16', name: 'Rohan Bose', phone: '+918877665544', email: 'rohan@example.com', course: 'B.Tech', school: 'Delhi Public School', source: 'Instagram', status: 'contacted', tags: ['warm'], leadScore: 65, intent: 'neutral', messageCount: 3, replyCount: 1, hasOptedIn: true, createdAt: d(7), updatedAt: d(3), lastContactedAt: d(3), notes: [], customFields: {} },
  { id: 'c17', name: 'Ananya Pillai', phone: '+917766554433', email: 'ananya@example.com', course: 'Study Abroad', school: 'Bright Future Academy', source: 'Website', status: 'new', tags: ['warm'], leadScore: 58, intent: 'neutral', messageCount: 1, replyCount: 0, hasOptedIn: false, createdAt: d(1), updatedAt: d(0), notes: [], customFields: {} },
  { id: 'c18', name: 'Vikram Nair', phone: '+916655443322', email: 'vikram@example.com', course: 'MBA', school: 'City Central School', source: 'Meta Ads', status: 'lost', tags: ['cold'], leadScore: 28, intent: 'not-interested', messageCount: 2, replyCount: 0, hasOptedIn: true, createdAt: d(25), updatedAt: d(10), notes: [], customFields: {} },
  { id: 'c19', name: 'Sana Sheikh', phone: '+919876512345', email: 'sana@example.com', course: 'Nursing', school: 'Scholars Hub', source: 'Referral', status: 'converted', tags: ['vip', 'hot'], leadScore: 97, intent: 'interested', messageCount: 14, replyCount: 9, hasOptedIn: true, createdAt: d(30), updatedAt: d(0), lastContactedAt: d(0), notes: [], customFields: {} },
  { id: 'c20', name: 'Tarun Khanna', phone: '+918765123456', email: 'tarun@example.com', course: 'Diploma', school: 'City Central School', source: 'WhatsApp Group', status: 'new', tags: ['cold'], leadScore: 42, intent: 'neutral', messageCount: 1, replyCount: 0, hasOptedIn: true, createdAt: d(1), updatedAt: d(0), notes: [], customFields: {} },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp1', name: 'MBA April Push', description: 'Retarget high-intent MBA students for April intake',
    messageTemplate: 'Hi {{name}}, MBA admissions are open! Limited seats available. Reply to know more.',
    targetTags: ['hot', 'interested'], targetSegments: [], targetContactIds: [],
    status: 'running', scheduledAt: d(5), startedAt: d(5),
    totalRecipients: 120, sentCount: 120, deliveredCount: 114, readCount: 98, repliedCount: 37, failedCount: 6,
    abTestEnabled: false, variantA: '', variantB: '', createdBy: 'Faiz', createdAt: d(7),
  },
  {
    id: 'camp2', name: 'Study Abroad Reminder', description: 'Document collection and counselor callback follow-up',
    messageTemplate: 'Hi {{name}}, your counselor is ready to guide you on the next steps for Study Abroad.',
    targetTags: ['follow-up'], targetSegments: [], targetContactIds: [],
    status: 'completed', scheduledAt: d(12), startedAt: d(12), completedAt: d(10),
    totalRecipients: 75, sentCount: 75, deliveredCount: 72, readCount: 59, repliedCount: 19, failedCount: 3,
    abTestEnabled: true, variantA: 'Book your counseling slot today.', variantB: 'Reply YES to schedule your callback.',
    createdBy: 'Rihab CK', createdAt: d(14),
  },
  {
    id: 'camp3', name: 'Nursing Scholarship Alert', description: 'Scholarship announcement for nursing applicants',
    messageTemplate: '🏆 Great news {{name}}! Scholarships available for Nursing. Limited seats. Apply now!',
    targetTags: ['warm', 'interested'], targetSegments: [], targetContactIds: [],
    status: 'scheduled', scheduledAt: d(-2),
    totalRecipients: 45, sentCount: 0, deliveredCount: 0, readCount: 0, repliedCount: 0, failedCount: 0,
    abTestEnabled: false, variantA: '', variantB: '', createdBy: 'Faiz', createdAt: d(1),
  },
  {
    id: 'camp4', name: 'B.Tech Open House Invite', description: 'Invite warm B.Tech leads to open house event',
    messageTemplate: 'Hi {{name}}! You are invited to our B.Tech Open House this Saturday. Would you like to attend?',
    targetTags: ['warm'], targetSegments: [], targetContactIds: [],
    status: 'paused',
    totalRecipients: 60, sentCount: 30, deliveredCount: 28, readCount: 20, repliedCount: 8, failedCount: 2,
    abTestEnabled: false, variantA: '', variantB: '', createdBy: 'Mohamed Shifal', createdAt: d(3),
  },
];

export const MOCK_TASKS: Task[] = [
  { id: 't1', title: 'Follow up with Aarav Sharma', description: 'He showed strong interest in MBA. Call to confirm seat.', contactId: 'c1', assignedTo: 'Faiz', assignedBy: 'Faiz', status: 'pending', priority: 'urgent', dueDate: d(-1), createdAt: d(3), updatedAt: d(1) },
  { id: 't2', title: 'Send Nursing brochure to Kavya', description: 'She requested detailed fee structure and hostel info.', contactId: 'c15', assignedTo: 'Rihab CK', assignedBy: 'Faiz', status: 'in-progress', priority: 'high', dueDate: d(1), createdAt: d(2), updatedAt: d(0) },
  { id: 't3', title: 'Re-engage Karan Mehta', description: 'Lost lead — try a different approach with scholarship offer.', contactId: 'c6', assignedTo: 'Mohamed Shifal', assignedBy: 'Faiz', status: 'pending', priority: 'medium', dueDate: d(3), createdAt: d(4), updatedAt: d(2) },
  { id: 't4', title: 'Verify Sneha Gupta phone number', description: 'Phone number 12345 is invalid. Get correct number.', contactId: 'c4', assignedTo: 'Faiz', assignedBy: 'Faiz', status: 'pending', priority: 'high', dueDate: d(0), createdAt: d(1), updatedAt: d(0) },
  { id: 't5', title: 'Schedule counseling for Arjun Rao', description: 'Study Abroad lead — not opted in yet. Needs counselor call.', contactId: 'c10', assignedTo: 'Rihab CK', assignedBy: 'Faiz', status: 'pending', priority: 'medium', dueDate: d(2), createdAt: d(3), updatedAt: d(1) },
  { id: 't6', title: 'Confirm enrollment for Ishita Kapoor', description: 'Converted — send fee payment link and enrollment form.', contactId: 'c5', assignedTo: 'Faiz', assignedBy: 'Faiz', status: 'completed', priority: 'urgent', dueDate: d(5), completedAt: d(4), createdAt: d(7), updatedAt: d(4) },
  { id: 't7', title: 'MBA batch orientation prep', description: 'Prepare orientation deck for April MBA batch.', assignedTo: 'Mohamed Shifal', assignedBy: 'Faiz', status: 'in-progress', priority: 'medium', dueDate: d(5), createdAt: d(6), updatedAt: d(1) },
  { id: 't8', title: 'Deduplicate phone records', description: 'Finance Cloud flagged 2 duplicate phone clusters. Clean up.', assignedTo: 'Faiz', assignedBy: 'Faiz', status: 'pending', priority: 'low', dueDate: d(7), createdAt: d(2), updatedAt: d(0) },
];

export const MOCK_AUTOMATIONS: Automation[] = [
  {
    id: 'auto1', name: 'New Lead Welcome', description: 'Send welcome message when a new contact is added',
    isActive: true,
    trigger: { type: 'new-contact', config: {} },
    actions: [
      { id: 'a1', type: 'send-message', config: { message: 'Hi {{name}}! Welcome to Enlighted Education. How can we help you today?' }, order: 1 },
      { id: 'a2', type: 'add-tag', config: { tag: 'warm' }, order: 2 },
    ],
    createdAt: d(30), updatedAt: d(5),
  },
  {
    id: 'auto2', name: 'Hot Lead Fast Track', description: 'Assign urgent task when a lead is tagged hot',
    isActive: true,
    trigger: { type: 'tag-added', config: { tag: 'hot' } },
    actions: [
      { id: 'a3', type: 'assign-task', config: { title: 'Urgent follow-up required', priority: 'urgent' }, order: 1 },
      { id: 'a4', type: 'send-message', config: { message: 'Hi {{name}}, our counselor will reach you shortly!' }, order: 2 },
    ],
    createdAt: d(25), updatedAt: d(3),
  },
  {
    id: 'auto3', name: 'No Reply Follow-up', description: 'Follow up if no reply in 3 days',
    isActive: true,
    trigger: { type: 'no-reply', config: { days: 3 } },
    actions: [
      { id: 'a5', type: 'send-message', config: { message: 'Hi {{name}}, just checking in! Any questions about admissions?' }, order: 1 },
      { id: 'a6', type: 'add-tag', config: { tag: 'follow-up' }, order: 2 },
    ],
    createdAt: d(20), updatedAt: d(2),
  },
  {
    id: 'auto4', name: 'Converted Student Onboarding', description: 'Send enrollment details when status changes to converted',
    isActive: false,
    trigger: { type: 'tag-added', config: { tag: 'vip' } },
    actions: [
      { id: 'a7', type: 'send-message', config: { message: 'Congratulations {{name}}! Your enrollment is confirmed. Here are your next steps.' }, order: 1 },
    ],
    createdAt: d(15), updatedAt: d(10),
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  c1: [
    { id: 'm1', contactId: 'c1', content: 'Hi, I am interested in MBA admissions', direction: 'inbound', status: 'read', sentAt: d(5), isAutomated: false },
    { id: 'm2', contactId: 'c1', content: 'Hi Aarav! Welcome to Enlighted. Our MBA program starts in April. Would you like details?', direction: 'outbound', status: 'read', sentAt: d(5), isAutomated: true },
    { id: 'm3', contactId: 'c1', content: 'Yes please, what are the fees?', direction: 'inbound', status: 'read', sentAt: d(4), isAutomated: false },
    { id: 'm4', contactId: 'c1', content: 'The MBA fee structure starts at ₹85,000. I will send you the full brochure.', direction: 'outbound', status: 'read', sentAt: d(4), isAutomated: false },
    { id: 'm5', contactId: 'c1', content: 'That sounds good. Can I visit the campus?', direction: 'inbound', status: 'read', sentAt: d(2), isAutomated: false },
    { id: 'm6', contactId: 'c1', content: 'Absolutely! Our next open house is this Saturday. Shall I register you?', direction: 'outbound', status: 'delivered', sentAt: d(1), isAutomated: false },
  ],
  c5: [
    { id: 'm7', contactId: 'c5', content: 'Hello, I want to join the Nursing program', direction: 'inbound', status: 'read', sentAt: d(10), isAutomated: false },
    { id: 'm8', contactId: 'c5', content: 'Hi Ishita! Great choice. Our Nursing program has excellent placement records.', direction: 'outbound', status: 'read', sentAt: d(10), isAutomated: false },
    { id: 'm9', contactId: 'c5', content: 'I have completed my enrollment form', direction: 'inbound', status: 'read', sentAt: d(3), isAutomated: false },
    { id: 'm10', contactId: 'c5', content: 'Congratulations Ishita! Your enrollment is confirmed. Welcome to Enlighted!', direction: 'outbound', status: 'read', sentAt: d(2), isAutomated: false },
  ],
  c15: [
    { id: 'm11', contactId: 'c15', content: 'Is there a scholarship for Medical students?', direction: 'inbound', status: 'read', sentAt: d(4), isAutomated: false },
    { id: 'm12', contactId: 'c15', content: 'Yes Kavya! We have merit scholarships up to 30% for Medical. Let me share details.', direction: 'outbound', status: 'read', sentAt: d(4), isAutomated: false },
    { id: 'm13', contactId: 'c15', content: 'That is amazing! I want to apply', direction: 'inbound', status: 'read', sentAt: d(2), isAutomated: false },
  ],
};
