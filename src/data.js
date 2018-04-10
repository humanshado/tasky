export const getDefaultData = () => {
    return [
        {
            id: 1,
            title: "Design House Layout",
            description: "A 3-bedroom house for my aunt",
            status: "on-going",
            tasks: []
        },
        {
            id: 2,
            title: "Obtain Building Permission",
            description: "A key requirement before work start on site",
            status: "todo",
            tasks: [
                { 
                    id: 1,
                    name: "Fill out all forms",
                    done: true
                },
                {
                    id: 2,
                    name: "Pay all required fees",
                    done: false
                },
                {
                    id: 3,
                    name: "Submit all documents",
                    done: false
                }
            ]
        },
        {
            id: 3,
            title: "Secure Fund for the Project",
            description: "No money no movement",
            status: "completed"
        }
    ];
}