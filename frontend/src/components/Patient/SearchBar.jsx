import React, { useEffect, useState } from 'react'

import {SearchOutlined} from "@ant-design/icons"

import "../Style/SearchBar.scss"
import { Button } from 'antd';

export default function SearchBar({simple=false}) {
    const [term, setTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    useEffect(()=>{
        if(term.trim().length > 0){
            setShowSearch(true);
        }else{
            setShowSearch(false);
        }
    }, [term])
  return (
    <div className='search-bar'>
        <div id="keyword">
            <SearchOutlined/>
            <input value={term} onChange={(e)=>setTerm(e.target.value)} type="search" placeholder='Find a doctor or speciality...'/>
            {showSearch && (<Button>Search</Button>)}
        </div>
    </div>
  )
}
