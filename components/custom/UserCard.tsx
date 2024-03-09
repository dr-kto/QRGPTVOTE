'use client';
import Image from 'next/image';
import clsx from 'clsx';
import { useCallback, useState } from 'react';

const UserCard = ({
  user,
  size,
}: {
  user: {
    image: string;
    name: string;
    avatar: string;
    url: string;
  };
  size: {
    width: number;
    height: number;
    rounded: number;
  };
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isRotate, setIsRotate] = useState(false);

  const { width, height, rounded } = size;

  const cardSize = {
    width: isActive ? width : rounded,
    height: isActive ? height : rounded,
  };

  const toggle = useCallback(() => {
    console.log('Toggling');
    if (isActive) {
      console.log('false');
      setIsActive(false);
      cardSize.width = rounded;
      cardSize.height = rounded;
    } else {
      console.log('true');
      setIsActive(true);
      cardSize.width = width;
      cardSize.height = height;
    }
  }, [isActive]);

  const toggleRotate = useCallback(() => {
    console.log('Turning around');
    if (isRotate) {
      setIsRotate(false);
    } else {
      setIsRotate(true);
    }
  }, [isRotate]);

  return (
    <>
      <li
        className={clsx(
          'flex flex-col self-center justify-center items-center mr-2 mb-2 bg-transparent group',
          isActive ? 'row-span-2 perspective blur-[0.0px] ' : 'row-span-1 ',
          // isActive ? 'float-right' : 'float-left',
        )}
        // style={cardSize}
      >
        <div
          onClick={toggle}
          className={clsx(
            `relative  cursor-pointer flex  items-center`,
            isActive
              ? `preserve-3d  duration-300 ease-in-out`
              : `rounded-full overflow-hidden `,
            isRotate && isActive ? 'card_rotate' : '',
          )}
          style={cardSize}
        >
          <div className={clsx(``, isActive && 'absolute backface-hidden')}>
            {isActive ? (
              <Image
                src="/card_back.png"
                alt="card"
                width={cardSize.width}
                height={cardSize.height}
                className=""
              />
            ) : (
              <Image
                src="/card_rounded.png"
                alt="card_rounded"
                width={cardSize.width}
                height={cardSize.height}
                // width=rounded
                // height=rounded
                className=""
              />
            )}

            <Image
              src={user?.image || '/placeholder.png'}
              alt="avatar"
              width={width}
              height={height}
              className={clsx(
                'absolute   drop-shadow-[0_0px_5px_rgba(207,181,59,1)]',
                isActive ? `bottom-[0%]` : `bottom-[-50%]`,
              )}
            />
            <div
              className={clsx(
                `bg-gradient-to-t from-gray-950  to-transparent  left-[10px]   h-[45%] absolute`,
                isActive
                  ? `from-25% bottom-[3%] w-[${width}px]`
                  : 'from-30% bottom-[0%]',
              )}
              style={{ width: width - 20 }}
            />
            {/* <div
            className={clsx(
              `w-[${width}px] h-[${height * 0.45}px] bottom-[0%] co`,
            )}
          ></div> */}
            {isActive && (
              <Image
                src="/card_front.png"
                alt="card"
                width={width}
                height={height}
                className="absolute top-[0%]"
              />
            )}

            <Image
              src="/card_title.png"
              alt="card"
              width={width}
              height={height}
              className="absolute bottom-[5.1%]"
            />
            <div className="absolute bottom-[7.5%] text-white text-center w-full">
              {user?.name.split(' ')[1]}
            </div>
          </div>
          {isActive && (
            <div
              className={` break-words flex flex-col absolute backface-hidden card_rotate text-black  items-center`}
              style={cardSize}
            >
              <Image
                src="/card_backside.png"
                alt="cardside"
                width={cardSize.width}
                height={cardSize.height}
                className="absolute 
                "
              />
              <div className="relative px-8 py-12" style={cardSize}>
                <p className="break-words">{user.name}</p>
                <p className="break-words">{user.image}</p>
                <p className="break-words">{user.avatar}</p>
              </div>
            </div>
          )}
        </div>
        {isActive && (
          <>
            <div
              className="flex justify-between px-2 pt-8 items-center"
              style={{ ...cardSize, height: cardSize.width / 4 + 32 }}
            >
              <div
                className=" border-2  border-yellow-500 rounded-xl px-8 py-2"
                onClick={toggleRotate}
              >
                <Image
                  src="/rotate.png"
                  alt="rotate"
                  width={cardSize.width * 0.2}
                  height={cardSize.width * 0.2}
                  className="relative 
                "
                />
              </div>
              <div className=" border-2 border-yellow-500 rounded-xl px-8 py-2">
                <Image
                  src="/loudspeaker.png"
                  alt="loudspeaker"
                  width={cardSize.width * 0.2}
                  height={cardSize.width * 0.2}
                  className="relative 
                "
                />
              </div>
            </div>
          </>
        )}
      </li>
    </>
  );
};

export default UserCard;
