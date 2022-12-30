import { AiOutlineUser } from 'react-icons/ai'

export default function UserList({ users }: any) {
    return (
        <div className='container user'>
            <h2>Users</h2>
            <ul className='list user'>
                {users.map(({ userId, nickName } : {userId: string, nickName: string}) => (
                    <li key={userId} className='item user'>
                        <AiOutlineUser className='icon user' />
                        {nickName}
                    </li>
                ))}
            </ul>
        </div>
    )
}