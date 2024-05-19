class Section {
    private configData: never;
    private configurationid: number;

    private constructor(id: number, configData: never) {
        this.configurationid = id;
        this.configData = configData;
    }

    static async createInstance(id: number) {
        const configuration = await fetch(`/tasks/${id}.json`);
        const configData = await configuration.json();

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return new Section(id, configData);
    }

    getTaskById(id: number) {
        const taskId = Number(id);

        if (this.configData === null)
            throw new Error('Section not initialized');

        //check if list of tasks is not empty
        if (this.configData.tasks.length === 0)
            throw new Error('No tasks in section');

        if (!this.configData.tasks.some((task: { id }) => task.id === taskId))
            throw new Error('Task not found');

        return this.configData.tasks.find(
            (task: { id: number }) => task.id === taskId
        );
    }
}

export default Section;
