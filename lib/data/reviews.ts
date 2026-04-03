// H-Prime Gym Equipment Repair - Customer Reviews
// Denver metro area

export interface Review {
  author: string;
  text: string;
  rating: 5;
  date: string;
  link?: string;
}

export const reviews: Review[] = [
  {
    author: 'Michelle K.',
    text: 'Our NordicTrack treadmill started making a grinding noise and the belt was slipping. Called H-Prime and they sent someone out same day. The technician diagnosed the motor bearing issue, replaced it on the spot, and had us running again in under 2 hours. The $75 diagnostic fee was credited toward the repair!',
    rating: 5,
    date: '2 weeks ago'
  },
  {
    author: 'David R.',
    text: 'Our Peloton bike had resistance issues — the knob wasn\'t engaging properly. The tech arrived on time, diagnosed the flywheel brake problem quickly, and completed the repair efficiently. Very knowledgeable about fitness equipment and reasonably priced. Will definitely use them again.',
    rating: 5,
    date: '1 month ago'
  },
  {
    author: 'Sarah L.',
    text: 'Had an issue with our Life Fitness elliptical — the console was flickering and the stride felt uneven. H-Prime came out the next day, recalibrated the machine and replaced the display board. The technician was courteous and explained what caused the problem. Great service in the Denver area!',
    rating: 5,
    date: '1 month ago'
  },
  {
    author: 'James T.',
    text: 'Our Precor treadmill motor was overheating and shutting down mid-workout. Called H-Prime Gym Equipment Repair and they fit us in the same day. The repair was done professionally and the price was exactly what they quoted. Very satisfied with the service.',
    rating: 5,
    date: '2 months ago'
  },
  {
    author: 'Amanda W.',
    text: 'Excellent service! Our Bowflex home gym cable snapped during a workout. The technician arrived within the scheduled window, had the replacement cable in his truck, and fixed it on the spot. Very pleased with H-Prime — they really know gym equipment!',
    rating: 5,
    date: '2 months ago'
  },
  {
    author: 'Robert J.',
    text: 'Called them for our Concept2 rowing machine — the chain was sticking and the resistance felt off. They came out same day, the tech was friendly and professional. Fixed the damper and replaced the chain. Gave us maintenance tips too. Would recommend to anyone in Denver!',
    rating: 5,
    date: '3 months ago'
  },
  {
    author: 'Lisa P.',
    text: 'Our Matrix stair machine stopped working right before our holiday fitness goals. H-Prime saved the day! Same-day service, professional technician, and reasonable rates. Factory-trained on all major brands — these guys know their stuff.',
    rating: 5,
    date: '4 months ago'
  },
  {
    author: 'Chris M.',
    text: 'Had them service our Technogym weight machine at our home gym. Not every company works on premium fitness brands, but H-Prime handled it perfectly. Professional, on time, and the repair has held up great. Our go-to for all gym equipment repairs now.',
    rating: 5,
    date: '5 months ago'
  },
  {
    author: 'Patricia H.',
    text: 'Very responsive and professional. Our Sole elliptical console went blank and they came out within hours. The technician was knowledgeable and explained everything clearly. Repair was done quickly and the machine runs like new. Serving the whole Denver metro area!',
    rating: 5,
    date: '6 months ago'
  }
];
