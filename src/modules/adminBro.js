const AdminBro = require('admin-bro');
const adminBroMongoose = require('@admin-bro/mongoose');
const RestaurantCategory = require('../models/RestaurantCategory');
const MenuCategory = require('../models/MenuCategory');
// mongoose with adminbro

AdminBro.registerAdapter(adminBroMongoose);

// adminBro config

const adminBroOptions = new AdminBro({
  resources: [
    {
      resource: RestaurantCategory,
      options: {
        properties: {
          createdAt: {
            isVisible: {
              edit: false, list: true, show: true, filter: true,
            },
          },
          updatedAt: {
            isVisible: {
              edit: false, list: true, show: true, filter: true,
            },
          },
        },
      },
    },
    {
      resource: MenuCategory,
      options: {
        properties: {
          createdAt: {
            isVisible: {
              edit: false, list: true, show: true, filter: true,
            },
          },
          updatedAt: {
            isVisible: {
              edit: false, list: true, show: true, filter: true,
            },
          },
        },
      },
    },
  ],

  rootPath: '/admin',
});

module.exports = adminBroOptions;
