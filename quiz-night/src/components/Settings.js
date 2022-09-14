import { React, useEffect, useState } from "react";
const axios = require('axios');


export default function Settings(props) {

    const [options, setOptions] = useState([]);
    const [preferences, setPreferences] = useState({ category: '', difficulty: '', type: '' });

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
        props.setUrl(prevUrl => prevUrl.concat(preferences.category, preferences.difficulty, preferences.type))
        e.preventDefault();
    }

    console.log(props.url)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={preferences.category} onChange={handleCategoryChange} name='category'>
                    <option value=''>All Categories</option>
                    {categories}
                </select>
                <select value={preferences.difficulty} onChange={handleCategoryChange} name='difficulty'>
                    <option value=''>Any</option>
                    <option value={`&difficulty=medium`}>Medium</option>
                    <option value={`&difficulty=easy`}>Easy</option>
                    <option value={`&difficulty=hard`}>Hard</option>
                </select>
                <select value={preferences.type} onChange={handleCategoryChange} name='type'>
                    <option value=''>Any</option>
                    <option value={`&type=boolean`}>True / False</option>
                    <option value={`&type=multiple`}>Multiple Choice</option>
                </select>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};