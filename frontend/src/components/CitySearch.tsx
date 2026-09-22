interface CitySearchProps {
    city: string
    loading: boolean
    onCityChange: (city: string) => void
    onSearch: () => void
  }
  
  function CitySearch({
    city,
    loading,
    onCityChange,
    onSearch,
  }: CitySearchProps) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onSearch()
      }
    }
  
    return (
      <section className="search-section">
        <input
          type="text"
          placeholder="Escribe una ciudad..."
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Nombre de la ciudad"
        />
  
        <button onClick={onSearch} disabled={loading}>
          {loading ? 'Consultando...' : 'Buscar 🔍'}
        </button>
      </section>
    )
  }
  
  export default CitySearch