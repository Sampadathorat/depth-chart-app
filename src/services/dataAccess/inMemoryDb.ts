import { ITeamPlayer } from '../../models/teamPlayer';
import { PlayerStatus } from '../../types/enums';
import { IPlayerEntity } from './entities/playerEntity';
import { IPlayerPositionDepthEntity } from './entities/playerPositionDepthEntity';
import { IPositionEntity } from './entities/positionEntity';
import { ISportEntity } from './entities/sportEntity';
import { ITeamEntity } from './entities/teamEntity';
import { ITeamPlayerEntity } from './entities/teamPlayerEntity';
import { ITeamUnitEntity } from './entities/teamUnitEntity';

export class DepthChartDB {
    static sports: ISportEntity[] = [];
    static teams: ITeamEntity[] = [];
    static teamUnits: ITeamUnitEntity[] = [];
    static positions: IPositionEntity[] = [];
    static players: IPlayerEntity[] = [];
    static teamPlayers: ITeamPlayerEntity[] = [];
    static playersPositionDepth: IPlayerPositionDepthEntity[] = [];

    static Truncate() {
        DepthChartDB.sports = [];
        DepthChartDB.teams = [];
        DepthChartDB.teamUnits = [];
        DepthChartDB.positions = [];
        DepthChartDB.players = [];
        DepthChartDB.teamPlayers = [];
        DepthChartDB.playersPositionDepth = [];
    }
    static isSeeded() {
        if (DepthChartDB.sports.length > 0 && DepthChartDB.teams.length > 0 && DepthChartDB.teamUnits.length > 0 && DepthChartDB.positions.length > 0) {
             return true;
        }
        return false;
    }
    static Seed(currentDate: number) {
        //** Seed sports */
        const nflCode = 'NFL';
        const nfl: ISportEntity = {
            code: nflCode,
            name: 'National Football League',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        DepthChartDB.sports = [nfl];

        //** Seed teams */
        const tbbCode = 'TBB';
        const tbb: ITeamEntity = {
            code: tbbCode,
            name: 'Tampa Bay Buccaneers',
            sportCode: nflCode,
            headCoach: { firstName: 'Bruce', lastName: 'Arians' },
            offCordinator: { firstName: 'Byron', lastName: 'Leftwich' },
            defCordinator: { firstName: 'Todd', lastName: 'Bowles' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        DepthChartDB.teams = [tbb];

        //** Seed Units */
        const offenceUnitCode = 'OFFEN';
        const offenUnit: ITeamUnitEntity = {
            code: offenceUnitCode,
            name: 'Offense',
            teamCode: tbbCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const defenceUnitCode = 'DEFEN';
        const defenUnit: ITeamUnitEntity = {
            code: defenceUnitCode,
            name: 'Defense',
            teamCode: tbbCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const specialUnitCode = 'SPECL';
        const speclUnit: ITeamUnitEntity = {
            code: specialUnitCode,
            name: 'Special Teams',
            teamCode: tbbCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const reserveUnitCode = 'RESRV';
        const resrvUnit: ITeamUnitEntity = {
            code: reserveUnitCode,
            name: 'Reserves',
            teamCode: tbbCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        DepthChartDB.teamUnits = [offenUnit, defenUnit, speclUnit, resrvUnit];

        const posLWRCode = 'LWR';
        const posLWR: IPositionEntity = {
            code: posLWRCode,
            name: 'Left Wide Receiver',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: offenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const posRWRCode = 'RWR';
        const posRWR: IPositionEntity = {
            code: posRWRCode,
            name: 'Right Wide Receiver',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: offenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const posLTCode = 'LT';
        const posLT: IPositionEntity = {
            code: posLTCode,
            name: 'Left Tackle',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: offenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posLGCode = 'LG';
        const posLG: IPositionEntity = {
            code: posLGCode,
            name: 'Left Guard',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: offenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posCCode = 'C';
        const posC: IPositionEntity = {
            code: posCCode,
            name: 'Center',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: offenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posRGCode = 'RG';
        const posRG: IPositionEntity = {
            code: posRGCode,
            name: 'Right Guard',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: offenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posRTCode = 'RT';
        const posRT: IPositionEntity = {
            code: posRTCode,
            name: 'Right Tackle',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: offenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posTECode = 'TE';
        const posTE: IPositionEntity = {
            code: posTECode,
            name: 'Tight End',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: offenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posQBCode = 'QB';
        const posQB: IPositionEntity = {
            code: posQBCode,
            name: 'Quarterback',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: offenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posRBCode = 'RB';
        const posRB: IPositionEntity = {
            code: posRBCode,
            name: 'Running Back',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: offenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posDECode = 'DE';
        const posDE: IPositionEntity = {
            code: posDECode,
            name: 'Defensive End',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: defenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posNTCode = 'NT';
        const posNT: IPositionEntity = {
            code: posNTCode,
            name: 'Nose Tackle',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: defenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posOLBCode = 'OLB';
        const posOLB: IPositionEntity = {
            code: posOLBCode,
            name: 'Outside Linebacker',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: defenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posILBCode = 'ILB';
        const posILB: IPositionEntity = {
            code: posILBCode,
            name: 'Inside Linebacker',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: defenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posCBCode = 'CB';
        const posCB: IPositionEntity = {
            code: posCBCode,
            name: 'Cornerback',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: defenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posSSCode = 'SS';
        const posSS: IPositionEntity = {
            code: posSSCode,
            name: 'Strong Safety',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: defenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posFSCode = 'FS';
        const posFS: IPositionEntity = {
            code: posFSCode,
            name: 'Free Safety',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: defenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posRCBCode = 'RCB';
        const posRCB: IPositionEntity = {
            code: posRCBCode,
            name: 'Right Cornerback',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: defenceUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posPTCode = 'PT';
        const posPT: IPositionEntity = {
            code: posPTCode,
            name: 'Punter',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: specialUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posPKCode = 'PK';
        const posPK: IPositionEntity = {
            code: posPKCode,
            name: 'Placekicker',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: specialUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posLSCode = 'LS';
        const posLS: IPositionEntity = {
            code: posLSCode,
            name: 'Long Snapper',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: specialUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posHCode = 'H';
        const posH: IPositionEntity = {
            code: posHCode,
            name: 'Holder',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: specialUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posKOCode = 'KO';
        const posKO: IPositionEntity = {
            code: posKOCode,
            name: 'Kickoff Specialist',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: specialUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posPRCode = 'PR';
        const posPR: IPositionEntity = {
            code: posPRCode,
            name: 'Punt Returner',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: specialUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posKRCode = 'KR';
        const posKR: IPositionEntity = {
            code: posKRCode,
            name: 'Kickoff Returner',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: specialUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const posRESCode = 'RES';
        const posRES: IPositionEntity = {
            code: posRESCode,
            name: 'Reserve',
            maxDepth: 5,
            teamCode: tbbCode,
            teamUnitCode: reserveUnitCode,
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        DepthChartDB.positions = [
            posLWR,
            posRWR,
            posLT,
            posLG,
            posC,
            posRG,
            posRT,
            posTE,
            posQB,
            posRB,
            posDE,
            posNT,
            posOLB,
            posILB,
            posCB,
            posSS,
            posFS,
            posRCB,
            posPT,
            posPK,
            posLS,
            posH,
            posKO,
            posPR,
            posKR,
            posRES,
        ];

        const player1Alias = 'YayaD';
        const player1: IPlayerEntity = {
            alias: player1Alias,
            name: { lastName: 'Diaby', firstName: 'Yaya' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player2Alias = 'RachaadW';
        const player2: IPlayerEntity = {
            alias: player2Alias,
            name: { lastName: 'White', firstName: 'Rachaad' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player3Alias = 'KyleT';
        const player3: IPlayerEntity = {
            alias: player3Alias,
            name: { lastName: 'Trask', firstName: 'Kyle' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player4Alias = 'JordanW';
        const player4: IPlayerEntity = {
            alias: player4Alias,
            name: { lastName: 'Whitehead', firstName: 'Jordan' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player5Alias = 'ChaseM';
        const player5: IPlayerEntity = {
            alias: player5Alias,
            name: { lastName: 'McLaughlin', firstName: 'Chase' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player6Alias = 'JakeC';
        const player6: IPlayerEntity = {
            alias: player6Alias,
            name: { lastName: 'Camarda', firstName: 'Jake' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player7Alias = 'BakerM';
        const player7: IPlayerEntity = {
            alias: player7Alias,
            name: { lastName: 'Mayfield', firstName: 'Baker' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player8Alias = 'BuckyI';
        const player8: IPlayerEntity = {
            alias: player8Alias,
            name: { lastName: 'Irving', firstName: 'Bucky' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player9Alias = 'SirVoceaD';
        const player9: IPlayerEntity = {
            alias: player9Alias,
            name: { lastName: 'Dennis', firstName: 'SirVocea' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player10Alias = 'KameronJ';
        const player10: IPlayerEntity = {
            alias: player10Alias,
            name: { lastName: 'Johnson', firstName: 'Kameron' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player11Alias = 'TreyP';
        const player11: IPlayerEntity = {
            alias: player11Alias,
            name: { lastName: 'Palmer', firstName: 'Trey' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player12Alias = 'JohnW';
        const player12: IPlayerEntity = {
            alias: player12Alias,
            name: { lastName: 'Wolford', firstName: 'John' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };

        const player13Alias = 'ChrisG';
        const player13: IPlayerEntity = {
            alias: player13Alias,
            name: { lastName: 'Godwin', firstName: 'Chris' },
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        DepthChartDB.players = [
            player1,
            player2,
            player3,
            player4,
            player5,
            player6,
            player7,
            player8,
            player9,
            player10,
            player11,
            player12,
            player13,
        ];
        const teamPlayer1: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player1Alias,
            teamPlayerNumber: 1,
            status: PlayerStatus.Starter,
            additionalInfo: '23/3',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer2: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player2Alias,
            teamPlayerNumber: 2,
            status: PlayerStatus.Starter,
            additionalInfo: '22/3',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer3: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player3Alias,
            teamPlayerNumber: 3,
            status: PlayerStatus.Starter,
            additionalInfo: '21/2',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer4: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player4Alias,
            teamPlayerNumber: 4,
            status: PlayerStatus.Starter,
            additionalInfo: '18/4',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer5: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player5Alias,
            teamPlayerNumber: 5,
            status: PlayerStatus.Starter,
            additionalInfo: 'U/Ind',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer6: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player6Alias,
            teamPlayerNumber: 6,
            status: PlayerStatus.Starter,
            additionalInfo: '22/4',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer7: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player7Alias,
            teamPlayerNumber: 7,
            status: PlayerStatus.Starter,
            additionalInfo: 'U/LAR',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer8: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player8Alias,
            teamPlayerNumber: 8,
            status: PlayerStatus.Starter,
            additionalInfo: '24/4',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer9: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player9Alias,
            teamPlayerNumber: 9,
            status: PlayerStatus.Starter,
            additionalInfo: '23/5',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer10: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player10Alias,
            teamPlayerNumber: 10,
            status: PlayerStatus.Starter,
            additionalInfo: 'CF24',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer11: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player11Alias,
            teamPlayerNumber: 11,
            status: PlayerStatus.Starter,
            additionalInfo: '23/6',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer12: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player12Alias,
            teamPlayerNumber: 12,
            status: PlayerStatus.Starter,
            additionalInfo: 'U/LAR',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        const teamPlayer13: ITeamPlayerEntity = {
            teamCode: tbbCode,
            playerAlias: player13Alias,
            teamPlayerNumber: 13,
            status: PlayerStatus.Starter,
            additionalInfo: '17/3',
            createdDate: currentDate,
            updatedDate: currentDate,
        };
        DepthChartDB.teamPlayers = [
            teamPlayer1,
            teamPlayer2,
            teamPlayer3,
            teamPlayer4,
            teamPlayer5,
            teamPlayer6,
            teamPlayer7,
            teamPlayer8,
            teamPlayer9,
            teamPlayer10,
            teamPlayer11,
            teamPlayer12,
            teamPlayer13,
        ];
    }
}
