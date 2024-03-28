import { User, getUserByUsername } from 'entities/user';
import { setWorkspaceShared } from 'entities/workspace';
import { useEffect, useState } from 'react';

import { IoMdShare } from 'react-icons/io';
import { IoMdSearch } from 'react-icons/io';
import { MdOutlineSearchOff } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';

import { useParams } from 'react-router-dom';
import { onKeyDown, showNotification } from 'shared/helpers';

import { useDebounce } from 'shared/hooks';

export const ShareWorkspace = () => {
  const { workspaceId } = useParams();

  const [value, setValue] = useState('');
  const [searched, setSearched] = useState<User[] | null>(null);
  const [isFinding, setIsFinding] = useState(false);
  const [notification, setNotification] = useState('');

  const searchValue = useDebounce(value, 800);

  useEffect(() => {
    (async () => {
      if (searchValue.length > 1 && isFinding) {
        setSearched(await getUserByUsername(searchValue));
      }
    })();
  }, [isFinding, searchValue]);

  const handleShare = (id: string) => {
    (async () => {
      setValue('');
      setSearched(null);
      setIsFinding(false);
      const isSuccess = (await setWorkspaceShared(Number(workspaceId), id)) === 204;
      isSuccess && showNotification('Success', 1500, setNotification);
    })();
  };

  return (
    <>
      <div onClick={() => setIsFinding(true)} className="share-workspace-btn">
        {!isFinding && !notification && (
          <>
            <IoMdShare />
            Share workspace
          </>
        )}

        {notification && (
          <div className="flex-y-center gap-2 w-[145px]">
            <FaCheck />
            Success
          </div>
        )}

        {isFinding && (
          <>
            <IoMdSearch />
            <input
              type="text"
              className="bg-inherit w-[123px] outline-none search-placeholder"
              autoFocus
              // onBlur={() => setIsFinding(false)}
              placeholder="Input username..."
              value={value}
              onKeyDown={(e) => onKeyDown('Enter', e, () => setIsFinding(false))}
              onChange={(e) => {
                setSearched(null);
                setValue(e.target.value);
              }}
            />
          </>
        )}
      </div>

      {isFinding && searched && (
        <div className="search-list">
          {searched.length === 0 && (
            <div className="search-list-item flex-y-center gap-1">
              <MdOutlineSearchOff />
              Not find
            </div>
          )}

          {searched.map(({ username, id }) => (
            <div className="search-list-item" key={id} onClick={() => handleShare(id)}>
              @{username}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
