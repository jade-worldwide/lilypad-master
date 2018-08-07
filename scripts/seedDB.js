const mongoose = require("mongoose");
const Property = require("../models/Property");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/lilypadDB"
);

const propertySeed = [
  {
    title: "The Dead Zone",
    address: "222 Stephen King Ave.",
    city: "Berkeley",
    phoneNumber: 5555555555,
    propertySize: "3,000 Sq Foot",
    numOfBeds: 3,
    numOfBaths: 2,
    price: 5000,
    pets: "No Pets",
    parking: "2 Car Garage",
    laundry: "On-Site",
    heating: "Heating",
    cooling: "None",
    photos: "http://www.themoviedistrict.com/wp-content/uploads/2015/07/thedeadzone04.jpg",
    description: "Beautiful Home for lots of Sexual Adventures",
    date: new Date(Date.now())
  },
  {
    title: "Townhouse by the beach",
    address: "222 J.K Rowling St.",
    city: "Berkeley",
    phoneNumber: 5555555555,
    propertySize: "2,500 Sq Foot",
    numOfBeds: 2,
    numOfBaths: 2,
    price: 7000,
    pets: "No Pets",
    parking: "2 Car Garage",
    laundry: "On-Site",
    heating: "Heating",
    cooling: "None",
    photos: "https://odis.homeaway.com/odis/listing/1db6b1f0-1a76-41b2-ab3a-1d9feea1acb6.c10.jpg",
    description: "A magical house by the beach garanteed to turn heads",
    date: new Date(Date.now())
  },
  {
    title: "Beautiful Family Home",
    address: "32755 Hilmar Street",
    city: "Berkeley",
    phoneNumber: 5555555555,
    propertySize: "2,500 Sq Foot",
    numOfBeds: 2,
    numOfBaths: 2,
    price: 3200,
    pets: "No Pets",
    parking: "2 Car Garage",
    laundry: "On-Site",
    heating: "Heating",
    cooling: "None",
    photos: "https://st.hzcdn.com/simgs/7e117cee02a2479e_4-6881/rustic-exterior.jpg",
    description: "Lovely two story home in a great location available now! It has lots of windows that make it light and bright. 3 bedrooms and 2 bathrooms are upstairs and 1/2 bath is downstairs. Vaulted ceilings accentuate the stairway, living room and dining area. home also features a fireplace in the living room, 2 car garage and a nice back yard. No A/C",
    date: new Date(Date.now())
  },
  {
    title: "Beautiful Evergreen end unit townhouse",
    address: "3358 Napoli Pl",
    city: "Berkeley",
    phoneNumber: 5555555555,
    propertySize: "1,601 Sq Foot",
    numOfBeds: 3,
    numOfBaths: 2.5,
    price: 3800,
    pets: "No Pets",
    parking: "2 Car Garage",
    laundry: "On-Site",
    heating: "Central",
    cooling: "Central",
    photos: "https://ssl.cdn-redfin.com/photo/68/mbpaddedwide/593/genMid.09395593_0.jpg",
    description: "Beautiful 3 bedrooms, 2.5 bathrooms townhouse available soon! Near Evergreen Valley High School, Chaboya Middle School and Tom Matsumoto Elementary. Very quiet location in complex. Property comes with gourmet gas stove and oven, granite slab counter-tops, dishwasher, disposal, bamboo hardwood flooring, custom paint and crown molding, A/C, plantation shutters, washer & dryer in unit, large patio, 2 car garage and cable-ready. Utilities are not included, tenant to pay water, garbage and PG&E (gas & electricity)",
    date: new Date(Date.now())
  },
  {
    title: "San Ramon 2 story house in gated community !!!",
    address: "1105 VistaPoint Circle",
    city: "Berkeley",
    phoneNumber: 5555555555,
    propertySize: "1,601 Sq Foot",
    numOfBeds: 3,
    numOfBaths: 2.5,
    price: 3295,
    pets: "No Pets",
    parking: "2 Car Garage",
    laundry: "On-Site",
    heating: "Central",
    cooling: "Central",
    photos: "https://s3-us-west-2.amazonaws.com/fvrebgv/000/262/184/cbf6bd9c9fce77cfd14620313e40dece3a7711cb.jpg",
    description: "Enjoy this 2 story 3Bed/2.5 Bath home in a gated community. Two car garage, double sided fireplace to enjoy living / family room. Large master suite with sunken oval tub and large closet. Laundry area with washer/dryer, air conditioner & easy to maintain rear yard. Open kitchen area with electric stove, microwave & refrigerator. Community pool is included for tenant use. Tenant to pay all utilities, garbage and maintain front and rear yard. ",
    date: new Date(Date.now())
  },
  {
    title: "Large Home in Milpitas",
    address: "1181 Park Glen Ct.",
    city: "Milpitas",
    phoneNumber: 5555555555,
    propertySize: "1,398 Sq Foot",
    numOfBeds: 4,
    numOfBaths: 2,
    price: 3250,
    pets: "No Pets",
    parking: "2 Car Garage",
    laundry: "On-Site",
    heating: "Central",
    cooling: "Central",
    photos: "https://cdn20.patchcdn.com/users/21854731/20170524/125357/styles/T800x600/public/article_images/fdbc6a4157e38050f641cd8af7b1cbdal-m0o.jpg",
    description: "Home features 4 bedrooms, 2 full bathrooms, living room with separate family room, 2 car garage and a nice back yard. Dishwasher, refrigerator, microwave, disposal and central AC This home is nearby restaurants and coffee shops. It has close access to highway 680. Tenant responsible for PG&E, Water & Garbage. Owner pays for Landscaping.",
    date: new Date(Date.now()) 
  },
  {
    title: "Beautiful home in corner lot Available Now!",
    address: "1199 Morrill Ave",
    city: "Milpitas",
    phoneNumber: 5555555555,
    propertySize: "1,994 Sq Foot",
    numOfBeds: 4,
    numOfBaths: 2,
    price: 3800,
    pets: "No Pets",
    parking: "2 Car Garage",
    laundry: "On-Site",
    heating: "Central",
    cooling: "Central",
    photos: "https://kelseybassranch.com/wp-content/uploads/sell-bedroom-home-corner-lot-beautiful-parker-team-homes_850586.jpg",
    description: "Spacious 4 bed 2 bath home available soon! Granite kitchen counter tops with stainless steel appliances. Dishwasher, gas stove, refrigerator, microwave, disposal and fire place. Hardwood flooring throughout. Comes with 2 car garage and washer/dryer. No A/C.",
    date: new Date(Date.now()) 
  },
  {
    title: "Beautiful 3/2.5 Sunnyvale home",
    address: "894 W McKinley Ave",
    city: "Milpitas",
    phoneNumber: 5555555555,
    propertySize: "1,568 Sq Foot",
    numOfBeds: 3,
    numOfBaths: 2.5,
    price: 4550,
    pets: "No Pets",
    parking: "2 Car Garage",
    laundry: "On-Site",
    heating: "Central",
    cooling: "Central",
    photos: "https://mlslmedia.azureedge.net/property/MLSL/81697469/b98ca472e43446b7948f57ea9f55ef2e/2/1",
    description: "This home is light and bright with tons of upgrades. Located in one of the most desirable locations in Sunnyvale and very close to high tech companies, schools, shopping, restaurants, freeways and much more. This 3-bedroom, 2.5 bath home offers a convenient 2 story floorplan. The kitchen offers stainless steel appliances including refrigerator, dishwasher and electric oven/range. This home has engineered laminate on first floor and is carpeted on the 2nd floor. This home is minutes away from the Sunnyvale train station which goes up the peninsula and to San Francisco. Excellent schools. Close to park and playgrounds. Also comes with washer and dryer and 2 car garage. ",
    date: new Date(Date.now()) 
  },
  {
    title: "Beautiful Hayes Valley Loft in an unbeatable location!",
    address: "251 W Nordstrom Ave",
    city: "Milpitas",
    phoneNumber: 5555555555,
    propertySize: "702 Sq Foot",
    numOfBeds: 1,
    numOfBaths: 1,
    price: 3300,
    pets: "Cats and Dogs",
    parking: "Garage",
    laundry: "On-Site",
    heating: "Central",
    cooling: "Central",
    photos: "https://ssl.cdn-redfin.com/photo/9/mbpaddedwide/654/genMid.452654_3.jpg",
    description: "Beautiful Hayes Valley Loft in an unbeatable location! 1 bedroom/ 1 bath features a beautiful kitchen with granite counter tops, stainless steel appliances, in-unit washer and dryer, garage parking and deeded roof deck! Pets are allowed. Do not miss this opportunity!",
    date: new Date(Date.now()) 
  },
  {
    title: "New, Luxury, Ultra-Energy Efficient Home!",
    address: "5880 Smoky Quartz Loop",
    city: "Milpitas",
    phoneNumber: 5555555555,
    propertySize: "1712 Sq Foot",
    numOfBeds: 3,
    numOfBaths: 3.5,
    price: 3750,
    pets: "Cats and Dogs",
    parking: "Garage",
    laundry: "On-Site",
    heating: "Central",
    cooling: "Central",
    photos: "https://www.reviewjournal.com/wp-content/uploads/2017/04/8439970_web1_copy_45paintedfeather-101web.jpg", 
    description: "Check out this pristine, breathtaking 3BD/3.5BA home in newly-developed area close to popular freeways, VTA light rail and walking distance to frequented stores. Make this your home for years to come as this long term investment property offers the highest end appliances and features that give you the best of Silicon Valley living. Even better, this growing community is desirably positioned to offer privacy with proximity to one of the fastest-growing areas in the Bay Area! ",
    date: new Date(Date.now()) 
  }
];

Property
  .remove({})
  .then(() => Property.collection.insertMany(propertySeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  // const applicationSeed = [
  //   {
  //     name: "John Wick",
  //     currentAddress: "222 Stephen King Ave.",
  //     email: "Babayega@gmail.com",
  //     phoneNumber: 4081234567,
  //     references: "The mafia",
  //     income: 120000,
  //     creditScore: 800,
  //     pets: true,
  //     date: new Date(Date.now())
  //   },
  //   {
  //     name: "Paul Kim",
  //     currentAddress: "123 Fullerton Dr.",
  //     email: "PKim@gmail.com",
  //     phoneNumber: 6501234567,
  //     references: "The yakuza",
  //     income: 500000,
  //     creditScore: 720,
  //     pets: false,
  //     date: new Date(Date.now())
  //   },
  // ];
  
  // db.Application
  //   .remove({})
  //   .then(() => db.Application.collection.insertMany(applicationSeed))
  //   .then(data => {
  //     console.log(data.result.n + " records inserted!");
  //     process.exit(0);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     process.exit(1);
  //   });