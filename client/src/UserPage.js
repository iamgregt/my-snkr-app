function UserPage({users}){
    return(
        <>
        <h1>Welcome to the User Page</h1>
        <ul>
            {users.map((u) => {
                return(
                    <li>{u.summary}</li>
                )
            })}
        </ul>
        </>
    )
}

export default UserPage