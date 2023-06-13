require('dotenv').config()

const { read, menu, pause, placesMenu } = require('./helpers/inquirer');
const Search = require('./models/search')

const main = async() => {
  const search = new Search();

  let option;

  do {
    option = await menu();

    switch (option) {
      case 1:
        // mostrar mensaje
        const place = await read("Lugar: ");
        const searchData = await search.find(place);

        let placeData;

        if (!!searchData.length) {
          const placeId = await placesMenu(searchData);

          if (placeId) {
            placeData = searchData.find(place => place.id === placeId);

            search.addHistory(placeData.name);

            const weather = await search.weather({
              lat: placeData.lat,
              lon: placeData.lng
            });

            console.log(place);
            console.log("\nInformación: \n".green)
            console.log("Ciudad: ", placeData.name);
            console.log("Lat: ", placeData.lat);
            console.log("Lon: ", placeData.lng);
            console.log("Temperatura: ", weather.main.temp);
            console.log("Mínima: ", weather.main.temp_min);
            console.log("Máxima: ", weather.main.temp_max);
            console.log("Descripción: ", weather.weather[0].description);
          }
        } else {
          console.log(`\nNo hemos encontrado ${place}`);
        }

        break;
      case 2:
        search.history.print();
      default:
        break;
    }

    if (option !== 0) {
      await pause();
    }
  } while (option !== 0);
};

main();
