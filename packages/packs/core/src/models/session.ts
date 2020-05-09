import * as ABP from '.';

export interface State {
	language: string;
	tenant: ABP.BasicItem;
	sessionDetail: SessionDetail;
}

export interface SessionDetail {
	openedTabCount: number;
	lastExitTime: number;
	remember: boolean;
}
