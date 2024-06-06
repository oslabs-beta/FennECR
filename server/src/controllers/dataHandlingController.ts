import { Request, Response, NextFunction } from 'express';

const dataHandlingController = {
  aggregateScanResults: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Default severity counts
    interface severityCounts {
      critical: number;
      high: number;
      medium: number;
      low: number;
      informational: number;
    }
    const severityCounts: severityCounts = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      informational: 0,
    };
    // Initialize image counter
    let imageScanned:number = 0
    let vulnerbleImageCount: number = 0
    try {
      // Aggregate scan result severity from each image
      const scanResults = res.locals.scanResults;

      for (const scanResult of scanResults) {
        if(scanResult.imageScanStatus.status === 'COMPLETE') imageScanned++
        //console.log(`I am scanResult in data handler: ${JSON.stringify(scanResult)}`)
        const findingSeverityCounts =
          scanResult.imageScanFindings.findingSeverityCounts || {};

        if (findingSeverityCounts.CRITICAL || findingSeverityCounts.HIGH) vulnerbleImageCount++
        
        severityCounts.critical += findingSeverityCounts.CRITICAL || 0;
        severityCounts.high += findingSeverityCounts.HIGH || 0;
        severityCounts.medium += findingSeverityCounts.MEDIUM || 0;
        severityCounts.low += findingSeverityCounts.LOW || 0;
        severityCounts.informational +=
          findingSeverityCounts.INFORMATIONAL || 0;
      }
      const results = {
        imageScanned: imageScanned,
        vulnerbleImageCount: vulnerbleImageCount,
        severityCounts: severityCounts
      }
      res.locals.results = results;
      return next();
    } catch (error) {
      return next({
        log: `Error in dataHandlingController.aggregateScanResults: ${error}`,
        status: 500,
        message: 'Error aggregating scan results',
      });
    }
  },
};

export default dataHandlingController;
