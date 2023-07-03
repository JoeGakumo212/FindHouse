
import React, { useState, useEffect } from 'react';
import { toast } from 'react-nextjs-toast';

const SearchBox = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchQuery);
    }, 300); // Adjust the delay value (in milliseconds) as per your requirement

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, onSearch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() !== '' && onSearch && onSearch.length === 0) {
      const toastId = toast.notify('No item found', {
        duration: 10000, // 10 seconds
        type: 'error',
      });

      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [searchQuery, onSearch]);

  return (
    <div>
      <form className="d-flex flex-wrap align-items-center my-2">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search Property or Location"
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className="my-2 my-sm-0" type="submit">
          <span className="flaticon-magnifying-glass"></span>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
