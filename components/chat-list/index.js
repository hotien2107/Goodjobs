import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useChatList from '../../hooks/use-chat-list';

const ChatList = () => {
  const router = useRouter();
  const { chatList } = useChatList();

  return (
    <ul className="px-2">
      {chatList.map((user) => {
        return (
          <li
            key={user.id}
            className={`flex cursor-pointer ${router.query.receiverId === user.id ? "bg-slate-200" : ""}`}
            onClick={() => {
              router.push(`/chat/${user.id}`);
            }}
          >
            {user.avatar ? (
              <img src={user.avatar} alt='Avatar' className='w-8 h-8 rounded-full mr-4' />
            ) : (
              <div className='w-8 h-8 rounded-full bg-purple-600 text-white flex justify-center items-center'>{user.fullName[0]}</div>
            )}

            <p className=''>{user.fullName}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatList;
