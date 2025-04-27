import { FiSearch } from 'react-icons/fi';
import styles from './SearchForm.module.css';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const regions = [
  { id: 'africa', value: 'africa', name: 'Africa' },
  { id: 'america', value: 'america', name: 'America' },
  { id: 'asia', value: 'asia', name: 'Asia' },
  { id: 'europe', value: 'europe', name: 'Europe' },
  { id: 'oceania', value: 'oceania', name: 'Oceania' },
];

const SearchForm = ({ onSubmit }) => {
  const [region, setRegion] = useState('');

  const handleChange = e => {
    setRegion(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!region) {
      toast.error('Select any region...');
      return;
    }
    onSubmit(region);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <select
        aria-label="select"
        className={styles.select}
        name="region"
        required
        defaultValue="default"
        onChange={handleChange}
      >
        <option disabled value="default">
          Select a region
        </option>
        {regions.map(region => (
          <option key={region.id} value={region.value}>
            {region.name}
          </option>
        ))}
      </select>
      <Toaster position="top-right" />
    </form>
  );
};

export default SearchForm;
