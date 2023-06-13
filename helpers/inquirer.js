const inquirer = require('inquirer');
require('colors');

const menu = async() => {
  const questions = [
    {
      type: 'list',
      name: 'option',
      message: 'Menu: ',
      choices: [
        {
          value: 1,
          name: `${'1'.green}. Buscar un lugar`
        },
        {
          value: 2,
          name: `${'2'.green}. Historial de búsquedas`
        },
        {
          value: 0,
          name: `${'0'.red}. Salir\n`
        }
      ]
    }
  ];

  console.clear();
  console.log("=========================".blue);
  console.log(" Seleccione una opción: ".yellow);
  console.log("=========================".blue);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async() => {
  const question = {
    type: 'input',
    name: 'key',
    message: `\nPresione ${'ENTER'.green} para continuar`
  };

  console.log('\n');
  await inquirer.prompt(question);

  return true;
};

const read = async(message) => {
  const question = {
    type: 'input',
    name: 'desc',
    message,
    validate(input) {
      if (input.length === 0) {
        return 'Por favor, introduzca un valor'
      }

      return true;
    }
  };

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const confirmation = async(message) => {
  const question = [
    {
      type: 'confirm',
      name: 'confirmed',
      message
    }
  ];

  const { confirmed } = await inquirer.prompt(question);

  return confirmed;
};

const placesMenu = async(searchData = []) => {
  const choices = searchData.map((place, index) => ({
    value: place.id,
    name: `${index + 1}`.green + `. ${place.name}`
  }));

  choices.push({
    value: null,
    name: '0'.red + '. Cancelar'
  });

  const questions = [
    {
      type: 'list',
      name: 'placeId',
      message: 'Seleccione el lugar:',
      choices
    }
  ];

  const { placeId } = await inquirer.prompt(questions);

  return placeId;
};

module.exports = {
  menu,
  pause,
  read,
  confirmation,
  placesMenu
};
