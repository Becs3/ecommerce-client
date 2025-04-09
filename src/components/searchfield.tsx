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
    const [startIndex, setStartIndex] = useState<number>(1); 
  const [totalResults, setTotalResults] = useState<number>(0);

    const handleSubmit = async(e:FormEvent, newStartIndex = 1) => {
        e.preventDefault();

        try{
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    q: search,
                    key: "AIzaSyDITH2Uodl-gRbDOTkTswgrjnGRdf2UyAM",
                    cx: "a1d5341d6864e43b3",
                    start: newStartIndex,
                    num: 10
                }
            })

            const result = response.data;

            if (search.length <= 1) {
                throw new Error('Must contain characters')
              }
              if (result.items === undefined) {
                throw new Error('No search results')
              }

            console.log(result)
            setItems(result.items)
            setTotalResults(result.searchInformation.totalresults);
            setStartIndex(newStartIndex)
        }
        catch (error) {
            throw new Error
        }
    }

    return(
        <>
        <div className="search-container">
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <h3>Didn't find what you were looking for?</h3>
        <input type="text" 
        placeholder="Search"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}/>
        <button type="submit">Search</button>
        </form>
        </div>

        <div>
        {!items ? (
          <p>There are no results</p>
        ) : (
            items.map((i) => (
                <div key={i.title} className="item-container">
                <section className="item-section">
                    {i.pagemap.cse_thumbnail && (
                    <img src={i.pagemap.cse_thumbnail[0].src} alt={i.title} />)}
                    {!i.pagemap.cse_thumbnail && (
                    <img src={'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'} />
                  )}
                </section>
                <section className="item-section">
                    <h3>{i.title}</h3>
                    <p>{i.snippet}</p>
                    <a href={i.link} target="_blank" rel="noopener noreferrer"> To product page </a>
                </section>
                </div>
            ))
        )}
        <div className="pagination">
              <button disabled={startIndex <= 1} 
                onClick={(e) => handleSubmit(e, startIndex - 10)}> 
                Previous 
                </button>

              <button disabled={startIndex + 10 > totalResults} 
                onClick={(e) => handleSubmit(e, startIndex + 10)}>
                Next
              </button>
            </div>
        </div>
        </>
    )
}