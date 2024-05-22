"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataHandlingController = {
    aggregateScanResults: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const severityCounts = {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0,
            informational: 0,
        };
        // Initialize image counter
        let imageScanned = 0;
        try {
            // Aggregate scan result severity from each image
            const scanResults = res.locals.scanResults;
            for (const scanResult of scanResults) {
                if (scanResult.imageScanStatus.status === 'COMPLETE')
                    imageScanned++;
                //console.log(`I am scanResult in data handler: ${JSON.stringify(scanResult)}`)
                const findingSeverityCounts = scanResult.imageScanFindings.findingSeverityCounts || {};
                severityCounts.critical += findingSeverityCounts.CRITICAL || 0;
                severityCounts.high += findingSeverityCounts.HIGH || 0;
                severityCounts.medium += findingSeverityCounts.MEDIUM || 0;
                severityCounts.low += findingSeverityCounts.LOW || 0;
                severityCounts.informational +=
                    findingSeverityCounts.INFORMATIONAL || 0;
            }
            const results = {
                imageScanned: imageScanned,
                severityCounts: severityCounts
            };
            res.locals.results = results;
            return next();
        }
        catch (error) {
            return next({
                log: `Error in dataHandlingController.aggregateScanResults: ${error}`,
                status: 500,
                message: 'Error aggregating scan results',
            });
        }
    }),
};
exports.default = dataHandlingController;
