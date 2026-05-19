const fs = require('fs');

const replacements = [
  {
    file: 'pages/property.html',
    replaces: [
      {
        search: /<p class="text-secondary">\[Aerial Exterior Image Placeholder\]<\/p>/,
        replace: '<img src="../assets/images/property_aerial.png" alt="Property Aerial" style="width:100%; height:100%; object-fit:cover;">'
      },
      {
        search: /<p class="text-secondary">\[SVG Map Visualization\]<\/p>/,
        replace: '<img src="../assets/images/property_map.png" alt="Regional Map" style="width:100%; height:auto; border-radius: 8px;">'
      }
    ]
  },
  {
    file: 'pages/retail.html',
    replaces: [
      {
        search: /<p class="text-secondary">\[Shopping Corridor Image Placeholder\]<\/p>/,
        replace: '<img src="../assets/images/retail_corridor.png" alt="Retail Corridor" style="width:100%; height:100%; object-fit:cover;">'
      }
    ]
  },
  {
    file: 'pages/luxury.html',
    replaces: [
      {
        search: /<p class="text-secondary">\[Luxury Interior Image\]<\/p>/,
        replace: '<img src="../assets/images/luxury_interior.png" alt="Luxury Wing" style="width:100%; height:100%; object-fit:cover;">'
      }
    ]
  },
  {
    file: 'pages/dining.html',
    replaces: [
      {
        search: /<div class="mosaic-item"><p class="text-secondary">\[Food Hall\]<\/p><\/div>/,
        replace: '<div class="mosaic-item" style="background-image: url(\'../assets/images/dining_foodhall.png\'); background-size: cover; background-position: center;"></div>'
      },
      {
        search: /<div class="mosaic-item"><p class="text-secondary">\[Dish\]<\/p><\/div>/,
        replace: '<div class="mosaic-item" style="background-image: url(\'../assets/images/dining_dish.png\'); background-size: cover; background-position: center;"></div>'
      },
      {
        search: /<div class="mosaic-item"><p class="text-secondary">\[Bar\]<\/p><\/div>/,
        replace: '<div class="mosaic-item" style="background-image: url(\'../assets/images/dining_bar.png\'); background-size: cover; background-position: center;"></div>'
      },
      {
        search: /<div class="mosaic-item"><p class="text-secondary">\[Coffee\]<\/p><\/div>/,
        replace: '<div class="mosaic-item" style="background-image: url(\'../assets/images/dining_coffee.png\'); background-size: cover; background-position: center;"></div>'
      },
      {
        search: /<div class="mosaic-item"><p class="text-secondary">\[Outdoor\]<\/p><\/div>/,
        replace: '<div class="mosaic-item" style="background-image: url(\'../assets/images/dining_outdoor.png\'); background-size: cover; background-position: center;"></div>'
      }
    ]
  },
  {
    file: 'pages/events.html',
    replaces: [
      {
        search: /<p class="text-secondary">\[Event\/Concert Imagery\]<\/p>/,
        replace: '<img src="../assets/images/events_concert.png" alt="Concert Event" style="width:100%; height:100%; object-fit:cover;">'
      }
    ]
  }
];

replacements.forEach(task => {
  let content = fs.readFileSync(task.file, 'utf8');
  task.replaces.forEach(r => {
    content = content.replace(r.search, r.replace);
  });
  fs.writeFileSync(task.file, content, 'utf8');
  console.log('Updated images in ' + task.file);
});
