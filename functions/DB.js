const PrimeModal = require("./../models/prime");

const saveData = async (payload) => {
  const newData = new PrimeModal(payload);
  return await newData.save();
};

module.exports = {
  saveData,
};
