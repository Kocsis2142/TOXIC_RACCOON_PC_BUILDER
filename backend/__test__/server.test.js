require('dotenv').config({path: '.env.test'})
const jwt = require('jsonwebtoken')
const app = require("../server");
const supertest = require("supertest")
const request = supertest(app);
const customBuilds = require('../models/customBuildsModel')

const mongoose = require('mongoose')
const { MongoMemoryServer } = require("mongodb-memory-server")

let mongoServer

//Connect to in-memory database
const connectToDatabase = async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};
//Remove all data from all db collections
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
//Drop database, close connection and stop mongoServer.
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

beforeAll(async () => {
  await connectToDatabase();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});


describe('Smoke tests', () => {
  
  test("Jest works", async () => {
    expect(1).toBe(1)
  });
  
  test("Mongo server works", async () => {

      await customBuilds.insertMany ([
          {
        COMPONENT_LIST : [],
        JWT:"xxx",
        BUILD_NAME:"DB TESZT BUILD",
        USER_NAME:"TESZTER",
        BUILD_PRICE:1000000,
        BUILD_ID:"1"
          }
        ])

        const builds =  await customBuilds.find()
    
      expect(builds.length).toBe(1)
    
    })
  
})

test("/api/COMPONENTS should return 200", async () => {
  const res = await request.get("/api/COMPONENTS")
  expect(res.status).toBe(200)
});

test("/api/CUSTOMBUILDS should return 200", async () => {
  const res = await request.get("/api/CUSTOMBUILDS")
  expect(res.status).toBe(200)
});

test("/api/RACCOONBUILDS should return 200", async () => {
  const res = await request.get("/api/RACCOONBUILDS")
  expect(res.status).toBe(200)
});

test("Should return 401 if no jwt in headers", async () => {
  const res = await request.get("/api/userToken")
  expect(res.status).toBe(401)
});

test("Should return 200 if jwt in headers", async () => {
  const res = await request.get("/api/userToken").set("jwt", "token")
  expect(res.status).toBe(200)
});

test("Should return jwtIsValid: true if jwt is valid", async () => {

  const sub = 'user_id'

  const token = jwt.sign({ sub }, process.env.JWT_SECRET)

  const res = await request.get("/api/userToken").set("jwt", token)

  expect(res.status).toBe(200)
  expect(res.body.jwtIsValid).toBe(true)
});

test("Should return jwtIsValid: false if jwt is invalid", async () => {

  const res = await request.get("/api/userToken").set("jwt", 'somefalseusertoken')

  expect(res.status).toBe(200)
  expect(res.body.jwtIsValid).toBe(false)
});

test("Should return 200 & the right text msg when get a valid jwt and username, and the build not contains any error", async () => {

  const name = 'Kocsis Gergő'

  const token = jwt.sign({ name }, "secret")

  const res = await request.post("/api/SAVEBUILD").send({JWT: token, USER_NAME: name, COMPONENT_LIST: [
    {
    name: "Processor",
    keyWord: "CPU",
    selected: {
    TYPE: "Intel i5-11400F",
    PRICE: "67 480 Ft",
    IMG: "https://p1.akcdn.net/full/793089615.intel-i5-11400f-6-core-2-6ghz-lga1200.jpg",
    SOCKET: "1200",
    BASE_CLOCK: "2.6GHz",
    MAX_CLOCK: "4.4GHz",
    OVERCLOCK: false,
    TDP: "65W",
    MAX_TEMP: "100°C",
    CORES: 6,
    THREADS: 12,
    MEMORY_TYPE: "DDR4",
    MAX_MEMORY_SPEED: "3200MHz",
    MAX_MEMORY: "128Gb",
    MEMORY_CHANNELS: 2,
    GAMING_RANGE: 2,
    GAMING_SCORE: 141000
    }
    },
    {
    name: "Motherboard",
    keyWord: "MOBO",
    selected: {
    TYPE: "ASRock B560M Pro4",
    PRICE: "39 210 Ft",
    IMG: "https://p1.akcdn.net/full/783917574.asrock-b560m-pro4.jpg",
    SOCKET: "1200",
    SIZE: "microATX",
    CHIPSET: "B560",
    OVERCLOCK: false,
    MEMORY_TYPE: "DDR4",
    MAX_MEMORY_SPEED: "4800MHz",
    MAX_MEMORY: "128Gb",
    MEMORY_SLOT: 4,
    PCI_EXPRESS_16X: 2,
    M_2_SLOT: 1,
    SATA_3_SLOT: 6,
    SATA_SLOT_FULL: 6
    }
    },
    {
    name: "Cooler",
    keyWord: "COOLER",
    selected: {
    TYPE: "Cooler Master Hyper 212 RGB",
    PRICE: "14 410 Ft",
    IMG: "https://p1.akcdn.net/full/536124834.cooler-master-hyper-212-rgb-rr-212s-20pc-r1.jpg",
    AIRFLOW: "57CFM",
    SUPPORTED_SOCKETS: [
    "2066",
    "2011-3",
    "2011",
    "1200",
    "1151",
    "1150",
    "1156",
    "1155",
    "1366",
    "AM4",
    "AM3+",
    "AM3",
    "AM2+",
    "AM2",
    "FM2+",
    "FM2",
    "FM1"
    ],
    COOLING_TYPE: "ACTIVE",
    HEIGHT: "159MM",
    WIDTH: "120MM",
    COOLER_RANGE: 3,
    SLOT_COUNTER_120MM: 0,
    SLOT_COUNTER_140MM: 0
    }
    },
    {
    name: "Memory",
    keyWord: "RAM",
    selected: {
    TYPE: "Corsair VENGEANCE LPX 16GB (2x8GB) DDR4 2133MHz",
    PRICE: "37 290 Ft",
    IMG: "https://p1.akcdn.net/full/342011477.corsair-vengeance-lpx-16gb-2x8gb-ddr4-2133mhz-cmk16gx4m2a2133c13.jpg",
    MEMORY_KIT: 2,
    MEMORY_SPEED: "2133MHz",
    MEMORY_LATENCY: "CL13",
    MEMORY_TYPE: "DDR4",
    CAPACITY_EACH: "8GB",
    CAPACITY_FULL: "16GB",
    GAMING_SCORE: 30000
    }
    },
    {
    name: "Graphic Card",
    keyWord: "GPU",
    selected: {
    TYPE: "GIGABYTE GeForce RTX 3060 TI EAGLE OC 8GB GDDR6 256bit",
    PRICE: "300 000 Ft",
    IMG: "https://p1.akcdn.net/full/755288073.gigabyte-geforce-rtx-3060-ti-eagle-oc-8gb-gddr6-256bit-gv-n306teagle-oc-8gd.jpg",
    FAN: 2,
    CARD_LENGTH: "242MM",
    CARD_MEMORY: "8GB",
    TDP: "185W",
    RECOMMENDED_PSU: "600W",
    GAMING_RANGE: 2,
    GAMING_SCORE: 1060000,
    FPS_RES_1080P: {
    HZD: 122,
    CYBERPUNK2077: 81,
    BATTLEFIELDV: 150,
    ACVH: 77,
    FORTNITE: 200
    },
    FPS_RES_1440P: {
    HZD: 79,
    CYBERPUNK2077: 60,
    BATTLEFIELDV: 127,
    ACVH: 64,
    FORTNITE: 149
    },
    FPS_RES_2160P: {
    HZD: 51,
    CYBERPUNK2077: 28,
    BATTLEFIELDV: 80,
    ACVH: 40,
    FORTNITE: 83
    }
    }
    },
    {
    name: "Case",
    keyWord: "CASE",
    selected: {
    TYPE: "Zalman R2",
    PRICE: "13 650 Ft",
    IMG: "https://p1.akcdn.net/full/701632239.zalman-r2.jpg",
    MOBO_SUPPORT: [
    "ATX",
    "microATX",
    "miniITX",
    "extendedATX"
    ],
    BUILT_FAN: {
    MM120: 1
    },
    FAN_PLACE: {
    MM120: 6,
    MM140: 3,
    MM200: 0
    },
    MAX_FAN_PLACE: 6,
    RADIATOR_SUPPORT: true,
    VGA_MAX_LENGTH: "350MM",
    CPU_COOLER_MAX_HEIGHT: "162MM",
    HDD_PLACE: 2,
    SSD_PLACE: 2
    }
    },
    {
    name: "PSU",
    keyWord: "PSU",
    selected: {
    TYPE: "Be Quiet! System Power B9 600W",
    PRICE: "24 290 Ft",
    IMG: "https://dotkepek.kmak.hu/630/tn_be-quiet-system-power-b9-600w-tapegyseg-oem-bn209-767007.jpg",
    POWER: "600W"
    }
    },
    {
    name: "SSD",
    keyWord: "SSD",
    selected: {
    TYPE: "240GB Crucial SSD 2.5' SATA III BX500",
    PRICE: "11 820 Ft",
    IMG: "https://dotkepek.kmak.hu/515/tn_240gb-crucial-ssd-25-sata-iii-bx500-meghajto-ct240bx500ssd1-660331.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "2.5"
    }
    },
    {
    name: "HDD",
    keyWord: "HDD",
    selected: {
    TYPE: "1TB Seagate 3.5' 7200rpm 64MB SATAIII winchester",
    PRICE: "11 780 Ft",
    IMG: "https://dotkepek.kmak.hu/271/tn_1tb-seagate-35-7200rpm-64mb-sataiii-winchester-st1000dm010-414241.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "3.5"
    }
    },
    {
    name: "Fan",
    keyWord: "FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    },
    {
    name: "Extra Fan",
    keyWord: "EXTRA FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    }
    ],
    BUILD_NAME: "Supercool!",
    BUILD_PRICE: 534226,
    BUILD_ID: "663f718e-d663-438a-975d-d163519f504d"})

  expect(res.status).toBe(200)
  expect(res.text).toBe("Custom build saved!")

});

test("Should add 1 build to the Custom Build list when get a valid jwt and username, and the build not contains any error", async () => {

  const name = 'Kocsis Gergő'

  const token = jwt.sign({ name }, "secret")

  const res = await request.post("/api/SAVEBUILD").send({JWT: token, USER_NAME: name, COMPONENT_LIST: [
    {
    name: "Processor",
    keyWord: "CPU",
    selected: {
    TYPE: "Intel i5-11400F",
    PRICE: "67 480 Ft",
    IMG: "https://p1.akcdn.net/full/793089615.intel-i5-11400f-6-core-2-6ghz-lga1200.jpg",
    SOCKET: "1200",
    BASE_CLOCK: "2.6GHz",
    MAX_CLOCK: "4.4GHz",
    OVERCLOCK: false,
    TDP: "65W",
    MAX_TEMP: "100°C",
    CORES: 6,
    THREADS: 12,
    MEMORY_TYPE: "DDR4",
    MAX_MEMORY_SPEED: "3200MHz",
    MAX_MEMORY: "128Gb",
    MEMORY_CHANNELS: 2,
    GAMING_RANGE: 2,
    GAMING_SCORE: 141000
    }
    },
    {
    name: "Motherboard",
    keyWord: "MOBO",
    selected: {
    TYPE: "ASRock B560M Pro4",
    PRICE: "39 210 Ft",
    IMG: "https://p1.akcdn.net/full/783917574.asrock-b560m-pro4.jpg",
    SOCKET: "1200",
    SIZE: "microATX",
    CHIPSET: "B560",
    OVERCLOCK: false,
    MEMORY_TYPE: "DDR4",
    MAX_MEMORY_SPEED: "4800MHz",
    MAX_MEMORY: "128Gb",
    MEMORY_SLOT: 4,
    PCI_EXPRESS_16X: 2,
    M_2_SLOT: 1,
    SATA_3_SLOT: 6,
    SATA_SLOT_FULL: 6
    }
    },
    {
    name: "Cooler",
    keyWord: "COOLER",
    selected: {
    TYPE: "Cooler Master Hyper 212 RGB",
    PRICE: "14 410 Ft",
    IMG: "https://p1.akcdn.net/full/536124834.cooler-master-hyper-212-rgb-rr-212s-20pc-r1.jpg",
    AIRFLOW: "57CFM",
    SUPPORTED_SOCKETS: [
    "2066",
    "2011-3",
    "2011",
    "1200",
    "1151",
    "1150",
    "1156",
    "1155",
    "1366",
    "AM4",
    "AM3+",
    "AM3",
    "AM2+",
    "AM2",
    "FM2+",
    "FM2",
    "FM1"
    ],
    COOLING_TYPE: "ACTIVE",
    HEIGHT: "159MM",
    WIDTH: "120MM",
    COOLER_RANGE: 3,
    SLOT_COUNTER_120MM: 0,
    SLOT_COUNTER_140MM: 0
    }
    },
    {
    name: "Memory",
    keyWord: "RAM",
    selected: {
    TYPE: "Corsair VENGEANCE LPX 16GB (2x8GB) DDR4 2133MHz",
    PRICE: "37 290 Ft",
    IMG: "https://p1.akcdn.net/full/342011477.corsair-vengeance-lpx-16gb-2x8gb-ddr4-2133mhz-cmk16gx4m2a2133c13.jpg",
    MEMORY_KIT: 2,
    MEMORY_SPEED: "2133MHz",
    MEMORY_LATENCY: "CL13",
    MEMORY_TYPE: "DDR4",
    CAPACITY_EACH: "8GB",
    CAPACITY_FULL: "16GB",
    GAMING_SCORE: 30000
    }
    },
    {
    name: "Graphic Card",
    keyWord: "GPU",
    selected: {
    TYPE: "GIGABYTE GeForce RTX 3060 TI EAGLE OC 8GB GDDR6 256bit",
    PRICE: "300 000 Ft",
    IMG: "https://p1.akcdn.net/full/755288073.gigabyte-geforce-rtx-3060-ti-eagle-oc-8gb-gddr6-256bit-gv-n306teagle-oc-8gd.jpg",
    FAN: 2,
    CARD_LENGTH: "242MM",
    CARD_MEMORY: "8GB",
    TDP: "185W",
    RECOMMENDED_PSU: "600W",
    GAMING_RANGE: 2,
    GAMING_SCORE: 1060000,
    FPS_RES_1080P: {
    HZD: 122,
    CYBERPUNK2077: 81,
    BATTLEFIELDV: 150,
    ACVH: 77,
    FORTNITE: 200
    },
    FPS_RES_1440P: {
    HZD: 79,
    CYBERPUNK2077: 60,
    BATTLEFIELDV: 127,
    ACVH: 64,
    FORTNITE: 149
    },
    FPS_RES_2160P: {
    HZD: 51,
    CYBERPUNK2077: 28,
    BATTLEFIELDV: 80,
    ACVH: 40,
    FORTNITE: 83
    }
    }
    },
    {
    name: "Case",
    keyWord: "CASE",
    selected: {
    TYPE: "Zalman R2",
    PRICE: "13 650 Ft",
    IMG: "https://p1.akcdn.net/full/701632239.zalman-r2.jpg",
    MOBO_SUPPORT: [
    "ATX",
    "microATX",
    "miniITX",
    "extendedATX"
    ],
    BUILT_FAN: {
    MM120: 1
    },
    FAN_PLACE: {
    MM120: 6,
    MM140: 3,
    MM200: 0
    },
    MAX_FAN_PLACE: 6,
    RADIATOR_SUPPORT: true,
    VGA_MAX_LENGTH: "350MM",
    CPU_COOLER_MAX_HEIGHT: "162MM",
    HDD_PLACE: 2,
    SSD_PLACE: 2
    }
    },
    {
    name: "PSU",
    keyWord: "PSU",
    selected: {
    TYPE: "Be Quiet! System Power B9 600W",
    PRICE: "24 290 Ft",
    IMG: "https://dotkepek.kmak.hu/630/tn_be-quiet-system-power-b9-600w-tapegyseg-oem-bn209-767007.jpg",
    POWER: "600W"
    }
    },
    {
    name: "SSD",
    keyWord: "SSD",
    selected: {
    TYPE: "240GB Crucial SSD 2.5' SATA III BX500",
    PRICE: "11 820 Ft",
    IMG: "https://dotkepek.kmak.hu/515/tn_240gb-crucial-ssd-25-sata-iii-bx500-meghajto-ct240bx500ssd1-660331.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "2.5"
    }
    },
    {
    name: "HDD",
    keyWord: "HDD",
    selected: {
    TYPE: "1TB Seagate 3.5' 7200rpm 64MB SATAIII winchester",
    PRICE: "11 780 Ft",
    IMG: "https://dotkepek.kmak.hu/271/tn_1tb-seagate-35-7200rpm-64mb-sataiii-winchester-st1000dm010-414241.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "3.5"
    }
    },
    {
    name: "Fan",
    keyWord: "FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    },
    {
    name: "Extra Fan",
    keyWord: "EXTRA FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    }
    ],
    BUILD_NAME: "Supercool!",
    BUILD_PRICE: 534226,
    BUILD_ID: "663f718e-d663-438a-975d-d163519f504d"})

    const builds =  await customBuilds.find()
    expect(builds.length).toBe(1)

});

test("Should return - Build save failed! - text when the build contains errors", async () => {

  const name = 'Kocsis Gergő'

  const token = jwt.sign({ name }, "secret")

  const res = await request.post("/api/SAVEBUILD").send({JWT: token, USER_NAME: name, COMPONENT_LIST: [
    {
    name: "Processor",
    keyWord: "CPU",
    selected: {
      TYPE: "AMD Ryzen 5 3600",
      PRICE: "64 630 Ft",
      IMG: "https://p1.akcdn.net/full/583705425.amd-ryzen-5-3600-hexa-core-3-6ghz-am4.jpg",
      SOCKET: "AM4",
      BASE_CLOCK: "3.6GHz",
      MAX_CLOCK: "4.2GHz",
      OVERCLOCK: true,
      TDP: "65W",
      MAX_TEMP: "95°C",
      CORES: 6,
      THREADS: 12,
      MEMORY_TYPE: "DDR4",
      MAX_MEMORY_SPEED: "3200MHz",
      MAX_MEMORY: "128Gb",
      MEMORY_CHANNELS: 2,
      GAMING_RANGE: 2,
      GAMING_SCORE: 126000
    }
    },
    {
    name: "Motherboard",
    keyWord: "MOBO",
    selected: {
    TYPE: "ASRock B560M Pro4",
    PRICE: "39 210 Ft",
    IMG: "https://p1.akcdn.net/full/783917574.asrock-b560m-pro4.jpg",
    SOCKET: "1200",
    SIZE: "microATX",
    CHIPSET: "B560",
    OVERCLOCK: false,
    MEMORY_TYPE: "DDR4",
    MAX_MEMORY_SPEED: "4800MHz",
    MAX_MEMORY: "128Gb",
    MEMORY_SLOT: 4,
    PCI_EXPRESS_16X: 2,
    M_2_SLOT: 1,
    SATA_3_SLOT: 6,
    SATA_SLOT_FULL: 6
    }
    },
    {
    name: "Cooler",
    keyWord: "COOLER",
    selected: {
    TYPE: "Cooler Master Hyper 212 RGB",
    PRICE: "14 410 Ft",
    IMG: "https://p1.akcdn.net/full/536124834.cooler-master-hyper-212-rgb-rr-212s-20pc-r1.jpg",
    AIRFLOW: "57CFM",
    SUPPORTED_SOCKETS: [
    "2066",
    "2011-3",
    "2011",
    "1200",
    "1151",
    "1150",
    "1156",
    "1155",
    "1366",
    "AM4",
    "AM3+",
    "AM3",
    "AM2+",
    "AM2",
    "FM2+",
    "FM2",
    "FM1"
    ],
    COOLING_TYPE: "ACTIVE",
    HEIGHT: "159MM",
    WIDTH: "120MM",
    COOLER_RANGE: 3,
    SLOT_COUNTER_120MM: 0,
    SLOT_COUNTER_140MM: 0
    }
    },
    {
    name: "Memory",
    keyWord: "RAM",
    selected: {
    TYPE: "Corsair VENGEANCE LPX 16GB (2x8GB) DDR4 2133MHz",
    PRICE: "37 290 Ft",
    IMG: "https://p1.akcdn.net/full/342011477.corsair-vengeance-lpx-16gb-2x8gb-ddr4-2133mhz-cmk16gx4m2a2133c13.jpg",
    MEMORY_KIT: 2,
    MEMORY_SPEED: "2133MHz",
    MEMORY_LATENCY: "CL13",
    MEMORY_TYPE: "DDR4",
    CAPACITY_EACH: "8GB",
    CAPACITY_FULL: "16GB",
    GAMING_SCORE: 30000
    }
    },
    {
    name: "Graphic Card",
    keyWord: "GPU",
    selected: {
    TYPE: "GIGABYTE GeForce RTX 3060 TI EAGLE OC 8GB GDDR6 256bit",
    PRICE: "300 000 Ft",
    IMG: "https://p1.akcdn.net/full/755288073.gigabyte-geforce-rtx-3060-ti-eagle-oc-8gb-gddr6-256bit-gv-n306teagle-oc-8gd.jpg",
    FAN: 2,
    CARD_LENGTH: "242MM",
    CARD_MEMORY: "8GB",
    TDP: "185W",
    RECOMMENDED_PSU: "600W",
    GAMING_RANGE: 2,
    GAMING_SCORE: 1060000,
    FPS_RES_1080P: {
    HZD: 122,
    CYBERPUNK2077: 81,
    BATTLEFIELDV: 150,
    ACVH: 77,
    FORTNITE: 200
    },
    FPS_RES_1440P: {
    HZD: 79,
    CYBERPUNK2077: 60,
    BATTLEFIELDV: 127,
    ACVH: 64,
    FORTNITE: 149
    },
    FPS_RES_2160P: {
    HZD: 51,
    CYBERPUNK2077: 28,
    BATTLEFIELDV: 80,
    ACVH: 40,
    FORTNITE: 83
    }
    }
    },
    {
    name: "Case",
    keyWord: "CASE",
    selected: {
    TYPE: "Zalman R2",
    PRICE: "13 650 Ft",
    IMG: "https://p1.akcdn.net/full/701632239.zalman-r2.jpg",
    MOBO_SUPPORT: [
    "ATX",
    "microATX",
    "miniITX",
    "extendedATX"
    ],
    BUILT_FAN: {
    MM120: 1
    },
    FAN_PLACE: {
    MM120: 6,
    MM140: 3,
    MM200: 0
    },
    MAX_FAN_PLACE: 6,
    RADIATOR_SUPPORT: true,
    VGA_MAX_LENGTH: "350MM",
    CPU_COOLER_MAX_HEIGHT: "162MM",
    HDD_PLACE: 2,
    SSD_PLACE: 2
    }
    },
    {
    name: "PSU",
    keyWord: "PSU",
    selected: {
    TYPE: "Be Quiet! System Power B9 600W",
    PRICE: "24 290 Ft",
    IMG: "https://dotkepek.kmak.hu/630/tn_be-quiet-system-power-b9-600w-tapegyseg-oem-bn209-767007.jpg",
    POWER: "600W"
    }
    },
    {
    name: "SSD",
    keyWord: "SSD",
    selected: {
    TYPE: "240GB Crucial SSD 2.5' SATA III BX500",
    PRICE: "11 820 Ft",
    IMG: "https://dotkepek.kmak.hu/515/tn_240gb-crucial-ssd-25-sata-iii-bx500-meghajto-ct240bx500ssd1-660331.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "2.5"
    }
    },
    {
    name: "HDD",
    keyWord: "HDD",
    selected: {
    TYPE: "1TB Seagate 3.5' 7200rpm 64MB SATAIII winchester",
    PRICE: "11 780 Ft",
    IMG: "https://dotkepek.kmak.hu/271/tn_1tb-seagate-35-7200rpm-64mb-sataiii-winchester-st1000dm010-414241.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "3.5"
    }
    },
    {
    name: "Fan",
    keyWord: "FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    },
    {
    name: "Extra Fan",
    keyWord: "EXTRA FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    }
    ],
    BUILD_NAME: "Supercool!",
    BUILD_PRICE: 534226,
    BUILD_ID: "663f718e-d663-438a-975d-d163519f504d"})

  expect(res.status).toBe(200)
  expect(res.text).toBe("Build save failed!")

});

test("Should return - INVALID SAVE ATTEMPT! - text when someone try to add a new build without login(with valid jwt)", async () => {

  const name = 'Random Guy Name'

  const token = jwt.sign({ name }, "secret")

  const res = await request.post("/api/SAVEBUILD").send({JWT: token, USER_NAME: 'Other Guy Name', COMPONENT_LIST: [
    {
    name: "Processor",
    keyWord: "CPU",
    selected: {
      TYPE: "Intel i5-11400F",
    PRICE: "67 480 Ft",
    IMG: "https://p1.akcdn.net/full/793089615.intel-i5-11400f-6-core-2-6ghz-lga1200.jpg",
    SOCKET: "1200",
    BASE_CLOCK: "2.6GHz",
    MAX_CLOCK: "4.4GHz",
    OVERCLOCK: false,
    TDP: "65W",
    MAX_TEMP: "100°C",
    CORES: 6,
    THREADS: 12,
    MEMORY_TYPE: "DDR4",
    MAX_MEMORY_SPEED: "3200MHz",
    MAX_MEMORY: "128Gb",
    MEMORY_CHANNELS: 2,
    GAMING_RANGE: 2,
    GAMING_SCORE: 141000
    }
    },
    {
    name: "Motherboard",
    keyWord: "MOBO",
    selected: {
    TYPE: "ASRock B560M Pro4",
    PRICE: "39 210 Ft",
    IMG: "https://p1.akcdn.net/full/783917574.asrock-b560m-pro4.jpg",
    SOCKET: "1200",
    SIZE: "microATX",
    CHIPSET: "B560",
    OVERCLOCK: false,
    MEMORY_TYPE: "DDR4",
    MAX_MEMORY_SPEED: "4800MHz",
    MAX_MEMORY: "128Gb",
    MEMORY_SLOT: 4,
    PCI_EXPRESS_16X: 2,
    M_2_SLOT: 1,
    SATA_3_SLOT: 6,
    SATA_SLOT_FULL: 6
    }
    },
    {
    name: "Cooler",
    keyWord: "COOLER",
    selected: {
    TYPE: "Cooler Master Hyper 212 RGB",
    PRICE: "14 410 Ft",
    IMG: "https://p1.akcdn.net/full/536124834.cooler-master-hyper-212-rgb-rr-212s-20pc-r1.jpg",
    AIRFLOW: "57CFM",
    SUPPORTED_SOCKETS: [
    "2066",
    "2011-3",
    "2011",
    "1200",
    "1151",
    "1150",
    "1156",
    "1155",
    "1366",
    "AM4",
    "AM3+",
    "AM3",
    "AM2+",
    "AM2",
    "FM2+",
    "FM2",
    "FM1"
    ],
    COOLING_TYPE: "ACTIVE",
    HEIGHT: "159MM",
    WIDTH: "120MM",
    COOLER_RANGE: 3,
    SLOT_COUNTER_120MM: 0,
    SLOT_COUNTER_140MM: 0
    }
    },
    {
    name: "Memory",
    keyWord: "RAM",
    selected: {
    TYPE: "Corsair VENGEANCE LPX 16GB (2x8GB) DDR4 2133MHz",
    PRICE: "37 290 Ft",
    IMG: "https://p1.akcdn.net/full/342011477.corsair-vengeance-lpx-16gb-2x8gb-ddr4-2133mhz-cmk16gx4m2a2133c13.jpg",
    MEMORY_KIT: 2,
    MEMORY_SPEED: "2133MHz",
    MEMORY_LATENCY: "CL13",
    MEMORY_TYPE: "DDR4",
    CAPACITY_EACH: "8GB",
    CAPACITY_FULL: "16GB",
    GAMING_SCORE: 30000
    }
    },
    {
    name: "Graphic Card",
    keyWord: "GPU",
    selected: {
    TYPE: "GIGABYTE GeForce RTX 3060 TI EAGLE OC 8GB GDDR6 256bit",
    PRICE: "300 000 Ft",
    IMG: "https://p1.akcdn.net/full/755288073.gigabyte-geforce-rtx-3060-ti-eagle-oc-8gb-gddr6-256bit-gv-n306teagle-oc-8gd.jpg",
    FAN: 2,
    CARD_LENGTH: "242MM",
    CARD_MEMORY: "8GB",
    TDP: "185W",
    RECOMMENDED_PSU: "600W",
    GAMING_RANGE: 2,
    GAMING_SCORE: 1060000,
    FPS_RES_1080P: {
    HZD: 122,
    CYBERPUNK2077: 81,
    BATTLEFIELDV: 150,
    ACVH: 77,
    FORTNITE: 200
    },
    FPS_RES_1440P: {
    HZD: 79,
    CYBERPUNK2077: 60,
    BATTLEFIELDV: 127,
    ACVH: 64,
    FORTNITE: 149
    },
    FPS_RES_2160P: {
    HZD: 51,
    CYBERPUNK2077: 28,
    BATTLEFIELDV: 80,
    ACVH: 40,
    FORTNITE: 83
    }
    }
    },
    {
    name: "Case",
    keyWord: "CASE",
    selected: {
    TYPE: "Zalman R2",
    PRICE: "13 650 Ft",
    IMG: "https://p1.akcdn.net/full/701632239.zalman-r2.jpg",
    MOBO_SUPPORT: [
    "ATX",
    "microATX",
    "miniITX",
    "extendedATX"
    ],
    BUILT_FAN: {
    MM120: 1
    },
    FAN_PLACE: {
    MM120: 6,
    MM140: 3,
    MM200: 0
    },
    MAX_FAN_PLACE: 6,
    RADIATOR_SUPPORT: true,
    VGA_MAX_LENGTH: "350MM",
    CPU_COOLER_MAX_HEIGHT: "162MM",
    HDD_PLACE: 2,
    SSD_PLACE: 2
    }
    },
    {
    name: "PSU",
    keyWord: "PSU",
    selected: {
    TYPE: "Be Quiet! System Power B9 600W",
    PRICE: "24 290 Ft",
    IMG: "https://dotkepek.kmak.hu/630/tn_be-quiet-system-power-b9-600w-tapegyseg-oem-bn209-767007.jpg",
    POWER: "600W"
    }
    },
    {
    name: "SSD",
    keyWord: "SSD",
    selected: {
    TYPE: "240GB Crucial SSD 2.5' SATA III BX500",
    PRICE: "11 820 Ft",
    IMG: "https://dotkepek.kmak.hu/515/tn_240gb-crucial-ssd-25-sata-iii-bx500-meghajto-ct240bx500ssd1-660331.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "2.5"
    }
    },
    {
    name: "HDD",
    keyWord: "HDD",
    selected: {
    TYPE: "1TB Seagate 3.5' 7200rpm 64MB SATAIII winchester",
    PRICE: "11 780 Ft",
    IMG: "https://dotkepek.kmak.hu/271/tn_1tb-seagate-35-7200rpm-64mb-sataiii-winchester-st1000dm010-414241.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "3.5"
    }
    },
    {
    name: "Fan",
    keyWord: "FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    },
    {
    name: "Extra Fan",
    keyWord: "EXTRA FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    }
    ],
    BUILD_NAME: "Supercool!",
    BUILD_PRICE: 534226,
    BUILD_ID: "663f718e-d663-438a-975d-d163519f504d"})

  expect(res.status).toBe(200)
  expect(res.text).toBe("INVALID SAVE ATTEMPT!")

});

test("Should return - INVALID SAVE ATTEMPT! - if admin privilege is missing and trying to save Raccoon Build", async () => {

  const name = 'John Doe'
  const privilege = 'user'

  const token = jwt.sign({ name, privilege }, "secret")

  const res = await request.post("/api/SAVERACCOONBUILD").send({JWT: token, USER_NAME: 'John Doe', COMPONENT_LIST: [
    {
    name: "Processor",
    keyWord: "CPU",
    selected: {
      TYPE: "Intel i5-11400F",
    PRICE: "67 480 Ft",
    IMG: "https://p1.akcdn.net/full/793089615.intel-i5-11400f-6-core-2-6ghz-lga1200.jpg",
    SOCKET: "1200",
    BASE_CLOCK: "2.6GHz",
    MAX_CLOCK: "4.4GHz",
    OVERCLOCK: false,
    TDP: "65W",
    MAX_TEMP: "100°C",
    CORES: 6,
    THREADS: 12,
    MEMORY_TYPE: "DDR4",
    MAX_MEMORY_SPEED: "3200MHz",
    MAX_MEMORY: "128Gb",
    MEMORY_CHANNELS: 2,
    GAMING_RANGE: 2,
    GAMING_SCORE: 141000
    }
    },
    {
    name: "Motherboard",
    keyWord: "MOBO",
    selected: {
    TYPE: "ASRock B560M Pro4",
    PRICE: "39 210 Ft",
    IMG: "https://p1.akcdn.net/full/783917574.asrock-b560m-pro4.jpg",
    SOCKET: "1200",
    SIZE: "microATX",
    CHIPSET: "B560",
    OVERCLOCK: false,
    MEMORY_TYPE: "DDR4",
    MAX_MEMORY_SPEED: "4800MHz",
    MAX_MEMORY: "128Gb",
    MEMORY_SLOT: 4,
    PCI_EXPRESS_16X: 2,
    M_2_SLOT: 1,
    SATA_3_SLOT: 6,
    SATA_SLOT_FULL: 6
    }
    },
    {
    name: "Cooler",
    keyWord: "COOLER",
    selected: {
    TYPE: "Cooler Master Hyper 212 RGB",
    PRICE: "14 410 Ft",
    IMG: "https://p1.akcdn.net/full/536124834.cooler-master-hyper-212-rgb-rr-212s-20pc-r1.jpg",
    AIRFLOW: "57CFM",
    SUPPORTED_SOCKETS: [
    "2066",
    "2011-3",
    "2011",
    "1200",
    "1151",
    "1150",
    "1156",
    "1155",
    "1366",
    "AM4",
    "AM3+",
    "AM3",
    "AM2+",
    "AM2",
    "FM2+",
    "FM2",
    "FM1"
    ],
    COOLING_TYPE: "ACTIVE",
    HEIGHT: "159MM",
    WIDTH: "120MM",
    COOLER_RANGE: 3,
    SLOT_COUNTER_120MM: 0,
    SLOT_COUNTER_140MM: 0
    }
    },
    {
    name: "Memory",
    keyWord: "RAM",
    selected: {
    TYPE: "Corsair VENGEANCE LPX 16GB (2x8GB) DDR4 2133MHz",
    PRICE: "37 290 Ft",
    IMG: "https://p1.akcdn.net/full/342011477.corsair-vengeance-lpx-16gb-2x8gb-ddr4-2133mhz-cmk16gx4m2a2133c13.jpg",
    MEMORY_KIT: 2,
    MEMORY_SPEED: "2133MHz",
    MEMORY_LATENCY: "CL13",
    MEMORY_TYPE: "DDR4",
    CAPACITY_EACH: "8GB",
    CAPACITY_FULL: "16GB",
    GAMING_SCORE: 30000
    }
    },
    {
    name: "Graphic Card",
    keyWord: "GPU",
    selected: {
    TYPE: "GIGABYTE GeForce RTX 3060 TI EAGLE OC 8GB GDDR6 256bit",
    PRICE: "300 000 Ft",
    IMG: "https://p1.akcdn.net/full/755288073.gigabyte-geforce-rtx-3060-ti-eagle-oc-8gb-gddr6-256bit-gv-n306teagle-oc-8gd.jpg",
    FAN: 2,
    CARD_LENGTH: "242MM",
    CARD_MEMORY: "8GB",
    TDP: "185W",
    RECOMMENDED_PSU: "600W",
    GAMING_RANGE: 2,
    GAMING_SCORE: 1060000,
    FPS_RES_1080P: {
    HZD: 122,
    CYBERPUNK2077: 81,
    BATTLEFIELDV: 150,
    ACVH: 77,
    FORTNITE: 200
    },
    FPS_RES_1440P: {
    HZD: 79,
    CYBERPUNK2077: 60,
    BATTLEFIELDV: 127,
    ACVH: 64,
    FORTNITE: 149
    },
    FPS_RES_2160P: {
    HZD: 51,
    CYBERPUNK2077: 28,
    BATTLEFIELDV: 80,
    ACVH: 40,
    FORTNITE: 83
    }
    }
    },
    {
    name: "Case",
    keyWord: "CASE",
    selected: {
    TYPE: "Zalman R2",
    PRICE: "13 650 Ft",
    IMG: "https://p1.akcdn.net/full/701632239.zalman-r2.jpg",
    MOBO_SUPPORT: [
    "ATX",
    "microATX",
    "miniITX",
    "extendedATX"
    ],
    BUILT_FAN: {
    MM120: 1
    },
    FAN_PLACE: {
    MM120: 6,
    MM140: 3,
    MM200: 0
    },
    MAX_FAN_PLACE: 6,
    RADIATOR_SUPPORT: true,
    VGA_MAX_LENGTH: "350MM",
    CPU_COOLER_MAX_HEIGHT: "162MM",
    HDD_PLACE: 2,
    SSD_PLACE: 2
    }
    },
    {
    name: "PSU",
    keyWord: "PSU",
    selected: {
    TYPE: "Be Quiet! System Power B9 600W",
    PRICE: "24 290 Ft",
    IMG: "https://dotkepek.kmak.hu/630/tn_be-quiet-system-power-b9-600w-tapegyseg-oem-bn209-767007.jpg",
    POWER: "600W"
    }
    },
    {
    name: "SSD",
    keyWord: "SSD",
    selected: {
    TYPE: "240GB Crucial SSD 2.5' SATA III BX500",
    PRICE: "11 820 Ft",
    IMG: "https://dotkepek.kmak.hu/515/tn_240gb-crucial-ssd-25-sata-iii-bx500-meghajto-ct240bx500ssd1-660331.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "2.5"
    }
    },
    {
    name: "HDD",
    keyWord: "HDD",
    selected: {
    TYPE: "1TB Seagate 3.5' 7200rpm 64MB SATAIII winchester",
    PRICE: "11 780 Ft",
    IMG: "https://dotkepek.kmak.hu/271/tn_1tb-seagate-35-7200rpm-64mb-sataiii-winchester-st1000dm010-414241.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "3.5"
    }
    },
    {
    name: "Fan",
    keyWord: "FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    },
    {
    name: "Extra Fan",
    keyWord: "EXTRA FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    }
    ],
    BUILD_NAME: "Supercool!",
    BUILD_PRICE: 534226,
    BUILD_ID: "663f718e-d663-438a-975d-d163519f504d"})

  expect(res.text).toBe("INVALID SAVE ATTEMPT!")  

});

test("Should return a new Custom Build list without the deleted item", async () => {

  const token1 = jwt.sign({ name : "Kocsis Gergő" }, "secret")

  await request.post("/api/SAVEBUILD").send({JWT: token1, USER_NAME: "Kocsis Gergő", COMPONENT_LIST: [
    {
    name: "Processor",
    keyWord: "CPU",
    selected: {
    TYPE: "Intel i5-11400F",
    PRICE: "67 480 Ft",
    IMG: "https://p1.akcdn.net/full/793089615.intel-i5-11400f-6-core-2-6ghz-lga1200.jpg",
    SOCKET: "1200",
    BASE_CLOCK: "2.6GHz",
    MAX_CLOCK: "4.4GHz",
    OVERCLOCK: false,
    TDP: "65W",
    MAX_TEMP: "100°C",
    CORES: 6,
    THREADS: 12,
    MEMORY_TYPE: "DDR4",
    MAX_MEMORY_SPEED: "3200MHz",
    MAX_MEMORY: "128Gb",
    MEMORY_CHANNELS: 2,
    GAMING_RANGE: 2,
    GAMING_SCORE: 141000
    }
    },
    {
    name: "Motherboard",
    keyWord: "MOBO",
    selected: {
    TYPE: "ASRock B560M Pro4",
    PRICE: "39 210 Ft",
    IMG: "https://p1.akcdn.net/full/783917574.asrock-b560m-pro4.jpg",
    SOCKET: "1200",
    SIZE: "microATX",
    CHIPSET: "B560",
    OVERCLOCK: false,
    MEMORY_TYPE: "DDR4",
    MAX_MEMORY_SPEED: "4800MHz",
    MAX_MEMORY: "128Gb",
    MEMORY_SLOT: 4,
    PCI_EXPRESS_16X: 2,
    M_2_SLOT: 1,
    SATA_3_SLOT: 6,
    SATA_SLOT_FULL: 6
    }
    },
    {
    name: "Cooler",
    keyWord: "COOLER",
    selected: {
    TYPE: "Cooler Master Hyper 212 RGB",
    PRICE: "14 410 Ft",
    IMG: "https://p1.akcdn.net/full/536124834.cooler-master-hyper-212-rgb-rr-212s-20pc-r1.jpg",
    AIRFLOW: "57CFM",
    SUPPORTED_SOCKETS: [
    "2066",
    "2011-3",
    "2011",
    "1200",
    "1151",
    "1150",
    "1156",
    "1155",
    "1366",
    "AM4",
    "AM3+",
    "AM3",
    "AM2+",
    "AM2",
    "FM2+",
    "FM2",
    "FM1"
    ],
    COOLING_TYPE: "ACTIVE",
    HEIGHT: "159MM",
    WIDTH: "120MM",
    COOLER_RANGE: 3,
    SLOT_COUNTER_120MM: 0,
    SLOT_COUNTER_140MM: 0
    }
    },
    {
    name: "Memory",
    keyWord: "RAM",
    selected: {
    TYPE: "Corsair VENGEANCE LPX 16GB (2x8GB) DDR4 2133MHz",
    PRICE: "37 290 Ft",
    IMG: "https://p1.akcdn.net/full/342011477.corsair-vengeance-lpx-16gb-2x8gb-ddr4-2133mhz-cmk16gx4m2a2133c13.jpg",
    MEMORY_KIT: 2,
    MEMORY_SPEED: "2133MHz",
    MEMORY_LATENCY: "CL13",
    MEMORY_TYPE: "DDR4",
    CAPACITY_EACH: "8GB",
    CAPACITY_FULL: "16GB",
    GAMING_SCORE: 30000
    }
    },
    {
    name: "Graphic Card",
    keyWord: "GPU",
    selected: {
    TYPE: "GIGABYTE GeForce RTX 3060 TI EAGLE OC 8GB GDDR6 256bit",
    PRICE: "300 000 Ft",
    IMG: "https://p1.akcdn.net/full/755288073.gigabyte-geforce-rtx-3060-ti-eagle-oc-8gb-gddr6-256bit-gv-n306teagle-oc-8gd.jpg",
    FAN: 2,
    CARD_LENGTH: "242MM",
    CARD_MEMORY: "8GB",
    TDP: "185W",
    RECOMMENDED_PSU: "600W",
    GAMING_RANGE: 2,
    GAMING_SCORE: 1060000,
    FPS_RES_1080P: {
    HZD: 122,
    CYBERPUNK2077: 81,
    BATTLEFIELDV: 150,
    ACVH: 77,
    FORTNITE: 200
    },
    FPS_RES_1440P: {
    HZD: 79,
    CYBERPUNK2077: 60,
    BATTLEFIELDV: 127,
    ACVH: 64,
    FORTNITE: 149
    },
    FPS_RES_2160P: {
    HZD: 51,
    CYBERPUNK2077: 28,
    BATTLEFIELDV: 80,
    ACVH: 40,
    FORTNITE: 83
    }
    }
    },
    {
    name: "Case",
    keyWord: "CASE",
    selected: {
    TYPE: "Zalman R2",
    PRICE: "13 650 Ft",
    IMG: "https://p1.akcdn.net/full/701632239.zalman-r2.jpg",
    MOBO_SUPPORT: [
    "ATX",
    "microATX",
    "miniITX",
    "extendedATX"
    ],
    BUILT_FAN: {
    MM120: 1
    },
    FAN_PLACE: {
    MM120: 6,
    MM140: 3,
    MM200: 0
    },
    MAX_FAN_PLACE: 6,
    RADIATOR_SUPPORT: true,
    VGA_MAX_LENGTH: "350MM",
    CPU_COOLER_MAX_HEIGHT: "162MM",
    HDD_PLACE: 2,
    SSD_PLACE: 2
    }
    },
    {
    name: "PSU",
    keyWord: "PSU",
    selected: {
    TYPE: "Be Quiet! System Power B9 600W",
    PRICE: "24 290 Ft",
    IMG: "https://dotkepek.kmak.hu/630/tn_be-quiet-system-power-b9-600w-tapegyseg-oem-bn209-767007.jpg",
    POWER: "600W"
    }
    },
    {
    name: "SSD",
    keyWord: "SSD",
    selected: {
    TYPE: "240GB Crucial SSD 2.5' SATA III BX500",
    PRICE: "11 820 Ft",
    IMG: "https://dotkepek.kmak.hu/515/tn_240gb-crucial-ssd-25-sata-iii-bx500-meghajto-ct240bx500ssd1-660331.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "2.5"
    }
    },
    {
    name: "HDD",
    keyWord: "HDD",
    selected: {
    TYPE: "1TB Seagate 3.5' 7200rpm 64MB SATAIII winchester",
    PRICE: "11 780 Ft",
    IMG: "https://dotkepek.kmak.hu/271/tn_1tb-seagate-35-7200rpm-64mb-sataiii-winchester-st1000dm010-414241.jpg",
    CONNECTION_TYPE: "SATA3",
    CASE_SLOT: "3.5"
    }
    },
    {
    name: "Fan",
    keyWord: "FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    },
    {
    name: "Extra Fan",
    keyWord: "EXTRA FAN",
    selected: {
    TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
    PRICE: "7 148 Ft",
    IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
    SIZE: {
    MM120: 1
    }
    }
    }
    ],
    BUILD_NAME: "Supercool!",
    BUILD_PRICE: 534226,
    BUILD_ID: "ID-1"})

    const token2 = jwt.sign({ name : "John Doe" }, "secret")
  
    await request.post("/api/SAVEBUILD").send({JWT: token2, USER_NAME: "John Doe", COMPONENT_LIST: [
      {
      name: "Processor",
      keyWord: "CPU",
      selected: {
      TYPE: "Intel i5-11400F",
      PRICE: "67 480 Ft",
      IMG: "https://p1.akcdn.net/full/793089615.intel-i5-11400f-6-core-2-6ghz-lga1200.jpg",
      SOCKET: "1200",
      BASE_CLOCK: "2.6GHz",
      MAX_CLOCK: "4.4GHz",
      OVERCLOCK: false,
      TDP: "65W",
      MAX_TEMP: "100°C",
      CORES: 6,
      THREADS: 12,
      MEMORY_TYPE: "DDR4",
      MAX_MEMORY_SPEED: "3200MHz",
      MAX_MEMORY: "128Gb",
      MEMORY_CHANNELS: 2,
      GAMING_RANGE: 2,
      GAMING_SCORE: 141000
      }
      },
      {
      name: "Motherboard",
      keyWord: "MOBO",
      selected: {
      TYPE: "ASRock B560M Pro4",
      PRICE: "39 210 Ft",
      IMG: "https://p1.akcdn.net/full/783917574.asrock-b560m-pro4.jpg",
      SOCKET: "1200",
      SIZE: "microATX",
      CHIPSET: "B560",
      OVERCLOCK: false,
      MEMORY_TYPE: "DDR4",
      MAX_MEMORY_SPEED: "4800MHz",
      MAX_MEMORY: "128Gb",
      MEMORY_SLOT: 4,
      PCI_EXPRESS_16X: 2,
      M_2_SLOT: 1,
      SATA_3_SLOT: 6,
      SATA_SLOT_FULL: 6
      }
      },
      {
      name: "Cooler",
      keyWord: "COOLER",
      selected: {
      TYPE: "Cooler Master Hyper 212 RGB",
      PRICE: "14 410 Ft",
      IMG: "https://p1.akcdn.net/full/536124834.cooler-master-hyper-212-rgb-rr-212s-20pc-r1.jpg",
      AIRFLOW: "57CFM",
      SUPPORTED_SOCKETS: [
      "2066",
      "2011-3",
      "2011",
      "1200",
      "1151",
      "1150",
      "1156",
      "1155",
      "1366",
      "AM4",
      "AM3+",
      "AM3",
      "AM2+",
      "AM2",
      "FM2+",
      "FM2",
      "FM1"
      ],
      COOLING_TYPE: "ACTIVE",
      HEIGHT: "159MM",
      WIDTH: "120MM",
      COOLER_RANGE: 3,
      SLOT_COUNTER_120MM: 0,
      SLOT_COUNTER_140MM: 0
      }
      },
      {
      name: "Memory",
      keyWord: "RAM",
      selected: {
      TYPE: "Corsair VENGEANCE LPX 16GB (2x8GB) DDR4 2133MHz",
      PRICE: "37 290 Ft",
      IMG: "https://p1.akcdn.net/full/342011477.corsair-vengeance-lpx-16gb-2x8gb-ddr4-2133mhz-cmk16gx4m2a2133c13.jpg",
      MEMORY_KIT: 2,
      MEMORY_SPEED: "2133MHz",
      MEMORY_LATENCY: "CL13",
      MEMORY_TYPE: "DDR4",
      CAPACITY_EACH: "8GB",
      CAPACITY_FULL: "16GB",
      GAMING_SCORE: 30000
      }
      },
      {
      name: "Graphic Card",
      keyWord: "GPU",
      selected: {
      TYPE: "GIGABYTE GeForce RTX 3060 TI EAGLE OC 8GB GDDR6 256bit",
      PRICE: "300 000 Ft",
      IMG: "https://p1.akcdn.net/full/755288073.gigabyte-geforce-rtx-3060-ti-eagle-oc-8gb-gddr6-256bit-gv-n306teagle-oc-8gd.jpg",
      FAN: 2,
      CARD_LENGTH: "242MM",
      CARD_MEMORY: "8GB",
      TDP: "185W",
      RECOMMENDED_PSU: "600W",
      GAMING_RANGE: 2,
      GAMING_SCORE: 1060000,
      FPS_RES_1080P: {
      HZD: 122,
      CYBERPUNK2077: 81,
      BATTLEFIELDV: 150,
      ACVH: 77,
      FORTNITE: 200
      },
      FPS_RES_1440P: {
      HZD: 79,
      CYBERPUNK2077: 60,
      BATTLEFIELDV: 127,
      ACVH: 64,
      FORTNITE: 149
      },
      FPS_RES_2160P: {
      HZD: 51,
      CYBERPUNK2077: 28,
      BATTLEFIELDV: 80,
      ACVH: 40,
      FORTNITE: 83
      }
      }
      },
      {
      name: "Case",
      keyWord: "CASE",
      selected: {
      TYPE: "Zalman R2",
      PRICE: "13 650 Ft",
      IMG: "https://p1.akcdn.net/full/701632239.zalman-r2.jpg",
      MOBO_SUPPORT: [
      "ATX",
      "microATX",
      "miniITX",
      "extendedATX"
      ],
      BUILT_FAN: {
      MM120: 1
      },
      FAN_PLACE: {
      MM120: 6,
      MM140: 3,
      MM200: 0
      },
      MAX_FAN_PLACE: 6,
      RADIATOR_SUPPORT: true,
      VGA_MAX_LENGTH: "350MM",
      CPU_COOLER_MAX_HEIGHT: "162MM",
      HDD_PLACE: 2,
      SSD_PLACE: 2
      }
      },
      {
      name: "PSU",
      keyWord: "PSU",
      selected: {
      TYPE: "Be Quiet! System Power B9 600W",
      PRICE: "24 290 Ft",
      IMG: "https://dotkepek.kmak.hu/630/tn_be-quiet-system-power-b9-600w-tapegyseg-oem-bn209-767007.jpg",
      POWER: "600W"
      }
      },
      {
      name: "SSD",
      keyWord: "SSD",
      selected: {
      TYPE: "240GB Crucial SSD 2.5' SATA III BX500",
      PRICE: "11 820 Ft",
      IMG: "https://dotkepek.kmak.hu/515/tn_240gb-crucial-ssd-25-sata-iii-bx500-meghajto-ct240bx500ssd1-660331.jpg",
      CONNECTION_TYPE: "SATA3",
      CASE_SLOT: "2.5"
      }
      },
      {
      name: "HDD",
      keyWord: "HDD",
      selected: {
      TYPE: "1TB Seagate 3.5' 7200rpm 64MB SATAIII winchester",
      PRICE: "11 780 Ft",
      IMG: "https://dotkepek.kmak.hu/271/tn_1tb-seagate-35-7200rpm-64mb-sataiii-winchester-st1000dm010-414241.jpg",
      CONNECTION_TYPE: "SATA3",
      CASE_SLOT: "3.5"
      }
      },
      {
      name: "Fan",
      keyWord: "FAN",
      selected: {
      TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
      PRICE: "7 148 Ft",
      IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
      SIZE: {
      MM120: 1
      }
      }
      },
      {
      name: "Extra Fan",
      keyWord: "EXTRA FAN",
      selected: {
      TYPE: "Cooler Master MasterFan MF120 Halo ARGB",
      PRICE: "7 148 Ft",
      IMG: "https://p1.akcdn.net/full/675239778.cooler-master-masterfan-mf120-halo-argb-mfl-b2dn-18npa-r1.jpg",
      SIZE: {
      MM120: 1
      }
      }
      }
      ],
      BUILD_NAME: "Supercool!",
      BUILD_PRICE: 534226,
      BUILD_ID: "ID-2"})

  const res = await request.post("/api/DELETEBUILD").send({JWT: token1, REMOVABLE_ID: "ID-1"})

  console.log(res)

  const builds =  await customBuilds.find()
  expect(builds.length).toBe(1)
  expect(builds[0].USER_NAME).toEqual("John Doe")
  expect(res.body[0].BUILD_NAME).toBe("Supercool!")
  expect(res.body[0].USER_NAME).toBe("John Doe")

});







