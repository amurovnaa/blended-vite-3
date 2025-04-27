import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Section from '../components/Section/Section';
import toast, { Toaster } from 'react-hot-toast';
import { getCountries } from '../service/countryApi';
import CountryList from '../components/CountryList/CountryList';
import Loader from '../components/Loader/Loader';
import Heading from '../components/Heading/Heading';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const getCountriesData = async () => {
      try {
        setIsLoading(false);
        const countries = await getCountries(abortController.signal);
        setCountries(countries);
        console.log(countries);
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
    getCountriesData();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Section>
      <Container>
        <Heading title={'Countries in Europe'} />
        {isLoading && <Loader />}
        <CountryList dataCountries={countries} />
      </Container>
      <Toaster position="top-right" />
    </Section>
  );
};
export default Home;
