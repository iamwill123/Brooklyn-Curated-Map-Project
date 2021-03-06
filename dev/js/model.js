// ---- MODEL ---- //
// List of Brooklyn dance, live music, bands, flea markets I've been to
// The data was gathered by using manually searching in google maps

var venueLocations = [
  {
    name: 'Output',
    lat: 40.722201,
    lng: -73.957797,
    address: '74 Wythe Ave, Brooklyn, NY 11249',
    neighborhood: 'Williamsburg - North Side',
    pid: { placeId: 'ChIJ7aF6yUJZwokRoo-DgMFE9fM' }
  },
  {
    name: 'Bembe',
    lat: 40.711092,
    lng: -73.965097,
    address: '81 S 6th St, Brooklyn, NY 11211',
    neighborhood: 'South Williamsburg',
    pid: { placeId: 'ChIJEwkz09hbwokRUcj2ZATqYbw' }
  },
  {
    name: 'Bossa Nova Civic Club',
    lat: 40.697974,
    lng: -73.927965,
    address: '1271 Myrtle Ave, Brooklyn, NY 11221',
    neighborhood: 'Bushwick',
    pid: { placeId: 'ChIJaXNoiAVcwokR83X6EYS3Y0A' }
  },
  {
    name: "Baby's All Right",
    lat: 40.710099,
    lng: -73.963486,
    address: '146 Broadway, Brooklyn, NY 11211',
    neighborhood: 'South Williamsburg',
    pid: { placeId: 'ChIJ1SnD495bwokRu9j5Mq3Q7FA' }
  },
  {
    name: 'Music Hall of Williamsburg',
    lat: 40.719128,
    lng: -73.961740,
    address: '66 N 6th St, Brooklyn, NY 11211',
    neighborhood: 'Williamsburg - North Side',
    pid: { placeId: 'ChIJwQCnGmdZwokRLMiSzjZtHwo' }
  },
  {
    name: 'Barcade',
    lat: 40.712066,
    lng: -73.951046,
    address: '388 Union Ave, Brooklyn, NY 11211',
    neighborhood: 'Williamsburg - North Side',
    pid: { placeId: 'ChIJCRZAjFhZwokRv6cEvR8K8Ik' }
  },
  {
    name: 'Good Room',
    lat: 40.726938,
    lng: -73.952912,
    address: '98 Meserole Ave, Greenpoint, NY 11222',
    neighborhood: 'Greenpoint',
    pid: { placeId: 'ChIJYaebsEZZwokRdaBnC6WMr5A' }
  },
  {
    name: 'Syndicated Bar Theater Kitchen',
    lat: 40.704975,
    lng: -73.932913,
    address: '40 Bogart St, Brooklyn, NY 11206',
    neighborhood: 'East Williamsburg, Bushwick',
    pid: { placeId: 'ChIJ72jC4QBcwokRjFRMAxCm770' }
  },
  {
    name: 'Analog BKNY',
    lat: 40.6695845,
    lng: -73.9954914,
    address: '177 2nd Ave, Brooklyn, NY 11215',
    neighborhood: 'South Slope, Brooklyn',
    pid: { placeId: 'ChIJEdvSb_BawokRJ6zHq-Aof7A' }
  },
  {
    name: 'Black Flamingo',
    lat: 40.710438,
    lng: -73.953915,
    address: '168 Borinquen Pl, Brooklyn, NY 11211',
    neighborhood: 'Williamsburg - South Side',
    pid: { placeId: 'ChIJP37F8-FbwokRyQ-NNEwjCLs' }
  },
  {
    name: 'Brooklyn Bowl',
    lat: 40.721881,
    lng: -73.957395,
    address: '61 Wythe Ave, Brooklyn, NY 11249',
    neighborhood: 'Williamsburg - North Side',
    pid: { placeId: 'ChIJ0bhWy0JZwokRxxk-A6fJH1Q' }
  },
  {
    name: 'Brooklyn Bazaar',
    lat: 40.7299355,
    lng: -73.9546495,
    address: '150 Greenpoint Ave, Brooklyn, NY 11222',
    neighborhood: 'Greenpoint',
    pid: { placeId: 'ChIJPVsKmENZwokR9MBgC-xLPXU' }
  },
  {
    name: 'BAM Peter Jay Sharp Building',
    lat: 40.686679,
    lng: -73.977521,
    address: '30 Lafayette Ave, Brooklyn, NY 11217',
    neighborhood: 'Fort Greene',
    pid: { placeId: 'ChIJvWHvIrJbwokRKL-U0Da1spM' }
  }
];