/**
 * Roman Numeral Converter API Server
 * 
 * This Express.js server provides a REST API for converting Arabic numerals to Roman numerals.
 * It includes CORS support, error handling, and logging.
 * 
 * @version 1.0.0
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';

//import e from 'express';
import getRomanNumber from './romanService.js';
import logger from './logger.js';

const app: Application = express();
const port = 3001;

// CORS configuration to allow requests from the React frontend
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

/**
 * Creates a custom error object with status code and message
 * 
 * @param {number} status - HTTP status code
 * @param {string} msg - Error message
 * @returns {Error} Custom error object with status property
 */
function createError(status: number, msg: string): Error & { status: number } {
    const err = new Error(msg) as Error & { status: number };
    err.status = status;
    return err;
}


/**
 * GET /romannumeral endpoint
 * Converts an Arabic numeral to Roman numeral
 * 
 * Query Parameters:
 * - query: The Arabic number to convert (1-3999)
 * 
 * Response:
 * - Success: { input: string, output: string }
 * - Error: { error: string }
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
app.get('/romannumeral', (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /romannumeral called');

    try {
        const queryParam = req.query.query;
        //const input = Number(queryParam); // Parse the input from the URL
        const result = getRomanNumber(Number(queryParam)); 
        logger.info(`GET /romannumeral result: ${result}`); 
        // Call the service function
        res.json({input: queryParam, output: result}); // Send the successful response
    } catch (error) {
        logger.error('Error in GET /romannumeral', error);
        next(error); // Forward the error to the error handling middleware
    }
});

/**
 * Global error handling middleware
 * Handles all errors thrown in the application
 * 
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
app.use(function (err: Error & { status: number }, req: Request, res: Response, next: NextFunction) {
    // whatever you want here, feel free to populate
    // properties on `err` to treat it differently in here.
    //console.log(err);
    logger.error('Error in GET /romannumeral', err);
    res.status(err.status || 500);
    res.send({ error: err.message });
});

/**
 * 404 Not Found middleware
 * Handles requests to non-existent endpoints
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.use(function (req: Request, res: Response) {
    logger.error('404 Not Found');
    res.status(404);
    res.send({ error: "Sorry, can't find that" })
});

/**
 * Start the Express server
 * Logs the server startup message
 */
app.listen(port, () => {
    logger.info(`Roman Numeral Converter API listening on port ${port}`);
    //console.log(`Roman Numeral Converter API listening on port ${port}`)
})