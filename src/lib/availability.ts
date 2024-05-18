class Availability {
    static setSectionAvailable(sectionId: number) {
        const availabilityKey = `section-${sectionId}-available`;
        localStorage.setItem(availabilityKey, 'true');
    }

    static setTaskAvailable(sectionId: number, taskId: number) {
        const availabilityKey = `section-${sectionId}-task-${taskId}-available`;
        localStorage.setItem(availabilityKey, 'true');
    }

    static isSectionAvailable(sectionId: number) {
        const availabilityKey = `section-${sectionId}-available`;
        const availability = localStorage.getItem(availabilityKey);
        return availability !== null;
    }

    static isTaskAvailable(sectionId: number, taskId: number) {
        const availabilityKey = `section-${sectionId}-task-${taskId}-available`;
        const availability = localStorage.getItem(availabilityKey);
        return availability !== null;
    }
}

export default Availability;