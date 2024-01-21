const PORT = process.env.PORT || 8001;
const VAULT_ADDR = "http://localhost";
const VAULT_PORT = 53702;
const VAULT_TOKEN = "root";

const generateEnv = () => {
  return {
    PORT: PORT,
    VAULT_ADDR: VAULT_ADDR,
    VAULT_PORT: VAULT_PORT,
    VAULT_TOKEN: VAULT_TOKEN,
  };
};

export default generateEnv;
