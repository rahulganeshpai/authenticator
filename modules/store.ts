const fs = require("fs").promises;

const filepath = "credentials.json";

/**
 * Class - Store
 * @description
 * Class having implementation details for storage operations
 */
class Store {
  async strore_contents() {
    const data = "Hello my name is Hugo, I'm using the new fs promises API";
    await fs.writeFile(filepath, data);
  }
  async read_contents() {
    const data = await fs.readFile(filepath, "utf8");
    return data;
  }
}

/**
 * Instance - Store
 * @description
 * Instance of Store Class
 */
const store = new Store();
export default store;
