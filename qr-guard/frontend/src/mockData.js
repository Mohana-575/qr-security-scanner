export const sampleScans = [
  {
    id: 'QG-1048', site: 'Northstar delivery update', domain: 'northstar-delivery.example',
    url: 'https://northstar-delivery.example/track/482901', level: 'Suspicious', score: 67, scannedAt: 'Today, 10:42 AM',
    indicators: [
      { label: 'Brand-like wording in domain', state: 'warning' },
      { label: 'Recently registered domain', state: 'warning' },
      { label: 'HTTPS connection', state: 'positive' },
      { label: 'No known threat-list match', state: 'positive' },
    ],
    explanation: 'The destination uses delivery-related wording and a domain that has limited reputation history. These signals do not prove fraud, but they warrant caution before entering personal details.',
    recommendation: 'Verify the tracking number in the carrier’s official app or by typing its known website address yourself. Do not enter payment or login details on this page.',
  },
  {
    id: 'QG-1047', site: 'City library events', domain: 'events.city-library.example',
    url: 'https://events.city-library.example/summer-reading', level: 'Safe', score: 12, scannedAt: 'Today, 9:16 AM',
    indicators: [
      { label: 'HTTPS connection', state: 'positive' },
      { label: 'No brand impersonation detected', state: 'positive' },
      { label: 'No suspicious redirect pattern', state: 'positive' },
      { label: 'Domain structure looks consistent', state: 'positive' },
    ],
    explanation: 'The sample URL has a consistent domain structure and no high-risk signals in this demo analysis.',
    recommendation: 'No obvious warning signs were found in this sample. Continue to check that the address matches the organization you expect.',
  },
  {
    id: 'QG-1046', site: 'Account security check', domain: 'secure-paypaI-check.example',
    url: 'http://secure-paypaI-check.example/session/confirm', level: 'Dangerous', score: 94, scannedAt: 'Yesterday, 4:38 PM',
    indicators: [
      { label: 'Lookalike brand spelling', state: 'negative' },
      { label: 'Plain HTTP connection', state: 'negative' },
      { label: 'Credential-request path', state: 'negative' },
      { label: 'Unfamiliar domain structure', state: 'warning' },
    ],
    explanation: 'This demo URL imitates a familiar payment brand with a lookalike character, uses an unencrypted connection, and points to a sign-in style path.',
    recommendation: 'Do not open this destination or enter credentials. Visit the service through its official app or a saved bookmark, then report the QR code to its owner.',
  },
  {
    id: 'QG-1045', site: 'Greenhouse volunteer form', domain: 'volunteer.greenhouse.example',
    url: 'https://volunteer.greenhouse.example/join', level: 'Safe', score: 8, scannedAt: 'Yesterday, 1:05 PM',
    indicators: [
      { label: 'HTTPS connection', state: 'positive' },
      { label: 'No lookalike brand signal', state: 'positive' },
      { label: 'No suspicious redirect pattern', state: 'positive' },
      { label: 'Domain structure looks consistent', state: 'positive' },
    ],
    explanation: 'The sample destination has a straightforward URL structure and no high-risk indicators in this demo analysis.',
    recommendation: 'No obvious warning signs were found in this sample. Confirm the destination with the organization if you are unsure.',
  },
]

export const featuredScan = {
  ...sampleScans[2],
  id: 'QG-DEMO-01',
  site: 'Account verification portal',
  scannedAt: 'Demo report',
  explanation: 'The URL imitates a familiar payment brand with a lookalike character, uses an unencrypted connection, and points to a sign-in style path.',
  recommendation: 'Do not open this destination or enter credentials. Visit the service through its official app or a saved bookmark.',
}

export const dashboardTotals = [
  { label: 'Total scans', value: '1,284', note: 'Across your workspace', icon: 'scans', tone: 'tone-cyan' },
  { label: 'Safe', value: '1,109', note: '86.4% of all scans', icon: 'safe', tone: 'tone-green' },
  { label: 'Suspicious', value: '128', note: 'Review recommended', icon: 'suspicious', tone: 'tone-amber' },
  { label: 'Dangerous', value: '47', note: 'High-risk destinations', icon: 'dangerous', tone: 'tone-red' },
]