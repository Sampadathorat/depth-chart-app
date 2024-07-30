import { DepthChartDataAccessService, IDepthChartDataAccessService } from './dataAccess/depthChartDataAccessService';

export interface IDepthChartService {
    addPlayerToDepthChart(positionCode: string, playerAlias: string, depth: number): Promise<boolean>;
}
export class DepthChartService implements IDepthChartService {
    private readonly _dataAccess: IDepthChartDataAccessService;

    constructor(dataAccess = new DepthChartDataAccessService()) {
        this._dataAccess = dataAccess;
    }

    async seed(): Promise<boolean> {
        return await this._dataAccess.seed();
    }

    async addPlayerToDepthChart(positionCode: string, playerAlias: string, depth: number): Promise<boolean> {
        return await this._dataAccess.addPlayerToDepthChart(positionCode, playerAlias, depth);
    }
}
