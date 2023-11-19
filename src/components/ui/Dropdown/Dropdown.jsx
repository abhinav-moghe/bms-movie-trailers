import './styles.css'
import DownArrow from '../../../assets/down-arrow.png'

import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../../App'

const Dropdown = ({ type, displayText, isMultiSelect, options }) => {
  const { data, setData, filters, setFilters } = useContext(DataContext)

  const [open, setOpen] = useState(false)

  const getDisplayText = () => {
    const indexOfFilter = filters.findIndex(f => f.type === type)

    if (indexOfFilter !== -1) {
      const length = filters[indexOfFilter]?.values?.length || 0

      if (length > 0) {
        const result = filters[indexOfFilter].values[0]
        return length === 1 ? result : `${result} +${length - 1}`
      }
    }
    return displayText
  }

  const onSelect = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;

    // 1. update language list drop-down as per the selection
    setData(prevData => {
      const updatedLanguageList = prevData.languageList.map(lang =>
        lang.text === name ? { ...lang, isSelected: checked } : lang
      )
      return { ...prevData, languageList: updatedLanguageList }
    })

    // 2. set filters
    setFilters(prevFilters => {
      // find the filter by type ('LANG' for language drop-down)
      const indexOfFilter = prevFilters.findIndex(f => f.type === type);
      const updatedFilters = [...prevFilters];

      // if it is checked, update the selected value for the type picked above
      // else, locate the selected value and remove it
      if (checked) {
        updatedFilters[indexOfFilter].values = [...updatedFilters[indexOfFilter].values, name];
      } else {
        const indexOfValue = updatedFilters[indexOfFilter].values.findIndex(v => v === name);
        if (indexOfValue !== -1) {
          updatedFilters[indexOfFilter].values = [
            ...updatedFilters[indexOfFilter].values.slice(0, indexOfValue),
            ...updatedFilters[indexOfFilter].values.slice(indexOfValue + 1),
          ];
        }
      }
      return updatedFilters;
    })
  }

  // 3. filter movies (triggered after handleLanguageChange)
  useEffect(() => {
    let filteredMovies = data.moviesData;
    const selectedLanguageValues = filters.find(f => f.type === type)?.values;

    if (selectedLanguageValues && selectedLanguageValues?.length) {
      filteredMovies = selectedLanguageValues.reduce((accumulator, currentValue) => {
        const movies = data.moviesData.filter(m => m.EventLanguage === currentValue);
        return movies.length ? [...accumulator, ...movies] : accumulator;
      }, []);
    }

    setData(prevData => ({ ...prevData, filteredMoviesData: filteredMovies }));
  }, [data.moviesData, filters, type]);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className='btn-drop-down'>
        {<span>{getDisplayText()}</span>}
        <img className='img-arrow' src={DownArrow} />
      </button>

      {(open && options &&
        <ul className="drop-down-wrap">
          {
            options.map(o =>
              <li className='drop-down-list-item' key={o.text}>
                {
                  isMultiSelect ?
                    <>
                      <input type="checkbox" id={o.text} name={o.text} onChange={onSelect} checked={o.isSelected} />
                      <label htmlFor={o.text}>{o.text}</label>
                    </>
                    :
                    <span>{o.text}</span>
                }
              </li>)
          }
        </ul>
      )}
    </div>
  )
}

export default Dropdown
