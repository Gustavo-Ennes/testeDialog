const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/auth.js', './routes/post.js', './routes/profile.js']

swaggerAutogen(outputFile, endpointsFiles)