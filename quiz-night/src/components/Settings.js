import { React, useEffect, useState } from "react";
const axios = require('axios');


export default function Settings(props) {

    const [options, setOptions] = useState([]);
    const [preferences, setPreferences] = useState({ category: '', difficulty: ''});

    // Call to API for categories
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

    }, [setOptions]);

    const categories = options.map(o => {
        return <option key={o.id} value={`&category=${o.id}`}>{o.name}</option>
    })

    // Handles form select changes
    const handleCategoryChange = (e) => {
        const { value, name } = e.target;
        setPreferences(prevCat => ({ ...prevCat, [name]: value }))
    }
    console.log(preferences);

    // Function enables API call to be modified acording to user preferences
    const handleSubmit = (e) => {
        props.setUrl(prevUrl => prevUrl.concat(preferences.category, preferences.difficulty))
        props.setSettingToggle(prevSettingToggle => !prevSettingToggle)
        e.preventDefault();
    }

    console.log(props.url)

    return (
        <form onSubmit={handleSubmit} className='settings-tab'>
            <select value={preferences.category} onChange={handleCategoryChange} name='category'>
                <option value=''>All Categories</option>
                {categories}
            </select>
            <select value={preferences.difficulty} onChange={handleCategoryChange} name='difficulty'>
                <option value=''>Any Difficulty</option>
                <option value={`&difficulty=easy`}>Easy</option>
                <option value={`&difficulty=medium`}>Medium</option>
                <option value={`&difficulty=hard`}>Hard</option>
            </select>
            <input type="submit" value="Apply Settings" id='apply-settings' />
        </form>
       
    )
};