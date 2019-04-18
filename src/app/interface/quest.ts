export type QuestType = 'Yearly' | 'Monthly' | 'Weekly' | 'Daily';
export type RewardLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export class Data {
    config: Config = {
        pointsType: '$',
    };
    quests: Quest[] = [];
    completeQuests: CompleteQuest[] = [];
    rewards: Reward[] = [];
    points = 0;
}

export interface Config {
    pointsType: string;
}

export interface Quest {
    description: string;
    points: number;
    type: QuestType;
}

export interface CompleteQuest {
    year: number;
    day: number;
    month: number;
    quest: Quest;
}

export interface Reward {
    description: string;
    pointsCost: number;
    rewardLevel: RewardLevel;
    complete: true | false;
}

