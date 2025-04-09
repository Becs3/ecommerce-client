import axios from "axios";
import { FormEvent, useState } from "react"

interface IItem {
    htmlTitle: string,
    title: string,
    link: string,
    snippet: string
    pagemap: {
        cse_thumbnail: {src: string}[]
    }
}

export const SearchField = () => {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState<IItem[]>([]);

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
            console.log(response.data.items)
            setItems(response.data.items)
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
            {items.map((i) => (
                <div key={i.title}>
                    <h3>{i.htmlTitle}</h3>
                    <p>{i.snippet}</p>
                    {i.pagemap.cse_thumbnail && (
                    <img src={i.pagemap.cse_thumbnail[0].src} alt={i.title} />
                )}
                </div>
            ))
        }
        </div>
        </>
    )
}