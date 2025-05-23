export interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  Action: ZapAction[];
  trigger: Trigger;
  image: string;
}

export interface ZapAction {
  id: string;
  zapId: string;
  actionId: string;
  metadata: Record<string, any>;
  sortingOrder: number;
  availabeTriggersId: string | null;
  type: ActionType;
}

export interface ActionType {
  image: any;
  id: string;
  name: string;
}

export interface Trigger {
  id: string;
  zapId: string;
  triggerId: string;
  metadata: Record<string, any>;
  type: TriggerType;
}

export interface TriggerType {
  image: any;
  id: string;
  name: string;
}
