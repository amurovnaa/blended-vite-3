import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import SearchForm from '../components/SearchForm/SearchForm';
import Section from '../components/Section/Section';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchByRegion } from '../service/countryApi';
import toast from 'react-hot-toast';
import CountryList from '../components/CountryList/CountryList';
import Loader from '../components/Loader/Loader';

const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const region = searchParams.get('region') ?? '';
  useEffect(() => {
    const abortController = new AbortController();
    const getCountriesByRegion = async () => {
      try {
        setIsLoading(true);
        const countries = await fetchByRegion(region, abortController.signal);
        setCountries(countries);
        if (countries.results.length === 0) {
          toast.error('No country found...');
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          toast.error('Try again later...');
        }
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };
    getCountriesByRegion();
    return () => {
      abortController.abort();
    };
  }, [region]);
  console.log(countries);
  const handleSubmitRegion = newValue => {
    setCountries([]);
    setSearchParams(newValue ? { region: newValue } : {});
  };

  return (
    <Section>
      <Container>
        <Heading title="SearchCountry" bottom />
        <SearchForm onSubmit={handleSubmitRegion} />
        {isLoading && <Loader />}
        <CountryList dataCountries={countries} prevLocation={location} />
      </Container>
    </Section>
  );
};

export default SearchCountry;
