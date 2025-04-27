import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Section from '../components/Section/Section';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getCountries } from '../service/countryApi';
import CountryList from '../components/CountryList/CountryList';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const abortController = new AbortController();
    const getCountriesData = async () => {
      try {
        const countries = await getCountries(abortController.signal);
        setCountries(countries);
        console.log(countries);
        if (countries.results.length === 0) {
          toast.error('No country found...');
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          // toast.error('Try again later...');
        }
      }
    };
    getCountriesData();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Section>
      <Container>
        <CountryList dataCountries={countries} prevLocation={location} />
      </Container>
      <Toaster position="top-right" />
    </Section>
  );
};
export default Home;
