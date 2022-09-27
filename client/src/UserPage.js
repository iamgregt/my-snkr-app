function UserPage({users}){
    return(
        <>
        <h1>Welcome to the User Page</h1>
        <ul>
            {users.map((u) => {
                return(
                    <li key={u.id}>{u.summary}</li>
                )
            })}
        </ul>
        </>
    )
}

export default UserPage