import { useState } from 'react'
import './SearchBar.css'

export default function SearchBar({ onSearch, disabled }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        className="search-input"
        disabled={disabled}
        aria-label="Search city"
      />
      <button type="submit" className="search-btn" disabled={disabled || !query.trim()}>
        Search
      </button>
    </form>
  )
}
