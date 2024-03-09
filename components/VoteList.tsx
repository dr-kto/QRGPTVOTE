import clsx from 'clsx';
import UserCard from './custom/UserCard';

let scale = 1.5;
let width = 200 * scale;
let height = 340 * scale;
let rounded = height / 2 + 45;
const size = {
  width: width,
  height: height,
  rounded: rounded,
};

const VoteList = () => {
  const users = [
    {
      id: 1,
      name: 'Ли Тимур Владиславович',
      avatar:
        'https://images.unsplash.com/photo-1519433645785-9c1727529330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      image: '/user1.png',
      url: 'https://twitter.com/nutlope',
    },
    {
      id: 2,
      name: 'Буранбаев Асан Булатович',
      avatar:
        'https://images.unsplash.com/photo-1519433645785-9c1727529330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      image: '/user2.png',
      url: 'https://twitter.com/nutlope',
    },
    {
      id: 3,
      name: 'Амерходжаев Галым Ташмуханбетович',
      avatar:
        'https://images.unsplash.com/photo-1519433645785-9c1727529330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      image: '/user3.png',
      url: 'https://twitter.com/nutlope',
    },
    {
      id: 4,
      name: 'Жамек Даурен Асанулы',
      avatar:
        'https://images.unsplash.com/photo-1519433645785-9c1727529330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      image: '/user4.png',
      url: 'https://twitter.com/nutlope',
    },
    {
      id: 5,
      name: 'Ли Тимур Владиславович',
      avatar:
        'https://images.unsplash.com/photo-1519433645785-9c1727529330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      image: '/user1.png',
      url: 'https://twitter.com/nutlope',
    },
    {
      id: 6,
      name: 'Буранбаев Асан Булатович',
      avatar:
        'https://images.unsplash.com/photo-1519433645785-9c1727529330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      image: '/user2.png',
      url: 'https://twitter.com/nutlope',
    },
    {
      id: 7,
      name: 'Амерходжаев Галым Ташмуханбетович',
      avatar:
        'https://images.unsplash.com/photo-1519433645785-9c1727529330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      image: '/user3.png',
      url: 'https://twitter.com/nutlope',
    },
    {
      id: 8,
      name: 'Жамек Даурен Асанулы',
      avatar:
        'https://images.unsplash.com/photo-1519433645785-9c1727529330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      image: '/user4.png',
      url: 'https://twitter.com/nutlope',
    },
  ];

  return (
    <>
      <ul
        // className={`inline-block`}
        className={`grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 p-2 `}
        // style={{gridTemplateColumns: { repeat(count) {
        //   return `minmax(${rounded || 300}px,1fr)`;
        // },}}}
        // className="grid grid-cols-[200px_minmax(900px,_1fr)_100px] "
      >
        {users.map((user) => {
          return (
            <>
              <UserCard key={`${user.id}`} user={user} size={size} />
            </>
          );
        })}
      </ul>
    </>
  );
};

export default VoteList;
