class Section {
    private configData: never;
    private configurationid: number;

    private constructor(id: number, configData: never) {
        this.configurationid = id;
        this.configData = configData;
    }

    static async createInstance(id: number) {
        const configuration = await fetch(`/${id}.json`);
        const configData = await configuration.json();

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return new Section(id, configData);
    }

    authorizeSection(password: string)
    {
        if (this.configData === null)
            throw new Error('Section not initialized');

        if (this.configData.password !== password){
            console.log("Wrong password", this.configData.password, password)
            return false;
        }

        console.log("Valid password", this.configData.password, password, this.configData.password == password)
        localStorage.setItem(`section-${this.configurationid}`, 'true');

        return true;
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
