export default (): any => ({
  mongoURI: process.env.MONGOURI || '',
});