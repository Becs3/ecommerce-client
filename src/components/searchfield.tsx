import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import "../style/searchStyle.css"

interface IItem {
  htmlTitle: string;
  title: string;
  link: string;
  snippet: string;
  pagemap: {
    cse_thumbnail: { src: string }[];
  };
}

export const SearchField = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<IItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            q: search,
            key: "AIzaSyDITH2Uodl-gRbDOTkTswgrjnGRdf2UyAM",
            cx: "a1d5341d6864e43b3",
          },
        }
      );

      const result = response.data;

      if (search.length <= 1) {
        throw new Error("Must contain characters");
      }
      if (result.items === undefined) {
        throw new Error("No search results");
      }

      console.log(result);
      setItems(result.items);
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setItems([]); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
<div className="search-container">
  <form
    onSubmit={(e) => {
      handleSubmit(e);
    }}
  >
    <h3>Didn't find what you were looking for?</h3>
    <input
      type="text"
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <button type="submit">Search</button>
  </form>

  {items.length > 0 && (
    <div className="dropdown" ref={dropdownRef}>
      {items.map((i) => (
        <div
          key={i.title}
          className="dropdown-item"
          onClick={() => window.open(i.link, "_blank")}
        >
          <div className="dropdown-item-content">
            <img
              src={
                i.pagemap?.cse_thumbnail?.[0]?.src ||
                "https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg"
              }
              alt={i.title}
              className="thumbnail"
            />
            <div>
              <h4>{i.title}</h4>
              <p>{i.snippet}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </>
  );
};
