"use client"
import React from 'react'
import { SelectFilter } from './SelectFilter'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterByDate, filterByDateDefaultValue } from '@/types/transaction_type';

const FilterGraphData = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(term: FilterByDate) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('filter', term);
    } else {
      params.delete('filter');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='md:col-span-2 w-full'>
      <SelectFilter
        filter={
          searchParams.get('filter') as FilterByDate || filterByDateDefaultValue
        }
        onChangeFilter={(val) => handleFilter(val)}
      />
    </div>
  )
}

export default FilterGraphData