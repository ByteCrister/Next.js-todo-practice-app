'use client'

const SearchTodos = (searchedItems, setTodoState, todos) => {

    searchedItems = String(searchedItems).toLowerCase();
    let Updated = todos.map((item) => ({ ...item, point: 0 }));

    todos.forEach((item) => {
        let totalPoints = 0;

        Object.entries(item).map(([key, value]) => {
            console.log(item);
            if (key === 'title' || key === 'description' || key === 'status' || key === 'taskDate') {
                totalPoints += String(value).toLowerCase().includes(searchedItems) ? 1 : 0;
                totalPoints += searchedItems.includes(String(value).toLowerCase()) ? 1 : 0;

                totalPoints += String(value).toLowerCase() === searchedItems ? 10 : 0;
                if (key === 'taskDate') {
                    totalPoints += String(new Date(value).toUTCString().slice(0, 17)).toLowerCase().includes(searchedItems) ? 1 : 0;
                    totalPoints += searchedItems.includes(String(new Date(value).toUTCString().slice(0, 17)).toLowerCase()) ? 1 : 0;

                    totalPoints += String(new Date(value).toUTCString().slice(0, 17)).toLowerCase() === searchedItems ? 10 : 0;
                }
            }
        });

        Updated = Updated.map((item_) => item_._id === item._id ? { ...item_, point: totalPoints } : item_);
    });

    Updated = Updated.filter((item) => {
        return String(item.title).toLowerCase().includes(searchedItems) ||
            String(item.description).toLowerCase().includes(searchedItems) ||
            String(new Date(item.taskDate).toUTCString().slice(0, 17)).toLowerCase().includes(searchedItems) ||
            String(item.status).toLowerCase().includes(searchedItems)
    });

    Updated.sort((a, b) => Number(b.point) - Number(a.point));

    setTodoState(prev => ({
        ...prev,
        MainTodos: [...Updated],
        FilteredTodos: [...Updated]
    }));


};

export default SearchTodos;