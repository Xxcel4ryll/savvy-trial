const { v4: uuidv4 } = require("uuid");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("faqs", [
            {
                id: uuidv4(),
                heading: "Orders & Delivery",
                title: "How soon can I get my products?",
                description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Corrupti maiores quam mollitia saepe ipsa commodi,
          exercitationem id explicabo dolor delectus, 
          voluptas non quod quis unde. Vel, cumque expedita! Adipisci,
          distinctio?`
            },
            {
                id: uuidv4(),
                heading: "Payment",
                title: "Can I pay on delivery?",
                description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Corrupti maiores quam mollitia saepe ipsa commodi,
          exercitationem id explicabo dolor delectus, 
          voluptas non quod quis unde. Vel, cumque expedita! Adipisci,
          distinctio?`
            },
            {
                id: uuidv4(),
                heading: "Return & Renewal",
                title: "How do I send my product back to Savvy for upgrade?",
                description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Corrupti maiores quam mollitia saepe ipsa commodi,
          exercitationem id explicabo dolor delectus, 
          voluptas non quod quis unde. Vel, cumque expedita! Adipisci,
          distinctio?`
            }
        ], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("faqs", null, {});
    }
};
//# sourceMappingURL=20230226123642-seed_faqs.js.map