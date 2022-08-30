export abstract class Component {
    constructor(fieldType: string) {
        this.id = ++Component.idCounter;
        this.field_type = fieldType;
    }

    toggle(state: boolean) {
        this.on = state;
    }

    field_type: string;
    static idCounter = 0;
    id: number;
    opts: object = {};
    on: boolean = true;
}

export interface SwitchOption {
    triggerID: string
    on: boolean
}

export class ComponentSwitch extends Component {
    switchIndex: number;
    static sharedSwitchIndex = 2;

    constructor(...switchOptions: SwitchOption[]) {
        super('switch');
        this.switchIndex = 0;
        this.add(...switchOptions);
    }

    add(...switchOptions: SwitchOption[]) {
        for (const switchOption of switchOptions) {
            let suffix = this.switchIndex === 0 ? '' : this.switchIndex.toString();
            this.opts[`id${suffix}`] = switchOption.triggerID;
            this.opts[`on${suffix}`] = switchOption.on;
            ComponentSwitch.sharedSwitchIndex += 2;
            this.switchIndex = ComponentSwitch.sharedSwitchIndex;
        }
    }
}

export class Condition extends Component {
    constructor(conditionType: number, conditionValue: string, doIfTrue: boolean, conditionDo: number, conditionDo2: string | null = null) {
        super('cond');
        this.opts['do'] = conditionDo;
        if (typeof conditionDo2 === 'string') {
            this.opts['do2'] = conditionDo2;
        }
        this.opts['on'] = doIfTrue;
        this.opts['check'] = conditionType;
        this.opts['check2'] = conditionValue;
    }
}

export class MapComponent extends Component {
    constructor(mapType: number) {
        super('map');
        this.opts['spawn'] = mapType;
    }

    updateContent(content: string): void {
        if (typeof content !== 'string') {
            return;
        }
        this.opts['map'] = content;
    }
}

export class QueueChange extends Component {
    constructor(queue: string, replace: boolean) {
        super('queue');
        this.opts['queue'] = queue;
        this.opts['wipe'] = replace;
    }
}

export class RelativeTrigger extends Component {
    constructor(relativeTriggerType: number, amount: number, triggerID: string) {
        super('rtrig');
        this.opts['af'] = relativeTriggerType;
        this.opts['id'] = triggerID;
        this.opts['when'] = amount;
    }
}

export class Ruleset extends Component {
    constructor(ruleset: string) {
        super('rule');
        this.opts['rule'] = ruleset;
    }
}

export class Run extends Component {
    constructor(triggerID: string) {
        super('run');
        this.opts['id'] = triggerID;
    }
}

export class Text extends Component {
    constructor(position: number, text: string) {
        super('text');
        this.opts['pos'] = position;
        this.opts['text'] = text;
    }
}

export class Trigger extends Component {
    constructor(triggerType: number, triggerArg: string | null) {
        super('trig');
        this.opts['when'] = triggerType;
        if (typeof triggerArg === 'string') {
            this.opts['when2'] = triggerArg;
        }
    }
}
