const mongoose = require("mongoose");
const Property = require("../models/Property");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/lilypadDB"
);

const propertySeed = [
  {
    title: "Beautiful Studio in lively Midtown Milpitas",
    address: "Midtown",
    city: "Milpitas",
    state: "CA",
    latitude: "37.4283",
    longitude: "-121.9066",
    phoneNumber: 8312469329,
    propertySize: 581,
    propertyType: "Studio", // Single Family, Apartment, Duplex, Studio
    numOfBeds: 1,
    numOfBaths: 1,
    price: 2248,
    pets: "Cat or Dog", // Cat, Dog, Cat or Dog, None
    parking: "Space", // Covered, Space, Street, None
    laundry: "In Unit", // In Unit, On Premise, None
    heating: "Central", // Central, Radiator, Wall Heater
    cooling: "Window Mounted", // Central, Swamp, Window Mounted, None
    photos: ["https://d37lj287rvypnj.cloudfront.net/238621791/640x480","https://d37lj287rvypnj.cloudfront.net/238621800/640x480","https://d37lj287rvypnj.cloudfront.net/238621792/640x480",
  "https://d37lj287rvypnj.cloudfront.net/238621793/640x480","https://d37lj287rvypnj.cloudfront.net/238621794/640x480",
"https://d37lj287rvypnj.cloudfront.net/238621796/640x480","https://d37lj287rvypnj.cloudfront.net/238621803/640x480"],
    description: "Live a life of luxury at Apex, brand new apartment homes in Milpitas, California",
    date: new Date(Date.now())
  },{
    title: "Brand new 2BR townhome available for rent",
    address: "1463 Cherry Cir",
    city: "Milpitas",
    state: "CA",
    latitude: "37.430238",
    longitude: "-121.87479",
    phoneNumber: 4083398259,
    propertySize: 1065,
    propertyType: "Single Family", // Single Family, Apartment, Duplex, Studio
    numOfBeds: 2,
    numOfBaths: 1,
    price: 2999,
    pets: "Cat or Dog", // Cat, Dog, Cat or Dog, None
    parking: "Street", // Covered, Space, Street, None
    laundry: "In Unit", // In Unit, On Premise, None
    heating: "Central", // Central, Radiator, Wall Heater
    cooling: "Central", // Central, Swamp, Window Mounted, None
    photos: ["https://d37lj287rvypnj.cloudfront.net/232736180/640x480","https://d37lj287rvypnj.cloudfront.net/232736175/640x480","https://d37lj287rvypnj.cloudfront.net/232738119/640x480","https://d37lj287rvypnj.cloudfront.net/232738192/640x480"],
    description: "This is a new construction and you will be the first tenant to live in. It offers an open concept living area on the second floor with the gathering room, deck and kitchen. The third floor features two bedrooms with a full bathroom and linen cabinet to share.",
    date: new Date(Date.now())
  },{
    title: "Beautiful Luxury townhouse",
    address: "1354 Nestwood Way",
    city: "Milpitas",
    state: "CA",
    latitude: "37.415356",
    longitude: "-121.92578",
    phoneNumber: 4084167453,
    propertySize: 1258,
    propertyType: "Duplex", // Single Family, Apartment, Duplex, Studio
    numOfBeds: 2,
    numOfBaths: 2,
    price: 3200,
    pets: "Dog", // Cat, Dog, Cat or Dog, None
    parking: "Street", // Covered, Space, Street, None
    laundry: "In Unit", // In Unit, On Premise, None
    heating: "Central", // Central, Radiator, Wall Heater
    cooling: "Window Mounted", // Central, Swamp, Window Mounted, None
    photos: ["https://d37lj287rvypnj.cloudfront.net/232066320/640x480","https://d37lj287rvypnj.cloudfront.net/232066322/640x480","https://d37lj287rvypnj.cloudfront.net/232066323/640x480",
  "https://d37lj287rvypnj.cloudfront.net/232066324/640x480","https://d37lj287rvypnj.cloudfront.net/232066325/640x480"],
    description: "This beautiful, luxury and comfortable townhouse style condo is located in Coyote Creek Milpitas. This home has an attractive open floor plan with 1258 sq ft of living space, 2 bedroom and 2.5 baths. This home is an end unit that's bright and spacious with plenty of windows throughout and high ceilings in the living room. It features a separate living room, a formal dining area, a nook and a large open kitchen.",
    date: new Date(Date.now())
  },{
    title: "MILPITAS TOWNHOME 3 BEDROOM/2.5 BATHS",
    address: " 453 Alegra Terrace",
    city: "Milpitas",
    state: "CA",
    latitude: "37.452027",
    longitude: " -121.91761",
    phoneNumber: 4087187255,
    propertySize: 1550,
    propertyType: "Single Family", // Single Family, Apartment, Duplex, Studio
    numOfBeds: 3,
    numOfBaths: 2,
    price: 3250,
    pets: "Dog", // Cat, Dog, Cat or Dog, None
    parking: "Street", // Covered, Space, Street, None
    laundry: "In Unit", // In Unit, On Premise, None
    heating: "Central", // Central, Radiator, Wall Heater
    cooling: "Wndow Mounted", // Central, Swamp, Window Mounted, None
    photos: ["https://d37lj287rvypnj.cloudfront.net/238759498/640x480","https://d37lj287rvypnj.cloudfront.net/238759499/640x480","https://d37lj287rvypnj.cloudfront.net/238759500/640x480","https://d37lj287rvypnj.cloudfront.net/238759501/640x480","https://d37lj287rvypnj.cloudfront.net/238759502/640x480"],
    description: "Patio. Living room with fireplace. Hardwood floors and tile floors, separate dining room. High ceilings Refrigerator. Built in appliances including gas stove. Tenant pays all utilities. Swimming pool in the complex. Across the street from park that offers tennis court, basketball court, baseball, running trails. Has AC and Central heating.",
    date: new Date(Date.now())
  },{
    title: "",
    address: "",
    city: "",
    state: "CA",
    latitude: "",
    longitude: "",
    phoneNumber: 0,
    propertySize: 0,
    propertyType: "", // Single Family, Apartment, Duplex, Studio
    numOfBeds: 0,
    numOfBaths: 0,
    price: 0,
    pets: "", // Cat, Dog, Cat or Dog, None
    parking: "", // Covered, Space, Street, None
    laundry: "", // In Unit, On Premise, None
    heating: "", // Central, Radiator, Wall Heater
    cooling: "", // Central, Swamp, Window Mounted, None
    photos: [],
    description: "",
    date: new Date(Date.now())
  },{
    title: "",
    address: "",
    city: "",
    state: "CA",
    latitude: "",
    longitude: "",
    phoneNumber: 0,
    propertySize: 0,
    propertyType: "", // Single Family, Apartment, Duplex, Studio
    numOfBeds: 0,
    numOfBaths: 0,
    price: 0,
    pets: "", // Cat, Dog, Cat or Dog, None
    parking: "", // Covered, Space, Street, None
    laundry: "", // In Unit, On Premise, None
    heating: "", // Central, Radiator, Wall Heater
    cooling: "", // Central, Swamp, Window Mounted, None
    photos: [],
    description: "",
    date: new Date(Date.now())
  },{
    title: "",
    address: "",
    city: "",
    state: "CA",
    latitude: "",
    longitude: "",
    phoneNumber: 0,
    propertySize: 0,
    propertyType: "", // Single Family, Apartment, Duplex, Studio
    numOfBeds: 0,
    numOfBaths: 0,
    price: 0,
    pets: "", // Cat, Dog, Cat or Dog, None
    parking: "", // Covered, Space, Street, None
    laundry: "", // In Unit, On Premise, None
    heating: "", // Central, Radiator, Wall Heater
    cooling: "", // Central, Swamp, Window Mounted, None
    photos: [],
    description: "",
    date: new Date(Date.now())
  },{
    title: "",
    address: "",
    city: "",
    state: "CA",
    latitude: "",
    longitude: "",
    phoneNumber: 0,
    propertySize: 0,
    propertyType: "", // Single Family, Apartment, Duplex, Studio
    numOfBeds: 0,
    numOfBaths: 0,
    price: 0,
    pets: "", // Cat, Dog, Cat or Dog, None
    parking: "", // Covered, Space, Street, None
    laundry: "", // In Unit, On Premise, None
    heating: "", // Central, Radiator, Wall Heater
    cooling: "", // Central, Swamp, Window Mounted, None
    photos: [],
    description: "",
    date: new Date(Date.now())
  },{
    title: "",
    address: "",
    city: "",
    state: "CA",
    latitude: "",
    longitude: "",
    phoneNumber: 0,
    propertySize: 0,
    propertyType: "", // Single Family, Apartment, Duplex, Studio
    numOfBeds: 0,
    numOfBaths: 0,
    price: 0,
    pets: "", // Cat, Dog, Cat or Dog, None
    parking: "", // Covered, Space, Street, None
    laundry: "", // In Unit, On Premise, None
    heating: "", // Central, Radiator, Wall Heater
    cooling: "", // Central, Swamp, Window Mounted, None
    photos: [],
    description: "",
    date: new Date(Date.now())
  },{
    title: "",
    address: "",
    city: "",
    state: "CA",
    latitude: "",
    longitude: "",
    phoneNumber: 0,
    propertySize: 0,
    propertyType: "", // Single Family, Apartment, Duplex, Studio
    numOfBeds: 0,
    numOfBaths: 0,
    price: 0,
    pets: "", // Cat, Dog, Cat or Dog, None
    parking: "", // Covered, Space, Street, None
    laundry: "", // In Unit, On Premise, None
    heating: "", // Central, Radiator, Wall Heater
    cooling: "", // Central, Swamp, Window Mounted, None
    photos: [],
    description: "",
    date: new Date(Date.now())
  },

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

  // Blank seed 
  // {
    // title: "",
    // address: "",
    // city: "",
    // state: "CA",
    // latitude: "",
    // longitude: "",
    // phoneNumber: 0,
    // propertySize: 0,
    // propertyType: "", // Single Family, Apartment, Duplex
    // numOfBeds: 0,
    // numOfBaths: 0,
    // price: 0,
    // pets: "", // Cat, Dog, Cat or Dog, None
    // parking: "", // Covered, Space, Street, None
    // laundry: "", // In Unit, On Premise, None
    // heating: "", // Central, Radiator, Wall Heater
    // cooling: "", // Central, Swamp, Window Mounted, None
    // photos: [],
    // description: "",
  //   date: new Date(Date.now())
  // },

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