const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const traditionalProducts = [
  {
    name: 'Madhubani Fish Painting',
    price: 3500,
    description: 'Traditional Madhubani art featuring vibrant fish motifs, representing prosperity and fertility.',
    category: 'handcraft',
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500',
    artisan: 'Sunita Devi',
    region: 'Bihar',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption'],
    createdAt: new Date()
  },
  {
    name: 'Madhubani Peacock Wall Art',
    price: 4200,
    description: 'Exquisite peacock design in traditional Madhubani style with natural dyes.',
    category: 'handcraft',
    imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=500',
    artisan: 'Rajni Kumar',
    region: 'Bihar',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption'],
    createdAt: new Date()
  },
  {
    name: 'Warli Village Scene',
    price: 2800,
    description: 'Traditional Warli tribal art depicting village life and harvest celebrations.',
    category: 'handcraft',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500',
    artisan: 'Jivya Soma',
    region: 'Maharashtra',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 11: Sustainable Cities'],
    createdAt: new Date()
  },
  {
    name: 'Warli Dance Painting',
    price: 3200,
    description: 'Authentic Warli art showing traditional dance forms in white on terracotta.',
    category: 'handcraft',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500',
    artisan: 'Balu Mashe',
    region: 'Maharashtra',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 11: Sustainable Cities'],
    createdAt: new Date()
  },
  {
    name: 'Pattachitra Lord Jagannath',
    price: 5500,
    description: 'Traditional Pattachitra painting of Lord Jagannath on cloth with natural colors.',
    category: 'handcraft',
    imageUrl: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=500',
    artisan: 'Rabi Behera',
    region: 'Odisha',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption'],
    createdAt: new Date()
  },
  {
    name: 'Pattachitra Radha Krishna',
    price: 6000,
    description: 'Detailed Pattachitra artwork depicting Radha Krishna with intricate borders.',
    category: 'handcraft',
    imageUrl: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=500',
    artisan: 'Sudarshan Pattnaik',
    region: 'Odisha',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption'],
    createdAt: new Date()
  },
  {
    name: 'Kalamkari Tree of Life',
    price: 7500,
    description: 'Hand-painted Kalamkari textile with the iconic Tree of Life motif using natural dyes.',
    category: 'handcraft',
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500',
    artisan: 'Niranjan Reddy',
    region: 'Andhra Pradesh',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption', 'SDG 13: Climate Action'],
    createdAt: new Date()
  },
  {
    name: 'Kalamkari Wall Hanging',
    price: 4800,
    description: 'Traditional Kalamkari art on cotton fabric with mythological scenes.',
    category: 'handcraft',
    imageUrl: 'https://images.unsplash.com/photo-1587732608058-5ccfedd3ea63?w=500',
    artisan: 'Lakshmi Naidu',
    region: 'Andhra Pradesh',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption'],
    createdAt: new Date()
  },
  {
    name: 'Handwoven Silk Dupatta',
    price: 3200,
    description: 'Pure silk dupatta with traditional golden border, handwoven by master weavers.',
    category: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
    artisan: 'Ramesh Patil',
    region: 'Maharashtra',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption'],
    createdAt: new Date()
  },
  {
    name: 'Bandhani Cotton Saree',
    price: 5500,
    description: 'Traditional Bandhani tie-dye saree in vibrant colors from Gujarat.',
    category: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1610030469882-4f3e6647a046?w=500',
    artisan: 'Geeta Shah',
    region: 'Gujarat',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption'],
    createdAt: new Date()
  },
  {
    name: 'Block Print Cotton Kurta',
    price: 1800,
    description: 'Hand block-printed cotton kurta with traditional Rajasthani motifs.',
    category: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1583391733981-5ece61428821?w=500',
    artisan: 'Mohan Lal',
    region: 'Rajasthan',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption'],
    createdAt: new Date()
  },
  {
    name: 'Brass Handicraft Diya Set',
    price: 1200,
    description: 'Set of 5 handcrafted brass diyas with intricate designs for festivals.',
    category: 'handcraft',
    imageUrl: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500',
    artisan: 'Vishnu Sharma',
    region: 'Uttar Pradesh',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption'],
    createdAt: new Date()
  },
  {
    name: 'Terracotta Pottery Bowl',
    price: 800,
    description: 'Handmade terracotta bowl with traditional motifs, eco-friendly and sustainable.',
    category: 'handcraft',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500',
    artisan: 'Kumar Das',
    region: 'West Bengal',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption', 'SDG 13: Climate Action'],
    createdAt: new Date()
  },
  {
    name: 'Bamboo Craft Basket',
    price: 650,
    description: 'Eco-friendly bamboo basket handwoven by tribal artisans.',
    category: 'handcraft',
    imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=500',
    artisan: 'Rupa Munda',
    region: 'Assam',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption', 'SDG 15: Life on Land'],
    createdAt: new Date()
  },
  {
    name: 'Tanjore Style Portrait',
    price: 8500,
    description: 'Traditional Tanjore painting with gold foil work depicting deities.',
    category: 'portraits',
    imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f28d4ca1f?w=500',
    artisan: 'Senthil Kumar',
    region: 'Tamil Nadu',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption'],
    createdAt: new Date()
  },
  {
    name: 'Miniature Rajasthani Portrait',
    price: 6500,
    description: 'Intricate miniature painting in Rajasthani style on handmade paper.',
    category: 'portraits',
    imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500',
    artisan: 'Kishan Singh',
    region: 'Rajasthan',
    sdgGoals: ['SDG 8: Decent Work', 'SDG 12: Responsible Consumption'],
    createdAt: new Date()
  }
];

async function addProducts() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const database = client.db('localArtisanDB');
    const collection = database.collection('products');

    const result = await collection.insertMany(traditionalProducts);
    console.log(`✅ Successfully added ${result.insertedCount} traditional products!`);

    const count = await collection.countDocuments();
    console.log(`📊 Total products in database: ${count}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('🎉 Done! Products added successfully.');
  }
}

addProducts();