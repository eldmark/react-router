import "../styles/searchBar.css";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value.trim();

    if (!query) return;

    onSearch(query);
    e.target.reset();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input name="search" placeholder="Buscar película..." aria-label="Buscar película" />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;