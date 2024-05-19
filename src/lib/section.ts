export type GameTask = {
    id: number;
    title: string;
    overview: string;
    description: string;
    game: {
        id: number;
        type: 'Wordle' | 'Nonogram';
    };
};

export type TextTask = {
    id: number;
    type: string;
    configuration: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type Task = GameTask | TextTask;

type Configuration = {
    id: number;
    name: string;
    localizationTips: string;
    localization: string;
    tasks: Task[];
};

class Section {
    private configData: Configuration;
    // @ts-expect-error loool
    private configurationid: number;

    private constructor(id: number, configData: Configuration) {
        // @ts-expect-error loool
        this._configurationid = id;
        this.configData = configData;
    }

    static async createInstance(id: number) {
        // FIXME: can fail
        const configuration = await fetch(`/${id}.json`);
        const configData = (await configuration.json()) as Configuration;

        return new Section(id, configData);
    }

    getConfigData() {
        return this.configData;
    }

    // isSecrionautohrized 

    getTaskById(id: number) {
        const taskId = Number(id);

        if (this.configData === null)
            throw new Error('Section not initialized');

        //check if list of tasks is not empty
        if (this.configData.tasks.length === 0)
            throw new Error('No tasks in section');

        if (!this.configData.tasks.some((task) => task.id === taskId))
            throw new Error('Task not found');

        return this.configData.tasks.find(
            (task: { id: number }) => task.id === taskId
        );
    }

}

export default Section;
