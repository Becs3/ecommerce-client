import axios from "axios";
import { FormEvent, useState } from "react"

export const SearchField = () => {
    const [search, setSearch] = useState("");
    //const [items, setItems] = useState([]);

    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault();

        try{
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    q: search,
                    key: "AIzaSyDITH2Uodl-gRbDOTkTswgrjnGRdf2UyAM",
                    cx: "a1d5341d6864e43b3"
                }
            })
            console.log(response.data)
        }
        catch (error) {
            throw new Error
        }
    }

    return(
        <>
        <div>
        <form onSubmit={handleSubmit}>
        <input type="text" 
        placeholder="Search"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}/>
        <button type="submit">Search</button>
        </form>
        </div>

        <div>

        </div>
        </>
    )
}