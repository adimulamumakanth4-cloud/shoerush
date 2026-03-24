import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Air Jordan 1 Retro High OG "Chicago"',
    brand: 'Jordan',
    price: 45000,
    originalPrice: 55000,
    description: 'The iconic Air Jordan 1 "Chicago" returns in its original glory. A must-have for any sneakerhead.',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'sneakers',
    sizes: [7, 8, 9, 10, 11],
    colors: ['Red/White/Black'],
    stock: 5,
    isBestSeller: true,
    reviews: [
      { id: 'r1', user: 'Rahul S.', rating: 5, comment: 'Authentic and fast delivery!', date: '2024-03-15' }
    ]
  },
  {
    id: '2',
    name: 'Chelsea Boots in Burnished Tan',
    brand: 'Saint Laurent',
    price: 85000,
    description: 'Exquisite craftsmanship meets timeless design. These Chelsea boots are made from premium Italian leather.',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1605733513597-a8f8d410fe3c?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'boots',
    sizes: [8, 9, 10],
    colors: ['Tan', 'Black'],
    stock: 3,
    isNew: true,
    reviews: []
  },
  {
    id: '3',
    name: '19th Century Victorian Dress Shoes',
    brand: 'Antique Collection',
    price: 120000,
    description: 'A rare piece of history. These Victorian-era dress shoes are perfectly preserved and unique.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'antique',
    sizes: [9],
    colors: ['Black'],
    stock: 1,
    isRare: true,
    reviews: []
  },
  {
    id: '4',
    name: 'Yeezy Boost 350 V2 "Zebra"',
    brand: 'Adidas',
    price: 32000,
    description: 'The Zebra colorway of the Yeezy Boost 350 V2 is a fan favorite, featuring a distinctive black and white pattern.',
    images: [
      'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'sneakers',
    sizes: [7, 8, 9, 10],
    colors: ['Zebra'],
    stock: 12,
    isBestSeller: true,
    reviews: []
  },
  {
    id: '5',
    name: 'Limited Edition "Gold Rush" Sneakers',
    brand: 'Shoe Rush Exclusive',
    price: 150000,
    isAuction: true,
    auctionEndTime: new Date(Date.now() + 86400000 * 2).toISOString(),
    currentBid: 155000,
    description: 'Only 10 pairs made worldwide. This is pair #03. Features 24k gold leaf accents.',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'rare',
    sizes: [10],
    colors: ['Gold/Black'],
    stock: 1,
    reviews: []
  },
  {
    id: '6',
    name: 'Oxford Brogues in Mahogany',
    brand: 'John Lobb',
    price: 95000,
    description: 'The pinnacle of formal footwear. Hand-stitched in Northampton, England.',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'dress',
    sizes: [8, 9, 10, 11],
    colors: ['Mahogany'],
    stock: 4,
    reviews: []
  },
  {
    id: '7',
    name: 'Triple S Sneakers "Clear Sole"',
    brand: 'Balenciaga',
    price: 92000,
    description: 'The pioneer of the chunky sneaker trend. Features a multi-layered sole and embroidered size at the toe.',
    images: [
      'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'sneakers',
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ['White', 'Black', 'Blue'],
    stock: 8,
    isNew: true,
    reviews: []
  },
  {
    id: '8',
    name: 'Horsebit Loafers in Black Leather',
    brand: 'Gucci',
    price: 78000,
    description: 'A signature Gucci silhouette since 1953. Crafted in Italy from smooth, premium leather.',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'dress',
    sizes: [7, 8, 9, 10],
    colors: ['Black'],
    stock: 6,
    isBestSeller: true,
    reviews: []
  },
  {
    id: '9',
    name: 'Cloudbust Thunder Sneakers',
    brand: 'Prada',
    price: 88000,
    description: 'Futuristic design with a chunky, sculptural sole. A statement piece for the modern collector.',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'sneakers',
    sizes: [8, 9, 10, 11],
    colors: ['Black/Red', 'All Black'],
    stock: 3,
    isRare: true,
    reviews: []
  },
  {
    id: '10',
    name: '"OUT OF OFFICE" Sneakers',
    brand: 'Off-White',
    price: 48000,
    description: 'Virgil Abloh\'s take on a classic tennis shoe. Features the iconic zip-tie and arrow motif.',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'sneakers',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['White/Blue', 'White/Black'],
    stock: 15,
    reviews: []
  }
];
