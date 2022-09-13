import { React, useEffect, useState } from "react";
const axios = require('axios');


export default function Settings() {
  
    const [options, setOptions] = useState([]);
    const [preferences, setPreferences] = useState({category: '', difficulty: '', type: ''});

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await axios.get('https://opentdb.com/api_category.php')
                setOptions(response.data.trivia_categories);

            } catch (error) {
                console.log(error);
            }
        }

        getCategories();

    },[setOptions]);

    console.log(options)

    const categories = options.map(o => {
                return <option key={o.id} value={o.id}>{o.name}</option>
            })

    const handleCategoryChange = (e) => {
        const {value, name } = e.target;
        setPreferences(prevCat => ({...prevCat, [name] : value}))
    }
    console.log(preferences);
    
    return (
        <div>
            <select value={preferences.category} onChange={handleCategoryChange} name='category'>
                <option value=''>All</option>    
                {categories}   
          </select>
            <select value={preferences.difficulty} onChange={handleCategoryChange} name='difficulty'>
                <option value='medium'>Medium</option>    
                <option value='easy'>Easy</option>    
                <option value='hard'>Hard</option>    
          </select>
            <select value={preferences.type} onChange={handleCategoryChange} name='type'>
                <option value=''>Any</option>    
                <option value='boolean'>True / False</option>    
                <option value='multiple'>Multiple Choice</option>    
          </select>
            
        </div>
    )
};