// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NBA Criterion 4 Compliance System — Comprehensive Mock Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── User Accounts ───────────────────────────────────────────
export const users = [
    { id: 'u1', email: 'student@nba.edu', password: 'student123', role: 'STUDENT', fullName: 'Arjun Sharma', studentId: 's1' },
    { id: 'u2', email: 'admin@nba.edu', password: 'admin123', role: 'ADMIN', fullName: 'Dr. Priya Nair', studentId: null },
    { id: 'u3', email: 'hod@nba.edu', password: 'hod123', role: 'HOD', fullName: 'Dr. Rajesh Kumar', studentId: null },
    { id: 'u4', email: 'meera@nba.edu', password: 'student123', role: 'STUDENT', fullName: 'Meera Patel', studentId: 's2' },
    { id: 'u5', email: 'rahul@nba.edu', password: 'student123', role: 'STUDENT', fullName: 'Rahul Verma', studentId: 's3' },
];

// ─── Student Profiles ────────────────────────────────────────
export const students = [
    { id: 's1', userId: 'u1', enrollmentNo: '4NM21CS001', batchYear: 2025, programCode: 'CSE', programName: 'B.Tech Computer Science', section: 'A', cgpa: 8.7 },
    { id: 's2', userId: 'u4', enrollmentNo: '4NM21CS002', batchYear: 2025, programCode: 'CSE', programName: 'B.Tech Computer Science', section: 'A', cgpa: 9.1 },
    { id: 's3', userId: 'u5', enrollmentNo: '4NM21CS003', batchYear: 2025, programCode: 'CSE', programName: 'B.Tech Computer Science', section: 'B', cgpa: 7.9 },
    { id: 's4', userId: null, enrollmentNo: '4NM22CS010', batchYear: 2026, programCode: 'CSE', programName: 'B.Tech Computer Science', section: 'A', cgpa: 8.2 },
    { id: 's5', userId: null, enrollmentNo: '4NM22CS011', batchYear: 2026, programCode: 'CSE', programName: 'B.Tech Computer Science', section: 'B', cgpa: 7.5 },
    { id: 's6', userId: null, enrollmentNo: '4NM20CS005', batchYear: 2024, programCode: 'CSE', programName: 'B.Tech Computer Science', section: 'A', cgpa: 8.9 },
    { id: 's7', userId: null, enrollmentNo: '4NM20CS006', batchYear: 2024, programCode: 'CSE', programName: 'B.Tech Computer Science', section: 'A', cgpa: 8.4 },
    { id: 's8', userId: null, enrollmentNo: '4NM20CS007', batchYear: 2024, programCode: 'CSE', programName: 'B.Tech Computer Science', section: 'B', cgpa: 7.8 },
    { id: 's9', userId: null, enrollmentNo: '4NM23CS020', batchYear: 2027, programCode: 'CSE', programName: 'B.Tech Computer Science', section: 'A', cgpa: 8.0 },
    { id: 's10', userId: null, enrollmentNo: '4NM23CS021', batchYear: 2027, programCode: 'CSE', programName: 'B.Tech Computer Science', section: 'A', cgpa: 7.6 },
];

// ─── Achievement Records (Professional Activities — Criterion 4.6) ───
export const achievements = [
    // --- Arjun Sharma's Records ---
    { id: 'a1', studentId: 's1', category: 'HACKATHON', title: 'Smart India Hackathon 2024', description: 'Developed an AI-based medical diagnosis system', organizingBody: 'MHRD, Govt. of India', geographicLevel: 'NATIONAL', achievementTier: 'WINNER_1ST', eventDate: '2024-08-15', certificateUrl: '/evidence/sih_2024_cert.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },
    { id: 'a2', studentId: 's1', category: 'CERTIFICATION', title: 'AWS Certified Cloud Practitioner', description: 'Amazon Web Services foundational certification', organizingBody: 'Amazon Web Services', geographicLevel: 'INTERNATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2024-10-20', certificateUrl: '/evidence/aws_cert.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },
    { id: 'a3', studentId: 's1', category: 'WORKSHOP', title: 'Machine Learning Bootcamp', description: 'Intensive 3-day workshop on TensorFlow and PyTorch', organizingBody: 'Google Developer Student Club', geographicLevel: 'INSTITUTE', achievementTier: 'PARTICIPANT', eventDate: '2024-09-05', certificateUrl: '/evidence/ml_workshop.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },
    { id: 'a4', studentId: 's1', category: 'CONFERENCE', title: 'IEEE International Conference on AI', description: 'Paper presented: "Deep Learning for Rural Healthcare"', organizingBody: 'IEEE', geographicLevel: 'INTERNATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2024-12-10', certificateUrl: '/evidence/ieee_conf.pdf', verificationStatus: 'PENDING', adminComment: null, academicYear: '2024-25' },
    { id: 'a5', studentId: 's1', category: 'INTERNSHIP', title: 'Software Engineering Intern at Microsoft', description: '6-month internship in Azure DevOps team', organizingBody: 'Microsoft Corporation', geographicLevel: 'NATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2024-06-01', certificateUrl: '/evidence/ms_intern.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },
    { id: 'a19', studentId: 's1', category: 'COMPETITION', title: 'Code Chef Long Challenge', description: 'Ranked in top 500 nationally', organizingBody: 'CodeChef', geographicLevel: 'NATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2025-01-15', certificateUrl: null, verificationStatus: 'PENDING', adminComment: null, academicYear: '2024-25' },

    // --- Meera Patel's Records ---
    { id: 'a6', studentId: 's2', category: 'HACKATHON', title: 'Google Solution Challenge 2024', description: 'Built a sustainability tracker app', organizingBody: 'Google', geographicLevel: 'INTERNATIONAL', achievementTier: 'WINNER_2ND', eventDate: '2024-03-20', certificateUrl: '/evidence/google_hack.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2023-24' },
    { id: 'a7', studentId: 's2', category: 'PUBLICATION', title: 'Research Paper in Springer', description: 'Published: "Blockchain for Supply Chain Transparency"', organizingBody: 'Springer Nature', geographicLevel: 'INTERNATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2024-07-15', certificateUrl: '/evidence/springer_pub.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },
    { id: 'a8', studentId: 's2', category: 'CERTIFICATION', title: 'Google TensorFlow Developer Certificate', description: 'Professional certification in TF ecosystem', organizingBody: 'Google', geographicLevel: 'INTERNATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2024-11-01', certificateUrl: '/evidence/tf_cert.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },
    { id: 'a9', studentId: 's2', category: 'WORKSHOP', title: 'Cybersecurity Workshop by ISACA', description: 'Hands-on penetration testing and ethical hacking', organizingBody: 'ISACA Bangalore Chapter', geographicLevel: 'STATE', achievementTier: 'PARTICIPANT', eventDate: '2024-08-22', certificateUrl: '/evidence/cyber_ws.pdf', verificationStatus: 'PENDING', adminComment: null, academicYear: '2024-25' },

    // --- Rahul Verma's Records ---
    { id: 'a10', studentId: 's3', category: 'COMPETITION', title: 'ACM ICPC Regionals 2024', description: 'Qualified for Asia-West regionals', organizingBody: 'ACM', geographicLevel: 'INTERNATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2024-11-25', certificateUrl: '/evidence/icpc_cert.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },
    { id: 'a11', studentId: 's3', category: 'HACKATHON', title: 'HackMIT 2024', description: 'Built an EdTech accessibility platform', organizingBody: 'MIT', geographicLevel: 'INTERNATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2024-10-14', certificateUrl: '/evidence/hackmit.pdf', verificationStatus: 'REJECTED', adminComment: 'Certificate image is unreadable, please resubmit a clearer scan.', academicYear: '2024-25' },
    { id: 'a12', studentId: 's3', category: 'INTERNSHIP', title: 'Data Science Intern at Flipkart', description: 'Worked on recommendation engine optimization', organizingBody: 'Flipkart', geographicLevel: 'NATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2024-05-15', certificateUrl: '/evidence/flipkart_intern.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },

    // --- Previous batch records (2023-24) ---
    { id: 'a13', studentId: 's6', category: 'HACKATHON', title: 'Devfolio ETHIndia 2023', description: 'Web3 healthcare solution', organizingBody: 'Devfolio', geographicLevel: 'NATIONAL', achievementTier: 'WINNER_2ND', eventDate: '2023-12-08', certificateUrl: '/evidence/ethindia.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2023-24' },
    { id: 'a14', studentId: 's7', category: 'COMPETITION', title: 'IEEE Xtreme 17.0', description: '24-hour global programming competition', organizingBody: 'IEEE', geographicLevel: 'INTERNATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2023-10-28', certificateUrl: '/evidence/xtreme17.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2023-24' },
    { id: 'a15', studentId: 's6', category: 'CERTIFICATION', title: 'Microsoft Azure Fundamentals (AZ-900)', description: 'Cloud computing fundamentals', organizingBody: 'Microsoft', geographicLevel: 'INTERNATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2023-09-15', certificateUrl: '/evidence/az900.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2023-24' },
    { id: 'a16', studentId: 's8', category: 'WORKSHOP', title: 'IoT Workshop by TI', description: 'Texas Instruments embedded systems workshop', organizingBody: 'Texas Instruments', geographicLevel: 'STATE', achievementTier: 'PARTICIPANT', eventDate: '2023-07-20', certificateUrl: '/evidence/ti_iot.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2023-24' },

    // More for current year (2024-25)
    { id: 'a17', studentId: 's4', category: 'HACKATHON', title: 'Hack Karnataka 2024', description: 'Developed agri-tech drone monitoring system', organizingBody: 'Karnataka IT Dept', geographicLevel: 'STATE', achievementTier: 'WINNER_1ST', eventDate: '2024-09-28', certificateUrl: '/evidence/hack_karnataka.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },
    { id: 'a18', studentId: 's5', category: 'CONFERENCE', title: 'National Conference on Embedded Systems', description: 'Paper presentation on RISC-V architecture', organizingBody: 'VTU Consortium', geographicLevel: 'NATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2024-11-15', certificateUrl: '/evidence/nces_conf.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },
    { id: 'a20', studentId: 's9', category: 'CERTIFICATION', title: 'Python for Data Science - NPTEL', description: 'NPTEL Gold Medal Certification', organizingBody: 'NPTEL/IITM', geographicLevel: 'NATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2024-10-05', certificateUrl: '/evidence/nptel_python.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },
    { id: 'a21', studentId: 's10', category: 'WORKSHOP', title: 'Cloud Computing Fundamentals', description: 'AWS educate workshop conducted by CSE department', organizingBody: 'Department of CSE', geographicLevel: 'INSTITUTE', achievementTier: 'PARTICIPANT', eventDate: '2024-08-10', certificateUrl: '/evidence/cloud_ws.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2024-25' },

    // 2022-23 records
    { id: 'a22', studentId: 's6', category: 'COMPETITION', title: 'TCS CodeVita Season 10', description: 'National round qualifier', organizingBody: 'TCS', geographicLevel: 'NATIONAL', achievementTier: 'PARTICIPANT', eventDate: '2022-11-20', certificateUrl: '/evidence/codevita10.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2022-23' },
    { id: 'a23', studentId: 's7', category: 'HACKATHON', title: 'Bangalore Hack 2022', description: 'Smart city IoT solution', organizingBody: 'NASSCOM', geographicLevel: 'STATE', achievementTier: 'WINNER_1ST', eventDate: '2022-09-15', certificateUrl: '/evidence/blr_hack.pdf', verificationStatus: 'APPROVED', adminComment: null, academicYear: '2022-23' },
];

// ─── Post-Graduation Outcomes (Criterion 4.5) ────────────────
export const outcomes = [
    // Batch 2024 placements
    { id: 'o1', studentId: 's6', category: 'PLACEMENT', entityName: 'Infosys Limited', sectorType: 'IT', salaryLPA: 6.5, referenceDetails: 'INF/OL/2024/00321', evidenceUrl: '/evidence/infosys_offer.pdf', outcomeDate: '2024-02-10', verificationStatus: 'APPROVED', academicYear: '2023-24' },
    { id: 'o2', studentId: 's7', category: 'PLACEMENT', entityName: 'Bosch Engineering', sectorType: 'CORE', salaryLPA: 8.0, referenceDetails: 'BOSCH/HR/2024/1121', evidenceUrl: '/evidence/bosch_offer.pdf', outcomeDate: '2024-01-20', verificationStatus: 'APPROVED', academicYear: '2023-24' },
    { id: 'o3', studentId: 's8', category: 'HIGHER_STUDIES', entityName: 'IIT Bombay (M.Tech)', sectorType: null, salaryLPA: null, referenceDetails: 'GATE 2024 Score: 650 (AIR 384)', evidenceUrl: '/evidence/gate_scorecard.pdf', outcomeDate: '2024-06-15', verificationStatus: 'APPROVED', academicYear: '2023-24' },

    // Batch 2025 placements (current)
    { id: 'o4', studentId: 's1', category: 'PLACEMENT', entityName: 'Microsoft India', sectorType: 'IT', salaryLPA: 22.0, referenceDetails: 'MSFT/IN/2025/A0045', evidenceUrl: '/evidence/microsoft_offer.pdf', outcomeDate: '2025-01-15', verificationStatus: 'APPROVED', academicYear: '2024-25' },
    { id: 'o5', studentId: 's2', category: 'PLACEMENT', entityName: 'Google LLC', sectorType: 'IT', salaryLPA: 28.5, referenceDetails: 'GOOG/IN/2025/SDE/112', evidenceUrl: '/evidence/google_offer.pdf', outcomeDate: '2025-01-20', verificationStatus: 'APPROVED', academicYear: '2024-25' },
    { id: 'o6', studentId: 's3', category: 'HIGHER_STUDIES', entityName: 'Carnegie Mellon University (MS CS)', sectorType: null, salaryLPA: null, referenceDetails: 'GRE: 328, TOEFL: 112', evidenceUrl: '/evidence/cmu_admit.pdf', outcomeDate: '2025-02-10', verificationStatus: 'PENDING', academicYear: '2024-25' },

    // Entrepreneurship
    { id: 'o7', studentId: 's4', category: 'ENTREPRENEURSHIP', entityName: 'AgriDrone Technologies Pvt. Ltd.', sectorType: null, salaryLPA: null, referenceDetails: 'CIN: U72200KA2024PTC183456', evidenceUrl: '/evidence/agridrone_cin.pdf', outcomeDate: '2024-11-01', verificationStatus: 'APPROVED', academicYear: '2024-25' },

    // More batch 2024 outcomes
    { id: 'o8', studentId: 's6', category: 'PLACEMENT', entityName: 'Texas Instruments', sectorType: 'CORE', salaryLPA: 14.0, referenceDetails: 'TI/IN/REC/2024/788', evidenceUrl: '/evidence/ti_offer.pdf', outcomeDate: '2023-12-05', verificationStatus: 'APPROVED', academicYear: '2023-24' },
];

// ─── Academic Performance (API Calculation) ──────────────────
export const academicPerformance = [
    // 2024-25 (CAY) — 2nd Year data
    { academicYear: '2024-25', yearOfStudy: 2, totalStudents: 120, passedStudents: 108, avgGPA: 7.8 },
    // 2024-25 (CAY) — 3rd Year data
    { academicYear: '2024-25', yearOfStudy: 3, totalStudents: 115, passedStudents: 102, avgGPA: 7.5 },

    // 2023-24 (CAYm1)
    { academicYear: '2023-24', yearOfStudy: 2, totalStudents: 118, passedStudents: 105, avgGPA: 7.6 },
    { academicYear: '2023-24', yearOfStudy: 3, totalStudents: 112, passedStudents: 98, avgGPA: 7.3 },

    // 2022-23 (CAYm2)
    { academicYear: '2022-23', yearOfStudy: 2, totalStudents: 125, passedStudents: 110, avgGPA: 7.4 },
    { academicYear: '2022-23', yearOfStudy: 3, totalStudents: 120, passedStudents: 100, avgGPA: 7.1 },
];

// ─── Cohort Data for Placement Index ────────────────────────
export const cohortData = [
    { academicYear: '2024-25', totalFinalYear: 115, placements: 45, higherStudies: 18, entrepreneurship: 3 },
    { academicYear: '2023-24', totalFinalYear: 112, placements: 52, higherStudies: 15, entrepreneurship: 2 },
    { academicYear: '2022-23', totalFinalYear: 120, placements: 48, higherStudies: 12, entrepreneurship: 1 },
];

// ─── Professional Society Chapters ──────────────────────────
export const professionalChapters = [
    { name: 'IEEE Student Branch', status: 'Active', members: 85, eventsThisYear: 12 },
    { name: 'ACM Student Chapter', status: 'Active', members: 62, eventsThisYear: 8 },
    { name: 'CSI Student Chapter', status: 'Active', members: 45, eventsThisYear: 6 },
    { name: 'Google DSC', status: 'Active', members: 110, eventsThisYear: 15 },
    { name: 'AWS Cloud Club', status: 'Active', members: 38, eventsThisYear: 4 },
];

// ─── Helper Functions ────────────────────────────────────────
export function getStudentName(studentId) {
    const student = students.find(s => s.id === studentId);
    if (!student) return 'Unknown';
    const user = users.find(u => u.studentId === studentId);
    return user ? user.fullName : `Student (${student.enrollmentNo})`;
}

export function getStudentByUserId(userId) {
    const user = users.find(u => u.id === userId);
    if (!user || !user.studentId) return null;
    return students.find(s => s.id === user.studentId);
}

export function getStudentById(studentId) {
    return students.find(s => s.id === studentId);
}

export function getAchievementsForStudent(studentId) {
    return achievements.filter(a => a.studentId === studentId);
}

export function getOutcomesForStudent(studentId) {
    return outcomes.filter(o => o.studentId === studentId);
}

export function countByStatus(records) {
    return {
        total: records.length,
        approved: records.filter(r => r.verificationStatus === 'APPROVED').length,
        pending: records.filter(r => r.verificationStatus === 'PENDING').length,
        rejected: records.filter(r => r.verificationStatus === 'REJECTED').length,
    };
}

export function calculateAPI(perfData) {
    // API = X × (Y/Z) where X = avgGPA, Y = passed, Z = total
    return perfData.avgGPA * (perfData.passedStudents / perfData.totalStudents);
}

export function calculatePlacementIndex(cohort) {
    // P = ((X + Y + Z) / FS) × 100
    const { placements, higherStudies, entrepreneurship, totalFinalYear } = cohort;
    return ((placements + higherStudies + entrepreneurship) / totalFinalYear) * 100;
}

// Category labels
export const categoryLabels = {
    HACKATHON: 'Hackathon',
    WORKSHOP: 'Workshop',
    CERTIFICATION: 'Certification',
    INTERNSHIP: 'Internship',
    CONFERENCE: 'Conference',
    COMPETITION: 'Competition',
    PUBLICATION: 'Publication',
    PLACEMENT: 'Placement',
    HIGHER_STUDIES: 'Higher Studies',
    ENTREPRENEURSHIP: 'Entrepreneurship',
};

export const geoLabels = {
    INSTITUTE: 'Institute',
    STATE: 'State',
    NATIONAL: 'National',
    INTERNATIONAL: 'International',
};

export const tierLabels = {
    PARTICIPANT: 'Participant',
    ORGANIZER: 'Organizer',
    WINNER_1ST: '1st Prize',
    WINNER_2ND: '2nd Prize',
    WINNER_3RD: '3rd Prize',
};
