import { ParticipantStatus } from '../types/participant';
import { EnergyAdvisor, BookingAgent, TechTeamMember, Contractor } from '../types/team';

export const MOCK_PARTICIPANTS = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'MacDonald',
    email: 'john.macdonald@example.com',
    phone: '(902) 555-0123',
    address: '123 Spring Garden Road',
    city: 'Halifax Regional Municipality',
    postalCode: 'B3J 2K9',
    program: 'Home Energy Assessment',
    status: ParticipantStatus.READY_FOR_TECH_TEAM,
    createdAt: '2024-03-18',
    propertyType: 'Single Family',
    notes: 'Initial assessment completed, pending technical review',
    assignedAdvisor: '1',
    onHold: false,
    reportUploaded: true,
    proposedUpgrades: [
      {
        id: 'upgrade-1',
        description: 'Install cold climate heat pump',
        category: 'HVAC Systems',
        specifications: 'Minimum HSPF 10, sized for 2000 sq ft home',
        status: 'PENDING_REVIEW'
      },
      {
        id: 'upgrade-2',
        description: 'Attic insulation upgrade',
        category: 'Insulation',
        specifications: 'R-60 value, includes air sealing of penetrations',
        status: 'PENDING_REVIEW'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        name: 'Initial Assessment Report.pdf',
        type: 'document',
        uploadedAt: '2024-03-18',
        stage: 'INITIAL_AUDIT'
      }
    ],
    statusHistory: [
      {
        status: ParticipantStatus.READY_FOR_BOOKING,
        date: '2024-03-15',
        notes: 'Application received'
      },
      {
        status: ParticipantStatus.BOOKED,
        date: '2024-03-16',
        assignedTo: 'Alex MacDonald',
        notes: 'Initial audit scheduled'
      }
    ]
  }
];

export const MOCK_ENERGY_ADVISORS: EnergyAdvisor[] = [
  {
    id: '1',
    name: 'Alex MacDonald',
    title: 'Senior Energy Advisor',
    email: 'alex.m@example.com',
    phone: '(902) 555-0101',
    serviceAreas: ['Halifax Regional Municipality', 'Dartmouth'],
    preferredDays: ['Monday', 'Tuesday', 'Wednesday'],
    totalContractUnits: 50,
    programsTrainedIn: ['Home Energy Assessment', 'Commercial Energy Audit'],
    status: 'ACTIVE',
    certificationLevel: 'SENIOR',
    maxAuditsPerDay: 3,
    averageAuditDuration: 120
  },
  {
    id: '2',
    name: 'Sarah Thompson',
    title: 'Energy Advisor',
    email: 'sarah.t@example.com',
    phone: '(902) 555-0102',
    serviceAreas: ['Bedford', 'Sackville'],
    preferredDays: ['Wednesday', 'Thursday', 'Friday'],
    totalContractUnits: 35,
    programsTrainedIn: ['Home Energy Assessment'],
    status: 'ACTIVE',
    certificationLevel: 'INTERMEDIATE',
    maxAuditsPerDay: 2,
    averageAuditDuration: 150
  }
];

export const MOCK_BOOKING_AGENTS: BookingAgent[] = [
  {
    id: '1',
    name: 'Emily Wilson',
    title: 'Senior Booking Agent',
    email: 'emily.w@example.com',
    phone: '(902) 555-0201',
    programsBooked: ['Home Energy Assessment', 'Commercial Energy Audit'],
    status: 'ACTIVE'
  },
  {
    id: '2',
    name: 'Michael Brown',
    title: 'Booking Agent',
    email: 'michael.b@example.com',
    phone: '(902) 555-0202',
    programsBooked: ['Home Energy Assessment'],
    status: 'ACTIVE'
  }
];

export const MOCK_TECH_TEAM: TechTeamMember[] = [
  {
    id: '1',
    name: 'David Chen',
    title: 'Technical Reviewer',
    email: 'david.c@example.com',
    phone: '(902) 555-0301',
    programs: ['Home Energy Assessment', 'Commercial Energy Audit'],
    status: 'ACTIVE'
  },
  {
    id: '2',
    name: 'Lisa Stewart',
    title: 'Technical Specialist',
    email: 'lisa.s@example.com',
    phone: '(902) 555-0302',
    programs: ['Home Energy Assessment'],
    status: 'ACTIVE'
  }
];

export const MOCK_CONTRACTORS: Contractor[] = [
  {
    id: '1',
    name: 'Nova Scotia Energy Solutions',
    contactPerson: 'James MacPherson',
    phone: '(902) 555-0401',
    email: 'james@nsenergyservices.com',
    servicesOffered: ['Heat Pump Installation', 'Insulation', 'Air Sealing'],
    areasServiced: ['Halifax Regional Municipality', 'Dartmouth'],
    isPreferred: true,
    status: 'ACTIVE'
  },
  {
    id: '2',
    name: 'Atlantic Windows & Doors',
    contactPerson: 'Sarah MacDonald',
    phone: '(902) 555-0402',
    email: 'sarah@atlanticwindows.com',
    servicesOffered: ['Window Replacement', 'Door Installation'],
    areasServiced: ['Halifax Regional Municipality', 'Bedford', 'Sackville'],
    isPreferred: true,
    status: 'ACTIVE'
  }
];

export const PROGRAMS = [
  'Home Energy Assessment',
  'Commercial Energy Audit',
  'Multi-Unit Residential',
  'Industrial Energy Assessment'
];

export const SERVICE_AREAS = [
  'Halifax Regional Municipality',
  'Dartmouth',
  'Bedford',
  'Sackville',
  'Cole Harbour',
  'Eastern Passage'
];

export const SERVICES_OFFERED = [
  'Heat Pump Installation',
  'Insulation',
  'Air Sealing',
  'Window Replacement',
  'Door Installation',
  'HVAC Systems',
  'Water Heating',
  'Ventilation'
];