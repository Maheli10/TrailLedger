// Our own starter dataset (bundled with the app, no internet needed).
// Figures are approximate sample data for the project.
export const BASE_GEAR = [
  'Water bottle (2L)',
  'Snacks / energy bars',
  'First aid kit',
  'Torch / headlamp',
  'Phone + power bank',
  'Rain jacket',
];

export const routes = [
  {
    id: 'r1', name: "Sri Pada (Adam's Peak)", region: 'Central Province', difficulty: 'Hard',
    distanceKm: 11, durationHrs: 6, elevationGainM: 1100,
    description: 'A famous pilgrimage climb of about 5,000 steps, best started at night to reach the summit for sunrise.',
    checkpoints: [
      { name: 'Starting arch (Dalhousie)', elevationM: 1300 },
      { name: 'Seetha Gangula', elevationM: 1700 },
      { name: 'Indikatupana', elevationM: 1900 },
      { name: 'Summit', elevationM: 2243 },
    ],
    extraGear: ['Warm jacket', 'Spare headlamp batteries', 'Extra pair of socks'],
  },
  {
    id: 'r2', name: "Horton Plains – World's End", region: 'Nuwara Eliya', difficulty: 'Moderate',
    distanceKm: 9, durationHrs: 4, elevationGainM: 250,
    description: 'A loop trail across cloud-forest grassland to dramatic cliff edges. Go early before the mist arrives.',
    checkpoints: [
      { name: 'Park entrance', elevationM: 2100 },
      { name: "Little World's End", elevationM: 2150 },
      { name: "World's End", elevationM: 2200 },
      { name: "Baker's Falls", elevationM: 2050 },
    ],
    extraGear: ['Warm layer', 'Park entry ticket', 'Waterproof bag'],
  },
  {
    id: 'r3', name: 'Ella Rock', region: 'Badulla District', difficulty: 'Moderate',
    distanceKm: 9, durationHrs: 4, elevationGainM: 600,
    description: 'A rewarding climb along the railway line and through tea estates to a wide valley viewpoint.',
    checkpoints: [
      { name: 'Ella railway station', elevationM: 1040 },
      { name: 'Railway track junction', elevationM: 1100 },
      { name: 'Tea estate path', elevationM: 1300 },
      { name: 'Ella Rock summit', elevationM: 1500 },
    ],
    extraGear: ['Sun hat', 'Sunscreen', 'Trail shoes with good grip'],
  },
  {
    id: 'r4', name: "Little Adam's Peak", region: 'Ella', difficulty: 'Easy',
    distanceKm: 4, durationHrs: 1.5, elevationGainM: 150,
    description: 'A short, gentle walk through tea fields with great views. Ideal for beginners and families.',
    checkpoints: [
      { name: 'Trail start', elevationM: 1000 },
      { name: 'Tea fields', elevationM: 1080 },
      { name: 'Summit viewpoint', elevationM: 1141 },
    ],
    extraGear: ['Sun hat', 'Camera'],
  },
  {
    id: 'r5', name: 'Pidurangala Rock', region: 'Sigiriya', difficulty: 'Easy',
    distanceKm: 3, durationHrs: 1.5, elevationGainM: 200,
    description: 'A short climb with a final rocky scramble. Offers the best view of Sigiriya Rock Fortress.',
    checkpoints: [
      { name: 'Temple entrance', elevationM: 200 },
      { name: 'Reclining Buddha', elevationM: 250 },
      { name: 'Rock summit', elevationM: 350 },
    ],
    extraGear: ['Modest clothing for temple', 'Sunscreen', 'Sturdy shoes'],
  },
  {
    id: 'r6', name: 'Hanthana Range Trail', region: 'Kandy', difficulty: 'Moderate',
    distanceKm: 8, durationHrs: 3.5, elevationGainM: 700,
    description: 'A local favourite near Kandy with forest paths and open ridges overlooking the city.',
    checkpoints: [
      { name: 'Trail head', elevationM: 600 },
      { name: 'Forest section', elevationM: 900 },
      { name: 'Ridge viewpoint', elevationM: 1200 },
      { name: 'Hanthana summit', elevationM: 1300 },
    ],
    extraGear: ['Leech socks', 'Insect repellent', 'Trekking pole'],
  },
];
