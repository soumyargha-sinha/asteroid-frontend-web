export const asteroidConstants = {
   tableConstants: {
      headerKeys: ['name', 'datetime', 'missDistance', 'estimatedDiameterMin', 'estimatedDiameterMax', 'relativeVelocity', 'dangerPotential'],
      headerColumns: {
         name: {
            column: 'Asteroid',
            sortDataType: 'String'
         },
         datetime: {
            column: 'Approach Date',
            type: 'Date',
            sortDataType: 'Date'
         },
         missDistance: {
            column: 'Miss Distance',
            type: 'Number',
            sortDataType: 'Number',
            unitType: 'missDistance',
            changeableUnit: true
         },
         estimatedDiameterMin: {
            column: 'Estimated Diameter (min)',
            type: 'Number',
            sortDataType: 'Number',
            changeableUnit: true,
            unitType: 'diameter'
         },
         estimatedDiameterMax: {
            column: 'Estimated Diameter (max)',
            type: 'Number',
            sortDataType: 'Number',
            changeableUnit: true,
            unitType: 'diameter'
         },
         relativeVelocity: {
            column: 'Relative Velocity',
            type: 'Number',
            sortDataType: 'Number',
            changeableUnit: true,
            unitType: 'velocity'
         },
         dangerPotential: {
            column: 'Danger',
            displayType: 'chip',
            chipValues: {
               'true': { class: 'info-danger', text: 'Potentially' },
               'false': { class: 'info-safe', text: 'Nope' }
            },
            sortDataType: 'String'
         },
      } as any,
      itemsPerPage: 5
   },
   unitValues: {
      diameter: [
         { label: 'Kilometers', value: 'kilometers' },
         { label: 'Meters', value: 'meters' },
         { label: 'Miles', value: 'miles' },
         { label: 'Feet', value: 'feet' },
      ],
      velocity: [
         { label: 'Kilometers/Second', value: 'kilometers_per_second' },
         { label: 'Kilometers/Hour', value: 'kilometers_per_hour' },
         { label: 'Miles/Hour', value: 'miles_per_hour' },
      ],
      missDistance: [
         { label: 'Astronomical', value: 'astronomical' },
         { label: 'Lunar', value: 'lunar' },
         { label: 'Kilometers', value: 'kilometers' },
         { label: 'Miles', value: 'miles' },
      ],
   },
   defaultUnitValues: {
      defaultDiameterUnit: 'miles',
      defaultVelocityUnit: 'miles_per_hour',
      defaultMissDistance: 'miles'
   },
   unitShorthands: {
      "kilometers": "km" as any,
      "meters": "m" as any,
      "miles": "mi" as any,
      "feet": "ft" as any,
      "kilometers_per_second": "km/s" as any,
      "kilometers_per_hour": "km/h" as any,
      "miles_per_hour": "mph" as any,
      "astronomical": "AU" as any,
      "lunar": "LD" as any,
   },
   localStorageExpiryTime: 60 * 60 * 1000
}