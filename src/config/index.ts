export default () => ({
  port: process.env.PORT || 3000,
  database: {
    url: process.env.DATABASE_URL || '',
  },
  secret: process.env.SECRET,
});
