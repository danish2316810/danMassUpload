const cds = require('@sap/cds');

module.exports = srv => {
  srv.on('POST', 'Students', async (req) => {
    try {
      // Log the incoming data
      console.log('Request Data:', req.data);

      // Insert data into the entity specified in the request
      await cds.transaction(req).run(
        INSERT.into(req.target.name).entries(req.data)
      );

      console.log('Data successfully inserted into entity:', req.target.name);

      // Respond with success message
      return req.reply({ message: 'Insert Successful' });
    } catch (error) {
      console.error('Error during insertion:', error);

      // Extract specific details from the caught error
      const errorDetails = {
        ERROR_CODE: error.code || 'UNKNOWN_ERROR',
        ERROR_MSG: error.message || 'Unknown Error'
      };

      // Respond with error message
      const errorResponse = req.error(400, errorDetails.ERROR_MSG);

      // Insert into APP_ERROR_LOG entity
      try {
        await cds.run(
          INSERT.into('APP_ERROR_LOG').entries(errorDetails)
        );
        console.log('Error logged into APP_ERROR_LOG entity.');
      } catch (logError) {
        console.error('Error during logging into APP_ERROR_LOG:', logError);
      }

      return errorResponse;
    }
  });
};
