export default {
  getById: (state) => (id) => {
    return state.test.employee.find(employee => employee.id === id)
  }
};
