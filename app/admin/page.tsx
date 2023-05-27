const adminPage = async () => {
    const GetUsers = async () => {
        try {
            const response = await fetch("http://localhost:10000/admin/users");
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
            {users.map((user: any) => {
                return (
                    <div className="card">
                        <h3>이메일</h3>
                        {user.email}
                        <h3>이름</h3>
                        {user.name}
                    </div>
                );
            })}
        </div>
    );
};

export default adminPage;
