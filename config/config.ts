const PORT = process.env.PORT || 8001;

const generateEnv = () => {
  return {
    PORT: PORT,
  };
};

export default generateEnv;
