import UserTable from "./userlist";

const adminPage = async () => {
    const GetUsers = async () => {
        try {
            const response = await fetch("http://localhost:10000/admin/users", {
                method: "GET",
                // headers: {
                //     "Content-Type": "application/json",
                //     Authorization: "Bearer " + window.localStorage.getItem("token"),
                // },
            });
            if (response.ok) {
                const jsonData = await (await response.json()).users;
                return jsonData;
            } else {
                // Handle error response
                const errorData = await response.json();
                console.error("Request failed with status:", response.status);
                console.error("Error message:", errorData.message);
            }
        } catch (error) {
            // Handle network error
            console.error("An error occurred:", error);
        }
    };
    const users = await GetUsers();
    console.log(users);

    return (
        <div>
            <h1>Admin Page!</h1>
            <UserTable data={users} />
        </div>
    );
};

export default adminPage;
