import "./Profile.scss"
export default function Profile() {

    return(
        <div className="profile">
            <h1>My Profile</h1>
            <form className="profile__form">
                <div>
                    <label htmlFor="first-name">First name</label>
                    <input type="text" name="first-name"></input>
                </div>
                <div>
                    <label htmlFor="last-name">Last name</label>
                    <input type="text" name="last-name"></input>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"></input>
                </div>
                <button>Update</button>
            </form>
        </div>
    )
}