 export const getDefaultData = () => {
    return [
        {
            id: 1,
            title: "Brainstorm on design of a 3-bedroom house",
            description: "A retirement home for my aunt",
            status: "todo",
            tasks: [
                { id: 1, name: "Assess all options", done: true },
                { id: 2, name: "Choose the best option", done: true }
            ]
        },
        {
            id: 2,
            title: "Design the 3-bedroom house",
            description: "An design that reflects a resting place",
            status: "todo",
            tasks: [
                { id: 1, name: "Decide on the layout", done: true },
                { id: 2, name: "Determine dimensions of open spaces", done: false },
                { id: 3, name: "Put pencil on paper", done: false }
            ]
        },
        {
            id: 3,
            title: "Engage a contractor",
            description: "A good product requires a good craftsman",
            status: "on-going",
            tasks: [
                { id: 1, name: "Specify deliverables for the project", done: false },
                { id: 2, name: "Determine contractor evaluation criteria", done: false },
                { id: 3, name: "Invite for bid submission", done: false },
                { id: 4, name: "Evaluate contractors submissions", done: false },
                { id: 5, name: "Award contract", done: false }
            ]
        },
        {
            id: 4,
            title: "Source funding",
            description: "Money is the blood of this project",
            status: "completed",
            tasks: [
                { id: 1, name: "Estimate project cost", done: true },
                { id: 2, name: "Identify funding sources", done: true },
                { id: 3, name: "Secure firm commitment of funding", done: true }
            ]
        }
    ]
};