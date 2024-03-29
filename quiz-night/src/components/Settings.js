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
                console.error(error);
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

    // Function enables API call to be modified acording to user preferences
    const handleSubmit = (e) => {
        props.setUrl(prevUrl => prevUrl.concat(preferences.category, preferences.difficulty))
        props.setSettingToggle(prevSettingToggle => !prevSettingToggle)
        e.preventDefault();
    }


    return (
        <form onSubmit={handleSubmit} className='settings-tab'>
            <select aria-label="Category select" value={preferences.category} onChange={handleCategoryChange} name='category'>
                <option value=''>All Categories</option>
                {categories}
            </select>
            <select aria-label="Difficulty select" value={preferences.difficulty} onChange={handleCategoryChange} name='difficulty'>
                <option value=''>Any Difficulty</option>
                <option value={`&difficulty=easy`}>Easy</option>
                <option value={`&difficulty=medium`}>Medium</option>
                <option value={`&difficulty=hard`}>Hard</option>
            </select>
            <input aria-label="apply settings" type="submit" value="Apply Settings" id='apply-settings' />
        </form>
       
    )
};