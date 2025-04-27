import styles from './CountryInfo.module.css';

const CountryInfo = ({
  flag,
  capital,
  countryName,
  languages = [],
  population,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.flag}>
        <img className={styles.img} src={flag} alt={capital} />
      </div>
      <div className={styles.box}>
        <h3 className={styles.capital}>
          Capital: <span className={styles.accent}>{capital}</span>
        </h3>

        <h1 className={styles.title}>
          {countryName === 'Russian Federation' ? 'MORDOR' : countryName}
        </h1>

        <p className={styles.details}>
          Population: <span className={styles.accent}>{population}</span>
        </p>

        <p className={styles.details}>
          Languages:
          {languages.map(language => (
            <li key={language}>
              <span className={styles.accent}>{language}</span>
            </li>
          ))}
        </p>
      </div>
    </div>
  );
};

export default CountryInfo;
